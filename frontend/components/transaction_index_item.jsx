var React = require('react');

var ComponentActions = require('../actions/component_actions');

var TransactionIndexItem = React.createClass({

  handleClick: function () {
    this.props.onClick();
  },

  render: function () {

    var transaction = this.props.transaction;
    var date = ComponentActions.formatDate(transaction.date);

    return (
      <tr onClick={this.handleClick}>
        <td className="date">{date}</td>
        <td className="description">{transaction.description}</td>
        <td className="category">{transaction.category}</td>
        <td className="amount">{transaction.amount}</td>
      </tr>
    );
  }
});


module.exports = TransactionIndexItem;
