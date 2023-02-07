import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';

describe('Testando componente de login', () => {
  it('Testando se o componente é renderizado corretamente', () => {
    renderWithRouterAndRedux(<App />);

    screen.getByRole('heading', { level: 3, name: /Login/i });

    const emailInput = screen.getByTestId('email-input');
    expect(emailInput).toBeInTheDocument();

    const passwordInput = screen.getByTestId('password-input');
    expect(passwordInput).toBeInTheDocument();

    screen.getByRole('button', { name: /Entrar/i });
  });

  it('Testando se o login é validado corretamente', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const spy = jest.spyOn(window, 'fetch');
    const loginBtn = screen.getByRole('button', { name: /Entrar/i });
    expect(loginBtn).toBeDisabled();

    const emailInput = screen.getByTestId('email-input');
    userEvent.type(emailInput, 'user@user.gmail.com');
    const passwordInput = screen.getByTestId('password-input');
    userEvent.type(passwordInput, 'senhaSuperSecreta');

    expect(loginBtn).not.toBeDisabled();

    userEvent.click(loginBtn);

    const { pathname } = history.location;

    expect(pathname).toBe('/carteira');
    expect(spy).toHaveBeenCalled();
    expect(screen.getByTestId('header-currency-field').textContent).toBe('BRL');
    expect(screen.getByTestId('email-field').textContent).toBe('user@user.gmail.com');
    spy.mockClear();
  });
});
