var React = require('react'),
    Link = require('react-router').Link;

var InstitutionStore = require('../../stores/institution');

var AddAccountModal = React.createClass({
  getInitialState: function () {
    return {institutions: InstitutionStore.all()};
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

  render: function () {
    var institutions = this.state.institutions.map(function(inst) {
      return (
        <Link
          to={"accounts/modal/new/" + inst.id + "?institution=" + inst.name + "?id=" + inst.id}
          className="add-account-modal"
          key={inst.id}>{inst.name}</Link>
      );
    });

    return (
      <div>
        <h1>Choose from these popular Mintmo accounts</h1>
        {institutions}
      </div>
    );
  }

});

module.exports = AddAccountModal;
