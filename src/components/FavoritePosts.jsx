import React from "react";
import BlogCard from "./BlogCard";
import style from "./HomePage.module.css";
import Nav from "./Nav";

const FavoritePosts = () => {
  // Retrieve the list of favorite blog post IDs from local storage
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  const content = (
    <section className={style.container}>
      <Nav
        blogsNumber={favorites.length}
        link="/"
        Page="Blog"
        currentPage={"Favorite"}
      />
      <br />
      <div className={style.cardContainer}>
        {favorites.map((blog) => (
          <BlogCard
            key={blog.id}
            title={blog.title}
            id={blog.id}
            body={blog.body.slice(0, 100)}
          />
        ))}
      </div>
    </section>
  );

  return content;
};

export default FavoritePosts;
