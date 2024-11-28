import React, {useEffect, useState} from "react";
import {Button, Drawer, Input, Space} from "antd";
import {AdminProfile} from "../../../../../utils/types";

interface IProps {
    isOpen: boolean,
    onClose: () => void,
    user: AdminProfile
}

interface IPayloadData {
    username: string,
    password: string
}

export default function ProfileDrawer({isOpen, onClose, user}: IProps) {
    const [newUserData, setNewUserData] = useState<IPayloadData>({
        username: '',
        password: ''
    })

    const handleChangePayloadData = (value: string, type: string) => {
        setNewUserData({
            ...newUserData,
            [type]: value
        })
    }

    useEffect(() => {
        setNewUserData({
            username: user?.username,
            password: ''
        })
    }, [user])

    return <Drawer
        title="Cập nhật thông tin tài khoản"
        width={400}
        onClose={onClose}
        open={isOpen}
        extra={
            <Space>
                <Button onClick={onClose} type="primary" className={'admin-button'}>
                    Lưu
                </Button>
            </Space>
        }
        loading={!newUserData}
    >
        <div>
            <div className={'font-semibold text-base'}>Username</div>
            <Input
                rootClassName={'h-[36px] mt-1.5'}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChangePayloadData(e.target.value, 'username')}
                value={newUserData?.username}
            />
            <div className={'font-semibold text-base mt-6'}>Mật khẩu mới</div>
            <Input.Password
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChangePayloadData(e.target.value, 'password')}
                rootClassName={'h-[36px] mt-1.5'}
                value={newUserData?.password}
                placeholder={'*************'}
            />
        </div>
    </Drawer>
}
// TODO: update admin profile