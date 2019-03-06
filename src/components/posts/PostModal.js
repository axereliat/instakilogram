import React, {Component} from 'react';
import {Modal, ModalBody, ModalHeader} from "reactstrap";
import ImageGallery from "react-image-gallery";

class PostModal extends Component {
    render() {
        const {isOpen, post, toggle} = this.props;

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
                </ModalBody>
            </Modal>
        );
    }
}

export default PostModal;
