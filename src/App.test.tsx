import { act } from 'react';
import { render,  } from '@testing-library/react';
import App from './App';

test('renders App and displays ToastContainer', async () => {
  await act(async () => {
    render(<App />);
  });
});
