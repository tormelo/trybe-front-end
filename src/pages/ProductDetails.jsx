import React from 'react';
import PropTypes from 'prop-types';
import { getProductDetails } from '../services/api';
import { addItemCart } from '../services/cartStorage';
import { getReviews, saveReview } from '../services/reviewStorage';
import CartLink from '../components/CartLink';

const MAX_RATING = 5;
const INITIAL_INPUTS = {
  email: '',
  rating: '',
  evaluation: '',
};

class ProductDetails extends React.Component {
  state = {
    product: {},
    reviews: [],
    ...INITIAL_INPUTS,
    isFormValid: false,
  }

  componentDidMount = async () => {
    console.log(this.props);
    const { match: { params: { id } } } = this.props;
    const product = await getProductDetails(id);
    const reviews = getReviews(id);
    this.setState({ product, reviews });
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, this.validateForm);
  }

  validateForm = () => {
    const { email, rating } = this.state;
    const isEmailValid = email.match(/^([\w.-]+)(@[\w-]+)([.][\w]+)$/i);
    this.setState({ isFormValid: isEmailValid && rating });
  }

  onReviewButtonClick = (event) => {
    event.preventDefault();
    const { match: { params: { id } } } = this.props;
    const { email, rating, evaluation } = this.state;
    saveReview(id, { email, rating, evaluation });
    const reviews = getReviews(id);
    this.setState({ reviews, ...INITIAL_INPUTS });
  }

  render() {
    const { product, reviews, email, rating, evaluation, isFormValid } = this.state;
    const { title, thumbnail, price } = product;
    const allBlank = !email && !rating;
    const { updateCart, cart } = this.props;

    const ratingRadios = [];
    for (let index = 1; index <= MAX_RATING; index += 1) {
      const radioButton = (
        <input
          key={ `${index}-rating` }
          data-testid={ `${index}-rating` }
          type="radio"
          name="rating"
          value={ index }
          checked={ rating === index.toString() }
          onChange={ this.handleChange }
          required
        />
      );
      ratingRadios.push(radioButton);
    }

    const reviewElements = reviews.map((review, index) => (
      <div key={ index } className="review">
        <p data-testid="review-card-email">{review.email}</p>
        <p data-testid="review-card-rating">{review.rating}</p>
        <p data-testid="review-card-evaluation">{review.evaluation}</p>
      </div>
    ));

    return (
      <div>
        <CartLink cart={ cart } />
        <p data-testid="product-detail-name">{title}</p>
        <img data-testid="product-detail-image" src={ thumbnail } alt={ title } />
        <p data-testid="product-detail-price">{price}</p>
        <button
          type="button"
          data-testid="product-detail-add-to-cart"
          onClick={ () => {
            addItemCart(product);
            updateCart();
          } }
        >
          Adicionar ao carrinho
        </button>

        <form>
          <label htmlFor="email">
            Email
            <input
              data-testid="product-detail-email"
              id="email"
              name="email"
              type="email"
              value={ email }
              onChange={ this.handleChange }
              required
            />
          </label>
          <div>
            {ratingRadios}
          </div>
          <textarea
            data-testid="product-detail-evaluation"
            name="evaluation"
            value={ evaluation }
            onChange={ this.handleChange }
          />
          <button
            data-testid="submit-review-btn"
            type="button"
            disabled={ !isFormValid || allBlank }
            onClick={ this.onReviewButtonClick }
          >
            Avaliar
          </button>
        </form>
        {
          (!isFormValid && !allBlank)
          && <span data-testid="error-msg">Campos inválidos</span>
        }
        {reviewElements}
      </div>
    );
  }
}

ProductDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }),
}.isRequired;

export default ProductDetails;
