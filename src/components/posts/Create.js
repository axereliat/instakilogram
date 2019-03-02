import React, {Component} from 'react';
import {Requester} from "../../api/requester";
import toastr from 'toastr';

class Create extends Component {

    constructor(props) {
        super(props);

        this.state = {
            description: '',
            images: null,
            loading: false
        };

    }

    handleChange = e => {
        if (e.target.type === 'file') {
            this.setState({[e.target.name]: e.target.files});
        } else {
            this.setState({[e.target.name]: e.target.value});
        }
    };

    handleSubmit = e => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('images', this.state.images);
        formData.append('description', this.state.description);

        this.setState({loading: true});

        Requester.createPost(formData)
            .then(() => {
                this.setState({loading: false});
                toastr.success('Your post was created :)');
                this.props.history.push('/');
            })
            .catch(err => {
                this.setState({loading: false});
                toastr.error(err.response.data.error);
            })
    };

    render() {
        return (
            <div className="jumbotron">
                <h1 className="text-center">Add post</h1>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <textarea className="form-control"
                                  id="description"
                                  name="description"
                                  rows="3"
                                  placeholder="Description..."
                                  onChange={this.handleChange}
                                  value={this.state.description}/>
                    </div>
                    <div className="input-group">
                        <div className="custom-file">
                            <input type="file" className="custom-file-input" id="images" name="images" onChange={this.handleChange} multiple />
                            <label className="custom-file-label" htmlFor="image">Choose photos</label>
                        </div>
                    </div>
                    <button type="submit"
                            className="btn btn-primary"
                            disabled={this.state.loading}
                    >{this.state.loading ? 'Please wait...' : 'Add'}</button>
                </form>
            </div>
        );
    }
}

export default Create;
