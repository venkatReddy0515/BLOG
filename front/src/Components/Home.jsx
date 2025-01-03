import "./Style.css"
import "./../App.css"
import { useEffect, useState } from "react"
import Axios from "axios"
import Logo from "./../assets/logo.jpeg"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faThumbsUp,faComments} from "@fortawesome/free-solid-svg-icons";
import { Navigate, useNavigate } from "react-router-dom"
const isLocalStorageToken= () => {
    const token = localStorage.getItem("token");

    if (!token) return true;

    try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
        return payload.exp < currentTime;
    } catch (error) {
        console.error("Invalid token:", error);
        return true;
    }
};


function Home(){
    const navigate=useNavigate();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true); // Add a loading state
    const [display,setDisplay]=useState();
    const limit=5;
    useEffect(() => {
        // Fetch posts from the server
        Axios.get("https://blog-adh2.onrender.com/post",{params:{ limit ,currentPage:1}})
            .then((response) => {
                setPosts(response.data.posts);
                setLoading(false);
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);  // Set loading to false in case of an error
            });
    }, []);
    useEffect(()=>{
        if (isLocalStorageToken()) {
            console.log("Token has expired.");
            setDisplay("Developer");
            
        } else {
            const username=localStorage.getItem("username");
            setDisplay(username)
        }
    },[display])
    
    const handlepost=(index)=>{
        console.log(posts[index]);
        const post=posts[index];
        console.log(post);
        navigate(`/path/${post._id}`,{state:{post:posts[index]}})
    }
    

    return(

        <div>
            <div className="content">
                <div className="heading-content">
                    
                    <div className="heading-logo">
                        <img src={Logo} alt="" />
                    </div>
                    <div className="message">
                        <h1>Hey {display}!👋</h1>
                        <h2>Welcome to Our Blog Platform! ✨</h2>
                        <p>This is a place where you can easily create and share blogs with the world. After registering or logging in, you'll gain full access to browse, read, and post blogs on various topics that interest you. Whether you're passionate about technology, lifestyle, travel, or personal experiences, this platform offers an easy-to-use space to express yourself and connect with a like-minded communit</p>
                    </div>
                </div>
                
            </div>

            
            {loading===true?<div className="loading"></div>:
            
                <div className="latest-post">
                    <h1>Latest Post</h1>
                    {posts.map((post,index)=>(
                        <div className="post-1" key={index} onClick={()=>handlepost(index)}>
                            <div className="post-image-1">
                            <img src={`data:image/jpeg;base64,${post.photo}`} alt="" />
                            </div>
                            <div className="info">
                                <div className="heading">
                                    <h1>{post.tittle}</h1>
                                    <p>{post.content}</p>
                                </div>

                            </div>
                            

                        </div>
                    ))}
                    
                    
            </div>
            
            }
        </div>
    )
}
export default Home;
