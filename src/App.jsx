import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import BlogDetailsPage from "./components/BlogDetailsPage";
import FavoritePosts from "./components/FavoritePosts";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/blogs/:id" element={<BlogDetailsPage />} />
        <Route path="favorites" element={<FavoritePosts />} />
      </Routes>
    </Router>
  );
}

export default App;
