import React, {useState, useEffect} from "react";
import PropTypes from 'prop-types';

const PostCatalog = () => {
    const [postsList, setPostsList] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchPostsList = async () => {
        try {
            setLoading(true);
            const res = await fetch('https://jsonplaceholder.typicode.com/posts');
            const response = await res.json();

            if(response) setPostsList(response);
        } catch (err) {
            setError(err);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchPostsList();
    }, []);

    if (isLoading) return <div>Loading...</div>;

    return (
        <div className="posts">
            <ul className="posts__list">{
                postsList.map((item) => (
                    <li className="posts_single-post" data-post-id={item.id} key={item.id}>
                        <h3 className="posts__post-title">{item.title}</h3>
                        <p className="posts__post-description">{item.body}</p>
                    </li>
                ))
            }</ul>
        </div>
    )
};

PostCatalog.propTypes = {
    postsList: PropTypes.array
}

export default PostCatalog;