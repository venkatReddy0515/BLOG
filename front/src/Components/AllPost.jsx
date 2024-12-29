import Axios from "axios";
import { useEffect, useState } from "react";
import "./../App.css";
import { useNavigate } from "react-router-dom";

function AllPost() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPages, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const limit = 4;
    const navigate = useNavigate();

    const get = (currentPage) => {
        Axios.get("http://localhost:4000/post", { params: { currentPage, limit } })
            .then((response) => {
                setPosts(response.data.posts);
                setCurrentPage(response.data.currentPage);
                setTotalPages(Math.ceil(response.data.count / limit));
                setLoading(false);
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false); // Set loading to false in case of an error
            });
    };

    useEffect(() => {
        get(currentPages);
    }, [currentPages]);

    const handlePost = (index) => {
        console.log(posts[index]);
        const post = posts[index];
        console.log(post);
        navigate(`/path/${post._id}`, { state: { post: posts[index] } });
    };

    const handlePrev = () => {
        if (currentPages > 1) {
            setCurrentPage(currentPages - 1);
            setLoading(true);
        }
    };

    const handleNext = () => {
        if (currentPages < totalPages) {
            setCurrentPage(currentPages + 1);
            setLoading(true);
        }
    };

    if (loading) {
        // Show a loading indicator while data is being fetched
        return <div className="loading"></div>;
    }

    return (
        <div>
            <div className="post-content">
                {posts.map((post, index) => (
                    <div key={index} className="post-item">
                        {post.photo && (
                            <img
                                src={`data:image/jpeg;base64,${post.photo}`}
                                alt={post.tittle}
                                className="post-image"
                            />
                        )}
                        <div className="post-info">
                            <h4 className="post-heading">{post.tittle}</h4>
                            <p className="post-content">{post.content}</p>
                            <h5 className="created">Created By: <span>{post.author.username}</span></h5>
                            <h4 onClick={() => handlePost(index)} className="seemore"><span>See More </span></h4>
                        </div>
                    </div>
                ))}
            </div>
            <div className="pagination">
                <div className="details">
                    <button className="prev" disabled={currentPages === 1} onClick={handlePrev}>
                        Previous
                    </button>
                    <div className="sap">
                        <span className="page-num">{currentPages} OF {totalPages}</span>
                    </div>
                    <button className="next" disabled={currentPages === totalPages} onClick={handleNext}>
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AllPost;
