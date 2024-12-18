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
import { useDispatch } from "react-redux";
import { setFilter, setIsSearched } from "@/store/slices/app";
import DefaultButton from "@/components/Button";
import AuthUserPopover from "@/components/Popover";
import Notifications from "../Notifications";
import socketService from "@/socket";
import Link from "next/link";

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

    useEffect(() => {
        if (authUser?._id) {
            const socket = socketService.getSocket(authUser?._id);
            socket.on("notification", (res: any) => {
                setNotificationBadge(notificationBadge + 1);
            });

            return () => {
                socketService.disconnectSocket();
            };
        }
    }, [authUser?._id]);

    return (
        <header className={styles.headerWrap}>
            <div className={styles.headerLeftWrap}>
                <div
                    className={styles.menuIcon}
                    onClick={() => setShowMenu(true)}
                >
                    <div
                        className={styles.headerTitle}
                        onClick={() => router.push("/")}
                    >
                        Chợ đồ cũ
                    </div>
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
                    <div
                        className={"cursor-pointer"}
                        onClick={() => router.push("/chat")}
                    >
                        <MessageOutlined className={"text-[24px] mt-1"} />
                    </div>
                    {/* TODO: tooltip notification */}
                    <Popover
                        trigger={["click"]}
                        content={
                            <Notifications userId={authUser?._id as string} />
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
                    <div
                        onClick={() => router.push("/my-post")}
                        className="flex items-center gap-[8px] cursor-pointer"
                    >
                        <SnippetsOutlined className={"text-[24px]"} />
                        <div className="text-[17px]">Quản lý bài đăng</div>
                    </div>
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
                    <DefaultButton
                        reverseColor
                        size="large"
                        onClick={() => router.push("/post/create")}
                    >
                        ĐĂNG TIN
                    </DefaultButton>
                </Flex>
            </div>
        </header>
    );
};

export default Header;
