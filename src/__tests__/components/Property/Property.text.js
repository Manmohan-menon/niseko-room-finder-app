import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../../../App';
import Property from '../../../Property';

// mock fetch data dataSelector
jest.mock('../../../DataSelector', () => ({
    __esModule: true,
    default: () => Promise.resolve([
       {
         id: 1091,
         name: "Chalet Murasaki",
         description: "This 8 bedroom chalet (487 sqm) features a large master bedroom (55 sqm) with a hinoki en-suite bathroom and a daybed nook for quiet relaxation.",
       },
    ]),
}));

test('loads and displays properties', async () => {
 render(<App />);
 const propertyName = await screen.findByText(/Chalet Murasaki/i);
 expect(propertyName).toBeInTheDocument();
});

test('filters properties by name or description', async () => {
    render(<App />);
    const input = screen.getByPlaceholderText(/Search rooms.../i);
    fireEvent.change(input, { target: { value: 'Chalet Murasaki' } });
    const propertyName = await screen.findByText(/Chalet Murasaki/i);
    expect(propertyName).toBeInTheDocument();
   
    fireEvent.change(input, { target: { value: 'Non-existent property' } });
    const errorMessage = await screen.findByText(/No properties match your search/i);
    expect(errorMessage).toBeInTheDocument();
});

test('displays property name and description', () => {
    const property = {
       name: 'Chalet Murasaki',
       description: 'This 8 bedroom chalet features a large master bedroom with a hinoki en-suite bathroom and a daybed nook for quiet relaxation.',
    };
    render(<Property property={property} />);
    const propertyName = screen.getByText(/Chalet Murasaki/i);
    const propertyDescription = screen.getByText(/This 8 bedroom chalet features a large master bedroom with a hinoki en-suite bathroom and a daybed nook for quiet relaxation./i);
    expect(propertyName).toBeInTheDocument();
    expect(propertyDescription).toBeInTheDocument();
});
