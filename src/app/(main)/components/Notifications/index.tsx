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
    SERVER_ERROR_MESSAGE,
} from "../../../../../utils/constants";
import { useState } from "react";

export default function Notifications({ userId }: { userId: string }) {
    const {
        data: notifications,
        isLoading,
        mutate: getOldNotifications,
    } = useFetchOldNotifications();
    const [loadingSeen, setLoadingSeen] = useState<boolean>(false);

    const handleSeenNotification = (notificationId: string | string[]) => {
        setLoadingSeen(true);
        const data = typeof notificationId === 'string' ? [notificationId] : notificationId
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
                    <Flex justify="end" className="w-full h-fit pt-5 px-6">
                        <div
                            className="w-fit text-[#f80] font-medium text-[15px] cursor-pointer text-right"
                            onClick={() => {
                                handleSeenNotification(
                                    notifications
                                        ?.filter(
                                            (item: Notification) =>
                                                item.seen_at === null
                                        )
                                        ?.map((item: Notification) => item?._id)
                                );
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
                            // url for other notification type
                            let url = "/";
                            if (
                                item?.type ===
                                    NOTIFICATION_TYPE.APPROVED_POST ||
                                item?.type === NOTIFICATION_TYPE.EXPIRED_POST
                            ) {
                                url = `/posts/${item?.post_id?._id}`;
                            } else if (
                                item?.type === NOTIFICATION_TYPE.REJECTED_POST
                            ) {
                                url = `my-post?tab=rejected`;
                            }

                            return (
                                <Link
                                    target="_blank"
                                    href={url}
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
                                        className="text-gray-50 w-full"
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
