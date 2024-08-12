import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import AnimalDetails from './AnimalDetails';
import { Animal } from '../types';
import { vi } from 'vitest';

vi.mock('../hooks/useTheme', () => ({
  useTheme: vi.fn(),
}));

const mockAnimal: Animal = {
  uid: '123',
  name: 'Test Animal',
  earthAnimal: true,
  earthInsect: false,
  avian: false,
  canine: false,
  feline: true,
};

describe('AnimalDetails Component', () => {
  test('renders animal name and descriptions correctly', () => {
    render(<AnimalDetails animal={mockAnimal} onHideDetails={() => {}} />);

    expect(screen.getByText('Test Animal')).toBeInTheDocument();

    expect(screen.getByText('Earth Animal 🐾, Feline 😺')).toBeInTheDocument();
  });

  test('renders default description if no properties are true', () => {
    const noDescriptionAnimal: Animal = {
      uid: '124',
      name: 'Mystery Animal',
      earthAnimal: false,
      earthInsect: false,
      avian: false,
      canine: false,
      feline: false,
    };

    render(
      <AnimalDetails animal={noDescriptionAnimal} onHideDetails={() => {}} />,
    );

    expect(
      screen.getByText('an infinitely cute animal 👻'),
    ).toBeInTheDocument();
  });

  test('calls onHideDetails when "Hide Details" button is clicked', () => {
    const handleHideDetails = vi.fn();

    render(
      <AnimalDetails animal={mockAnimal} onHideDetails={handleHideDetails} />,
    );
    fireEvent.click(screen.getByRole('button', { name: 'Hide Details' }));
    expect(handleHideDetails).toHaveBeenCalled();
  });
});
