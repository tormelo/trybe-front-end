import React from 'react';
import { bool, func, string } from 'prop-types';
import Input from './Input';
import Select from './Select';

class Form extends React.Component {
  render() {
    const {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
      hasTrunfo,
      isSaveButtonDisabled,
      onInputChange,
      onSaveButtonClick,
    } = this.props;

    const trunfoAlert = <span>Você já tem um Super Trunfo em seu baralho</span>;
    const trunfoCheckbox = (
      <Input
        label="Super Trybe Trunfo"
        type="checkbox"
        id="trunfo-input"
        name="cardTrunfo"
        checked={ cardTrunfo }
        onChange={ onInputChange }
      />
    );

    return (
      <form>
        <Input
          label="Nome"
          type="text"
          id="name-input"
          name="cardName"
          value={ cardName }
          onChange={ onInputChange }
        />
        <Input
          label="Descrição"
          type="textarea"
          id="description-input"
          name="cardDescription"
          value={ cardDescription }
          onChange={ onInputChange }
        />
        <Input
          label="Attr01"
          type="number"
          id="attr1-input"
          name="cardAttr1"
          value={ cardAttr1 }
          onChange={ onInputChange }
        />
        <Input
          label="Attr02"
          type="number"
          id="attr2-input"
          name="cardAttr2"
          value={ cardAttr2 }
          onChange={ onInputChange }
        />
        <Input
          label="Attr03"
          type="number"
          id="attr3-input"
          name="cardAttr3"
          value={ cardAttr3 }
          onChange={ onInputChange }
        />
        <Input
          label="Imagem"
          type="text"
          id="image-input"
          name="cardImage"
          value={ cardImage }
          onChange={ onInputChange }
        />
        <Select
          label="Raridade"
          options={ ['Normal', 'Raro', 'Muito raro'] }
          id="rare-input"
          name="cardRare"
          value={ cardRare }
          onChange={ onInputChange }
        />
        {hasTrunfo ? trunfoAlert : trunfoCheckbox}
        <button
          data-testid="save-button"
          type="button"
          disabled={ isSaveButtonDisabled }
          onClick={ onSaveButtonClick }
        >
          Salvar
        </button>
      </form>
    );
  }
}

Form.propTypes = {
  cardName: string.isRequired,
  cardDescription: string.isRequired,
  cardAttr1: string.isRequired,
  cardAttr2: string.isRequired,
  cardAttr3: string.isRequired,
  cardImage: string.isRequired,
  cardRare: string.isRequired,
  cardTrunfo: bool.isRequired,
  hasTrunfo: bool.isRequired,
  isSaveButtonDisabled: bool.isRequired,
  onInputChange: func.isRequired,
  onSaveButtonClick: func.isRequired,
};

export default Form;
