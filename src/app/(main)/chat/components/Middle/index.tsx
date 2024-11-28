import React, {useEffect, useMemo, useState} from "react";
import {Conversation, UserProfile} from "../../../../../../utils/types";
import moment from "moment";
import {PaperClipOutlined, SendOutlined, SmileOutlined} from "@ant-design/icons";
import {Flex} from "antd";

interface IProps {
    user: UserProfile,
    chosenConversation: Conversation | null,
    socket: any
}

interface Message {
    senderId: string,
    content: string,
    createdAt?: string,
    updatedAt?: string,
    is_deleted?: boolean,
}

export default function Middle(
    {
        user,
        chosenConversation,
        socket
    }: IProps) {
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputMessage, setInputMessage] = useState("");
    const fullName = useMemo(() => {
        return chosenConversation?.participant?.firstname + " " + chosenConversation?.participant?.lastname
    }, [chosenConversation?.participant])

    // Handle sending a message
    const handleSendMessage = () => {
        if (inputMessage && chosenConversation) {
            const newMessage: Message = {
                senderId: user?._id,
                content: inputMessage
            }
            setInputMessage("");
            setMessages([...messages, newMessage]);

            socket.emit('sendMessage', {
                senderUserId: user?._id,
                recipientUserId: chosenConversation?.participant?._id,
                conversationId: chosenConversation?._id,
                message: inputMessage,
            });
        }
    }

    const handleInputChange = (e: any) => {
        setInputMessage(e.target.value);
    };

    useEffect(() => {
        if (chosenConversation?._id) {
            socket.emit('getMessages', {conversationId: chosenConversation?._id}, (res: any) => {
                setMessages(res);
            });

            socket.on('err', (error: any) => {
                setMessages([]);
                setInputMessage("");
                console.error('Error fetching conversations:', error);
            });
        }
    }, [chosenConversation]);

    useEffect(() => {
        socket.on('receiveMessage', (data: any) => {
            setMessages([...messages, {senderId: data.senderId, content: data.message}]);
        });
    }, [])

    return (
        chosenConversation ?
            <div className="flex-1 flex flex-col w-1/2 h-full">
                <div className="bg-white p-4 flex items-center justify-between border-b border-gray-300">
                    <div className="flex items-center">
                        <img
                            src={chosenConversation?.participant?.avatar}
                            alt={fullName || ''}
                            className="w-10 h-10 rounded-full mr-3"
                        />
                        <div>
                            <h2 className="font-semibold">{fullName}</h2>
                            <p className="text-sm text-gray-500">
                                {chosenConversation?.participant?.follower_ids?.length} người theo dõi
                            </p>
                        </div>
                    </div>
                </div>
                <div className="scrollable-content flex-1 p-4 space-y-4 bg-gray-50">
                    {messages.map((message: Message, index: number) => (
                        <div
                            key={index}
                            className={`flex ${message?.senderId?.toString() === user?._id?.toString() ? "justify-end" : "justify-start"}`}
                        >
                            <div
                                className={`max-w-xs lg:max-w-md xl:max-w-lg ${message?.senderId === user?._id ? "bg-blue-100" : "bg-gray-200"} rounded-lg p-3 shadow-md`}
                            >
                                <p>{message.content}</p>
                                <p className="text-xs text-gray-500 mt-1">{moment(message.createdAt).format('HH:mm')}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="bg-white p-4 border-t border-gray-300">
                    <div className="flex items-center bg-gray-200 rounded-full">
                        <button className="p-2 rounded-full hover:bg-gray-300 transition-colors duration-200">
                            <PaperClipOutlined className="w-5 h-5 text-gray-600"/>
                        </button>
                        <input
                            type="text"
                            value={inputMessage}
                            onChange={handleInputChange}
                            placeholder="Nhập tin nhắn..."
                            className="flex-1 bg-transparent py-2 px-4 focus:outline-none"
                        />
                        <button className="p-2 rounded-full hover:bg-gray-300 transition-colors duration-200">
                            <SmileOutlined className="w-5 h-5 text-gray-600"/>
                        </button>
                        <button
                            className="flex items-center justify-center p-2 rounded-full bg-[#ffa652] text-white hover:bg-[#ff8d21] transition-colors duration-200 ml-2"
                            onClick={handleSendMessage}
                        >
                            <SendOutlined className="flex items-center justify-center w-5 h-5"/>
                        </button>
                    </div>
                </div>
            </div>
            : <Flex justify={'center'} align={'center'} className="w-1/2 h-full">Bạn không có cuộc trò chuyện nào</Flex>
    );
}
