'use client'

import React, {useEffect, useState} from "react";
import socketService from "@/socket";
import {Conversation, UserProfile} from "../../../../utils/types";
import LeftSider from "@/app/(main)/chat/components/LeftSider";
import {useAuthUser} from "@/hooks/useAuthUser";
import Middle from "@/app/(main)/chat/components/Middle";
import RightSider from "@/app/(main)/chat/components/RightSider";

export default function Chat() {
    const [conversations, setConversations] = useState([]);
    const [chosenConversation, setChosenConversation] = useState<null | Conversation>(null);
    const [firstTime, setFirstTime] = useState(true);
    const {authUser: user} = useAuthUser()
    const [socket, setSocket] = useState(null)

    useEffect(() => {
        const newSocket = socketService.getSocket(user?._id as string)
        setSocket(newSocket)

        newSocket.on('getConversations', (res: any) => {
            setConversations(res);
        });

        newSocket.on('err', (error: any) => {
            console.error('Error fetching conversations:', error);
        });
    }, [user]);

    useEffect(() => {
        if (firstTime && conversations?.length > 0) {
            setFirstTime(false);
            setChosenConversation(conversations[0]);
        }
    }, [conversations]);

    const handleChosenConversation = (conversation: Conversation) => {
        setChosenConversation(conversation);
    };

    return <div className="flex h-[calc(100vh_-_130px)] bg-gray-100 text-gray-800">
        <LeftSider
            user={user as UserProfile}
            conversations={conversations}
            chosenConversation={chosenConversation}
            handleChosenConversation={handleChosenConversation}
        />

        <Middle
            user={user as UserProfile}
            chosenConversation={chosenConversation}
            socket={socket}
        />

        <RightSider user={user as UserProfile} chosenConversation={chosenConversation}/>
    </div>
}
