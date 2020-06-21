import React from "react";
import "./styles.scss";

/**
 * @description container component that should be in the middle of the login page
 */

export default ({ showWave = false }) => {
  return (
    <div className="billsnap-background">
      {showWave ? (
        <svg
          width="100vw"
          height="60vh"
          viewBox="0 0 100vw 60vh"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 0C0 0 319.5 3.40547 578 168.373C836.5 333.34 1146 -94.7804 1436.5 20.432C1727 135.644 1897 0 1897 0V801H0V0Z"
            fill="#31E2AD"
            fillOpacity="0.67"
          />
          <path
            d="M0 138.86C0 138.86 319.5 142.266 578 307.233C836.5 472.2 1146 44.0797 1436.5 159.292C1727 274.504 1897 138.86 1897 138.86V801H0V138.86Z"
            fill="#31E2AD"
            fillOpacity="0.67"
          />
        </svg>
      ) : (
        <></>
      )}
    </div>
  );
};
