import React from 'react';
import { Redirect } from 'react-router';
import Navbar from '../Components/Home/Navbar';
import { isLoggedIn } from "../utils/Utils";
import { v4 } from 'uuid';

const createId = () => {
    return v4();
}

const withProtectedRoute = (WrappedComponent) => {
    return (props) => {
			return <WrappedComponent {...props} />;
			// return isLoggedIn ? <WrappedComponent {...props} /> : <Redirect to={{ pathname: "/" }} />
		};
}

const withNavbar = (WrappedComponent) => {
    return (props) => {
        return (
            <>
                <Navbar createId={createId} />
                <WrappedComponent {...props} />
            </>
        )
    }
}

export { withNavbar }

export default withProtectedRoute;