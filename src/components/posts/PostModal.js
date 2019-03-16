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
        };
    }

    handleChange = e => {
        this.setState({[e.target.name]: e.target.value});
    };

    postComment = e => {
        e.preventDefault();

        Requester.postComment(this.props.post._id, this.state.comment)
            .then(res => {
                const comment = res.data.comment;

                this.setState({
                    comment: ''
                }, () => {
                    this.props.addCommentToPost(comment, this.props.post._id);
                    toastr.success('Your comment was successfully posted :)');
                })
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
                        <button className="btn btn-primary" type="submit">Submit</button>
                    </form>
                    <CommentsList comments={post.comments} />
                </ModalBody>
            </Modal>
        );
    }
}

export default PostModal;
