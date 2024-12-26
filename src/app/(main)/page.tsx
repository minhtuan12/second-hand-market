import React, { Suspense } from "react";
import PostItem from "@/app/(main)/components/PostItem";
import { Post } from "../../../utils/types";
import { Col, Empty, Flex, Row } from "antd";
import MoreLoadedPosts from "@/app/(main)/components/MoreLoadedPosts";
import { FilterOutlined } from "@ant-design/icons";
import FilterByRegions from "@/app/(main)/components/FilterByRegions";
import FilterBar from "@/app/(main)/components/FilterBar";
import Loading from "@/components/Loading";
import Head from "next/head";

let controller: AbortController | null = null;

async function fetchPosts(filter: any) {
    try {
        let url = `${process.env.API_URL}/public/posts?column=${
            filter?.column || "createdAt"
        }`;
        if (filter?.sortOrder) url += `&sort_order=${filter?.sortOrder}`;
        if (filter?.city) url += `&city=${filter?.city}`;
        if (filter?.searchKey) url += `&search_key=${filter?.searchKey}`;
        if (filter?.categoryIds) {
            if (typeof filter.categoryIds === "string")
                url += `&category_ids=${filter?.categoryIds}`;
            else {
                filter?.categoryIds?.forEach((id: string) => {
                    url += `&category_ids=${id}`;
                });
            }
        }
        if (filter?.priceFrom || filter?.priceFrom === "none")
            url += `&price_from=${filter?.priceFrom}`;
        if (filter?.priceTo || filter?.priceTo === "none")
            url += `&price_to=${filter?.priceTo}`;
        if (filter?.condition) {
            if (typeof filter.condition === "string")
                url += `&condition=${filter?.condition}`;
            else {
                filter?.condition?.forEach((id: string) => {
                    url += `&condition=${id}`;
                });
            }
        }

        const postsResponse = await fetch(url, { cache: "no-store" });
        if (!postsResponse?.ok) {
            return { posts: 0, total: 0 };
        }
        const data = await postsResponse.json();
        return {
            posts: data?.posts?.filter((item: Post) => !item.is_ordering),
            total: data?.total,
        };
    } catch (err) {
        return { posts: [], total: 0 };
    }
}

async function fetchCategories() {
    try {
        const categoriesResponse = await fetch(
            `${process.env.API_URL}/public/categories`,
            { cache: "no-store" }
        );
        if (!categoriesResponse?.ok) {
            return { categories: 0 };
        }
        return categoriesResponse.json();
    } catch (err) {
        return { categories: [] };
    }
}

async function fetchRegions() {
    try {
        const result = await fetch(`${process.env.API_URL}/location/regions`, {
            cache: "no-store",
        });
        if (!result?.ok) {
            return { regions: [] };
        }
        return result.json();
    } catch (err) {
        return { regions: [] };
    }
}

async function HomeSuspense({ searchParams }: { searchParams: any }) {
    const { posts, total } = await fetchPosts(searchParams);
    const { categories } = await fetchCategories();
    const { regions } = await fetchRegions();

    return (
        <>
            <Flex gap={50}>
                <Flex
                    vertical
                    gap={15}
                    className={
                        "rounded-lg bg-white h-[calc(100vh_-_140px)] w-[280px] p-5 fixed"
                    }
                >
                    <Flex
                        gap={8}
                        className={"font-semibold text-[18px] tracking-[0.7px]"}
                    >
                        <FilterOutlined />
                        Bộ lọc tìm kiếm
                    </Flex>
                    <FilterByRegions regions={regions} />
                    <FilterBar categories={categories} />
                </Flex>

                <div className={"ml-[320px] flex-1"}>
                    <div
                        className={
                            "font-semibold tracking-[0.6px] text-[20px] mt-1"
                        }
                    >
                        {posts?.length} kết quả
                    </div>
                    <Row gutter={[24, 24]}>
                        {!posts || posts?.length === 0 ? (
                            <div
                                className={
                                    "absolute top-1/2 left-1/2 translate-x-[60%] translate-y-[-100%]"
                                }
                            >
                                <Empty description="Chưa có bài đăng nào" />
                            </div>
                        ) : (
                            posts?.map((item: Post) => (
                                <Col
                                    key={item?._id}
                                    xl={6}
                                    lg={12}
                                    md={12}
                                    sm={24}
                                    xs={24}
                                >
                                    <PostItem
                                        key={item._id}
                                        post={item}
                                        regions={regions}
                                    />
                                </Col>
                            ))
                        )}
                    </Row>
                    <MoreLoadedPosts regions={regions} />
                </div>
            </Flex>
        </>
    );
}

export default async function Home({ searchParams }: { searchParams: any }) {
    return (
        <Suspense fallback={<Loading />}>
            <Head>
                <title>Chợ đồ cũ</title>
                <meta
                    name="description"
                    content="Chợ đồ cũ là nơi người dùng có thể đăng bán các sản phẩm cũ của trẻ em."
                />
                <meta
                    name="keywords"
                    content="Chợ đồ cũ, trẻ em, quần áo, đồ chơi, trang sức"
                />
                <meta name="robots" content="index, follow" />
                <link rel="canonical" href="https://chodocu.vercel.app" />
            </Head>
            <HomeSuspense searchParams={searchParams} />
        </Suspense>
    );
}
