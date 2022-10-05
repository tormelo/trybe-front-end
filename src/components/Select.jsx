import React from 'react';
import { arrayOf, bool, func, string } from 'prop-types';

class Select extends React.Component {
  render() {
    const { label, options, id, name, value, onChange, disabled } = this.props;
    const optionElements = options.map((option) => (
      <option key={ option } value={ option.toLowerCase() }>{option}</option>
    ));
    return (
      <label htmlFor={ id }>
        {label}
        <select
          id={ id }
          data-testid={ id }
          name={ name }
          value={ value }
          onChange={ onChange }
          disabled={ disabled }
        >
          { optionElements }
        </select>
      </label>
    );
  }
}

Select.propTypes = {
  label: string.isRequired,
  options: arrayOf(string).isRequired,
  id: string.isRequired,
  name: string.isRequired,
  value: string.isRequired,
  onChange: func.isRequired,
  disabled: bool,
};

Select.defaultProps = {
  disabled: false,
};

export default Select;
