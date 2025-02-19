/* eslint-disable no-undef */
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Loader } from 'components/Loader';

describe('Loader Component', () => {
  it('renders Loader and logo image', () => {
    render(<Loader />);

    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toBeInTheDocument();

    const logo = screen.getByAltText('Sherman Shooting Team Logo');
    expect(logo).toBeInTheDocument();

    expect(logo).toHaveAttribute('src', 'loader.svg');
  });

});
