import { useState } from "react";
import "./../index.css";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
    const [login, setLogin] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userName, setName] = useState("");

    const navigate = useNavigate();

    const handleLogin = () => {
        setLogin(!login);  // Toggle between login and signup
    };

    const handleLoginForm = (e) => {
        e.preventDefault();  // Prevent page reload on form submit
        Axios.post("https://blog-adh2.onrender.com/blog/login", { email, password })
            .then((response) => {
                console.log(response);
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("username", response.data.user.username);
                navigate("/");
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleSign = (e) => {
        e.preventDefault();  // Prevent page reload on form submit
        Axios.post("https://blog-adh2.onrender.com/blog/sign", { username: userName, email, password })
            .then((response) => {
                console.log(response);
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("username", response.data.newUser.username);
                navigate("/");
                
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div>
            <div className="container">
                <div className="content-login">
                    {login === true ? (
                        <div>
                            <div className="form">
                                <h2>Login</h2>
                                <div className="box">
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        className="email"
                                        placeholder="Email Address"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                    <input
                                        type="password"
                                        name="password"
                                        id="password"
                                        className="password"
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <button type="submit" className="login" onClick={handleLoginForm}>
                                        Login
                                    </button>
                                </div>
                                <div className="sign">
                                    <h5 onClick={handleLogin}>
                                        Not a member? <span>Signup now</span>
                                    </h5>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div>
                            <div className="form">
                                <h2>Sign Up</h2>
                                <div className="box">
                                    <input
                                        type="text"
                                        name="username"
                                        id="username"
                                        className="username"
                                        placeholder="User name"
                                        value={userName}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                    />
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        className="email"
                                        placeholder="Email Address"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                    <input
                                        type="password"
                                        name="password"
                                        id="password"
                                        className="password"
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                    <button type="submit" className="login" onClick={handleSign}>
                                        Sign Up
                                    </button>
                                </div>
                                <div className="sign">
                                    <h5 onClick={handleLogin}>
                                        Already a member? <span>Login now</span>
                                    </h5>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Login;
