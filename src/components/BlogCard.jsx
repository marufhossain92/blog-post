import React from "react";
import { Link } from "react-router-dom";
import style from "./BlogCard.module.css";

export default function BlogCard({ title, id, body }) {
  return (
    <div className={style.container}>
      <img
        className={style.image}
        src={`https://source.unsplash.com/random/150x150?sig=${id}`}
        alt="blog picture"
      />
      <div className={style.leftContainer}>
        <h2>{title}</h2>
        <p className={style.body}>{`${body} ...`}</p>
        <Link to={`/blogs/${id}`} className={style.link}>
          Read more...
        </Link>
      </div>
    </div>
  );
}
