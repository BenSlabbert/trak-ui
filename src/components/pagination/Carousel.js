import React from "react";

const firstPage = (pr, getPage, getPageAdditionalArgs) => {
  if (pr.isFirstPage) {
    return;
  }

  getPage(1, getPageAdditionalArgs);
};

const lastPage = (pr, getPage, getPageAdditionalArgs) => {
  if (pr.isLastPage) {
    return;
  }

  getPage(Number(pr.lastPageNumber), getPageAdditionalArgs);
};

const previousPage = (pr, getPage, getPageAdditionalArgs) => {
  if (pr.isFirstPage) {
    return;
  }

  getPage(Number(pr.currentPageNumber) - 1, getPageAdditionalArgs);
};

const nextPage = (pr, getPage, getPageAdditionalArgs) => {
  if (pr.isLastPage) {
    return;
  }

  getPage(Number(pr.currentPageNumber) + 1, getPageAdditionalArgs);
};

export default ({ pr, getPage, getPageAdditionalArgs }) => (
  <ul className="right pagination">
    <li className={pr.isFirstPage ? "disabled" : "waves-effect"}>
      <a onClick={() => firstPage(pr, getPage, getPageAdditionalArgs)}>
        first page
      </a>
    </li>
    <li className={pr.isFirstPage ? "disabled" : "waves-effect"}>
      <a onClick={() => previousPage(pr, getPage, getPageAdditionalArgs)}>
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
      <a onClick={() => nextPage(pr, getPage, getPageAdditionalArgs)}>
        <i className="material-icons">chevron_right</i>
      </a>
    </li>
    <li className={pr.isLastPage ? "disabled" : "waves-effect"}>
      <a onClick={() => lastPage(pr, getPage, getPageAdditionalArgs)}>
        last page
      </a>
    </li>
  </ul>
);
