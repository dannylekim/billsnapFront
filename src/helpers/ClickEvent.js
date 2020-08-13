import React, { useEffect } from "react";

/**
 * Hook that alerts clicks outside of the passed ref
 * 
 * @param ref React component DOM reference
 * @param callBack callback function to be called once clicked outside DOM element. Yes we don't like callbacks :) 
 */
export function useOutsideAlerter(ref, callBack) {
    useEffect(() => {
        /**
         * Alert if clicked on outside of element
         */
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                // alert("You clicked outside of me!");
                callBack();
            }
        }

        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);
}