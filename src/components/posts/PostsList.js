import React from 'react';
import PostModal from "./PostModal";

class PostsList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            modal: false,
            selectedPost: null
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

    render() {
        return (
            <div>
                <PostModal toggle={this.toggle} isOpen={this.state.modal} post={this.state.selectedPost}/>
                <div className="row">
                    {this.props.posts.map(post => (
                        <div className="col-md-4" key={post._id}>
                            <a href="#"><img src={post.photos[0]} alt="picture" width="80%"
                                             onClick={() => this.selectPost(post)}/></a>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

export default PostsList;
