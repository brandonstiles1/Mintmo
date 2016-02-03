var React = require('react'),
    PieChart = require('react-chartjs').Pie;

var ComponentActions = require('../../actions/component_actions'),
    TransactionStore = require('../../stores/transaction'),
    ApiUtil  = require('../../util/api_util');

var _highlights = {
  0: "#45e661",
  1: "#45cae6",
  2: "#e645ca",
  3: "#e66145",
  4: "#e6b245"
};
var _colors = {
  0: "#45e661",
  1: "#45cae6",
  2: "#e645ca",
  3: "#e66145",
  4: "#e6b245"
};

var TransactionsPieChart = React.createClass({


  getInitialState: function () {
    return { transactions: TransactionStore.all() };
  },

  componentDidMount: function () {
    ApiUtil.fetchTransactions(this.state.page);
    this.storeListener = TransactionStore.addListener(this.onChange);
  },

  onChange: function () {
    this.setState({ transactions: TransactionStore.all() });
  },

  componentWillUnmount: function () {
    this.storeListener.remove();
  },

  cashData: function () {

    var accountBalance = this.state.accountBalances;
    if (!accountBalance.Cash) return -1;

    return (
      {
        value: accountBalance.Cash,
        label: "Cash",
        highlight: "#FF5A5E",
        color:"#F7464A"
      }
    );
  },


  getChartData: function () {
    var that = this;
    var transCats = ComponentActions.getTopTransactionCategories(this.state.transactions);
    var data = [];
    Object.keys(transCats).forEach(function(cat, index) {
      data.push(
        {
          value: transCats[cat],
          label: cat,
          highlight: that.getHighlight(index),
          color: that.getColor(index)
        }
      );
    });


    return data;
  },

  getHighlight: function (index) {
    return _highlights[index];
  },

  getColor: function (index) {
    return _colors[index];
  },



  render: function() {
    return <PieChart data={this.getChartData()} width="600" height="250"/>;
  }
});

// TransactionsPieChart.defaults.global.scaleLabel = function (label) {
//     return label.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
// };
//
// TransactionsPieChart.defaults.global.multiTooltipTemplate = function (label) {
//     return label.datasetLabel + ': ' + label.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
// };

module.exports = TransactionsPieChart;
