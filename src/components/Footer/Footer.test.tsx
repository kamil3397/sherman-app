import { render, screen } from '@testing-library/react';
import { Footer } from './Footer';

describe('Footer', () => {
  it('renders the footer', () => {
    render(<Footer />);
    expect(screen.getByText('© 2025 Sherman Shooting Team. All Rights Reserved.')).toBeDefined();
  });
});
