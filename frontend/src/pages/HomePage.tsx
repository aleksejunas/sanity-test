import { useEffect, useState } from "react";
import { sanityClient } from "../sanity";

interface HomePageData {
  id: string;
  title: string;
  description: string;
}

const HomePage = () => {
  const [data, setData] = useState<HomePageData[]>([]);

  useEffect(() => {
    sanityClient.fetch(`*[_type == "homepage"]`).then((result) => {
      setData(result);
    });
  }, []);

  return (
    <div className="bg-[#2C2B2B]">
      <h1 className="text-white">Welcome to the Home Page</h1>
      {data.map((item) => (
        <div className="text-white" key={item.id}>
          <h2 className="text-white">{item.title}</h2>
          <p>{item.description}</p>
        </div>
      ))}
    </div>
  );
};

export default HomePage;
