import React from "react";
import "./Loader.scss";

export const Loading = () => {
  return (
    <>
      <div class="loaders-container">
        <div>
          <span class="text-loader-1">L &nbsp;&nbsp; ading</span>
        </div>
      </div>
    </>
  )
};

export const PulseLoader = () => {
  return (
    <div className="sk-three-bounce">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className={`sk-child sk-bounce-${i}`} />
      ))}
    </div>
  );
};
