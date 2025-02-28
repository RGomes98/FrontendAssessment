import { formatProductPrice } from '@/helpers/product.helpers';
import { useGetThumbnail } from '@/hooks/useGetThumbnail.hook';
import { Product, ProductSchema } from '@/lib/schemas/product.schema';
import { Edit, Star, StarHalf, Trash2 } from 'lucide-react';
import Image, { type ImageProps } from 'next/image';
import { FormEvent, Fragment, useState, type HTMLProps, type ReactNode } from 'react';
import { Dialog as ActionDialog } from '../Action/Dialog';
import { useFormModal } from '@/hooks/useFormModal.hook';
import { useProductsActions } from '@/hooks/useProductActions.hook';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Spinner } from '../LoadingState/Spinner';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

function Container({ children, ...divProps }: HTMLProps<HTMLDivElement> & { children: ReactNode }) {
  return (
    <div
      className='relative grid h-full w-full cursor-pointer grid-rows-[300px_78px] rounded-sm bg-white font-saira'
      {...divProps}
    >
      {children}
    </div>
  );
}

function Thumbnail({ src, alt, ...thumbnailProps }: ImageProps) {
  const { isLoading, thumbnailContent } = useGetThumbnail({ imageSrc: String(src) });
  if (isLoading) {
    return (
      <div className='z-50 flex h-full w-full items-center justify-center rounded-md bg-gray-200 p-10'>
        <Spinner />
      </div>
    );
  }

  if (!thumbnailContent) return <span>Falha ao carregar imagem.</span>;
  return (
    <Image
      className='h-full w-full object-contain p-10'
      alt={alt}
      src={thumbnailContent}
      {...thumbnailProps}
    />
  );
}

function Title({ children, ...spanProps }: HTMLProps<HTMLSpanElement> & { children: ReactNode }) {
  return (
    <span
      title={String(children)}
      className='max-w-52 select-none truncate text-stone-700 sm:max-w-44 md:max-w-32 lg:max-w-40'
      {...spanProps}
    >
      {children}
    </span>
  );
}

function Price({ children, ...spanProps }: HTMLProps<HTMLSpanElement> & { children: ReactNode }) {
  return (
    <span className='select-none font-semibold text-stone-700' {...spanProps}>
      {children}
    </span>
  );
}

function Rating({ rating, ...divProps }: HTMLProps<HTMLDivElement> & { rating: number }) {
  const tooltipContent = rating.toFixed(1);
  const fullStarsCount = Math.floor(rating);
  const hasHalfStars = rating > 4.5 && rating % 1 !== 0;

  return (
    <div className='flex' title={`Avaliação: ${tooltipContent}`} {...divProps}>
      {Array.from({ length: fullStarsCount }).map((_, index) => (
        <Star role='img' key={index} className='size-4 fill-yellow-300 stroke-yellow-300' />
      ))}
      {hasHalfStars && <StarHalf className='size-4 fill-yellow-300 stroke-yellow-300' />}
    </div>
  );
}

function Root({ products }: { products: Product[] }) {
  const { modalState, formErrorState, handleValidateFormData } = useFormModal();
  const [productToUpdate, setProductToUpdate] = useState<Product | null>(null);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { deleteProduct, updateProduct } = useProductsActions();
  const { thumbnailContent } = useGetThumbnail({ imageSrc: String(productToUpdate?.image) });

  const DIALOG_CONFIGS = {
    modalContent: {
      title: 'Atualizar produto',
      description: 'Preencha os detalhes abaixo para adicionar um novo produto.',
      cancel: 'Cancelar',
      confirm: 'Confirmar',
    },
    modalState: { state: modalState.state, setState: modalState.setState },
    modalActions: {
      formId: 'create-product',
      onConfirm: () => {},
      onCancel: () => {
        modalState.setState(false);
        formErrorState.setState({});
      },
    },
  };

  function handleSelectProductToUpdate(product: Product) {
    modalState.setState(true);
    setProductToUpdate(product);
  }

  function handleSelectProductToDelete(productId?: Product['id']) {
    if (!productId) return;
    deleteProduct(productId);
    setIsDeleteModalOpen(true);
  }

  function handleUpdateProduct(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);

    const formData = {
      id: productToUpdate?.id,
      title: form.get('title'),
      price: Number(form.get('price')),
      description: form.get('description'),
      image: form.get('image'),
      rating: productToUpdate?.rating,
    };

    const validData = handleValidateFormData({ formData, schema: ProductSchema.omit({ category: true }) });
    if (!validData) return;

    updateProduct(validData);
    modalState.setState(false);
  }

  return (
    <Fragment>
      {products.map((product) => (
        <Card.Container
          key={product.id}
          onClick={(event) => {
            event.stopPropagation();
            setProductToUpdate(product);
            setIsProductModalOpen(true);
          }}
        >
          <div className='absolute top-0 flex w-full items-center gap-1 px-2 pt-2'>
            {product.rating > 4.5 && (
              <div title='Produto bem avaliado!'>
                <Star role='img' className='size-5 fill-yellow-300 stroke-yellow-300' />
              </div>
            )}
            <Trash2
              role='img'
              className='ml-auto size-5 stroke-red-700'
              onClick={(event) => {
                event.stopPropagation();
                setIsDeleteModalOpen(true);
                setProductToDelete(product);
              }}
            />
            <Edit
              role='img'
              className='size-5 stroke-stone-700'
              onClick={(event) => {
                event.stopPropagation();
                modalState.setState(true);
                handleSelectProductToUpdate(product);
              }}
            />
          </div>
          <Card.Thumbnail width={100} height={175} src={product.image} alt={`image-${product.title}`} />
          <div className='flex flex-col justify-between px-3 py-2'>
            <Card.Title>{product.title}</Card.Title>
            <div className='h-[1px] bg-gray-500/10'></div>
            <div className='flex items-center justify-between'>
              <Card.Price>{formatProductPrice({ price: product.price })}</Card.Price>
              <Card.Rating rating={product.rating} />
            </div>
          </div>
        </Card.Container>
      ))}

      <ActionDialog.Modal {...DIALOG_CONFIGS}>
        <form id='create-product' className='flex flex-col gap-2' onSubmit={handleUpdateProduct}>
          <ActionDialog.FormItem
            required
            name='title'
            formItemError={formErrorState.state?.title}
            defaultValue={productToUpdate?.title}
          >
            Título
          </ActionDialog.FormItem>
          <ActionDialog.FormItem
            required
            name='price'
            formItemError={formErrorState.state?.price}
            defaultValue={productToUpdate?.price}
          >
            Preço
          </ActionDialog.FormItem>
          <ActionDialog.FormItem
            required
            name='description'
            formItemError={formErrorState.state?.description}
            defaultValue={productToUpdate?.description}
          >
            Descrição
          </ActionDialog.FormItem>
          <ActionDialog.FormItem
            required
            name='image'
            defaultValue={productToUpdate?.image}
            formItemError={formErrorState.state?.image}
          >
            Imagem
          </ActionDialog.FormItem>
        </form>
      </ActionDialog.Modal>

      <AlertDialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar Exclusão do Produto</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza de que deseja excluir o produto {productToDelete?.title}? Esta ação não pode ser
              desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={() => handleSelectProductToDelete(productToDelete?.id)}>
              Deletar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Dialog open={isProductModalOpen} onOpenChange={setIsProductModalOpen}>
        <DialogContent className='sm:max-w-[425px]'>
          <DialogHeader>
            <DialogTitle>{productToUpdate?.title}</DialogTitle>
            <DialogDescription className='line-clamp-4'>{productToUpdate?.description}</DialogDescription>
          </DialogHeader>
          {thumbnailContent && (
            <Image
              quality={100}
              height={248}
              width={248}
              className='h-full w-full object-contain p-10'
              alt={`product-${productToUpdate?.title}`}
              src={thumbnailContent}
            />
          )}
        </DialogContent>
      </Dialog>
    </Fragment>
  );
}

export const Card = { Container, Thumbnail, Title, Price, Rating, Root };
