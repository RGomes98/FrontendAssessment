import { extractFormErrors } from '@/helpers/form.helper';
import { ZodSchema } from 'zod';
import { useState } from 'react';

type HandleValidateFormData<TData, TSchema> = {
  formData: TData;
  schema: ZodSchema<TSchema>;
};

export function useFormModal() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  function handleValidateFormData<T, K>({ formData, schema }: HandleValidateFormData<T, K>) {
    const createdProduct = schema.safeParse(formData);

    if (createdProduct.error) {
      setFormErrors(extractFormErrors(createdProduct.error));
      return null;
    }

    setFormErrors({});
    return createdProduct.data;
  }

  return {
    handleValidateFormData,
    modalState: { state: isModalOpen, setState: setIsModalOpen },
    formErrorState: { state: formErrors, setState: setFormErrors },
  };
}
