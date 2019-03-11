import React, {Component} from 'react';
import toastr from 'toastr';
import PostModal from "../posts/PostModal";
import {Link} from "react-router-dom";
import {Requester} from "../../api/requester";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            posts: [],
            modal: false,
            selectedPost: null,
            loading: false
        }
    }

    componentDidMount() {
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

    toggle = () => {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    };

    selectPost = post => {
        this.toggle();
        this.setState({selectedPost: post});
    };

    render() {
        return (
            <div className="jumbotron">
                {this.state.loading ? <FontAwesomeIcon icon="spinner" size="5x" spin /> : null}
                {!this.state.posts.length && !this.state.loading ?
                    <h3>You are not following anyone.</h3> :
                    <div>
                        <PostModal toggle={this.toggle} isOpen={this.state.modal} post={this.state.selectedPost}/>
                        <div className="row">
                            {this.state.posts.map(post => (
                                <div className="col-md-4" key={post._id}>
                                    <img src={post.author.profilePicture} width="30%" className="rounded-circle" alt="profile picture"/>
                                    <Link to={'/profile/' + post.author._id}>{post.author.username}</Link>
                                    <a href="#"><img src={post.photos[0]} alt="picture" width="80%"
                                                     onClick={() => this.selectPost(post)}/></a>
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
