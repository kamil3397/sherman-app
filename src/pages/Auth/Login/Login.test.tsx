import { AuthContext, useAuthContext } from 'context/AuthContext';
import { useAlertContext } from 'context/AlertContext/AlertContext';
import { BrowserRouter } from 'react-router';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe } from '@jest/globals';
import * as axios from 'axios';
import LoginPage from './Login';

jest.mock('axios');

describe('Login Page', () => {
  const mockLoginClient = jest.fn();
  const mockNavigate = jest.fn();

  const setup = () => {
    render(
      <AuthContext.Provider value={{ loginClient: mockLoginClient, logoutClient: jest.fn() }}>
        <BrowserRouter>
          <LoginPage />
        </BrowserRouter>
      </AuthContext.Provider>
    );
  };

  beforeEach(() => {

    mockLoginClient.mockReset();
    mockNavigate.mockReset();
  });

  it('should render all form elements correctly', async() => {
    setup();
    expect(await screen.findByLabelText(/Email Address/i)).toBeInTheDocument();
    expect(await screen.findByLabelText(/Password/i)).toBeInTheDocument();
    expect(await screen.findByRole('button', { name: /Log In/i })).toBeInTheDocument();
    expect(await screen.findByText(/Don't have an account?/i)).toBeInTheDocument();
  });
});
// it('displays validation messages when the form is submitted empty', async() => {
//   render(
//     <BrowserRouter>
//       <LoginPage/>
//     </BrowserRouter>
//   );
//   fireEvent.click(screen.getByRole('button', { name: /Log In/i }));

//   await waitFor(() => {
//     expect(screen.getByText(/Email is required/i)).toBeInTheDocument();
//     expect(screen.getByText(/Password is required/i)).toBeInTheDocument();
//   });
// });
