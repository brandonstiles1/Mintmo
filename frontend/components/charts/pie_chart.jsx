var Chart = require('chart.js');

var React = require('react'),
    PieChart = require('react-chartjs').Pie;


Chart.defaults.global.scaleLabel = function(label){
    return label.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};
Chart.defaults.global.responsive = true;
Chart.defaults.global.multiTooltipTemplate = function (label) {
  return label.datasetLabel + ': ' + label.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

var chartOptions = {
  animation: true,
  animationEasing: "easeOutQuart",
  showTooltips: true,
  scaleShowLabels: true,
  scaleLabel: function(label) {
    return label.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  },
  datasetLabel: function(label) {
    return label.datasetLabel + ': ' + label.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
};

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
    this.setState({ transactions: TransactionStore.all()});
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


  getChartOptions: function () {
    return (
      [{
        scaleLabel: function (label) {
          return label.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        },
        multiTooltipTemplate: function (label) {
          return label.datasetLabel + ': ' + label.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        }
      }]
    );
  },

  render: function() {

    return (
      <div>
        <h1>Top 5 Transaction Categories</h1>
        <PieChart data={this.getChartData()} options={chartOptions} ref="chart" width="550" height="200"/>
      </div>

    );
  }
});



module.exports = TransactionsPieChart;
