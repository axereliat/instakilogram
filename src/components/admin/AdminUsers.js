import React, {Component, Fragment} from 'react';
import {Modal, ModalBody, ModalFooter, ModalHeader, Table} from "reactstrap";
import toastr from 'toastr';
import {Requester} from "../../api/requester";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Auth} from "../../api/auth";

class AdminUsers extends Component {

    constructor(props) {
        super(props);

        this.state = {
            users: [],
            selectedUser: null,
            loading: false,
            loadingUserEdit: false,
            deleteLoading: false,
            userToDelete: '',
            confirm: false
        };
    }

    componentDidMount() {
        this.setState({loading: true});
        Requester.fetchUsers('')
            .then(res => {
                this.setState({
                    users: res.data,
                    loading: false
                });
            })
            .catch(err => {
                this.setState({
                    loading: false
                }, () => {
                    console.log(err);
                    toastr.error('Something went wrong.');
                });
            })
    }

    selectUser = user => {
        this.setState({
            selectedUser: user
        });
    };

    deselectUser = () => {
        this.setState({selectedUser: null});
    };

    handleChange = e => {
        this.setState({selectedUser: {...this.state.selectedUser, [e.target.name]: e.target.value}});
    };

    handleSubmit = e => {
        e.preventDefault();

        this.setState({loadingUserEdit: true});
        Requester.adminEditUser(this.state.selectedUser._id, this.state.selectedUser.username)
            .then(() => {
                this.setState({
                    users: this.state.users.map(u => {
                        if (u._id === this.state.selectedUser._id) {
                            u.username = this.state.selectedUser.username;
                        }
                        return u;
                    }), loadingUserEdit: false, selectedUser: null
                }, () => {
                    toastr.success('User updated.');
                });
            })
            .catch(err => {
                this.setState({loadingUserEdit: false}, () => {
                    console.log(err);
                    toastr.error(err.response.data.message);
                });
            })
    };

    deleteUser = userId => {
        this.setState({deleteLoading: true});
        Requester.adminDeleteUser(userId)
            .then(() => {
                this.setState({users: this.state.users.filter(u => u._id !== userId), deleteLoading: false, confirm: false}, () => {
                    toastr.success('User deleted.');
                });
            })
            .catch(err => {
                console.log(err);
                toastr.error(err.response.data.message);
                this.setState({deleteLoading: false, confirm: false});
            })
    };

    closeConfirm = () => {
        this.setState({confirm: false});
    };

    openConfirm = userToDelete => {
        this.setState({confirm: true, userToDelete});
    };

    render() {
        return (
            <div className="jumbotron">
                {this.state.loading ? <FontAwesomeIcon icon="spinner" size="5x" spin/> :
                    <Fragment>
                        <Modal isOpen={this.state.confirm}>
                            <ModalHeader>Delete {this.state.userToDelete.username}?</ModalHeader>
                            <ModalBody>
                                <p>Are you sure you want to delete {this.state.userToDelete.username} and all of his/her posts?</p>
                                <p>This action cannot be undone.</p>
                            </ModalBody>
                            <ModalFooter>
                                <button className="btn btn-secondary"
                                        onClick={this.closeConfirm}
                                        disabled={this.state.deleteLoading}>
                                    Cancel
                                </button>
                                <button className="btn btn-danger"
                                        onClick={() => this.deleteUser(this.state.userToDelete._id)}
                                        disabled={this.state.deleteLoading}>
                                    {this.state.deleteLoading ? 'Please wait...' : 'Delete'}
                                </button>
                            </ModalFooter>
                        </Modal>
                        <Modal isOpen={this.state.selectedUser !== null}>
                            <ModalHeader>Edit user</ModalHeader>
                            <ModalBody>
                                <label htmlFor="username">Username</label>
                                <input type="text"
                                       className="form-control"
                                       id="username"
                                       name="username"
                                       onChange={this.handleChange}
                                       value={this.state.selectedUser ? this.state.selectedUser.username : null} />
                            </ModalBody>
                            <ModalFooter>
                                <button className="btn btn-secondary"
                                        onClick={this.deselectUser}
                                        disabled={this.state.loadingUserEdit}>
                                    Cancel
                                </button>
                                <button className="btn btn-primary"
                                        onClick={this.handleSubmit}
                                        disabled={this.state.loadingUserEdit}>
                                    {this.state.loadingUserEdit ? 'Please wait...' : 'Save Changes'}
                                </button>
                            </ModalFooter>
                        </Modal>
                        <h4>All Instructors</h4>
                        <Table>
                            <thead>
                            <tr>
                                <th>Id</th>
                                <th>Username</th>
                                <th>Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.state.users.filter(u => u.username !== Auth.getUsername()).map(user => (
                                <tr key={user._id}>
                                    <th scope="row">{user._id}</th>
                                    <td>{user.username}</td>
                                    <td>
                                        <button className="btn btn-secondary"
                                                onClick={() => this.selectUser(user)}>Edit
                                        </button>
                                        {' '}
                                        <button className="btn btn-danger" onClick={() => this.openConfirm(user)} disabled={this.state.deleteLoading}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </Table>
                    </Fragment>
                }
            </div>
        );
    }
}

export default AdminUsers;
