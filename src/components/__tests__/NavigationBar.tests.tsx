import React from 'react';
import { render, screen } from '@testing-library/react';
import { NavigationBar } from '../NavigationBar';

test('NavigationBar renderuje się poprawnie', () => {
  render(
    <NavigationBar />
  );

  expect(screen.getByAltText('Sherman Shooting Logo')).toBeInTheDocument();
  expect(screen.getByText(/Sherman Shooting Team/i)).toBeInTheDocument();
});
