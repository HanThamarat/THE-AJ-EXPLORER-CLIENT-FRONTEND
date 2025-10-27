'use client';

import { useTranslations } from 'next-intl'; // useTranslations works in client components
import { useEffect } from 'react';
import { io } from 'socket.io-client';
import { v4 as uuidv4 } from 'uuid';

export default function ClientSocketHandler() {
  useEffect(() => {
    let userId = localStorage.getItem("userId");
    if (!userId) {
      userId = uuidv4();
      localStorage.setItem("userId", userId);
    }

    const socket = io(process.env.NEXT_PUBLIC_WEB_SOCKET as string);

    socket.on("connect", () => {
      console.log("Socket connected");
      socket.emit("register", { userId });
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return null;
}