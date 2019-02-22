import React, { Component } from 'react';
import { connect } from 'react-redux';
import './list-item.scss';
import { editUser, deleteUser } from '../../store/actions/list';

class ListItem extends Component {
  constructor(props) { 
    super(props)
    this.state = {
      editMode: false,
      newUser: {
        firstName: props.firstName,
        lastName: props.lastName,
        score: props.score
      }
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if(!prevState.editMode) {
      return {
        ...prevState,
        newUser: {
          firstName: nextProps.firstName,
          lastName: nextProps.lastName,
          score: nextProps.score
        }
      }
    }
    return prevState;
  }
  

  deleteUser = (id) => {
    this.props.deleteUser(id);
  }

  editUser = () => {
    const { id } = this.props;
    const { newUser : { firstName, lastName, score } } = this.state;
    if(!(firstName && lastName && score)) {
      return alert('Fill all fields!');
    }
    if(score < 0 || score > 100) {
      return alert('Incorrect score field!');
    }
    this.props.editUser({id, firstName, lastName, score });
    this.onCancelEdit();
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
    const {
      firstName,
      lastName,
      score
    } = this.props;

    this.setState({
      editMode: false,
      newUser: { firstName, lastName, score }
    })
  }

  render() {
    const { id } = this.props;
    const {
      editMode,
      newUser: {
        firstName,
        lastName,
        score
      }
    } = this.state;

    return (
      <>
      {editMode ?
        (<tr className="list-item">
          <td>
            <input placeholder="First Name" type="text" name="firstName" value={firstName} onChange={this.handleInput}></input>
            <input placeholder="Last Name" type="text" name="lastName" value={lastName} onChange={this.handleInput}></input>
          </td>
          <td>
            <input placeholder="Score" type="number" name="score" value={score} onChange={this.handleInput}></input>
          </td>
          <td>
            <button onClick={this.editUser} type="button">Submit</button>
          </td>
          <td>
            <button onClick={() => this.setState({ editMode: false })} type="button">Cancel</button>
          </td>
        </tr>)
        :
        (<tr className="list-item">
          <td>{`${lastName}, ${firstName}`}</td>
          <td>{`${score}`}</td>
          <td>
            <button onClick={() => this.deleteUser(id)} type="button">Delete</button>
          </td>
          <td>
            <button onClick={() => this.setState({ editMode: true })} type="button">Edit</button>
          </td>
        </tr>)
      }
      </>
    );
  }
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = {
  editUser,
  deleteUser
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ListItem);
