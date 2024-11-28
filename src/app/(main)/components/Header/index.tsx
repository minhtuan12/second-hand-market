'use client'

import React, {useState} from 'react';
import styles from './styles.module.scss';
import './styles.scss';
import _ from "lodash";
import {
    BellOutlined,
    HeartFilled,
    ProductOutlined,
    SearchOutlined,
    ShopFilled,
    ShoppingFilled,
    UserOutlined
} from "@ant-design/icons";
import {Flex, MenuProps, Popover, Tooltip} from "antd";
import {usePathname, useRouter} from "next/navigation";
import DefaultInput from "@/components/Input";
import {useAuthUser} from "@/hooks/useAuthUser";
import AuthUserPopover from "@/components/Popover";
import Link from "next/link";
import PopoverFeature from "@/app/(main)/components/Header/components/PopoverFeature";
import {useDispatch} from "react-redux";
import {setFilter, setIsSearched} from "@/store/slices/app";

const Header = () => {
    const {authUser} = useAuthUser()
    const [showMenu, setShowMenu] = useState(false)
    const pathname = usePathname()
    const router = useRouter()
    const dispatch = useDispatch()

    const dropdownMenu: MenuProps['items'] = [
        {
            key: '1',
            icon: <Link href={'/profile'} className={'w-6 h-6 rounded-[50%] relative bg-[#8ecd3c]'}>
                <ShoppingFilled className={styles.dropdownIcon}/></Link>,
            label: <Link href={'/profile'} className={'text-[14px] font-medium'}>Đơn mua</Link>,
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
    ]

    const handleChangeKeySearch = (value: string): void => {
        dispatch(setFilter((prev: any) => ({...prev, search_key: value})))
    }

    const handleSearch = () => {

    }

    return (
        <header className={styles.headerWrap}>
            <div className={styles.headerLeftWrap}>
                <div className={styles.menuIcon} onClick={() => setShowMenu(true)}>
                    <div className={styles.headerTitle}>Chợ đồ cũ</div>
                </div>
            </div>
            {
                pathname !== '/checkout' ? <div className={styles.headerMiddleWrap}>
                    <div className={`${styles.search}`}>
                        <div className={'h-[45px] max-w-[500px]'}>
                            <DefaultInput
                                onPressEnter={() => dispatch(setIsSearched(true))}
                                className={styles.searchInput} size={'large'}
                                placeholder="Tìm kiếm sản phẩm trên Chợ Đồ Cũ"
                                prefix={<SearchOutlined/>}
                                onChange={e => handleChangeKeySearch(e.target.value)}
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
                            </Flex> : <Flex gap={40}>
                                <Popover
                                    content={<PopoverFeature/>} className={'cursor-pointer'}
                                    trigger={['click', 'hover']}
                                >
                                    <ProductOutlined className={'text-[22px]'}/>
                                </Popover>
                                <AuthUserPopover authUser={authUser} items={dropdownMenu}/>
                            </Flex>
                    }
                </div>
            </div>
        </header>
    );
}

export default Header
