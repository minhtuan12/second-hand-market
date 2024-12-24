import { Post } from "../../../../../../utils/types";
import { Flex, message, Popover, Tag } from "antd";
import Button from "@/components/Button";
import Image from "next/image";
import moment from "moment";
import {
    EditOutlined,
    EllipsisOutlined,
    LockOutlined,
    ShareAltOutlined,
    UnlockOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import {
    POST_STATUS,
    SERVER_ERROR_MESSAGE,
} from "../../../../../../utils/constants";
import { useMemo } from "react";
import { requestChangePostVisibility } from "@/api/post";
import {
    getNotification,
    handleFormatCurrency,
    handleGetRegion,
} from "../../../../../../utils/helper";
import { useFetchRegions } from "@/api/location";

export default function PostItem({
    post,
    reFetchMyPosts,
}: {
    post: Post;
    reFetchMyPosts: () => void;
}) {
    const [messageApi, contextHolder] = message.useMessage();
    const handleCopyUrl = () => {
        const el = document.createElement("input");
        el.value = window.location.href;
        document.body.appendChild(el);
        el.select();
        document.execCommand("copy");
        document.body.removeChild(el);
        messageApi.open({
            type: "success",
            content: "Đã sao chép",
        });
    };

    const hasFullLocation: boolean = !!(
        post?.location.district && post?.location.city
    );
    const isEditable = useMemo(() => {
        return (
            post?.status !== POST_STATUS.HIDDEN.VALUE &&
            post?.status !== POST_STATUS.DONE.VALUE &&
            post?.status !== POST_STATUS.EXPIRED.VALUE
        );
    }, [post]);
    const { data: regionsData } = useFetchRegions(() => {});
    const location = useMemo(() => {
        if (hasFullLocation) {
            const result = handleGetRegion(
                regionsData?.regions,
                post?.location?.city as string,
                post?.location?.district as string
            );
            return result?.district + ", " + result?.city;
        }
        return "";
    }, [regionsData, hasFullLocation]);

    const handleChangeVisibility = (isVisibility: boolean) => {
        requestChangePostVisibility(post?._id as string, isVisibility)
            .then(() => {
                reFetchMyPosts();
                getNotification(
                    "success",
                    `${isVisibility ? "Hiện" : "Ẩn"} bài đăng thành công`
                );
            })
            .catch((err) => {
                getNotification(
                    "error",
                    err?.response?.data?.message || SERVER_ERROR_MESSAGE
                );
            });
    };

    return (
        <Flex justify={"space-between"} className={"rounded-lg p-4 shadow-md"}>
            {contextHolder}
            <Flex gap={30}>
                <Image
                    src={post?.product?.images?.[0]}
                    alt={post?.title || "Sản phẩm của tôi"}
                    width={150}
                    height={150}
                    className={"rounded-lg"}
                />
                <Flex vertical>
                    <div className={"font-medium text-[17px]"}>
                        {post?.title}
                    </div>
                    {post?.product?.price ? (
                        <div className={"font-medium text-[20px] text-[#f80]"}>
                            {handleFormatCurrency(post?.product?.price)}
                        </div>
                    ) : (
                        <Tag
                            className={"w-fit text-[14px] mb-1.5 mt-1.5"}
                            color={"cyan"}
                        >
                            Đồ cho tặng
                        </Tag>
                    )}
                    <div className={"font-normal"}>
                        {hasFullLocation ? (
                            location
                        ) : (
                            <span className={"text-gray-50"}>
                                Chưa cập nhật địa chỉ
                            </span>
                        )}
                    </div>
                    <div className={"text-gray-500 mt-1"}>
                        Ngày đăng tin:{" "}
                        <span className={"text-black"}>
                            {moment(post?.createdAt).format("DD-MM-YYYY")}
                        </span>
                    </div>
                    <div className={"text-gray-500"}>
                        Ngày hết hạn:{" "}
                        <span className={"text-black"}>
                            {moment(post?.createdAt).format("DD-MM-YYYY")}
                        </span>
                    </div>
                </Flex>
            </Flex>
            <Flex gap={10} align={"end"}>
                {!isEditable ? (
                    <>
                        {post?.status === POST_STATUS.HIDDEN.VALUE ? (
                            <Button
                                size={"large"}
                                reverseColor
                                onClick={() => handleChangeVisibility(true)}
                            >
                                <UnlockOutlined />
                                Hiện bài đăng
                            </Button>
                        ) : (
                            ""
                        )}
                    </>
                ) : (
                    <Link href={`/post/${post?._id}`}>
                        <Button size={"large"} reverseColor>
                            <EditOutlined />
                            Sửa bài đăng
                        </Button>
                    </Link>
                )}
                <Popover
                    content={
                        <Flex vertical>
                            <Button
                                reverseColor
                                size={"large"}
                                className={
                                    "border-none w-full h-full rounded-none !h-[45px]"
                                }
                                onClick={handleCopyUrl}
                            >
                                <ShareAltOutlined />
                                Sao chép đường dẫn
                            </Button>
                            {post?.status === POST_STATUS.APPROVED.VALUE ? (
                                <Button
                                    reverseColor
                                    size={"large"}
                                    className={
                                        "border-none w-full h-full rounded-none !h-[45px]"
                                    }
                                    onClick={() =>
                                        handleChangeVisibility(false)
                                    }
                                >
                                    <LockOutlined />
                                    Ẩn bài đăng
                                </Button>
                            ) : (
                                ""
                            )}
                        </Flex>
                    }
                >
                    <Button size={"large"} className={"w-fit"} reverseColor>
                        <EllipsisOutlined />
                    </Button>
                </Popover>
            </Flex>
        </Flex>
    );
}
