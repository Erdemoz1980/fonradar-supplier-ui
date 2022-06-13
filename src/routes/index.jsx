import React, { useEffect } from 'react';
import { Redirect, Route, Switch, useLocation } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from '../store/user/userActions';
import Landing from '../pages/Landing';
import Login from '../pages/Login';
import urls from './urls';

// function ProtectedRoute({ ...props }) {
//     const { isLoggedIn } = useSelector(({ user }) => user);

//     return isLoggedIn ? <Route {...props} /> : <Redirect to={urls.login} />;
// }
function GuestRoute({ ...props }) {
    const { isLoggedIn } = useSelector(({ user }) => user);

    return !isLoggedIn ? <Route {...props} /> : <Redirect to="/" />;
}

function Routes() {
    const dispatch = useDispatch();
    const location = useLocation();
    const { isLoggedIn } = useSelector(({ user }) => user);

    useEffect(() => {
        if (isLoggedIn) dispatch(fetchUser());
    }, [isLoggedIn, dispatch]);

    useEffect(() => {
        setTimeout(() => window.scroll({ top: 0, behavior: 'smooth' }));
    }, [location]);

    return (
        <Switch>
            <GuestRoute path={urls.login} exact component={Login} />
            <Route path="/" component={Landing} />
        </Switch>
    );
}

export default Routes;
