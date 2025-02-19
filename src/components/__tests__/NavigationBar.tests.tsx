/* eslint-disable no-undef */
import { render } from '@testing-library/react';
import { NavigationBar } from 'components/NavigationBar';

describe('NavigationBar Component', () => {
  it('renders NavigationBar', () => {
    render(<NavigationBar />);
  });
});
