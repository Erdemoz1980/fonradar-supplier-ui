import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Popover, Divider } from 'antd';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import Icon, { CustomIcon } from '../Icon';
import AccountDropdownStyled, { AccountButton } from './styles';
import { logout } from '../../apiServices/userApi';
import Text from '../Text';
import urls from '../../routes/urls';
import { setLoggedIn } from '../../store/reducers/userSlice';

const AccountMenu = ({ setIsDropdownVisible }) => {
    const history = useHistory();
    const dispatch = useDispatch();

    const closeDropdown = () => {
        setIsDropdownVisible(false);
    };

    const onClickLogout = () => {
        logout();
        dispatch(setLoggedIn(''));
        history.push(urls.login);
    };

    return (
        <>
            <Link to={urls.generalInfo}>
                <AccountButton onClick={closeDropdown} block>
                    <Text className="m-0" type="label">
                        Temel Bilgiler
                    </Text>
                    <Text type="small" color="smoke">
                        E-posta, telefon ve şifre bilgilerini değiştir.
                    </Text>
                </AccountButton>
            </Link>

            <Divider className="m" />

            <Link to={urls.companyInfo}>
                <AccountButton onClick={closeDropdown} block>
                    <Text className="m-0" type="label">
                        Firma Bilgileri
                    </Text>
                    <Text type="small" color="smoke">
                        Firmanıza ait bilgileri güncelleyin.
                    </Text>
                </AccountButton>
            </Link>

            <Divider className="m" />

            <Link to={urls.legalDocuments}>
                <AccountButton onClick={closeDropdown} block>
                    <Text className="m-0" type="label">
                        Legal Evraklar
                    </Text>
                    <Text type="small" color="smoke">
                        Firmanıza ait legal evrakları ekleyin veya güncelleyin.
                    </Text>
                </AccountButton>
            </Link>

            <Divider className="m" />

            <Link to={urls.help}>
                <AccountButton onClick={closeDropdown} block>
                    <Text className="m-0" type="label">
                        Yardım
                    </Text>
                    <Text type="small" color="smoke">
                        Sorularınızı cevaplayalım.
                    </Text>
                </AccountButton>
            </Link>
            <Divider className="m" />
            <Link to={urls.login}>
                <AccountButton onClick={onClickLogout} block>
                    <Text className="m-0" type="label" color="red">
                        Çıkış
                    </Text>
                </AccountButton>
            </Link>
        </>
    );
};

function AccountDropdown() {
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);

    return (
        <AccountDropdownStyled>
            <Popover
                className="cursor-pointer"
                content={() => <AccountMenu setIsDropdownVisible={setIsDropdownVisible} />}
                trigger="click"
                placement="bottomRight"
                onVisibleChange={setIsDropdownVisible}
                visible={isDropdownVisible}>
                <div>
                    <CustomIcon icon="user" size="lg" />
                    <Text color="primary" bold>
                        Hesabım
                    </Text>

                    <Icon className="mx" icon="angle-down" size="lg" />
                </div>
            </Popover>
        </AccountDropdownStyled>
    );
}

// AccountMenu.propTypes = {
//     setIsDropdownVisible: PropTypes.func.isRequired,
// };

export default AccountDropdown;
