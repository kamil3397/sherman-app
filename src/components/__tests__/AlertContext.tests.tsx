/* eslint-disable no-undef */
// AlertContext.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { toast } from 'react-toastify';
import { AlertProvider, useAlertContext } from 'context/AlertContext';

// Mockowanie react-toastify, aby przechwycić wywołania metod
jest.mock('react-toastify', () => ({
  // Przekazujemy Slide, nawet jeśli nie jest używany w asercjach
  Slide: jest.fn(),
  toast: {
    success: jest.fn(),
    error: jest.fn(),
    info: jest.fn(),
  },
}));

// DummyComponent korzystający z kontekstu
const DummyComponent = () => {
  const { showAlert, showSuccessAlert, showErrorAlert } = useAlertContext();
  return (
    <div>
      <button onClick={() => showAlert('test alert', 'info')}>Show Alert</button>
      <button onClick={() => showSuccessAlert('success alert')}>Show Success</button>
      <button onClick={() => showErrorAlert('error alert')}>Show Error</button>
    </div>
  );
};

describe('AlertContext', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('showAlert powinien wywołać toast.info dla typu info', () => {
    render(
      <AlertProvider>
        <DummyComponent />
      </AlertProvider>
    );

    fireEvent.click(screen.getByText('Show Alert'));

    expect(toast.info).toHaveBeenCalledTimes(1);
    expect(toast.info).toHaveBeenCalledWith(
      'test alert',
      expect.objectContaining({
        position: 'top-right',
        autoClose: 2000,
        icon: <span>💡</span>,
      })
    );
  });

  test('showSuccessAlert powinien wywołać toast.success', () => {
    render(
      <AlertProvider>
        <DummyComponent />
      </AlertProvider>
    );
    fireEvent.click(screen.getByText('Show Success'));

    expect(toast.success).toHaveBeenCalledTimes(1);
    expect(toast.success).toHaveBeenCalledWith(
      'success alert',
      expect.objectContaining({
        position: 'top-right',
        autoClose: 2000,
        icon: <span>🔫</span>,
      })
    );
  });

  test('showErrorAlert powinien wywołać toast.error', () => {
    render(
      <AlertProvider>
        <DummyComponent />
      </AlertProvider>
    );
    fireEvent.click(screen.getByText('Show Error'));
    expect(toast.error).toHaveBeenCalledTimes(1);
    expect(toast.error).toHaveBeenCalledWith(
      'error alert',
      expect.objectContaining({
        position: 'top-right',
        autoClose: 2000,
        icon: <span>💀</span>,
      })
    );
  });

});
