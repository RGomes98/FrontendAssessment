import { Input } from '../ui/input';
import { Button } from '@/components/ui/button';
import { FormEvent, Fragment, InputHTMLAttributes, ReactNode } from 'react';
import { ProductSchema } from '@/lib/schemas/product.schema';
import { generateRandomNumberFromInterval } from '@/utils/number.utils';
import { Label } from '../ui/label';
import { useFormModal } from '@/hooks/useFormModal.hook';
import { useProductsActions } from '@/hooks/useProductActions.hook';

import {
  Dialog as DialogModal,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

function Modal({
  children,
  modalActions,
  modalContent,
  modalState,
}: {
  children: ReactNode;
  modalActions: { formId: string; onConfirm: () => void; onCancel: () => void };
  modalState: { state: boolean; setState: (state: boolean) => void };
  modalContent: { title: string; description: string; confirm: string; cancel: string };
}) {
  return (
    <DialogModal open={modalState.state} onOpenChange={modalState.setState}>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>{modalContent.title}</DialogTitle>
          <DialogDescription>{modalContent.description}</DialogDescription>
        </DialogHeader>
        {children}
        <DialogFooter>
          <Button variant='outline' type='button' onClick={modalActions.onCancel}>
            {modalContent.cancel}
          </Button>
          <Button variant='outline' type='submit' onClick={modalActions.onConfirm} form={modalActions.formId}>
            {modalContent.confirm}
          </Button>
        </DialogFooter>
      </DialogContent>
    </DialogModal>
  );
}

function FormItem({
  children,
  formItemError,
  ...inputProps
}: { children: ReactNode; formItemError?: string } & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className='flex flex-col gap-1'>
      <div className='grid grid-cols-4 items-center gap-0'>
        <Label htmlFor={inputProps.id} className='text-left'>
          {children}
        </Label>
        <Input id={inputProps.id} {...inputProps} className='col-span-3' />
      </div>
      {formItemError && (
        <span className='mb-2 text-end text-xs font-semibold text-red-500'>{formItemError}</span>
      )}
    </div>
  );
}

function Root() {
  const { modalState, formErrorState, handleValidateFormData } = useFormModal();
  const { createProduct } = useProductsActions();

  const DIALOG_CONFIGS = {
    modalContent: {
      title: 'Criar novo produto',
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

  function handleCreateProduct(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);

    const formData = {
      id: crypto.randomUUID(),
      title: form.get('title'),
      price: Number(form.get('price')),
      category: form.get('category'),
      description: form.get('description'),
      image: form.get('image'),
      rating: generateRandomNumberFromInterval({ min: 1, max: 5 }),
    };

    const validData = handleValidateFormData({ formData, schema: ProductSchema });
    if (validData) createProduct(validData);
  }

  return (
    <Fragment>
      <Button className='max-sm:w-full' onClick={() => modalState.setState(true)} variant='outline'>
        Criar Novo Produto
      </Button>
      <Modal {...DIALOG_CONFIGS}>
        <form id='create-product' className='flex flex-col gap-2' onSubmit={handleCreateProduct}>
          <FormItem name='title' required formItemError={formErrorState.state?.title}>
            Título
          </FormItem>
          <FormItem name='price' required formItemError={formErrorState.state?.price}>
            Preço
          </FormItem>
          <FormItem name='category' required formItemError={formErrorState.state?.category}>
            Categoria
          </FormItem>
          <FormItem name='description' required formItemError={formErrorState.state?.description}>
            Descrição
          </FormItem>
          <FormItem name='image' required formItemError={formErrorState.state?.image}>
            Imagem
          </FormItem>
        </form>
      </Modal>
    </Fragment>
  );
}

export const Dialog = { Root, Modal, FormItem };
