var React = require('react'),
    Link = require('react-router').Link;

var InstitutionStore = require('../../stores/institution'),
    AddAccountFormModal = require('./add_account_form'),
    ApiUtil = require('../../util/api_util');

var AddAccountModal = React.createClass({
  getInitialState: function () {
    return {institutions: InstitutionStore.all(), institution: null};
  },

  componentDidMount: function() {
    this.storeListener = InstitutionStore.addListener(this.onChange);
    ApiUtil.fetchInstitutions();
  },

  componentWillUnmount: function() {
    this.storeListener.remove();
  },

  onChange: function () {
    this.setState({institutions: InstitutionStore.all()});
  },

  selectInstitution: function (inst) {
    this.setState({institution: inst});
  },

  unselectInstitution: function () {
    this.setState({institution: null});
  },

  render: function () {
    var inst = this.state.institution,
        insts = this.state.institutions,
        that = this;

    if (!insts) { return <div></div>; }

    var institutions = insts.map(function(inst, index) {
      return (
        <li
          onClick={that.selectInstitution.bind(null, inst)}
          key={index}>{inst.name}
        </li>
      );
    });

    if (inst) {
      return (
        <AddAccountFormModal
          goBack={this.unselectInstitution}
          inst={inst.name}
          id={inst.id} />
      );
    } else {
      return (
        <div>
          <h1>Choose from these popular Mintmo accounts</h1>
          <ul>
            {institutions}
          </ul>
        </div>
      );
    }
  }

});

module.exports = AddAccountModal;
