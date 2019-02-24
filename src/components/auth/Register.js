import React, {Component} from 'react';
import {Requester} from "../../api/requester";
import toastr from 'toastr';

class Register extends Component {

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            confirmPassword: '',
            image: null,
            loading: false
        };

    }

    handleChange = e => {
        if (e.target.type === 'file') {
            this.setState({[e.target.name]: e.target.files[0]});
        } else {
            this.setState({[e.target.name]: e.target.value});
        }
    };

    handleSubmit = e => {
        e.preventDefault();

        if (!this.state.username || !this.state.password) {
            toastr.error('Please fill in the required fields.');
            return;
        }

        if (this.state.password !== this.state.confirmPassword) {
            toastr.error('Passwords do not match.');
            return;
        }

        const formData = new FormData();
        formData.append('image', this.state.image);
        formData.append('username', this.state.username);
        formData.append('password', this.state.password);

        this.setState({loading: true});

        Requester.signUp(formData)
            .then(() => {
                this.setState({loading: false});
                toastr.success('You were successfully registered.');
                this.props.history.push('/login');
            })
            .catch(err => {
                this.setState({loading: false});
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
                    <div className="input-group">
                        <div className="custom-file">
                            <input type="file" className="custom-file-input" id="image" name="image" onChange={this.handleChange} />
                            <label className="custom-file-label" htmlFor="image">Choose profile picture</label>
                        </div>
                    </div>
                    <button type="submit"
                            className="btn btn-primary"
                            disabled={this.state.loading}
                    >{this.state.loading ? 'Please wait...' : 'Sign up'}</button>
                </form>
            </div>
        );
    }
}

export default Register;
