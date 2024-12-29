import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import './App.css';
import AllPost from './Components/AllPost';
import Contact from './Components/Contact';
import Home from './Components/Home';
import Login from './Components/Login';
import Nav from './Components/Nav';
import Post from './Components/Post';
import Footer from "./Components/Fottter";
import { useState } from "react";
import PostDetails from "./Components/PostDetails"
function App() {
return(
    <>
        <div>
            <Router>
                <Nav/>
                
                <Routes>
                    <Route path="/" element={<Home/>}></Route>
                    <Route path='/post'element={<Post />}></Route>
                    <Route path='/allpost'element={<AllPost />}></Route>
                    <Route path='/login' element={<Login/>}></Route>
                    <Route path="/path/:id"element={<PostDetails/>}></Route>
                </Routes>
                <Footer/>
            </Router>
        </div>
    </>
)
}

export default App
