import React, { Component } from 'react';
import { connect } from 'react-redux';
import { arrayOf } from 'prop-types';
import { deleteExpense, requestEditExpense } from '../redux/actions';

class Table extends Component {
  onEditButtonClick = (expenseId) => {
    const { dispatch } = this.props;
    dispatch(requestEditExpense(expenseId));
  };

  onDeleteButtonClick = (expenseId) => {
    const { dispatch } = this.props;
    dispatch(deleteExpense(expenseId));
  };

  render() {
    const { expenses } = this.props;
    return (
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          {
            expenses.map((expense) => {
              const {
                value,
                description,
                currency,
                method,
                tag,
                id,
                exchangeRates,
              } = expense;
              const { ask, name } = exchangeRates[currency];
              return (
                <tr key={ `expense-${id}` }>
                  <td>{description}</td>
                  <td>{tag}</td>
                  <td>{method}</td>
                  <td>{Number(value).toFixed(2)}</td>
                  <td>{name}</td>
                  <td>{Number(ask).toFixed(2)}</td>
                  <td>{(ask * value).toFixed(2)}</td>
                  <td>Real</td>
                  <td>
                    <button
                      data-testid="edit-btn"
                      type="button"
                      onClick={ () => this.onEditButtonClick(id) }
                    >
                      Editar
                    </button>
                    <button
                      data-testid="delete-btn"
                      type="button"
                      onClick={ () => this.onDeleteButtonClick(id) }
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              );
            })
          }
        </tbody>
      </table>
    );
  }
}

Table.propTypes = {
  expenses: arrayOf({}),
}.isRequires;

const mapStateToProps = ({ wallet }) => ({
  expenses: wallet.expenses,
});

export default connect(mapStateToProps)(Table);
