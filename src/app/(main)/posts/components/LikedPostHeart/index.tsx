"use client";

import React from "react";
import { HeartFilled } from "@ant-design/icons";
import { useFetchProfile } from "@/api/profile";
import { handleLogout } from "@/actions/auth";

export default function LikedPostHeart({ postId }: { postId: string }) {
    const { data: user } = useFetchProfile(() => handleLogout());

    return (
        <>
            {user?.wishlist?.includes(postId) ? (
                <div className={"absolute top-3 right-3"}>
                    <HeartFilled className={"text-[30px] !text-[red]"} />
                </div>
            ) : (
                ""
            )}
        </>
    );
}
