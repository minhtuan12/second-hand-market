'use client'

import {EditOutlined, HeartOutlined, MessageOutlined} from "@ant-design/icons";
import Button from "@/components/Button";
import React from "react";
import Link from "next/link";
import {setLocalStorageItem} from "../../../../../../utils/helper";
import {LOCALSTORAGE_DEFAULT_CHAT_USER} from "../../../../../../utils/constants";
import {requestCreateConversation} from "@/api/chat";
import {Flex} from "antd";
import {useAuthUser} from "@/hooks/useAuthUser";
import {UserProfile} from "../../../../../../utils/types";

export default function PostAction({posterId, postId}: { posterId: string, postId: string }) {
    const {authUser: user} = useAuthUser() as { authUser: UserProfile };

    if (!user) {
        return null
    }

    return <>
        {
            user?._id === posterId ? <Link href={`/post/${postId}`}>
                <Button size={'large'} className={'w-[200px]'}>
                    <EditOutlined/>
                    Sửa bài viết
                </Button>
            </Link> : <Flex gap={20}>
                <Button size={'large'} className={'w-[200px]'} reverseColor>
                    <HeartOutlined/>
                    {user?.wishlist?.includes(postId) ? 'Bỏ yêu thích' : 'Yêu thích'}
                </Button>
                <Link href={'/#'} onClick={() => {
                    setLocalStorageItem(LOCALSTORAGE_DEFAULT_CHAT_USER, posterId)
                    requestCreateConversation(posterId, postId)
                }}>
                    <Button size={'large'} className={'w-[200px]'}>
                        <MessageOutlined/>
                        Nhắn tin
                    </Button>
                </Link>
            </Flex>
        }
    </>
}
