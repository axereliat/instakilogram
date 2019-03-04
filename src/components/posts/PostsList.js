import React from 'react';
import {Auth} from "../../api/auth";
import {Link} from "react-router-dom";

const PostsList = ({posts}) => (
    <div className="row">
        {posts.map(post => (
            <div className="col-md-4" key={post._id}>
                <a href="#"><img src={post.photos[0]} alt="picture" width="80%" onClick={() => alert('hey yooo')}/></a>
            </div>
        ))}
    </div>
);

export default PostsList;
