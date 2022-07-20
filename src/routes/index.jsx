import React, { useEffect } from 'react';
import { Redirect, Route, Switch, useLocation } from 'react-router';
import { useSelector } from 'react-redux';
import Login from '../pages/Login';
import urls from './urls';
import SupplierFinancingList from '../pages/SupplierFinancing/SupplierFinancingList';
import FundList from '../pages/FundList';

function ProtectedRoute({ ...props }) {
    const { isLoggedIn } = useSelector(({ user }) => user);

    return isLoggedIn ? <Route {...props} /> : <Redirect to={urls.login} />;
}

function GuestRoute({ ...props }) {
    const { isLoggedIn } = useSelector(({ user }) => user);

    return !isLoggedIn ? <Route {...props} /> : <Redirect to={urls.supplierFinancing} />;
}

function Routes() {
    const location = useLocation();

    useEffect(() => {
        setTimeout(() => window.scroll({ top: 0, behavior: 'smooth' }));
    }, [location]);

    return (
        <Switch>
            <GuestRoute path={urls.login} exact component={Login} />
            <ProtectedRoute exact path={urls.supplierFinancing} component={SupplierFinancingList} />
            <ProtectedRoute path={urls.funds} component={FundList} />
        </Switch>
    );
}

export default Routes;
