import { Flex, Image, Modal, Tag, Timeline } from "antd";
import { Order, Post } from "../../../../../../utils/types";
import { ORDER_STATUS } from "../../../../../../utils/constants";
import {
    handleFormatCurrency,
    handleGetLabelFromValue,
} from "../../../../../../utils/helper";
import { TagOutlined } from "@ant-design/icons";
import { useMemo } from "react";
import moment from "moment";

export default function DetailModal({
    openModal,
    setOpenDetailModal,
    order,
    type,
}: {
    openModal: boolean;
    setOpenDetailModal: (isOpen: boolean) => void;
    order: Order;
    type: string;
}) {
    console.log(order);

    const orderStatus = handleGetLabelFromValue(ORDER_STATUS, order.status);
    const formatTime = (time: string) => {
        return moment(time).format("HH:mm DD-MM-YYYY");
    };
    const timelineItems = useMemo(() => {
        return order?.status !== ORDER_STATUS.CANCELLED.VALUE
            ? [
                  {
                      color: "blue",
                      children: (
                          <Flex vertical>
                              <div className="text-[16px] font-medium">
                                  {ORDER_STATUS.WAITING_FOR_PAYMENT.LABEL}
                              </div>
                              <div className="text-[14px]">
                                  {order?.stripe_payment_intent_id
                                      ? `Đã thanh toán ${
                                            order?.status ===
                                                ORDER_STATUS.PROCESSING.VALUE ||
                                            order?.status ===
                                                ORDER_STATUS.DERLIVERING.VALUE
                                                ? `lúc ${formatTime(
                                                      order?.updatedAt
                                                  )}`
                                                : ""
                                        }`
                                      : ""}
                              </div>
                          </Flex>
                      ),
                  },
                  {
                      color:
                          order?.status === ORDER_STATUS.PROCESSING.VALUE ||
                          order?.status === ORDER_STATUS.DERLIVERING.VALUE ||
                          order?.status === ORDER_STATUS.DELIVERED.VALUE ||
                          order?.status === ORDER_STATUS.RECEIVED.VALUE
                              ? "blue"
                              : "gray",
                      children: (
                          <div className="text-[16px] font-medium">
                              {ORDER_STATUS.PROCESSING.LABEL}
                          </div>
                      ),
                  },
                  {
                      color:
                          order?.status === ORDER_STATUS.DERLIVERING.VALUE ||
                          order?.status === ORDER_STATUS.DELIVERED.VALUE ||
                          order?.status === ORDER_STATUS.RECEIVED.VALUE
                              ? "blue"
                              : "gray",
                      children: (
                          <div className="text-[16px] font-medium">
                              {ORDER_STATUS.DERLIVERING.LABEL}
                          </div>
                      ),
                  },
                  {
                      color:
                          order?.status === ORDER_STATUS.DELIVERED.VALUE ||
                          order?.status === ORDER_STATUS.RECEIVED.VALUE
                              ? "blue"
                              : "gray",
                      children: (
                          <Flex className="text-[16px]" vertical>
                              <div className="font-medium">
                                  {ORDER_STATUS.DELIVERED.LABEL}
                              </div>
                              <div className="text-[14px]">
                                  {order?.status ===
                                  ORDER_STATUS.DELIVERED.VALUE
                                      ? `Đã vận chuyển đến nơi lúc ${formatTime(
                                            order?.updatedAt
                                        )}`
                                      : ""}
                              </div>
                          </Flex>
                      ),
                  },
                  {
                      color:
                          order?.status === ORDER_STATUS.RECEIVED.VALUE
                              ? "blue"
                              : "gray",
                      children: (
                          <Flex className="text-[16px]" vertical>
                              <div className="font-medium">
                                  {ORDER_STATUS.RECEIVED.LABEL}
                              </div>
                              <div className="text-[14px]">
                                  {order?.status === ORDER_STATUS.RECEIVED.VALUE
                                      ? `Đã nhận hàng lúc ${formatTime(
                                            order?.updatedAt
                                        )}`
                                      : ""}
                              </div>
                          </Flex>
                      ),
                  },
              ]
            : [
                  {
                      color: "blue",
                      children: ORDER_STATUS.WAITING_FOR_PAYMENT.LABEL,
                  },
                  {
                      color: "red",
                      children: (
                          <Flex className="text-[16px] font-medium" vertical>
                              {ORDER_STATUS.CANCELLED.LABEL}
                              <div className="text-[14px] font-medium">
                                  Đã hủy đơn hàng lúc{" "}
                                  {formatTime(order?.updatedAt)} bởi{" "}
                                  {order?.cancelled_user_id ===
                                  order?.customer_id
                                      ? "người mua"
                                      : "bạn"}
                              </div>
                          </Flex>
                      ),
                  },
              ];
    }, [order?.status]);

    return (
        <Modal
            open={openModal}
            onCancel={() => setOpenDetailModal(false)}
            onClose={() => setOpenDetailModal(false)}
            footer={""}
            title={
                <div className="text-[20px]">
                    Chi tiết đơn hàng ({order?.code})
                </div>
            }
            width={630}
        >
            {type === "buying" ? (
                <Timeline className="mt-8" items={timelineItems} />
            ) : (
                <Flex vertical gap={30}>
                    <Flex
                        className="w-full"
                        align="center"
                        justify="space-between"
                    >
                        <Flex vertical gap={10}>
                            <Flex vertical>
                                <div className="text-[18px] font-semibold">
                                    Thông tin sản phẩm
                                </div>
                                <Flex vertical>
                                    <Flex className="text-[16px]" gap={8}>
                                        <TagOutlined className="text-[13px]" />
                                        {order?.post?.title}
                                    </Flex>
                                    <Flex className="text-[16px]" gap={8}>
                                        <TagOutlined className="text-[13px]" />
                                        {order?.product?.description}
                                    </Flex>
                                </Flex>
                            </Flex>
                            <Flex vertical>
                                <div className="text-[18px] font-semibold">
                                    Thông tin khách hàng
                                </div>
                                <Flex vertical>
                                    <Flex className="text-[16px]" gap={8}>
                                        <TagOutlined className="text-[13px]" />
                                        {order?.customer_name}
                                    </Flex>
                                    <Flex className="text-[16px]" gap={8}>
                                        <TagOutlined className="text-[13px]" />
                                        {order?.customer_phone}
                                    </Flex>
                                    <Flex className="text-[16px]" gap={8}>
                                        <TagOutlined className="text-[13px]" />
                                        {order?.customer_address}
                                    </Flex>
                                </Flex>
                            </Flex>
                        </Flex>
                        <Image src={order?.product?.images?.[0]} width={100} />
                    </Flex>
                    <Flex justify="space-between">
                        <Tag
                            color={orderStatus.color}
                            className="text-[15px] flex items-center justify-center font-medium"
                        >
                            {orderStatus.label}
                        </Tag>
                        <Flex className="text-[20px] text-[#f80] font-medium">
                            Tổng tiền:{" "}
                            {handleFormatCurrency(order?.total as number)}
                        </Flex>
                    </Flex>
                </Flex>
            )}
        </Modal>
    );
}
