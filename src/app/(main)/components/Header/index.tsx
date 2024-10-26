'use client'

import React, {useState} from 'react';
import styles from './styles.module.scss';
import './styles.scss';
import {useDispatch} from "react-redux";
import _ from "lodash";
import {
    BellOutlined,
    CaretDownOutlined,
    HeartFilled,
    LogoutOutlined,
    SearchOutlined,
    ShopFilled,
    ShoppingFilled,
    UserOutlined
} from "@ant-design/icons";
import {Avatar, Dropdown, Flex, MenuProps, Tooltip} from "antd";
import {usePathname, useRouter} from "next/navigation";
import DefaultInput from "@/components/Input";
import {useAuthUser} from "../../../../../utils/hooks/useAuthUser";
import {handleLogout} from "@/actions/auth";

const Header = () => {
    const {authUser} = useAuthUser()
    const [showMenu, setShowMenu] = useState(false)
    const dispatch = useDispatch()
    const pathname = usePathname()
    const router = useRouter()

    const handleClickLogout = async () => {
        await handleLogout()
        router.push('/')
    }

    const dropdownMenu: MenuProps['items'] = [
        {
            key: '0',
            label: <Flex vertical onClick={() => router.push('/profile')}>
                <Flex gap={10} align={'center'}>
                    <Avatar size={"large"} src={authUser?.avatar} icon={!authUser?.avatar && <UserOutlined/>}/>
                    <Flex vertical>
                        <div
                            className={'font-semibold text-black text-base'}>{authUser?.firstname + " " + authUser?.lastname}</div>
                        <div className={'text-gray-500 text-[14px]'}>{authUser?.email}</div>
                    </Flex>
                </Flex>
            </Flex>
        },
        {
            type: 'divider',
        },
        {
            key: '1',
            icon: <div className={'w-6 h-6 rounded-[50%] relative bg-[#8ecd3c]'}>
                <ShoppingFilled className={styles.dropdownIcon}/></div>,
            label: <div className={'text-[14px] font-medium'}>Đơn mua</div>,
        },
        {
            key: '2',
            icon: <div className={'w-6 h-6 rounded-[50%] relative bg-[#fe9b69]'}>
                <ShopFilled className={styles.dropdownIcon}/></div>,
            label: <div className={'text-[14px] font-medium'}>Đơn bán</div>,
        },
        {
            type: 'divider',
        },
        {
            key: '3',
            icon: <div className={'w-6 h-6 rounded-[50%] relative bg-[#FF8F8F]'}>
                <HeartFilled className={styles.dropdownIcon}/></div>,
            label: <div className={'text-[14px] font-medium'}>Bài đăng đã lưu</div>,
        },
        {
            type: 'divider',
        },
        {
            key: '4',
            icon: <div className={'w-6 h-6 rounded-[50%] relative bg-[#D0B8A8]'} onClick={handleClickLogout}>
                <LogoutOutlined className={styles.dropdownIcon} rotate={180}/>
            </div>,
            label: <div className={'text-[14px] font-medium'} onClick={handleClickLogout}>
                Đăng xuất
            </div>,
        },
    ]

    const handleChangeKeySearch = (value: string): void => {

    }

    const handleSearch = () => {

    }
    console.log(authUser)
    return (
        <header className={styles.headerWrap}>
            <div className={styles.headerLeftWrap}>
                <div className={styles.menuIcon} onClick={() => setShowMenu(true)}>
                    {/*<Image alt={''} src={MainLogo} width={45} className={'rounded-[50%] mr-3'}/>*/}
                    {/*<div className={styles.headerTitle}>Chợ đồ cũ</div>*/}
                </div>
            </div>
            {
                pathname !== '/checkout' ? <div className={styles.headerMiddleWrap}>
                    <div className={`${styles.search}`}>
                        <div className={'h-[45px] max-w-[500px]'}>
                            <DefaultInput
                                className={styles.searchInput} size={'large'}
                                placeholder="Tìm kiếm sản phẩm trên Chợ Đồ Cũ"
                                prefix={<SearchOutlined/>}
                            />
                        </div>
                    </div>
                </div> : ''
            }
            <div className={`${styles.headerRightWrap}`}>
                <div className={`${styles.itemHeaderRight} icon-custom`}>
                    {
                        _.isEmpty(authUser) ?
                            <Flex gap={6} justify={'center'} align={'center'}>
                                {/* TODO: tooltip notification */}
                                <Tooltip>
                                    <div className={'cursor-pointer'}>
                                        <BellOutlined width={25} height={25}/>
                                    </div>
                                </Tooltip>
                                <Flex gap={2} justify={'center'} align={'center'}>
                                    <UserOutlined height={28} width={28} color={'#fff'}/>
                                    <Flex vertical justify={'center'} align={'start'}>
                                        <div className={styles.text} onClick={() => router.push('/register')}>
                                            Đăng ký
                                        </div>
                                        <div className={styles.text} onClick={() => router.push('/login')}>
                                            Đăng nhập
                                        </div>
                                    </Flex>
                                </Flex>
                            </Flex> : <Dropdown trigger={['click']} menu={{items: dropdownMenu}}
                                                rootClassName={'dropdown-custom'}>
                                <div className={'flex items-center text-[15px] cursor-pointer hover:opacity-75'}>
                                    {
                                        authUser?.avatar ?
                                            <Avatar src={authUser?.avatar}/> : <Avatar icon={<UserOutlined/>}/>
                                    }
                                    <div className={'ml-2'}>{authUser?.firstname + " " + authUser?.lastname}</div>
                                    <CaretDownOutlined className={'ml-2 mt-0.5'} style={{fontSize: '14px'}}/>
                                </div>
                            </Dropdown>
                    }
                </div>
            </div>
        </header>
    );
}

export default Header
