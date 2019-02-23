import React, {Component} from 'react';
import {Requester} from "../../api/requester";
import toastr from 'toastr';
import {Auth} from "../../api/auth";

class Register extends Component {

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            loading: false
        };

    }

    handleChange = e => {
        this.setState({[e.target.name]: e.target.value});
    };

    handleSubmit = e => {
        e.preventDefault();

        if (!this.state.username || !this.state.password) {
            toastr.error('All fields are required.');
            return;
        }

        this.setState({loading: true});

        Requester.signIn(this.state.username, this.state.password)
            .then(res => {
                this.setState({loading: false});
                Auth.saveData({
                    token: res.data.token,
                    userId: res.data.userId,
                    username: res.data.username,
                    isAdmin: res.data.roles.includes('ADMIN')
                });
                toastr.success('You were successfully logged in.');
                this.props.history.push('/');
            })
            .catch(err => {
                this.setState({loading: false});
                toastr.error(err.response.data.message);
            })
    };

    render() {
        return (
            <div className="jumbotron">
                <h1 className="text-center">Sign in</h1>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="username" className="control-label">Username</label>
                        <input type="text"
                               className="form-control"
                               id="username"
                               name="username"
                               placeholder="Username..."
                               onChange={this.handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password" className="control-label">Password</label>
                        <input type="password"
                               className="form-control"
                               id="password"
                               name="password"
                               placeholder="Password..."
                               onChange={this.handleChange}
                        />
                    </div>
                    <button type="submit"
                            className="btn btn-primary"
                            disabled={this.state.loading}
                    >{this.state.loading ? 'Please wait...' : 'Sign in'}</button>
                </form>
            </div>
        );
    }
}

export default Register;
