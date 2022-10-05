import React from 'react';
import { bool, func, string } from 'prop-types';

class Input extends React.Component {
  render() {
    const { label, type, id, name, checked, value, onChange, disabled } = this.props;
    return (
      <label htmlFor={ id }>
        {label}
        <input
          type={ type }
          id={ id }
          data-testid={ id }
          name={ name }
          value={ value }
          checked={ checked }
          onChange={ onChange }
          disabled={ disabled }
        />
      </label>
    );
  }
}

Input.propTypes = {
  label: string.isRequired,
  type: string.isRequired,
  id: string.isRequired,
  name: string.isRequired,
  checked: bool,
  value: string,
  onChange: func.isRequired,
  disabled: bool,
};

Input.defaultProps = {
  checked: false,
  value: '',
  disabled: false,
};

export default Input;
