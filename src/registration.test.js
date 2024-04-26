import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import RegistrationForm from './RegistrationForm';

describe('RegistrationForm', () => {
  test('renders form elements', () => {
    render(<RegistrationForm />);
    expect(screen.getByLabelText(/First Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Middle Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Last Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Designation/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Contact Number/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Previous Experience/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Is Admin/i)).toBeInTheDocument();
    expect(screen.getByText(/Signup/i)).toBeInTheDocument();
  });

  test('updates state on input change', () => {
    render(<RegistrationForm />);
    fireEvent.change(screen.getByLabelText(/First Name/i), {
      target: { value: 'John' },
    });
    expect(screen.getByLabelText(/First Name/i).value).toBe('John');
  });

  test('submits form data', async () => {
    // Mock the fetch function
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ message: 'Success' }),
      })
    );

    render(<RegistrationForm />);
    fireEvent.change(screen.getByLabelText(/First Name/i), {
      target: { value: 'John' },
    });
    fireEvent.change(screen.getByLabelText(/Last Name/i), {
      target: { value: 'Doe' },
    });
    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: 'john.doe@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: 'password123' },
    });
    fireEvent.change(screen.getByLabelText(/Designation/i), {
      target: { value: 'Developer' },
    });
    fireEvent.change(screen.getByLabelText(/Contact Number/i), {
      target: { value: '1234567890' },
    });
    fireEvent.change(screen.getByLabelText(/Previous Experience/i), {
      target: { value: '5 years' },
    });
    fireEvent.change(screen.getByLabelText(/Is Admin/i), {
      target: { value: 'true' },
    });

    fireEvent.click(screen.getByText(/Signup/i));

    // Wait for the asynchronous fetch to complete
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        process.env.REACT_APP_API_URL,
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify({
            first_name: 'John',
            last_name: 'Doe',
            email: 'john.doe@example.com',
            password: 'password123',
            designation: 'Developer',
            phone_number: '1234567890',
            previous_exp: '5 years',
            is_admin: 'true',
          }),
        })
      );
    });

    // Verify that the navigation occurred
    expect(screen.getByText(/Success/i)).toBeInTheDocument();
  });
});
