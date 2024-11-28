import React from "react";
import '../../../global.scss'
import BreadcrumbUpdater from "@/components/BreadcrumbUpdater";
import {Avatar, Carousel, Flex, Rate, Tag} from "antd";
import {handleExportTimeAgo, handleFormatCurrency, handleGetRegion} from "../../../../../utils/helper";
import {ClockCircleOutlined, EnvironmentOutlined, MailOutlined, PhoneOutlined, UserOutlined} from "@ant-design/icons";
import {fetchRegions} from "@/actions/public";
import Link from "next/link";
import Image from "next/image";
import LikedPostHeart from "@/app/(main)/posts/components/LikedPostHeart";
import PostAction from "@/app/(main)/posts/components/PostAction";

async function fetchDetailPost(id: string) {
    try {
        const postResponse = await fetch(`${process.env.API_URL}/public/posts/${id}`, {cache: 'no-store'})
        if (!postResponse?.ok) {
            return {post: null}
        }
        return postResponse.json()
    } catch (err) {
        return {post: null}
    }
}

export default async function PostDetail({params}: { params: { id: string } }) {
    const id = params.id
    const {post} = await fetchDetailPost(id)
    const breadcrumbData = [
        {
            path: '/',
            name: 'Trang chủ'
        },
        {
            name: `Thông tin bài đăng`
        }
    ]
    const {regions} = await fetchRegions()
    const location = handleGetRegion(regions, post?.location?.city, post?.location?.district)
    const poster = post?.poster

    return <div className={'w-full pt-3'}>
        <BreadcrumbUpdater
            className={'mb-5'} breadcrumbData={breadcrumbData}
            title={`Bài đăng`}
        />
        <div className={`bg-[#fff] w-full h-auto rounded-[12px] pt-8`}>
            <Flex className={'w-full px-8 pb-8'} justify={'space-between'}>
                <Flex gap={30} className={'w-2/3'}>
                    <div
                        className={'relative min-w-[300px] max-w-[300px] h-[300px] custom-carousel border-[1px] border-[gray] p-2 rounded-lg'}>
                        <Carousel autoplay={true} arrows>
                            {
                                post?.product?.images?.map((image: string, index: number) => (
                                    <div key={index} className="relative w-full h-full">
                                        <Image
                                            key={index}
                                            src={image}
                                            alt={image}
                                            quality={90}
                                            width={0}
                                            height={0}
                                            sizes={'100vw'}
                                        />
                                    </div>
                                ))
                            }
                        </Carousel>
                        <LikedPostHeart postId={post?._id}/>
                    </div>
                    <Flex vertical justify={'space-between'} className={'flex-1'}>
                        <Flex vertical>
                            <div className={'font-semibold text-[22px]'}>{post?.title}</div>
                            <div className={'font-semibold text-[22px]'}>{post?.title}</div>
                            <div className={'font-semibold text-[22px]'}>{post?.title}</div>
                            <div className={'text-[18px]'}>{post?.product?.description}</div>
                            <div className={'mt-1'}>
                                {
                                    post?.product?.price ? <div className={'text-[24px] font-semibold text-[#f80]'}>
                                            {handleFormatCurrency(post?.product?.price)}
                                        </div> :
                                        <Tag
                                            className={'!text-[15px] !h-[30px] w-fit !p-3 !flex !items-center !justify-center'}
                                            color={'cyan'}
                                        >
                                            Đồ cho tặng
                                        </Tag>
                                }
                            </div>
                            <Flex vertical className={'mt-3'} gap={5}>
                                <Flex className={'text-[17px]'} gap={12}>
                                    <PhoneOutlined/>
                                    {
                                        poster?.phone ?
                                            <Link
                                                href={`tel:${poster?.phone}`}
                                                className={'hover:decoration-transparent text-[#f80]'}
                                            >
                                                {poster?.phone}
                                            </Link> :
                                            <i className={'text-gray-500'}>Chưa cập nhật</i>
                                    }
                                </Flex>
                                <Flex className={'text-[17px]'} gap={12}>
                                    <MailOutlined/>
                                    {
                                        poster?.email ?
                                            <Link
                                                href={`mailto:${poster?.email}`}
                                                className={'hover:decoration-transparent text-[#f80]'}
                                            >
                                                {poster?.email}
                                            </Link> :
                                            <i className={'text-gray-500'}>Chưa cập nhật</i>
                                    }
                                </Flex>
                                <Flex className={'text-[17px]'} gap={12}>
                                    <EnvironmentOutlined/> {location?.district + ', ' + location?.city}
                                </Flex>
                                <Flex className={'text-[17px]'} gap={12}>
                                    <ClockCircleOutlined/> Cập nhật {handleExportTimeAgo(post?.updatedAt)}
                                </Flex>
                            </Flex>
                        </Flex>
                        <PostAction posterId={post?.poster_id} postId={post?._id}/>
                    </Flex>
                </Flex>
                <Flex className={'border-[1px] border-[gray] rounded-lg p-4 flex-1 h-fit'} gap={15}>
                    <div className={'w-fit h-fit rounded-lg border-[1px] border-[#f80]'}>
                        {
                            poster?.avatar ? <Avatar
                                shape="square"
                                src={poster?.avatar} size={100}
                                alt={poster?.firstname + " " + poster?.lastname}
                            /> : <Avatar icon={<UserOutlined/>}/>
                        }
                    </div>
                    <Flex vertical justify={'space-between'}>
                        <div className={'font-semibold'}>{poster?.firstname + " " + poster?.lastname}</div>
                        <Flex vertical>
                            <div className={'font-medium text-[14px]'}>Người theo
                                dõi: {poster?.follower_ids?.length}</div>
                            <div className={'font-medium text-[14px]'}>Đang theo
                                dõi: {poster?.following_user_ids?.length}</div>
                        </Flex>
                        <Flex className={'font-medium text-[14px]'} gap={15} align={'center'}>
                            <Rate allowHalf value={poster?.averageStars || 0} disabled/>
                            ({poster?.reviewers?.length} đánh giá)
                        </Flex>
                    </Flex>
                </Flex>
            </Flex>
        </div>
    </div>
}
