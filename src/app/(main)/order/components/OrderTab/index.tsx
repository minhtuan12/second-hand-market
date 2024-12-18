"use client";

import { useEffect, useState } from "react";
import {
    getNotification,
    handleFormatCurrency,
    handleGetLabelFromValue,
} from "../../../../../../utils/helper";
import {
    Button,
    Empty,
    Flex,
    Image,
    Select,
    Spin,
    Table,
    Tag,
    Tooltip,
} from "antd";
import {
    requestChangeOrderStatus,
    requestPayOrder,
    useFetchOrders,
} from "./api";
import { Order, Post } from "../../../../../../utils/types";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/configureStore";
import Link from "next/link";
import {
    CloseCircleOutlined,
    CloseOutlined,
    CreditCardOutlined,
    EyeOutlined,
} from "@ant-design/icons";
import {
    ORDER_STATUS,
    ORDER_STATUS_CHANGABLE,
    SERVER_ERROR_MESSAGE,
} from "../../../../../../utils/constants";
import { setFilter } from "@/store/slices/order";
import DetailModal from "../DetailModal";

const Center = ({ children }: { children: React.ReactNode }) => (
    <Flex
        className={"w-full h-[calc(100vh_-_400px)]"}
        align={"center"}
        justify={"center"}
    >
        {children}
    </Flex>
);

const options = Object.values(ORDER_STATUS_CHANGABLE).map((item) => ({
    label: item.LABEL,
    value: item.VALUE,
}));

export default function OrderTab({ type }: { type: string }) {
    const { filter } = useSelector((state: RootState) => state.order);
    const onErrorFetchPosts = () => {
        getNotification(
            "error",
            "Đã xảy ra lỗi khi lấy thông tin các đơn hàng"
        );
    };
    const dispatch = useDispatch();

    const {
        data: ordersData,
        isLoading: loadingGetOrders,
        mutate: getOrders,
    } = useFetchOrders(type, filter, onErrorFetchPosts);

    const [loadingUpdateStatus, setLoadingUpdateStatus] =
        useState<boolean>(false);
    const handleChangeOrderStatus = (orderId: string, status: string) => {
        setLoadingUpdateStatus(true);
        requestChangeOrderStatus(orderId, status)
            .then(() => {
                getOrders();
                getNotification(
                    "success",
                    status === ORDER_STATUS.CANCELLED.VALUE
                        ? "Đã hủy đơn hàng"
                        : "Cập nhật trạng thái thành công"
                );
            })
            .catch((err) => {
                getNotification(
                    "error",
                    err?.response?.data || SERVER_ERROR_MESSAGE
                );
            })
            .finally(() => {
                setLoadingUpdateStatus(false);
            });
    };

    const [isOpenDetailModal, setIsOpenDetailModal] = useState<boolean>(false);
    const [orderDetail, setOrderDetail] = useState<Order | null>(null);

    const columns = [
        {
            title: "Mã đơn hàng",
            dataIndex: "code",
            width: 200,
            render: (text: string) => (
                <div className={"font-semibold"}>{text}</div>
            ),
        },
        {
            title: "Khách hàng",
            dataIndex: "customer_name",
            width: 180,
            render: (text: string, record: any) => (
                <Link
                    target="_blank"
                    href={`/profile/${record?.customer_id}`}
                    className={"font-semibold"}
                >
                    {text}
                </Link>
            ),
        },
        {
            title: "Số điện thoại",
            dataIndex: "customer_phone",
            align: "center",
            width: 120,
            render: (text: string) => {
                return <Link href={`tel:${text}`}>{text}</Link>;
            },
        },
        {
            title: "Địa chỉ",
            dataIndex: "customer_address",
            width: 200,
            render: (text: string) => <div>{text}</div>,
        },
        {
            title: "Tổng tiền",
            dataIndex: "total",
            align: "right",
            width: 130,
            render: (text: number) => (
                <div className="font-medium text-[#f80] text-[15px]">
                    {handleFormatCurrency(text)}
                </div>
            ),
        },
        {
            title: "Tài khoản nhận tiền",
            dataIndex: "receiver_stripe_account_id",
            align: "center",
            render: (text: string) => <div>{text}</div>,
        },
        {
            title: "Trạng thái",
            dataIndex: "status",
            width: 200,
            align: "center",
            render: (text: string, record: any) => {
                const item = handleGetLabelFromValue(ORDER_STATUS, text);
                return (
                    <>
                        {text === ORDER_STATUS.DELIVERED.VALUE ||
                        text === ORDER_STATUS.DERLIVERING.VALUE ||
                        text === ORDER_STATUS.PROCESSING.VALUE ? (
                            <Select
                                loading={loadingUpdateStatus}
                                rootClassName="w-full"
                                onChange={(value) =>
                                    handleChangeOrderStatus(record?._id, value)
                                }
                                value={record?.status}
                                options={options}
                            />
                        ) : (
                            <Tag color={item.color}>{item.label}</Tag>
                        )}
                    </>
                );
            },
        },
        {
            title: "",
            align: "center",
            width: 140,
            render: (text: string, record: any) => (
                <Flex gap={15} align="center" justify="center">
                    <Tooltip title="Chi tiết đơn hàng">
                        <EyeOutlined
                            onClick={() => {
                                setIsOpenDetailModal(true);
                                setOrderDetail(record);
                            }}
                            style={{ fontSize: "20px", cursor: "pointer" }}
                            className="hover:text-[#f80]"
                        />
                    </Tooltip>
                    {record?.status ===
                    ORDER_STATUS.WAITING_FOR_PAYMENT.VALUE ? (
                        <Tooltip title="Hủy đơn hàng">
                            {loadingUpdateStatus ? (
                                <Flex
                                    className="w-fit h-full"
                                    align="center"
                                    justify="center"
                                >
                                    <Spin size="small" />
                                </Flex>
                            ) : (
                                <CloseOutlined
                                    onClick={() =>
                                        handleChangeOrderStatus(
                                            record?._id,
                                            ORDER_STATUS.CANCELLED.VALUE
                                        )
                                    }
                                    style={{
                                        fontSize: "18px",
                                        cursor: "pointer",
                                    }}
                                    className="!text-[red]"
                                />
                            )}
                        </Tooltip>
                    ) : (
                        ""
                    )}
                </Flex>
            ),
        },
    ];

    if (loadingGetOrders) {
        return (
            <Center>
                <Spin size={"default"} />
            </Center>
        );
    }

    if (ordersData?.orders?.length === 0) {
        return (
            <Center>
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            </Center>
        );
    }

    return (
        <div className={"h-[calc(100vh_-_400px)] scrollbar-thin"}>
            {type === "selling" ? (
                <Table
                    columns={columns as any}
                    dataSource={ordersData?.orders}
                    loading={loadingGetOrders}
                    className={"order-table custom-table"}
                    pagination={{
                        total: ordersData?.total,
                        pageSize: 10,
                        current: filter.page,
                        onChange(page, pageSize) {
                            dispatch(setFilter({ ...filter, page }));
                        },
                    }}
                />
            ) : (
                <Flex
                    vertical
                    className="h-full overflow-auto scrollbar-thin px-3 py-2"
                    gap={30}
                >
                    {ordersData?.orders?.map((order: Order) => {
                        const orderStatus = handleGetLabelFromValue(
                            ORDER_STATUS,
                            order?.status
                        );
                        return (
                            <Flex
                                key={order?._id}
                                className="rounded-lg shadow-[rgba(0,_0,_0,_0.16)_0px_1px_4px] p-4"
                                align="center"
                                justify="space-between"
                            >
                                <Flex gap={25}>
                                    <Image
                                        src={order?.product?.images?.[0]}
                                        width={100}
                                    />
                                    <Flex vertical>
                                        <div className="font-medium text-[18px]">
                                            Mã đơn hàng: {order?.code}
                                        </div>
                                        <div className="text-[16px]">
                                            {order?.post?.title}
                                        </div>
                                        <div className="text-[16px]">
                                            {order?.product?.description}
                                        </div>
                                        <div className="text-[18px] text-[#f80] font-medium">
                                            {handleFormatCurrency(
                                                order?.total as number
                                            )}
                                        </div>
                                        <Tag
                                            color={orderStatus.color}
                                            className="w-fit mt-1"
                                        >
                                            {orderStatus?.label}
                                        </Tag>
                                    </Flex>
                                </Flex>
                                <Flex
                                    gap={15}
                                    align="center"
                                    justify="center"
                                    className="mr-12"
                                >
                                    {order?.status ===
                                    ORDER_STATUS.WAITING_FOR_PAYMENT.VALUE ? (
                                        <Tooltip title="Thanh toán đơn hàng">
                                            <div
                                                onClick={() => {
                                                    requestPayOrder(order?._id)
                                                        .then((res) => {
                                                            window.location.href =
                                                                res?.data;
                                                        })
                                                        .catch((err) => {
                                                            getNotification(
                                                                "error",
                                                                err?.response?.data || SERVER_ERROR_MESSAGE
                                                            );
                                                        });
                                                }}
                                                className="cursor-pointer rounded-[50%] bg-[#a7d2fd] hover:bg-[#7eb9f4] w-fit h-fit flex items-center justify-center p-3"
                                            >
                                                <CreditCardOutlined
                                                    style={{
                                                        fontSize: "20px",
                                                    }}
                                                />
                                            </div>
                                        </Tooltip>
                                    ) : (
                                        ""
                                    )}
                                    <Tooltip title="Chi tiết đơn hàng">
                                        <div
                                            onClick={() => {
                                                setIsOpenDetailModal(true);
                                                setOrderDetail(order);
                                            }}
                                            className="cursor-pointer rounded-[50%] bg-[#ffb561] hover:bg-[#f80] w-fit h-fit flex items-center justify-center p-3"
                                        >
                                            <EyeOutlined
                                                style={{
                                                    fontSize: "20px",
                                                }}
                                            />
                                        </div>
                                    </Tooltip>
                                    {order?.status ===
                                    ORDER_STATUS.WAITING_FOR_PAYMENT.VALUE ? (
                                        <Tooltip title="Hủy đơn hàng">
                                            {loadingUpdateStatus ? (
                                                <Flex
                                                    className="w-fit h-full"
                                                    align="center"
                                                    justify="center"
                                                >
                                                    <Spin size="small" />
                                                </Flex>
                                            ) : (
                                                <div
                                                    onClick={() =>
                                                        handleChangeOrderStatus(
                                                            order?._id,
                                                            ORDER_STATUS
                                                                .CANCELLED.VALUE
                                                        )
                                                    }
                                                    className="cursor-pointer rounded-[50%] bg-[#ff5b5b] hover:bg-[red] w-fit h-fit flex items-center justify-center p-3"
                                                >
                                                    <CloseOutlined
                                                        style={{
                                                            fontSize: "18px",
                                                        }}
                                                    />
                                                </div>
                                            )}
                                        </Tooltip>
                                    ) : (
                                        ""
                                    )}
                                </Flex>
                            </Flex>
                        );
                    })}
                </Flex>
            )}
            {orderDetail && (
                <DetailModal
                    openModal={isOpenDetailModal}
                    setOpenDetailModal={setIsOpenDetailModal}
                    order={orderDetail}
                    type={type}
                />
            )}
        </div>
    );
}
