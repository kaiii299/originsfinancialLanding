import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { floatingContactButtonData } from "@/lib/constants";
import { CustomIcon } from "./customIcon";

const FloatingButton: React.FC = () => {
  const [isToggleButton, setIsToggleButton] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);


  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 0.15 },
    exit: { opacity: 0 },
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(
        (prevIndex) => (prevIndex + 1) % floatingContactButtonData.icons.length
      );
    }, 2700);

    return () => clearInterval(interval);
  }, [floatingContactButtonData.icons.length]);

  return (
    <div className="cursor-pointer">
      {isToggleButton && (
        <motion.div
          onClick={() => setIsToggleButton(false)}
          className="fixed inset-0 bg-black z-50"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ duration: 0.3 }}
        />
      )}
      <div
        onClick={() => setIsToggleButton((prev) => !prev)}
        className="bg-blue-500
        z-[100] 
        lg:h-16 lg:w-16
        h-16  w-16
        md:h-20
        md:w-20
        fixed md:right-16 right-10 bottom-10 
        text-white
        rounded-full flex justify-center items-center"
      >
        <CustomIcon
          iconName={
            isToggleButton
              ? "LuX"
              : floatingContactButtonData.icons[currentIndex]
          }
          size="33"
        />
        <AnimatePresence>
          {isToggleButton && (
            <div className="relative">
              {floatingContactButtonData.contactOptions.map((option, index) => (
                <div
                  key={index}
                  className={`bg-${option.backgroundColor} 
                  h-10 w-10 flex justify-center z-[130] 
                  items-center absolute hover:scale-125 
                  transition-all duration-150 
                  right-${option.position.right}
                  left-${option.position.left}
                  top-${option.position.top}
                  bottom-${option.position.bottom}
                  rounded-full p-5`}
                >
                  <a
                    href={option.link}
                    target={option.type === "whatsapp" ? "_blank" : undefined}
                  >
                    <CustomIcon iconName={option.icon} size={option.size} />
                  </a>
                </div>
              ))}
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default FloatingButton;
