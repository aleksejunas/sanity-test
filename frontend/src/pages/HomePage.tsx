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
    <div>
      <h1>Welcome to the Home Page</h1>
      {data.map((item) => (
        <div key={item.id}>
          <h2>{item.title}</h2>
          <p>{item.description}</p>
        </div>
      ))}
    </div>
  );
};

export default HomePage;
