import React, {Component} from 'react';
import {Modal, ModalBody, ModalHeader} from "reactstrap";
import ImageGallery from "react-image-gallery";
import toastr from 'toastr';
import {Auth} from "../../api/auth";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Requester} from "../../api/requester";
import {parseAjaxError} from "../../api/utils";
import CommentsList from "../comments/CommentsList";

class PostModal extends Component {

    constructor(props) {
        super(props);

        this.state = {
            comment: '',
            loading: false
        };
    }

    handleChange = e => {
        this.setState({[e.target.name]: e.target.value});
    };

    postComment = e => {
        e.preventDefault();

        this.setState({loading: true}, () => {
            Requester.postComment(this.props.post._id, this.state.comment)
                .then(res => {
                    const comment = res.data.comment;

                    this.setState({
                        comment: '',
                        loading: false
                    }, () => {
                        this.props.addCommentToPost(comment, this.props.post._id);
                        toastr.success('Your comment was successfully posted :)');
                    })
                })
                .catch(err => {
                    toastr.error(parseAjaxError(err));
                })
        });
    };

    deleteComment = id => {
        Requester.deleteComment(this.props.post._id, id)
            .then(() => {
                this.props.removeCommentFromPost(this.props.post._id, id);
                toastr.success('Your comment was deleted.');
            })
            .catch(err => {
                toastr.error(parseAjaxError(err));
            })
    };

    render() {
        let {isOpen, post, toggle, deletePost} = this.props;

        if (!post) {
            return null;
        }

        return (
            <Modal isOpen={isOpen} toggle={toggle}>
                <ModalHeader toggle={toggle}>Post details</ModalHeader>
                <ModalBody>
                    {post.description}
                    <ImageGallery items={post.photos.map(photo => (
                        {
                            original: photo,
                            thumbnail: photo
                        }
                    ))} showPlayButton={false}/>
                    {Auth.getUserId() === post.author ?
                        <button className="btn btn-danger" onClick={() => {
                            deletePost(post._id);
                            toastr.success('Your post was deleted.');
                        }}><FontAwesomeIcon icon="trash"/> Delete</button>
                        : null}
                    <form onSubmit={this.postComment}>
                        <textarea className="form-control"
                                  placeholder="Enter your comment here..."
                                  name="comment"
                                  rows="3"
                                  onChange={this.handleChange}
                                  value={this.state.comment}>
                        </textarea>
                        <button className="btn btn-primary"
                                disabled={this.state.loading}
                                type="submit">
                            {!this.state.loading ? 'Submit' : 'Please wait...'}
                        </button>
                    </form>
                    <CommentsList comments={post.comments} deleteComment={this.deleteComment}/>
                </ModalBody>
            </Modal>
        );
    }
}

export default PostModal;
