// import React from 'react';
// import {Input} from "antd";
// import InlineSVG from "react-inlinesvg";
// import IconWarning from "../../../../../../../assets/images/icons/light/warning.svg";
// import Handle from "./handle.js";
//
// export default function Information(props) {
//     const {
//         dataInformation, errorInformation, isLoadingBtnInformation,
//         handleChangeInput, handleConfirmUpdateInformation, handleKeyDown
//     } = Handle(props);
//     return (
//         <div>
//             <div className={`input-wrap`}>
//                 <div className={'label-wrap'}>
//                     Username <span className={'required'}>*</span>
//                 </div>
//                 <Input
//                     className={`main-input ${errorInformation && errorInformation.username?.length > 0 ? 'error-input' : ''}`}
//                     placeholder={'Enter username'}
//                     value={dataInformation.username}
//                     onChange={(e) => handleChangeInput(e, 'name')}
//                     onKeyDown={(e) => handleKeyDown(e)}
//                 />
//                 {
//                     errorInformation && errorInformation.username?.length > 0 ?
//                         <span className={'error'}>
//             <div className={'icon'}>
//               <InlineSVG src={IconWarning} width={14} height="auto"/>
//             </div>
//                             {errorInformation.username}
//           </span> : ''
//                 }
//             </div>
//
//             <div className={`input-wrap`}>
//                 <div className={'label-wrap'}>
//                     Email <span className={'required'}>*</span>
//                 </div>
//                 <Input
//                     className={`main-input ${errorInformation && errorInformation.email?.length > 0 ? 'error-input' : ''}`}
//                     placeholder={'Nhập email'}
//                     value={dataInformation.email}
//                     onChange={(e) => handleChangeInput(e, 'email')}
//                     onKeyDown={(e) => handleKeyDown(e)}
//                 />
//                 {
//                     errorInformation && errorInformation.email?.length > 0 ?
//                         <span className={'error'}>
//             <div className={'icon'}>
//               <InlineSVG src={IconWarning} width={14} height="auto"/>
//             </div>
//                             {errorInformation.email}
//           </span> : ''
//                 }
//             </div>
//         </div>
//     )
// }
