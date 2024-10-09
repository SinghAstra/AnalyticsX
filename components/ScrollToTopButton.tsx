"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Icons } from "./Icons";
import { Button } from "./ui/button";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 200) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 1, scale: 0.5 }}
          transition={{ duration: 0.4 }}
          className="fixed bottom-8 right-16"
        >
          <Button onClick={scrollToTop} className="rounded-full px-2 py-2">
            <Icons.upArrow />
          </Button>
        </motion.div>
      )}
    </>
  );
};

export default ScrollToTopButton;
