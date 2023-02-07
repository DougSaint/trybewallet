import React from 'react';
import { act, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';
import { mockData } from '../../cypress/mocks/data';
import { getTotalValue, getValue } from '../service/Helpers';

describe('Testando componente de formulario', () => {
  beforeEach(() => {
    const { history } = renderWithRouterAndRedux(<App />);

    act(() => {
      history.push('/carteira');
    });
  });

  it('Testando se todos elementos do componente de formulário estão presentes', () => {
    const valueInput = screen.queryByTestId('value-input');
    expect(valueInput).toBeInTheDocument();

    const descriptionInput = screen.queryByTestId('description-input');
    expect(descriptionInput).toBeInTheDocument();

    const currencyInput = screen.queryByTestId('currency-input');
    expect(currencyInput).toBeInTheDocument();

    const methodInput = screen.queryByTestId('method-input');
    expect(methodInput).toBeInTheDocument();

    const tagInput = screen.queryByTestId('tag-input');
    expect(tagInput).toBeInTheDocument();
  });

  it('Verificando a função do botão de salvar despesa', async () => {
    const valueInput = screen.queryByTestId('value-input');
    const descriptionInput = screen.queryByTestId('description-input');
    const currencyInput = screen.queryByTestId('currency-input');
    const methodInput = screen.queryByTestId('method-input');

    userEvent.type(valueInput, '10');
    userEvent.type(descriptionInput, 'testando');
    await waitFor(() => {
      userEvent.selectOptions(currencyInput, 'USD');
    });
    userEvent.selectOptions(methodInput, 'Cartão de crédito');
    userEvent.selectOptions(screen.getByTestId('tag-input'), 'Lazer');

    act(() => {
      userEvent.click(screen.getByText(/adicionar despesa/i));
    });
    await waitFor(() => {
      expect(screen.getByTestId('total-field').textContent).toBe('51.47');
    });

    expect(valueInput.textContent).toBe('');
    expect(descriptionInput.textContent).toBe('');

    expect(screen.getAllByRole('columnheader').length).toBe(9);

    expect(screen.getAllByRole('button').length).toBe(3);

    act(() => {
      userEvent.click(screen.getByRole('button', { name: 'Editar' }));
    });
    await waitFor(() => {
      screen.getByRole('button', { name: /Editar despesa/i });
    });

    userEvent.type(valueInput, '20');
    userEvent.type(descriptionInput, 'nova descrição');
    await waitFor(() => {
      userEvent.selectOptions(currencyInput, 'EUR');
    });
    userEvent.selectOptions(methodInput, 'Dinheiro');
    userEvent.selectOptions(screen.getByTestId('tag-input'), 'Saúde');

    act(() => {
      userEvent.click(screen.getByText(/Editar despesa/i));
    });

    act(() => {
      userEvent.click(screen.getByRole('button', { name: 'Excluir' }));
    });
    expect(screen.queryAllByRole('cell').length).toBe(0);
  });

  it('Testando as HOFS', () => {
    expect(getValue({ value: 10, exchangeRates: mockData, currency: 'EUR' })).toBe(51.268);
    expect(getTotalValue()).toBe(0);
  });
});
