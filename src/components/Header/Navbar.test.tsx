import { render, screen } from '@testing-library/react';
import { Navbar } from './Navbar';

describe('Navbar', () => {
  test('should render correctly', () => {
    render(<Navbar />);

    const linkElement = screen.getByText(/FakeStoreAPI/i);
    expect(linkElement).toBeInTheDocument();
  });

  test('should have the correct CSS classes', () => {
    render(<Navbar />);

    const headerElement = screen.getByRole('banner');
    expect(headerElement).toHaveClass('bg-white');
    expect(headerElement).toHaveClass('px-4');
    expect(headerElement).toHaveClass('py-4');
  });
});
