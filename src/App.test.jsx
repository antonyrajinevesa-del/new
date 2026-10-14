import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import App from './App';

describe('Expense Tracker App', () => {
  it('renders summary cards and seed data', () => {
    render(<App />);
    expect(screen.getByText('TOTAL EXPENSES')).toBeTruthy();
    expect(screen.getByText('₹40000.00')).toBeTruthy();
    expect(screen.getByText('TOTAL TRANSACTIONS')).toBeTruthy();
    expect(screen.getByText('1')).toBeTruthy();
    expect(screen.getByText('Mobile')).toBeTruthy();
  });

  it('filters items when search term is entered', () => {
    render(<App />);
    const searchInput = screen.getByPlaceholderText('Search by title...');
    fireEvent.change(searchInput, { target: { value: 'Nonexistent' } });
    expect(screen.getByText('No expenses found.')).toBeTruthy();
  });

  it('adds a new expense and updates total', () => {
    render(<App />);
    const titleInput = screen.getByPlaceholderText('e.g. Groceries');
    const amountInput = screen.getByPlaceholderText('e.g. 500');
    const dateInput = screen.getByLabelText('Date');
    const submitBtn = screen.getByRole('button', { name: /Add Expense/i });

    fireEvent.change(titleInput, { target: { value: 'Dinner' } });
    fireEvent.change(amountInput, { target: { value: '1200' } });
    fireEvent.change(dateInput, { target: { value: '2026-07-08' } });
    fireEvent.click(submitBtn);

    expect(screen.getByText('Dinner')).toBeTruthy();
    expect(screen.getByText('₹41200.00')).toBeTruthy();
    expect(screen.getByText('2')).toBeTruthy();
  });
});
