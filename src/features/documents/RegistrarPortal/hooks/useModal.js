import { useState } from "react";

export default function useModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState(null);

  const open = (info) => {
    setData(info);
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
    setData(null);
  };

  return { isOpen, data, open, close };
}
