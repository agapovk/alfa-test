import { render, screen } from '@testing-library/react';
import HomePage from '@/app/page';

describe('HomePage', () => {
  it('should have a title', () => {
    render(<HomePage />);
    const title = screen.getByText('Alfa Test Project');
    expect(title).toBeInTheDocument();
  });

  it('should have the project description', () => {
    render(<HomePage />);
    const description = screen.getByText(
      /Next.js application for product management/i
    );
    expect(description).toBeInTheDocument();
  });

  it('should have a button to go to products list', () => {
    render(<HomePage />);
    const button = screen.getByRole('button', { name: /Go to products list/i });
    expect(button).toBeInTheDocument();
  });
});
