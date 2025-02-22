import { render, screen } from '@testing-library/react';
import { describe, expect, it } from '@jest/globals';
import { BrowserRouter } from 'react-router';
import { NavigationBar } from './NavigationBar';

describe('NavigationBar', () => {
  const setup = () => {
    render(
      <BrowserRouter>
        <NavigationBar />
      </BrowserRouter>
    );
  };

  it('renders compoennt', () => {
    setup();
    expect(screen.getByAltText('Sherman Shooting Logo')).toBeDefined();
  });
});
