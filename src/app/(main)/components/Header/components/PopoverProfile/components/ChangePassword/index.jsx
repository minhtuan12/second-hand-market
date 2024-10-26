// import React from 'react';
// import {Button, Input} from "antd";
// import InlineSVG from "react-inlinesvg";
// import IconWarning from "../../../../../../../assets/images/icons/light/warning.svg";
// import Handle from "./handle.js";
//
// export default function ChangePassword(props) {
//     const {
//         dataChangePassword, errorChangePassword, isLoadingBtnChangePassword,
//         handleChangeInput, handleConfirmChangePassword
//     } = Handle(props);
//
//     return (
//         <div>
//             <div className={`input-wrap mt-5`}>
//                 <div className={'label-wrap'}>
//                     Mật khẩu cũ <span className={'required'}>*</span>
//                 </div>
//                 <Input.Password
//                     className={`main-input`}
//                     placeholder={'Nhập mật khẩu cũ'}
//                     value={dataChangePassword.currentPassword}
//                     onChange={(e) => handleChangeInput(e, 'currentPassword')}
//                 />
//                 {
//                     errorChangePassword && errorChangePassword.currentPassword.length > 0 ?
//                         <span className={'error'}>
//             <div className={'icon'}>
//               <InlineSVG src={IconWarning} width={14} height="auto"/>
//             </div>
//                             {errorChangePassword.currentPassword}
//           </span> : ''
//                 }
//             </div>
//
//             <div className={`input-wrap mt-5`}>
//                 <div className={'label-wrap'}>
//                     Mật khẩu mới <span className={'required'}>*</span>
//                 </div>
//                 <Input.Password
//                     className={`main-input`}
//                     placeholder={'Nhập mật khẩu'}
//                     value={dataChangePassword.password}
//                     onChange={(e) => handleChangeInput(e, 'password')}
//                 />
//                 {
//                     errorChangePassword && errorChangePassword.password.length > 0 ?
//                         <span className={'error'}>
//             <div className={'icon'}>
//               <InlineSVG src={IconWarning} width={14} height="auto"/>
//             </div>
//                             {errorChangePassword.password}
//           </span> : ''
//                 }
//             </div>
//
//             <div className={`input-wrap mt-5`}>
//                 <div className={'label-wrap'}>
//                     Xác nhận mật khẩu mới <span className={'required'}>*</span>
//                 </div>
//                 <Input.Password
//                     className={`main-input`}
//                     placeholder={'Xác nhận mật khẩu'}
//                     value={dataChangePassword.confirmPassword}
//                     onChange={(e) => handleChangeInput(e, 'confirmPassword')}
//                 />
//                 {
//                     errorChangePassword && errorChangePassword.confirmPassword.length > 0 ?
//                         <span className={'error'}>
//             <div className={'icon'}>
//               <InlineSVG src={IconWarning} width={14} height="auto"/>
//             </div>
//                             {errorChangePassword.confirmPassword}
//           </span> : ''
//                 }
//             </div>
//
//             <div className={`flex justify-end`}>
//                 <Button
//                     loading={isLoadingBtnChangePassword}
//                     [action]="primary"
//                     size={'large'}
//                     className={`main-btn-primary !w-auto`}
//                     block
//                     onClick={() => handleConfirmChangePassword()}
//                 >Thay đổi mật khẩu
//                 </Button>
//             </div>
//         </div>
//     )
// }
