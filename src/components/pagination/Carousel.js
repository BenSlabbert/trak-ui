import React from "react";

const previousPage = (pr, getPage) => {
  if (pr.isFirstPage) {
    return;
  }

  getPage(Number(pr.currentPageNumber) - 1);
};

const nextPage = (pr, getPage) => {
  if (pr.isLastPage) {
    return;
  }

  getPage(Number(pr.currentPageNumber) + 1);
};

export default ({ pr, getPage }) => (
  <ul className="right pagination">
    <li className={pr.isFirstPage ? "disabled" : "waves-effect"}>
      <a onClick={() => previousPage(pr, getPage)}>
        <i className="material-icons">chevron_left</i>
      </a>
    </li>
    <li className="active">
      <a>{pr.currentPageNumber}</a>
    </li>
    <li className="inactive">
      <a>...</a>
    </li>
    <li className="inactive">
      <a>{pr.lastPageNumber}</a>
    </li>
    <li className={pr.isLastPage ? "disabled" : "waves-effect"}>
      <a onClick={() => nextPage(pr, getPage)}>
        <i className="material-icons">chevron_right</i>
      </a>
    </li>
  </ul>
);
