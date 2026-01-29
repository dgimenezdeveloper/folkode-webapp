import { render, screen } from '@testing-library/react';
import React from 'react';

describe('Prueba básica', () => {
  it('renderiza texto correctamente', () => {
    render(<div>Hola Jest</div>);
    expect(screen.getByText('Hola Jest')).toBeInTheDocument();
  });
});
