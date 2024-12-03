"use client";
import ChatBotHeadIcon from "@/components/ui/svg/ChatBotHeadIcon";
import ChatBotIcon from "@/components/ui/svg/ChatBotIcon";
import CloseIcon from "@/components/ui/svg/CloseIcon";
import React, { useState, useEffect } from "react";
import { VscSend } from "react-icons/vsc";
import { motion } from "framer-motion";

export const animateInView = (delay = 0, duration = 0.5) => ({
  initial: { opacity: 0, x: 0 },
  whileInView: { opacity: 1, x: 0 },
  transition: { delay, duration, ease: "easeInOut" },
});

const ChatBot = () => {
  const [isLoaderHidden, setIsLoaderHidden] = useState(false);

  const [isChatBotClicked, setIsChatBotClicked] = useState(false);
  const [isChatBoxOpen, setIsChatBoxOpen] = useState(false);
  const [isChatBoxClosed, setIsChatBoxClosed] = useState(true);
  const [removeChatBoxFlag, setRemoveChatBoxFlag] = useState(true);
  const [flag, setFlag] = useState(false);

  const opacity50 = removeChatBoxFlag ? "opacity-100" : "opacity-30";

  const handleChatBot = () => {
    setIsChatBotClicked(!isChatBotClicked);
    setIsChatBoxOpen(!isChatBoxOpen);
  };

  const handleChatBox = () => {
    setFlag(true);
    setTimeout(() => {
      setIsChatBotClicked(false);
    }, 300);
    setRemoveChatBoxFlag(false);
    setTimeout(() => {
      setIsChatBoxOpen(false);
      setRemoveChatBoxFlag(true);
    }, 300);
  };

  {
    isChatBoxOpen &&
      setTimeout(() => {
        setIsLoaderHidden(true);
      }, 2900);
  }

  {
    flag &&
      setTimeout(() => {
        setFlag(false);
      }, 1100);
  }

  return (
    <div>
      {!isChatBotClicked && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.7 }}
          className="fixed z-50 top-[50%] cursor-pointer animate-bounce"
          onClick={handleChatBot}
        >
          <ChatBotIcon />
        </motion.div>
      )}

      {/* Second Icon: Smooth Translate Animation */}
      {isChatBotClicked && (
        <motion.div
          initial={{ y: 0, opacity: 0 }}
          animate={{ y: 500, opacity: 1 }} // Equivalent to translate-y-40
          exit={{ y: 0, opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="fixed z-50 top-[50%] cursor-pointer"
        >
          <ChatBotIcon />
        </motion.div>
      )}

      {/* Third Icon: Smooth Translate Animation */}
      {isChatBoxClosed && flag && (
        <motion.div
          initial={{ y: 1040, opacity: 0 }}
          animate={{ y: -17, opacity: 1 }} // Equivalent to translate-y-40
          transition={{ duration: 0.5, delay: 0.1, ease: "easeInOut" }}
          className="fixed z-50 top-[50%] cursor-pointer"
        >
          <ChatBotIcon />
        </motion.div>
      )}



      {/* Chat BOX  */}
      {isChatBoxOpen && (
        <motion.div
          initial={{ y: 1040, opacity: 1 }}
          animate={{ y: 270, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5, ease: "easeInOut" }}
          className={`flex flex-col box-border gap-0 chatBox  bg-white rounded-2xl  transition-all ease-in-out duration-500 ${
            removeChatBoxFlag
              ? "w-[20rem] h-[23rem] border-2 border-[#c7535d]"
              : "w-0 h-0  border-none"
          }`}
        >
          {removeChatBoxFlag && (
            <div
              className={`bg-[#c7535d] flex gap-2 justify-between items-center ${
                !removeChatBoxFlag ? "p-0" : "p-3"
              } rounded-t-xl ${opacity50}`}
            >
              <div className="flex gap-2">
                <div className="bg-[#F5F5F5] h-9 w-9 rounded-full flex items-center justify-center">
                  <ChatBotHeadIcon />
                </div>
                <div className="flex flex-col">
                  <h3 className="text-white font-semibold">ATI USA</h3>
                  <div className="flex gap-1 items-center">
                    <div className="h-2 w-2 rounded-full bg-[#75F538] outline outline-white" />
                    <p className="font-normal text-xs text-white">Online now</p>
                  </div>
                </div>
              </div>
              <div
                className="cursor-pointer transition-all duration-150 active:scale-90"
                onClick={handleChatBox}
              >
                <CloseIcon />
              </div>
            </div>
          )}

          {/* Message Box  */}
          <div
            className={`flex gap-3  bg-[#F5F5F5] transition-all duration-500 ${
              removeChatBoxFlag ? "h-[15.6rem] p-3" : "h-[0rem] opacity-50 p-0"
            } overflow-hidden items-end`}
          >
            <div className={`mb-3 ${opacity50}`}>
              <ChatBotHeadIcon />
            </div>
            <div className="flex flex-col gap-[2px]">
              <h3 className={`font-semibold text-xs pl-1 ${opacity50}`}>
                ATI USA
              </h3>
              <div
                className={`flex items-center min-w-[198px] font-normal text-sm ${
                  removeChatBoxFlag && "border border-[#333132] rounded p-2"
                } `}
              >
                <div
                  className={`flex gap-2 h-5 items-center ${
                    isLoaderHidden ? "hidden" : "block"
                  }`}
                >
                  <motion.div
                    {...animateInView(0.7, 0.2)}
                    className="h-2 w-2 bg-[#333333] rounded-full"
                  />
                  <motion.div
                    {...animateInView(0.9, 0.2)}
                    className="h-2 w-2 bg-[#333333] rounded-full"
                  />
                  <motion.div
                    {...animateInView(1.1, 0.2)}
                    className="h-2 w-2 bg-[#333333] rounded-full"
                  />
                </div>
                {isLoaderHidden && (
                  <motion.p
                    {...animateInView(0, 0.1)}
                    className={`text-sm font-normal ${opacity50}`}
                  >
                    Hello! How can I help you?
                  </motion.p>
                )}
              </div>
            </div>
          </div>
          {/* Message Box End  */}

          {/* Input Field  */}
          {removeChatBoxFlag && (
            <div
              className={`relative h-12 flex justify-between border-t-[1.5px] border-[#C7535D] w-full p-3 ${opacity50}`}
            >
              <form action="" className="flex items-center w-full mr-5">
                <input
                  className="font-normal text-sm text-[#333333] p-2 w-full outline-none"
                  type="text"
                  placeholder="Type something..."
                />
              </form>
              <div className="w-[1px] bg-[#C7535D] opacity-30 mr-8" />
              <div
                className={`absolute -right-5 bottom-5 h-14 w-14 rounded-full bg-[#A02A34] flex justify-center items-center ${
                  !removeChatBoxFlag && "opacity-0"
                }`}
              >
                <VscSend color="white" size={34} />
              </div>
            </div>
          )}
          {/* Input Field End  */}
        </motion.div>
      )}
    </div>
  );
};

export default ChatBot;
