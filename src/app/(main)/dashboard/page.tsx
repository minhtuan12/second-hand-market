"use client";

import React, { useEffect, useState } from "react";
import { ChartData } from "chart.js";
import { Bar, Doughnut, Pie } from "react-chartjs-2";
import { Select, Row, Col, Typography, Card } from "antd";
import { requestRevenue, requestExpenses, requestRatings, requestOrdersStatus } from "@/api/dashboard";
import "chart.js/auto";
import BreadcrumbUpdater from "@/components/BreadcrumbUpdater";
import { handleGetLabelFromValue } from "../../../../utils/helper";
import { ORDER_STATUS } from "../../../../utils/constants";

const { Title, Text } = Typography;

const Dashboard = () => {
    const breadcrumbData = [
        {
            path: "/",
            name: "Trang chủ",
        },
        {
            name: "Thống kê",
        },
    ];

    const [revenueData, setRevenueData] = useState<ChartData<"bar">>({
        labels: [],
        datasets: [],
    });

    const [expensesData, setExpensesData] = useState<ChartData<"bar">>({
        labels: [],
        datasets: [],
    });

    const [ratingsData, setRatingsData] = useState<ChartData<"doughnut">>({
        labels: [],
        datasets: [],
    });

    const [ordersStatusData, setOrdersStatusData] = useState<ChartData<"pie">>({
        labels: [],
        datasets: [],
    });

    const [groupBy, setGroupBy] = useState("month");


    const fetchRevenueData = async () => {
        try {
            const response = await requestRevenue(groupBy);
            const labels = response?.data?.map((item: any) => item?._id);
            const data = response?.data?.map((item: any) => item?.totalRevenue);

            setRevenueData({
                labels,
                datasets: [
                    {
                        label: "Thu nhập (VND)",
                        data,
                        backgroundColor: "rgba(75, 192, 192, 0.6)",
                        borderColor: "rgba(75, 192, 192, 1)",
                        borderWidth: 1,
                    },
                ],
            });
        } catch (err) {
        }
    };

    const fetchExpensesData = async () => {
        try {
            const response = await requestExpenses(groupBy);
            const labels = response?.data?.map((item: any) => item?._id);
            const data = response?.data?.map((item: any) => item?.totalExpenses);

            setExpensesData({
                labels,
                datasets: [
                    {
                        label: "Chi tiêu (VND)",
                        data,
                        backgroundColor: "rgba(255, 159, 64, 0.6)",
                        borderColor: "rgba(255, 159, 64, 1)",
                        borderWidth: 1,
                    },
                ],
            });
        } catch (err) {

        }
    };

    const fetchRatingsData = async () => {
        try {
            const response = await requestRatings();
            const { averageStars, totalRatings } = response?.data[0];

            setRatingsData({
                labels: ["Trung bình", "Tổng lượt đánh giá"],
                datasets: [
                    {
                        label: "Đánh giá",
                        data: [averageStars, totalRatings],
                        backgroundColor: ["rgba(54, 162, 235, 0.6)", "rgba(255, 99, 132, 0.6)"],
                    },
                ],
            });
        } catch (err) {
        }
    };

    const fetchOrdersStatusData = async () => {
        try {
            const response = await requestOrdersStatus();
            const labels = response?.data?.map((item: any) => {
                const status = handleGetLabelFromValue(ORDER_STATUS,item?._id).label;
                return status;
            });
            const data = response?.data?.map((item: any) => item?.count);

            setOrdersStatusData({
                labels,
                datasets: [
                    {
                        label: "Số lượng đơn hàng",
                        data,
                        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
                    },
                ],
            });
        } catch (err) {
        }
    };

    useEffect(() => {
        fetchRevenueData();
        fetchExpensesData();
        fetchRatingsData();
        fetchOrdersStatusData();
    }, [groupBy]);

    return (
        <div style={{ padding: "20px" }}>
            <BreadcrumbUpdater
                className={"mb-5"}
                breadcrumbData={breadcrumbData}
                title={"Thống kê"}
            />
            <Row gutter={[16, 16]} style={{ marginBottom: "20px" }}>
                <Col>
                    <Text strong>Thống kê theo:</Text>
                </Col>
                <Col>
                    <Select
                        value={groupBy}
                        onChange={(value) => setGroupBy(value)}
                        style={{ width: 200 }}
                    >
                        <Select.Option value="week">Hàng tuần</Select.Option>
                        <Select.Option value="month">Hàng tháng</Select.Option>
                        <Select.Option value="year">Hàng năm</Select.Option>
                    </Select>
                </Col>
            </Row>
            <Row gutter={[16, 16]}>
                <Col xs={24} sm={12} lg={12}>
                    <Card
                        title="Thu nhập"
                        hoverable
                        style={{ borderRadius: "10px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}
                    >
                        <Bar data={revenueData} />
                    </Card>
                </Col>
                <Col xs={24} sm={12} lg={12}>
                    <Card
                        title="Chi tiêu"
                        hoverable
                        style={{ borderRadius: "10px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}
                    >
                        <Bar data={expensesData} />
                    </Card>
                </Col>
                <Col xs={24} sm={12} lg={12}>
                    <Card
                        title="Đánh giá"
                        hoverable
                        style={{ borderRadius: "10px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}
                    >
                        <Doughnut data={ratingsData} />
                    </Card>
                </Col>
                <Col xs={24} sm={12} lg={12}>
                    <Card
                        title="Trạng thái đơn hàng"
                        hoverable
                        style={{ borderRadius: "10px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}
                    >
                        <Pie data={ordersStatusData} />
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default Dashboard;
