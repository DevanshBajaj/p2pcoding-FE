import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ createId }) => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="#">Interview Next</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <div className="mr-auto"></div>
                <div className="navbar-nav">
                    <ul className="navbar-nav mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link to="/learn" className="nav-link active">Learn</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/practice" className="nav-link">Practice</Link>
                        </li>
                        <li className="nav-item">
                            <Link to={`/interview/${createId()}`} className="nav-link">Interview</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;