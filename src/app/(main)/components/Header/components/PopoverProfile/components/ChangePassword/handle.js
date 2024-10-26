import {useDispatch, useSelector} from "react-redux";
import _ from "lodash";
import {handleCheckValidateConfirm} from "../../../../../../../utils/helper.js";
import {setDataChangePassword, setErrorChangePassword} from "../../../../../../../states/modules/profile/index.js";
import {changePassword} from "../../../../../../../api/profile/index.js";

export default function Handle(props) {
    const {handleResetError} = props;
    const dataChangePassword = useSelector(state => state.profile.dataChangePassword);
    const errorChangePassword = useSelector(state => state.profile.errorChangePassword);
    const isLoadingBtnChangePassword = useSelector(state => state.profile.isLoadingBtnChangePassword);
    const dispatch = useDispatch();

    const handleChangeInput = (e, type) => {
        handleResetError();
        let value = e.target.value;
        let data = _.cloneDeep(dataChangePassword);
        data[type] = value;
        dispatch(setDataChangePassword(data));
    }

    const handleConfirmChangePassword = () => {
        let validate = handleCheckValidateConfirm(dataChangePassword, errorChangePassword);
        dispatch(setErrorChangePassword(validate.dataError))
        if (!validate.isError) {
            dispatch(changePassword(dataChangePassword))
        }
    }

    return {
        dataChangePassword, errorChangePassword, isLoadingBtnChangePassword,
        handleChangeInput, handleConfirmChangePassword
    }
}
