import React, {Component} from 'react';
import toastr from 'toastr';
import PostModal from "../posts/PostModal";
import {Link} from "react-router-dom";
import {Requester} from "../../api/requester";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Auth} from "../../api/auth";
import {parseAjaxError} from "../../api/utils";

class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            posts: [],
            modal: false,
            selectedPost: null,
            loading: false
        };
    }

    addCommentToPost = (comment, postId) => {
        const posts = this.state.posts.map(p => {
            if (p._id === postId) {
                p.comments.splice(0, 0, comment);
            }
            return p;
        });
        this.setState({
            posts
        });
    };

    removeCommentFromPost = (postId, commentId) => {
        const posts = this.state.posts.map(p => {
            if (p._id === postId) {
                p.comments = p.comments.filter(c => c._id !== commentId);
            }
            return p;
        });
        this.setState({
            posts
        });
    };

    componentDidMount() {
        if (Auth.isLoggedIn()) {
            this.setState({loading: true});
            Requester.fetchNewsFeed()
                .then(res => {
                    this.setState({posts: res.data, loading: false});
                })
                .catch(err => {
                    console.log(err);
                    toastr.error('Something went wrong.');
                    this.setState({loading: false});
                })
        }
    }

    toggle = () => {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    };

    selectPost = post => {
        this.toggle();
        this.setState({selectedPost: post});
    };

    likePost = postId => {
        Requester.likePost(postId)
            .then(res => {
                this.setState({
                    posts: this.state.posts.map(p => {
                        if (p._id === postId) {
                            if (res.data.message === 'liked') {
                                p.likes.push(Auth.getUserId());
                            } else {
                                p.likes = p.likes.filter(l => l !== Auth.getUserId());
                            }
                        }
                        return p;
                    })
                }, () => {
                    if (res.data.message === 'liked') {
                        toastr.success('You successfully liked the post.');
                    } else {
                        toastr.success('You successfully unliked the post.');
                    }
                })
            })
            .catch(err => {
                console.log(err.response);
                toastr.error(parseAjaxError(err));
            })
    };

    render() {
        if (!Auth.isLoggedIn()) {
            return (
                <div className="jumbotron">
                    <h3>Welcome to Instakilogram :)</h3>
                    <h4><Link to="/login">Log in</Link> if you have an account or <Link to="/register">register</Link> if you don't</h4>
                </div>
            );
        }
        return (
            <div className="jumbotron">
                {this.state.loading ? <FontAwesomeIcon icon="spinner" size="5x" spin /> : null}
                {!this.state.posts.length && !this.state.loading ?
                    <h3>You are not following anyone.</h3> :
                    <div>
                        <PostModal toggle={this.toggle}
                                   isOpen={this.state.modal}
                                   post={this.state.selectedPost}
                                   addCommentToPost={this.addCommentToPost}
                                   removeCommentFromPost={this.removeCommentFromPost}/>
                        <div className="row">
                            {this.state.posts.map(post => (
                                <div className="col-md-4" key={post._id}>
                                    <img src={post.author.profilePicture} width="30%" className="rounded-circle" alt="profile picture"/>
                                    <Link to={'/profile/' + post.author._id}>{post.author.username}</Link>
                                    <a href="#"><img src={post.photos[0]} alt="picture" width="80%"
                                                     onClick={() => this.selectPost(post)}/></a>
                                    <br/>
                                    <button className="btn" onClick={() => this.likePost(post._id)}>
                                        <FontAwesomeIcon icon="heart"
                                                         size={post.likes.includes(Auth.getUserId()) ? '4x' : '3x'}
                                                         color={post.likes.includes(Auth.getUserId()) ? 'pink' : 'grey'} />
                                    </button>
                                    <span>{post.likes.length}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                }
            </div>
        );
    }
}

export default Home;
