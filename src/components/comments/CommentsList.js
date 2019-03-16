import React from 'react';
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const CommentsList = ({comments, deleteComment}) => (
    <ul className="list-group">
        <ul className="list-group">
            {comments.map(comment => (
                <li className="list-group-item" key={comment._id}>
                    <Link to={'/profile/' + comment.author._id}>
                        <img src={comment.author.profilePicture} width="20%" className="rounded-circle" alt="profile picture"/>
                    </Link>
                    {' '}
                    <small className="text-muted">{comment.author.username}</small>
                    {' '}
                    {comment.content}
                    <button className="btn btn-danger float-right"
                            onClick={() => deleteComment(comment._id)}>
                        <FontAwesomeIcon icon="trash"/>
                    </button>
                </li>
            ))}
        </ul>
    </ul>
);

export default CommentsList;
