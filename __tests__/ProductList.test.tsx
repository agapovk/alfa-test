import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ProductList from '@/components/product-list';
import { useProductStore } from '@/stores/product-store';

// Mock the useProductStore hook
jest.mock('@/stores/product-store', () => ({
  useProductStore: jest.fn(),
}));

describe('ProductList', () => {
  beforeEach(() => {
    const mockUseProductStore = useProductStore as jest.MockedFunction<
      typeof useProductStore
    >;
    mockUseProductStore.mockReturnValue({
      products: [
        {
          id: 1,
          title: 'Product 1',
          price: 50,
          description: 'Description 1',
          category: 'Category 1',
          image: 'https://images.com/image1.jpg',
          liked: false,
          favourite: false,
        },
        {
          id: 2,
          title: 'Product 2',
          price: 100,
          description: 'Description 2',
          category: 'Category 2',
          image: 'https://images.com/image2.jpg',
          liked: false,
          favourite: true,
        },
      ],
      fetchProducts: jest.fn(),
      deleteProduct: jest.fn(),
      toggleLike: jest.fn(),
      toggleFavourite: jest.fn(),
    });
  });

  it('renders product titles', () => {
    render(<ProductList />);
    expect(screen.getByText('Product 1')).toBeInTheDocument();
    expect(screen.getByText('Product 2')).toBeInTheDocument();
  });

  it('likes a product', () => {
    render(<ProductList />);
    const likeButton = screen.getAllByRole('button', { name: /like/i })[0];
    fireEvent.click(likeButton);
    expect(useProductStore().toggleLike).toHaveBeenCalledWith(1);
  });

  it('filters products by search query', async () => {
    render(<ProductList />);
    const searchInput = screen.getByPlaceholderText('Find a product...');
    fireEvent.change(searchInput, { target: { value: 'Product 1' } });

    await waitFor(() => {
      expect(screen.getByText('Product 1')).toBeInTheDocument();
      expect(screen.queryByText('Product 2')).not.toBeInTheDocument();
    });
  });

  it('filters products by favourite', () => {
    render(<ProductList />);
    const favouriteButton = screen.getByRole('button', { name: /favourite/i });
    fireEvent.click(favouriteButton);
    expect(screen.queryByText('Product 1')).not.toBeInTheDocument();
    expect(screen.getByText('Product 2')).toBeInTheDocument();
  });

  it('deletes a product', () => {
    render(<ProductList />);
    const deleteButton = screen.getAllByRole('button', { name: /delete/i })[0];
    fireEvent.click(deleteButton);
    expect(useProductStore().deleteProduct).toHaveBeenCalledWith(1);
  });

  it('shows "Message" when no products are available', () => {
    const mockUseProductStore = useProductStore as jest.MockedFunction<
      typeof useProductStore
    >;
    mockUseProductStore.mockReturnValue({
      products: [],
      fetchProducts: jest.fn(),
    });

    render(<ProductList />);
    expect(
      screen.getByText('Please reload the page to fetch new data')
    ).toBeInTheDocument();
  });
});
