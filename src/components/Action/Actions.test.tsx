import { Actions } from './Actions';
import { render, screen } from '@testing-library/react';

import userEvent from '@testing-library/user-event';

describe('Actions Component', () => {
  it('should render the component "Root"', async () => {
    render(<Actions />);

    const button = screen.getByText('Criar Novo Produto');
    await userEvent.click(button);

    const modalTitle = screen.getByText('Criar novo produto');
    expect(modalTitle).toBeInTheDocument();
  });
});
