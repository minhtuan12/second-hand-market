import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";
import {removeAuthToken} from "../../../../../utils/localStorage.js";
import {startRequestGetMeFail} from "../../../../../states/modules/auth/index.js";
import {getMe} from "../../../../../api/auth/index.js";
import {
    setDataChangePassword,
    setErrorChangePassword,
    setErrorInformation
} from "../../../../../states/modules/profile/index.js";

export default function Handle() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isShowInformation, setIsShowInformation] = useState(false);
    const authUser = useSelector(state => state.auth.authUser);
    const errorInformation = useSelector(state => state.profile.errorInformation);
    const errorChangePassword = useSelector(state => state.profile.errorChangePassword);

    const handleConfirmLogout = () => {
        removeAuthToken();
        dispatch(startRequestGetMeFail())
        navigate('/login');
    }

    const handleResetError = () => {
        if (errorInformation.name.length !== 0 || errorInformation.email.length !== 0) {
            dispatch(setErrorInformation({
                name: '',
                email: ''
            }))
        }

        if (
            errorChangePassword.currentPassword.length !== 0 ||
            errorChangePassword.password.length !== 0 ||
            errorChangePassword.confirmPassword.length !== 0
        ) {
            dispatch(setErrorChangePassword({
                currentPassword: '',
                password: '',
                confirmPassword: '',
            }))
            dispatch(setErrorInformation({
                name: '',
                email: ''
            }))
        }
    }

    const handleShowProfile = () => {
        handleResetError();
        dispatch(setDataChangePassword({
            currentPassword: '',
            password: '',
            confirmPassword: '',
        }));
        dispatch(getMe());
        setIsShowInformation(true)
    }

    return {
        isShowInformation, setIsShowInformation, authUser,
        handleConfirmLogout, handleShowProfile, handleResetError
    }
}
