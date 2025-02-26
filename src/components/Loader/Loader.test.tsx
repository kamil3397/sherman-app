import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Loader } from 'components/Loader/Loader';
import { describe, expect, it } from '@jest/globals';

describe('Loader Component', () => {
  it('renders Loader and logo image', async() => {
    render(<Loader />);

    const progressBar = await screen.findByRole('progressbar');
    expect(progressBar).toBeDefined();

    const logo = screen.getByAltText('Sherman Shooting Team Logo');
    expect(logo).toBeDefined();
  });

});
