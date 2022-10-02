import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import AxiosInstance from "../../AxiosInstance";
import Navbar from './Navbar';
import styles from './main.module.css';
import { toast } from 'react-toastify';
import { setJWT } from "../../utils/Utils";

const HomeComponent = ({ createId }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory();

    const handleLogin = () => {
        AxiosInstance.post("/user/login", { username, password }).then(res => {
            setJWT(res.data.token);
            history.replace("/practice");
        }).catch(err => {
            toast.error(err?.response?.data?.errorDescription);
        });
    }

    const handleSignup = () => {
        AxiosInstance.post("/user/sign-up", { username, password }).then(() => {
            toast.success("Signup successful! Please login to continue");
        }).catch(err => {
            toast.error(err.response.data.errorDescription);
        })
    }

    return (
        <div className={`d-flex flex-column ${styles.home}`}>
            <Navbar createId={createId} />
            <div className={`d-flex flex-column h-100`}>
                <div className="row m-0 h-100">
                    <div className="col-sm-6 m-auto">
                        <div className="w-50 m-auto">
                            <h4>Login to continue</h4>
                            <input type="text" value={username} onChange={e => setUsername(e.target.value)}
                                className="form-control mb-4" placeholder="Username" aria-label="Username" required />
                            <input type="password" value={password} onChange={e => setPassword(e.target.value)}
                                className="form-control mb-4" placeholder="Password" aria-label="Password" required={true} />
                            <div className="d-flex flex-column flex-md-row justify-content-between">
                                <button type="button" onClick={handleLogin} className="btn btn-secondary mb-3">Login</button>
                                <button type="button" onClick={handleSignup} className="btn btn-secondary mb-3">Sign Up</button>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6 m-auto">
                        <img src="https://www.hackerrank.com/wp-content/uploads/2020/04/hackerrank-codepair-interface1.png" className="img-fluid w-100" />
                    </div>
                </div>
            </div>
        </div>
        // <div className={styles.home}>
        //     <h1>Peer Share</h1>
        //     <p className={styles.heading}>Pair programming with peers</p>
        //     <p className={styles.description}>An online code editor for pair programming, interviews, teaching and much more...</p>
        //     <Link to={`/${createId()}`}>
        //         <button className={`${styles.btn} btn_primary`}>Start Coding</button>
        //     </Link>
        // </div>
    );
}

export default HomeComponent;