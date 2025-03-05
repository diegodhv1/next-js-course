import { useGlobalContext } from "@/context/GlobalContext";
import React from "react";

const UnReadMessageCount = () => {
  const { unReadCount } = useGlobalContext();
  return (
    <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
      {unReadCount}
    </span>
  );
};

export default UnReadMessageCount;
