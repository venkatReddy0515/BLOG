import "./post.css";
import { useLocation, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faComments,faShare} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import Axios from "axios";


function PostDetails() {
  const { state } = useLocation();
  const { id } = useParams();
  const [likeCount, setLikeCount] = useState(state.post.likeCount);
  const [comments,setComments] = useState("")
  const [comment,setComment]=useState([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [commentCount,setCommentCount]=useState(state.post.commentCount);
  const [user,setUser]=useState("");
  console.log(state, id);
  useEffect(()=>{
    Axios.get(`http://localhost:4000/comment/${state.post._id}`)
    .then((response)=>{
      setComment(response.data);
      setLoading(false);
      console.log(response.data)
      setUser(response.data[0].user.username);
    })
    .catch((error)=>{
      console.log(error);
    })
  },[])
  const handleLike = () => {
    Axios.post(
      "http://localhost:4000/api/like",
      { post: state.post._id },
      {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
      .then((response) => {
        console.log(response);
        setLikeCount((prevCount) => prevCount + 1)
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleComment=()=>{
    Axios.post("http://localhost:4000/comment",{content:comments,post:state.post._id},{headers:{authorization:`Bearer ${localStorage.getItem("token")}`}})
    .then((response)=>{
      console.log(response.data.exit);
      setComment((prev) => [...prev, { content: newComment, user: { username: user } }]);
      setCommentCount((commentCount)=>commentCount+1);
    })
    .catch((error)=>{
      console.log(error);
    })
    
  }
  if (loading) return <div>Loading comments...</div>;

  return (
    
      <div>
        <div className="post-details">
          <div className="p">
            <h1 className="heading">{state.post.title}</h1>
          </div>
          <div className="img">
            <img src={`data:image/jpeg;base64,${state.post.photo}`} alt="" />
          </div>
          <div className="div-fields">
            <p className="content">{state.post.content}</p>
            <div className="created">
              <h2>Created At:</h2>
              <h5>{state.post.createdAt}</h5>
            </div>
            <div className="author">
              <h1>Author:</h1>
              <h2>{state.post.author.username}</h2>
            </div>
          </div>
          <div className="fields">
            <div className="like" onClick={() => handleLike()}>
              <FontAwesomeIcon icon={faThumbsUp}/>
              <h4>{likeCount}</h4>
            </div>
            <div className="comme">
              <FontAwesomeIcon icon={faComments} />
              <h4>{comment.length}</h4>
            </div>
          </div>
        
          <div className="comment-section">
              <div className="comment">
                <input type="text" name="comment" id="" className="comm" value={comments} onChange={(e)=>setComments(e.target.value)} placeholder="Add Comment Here"/>
                <FontAwesomeIcon icon={faShare} className="send" onClick={() => handleComment()}/>
              </div>
          </div>
          
          <div className="comments-section">
      <h3>Comments</h3>
      <div className="comments-list">
        {comment.length === 0 ? (
          <p className="no-comments">No comments yet. Be the first to comment!</p>
        ) : (
          comment.map((comment) => (
            <div key={comment._id} className="comment-item">
              <h4 className="comment-username">{comment.user.username}</h4>
              <p className="comment-content">{comment.content}</p>
              <small className="comment-date">
                {new Date(comment.createdAt).toLocaleString()}
              </small>
            </div>
          ))
)}
      </div>
        </div>
        
      </div>
      </div>
)}
  
export default PostDetails;
