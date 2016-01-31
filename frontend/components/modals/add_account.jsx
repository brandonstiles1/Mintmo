var React = require('react'),
    Link = require('react-router').Link;

var InstitutionStore = require('../../stores/institution'),
    AddAccountFormModal = require('./add_account_form');

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

  selectInstitution: function (institution) {
    this.setState({institution: institution});
  },

  unselectInstitution: function () {
    this.setState({institution: null});
  },

  render: function () {
    var inst = this.state.institution;

    var institutions = this.state.institutions.map(function(inst) {
      return (
        <Link
          to={"accounts/modal/new/" + inst.id + "?institution=" + inst.name + "?id=" + inst.id}
          className="add-account-modal"
          key={inst.id}>{inst.name}</Link>
      );
    });

    if (institution) {
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
          {institutions}
        </div>
      );
    }
  }

});

module.exports = AddAccountModal;
