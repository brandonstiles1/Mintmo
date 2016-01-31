var React = require('react'),
    LinkedStateMixin = require('react-addons-linked-state-mixin'),
    Link = require('react-router').Link;

var CurrentUserStore = require('../../stores/current_user_store'),
    SessionsApiUtil = require('../../util/sessions_api_util'),
    UsersApiUtil = require('../../util/users_api_util'),
    UsersStore = require('../../stores/users_store');


var EditUserFormModal = React.createClass({

  getInitialState: function() {
    this.currentUser = CurrentUserStore.currentUser();
    var user = UsersStore.find(this.currentUser.id);

    return {
      user: user,
      fname: user.fname,
      lname: user.lname,
      gender: user.gender,
      age: user.age,
      id: user.id
    };
  },

  componentWillMount: function() {
  },

  componentDidMount: function() {
    SessionsApiUtil.fetchCurrentUser();
    this.storeListener = UsersStore.addListener(this.onChange);
  },

  componentWillUnmount: function() {
    this.storeListener.remove();
  },

  closeModal: function () {
    this.props.toggleModal();
  },

  onChange: function () {
    var user = UsersStore.find(this.currentUser.id);
    this.setState({
      user: user,
      fname: user.fname,
      lname: user.lname,
      gender: user.gender,
      age: user.age,
      id: user.id
    });
  },

  render: function() {
    var maleCheck = "",
        femaleCheck = "";

    if (this.state.gender === "Male") {
      maleCheck = "checked";
    } else if (this.state.gender === "Female") {
      femaleCheck = "checked";
    }

    return (
      <div>
        <h1 className="main-header"> About Me</h1>
          <p>Tell us about yourself so we can improve the financial advice we provide</p>
        <h2 className="about-me">About Me</h2>
        <form className="form group" >
          <fieldset className="form-fieldset">

            <label>Add a picture</label>
              <input
                type="file"
                onChange={ this.handleFileChange }/>

            <img className="preview-image" src={ this.state.image_url } />

            <div className="input">
              <label>First Name</label>
              <input
                type="text"
                valueLink={this.linkState('fname')} />
            </div>

            <div className="input">
              <label>Last Name</label>
              <input
                type="text"
                valueLink={this.linkState('lname')} />
            </div>

            <div className="input">
              <label>Gender</label>
                <input
                  id="user-gender-male"
                  type="radio"
                  value="Male"
                  valueLink={this.linkState('gender')} maleCheck />
                <label for="user-gender-male">Male</label>

                <input
                  id="user-gender-female"
                  type="radio"
                  value="Female"
                  valueLink={this.linkState('gender')} femaleCheck />
                <label for="user-gender-female">female</label>
            </div>

            <div className="input">
              <label>Age</label>
              <input
                type="number"
                valueLink={this.linkState('age')} />
            </div>

            <div className="submit">
              <button
                className="update-user-cancel"
                onClick={this.closeModal}>CANCEL</button>
              <button
                className="update-user-submit"
                onClick={this.handleUpdate}>I'M DONE</button>
            </div>
          </fieldset>
        </form>
      </div>
    );
  },

  handleFileChange: function (e) {
    var reader = new FileReader();
    var file = e.currentTarget.files[0];
    var that = this;
    reader.onloadend = function () {
      that.setState({ image_url: reader.result, imageFile: file });
    };

    if (file) {
      reader.readAsDataURL(file);
    } else {
      this.setState({ image_url: "", imageFile: null });
    }
  },

  handleUpdate: function () {
    var imageFile = null;
    var user = new FormData();

    if ( typeof this.state.imageFile !== "undefined" ) {
      user.append("user[avatar]", this.state.imageFile);
    }

    user.append("user[id]", this.state.id);
    user.append("user[fname]", this.state.fname);
    user.append("user[lname]", this.state.lname);
    user.append("user[gender]", this.state.gender);
    user.append("user[age]", this.state.age);

    UsersApiUtil.receiveUserUpdate(user);
  }

});

module.exports = EditUserFormModal;
