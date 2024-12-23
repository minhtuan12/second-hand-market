"use client";

import { useAuthUser } from "@/hooks/useAuthUser";
import React, {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";
import { io, Socket } from "socket.io-client";

interface SocketContextType {
    socket: Socket | null;
}

const SocketContext = createContext<SocketContextType | undefined>(undefined);

interface SocketProviderProps {
    children: React.ReactNode;
}

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
    const [socket, setSocket] = useState<any>(null);
    const { authUser } = useAuthUser();

    useEffect(() => {
        setSocket(
            io(process.env.API_URL, {
                query: { user_id: authUser?._id },
                transports: ["websocket"],
            })
        );

        return () => {
            socket?.disconnect();
        };
    }, [authUser?._id]);

    return (
        <SocketContext.Provider value={{ socket: socket }}>
            {children}
        </SocketContext.Provider>
    );
};

export const useSocket = (): any => {
    const context = useContext(SocketContext);
    if (!context) {
        throw new Error("useSocket must be used within a SocketProvider");
    }
    const socket = useMemo(() => {
        return context.socket;
    }, [context]);

    return socket;
};
