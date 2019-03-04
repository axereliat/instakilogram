import React from 'react';
import {Auth} from "../../api/auth";
import {Link} from "react-router-dom";

const UsersList = ({users}) => (
    <ul className="list-group">
        {users.filter(user => user._id !== Auth.getUserId()).map(user => (
            <li className="list-group-item" key={user._id}>
                <img src={user.profilePicture} width="10%" className="rounded-circle" alt="profile picture"/>
                {' '}
                <Link to={"/profile/" + user._id}>{user.username}</Link>
            </li>
        ))}
    </ul>
);

export default UsersList;
