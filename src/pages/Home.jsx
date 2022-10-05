import React from 'react';
import { func } from 'prop-types';
import { getCategories,
  getProductsFromQuery, getProductsFromCategoryAndQuery } from '../services/api';
import ItemPreview from '../components/ItemPreview';
import Categories from '../components/Categories';
import CartLink from '../components/CartLink';

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      search: '',
      categories: [],
      productList: [],
    };
  }

  async componentDidMount() {
    this.setState({ categories: await getCategories() });
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  searchButtonClick = async () => {
    const { search } = this.state;
    const result = await getProductsFromQuery(search);
    const productList = result.results;
    this.setState({
      productList,
    });
  }

  onCatClick = async (categoryID, query) => {
    const result = await getProductsFromCategoryAndQuery(categoryID, query);
    const productList = result.results;
    this.setState({
      productList,
    });
  }

  render() {
    const { search, categories, productList } = this.state;
    const { cart, updateCart } = this.props;
    const itemPreviews = productList.map((item) => (
      <ItemPreview
        key={ item.id }
        item={ item }
        updateCart={ updateCart }
      />
    ));

    return (
      <section>
        <input
          type="text"
          placeholder="Digite sua pesquisa"
          name="search"
          value={ search }
          onChange={ this.handleChange }
          data-testid="query-input"
        />
        <button
          data-testid="query-button"
          type="button"
          onClick={ this.searchButtonClick }
        >
          Pesquisar
        </button>

        <p data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </p>

        <CartLink cart={ cart } />
        <Categories categories={ categories } onCatClick={ this.onCatClick } />

        <div className="search-list">
          {productList.length > 0 ? itemPreviews : <p>Nenhum produto foi encontrado</p>}
        </div>
      </section>
    );
  }
}
Home.propTypes = {
  addItemCart: func,
}.isRequired;
export default Home;
