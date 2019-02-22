import React, { Component } from 'react';
import { connect } from 'react-redux';
import './list.scss';
import ListItem from '../List-item/List-item';
import { addUser, setUsers } from '../../store/actions/list';

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editMode: false,
      sortType: '',
      newUser: {
        firstName: '',
        lastName: '',
        score: ''
      }
    }

    this.sortBy = this.sortBy.bind(this);
  }

  addUser = (event) => {
    event.preventDefault();
    const { newUser : { firstName, lastName, score } } = this.state;

    if(!(firstName && lastName && score)) {
      return alert('Fill all fields!');
    }
    if(score < 0 || score > 100) {
      return alert('Incorrect score field!');
    }

    this.props.addUser({ firstName, lastName, score });
    this.onCancelEdit();
  }

  sortBy(array, key) {
    const { setUsers } = this.props;
    const { sortType } = this.state;
    const newList = array.sort((a, b) => {
      if (a[key] < b[key]) {
        return sortType === 'asc' ? -1 : 1;
      }
      else if (a[key] > b[key]) {
        return sortType === 'asc' ? 1 : -1;
      }
      else if ((a[key] === b[key]) && key === 'score') {
        if (a.lastName > b.lastName) {
          return sortType === 'asc' ? 1 : -1;
        }
        else if (a.lastName < b.lastName) {
          return sortType === 'asc' ? -1 : 1;
        }
      }
        return 0;
    });
    this.setState(prevState => {
      const sortType = prevState.sortType === 'asc' ? 'desc' : 'asc';
      return {
        ...prevState,
        sortType
      }
    })
    setUsers(newList)
  }

  handleInput = (event) => {
    const { name, value } = event.target;
    this.setState((prevState) => {
      return {
        ...prevState,
        newUser: {
          ...prevState.newUser,
          [name]: value
        }
      };
    });
  }

  onCancelEdit = () => {
    this.setState({
      editMode: false,
      newUser: {
        firstName: '',
        lastName: '',
        score: ''
      }
    })
  }

  renderUserAddForm = () => {
    const { newUser : { firstName, lastName, score } } = this.state;
    return (
      <form className="add-form">
        <input placeholder="First Name" type="text" name="firstName" value={firstName} onChange={this.handleInput}></input>
        <input placeholder="Last Name" type="text" name="lastName" value={lastName} onChange={this.handleInput}></input>
        <input placeholder="Score" type="number" name="score" value={score} onChange={this.handleInput}></input>
        <div className="add-form__btns">
          <button onClick={this.addUser} type="submit">Submit</button>
          <button onClick={this.onCancelEdit} type="button">Cancel</button>
        </div>
      </form>
    );
  }

  render() {
    const { users } = this.props;
    const { editMode } = this.state;
    return (
      <div className="list">
        <div className="container">
          {users.length ?
            <table className="list__items">
              <thead>
                <tr>
                  <th className="list__sort-btn" onClick={() => this.sortBy(users, 'lastName')}>Name</th>
                  <th className="list__sort-btn" onClick={() => this.sortBy(users, 'score')}>Score</th> 
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {
                  users.map(user => <ListItem key={user.id} {...user}/>)
                }
              </tbody>
            </table>
          :
            <p className="list__empty">Empty list</p>
          }
          {editMode && this.renderUserAddForm()}
          <button
            className="list__new-user"
            onClick={() => this.setState({editMode: !editMode})}
            >
              Add user
            </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = {
  addUser,
  setUsers
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(List);
