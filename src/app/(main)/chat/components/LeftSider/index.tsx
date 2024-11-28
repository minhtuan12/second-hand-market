import React from "react";
import {Conversation, UserProfile} from "../../../../../../utils/types";

interface IProps {
    user: UserProfile,
    conversations: Conversation[],
    chosenConversation: Conversation | null,
    handleChosenConversation: (conversation: Conversation) => void
}

export default function LeftSider(
    {
        user,
        conversations,
        chosenConversation,
        handleChosenConversation
    }: IProps) {
    const userFullName = user?.firstname + ' ' + user?.lastname

    return (
        <div className="flex flex-col w-1/4 bg-white p-4 border-r border-gray-300 w-1/4 h-full">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                    <img
                        src={user?.avatar}
                        alt={userFullName}
                        className="w-10 h-10 rounded-full mr-3"
                    />
                    <span className="font-semibold">{userFullName}</span>
                </div>
            </div>
            <input
                type="text"
                placeholder="Tìm kiếm..."
                className="w-full bg-gray-200 text-gray-800 rounded-full py-2 px-4 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div
                className="overflow-hidden hover:overflow-auto h-full scrollbar-thin flex flex-col space-y-4"
                style={{scrollbarGutter: 'stable'}}
            >
                {conversations?.map((conversation: Conversation) => (
                    <div
                        key={conversation?._id}
                        className={`flex p-2 rounded-lg transition-colors duration-200 cursor-pointer ${chosenConversation?.participant?._id === conversation?.participant?._id
                            ? "bg-[#fff4df] border-l-4 border-[#f80]"
                            : "bg-gray-100"
                        }`}
                        onClick={() => handleChosenConversation(conversation)}
                    >
                        <img
                            src={conversation?.participant?.avatar}
                            alt={conversation?.participant?.firstname + " " + conversation?.participant?.lastname}
                            className="w-12 h-12 rounded-full mr-3"
                        />
                        <div>
                            <h3 className="font-semibold">{conversation?.participant?.firstname + " " + conversation?.participant?.lastname}</h3>
                            {/*<p className="text-sm text-gray-500">{conversation?.lastestMessage}</p>*/}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
