// TODO: Hover effect/color on the navbar links

import { useState } from "react";
// import "../../App.css";

interface NavItem {
  name: string;
  href: string;
}

interface NavBarProps {
  brandName: string;
  imageSrcPath: string;
  navItems: NavItem[];
}

const NavBar = ({ brandName, imageSrcPath, navItems }: NavBarProps) => {
  const [selectedIndex, setSelectedIndex] = useState(-1);

  return (
    <nav className="bg-[#212223] shadow-md mb-10">
      <div className="container mx-auto flex items-center justify-between py-4">
        <a className="flex items-center" href="#">
          <img
            src={imageSrcPath}
            width="60"
            height="60"
            className="inline-block"
            alt=""
          />
          <span className="font-bold text-xl ml-2 text-white">{brandName}</span>
        </a>
        <button
          className="block lg:hidden px-3 py-2 border rounded text-gray-700 border-gray-700"
          type="button"
          onClick={() => setSelectedIndex(selectedIndex === -1 ? 0 : -1)}
        >
          <svg
            className="fill-current h-3 w-3"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
        <div
          className={`w-full lg:flex lg:items-center lg:w-auto ${
            selectedIndex === -1 ? "hidden" : ""
          }`}
        >
          <ul className="lg:flex lg:justify-between text-sm lg:flex-grow">
            {navItems.map((item, index) => (
              <li
                key={item.name}
                className="nav-item"
                onClick={() => setSelectedIndex(index)}
              >
                <a
                  className={`block mt-4 lg:inline-block lg:mt-0 text-gray-100 hover:text-gray-900 mr-4 ${
                    selectedIndex === index ? "font-bold" : ""
                  }`}
                  href={item.href}
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
          <form className="flex items-center mt-4 lg:mt-0">
            <input
              className="form-input px-4 py-2 border rounded-lg text-gray-700"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button
              className="ml-2 px-4 py-2 bg-pink-500 text-white rounded-lg"
              type="submit"
            >
              Search
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
