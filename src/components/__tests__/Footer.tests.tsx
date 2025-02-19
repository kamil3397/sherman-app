/* eslint-disable no-undef */
import { render, screen } from '@testing-library/react';
import { Footer } from 'components/Footer';

describe('Footer', () => {
  it('renders the footer', () => {
    render(<Footer />);
    expect(screen.getByText('© 2025 Sherman Shooting Team. All Rights Reserved.')).toBeInTheDocument();
  });
});
