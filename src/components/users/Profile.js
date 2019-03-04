import React, {Component} from 'react';
import {Requester} from "../../api/requester";
import toastr from "toastr";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import PostsList from "../posts/PostsList";
import {Link} from "react-router-dom";

class Profile extends Component {

    constructor(props) {
        super(props);

        this.state = {
            user: null,
            loading: false
        };
    }

    componentWillMount() {
        this.setState({loading: true});
        Requester.fetchUserProfile(this.props.match.params.id)
            .then(res => {
                this.setState({loading: false, user: res.data});
                console.log(res.data);
            })
            .catch(err => {
                this.setState({loading: false});
                console.log(err);
                toastr.error('An error occurred.');
            })
    }


    render() {
        if (!this.state.user) {
            return (
                <div className="jumbotron">
                    <h1>User not found.</h1>
                </div>
            );
        }
        return (
            <div className="jumbotron">
                {this.state.loading ? <FontAwesomeIcon icon="spinner" size="5x" spin/> :
                    <div>
                        <Link className="btn btn-secondary" to="/findFriends"><FontAwesomeIcon icon="backward"/> Back</Link>
                        <br/>
                        <div className="row">
                            <div className="col-md-6">
                                <img src={this.state.user.profilePicture} width="20%" className="rounded-circle"
                                     alt="profile picture"/>
                                <strong>{this.state.user.username}</strong>
                            </div>
                            <div className="col-md-6">
                                <h3>Followers: {this.state.user.followers.length} Following: {this.state.user.following.length}</h3>
                            </div>
                        </div>
                        <br/>
                        <PostsList posts={this.state.user.posts} />
                    </div>
                }
            </div>
        );
    }
}

export default Profile;
