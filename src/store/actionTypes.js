import { userActionTypes } from './user/userActions';
import { provinceActionTypes } from './provinces/provinceActions';

export default {
    ...userActionTypes,
    ...provinceActionTypes,
};
