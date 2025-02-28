import '@testing-library/jest-dom';
import { Card } from '@/components/Product/Card';
import { render, screen, fireEvent } from '@testing-library/react';

it('renders Rating component with correct stars', () => {
  render(<Card.Rating rating={4.7} />);

  const stars = screen.getAllByRole('img');
  expect(stars.length).toBeGreaterThanOrEqual(4);
});

describe('Price', () => {
  it('deve exibir o preço corretamente', () => {
    render(<Card.Price>R$ 199,99</Card.Price>);

    const price = screen.getByText('R$ 199,99');
    expect(price).toBeInTheDocument();
  });
});

describe('Container', () => {
  it('should correctly render the children inside the div', () => {
    render(
      <Card.Container>
        <div>Child 1</div>
        <div>Child 2</div>
      </Card.Container>,
    );

    expect(screen.getByText('Child 1')).toBeInTheDocument();
    expect(screen.getByText('Child 2')).toBeInTheDocument();
  });
});

describe('Root', () => {
  const mockProducts = [
    {
      id: 1,
      title: 'Product 1',
      price: 100,
      description: 'Description 1',
      image: 'img1.jpg',
      rating: 5,
      category: 'electronics',
    },
    {
      id: 2,
      title: 'Product 2',
      price: 200,
      description: 'Description 2',
      image: 'img2.jpg',
      rating: 4.5,
      category: 'electronics',
    },
  ];

  it('should correctly display the products', () => {
    render(<Card.Root products={mockProducts} />);

    expect(screen.getByText('Product 1')).toBeInTheDocument();
    expect(screen.getByText('Product 2')).toBeInTheDocument();
  });

  it('should call the delete function when the trash icon is clicked', () => {
    render(<Card.Root products={mockProducts} />);

    const trashButton = screen.getAllByRole('img')[1];
    fireEvent.click(trashButton);

    expect(screen.getByText('Confirmar Exclusão do Produto')).toBeInTheDocument();
  });
});
