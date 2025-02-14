// Signin.test.jsx

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, vi } from 'vitest';
import { useAuth } from '../../../context/AuthContext';
import Signin from '../';

// Mocking the AuthContext
vi.mock('../../../context/AuthContext', () => ({
  useAuth: vi.fn(),
}));

describe('Signin Component', () => {
  const mockSignIn = vi.fn();

  beforeEach(() => {
    useAuth.mockReturnValue({
      signIn: mockSignIn,
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders the Signin component', () => {
    render(
      <BrowserRouter>
        <Signin />
      </BrowserRouter>
    );

    expect(screen.getByText('Welcome! ✨')).toBeInTheDocument();
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
  });

  it('handles user input correctly', () => {
    render(
      <BrowserRouter>
        <Signin />
      </BrowserRouter>
    );

    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText(/password/i);

    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });

    expect(usernameInput.value).toBe('testuser');
    expect(passwordInput.value).toBe('password');
  });

  it('displays error message on failed sign-in', async () => {
    mockSignIn.mockRejectedValueOnce(new Error('Invalid credentials'));

    render(
      <BrowserRouter>
        <Signin />
      </BrowserRouter>
    );

    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const signInButton = screen.getByRole('button', { name: /sign in/i });

    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });
    fireEvent.click(signInButton);

    await waitFor(() => {
      expect(mockSignIn).toHaveBeenCalledWith('testuser', 'password');
      expect(screen.getByText(/incorrect username or password/i)).toBeInTheDocument();
    });
  });

  it('calls signIn on form submit', async () => {
    mockSignIn.mockResolvedValueOnce();

    render(
      <BrowserRouter>
        <Signin />
      </BrowserRouter>
    );

    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const signInButton = screen.getByRole('button', { name: /sign in/i });

    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });
    fireEvent.click(signInButton);

    await waitFor(() => {
      expect(mockSignIn).toHaveBeenCalledWith('testuser', 'password');
    });
  });
});
