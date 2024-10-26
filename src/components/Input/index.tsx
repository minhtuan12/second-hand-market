import {Input, InputProps} from "antd";
import './styles.scss'
import React from "react";

interface IProps extends InputProps {
    password?: boolean
}

const DefaultInput: React.FC<IProps> = ({password = false, ...rest}) => {
    return <div className={'custom-input'}>
        {
            password ? <Input.Password {...rest}/> :
                <Input {...rest}/>
        }
    </div>
}

export default DefaultInput
