import { Dialog } from './Dialog';
import { render, screen } from '@testing-library/react';

import userEvent from '@testing-library/user-event';

describe('Root Component', () => {
  it('should render the "Criar Novo Produto" button', () => {
    render(<Dialog.Root />);

    const button = screen.getByText('Criar Novo Produto');
    expect(button).toBeInTheDocument();
  });

  it('should open modal when the "Criar Novo Produto" button is clicked', async () => {
    render(<Dialog.Root />);

    const button = screen.getByText('Criar Novo Produto');
    await userEvent.click(button);

    const modalTitle = screen.getByText('Criar novo produto');
    expect(modalTitle).toBeInTheDocument();
  });

  it('should close modal when the "Cancelar" button is clicked', async () => {
    render(<Dialog.Root />);

    const button = screen.getByText('Criar Novo Produto');
    await userEvent.click(button);

    const cancelButton = screen.getByText('Cancelar');
    await userEvent.click(cancelButton);

    const modalTitle = screen.queryByText('Criar novo produto');
    expect(modalTitle).not.toBeInTheDocument();
  });

  it('should submit the form when the "Confirmar" button is clicked', async () => {
    render(<Dialog.Root />);

    const button = screen.getByText('Criar Novo Produto');
    await userEvent.click(button);

    const titleInput = screen.getByText('Título');
    const priceInput = screen.getByText('Preço');
    const categoryInput = screen.getByText('Categoria');
    const descriptionInput = screen.getByText('Descrição');
    const imageInput = screen.getByText('Imagem');

    await userEvent.type(titleInput, 'Produto Teste');
    await userEvent.type(priceInput, '10');
    await userEvent.type(categoryInput, 'Categoria Teste');
    await userEvent.type(descriptionInput, 'Descrição Teste');
    await userEvent.type(imageInput, 'imagem.jpg');
  });
});
