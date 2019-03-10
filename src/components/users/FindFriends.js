import React, {Component} from 'react';
import toastr from 'toastr';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Requester} from "../../api/requester";
import UsersList from "./UsersList";

class FindFriends extends Component {

    constructor(props) {
        super(props);

        this.state = {
            search: '',
            users: [],
            loading: false
        };
    }

    componentDidMount() {
        this.setState({loading: true});
        Requester.fetchUsers('')
            .then(res => {
                this.setState({
                    loading: false,
                    users: res.data
                });
            })
            .catch(err => {
                this.setState({loading: false});
                console.log(err);
                toastr.error('An error occurred.');
            })
    }

    handleChange = e => {
        this.setState({[e.target.name]: e.target.value});
    };

    handleSubmit = e => {
        e.preventDefault();

        this.setState({loading: true});
        Requester.fetchUsers(this.state.search)
            .then(res => {
                this.setState({
                    loading: false,
                    users: res.data
                });
            })
            .catch(err => {
                this.setState({loading: false});
                console.log(err);
                toastr.error('An error occurred.');
            })
    };

    render() {
        return (
            <div className="jumbotron">
                <form className="form-row mb-3" onSubmit={this.handleSubmit}>
                    <input type="text"
                           name="search"
                           placeholder="Search for username..."
                           style={{width: '40%'}}
                           className="form-control"
                           onChange={this.handleChange}
                           value={this.state.search}/>
                    <button className="btn btn-primary" type="submit">Search</button>
                </form>
                {this.state.loading ? <FontAwesomeIcon icon="spinner" size="5x" spin /> :
                    this.state.users.length === 0 ? <h3>No results.</h3> : <UsersList users={this.state.users} />
                }
            </div>
        );
    }
}

export default FindFriends;
