import { useEffect, useState } from "react";

export const useKeyboardNavigation = (wrapper?: HTMLElement | null) => {
  const [itemsLength, setItemsLength] = useState(0);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

  useEffect(() => {
    const menuItems = wrapper?.querySelectorAll("menu") ?? [];
    const listItems = wrapper?.querySelectorAll("li") ?? [];
    const allItems = [...menuItems, ...listItems];

    setItemsLength(allItems.length);

    if (focusedIndex !== null) {
      if (allItems[focusedIndex]) {
        (allItems[focusedIndex] as HTMLElement).focus();
      }
    }
  }, [focusedIndex, wrapper]);

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLElement>,
    handler: () => void
  ) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setFocusedIndex(null);
      handler();
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      setFocusedIndex((prevIndex) =>
        prevIndex === null || prevIndex === itemsLength - 1 ? 0 : prevIndex + 1
      );
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setFocusedIndex((prevIndex) =>
        prevIndex === null || prevIndex === 0 ? itemsLength - 1 : prevIndex - 1
      );
    }
  };

  return { focusedIndex, handleKeyDown };
};
