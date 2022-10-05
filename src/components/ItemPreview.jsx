import React from 'react';
import { Link } from 'react-router-dom';
import { string, number } from 'prop-types';
import { addItemCart } from '../services/cartStorage';

class ItemPreview extends React.Component {
  render() {
    const { item, updateCart } = this.props;
    const { title, thumbnail,
      price, id, shipping: { free_shipping: freeShipping } } = item;

    return (
      <div className="product-card" data-testid="product">
        <div className="card-name">
          <Link data-testid="product-detail-link" to={ `/product/${id}` }>{title}</Link>
        </div>
        <div className="div-image">
          <img
            className="card-image"
            src={ thumbnail }
            alt="Nome do item"
          />
        </div>
        <div>
          <span>{`Preco: R$ ${price}`}</span>
        </div>
        <div>
          <input
            type="button"
            value="Adicione ao carrinho"
            onClick={ () => {
              addItemCart(item);
              updateCart();
            } }
            data-testid="product-add-to-cart"
          />

        </div>
        {freeShipping && <p data-testid="free-shipping">Frete Grátis!</p> }
      </div>
    );
  }
}

ItemPreview.propTypes = {
  name: string,
  imagem: string,
  preco: number,
}.isRequired;

export default ItemPreview;
