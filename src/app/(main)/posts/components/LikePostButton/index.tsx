'use client'

import {HeartOutlined} from "@ant-design/icons";
import Button from "@/components/Button";
import React from "react";
import {useFetchProfile} from "@/api/profile";
import {handleLogout} from "@/actions/auth";

export default function LikePostButton({postId}: { postId: string }) {
    const {data: user} = useFetchProfile(() => handleLogout())

    return <Button size={'large'} className={'w-[200px]'} reverseColor>
        <HeartOutlined/>
        {user?.wishlist?.includes(postId) ? 'Bỏ yêu thích' : 'Yêu thích'}
    </Button>
}
