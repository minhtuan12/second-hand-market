import {
    requestSeenNotification,
    useFetchOldNotifications,
} from "@/api/notifications";
import { Notification } from "../../../../../utils/types";
import { Flex, Spin } from "antd";
import {
    getNotification,
    handleExportTimeAgo,
} from "../../../../../utils/helper";
import Link from "next/link";
import {
    NOTIFICATION_TYPE,
    ORDER_STATUS,
    SERVER_ERROR_MESSAGE,
} from "../../../../../utils/constants";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/configureStore";

export default function Notifications({
    isLoading,
    userId,
    getOldNotifications,
}: {
    userId: string;
    isLoading: boolean;
    getOldNotifications: () => void;
}) {
    const [loadingSeen, setLoadingSeen] = useState<boolean>(false);
    const { notifications } = useSelector((state: RootState) => state.app);

    const handleSeenNotification = (notificationId: any) => {
        setLoadingSeen(true);
        const data =
            typeof notificationId === "string"
                ? [notificationId]
                : notificationId;
        requestSeenNotification(data)
            .then(() => {
                getOldNotifications();
            })
            .catch(() => {
                getNotification("error", SERVER_ERROR_MESSAGE);
            })
            .finally(() => {
                setLoadingSeen(false);
            });
    };

    const handleGetUrlByNotificationType = (notification: Notification) => {
        if (
            notification?.type === NOTIFICATION_TYPE.APPROVED_POST ||
            notification?.type === NOTIFICATION_TYPE.EXPIRED_POST
        ) {
            return `/posts/${notification?.post_id?._id}`;
        }
        if (notification?.type === NOTIFICATION_TYPE.REJECTED_POST) {
            return `/my-post?tab=rejected`;
        }
        if (notification?.type === NOTIFICATION_TYPE.PAYMENT_CREDIT) {
            return `/order?tab=buying-order&status=${ORDER_STATUS.WAITING_FOR_PAYMENT.VALUE}`;
        }
        if (notification?.type === NOTIFICATION_TYPE.DELIVERED_ORDER) {
            return `/order?tab=buying-order&status=${ORDER_STATUS.DELIVERED.VALUE}`;
        }
        if (notification?.type === NOTIFICATION_TYPE.RECEIVED) {
            return `/order?tab=buying-order&status=${ORDER_STATUS.RECEIVED.VALUE}`;
        }
        return '/'
    };

    return (
        <div className="h-[400px] rounded-xl bg-[#fff] w-[400px]">
            {isLoading || loadingSeen ? (
                <Flex align="center" justify="center" className="w-full h-full">
                    <Spin />
                </Flex>
            ) : notifications?.length === 0 ? (
                <Flex align="center" justify="center" className="w-full h-full">
                    Không có thông báo mới
                </Flex>
            ) : (
                <Flex vertical>
                    <Flex
                        justify="space-between"
                        className="w-full h-fit pt-5 px-6"
                    >
                        <div className="font-medium text-[15px] text-[#8c8c8c]">
                            Mới (
                            {
                                notifications?.filter(
                                    (item: Notification) => !item.seen_at
                                )?.length
                            }
                            )
                        </div>
                        <div
                            className="w-fit text-[#f80] font-medium text-[15px] cursor-pointer text-right"
                            onClick={() => {
                                const hasUnseenNoti = notifications?.some(
                                    (item: Notification) =>
                                        item && item.seen_at === null
                                );
                                if (notifications && hasUnseenNoti) {
                                    handleSeenNotification(
                                        notifications
                                            ?.filter(
                                                (item: Notification) =>
                                                    item?.seen_at === null
                                            )
                                            ?.map(
                                                (item: Notification) =>
                                                    item?._id
                                            )
                                    );
                                }
                            }}
                        >
                            Đánh dấu đã đọc toàn bộ
                        </div>
                    </Flex>
                    <Flex
                        vertical
                        className="mt-2 overflow-auto scrollbar-thin h-[350px]"
                    >
                        {notifications?.map((item: Notification) => {
                            return (
                                <Link
                                    target="_blank"
                                    href={handleGetUrlByNotificationType(item)}
                                    className="flex flex-col text-[#000] hover:bg-[#efefef] hover:text-[#f80] py-5 px-6 border-b-[1px]"
                                    key={item?._id}
                                    onClick={() =>
                                        handleSeenNotification(
                                            item?._id as string
                                        )
                                    }
                                >
                                    <div className="font-medium text-[16px]">
                                        {item?.title}
                                    </div>
                                    {item?.post_id ? (
                                        <div>{item?.post_id?.title}</div>
                                    ) : (
                                        ""
                                    )}
                                    <Flex
                                        className="text-[#8c8c8c] mt-1 w-full"
                                        justify="space-between"
                                        align="center"
                                    >
                                        <div>
                                            {handleExportTimeAgo(
                                                item?.createdAt
                                            )}
                                        </div>
                                        {!item.seen_at ? (
                                            <div className="bg-[#f80] w-2 h-2 rounded-[50%]"></div>
                                        ) : (
                                            ""
                                        )}
                                    </Flex>
                                </Link>
                            );
                        })}
                    </Flex>
                </Flex>
            )}
        </div>
    );
}
