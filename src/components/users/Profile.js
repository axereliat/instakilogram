import React, {Component} from 'react';
import {Requester} from "../../api/requester";
import toastr from "toastr";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import PostsList from "../posts/PostsList";
import {Link} from "react-router-dom";
import {Auth} from "../../api/auth";

class Profile extends Component {

    constructor(props) {
        super(props);

        this.state = {
            user: null,
            followingUser: false,
            loading: false,
            followingLoading: false
        };
    }

    componentWillMount() {
        this.setState({loading: true});
        Requester.fetchUserProfile(this.props.match.params.id)
            .then(res => {
                this.setState({loading: false, user: res.data, following: res.data.followers.includes(Auth.getUserId())});
                console.log(res.data);
            })
            .catch(err => {
                this.setState({loading: false});
                console.log(err);
                toastr.error('An error occurred.');
            })
    }

    followOrUnfollow = () => {
        this.setState({followingLoading: true});
        Requester.followOrUnfollow(this.state.user._id)
            .then(res => {
                const newUser = this.state.user;
                if (res.data.message === 'followed') {
                    newUser.followers.push('something');
                } else {
                    newUser.followers.splice(0, 1);
                }
                this.setState({
                    followingLoading: false,
                    following: res.data.message === 'followed',
                    user: newUser
                });
            })
            .catch(err => {
                this.setState({followingLoading: false});
                console.log(err.response);
                toastr.error('Something went wrong.');
            })
    };

    deletePost = postId => {
        Requester.deletePost(postId)
            .then(() => {
                const newUser = this.state.user;
                newUser.posts = newUser.posts.filter(p => p._id !== postId);
                this.setState({
                    user: newUser
                });
            })
            .catch(err => {
                console.log(err.response.data);
                toastr.error('Something went wrong.');
            })
    };

    addCommentToPost = (comment, postId) => {
        const posts = this.state.user.posts.map(p => {
            if (p._id === postId) {
                p.comments.splice(0, 0, comment);
            }
            return p;
        });

        this.setState({
            user: {...this.state.user, posts}
        });
    };

    removeCommentFromPost = (postId, commentId) => {
        const posts = this.state.user.posts.map(p => {
            if (p._id === postId) {
                p.comments = p.comments.filter(c => c._id !== commentId);
            }
            return p;
        });

        this.setState({
            user: {...this.state.user, posts}
        });
    };

    render() {
        if (!this.state.user && !this.state.loading) {
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
                                {' '}
                                {this.state.user._id !== Auth.getUserId() ?
                                    !this.state.following ?
                                        <button className="btn btn-primary"
                                                onClick={this.followOrUnfollow}
                                                disabled={this.state.followingLoading}>
                                            {this.state.followingLoading ? 'Please wait...' : 'Follow'}
                                        </button>
                                        : <button className="btn btn-secondary"
                                                  onClick={this.followOrUnfollow}
                                                  disabled={this.state.followingLoading}>
                                            {this.state.followingLoading ? 'Please wait...' : 'Unfollow'}
                                        </button>
                                    : null}
                            </div>
                            <div className="col-md-6">
                                <h3>Followers: {this.state.user.followers.length} Following: {this.state.user.following.length}</h3>
                            </div>
                        </div>
                        <br/>
                        {this.state.user.posts.length === 0 ?
                            <h3>No posts yet.</h3> :
                            <PostsList posts={this.state.user.posts}
                                       deletePost={this.deletePost}
                                       addCommentToPost={this.addCommentToPost}
                                       removeCommentFromPost={this.removeCommentFromPost} />
                        }
                    </div>
                }
            </div>
        );
    }
}

export default Profile;
