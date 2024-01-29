import React, { useState, useEffect } from "react";
import getAllBlogs from "../../lib/getAllBlogs";
import BlogCard from "./BlogCard";
import style from "./HomePage.module.css";
import Nav from "./Nav";

const HomePage = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await getAllBlogs();
        setBlogs(response.data.blogs);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  const content = (
    <section className={style.container}>
      <Nav
        blogsNumber={blogs.length}
        link="/favorites"
        Page="Favorite"
        currentPage={"Blog"}
      />
      <br />
      <br />
      <div className={style.cardContainer}>
        {blogs.map((blog) => (
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

export default HomePage;
