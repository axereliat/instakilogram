import React, {Component} from 'react';
import {Modal, ModalBody, ModalHeader} from "reactstrap";
import ImageGallery from "react-image-gallery";
import toastr from 'toastr';
import {Auth} from "../../api/auth";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

class PostModal extends Component {

    render() {
        let {isOpen, post, toggle, deletePost} = this.props;

        if (!post) {
            return null;
        }
        console.log(post.author);

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
                </ModalBody>
            </Modal>
        );
    }
}

export default PostModal;
