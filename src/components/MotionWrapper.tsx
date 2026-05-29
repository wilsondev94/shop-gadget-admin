"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

interface MotionWrapperProps {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "left" | "right";
}

const MotionWrapper = ({
  children,
  delay = 0,
  direction = "up",
}: MotionWrapperProps) => {
  const getInitial = () => {
    switch (direction) {
      case "left":
        return { opacity: 0, x: -80 };
      case "right":
        return { opacity: 0, x: 80 };
      case "up":
      default:
        return { opacity: 0, y: 50 };
    }
  };

  return (
    <motion.div
      initial={getInitial()}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{ duration: 0.5, delay }}
    >
      {children}
    </motion.div>
  );
};

export default MotionWrapper;
