var React = require('react'),
    PieChart = require('react-chartjs').Pie;

var ComponentActions = require('../../actions/component_actions'),
TransactionStore = require('../../stores/transaction'),
ApiUtil  = require('../../util/api_util');

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


var _highlights = {
  0: "#72ecc5",
  1: "#72d7ec",
  2: "#ef88dd",
  3: "#ec8772",
  4: "#ecc572"
};
var _colors = {
  0: "#45e6b2",
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

  generateLegend: function () {
    var that = this;
    return Object.keys(this.transCats).map(function(cat, index) {
      var color = that.getColor(index);
      color = "h" + color.slice(1, color.length);
      return (
        <li className="group" key={index}>
          <div className={color} ></div>
          <p className="chart-legend-cat">{cat} </p>
          <p>{accounting.formatMoney(that.transCats[cat])}</p>
        </li>
      );
    });
  },


  getChartData: function () {
    var that = this;
    this.transCats = ComponentActions.getTopTransactionCategories(this.state.transactions);
    var data = [];
    Object.keys(this.transCats).forEach(function(cat, index) {
      data.push(
        {
          value: that.transCats[cat],
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
      <div className="group">
        <h1 className="chart-header group">Top 5 Transaction Categories</h1>
        <PieChart data={this.getChartData()} options={chartOptions} className="chart" width="550" height="200"/>
        <ul className="legend">
          {this.generateLegend()}
        </ul>
      </div>

    );
  }
});



module.exports = TransactionsPieChart;
