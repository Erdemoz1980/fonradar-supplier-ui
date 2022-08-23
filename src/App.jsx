/* eslint-disable camelcase */
import React from 'react';
import tr_TR from 'antd/es/locale/tr_TR';
import { ConfigProvider } from 'antd';
import Layout from './components/Layout';
import Content from './components/Layout/Content';
import Header from './components/Layout/Header';
// import Footer from './components/Layout/Footer';

import GlobalStyles from './GlobalStyles';
import ThemeProvider from './theme/ThemeProvider';
import 'antd/dist/antd.less';
import Routes from './routes';

function App() {
    // const dispatch = useDispatch();
    // const history = useHistory();
    // const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

    return (
        <ThemeProvider>
            <ConfigProvider locale={tr_TR}>
                <GlobalStyles />
                <Layout>
                    <Header />
                    <Content>
                        <Routes />
                    </Content>
                    {/* <Footer /> */}
                </Layout>
            </ConfigProvider>
        </ThemeProvider>
    );
}

export default App;
