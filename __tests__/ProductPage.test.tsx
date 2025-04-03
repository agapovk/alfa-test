import { render, screen } from '@testing-library/react';
import ProductPage from '@/app/products/[id]/page';
import { useProductStore } from '@/stores/product-store';
import { useParams } from 'next/navigation';

// Mock the useProductStore hook
jest.mock('@/stores/product-store', () => ({
  useProductStore: jest.fn(),
}));

// Mock the useParams hook
jest.mock('next/navigation', () => ({
  useParams: jest.fn(),
}));

describe('ProductPage', () => {
  beforeEach(() => {
    const mockUseProductStore = useProductStore as jest.MockedFunction<
      typeof useProductStore
    >;
    mockUseProductStore.mockReturnValue({
      products: [
        {
          id: 1,
          title: 'Test Product',
          price: 100,
          description: 'Test Description',
          category: 'Test Category',
          image: 'https://images.com/test-image.jpg',
        },
      ],
    });

    const mockUseParams = useParams as jest.MockedFunction<typeof useParams>;
    mockUseParams.mockReturnValue({ id: '1' });
  });

  it('renders product details when product is found', () => {
    render(<ProductPage />);
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('$100.00')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
    expect(screen.getByText('Test Category')).toBeInTheDocument();
  });

  it('shows "Product Not Found" when product is not found', () => {
    const mockUseParams = useParams as jest.MockedFunction<typeof useParams>;
    mockUseParams.mockReturnValue({ id: '2' }); // ID that doesn't exist

    render(<ProductPage />);
    expect(screen.getByText('Product Not Found')).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: /Back to Products/i })
    ).toBeInTheDocument();
  });

  it('renders "Back to Products" link', () => {
    render(<ProductPage />);
    expect(
      screen.getByRole('link', { name: /Back to Products/i })
    ).toBeInTheDocument();
  });
});
