import "./Style.css"
import { useEffect, useState } from "react"
import Logo from "./../assets/logo.jpeg"
const isLocalStorageToken= () => {
    const token = localStorage.getItem("token");

    if (!token) return true; // No token means expired or not available

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
    const [display,setDisplay]=useState();
    useEffect(()=>{
        if (isLocalStorageToken()) {
            console.log("Token has expired.");
            setDisplay("Developer");
            
        } else {
            const username=localStorage.getItem("username");
            setDisplay(username)
        }
    },[display])
    
    

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
        </div>
    )
}
export default Home;