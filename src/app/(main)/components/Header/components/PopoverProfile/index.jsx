import React from 'react';
import styles from "./styles.module.scss";
import Handle from "./handle.js";
import Information from "./components/Information";
import InlineSVG from "react-inlinesvg";
import Close from "../../../../../assets/images/icons/duotone/times.svg";

function PopoverProfile() {
    const {
        isShowInformation, setIsShowInformation, authUser,
        handleConfirmLogout, handleShowProfile, handleResetError
    } = Handle();

    return (
        <div className={styles.modalInfoWrap}>
            {/*<div className={styles.personalInformationWrap}>*/}
            {/*    <div className={styles.name}>*/}
            {/*        {authUser.user.username}*/}
            {/*    </div>*/}
            {/*    <div className={styles.role}>*/}
            {/*        {authUser.user.email || 'Updating...'}*/}
            {/*    </div>*/}
            {/*</div>*/}
            {/*<div className={styles.mainModalInfoWrap}>*/}
            {/*    <ul className={styles.menuInfoWrap}>*/}
            {/*        <li*/}
            {/*            onClick={() => handleShowProfile()}*/}
            {/*            className={`${styles.itemInfoWrap}`}*/}
            {/*        >*/}
            {/*            <div>*/}
            {/*                <span className={styles.text}>Profile</span>*/}
            {/*            </div>*/}
            {/*        </li>*/}
            {/*        <li*/}
            {/*            onClick={() => handleConfirmLogout()}*/}
            {/*            className={styles.itemInfoWrap}*/}
            {/*        >*/}
            {/*            <div>*/}
            {/*                <span className={styles.text}>Log out</span>*/}
            {/*            </div>*/}
            {/*        </li>*/}
            {/*    </ul>*/}
            {/*</div>*/}

            {/*<Drawer*/}
            {/*    title="Profile"*/}
            {/*    placement={'right'}*/}
            {/*    closable={true}*/}
            {/*    onClose={() => setIsShowInformation(false)}*/}
            {/*    open={isShowInformation}*/}
            {/*    key={'right'}*/}
            {/*    width={520}*/}
            {/*    closeIcon={<InlineSVG src={Close}/>}*/}
            {/*>*/}
            {/*    <Information*/}
            {/*        handleResetError={() => handleResetError()}*/}
            {/*    />*/}
            {/*</Drawer>*/}

        </div>
    );
}

export default PopoverProfile;
