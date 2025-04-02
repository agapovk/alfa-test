import { render, screen, fireEvent, act } from '@testing-library/react';
import CreateProductForm from '@/app/products/create/page';
import { useProductStore } from '@/stores/product-store';
import { useRouter } from 'next/navigation';

// Mock the useProductStore hook
jest.mock('@/stores/product-store', () => ({
  useProductStore: jest.fn(),
}));

// Mock the useRouter hook
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('CreateProductForm', () => {
  let createProductMock: jest.Mock;

  beforeEach(() => {
    createProductMock = jest.fn();
    const mockUseProductStore = useProductStore as jest.MockedFunction<
      typeof useProductStore
    >;
    mockUseProductStore.mockReturnValue({
      createProduct: createProductMock,
    });

    const mockUseRouter = useRouter as jest.MockedFunction<typeof useRouter>;
    mockUseRouter.mockReturnValue({
      push: jest.fn(),
      back: jest.fn(),
      forward: jest.fn(),
      refresh: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
    });
  });

  it('renders "Back to Products" link', () => {
    render(<CreateProductForm />);
    expect(
      screen.getByRole('link', { name: /Back to Products/i })
    ).toBeInTheDocument();
  });

  it('renders form fields', () => {
    render(<CreateProductForm />);
    expect(screen.getByLabelText('Title')).toBeInTheDocument();
    expect(screen.getByLabelText('Price')).toBeInTheDocument();
    expect(screen.getByLabelText('Description')).toBeInTheDocument();
    expect(screen.getByLabelText('Category')).toBeInTheDocument();
  });

  it('validates form inputs', async () => {
    render(<CreateProductForm />);
    const submitButton = screen.getByRole('button', { name: /submit/i });

    await act(async () => {
      fireEvent.click(submitButton);
    });

    await screen.findByText('Title is required');
    await screen.findByText('Description is required');
    await screen.findByText('Category is required');
  });

  it('submits form with correct values', async () => {
    render(<CreateProductForm />);

    await act(async () => {
      fireEvent.change(screen.getByLabelText('Title'), {
        target: { value: 'New Product' },
      });
      fireEvent.change(screen.getByLabelText('Price'), {
        target: { value: 50 },
      });
      fireEvent.change(screen.getByLabelText('Description'), {
        target: { value: 'A great product' },
      });
      // Select component requires different handling
      await fireEvent.click(screen.getByLabelText('Category'));
      await fireEvent.click(screen.getByTestId('electronics'));

      const submitButton = screen.getByRole('button', { name: /Submit/i });
      fireEvent.click(submitButton);
    });

    expect(createProductMock).toHaveBeenCalledWith({
      title: 'New Product',
      price: 50,
      description: 'A great product',
      category: 'electronics',
    });
  });
});
