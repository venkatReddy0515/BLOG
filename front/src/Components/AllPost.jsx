import Axios from "axios";
import { useEffect, useState } from "react";
import "./../App.css";

function AllPost() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const limit=4;

    useEffect(() => {
        // Fetch posts from the server
        Axios.get("http://localhost:4000/post",{params:{limit}})
            .then((response) => {
                setPosts(response.data);
                setLoading(false);  // Set loading to false after data is fetched
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);  // Set loading to false in case of an error
            });
    }, []);

    if (loading) {
        // Show a loading indicator while data is being fetched
        return <div className="loading"></div>;
    }

    return (
        <div>
            <div className="post-content">
                {posts.map((post, index) => (
                    <div key={index} className="post-item">
                        {/* Check if photo exists and set it as a base64 encoded string */}
                        {post.photo && (
                            <img 
                                src={`data:image/jpeg;base64,${post.photo}`}
                                alt={post.tittle}
                                className="post-image"
                            />
                        )}
                        <h4>{post.tittle}</h4>
                        <p>{post.content}</p>
                        <h5><span>{post.author.username}</span></h5>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AllPost;
