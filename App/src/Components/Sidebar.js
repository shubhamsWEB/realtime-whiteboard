'use client'
import React, { useState, useRef, useEffect } from "react";
import { useUserContext } from "../services/context/userContext";
import { socket } from "../utils/socketUtils";
const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const sideBarRef = useRef(null);
  const buttonRef = useRef(null);
  const { user } = useUserContext();
  const openSideBar = () => {
    setIsOpen(true);
  };

  const closeSideBar = () => {
    setIsOpen(false);
  };

  // Close the sidebar when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sideBarRef.current && !sideBarRef.current.contains(event.target) && !buttonRef.current.contains(event.target)) {
        closeSideBar();
      }
    };

    // Attach event listener
    document.addEventListener("mousedown", handleClickOutside);

    // Clean up the event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className={`text-center ${isOpen && 'hidden'}`}>
        <svg ref={buttonRef} onClick={openSideBar} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>
      </div>

      <div
        ref={sideBarRef}
        className={`fixed top-0 left-0 z-40 w-64 h-screen p-3 overflow-y-auto transition-transform ${isOpen ? "translate-x-0" : "-translate-x-full"} bg-gray-100`}
        aria-labelledby="drawer-navigation-label"
      >
        <h5 id="drawer-navigation-label" className="text-base font-semibold text-green-500 uppercase text-center">Online Users ({user.length})</h5>
        <button
          type="button"
          className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 end-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
          onClick={closeSideBar}
        >
          <svg
            aria-hidden="true"
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
          <span className="sr-only">Close menu</span>
        </button>
        <div className="py-4 overflow-y-auto">
          <ul className="space-y-2 font-medium">
            {user?.length>0 && user?.map((u) => {
              return (
                <li className="flex items-center p-1" key={u.id}>
                  <div className="h-8 w-8 rounded-full ring-2 ring-gray-900 text-sm flex justify-center items-center uppercase">{u.username.slice(0,2)}</div>
                  <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg group">
                    <span className="ms-3">{u.username} {u.id === socket.id && "- (You)"}</span>
                  </a>
                </li>
              )
            })}
            {/* Add other menu items here */}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
