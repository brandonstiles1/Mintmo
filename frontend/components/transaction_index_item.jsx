var React = require('react');

var TransactionIndexItem = React.createClass({

  render: function () {
    var transaction = this.props.transaction;
    var date = new Date(transaction.date);
    var dateFormat =
            [date.getMonth()+1,
             date.getDate(),
             date.getFullYear()].join('/');
    
    return (
      <tr>
        <td className="date">{dateFormat}</td>
        <td className="description">{transaction.description}</td>
        <td className="category">{transaction.category}</td>
        <td className="amount">{transaction.amount}</td>
      </tr>

    );
  }
});


module.exports = TransactionIndexItem;
