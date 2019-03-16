import React from 'react';

const CommentsList = ({comments}) => (
    <ul className="list-group">
        <ul className="list-group">
            {comments.map(comment => (
                <li className="list-group-item" key={comment._id}>
                    {comment.author.username}
                    {comment.content}
                </li>
            ))}
        </ul>
    </ul>
);

export default CommentsList;
