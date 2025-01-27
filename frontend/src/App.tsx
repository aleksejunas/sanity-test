// import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
// import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import BlogPage from "./pages/BlogPage";
import Navbar from "./components/Navbar/Navbar";
import imagePath from "./assets/react.svg";
import FilesPage from "./pages/FilesPage";

function App() {
  // const items = ["HOME", "BLOG", "FILES"];
  const navItems = [
    { name: "Home", href: "/" },
    { name: "Blog", href: "/blog" },
    { name: "Files", href: "/files" },
  ];
  return (
    <BrowserRouter>
      <Navbar
        brandName="ALEKSEJUNAS"
        imageSrcPath={imagePath}
        navItems={navItems}
      />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/files" element={<FilesPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

// const [count, setCount] = useState(0)
//
// return (
//   <>
//     <div>
//       <a href="https://vite.dev" target="_blank">
//         <img src={viteLogo} className="logo" alt="Vite logo" />
//       </a>
//       <a href="https://react.dev" target="_blank">
//         <img src={reactLogo} className="logo react" alt="React logo" />
//       </a>
//     </div>
//     <h1>Vite + React</h1>
//     <div className="card">
//       <button onClick={() => setCount((count) => count + 1)}>
//         count is {count}
//       </button>
//       <p>
//         Edit <code>src/App.tsx</code> and save to test HMR
//       </p>
//     </div>
//     <p className="read-the-docs">
//       Click on the Vite and React logos to learn more
//     </p>
//   </>
// )
