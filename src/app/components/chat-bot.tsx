"use client";

import type React from "react";

import { useState, useEffect, useRef } from "react";
import { MessageSquare, X, Send, Check } from "lucide-react";
import { cn } from "../../lib/utils";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import Image from "next/image";

interface Message {
  id: string;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
  read: boolean;
}

export default function ChatInterface() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Olá! Como posso ajudar você hoje?",
      sender: "bot",
      timestamp: new Date(),
      read: true,
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const sendMessageToApi = async (message: string) => {
    if (!message) return null;

    try {
      setIsLoading(true);
      const response = await fetch("/api/chat-bot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question: message }),
      });

      const responseMessage = await response.json();

      console.log({ responseMessage });

      if (responseMessage.answer) {
        const newBotMessage: Message = {
          id: Date.now().toString(),
          content: responseMessage?.answer,
          sender: "bot",
          timestamp: new Date(),
          read: true,
        };
        setIsLoading(false);
        setMessages((prev) => [...prev, newBotMessage]);
      }
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  };

  const handleSendMessage = () => {
    if (inputValue.trim() === "") return;

    const newUserMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
      read: true,
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setInputValue("");
    sendMessageToApi(newUserMessage.content);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  // Auto scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Format time as HH:MM
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const handleSendMessageButton = (messageButton: string) => {
    const newUserMessage: Message = {
      id: Date.now().toString(),
      content: messageButton,
      sender: "user",
      timestamp: new Date(),
      read: true,
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setInputValue("");
    sendMessageToApi(newUserMessage.content);
  };

  return (
    <>
      {!isOpen && (
        <div
          className="fixed bottom-6 right-6 z-50 cursor-pointer"
          onClick={toggleChat}
        >
          <div className="bg-[#009CE0] rounded-full p-4 shadow-lg hover:scale-110 transition-transform duration-300">
            <MessageSquare className="h-6 w-6 text-white" />
          </div>
        </div>
      )}

      {/* Chat interface */}
      <div
        ref={chatContainerRef}
        className={cn(
          "fixed bottom-6 right-6 z-50 w-80 sm:w-96 rounded-lg shadow-xl flex flex-col bg-white overflow-hidden transition-all duration-300 transform",
          isOpen
            ? "opacity-100 scale-100 animate-bounce-in h-[500px]"
            : "opacity-0 scale-0 h-0"
        )}
      >
        {/* Chat header */}
        <div className="bg-[#009CE0] p-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Image
              width={48}
              height={48}
              src="/bot-logo.png"
              alt="bot logo"
              className="h-8 w-8 text-white mr-2"
            />
            <div>
              <h3 className="font-bold text-white">Rech Bot</h3>
              <div className="flex items-center text-sm text-white/90">
                <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                <span>Online</span>
              </div>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleChat}
            className="text-white hover:bg-[rgb(36,169,228)] rounded-full"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Chat messages */}
        <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "mb-4 max-w-[80%]",
                message.sender === "user" ? "ml-auto" : "mr-auto"
              )}
            >
              <div
                className={cn(
                  "p-3 rounded-lg",
                  message.sender === "user"
                    ? "bg-gray-200 text-gray-800"
                    : "bg-[#009CE0] text-white"
                )}
              >
                {message.content}
              </div>
              <div
                className={cn(
                  "text-xs mt-1 flex items-center",
                  message.sender === "user" ? "justify-end" : "justify-start"
                )}
              >
                {formatTime(message.timestamp)}
                {message.sender === "user" && (
                  <Check
                    className={cn(
                      "h-3 w-3 ml-1",
                      message.read ? "text-[#009CE0]" : "text-gray-400"
                    )}
                  />
                )}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        {isLoading && (
          <div className="w-full bg-gray-50">
            <div className="relative w-[120px] mb-2 h-6 text-[#009CE0] rounded-full flex items-center justify-center">
              {/* Bolinhas do Loader */}
              {/* <div className="flex gap-[6px]">
                <span className="w-1.5 h-1.5 bg-white rounded-full animate-dots [animation-delay:-0.2s]"></span>
                <span className="w-1.5 h-1.5 bg-white rounded-full animate-dots"></span>
                <span className="w-1.5 h-1.5 bg-white rounded-full animate-dots [animation-delay:0.2s]"></span>
              </div> */}
              <span>pensando...</span>
            </div>
          </div>
        )}
        {/* Quick action buttons */}
        <div className="flex justify-around p-2 border-t border-gray-200">
          <Button
            variant="outline"
            size="sm"
            className="text-gray-600 text-xs"
            onClick={() => handleSendMessageButton("Quem é bruno rech?")}
          >
            Quem é Bruno Rech?
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="text-gray-600 text-xs"
            onClick={() =>
              handleSendMessageButton("Habilidades de bruno rech?")
            }
          >
            Habilidades
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="text-gray-600 text-xs"
            onClick={() =>
              handleSendMessageButton("Ultimo projeto de bruno rech?")
            }
          >
            Projetos
          </Button>
        </div>

        <div className="p-3 border-t border-gray-200 flex items-center">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Digite sua mensagem aqui..."
            className="flex-1 bg-gray-100 border-0 text-black"
          />
          <Button
            onClick={handleSendMessage}
            disabled={inputValue.trim() === ""}
            className="ml-2 bg-[#009CE0] hover:bg-[rgb(36,169,228)] text-white rounded-full p-2 h-auto"
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </>
  );
}
