import React from 'react';
import Card from './components/Card';
import Form from './components/Form';
import Input from './components/Input';
import Select from './components/Select';
import emptyCard from './emptyCard';
import './App.css';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      ...emptyCard,
      hasTrunfo: false,
      isSaveButtonDisabled: true,
      saved: [],
      nameFilter: '',
      rarityFilter: 'todas',
      trunfoFilter: false,
    };

    this.onSaveButtonClick = this.onSaveButtonClick.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
  }

  handleTrunfo() {
    const { saved } = this.state;
    const hasTrunfo = saved.some(({ cardTrunfo }) => cardTrunfo);
    this.setState({
      hasTrunfo,
    });
  }

  onSaveButtonClick() {
    const {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
    } = this.state;

    const card = {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
    };

    this.setState((state) => ({
      ...emptyCard,
      saved: [...state.saved, card],
    }), this.handleTrunfo);
  }

  onDeleteButtonClick(indexToRemove) {
    console.log(indexToRemove);
    this.setState((state) => ({
      saved: state.saved.filter((card, index) => index !== indexToRemove),
    }), this.handleTrunfo);
  }

  onInputChange({ target }) {
    const { name, type } = target;
    this.setState({
      [name]: type === 'checkbox' ? target.checked : target.value,
    }, this.validateForm);
  }

  validateForm() {
    const {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
    } = this.state;

    const isValid = (
      cardName
      && cardImage
      && cardDescription
      && this.isAttrValid(cardAttr1)
      && this.isAttrValid(cardAttr2)
      && this.isAttrValid(cardAttr3)
      && this.isSumValid(cardAttr1, cardAttr2, cardAttr3)
    );

    this.setState({
      isSaveButtonDisabled: !isValid,
    });
  }

  isAttrValid(attribute) {
    const min = 0;
    const max = 90;
    const num = parseFloat(attribute);
    return (num >= min && num <= max);
  }

  isSumValid(attr1, attr2, attr3) {
    const maxSum = 210;
    const num1 = parseFloat(attr1);
    const num2 = parseFloat(attr2);
    const num3 = parseFloat(attr3);
    return (num1 + num2 + num3) <= maxSum;
  }

  render() {
    const { nameFilter, rarityFilter, trunfoFilter, saved } = this.state;
    const cards = saved
      .filter(({ cardName: name, cardRare: rarity, cardTrunfo: trunfo }) => {
        if (trunfoFilter) return trunfo;
        return (
          name.includes(nameFilter)
          && (rarityFilter === 'todas' || rarity === rarityFilter)
        );
      })
      .map((card, index) => (
        <Card key={ `${index}-${card.cardName}` } { ...card }>
          <button
            data-testid="delete-button"
            type="button"
            onClick={ () => this.onDeleteButtonClick(index) }
          >
            Excluir
          </button>
        </Card>
      ));

    return (
      <div>
        <section>
          <h1>Tryunfo</h1>
          <Form
            { ...this.state }
            onInputChange={ this.onInputChange }
            onSaveButtonClick={ this.onSaveButtonClick }
          />
          <Card
            { ...this.state }
          />
        </section>
        <section>
          Filtros de busca
          <Input
            label="Nome"
            type="text"
            id="name-filter"
            name="nameFilter"
            value={ nameFilter }
            onChange={ this.onInputChange }
            disabled={ trunfoFilter }
          />
          <Select
            label="Raridade"
            options={ ['Todas', 'Normal', 'Raro', 'Muito raro'] }
            id="rare-filter"
            name="rarityFilter"
            value={ rarityFilter }
            onChange={ this.onInputChange }
            disabled={ trunfoFilter }
          />
          <Input
            label="Super Trunfo"
            type="checkbox"
            id="trunfo-filter"
            name="trunfoFilter"
            checked={ trunfoFilter }
            onChange={ this.onInputChange }
          />
          {cards}
        </section>
      </div>
    );
  }
}

export default App;
