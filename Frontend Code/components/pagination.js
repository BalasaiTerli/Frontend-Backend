import React from "react";
import "./index.css";

const Pagination = ({ postPage, setInitialPage, currentPage }) => {
  let pages = [];
  for (let i = 1; i <= Math.ceil(50 / postPage); i++) {
    pages.push(i);
  }

  return (
    <div className="button">
      {pages.map((eachNum, index) => {
        return (
          <button
            key={index}
            className={eachNum === currentPage ? "active" : ""}
            onClick={() => setInitialPage(eachNum)}
          >
            {eachNum}
          </button>
        );
      })}
    </div>
  );
};

export default Pagination;
