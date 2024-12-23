"use client";

import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import "./styles.scss";
import _ from "lodash";
import {
    BellOutlined,
    HeartFilled,
    MessageOutlined,
    ProductOutlined,
    SearchOutlined,
    ShopFilled,
    ShoppingFilled,
    SnippetsOutlined,
    UserOutlined,
} from "@ant-design/icons";
import { Badge, Flex, MenuProps, Popover, Tooltip } from "antd";
import { usePathname, useRouter } from "next/navigation";
import DefaultInput from "@/components/Input";
import { useAuthUser } from "@/hooks/useAuthUser";
import { useDispatch, useSelector } from "react-redux";
import { setFilter, setIsSearched, setNotifications } from "@/store/slices/app";
import DefaultButton from "@/components/Button";
import AuthUserPopover from "@/components/Popover";
import Notifications from "../Notifications";
import socketService from "@/socket";
import Link from "next/link";
import { useFetchOldNotifications } from "@/api/notifications";
import { Notification as NotificationType } from "../../../../../utils/types";
import { RootState, store } from "@/store/configureStore";
import { useSocket } from "@/app/context/SocketContext";

const Header = () => {
    const { authUser } = useAuthUser();
    const [showMenu, setShowMenu] = useState(false);
    const pathname = usePathname();
    const router = useRouter();
    const dispatch = useDispatch();
    const [notificationBadge, setNotificationBadge] = useState(0);

    const dropdownMenu: MenuProps["items"] = [
        {
            key: "1",
            icon: (
                <Link
                    href={"/order?tab=buying-order"}
                    className={"w-6 h-6 rounded-[50%] relative bg-[#8ecd3c]"}
                >
                    <ShoppingFilled className={styles.dropdownIcon} />
                </Link>
            ),
            label: (
                <Link
                    href={"/order?tab=buying-order"}
                    className={"text-[14px] font-medium"}
                >
                    Đơn mua
                </Link>
            ),
        },
        {
            key: "2",
            icon: (
                <Link
                    href={"/order?tab=selling-order"}
                    className={"w-6 h-6 rounded-[50%] relative bg-[#fe9b69]"}
                >
                    <ShopFilled className={styles.dropdownIcon} />
                </Link>
            ),
            label: (
                <Link
                    href={"/order?tab=selling-order"}
                    className={"text-[14px] font-medium"}
                >
                    Đơn bán
                </Link>
            ),
        },
        {
            type: "divider",
        },
        {
            key: "3",
            icon: (
                <Link
                    href={"/saved-posts"}
                    className={"w-6 h-6 rounded-[50%] relative bg-[#FF8F8F]"}
                >
                    <HeartFilled className={styles.dropdownIcon} />
                </Link>
            ),
            label: (
                <Link
                    href={"/saved-posts"}
                    className={"text-[14px] font-medium"}
                >
                    Bài đăng yêu thích
                </Link>
            ),
        },
    ];

    const handleChangeKeySearch = (value: string): void => {
        dispatch(setFilter((prev: any) => ({ ...prev, search_key: value })));
    };

    const handleSearch = () => {};

    const {
        data: notifications,
        isLoading,
        mutate: getOldNotifications,
    } = useFetchOldNotifications();

    const notificationsStore = useSelector(
        (state: RootState) => state.app.notifications
    );
    const socket = useSocket();

    useEffect(() => {
        if (socket) {
            const handleUpdateNoti = (res: any) => {
                const { notifications } = store.getState().app;
                dispatch(
                    setNotifications([res?.newNotification, ...notifications])
                );
                setNotificationBadge((prevBadge) => prevBadge + 1);
            };
            socket.on("notification", handleUpdateNoti);

            return () => {
                socket.off("notification", handleUpdateNoti);
                socketService.disconnectSocket();
            };
        }
    }, [socket]);

    useEffect(() => {
        if (notifications) {
            dispatch(setNotifications(notifications));
            setNotificationBadge(
                notifications?.filter((item: NotificationType) => !item.seen_at)
                    ?.length
            );
        }
    }, [notifications]);

    return (
        <header className={styles.headerWrap}>
            <div className={styles.headerLeftWrap}>
                <div
                    className={styles.menuIcon}
                    onClick={() => setShowMenu(true)}
                >
                    <Link
                        className={`${styles.headerTitle} !text-[#000]`}
                        href={"/"}
                    >
                        Chợ đồ cũ
                    </Link>
                </div>
            </div>
            {pathname !== "/checkout" ? (
                <div className={styles.headerMiddleWrap}>
                    <div className={`${styles.search}`}>
                        <div className={"h-[45px] max-w-[500px]"}>
                            <DefaultInput
                                onPressEnter={() =>
                                    dispatch(setIsSearched(true))
                                }
                                className={styles.searchInput}
                                size={"large"}
                                placeholder="Tìm kiếm sản phẩm trên Chợ Đồ Cũ"
                                prefix={<SearchOutlined />}
                                onChange={(e) =>
                                    handleChangeKeySearch(e.target.value)
                                }
                            />
                        </div>
                    </div>
                </div>
            ) : (
                ""
            )}
            <div className={`${styles.headerRightWrap}`}>
                <Flex
                    gap={30}
                    align="center"
                    className={`${styles.itemHeaderRight} icon-custom`}
                >
                    <Link
                        href={"/chat"}
                        className={
                            "cursor-pointer text-[#000] hover:text-[#000]"
                        }
                    >
                        <MessageOutlined className={"text-[24px] mt-1"} />
                    </Link>
                    <Popover
                        trigger={["click"]}
                        content={
                            <Notifications
                                userId={authUser?._id as string}
                                getOldNotifications={getOldNotifications}
                                isLoading={isLoading}
                            />
                        }
                    >
                        <div className={"cursor-pointer"}>
                            <Badge
                                count={notificationBadge}
                                style={{ fontSize: "14px" }}
                            >
                                <BellOutlined className={"text-[24px] mt-1"} />
                            </Badge>
                        </div>
                    </Popover>
                    <Link
                        href={"/my-post"}
                        className="flex items-center gap-[8px] cursor-pointer text-[#000] hover:text-[#000]"
                    >
                        <SnippetsOutlined className={"text-[24px]"} />
                        <div className="text-[17px]">Quản lý bài đăng</div>
                    </Link>
                    {_.isEmpty(authUser) ? (
                        <Flex gap={2} justify={"center"} align={"center"}>
                            <Flex vertical justify={"center"} align={"start"}>
                                <Link
                                    href="/register"
                                    className="text-white font-medium hover:text-white"
                                >
                                    Đăng ký
                                </Link>
                                <Link
                                    href="/login"
                                    className="text-white font-medium hover:text-white"
                                >
                                    Đăng nhập
                                </Link>
                            </Flex>
                        </Flex>
                    ) : (
                        <AuthUserPopover
                            authUser={authUser}
                            items={dropdownMenu}
                        />
                    )}
                    <Link href={"/post/create"}>
                        <DefaultButton reverseColor size="large">
                            ĐĂNG TIN
                        </DefaultButton>
                    </Link>
                </Flex>
            </div>
        </header>
    );
};

export default Header;
