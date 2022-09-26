import React, { useEffect } from 'react';
import { Redirect, Route, Switch, useLocation } from 'react-router';
import { useSelector } from 'react-redux';
import Login from '../pages/Login';
import urls from './urls';
import SupplierFinancingList from '../pages/SupplierFinancing/SupplierFinancingList';
import FundList from '../pages/FundList';
import FundDetails from '../pages/FundDetails';
import GeneralInfo from '../pages/Account/GeneralInfo';
import CompanyInfo from '../pages/Account/CompanyInfo';
import InvoiceResult from '../pages/SupplierFinancing/InvoiceResult';
import InvoiceAssigned from '../pages/InvoiceAssigned';

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
            <ProtectedRoute path={urls.fundDetail} component={FundDetails} />
            <ProtectedRoute path={urls.funds} component={FundList} />
            <ProtectedRoute path={urls.generalInfo} exact component={GeneralInfo} />
            <ProtectedRoute path={urls.companyInfo} exact component={CompanyInfo} />
            <ProtectedRoute path={urls.legalDocuments} exact component={CompanyInfo} />
            <ProtectedRoute path={urls.createdInvoiceResult} exact component={InvoiceResult} />
            <ProtectedRoute path={urls.invoiceAsign} exact component={InvoiceAssigned} />
        </Switch>
    );
}

export default Routes;
