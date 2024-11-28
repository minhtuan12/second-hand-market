'use client'

import React, {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import DefaultAvatar from '../../../../assets/images/logos/user_default.png'
import OnlineDotIcon from '../../../../assets/images/icons/solid/online-dot.svg'
import styles from './styles.module.scss'
import {
    BarsOutlined,
    LockOutlined,
    MailOutlined,
    MinusOutlined,
    PhoneOutlined,
    ShopOutlined,
    ShoppingOutlined,
    SmileOutlined,
    TeamOutlined,
    UserAddOutlined
} from "@ant-design/icons";
import AccountTab from "../components/AccountTab";
import ChangePasswordTab from "../components/ChangePasswordTab";
import SellingTab from "../components/SellingTab";
import Link from "next/link";
import {Flex, Rate, Skeleton, Tabs, TabsProps} from "antd";
import Button from "@/components/Button";
import Image from "next/image";
import {setPageTitle} from "@/store/slices/app";
import {useAuthUser} from "@/hooks/useAuthUser";
import {handleGetProfile} from "@/actions/auth";
import {UserProfile} from "../../../../../utils/types";
import KidInformationTab from "@/app/(main)/profile/components/KidInformationTab";
import BreadcrumbUpdater from "../../../../components/BreadcrumbUpdater";

const TabItem = ({children}: { children: React.ReactNode }) => <div className={'flex gap-[6px] items-center'}>{children}</div>

export default function Profile({params}: { params: { slug: string } }) {
    const id = params.slug?.[0]
    const dispatch = useDispatch()
    const {authUser} = useAuthUser()
    const [user, setUser] = useState<UserProfile | null>(null)
    const [isAuthUser, setIsAuthUser] = useState<boolean>(false)
    const [tabIndex, setTabIndex] = useState<string>('account')
    const breadcrumbData = [
        {
            path: '/',
            name: 'Trang chủ'
        },
        {
            name: 'Trang cá nhân'
        }
    ]

    useEffect(() => {
        dispatch(setPageTitle('Trang cá nhân'))
    }, [dispatch])

    useEffect(() => {
        async function getProfile() {
            if (id) {
                // TODO: get user profile
            } else {
                handleGetProfile().then(user => setUser(user))
            }
        }

        getProfile()
        setIsAuthUser(!id)
        setTabIndex(id ? 'selling' : 'account')
    }, [id, authUser])

    const handleChangeTab = (chosenTab: string): void => {
        setTabIndex(chosenTab)
        // dispatch(setTab(chosenTab))
    }

    const handleConfirmUpdateProfile = (user: UserProfile) => {
        setUser(user)
    }

    const tabItems: TabsProps['items'] = [
        {
            key: 'account',
            label: <TabItem><BarsOutlined/>Thông tin tài khoản</TabItem>,
            children: <AccountTab handleConfirmUpdateProfile={handleConfirmUpdateProfile}/>,
        },
        {
            key: 'kid-info',
            label: <TabItem><TeamOutlined/>Thông tin về con</TabItem>,
            children: <KidInformationTab/>,
        },
        {
            key: 'password',
            label: <TabItem><LockOutlined/> Đổi mật khẩu</TabItem>,
            children: <ChangePasswordTab/>,
        },
        {
            key: 'selling',
            label: <TabItem><ShopOutlined/>Đang bán</TabItem>,
            children: <SellingTab/>,
        },
        {
            key: 'sold',
            label: <TabItem><ShoppingOutlined/>Đã bán</TabItem>,
            children: <div>Edit your profile or update contact information.</div>,
        },
        {
            key: 'ratings',
            label: <TabItem><SmileOutlined/>Đánh giá</TabItem>,
            children: <div>Edit your profile or update contact information.</div>,
        }
    ]

    return <div className={'w-full pt-3'}>
        <BreadcrumbUpdater className={'mb-5'} breadcrumbData={breadcrumbData} title={'Trang cá nhân'}/>
        <div className={`bg-[#fff] w-full h-auto rounded-[12px] pt-8`}>
            <Flex gap={25} align={'center'} className={'mx-8'} wrap justify={'center'}>
                {
                    user ? <>
                        <div className={'w-[105px] relative border-[2px] border-gray-300 rounded-xl'}>
                            <Image
                                src={user?.avatar || DefaultAvatar}
                                alt={''}
                                style={{borderRadius: '10px', height: '100%', width: '100%'}}
                                width={0}
                                height={0}
                                sizes="100vw"
                            />
                            <div className={'absolute right-[-9px] bottom-3 border-[3px] rounded-2xl border-white'}>
                                <Image src={OnlineDotIcon} alt={''} width={11} height={11}/>
                            </div>
                        </div>
                        <Flex className={`flex-1`} gap={4} vertical>
                            <Flex justify={'space-between'} align={'center'} className={styles.headerWrap}>
                                <Flex vertical>
                                    <div className={'font-semibold text-[20px] text-black'}>
                                        {user?.firstname + " " + user?.lastname}
                                    </div>
                                    <Flex wrap className={'gap-x-[30px]'}>
                                        <Flex className={styles.detailText} align={'center'} gap={6}>
                                            <MailOutlined/>
                                            <Link href={`mailto: ${user?.email}`}
                                                  className={'hover:decoration-transparent'}>
                                                {user?.email}
                                            </Link>
                                        </Flex>
                                        <Flex className={styles.detailText} align={'center'} gap={6}>
                                            <PhoneOutlined/>
                                            <div>{user?.phone || <i>Đang cập nhật</i>}</div>
                                        </Flex>
                                    </Flex>
                                </Flex>
                                {
                                    !isAuthUser ?
                                        <Button size={'large'} className={'cursor-pointer'}>
                                            <UserAddOutlined/> Theo dõi
                                        </Button> : ''
                                }
                            </Flex>

                            <Flex justify={'space-between'} align={'center'}>
                                <Flex vertical>
                                    <div className={styles.detailText}>Dia chi thuong tru abcxyz</div>
                                    <Flex className={styles.detailText} align={'center'} gap={1}>
                                        Người theo dõi: <span className={'font-semibold text-black ml-1'}>
                                    {user?.follower_ids?.length || 0}
                                </span>
                                        <MinusOutlined rotate={90}/>
                                        Đang theo dõi: <span className={'font-semibold text-black ml-1'}>
                                    {user?.following_user_ids?.length || 0}
                                    </span>
                                    </Flex>
                                </Flex>
                                <Rate allowHalf value={user?.rating || 0} disabled/>
                            </Flex>
                        </Flex>
                    </> : <Skeleton loading={true}/>
                }
            </Flex>
            <div className={'w-full px-8 mt-6 pb-8 custom-tabs'}>
                <Tabs
                    activeKey={tabIndex}
                    items={isAuthUser ? tabItems : tabItems.slice(2)}
                    onChange={handleChangeTab}
                />
            </div>
        </div>
    </div>
}
