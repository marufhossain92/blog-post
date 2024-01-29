import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import getBlog from '../../lib/getBlog';
import style from './BlogDetailsPage.module.css';
import { Link } from 'react-router-dom';

const BlogDetailsPage = () => {
	const { id } = useParams();
	const [blog, setBlog] = useState(null);
	const [isFavorite, setIsFavorite] = useState(false);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchBlogAndComments = async () => {
			try {
				const response = await getBlog(id);
				setBlog(response.data.blog);

				localStorage.setItem(
					`storePostById${id}`,
					JSON.stringify(response.data.blog)
				);
			} catch (error) {
				console.error('Error fetching blog or comments:', error);
				setError('Error fetching blog or comments');
			} finally {
				setLoading(false);
			}
		};

		if (localStorage.getItem(`storePostById${id}`)) {
			setBlog(JSON.parse(localStorage.getItem(`storePostById${id}`)));
			setLoading(false);
		} else {
			fetchBlogAndComments();
		}

	}, [id]);

	const getFavFromLocalStorage = () => {
		const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
		if (
			favorites.includes(
				favorites?.find((item) => item.id == id?.toString())
			)
		) {
			setIsFavorite(true);
		}
	};

	useEffect(() => {
		getFavFromLocalStorage();
	}, []);

	const toggleFavorite = () => {
		// Add or remove the blog post from the favorites list
		let favInit = JSON.parse(localStorage.getItem('favorites'));

		if (!isFavorite) {
			let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
			if (!favorites.some((favBlog) => favBlog.id === blog.id)) {
				favorites = [...favorites, blog];
				localStorage.setItem('favorites', JSON.stringify(favorites));
			}
		} else {
			let getAllFavorites = JSON.parse(localStorage.getItem('favorites'));
			let newFavorites = getAllFavorites.filter(
				(favBlog) => favBlog.id != id.toString()
			);

			localStorage.setItem('favorites', JSON.stringify(newFavorites));
		}

		setIsFavorite(!isFavorite);
	};

	if (loading) {
		return <p>Loading...</p>;
	}

	if (error) {
		return <p>{error}</p>;
	}

	const content = (
		<section className={style.section}>
			<img
				className={style.image}
				src={`https://source.unsplash.com/random/150x150?sig=${id}`}
				alt=""
			/>
			<h1 className={style.title}>{blog.title}</h1>
			<p className={style.body}>{blog.body}</p>
			<div className={style.btnContainer}>
				<Link to={`/`}>
					<button className={style.backBtn}>All Posts</button>
				</Link>
				<button onClick={toggleFavorite} className={style.favBtn}>
					{isFavorite ? 'Unmark as Favorite' : 'Mark as Favorite'}
				</button>
			</div>
			<div className={style.commentContainer}>
				<h2 className={style.commentTitle}>Comments</h2>
				<ul>
					{blog.comments.map((comment) => (
						<li key={comment.id}>
							<strong>{comment.name}</strong>{' '}
							<span className={style.commentBody}>
								{comment.body}
							</span>
						</li>
					))}
				</ul>
			</div>
		</section>
	);

	return (
		<div className={style.container}>
			<div className={style.box}>{content}</div>
		</div>
	);
};

export default BlogDetailsPage;
