"use client";

// React
import { useEffect, useRef, useState } from "react";

// Next.js Image for optimized logo
import Image from "next/image";

// AI (server)
import { getChatResponse } from "@/ai/ai";

// Chat Config
import { chatFirstMessage, CONFIG } from "@/common/config";

// Shadcn UI Components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Markdown
import showdown from "showdown";

// Icons
import { AlertCircle, Send } from "lucide-react";

// Types
import { ChatItem } from "@/common/types";

// Default Chat Message
const defaultChats: ChatItem[] = [
  {
    message: chatFirstMessage,
    source: "bot",
  },
];

export default function Home() {
  // Refs
  const inputRef = useRef<HTMLInputElement | null>(null);
  const chatContainerRef = useRef<HTMLDivElement | null>(null);

  // States
  const [message, setMessage] = useState<string>("");
  const [chats, setChats] = useState<ChatItem[]>(defaultChats);

  // Auto-scroll to latest message
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }, [chats]);

  // Convert markdown to HTML
  const convertMarkdownToHTML = (text: string) => {
    const converter = new showdown.Converter({
      tables: true,
      emoji: true,
      ghCodeBlocks: true,
      openLinksInNewWindow: true,
      strikethrough: true,
      underline: true,
    });
    return converter.makeHtml(text);
  };

  // Handle chat send
  const handleChatSubmission = async () => {
    if (!message.trim()) return;

    const userChat: ChatItem = { message, source: "user" };
    const updatedChats = [...chats, userChat];
    setChats(updatedChats);

    if (inputRef.current) inputRef.current.value = "";
    setMessage("");

    const resp = await getChatResponse(updatedChats, message);
    
    const botChat: ChatItem = { message: resp, source: "bot" };
    setChats([...updatedChats, botChat]);
  };

  // Restart chat
  const handleRestartChat = () => setChats(defaultChats);

  return (
    <div className="max-w-5xl mx-auto md:px-8 min-h-screen flex flex-col gap-4">
      {/* Header */}
      <div className="top-0 sticky py-4 pb-2 bg-white px-4 flex justify-between items-center border-b border-orange-300 shadow-md z-10">
        <h4 className="text-2xl font-semibold flex gap-3 items-center text-orange-700">
          <Image
            src="/chatbot-logo.png"
            alt="Chatbot Logo"
            width={48}
            height={48}
            className="rounded-full border-2 border-orange-500 shadow-lg hover:scale-105 transition-transform duration-300"
          />
          {CONFIG.CHATBOT_NAME}
        </h4>

        <Button
          size="sm"
          variant="outline"
          onClick={handleRestartChat}
          className="gap-2 border-orange-500 text-orange-600 hover:bg-orange-100"
        >
          <AlertCircle className="text-orange-600" />
          <span>Restart Chat</span>
        </Button>
      </div>

      {/* Main Chat Display */}
      <div className="flex-1 flex flex-col gap-4 p-4">
        {chats.map((chatItem, index) => (
          <div
            key={`chat-${index}`}
            className={`flex flex-col gap-1 ${
              chatItem.source === "user" ? "items-end" : "items-start"
            }`}
          >
            <div className="flex gap-2 items-center font-mono text-gray-700 text-sm font-semibold">
              {chatItem.source === "bot" ? (
                <>
                  <Image
                    src="/chatbot-logo.png"
                    alt="Bot"
                    width={20}
                    height={20}
                    className="rounded-full border border-orange-500"
                  />
                  <span className="text-orange-600">Bot</span>
                </>
              ) : (
                <>
                  <Image
                    src="/user.png"
                    alt="User"
                    width={20}
                    height={20}
                    className="rounded-full border border-orange-500"
                  />
                  <span className="text-orange-600">You</span>
                </>
              )}
            </div>

            <div
              className={`prose lg:prose-md max-w-[95%] md:max-w-[85%] p-3 rounded-lg shadow-sm ${
                chatItem.source === "user"
                  ? "bg-orange-100 text-orange-900 text-right"
                  : "bg-orange-50 text-orange-900 text-left"
              }`}
              dangerouslySetInnerHTML={{
                __html: convertMarkdownToHTML(chatItem.message),
              }}
              ref={chats.length - 1 === index ? chatContainerRef : null}
            />
          </div>
        ))}
      </div>

      {/* Input Box */}
      <div className="sticky bottom-0 bg-white py-4 px-2 flex gap-1 z-10 border-t border-orange-300">
        <Input
          placeholder="Enter your message..."
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault(); // Prevents default form submission behavior
              handleChatSubmission();
            }
          }}
          ref={inputRef}
          className="flex-1 bg-orange-50 border border-orange-300 rounded-full px-4 py-2 text-orange-800 placeholder:text-orange-500"
        />
        <Button
          className="my-auto bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-full"
          size="sm"
          onClick={handleChatSubmission}
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
