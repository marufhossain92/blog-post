import React from "react";
import style from "./Nav.module.css";
import { Link } from "react-router-dom";

export default function Nav({ blogsNumber, link, Page, currentPage }) {
  return (
    <div className={style.container}>
      <h1 className={style.title}>All {currentPage} Posts</h1>
      <p className={style.info}>
        There are {blogsNumber || "0"} blog posts available for you.
      </p>
      <Link to={link}>
        <button className={style.link}>View All {Page} Posts</button>
      </Link>
    </div>
  );
}
