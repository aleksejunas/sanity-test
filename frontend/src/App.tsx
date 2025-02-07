import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import BlogPage from "./pages/BlogPage";
import Navbar from "./components/Navbar/Navbar";
import imagePath from "./assets//aleksejunas-logo-no-bg.png";
import FilesPage from "./pages/FilesPage";
import SinglePost from "./components/SinglePost/SinglePost";

function App() {
  // const items = ["HOME", "BLOG", "FILES"];
  const navItems = [
    { name: "Home", href: "/" },
    { name: "Blog", href: "/blog" },
    { name: "Files", href: "/files" },
  ];
  return (
    <BrowserRouter>
      <div className="flex flex-col h-screen">
        <Navbar
          brandName="ALEKSEJUNAS"
          imageSrcPath={imagePath}
          navItems={navItems}
        />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/files" element={<FilesPage />} />
          <Route path="/post/:id" element={<SinglePost />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
