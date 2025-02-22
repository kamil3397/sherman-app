import { render, screen, fireEvent } from '@testing-library/react';
import { useColorScheme } from '@mui/material';
import { ThemeSwitch } from './ThemeSwitch';

// Mock hooka useColorScheme
jest.mock('@mui/material', () => {
  const actualMUI = jest.requireActual('@mui/material');
  return {
    ...actualMUI,
    useColorScheme: jest.fn(),
  };
});

describe('ThemeSwitch component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Returns null when mode is not set', () => {
    (useColorScheme as jest.Mock).mockReturnValue({ mode: null, setMode: jest.fn() });
    const { container } = render(<ThemeSwitch />);
    expect(container.firstChild).toBeNull();
  });

  test('It renders correctly in dark mode (default) and switches to light mode when clicked', () => {
    const setMode = jest.fn();
    // Domyślny stan to dark
    (useColorScheme as jest.Mock).mockReturnValue({ mode: 'dark', setMode });
    render(<ThemeSwitch />);

    // Sprawdzamy, czy tekst informacyjny wskazuje "dark"
    expect(screen.getByText('Current mode: dark')).toBeDefined();

    // Switch to checkbox
    const checkbox = screen.getByRole('checkbox') as HTMLInputElement;
    expect(checkbox.checked).toBe(true);

    // Kliknięcie przełącznika
    fireEvent.click(checkbox);

    // Po kliknięciu powinna zostać wywołana funkcja setMode z argumentem 'light'
    expect(setMode).toHaveBeenCalledWith('light');
  });

  test('It renders correctly in light mode and switches to dark mode when clicked', () => {
    const setMode = jest.fn();
    // Ustawiamy tryb na light
    (useColorScheme as jest.Mock).mockReturnValue({ mode: 'light', setMode });
    render(<ThemeSwitch />);

    // Sprawdzamy, czy tekst informacyjny wskazuje "light"
    expect(screen.getByText('Current mode: light')).toBeDefined();

    // Switch (checkbox) nie powinien być zaznaczony, ponieważ tryb to light
    const checkbox = screen.getByRole('checkbox') as HTMLInputElement;
    expect(checkbox.checked).toBe(false);

    fireEvent.click(checkbox);

    // Po kliknięciu oczekujemy wywołania setMode z argumentem 'dark'
    expect(setMode).toHaveBeenCalledWith('dark');
  });
});
