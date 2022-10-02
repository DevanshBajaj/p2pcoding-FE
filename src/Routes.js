import React from 'react';
import { Switch, Route } from "react-router-dom";
import withProtectedRoute, {withNavbar} from "./hoc/PrivateRoute";
import Editor from './Containers/Editor';
import Home from './Containers/Home';
import Practice from "./Containers/Practice";
import Problem from './Containers/Problem';
import Solution from './Containers/Solution';
import Data from './Containers/Data';

const Routes = () => {
    return (
        <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/learn' component={withProtectedRoute(Home)} />
            <Route path="/practice/:title/solution" component={Solution} />
            <Route path="/practice/:title" component={withNavbar(Problem)} />
            <Route path='/practice' component={withProtectedRoute(withNavbar(Practice))} />
            <Route path='/interview/:id' component={withProtectedRoute(Editor)} />
            <Route path='/data/:title' component={Data} />
        </Switch>
    );
}

export default Routes;