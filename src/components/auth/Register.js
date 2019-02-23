import React, { Component } from 'react';
import {Requester} from "../../api/requester";
import toastr from 'toastr';

class Register extends Component {

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            confirmPassword: '',
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

        if (this.state.password !== this.state.confirmPassword) {
            toastr.error('Passwords do not match.');
            return;
        }

        Requester.signUp(this.state.username, this.state.password)
            .then(() => {
                toastr.success('You were successfully registered.');
                this.props.history.push('/login');
            })
            .catch(err => {
                toastr.error(err.response.data.error);
            })
    };

    render() {
        return (
            <div className="jumbotron">
                <h1 className="text-center">Sign up</h1>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="username" className="control-label">Username</label>
                        <input type="text"
                               className="form-control"
                               id="username"
                               name="username"
                               placeholder="Username..."
                               onChange={this.handleChange}
                               disabled={this.state.loading}
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
                    <div className="form-group">
                        <label htmlFor="confirmPassword" className="control-label">Confirm Password</label>
                        <input type="password"
                               className="form-control"
                               id="confirmPassword"
                               name="confirmPassword"
                               placeholder="Confirm Password..."
                               onChange={this.handleChange}
                        />
                    </div>
                    <button type="submit"
                            className="btn btn-primary"
                            disabled={this.state.loading}
                    >{this.state.loading ? 'Please wait...' : 'Register'}</button>
                </form>
            </div>
        );
    }
}

export default Register;
