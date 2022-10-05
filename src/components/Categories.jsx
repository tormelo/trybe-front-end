import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Categories extends Component {
  render() {
    const { categories, onCatClick } = this.props;
    const mlCategory = categories;
    return (
      mlCategory.map((category) => {
        const { id, name } = category;
        return (
          <section className="categories" key={ id }>
            <input
              type="button"
              value={ name }
              data-testid="category"
              onClick={ () => onCatClick(id, name) }
            />
          </section>
        );
      })
    );
  }
}

Categories.propTypes = {
  categories: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
  }).isRequired,
  onCatClick: PropTypes.func.isRequired,
};
