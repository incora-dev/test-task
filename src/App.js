import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.scss';
import List from './components/List/List';
import { getUsers } from './store/actions/list';

class App extends Component {
  componentDidMount() {
    this.props.getUsers();
  }

  render() {
    const {
      users
    } = this.props;

    return (
      <div className="page">
        <List users={users} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  users: [...state.list.users]
});

const mapDispatchToProps = {
  getUsers
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App);
