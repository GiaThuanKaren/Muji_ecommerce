import React, { useEffect, useRef, useState } from "react";

interface DropdownProps {
    button: React.ReactNode;
    children: React.ReactNode;
    classNames?: string;
    animation?: string;
}

function useOutsideAlerter(ref: React.RefObject<HTMLDivElement>, setX: React.Dispatch<React.SetStateAction<boolean>>) {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setX(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, setX]);
}

const Dropdown: React.FC<DropdownProps> = ({ button, children, classNames, animation }) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [openWrapper, setOpenWrapper] = useState<boolean>(false);
  useOutsideAlerter(wrapperRef, setOpenWrapper);

  return (
    <div ref={wrapperRef} className="relative flex">
      <div className="flex" onMouseDown={() => setOpenWrapper(!openWrapper)}>
        {button}
      </div>
      <div
        className={`${classNames} absolute z-10 ${
          animation
            ? animation
            : "origin-top-right transition-all duration-300 ease-in-out"
        } ${openWrapper ? "scale-100" : "scale-0"}`}
      >
        {children}
      </div>
    </div>
  );
};

export default Dropdown;