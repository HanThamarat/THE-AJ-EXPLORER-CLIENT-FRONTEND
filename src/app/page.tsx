"use client";
import { io } from "socket.io-client";
import { v4 as uuidv4 } from "uuid";
import { useEffect } from "react";

export default function Home() {
  
  useEffect(() => {
    let userId = localStorage.getItem("userId");
    if (!userId) {
      userId = uuidv4();
      localStorage.setItem("userId", userId);
    }

    const socket = io(process.env.NEXT_PUBLIC_API_URL);

    socket.on("connect", () => {
      socket.emit("register", { userId });
    });

    return () => {
      socket.disconnect();
    }
  }, []);

  return (
   <>
      <h1>Client Site</h1>
   </>
  );
}
