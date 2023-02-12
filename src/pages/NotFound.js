import React, { Component } from 'react';
import css from '../styles/NotFound.module.css';

class NotFound extends Component {
  render() {
    return (
      <div className={ css.notFound }>
        <h1 className={ css.notFound__title }>Página Não Encontrada</h1>
        <img
          className={ css.notFound__gif }
          src="https://media.giphy.com/media/lqFHf5fYMSuKcSOJph/giphy.gif"
          alt="Not Found GIF"
        />
        <p className={ css.notFound__text }>
          Desculpe, a página que você está procurando não foi encontrada.
        </p>
      </div>
    );
  }
}

export default NotFound;
