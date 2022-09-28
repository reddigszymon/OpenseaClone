import Header from "../components/Header/Header";
import { useTheme } from "next-themes";
import Hero from "../components/Hero/Hero";
import NotableDrops from "../components/NotableDrops/NotableDrops";
import TopCollections from "../components/TopCollections/TopCollections";
import MeetOpensea from "../components/MeetOpensea/MeetOpensea";
import Footer from "../components/Footer/Footer";
import { useEffect, useState } from "react";
import { client } from "../lib/sanityClient";
import { useAddress } from "@thirdweb-dev/react";
import axios from "axios";

export async function getServerSideProps() {
  const query = `*[_type == "marketItems"]  {
    title,
    "imageUrl": profileImage.asset->url,
    contractAddress
  }`;

  let res = await axios.get(
    `https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?CMC_PRO_API_KEY=8cdc4749-80b3-4fd7-8076-1a337c193e78`
  );

  const data = await client.fetch(query);
  return {
    props: {
      data,
      ethPrice: res.data,
    },
  };
}

export default function Home({ data, ethPrice }) {
  const account = useAddress();
  const { theme, setTheme } = useTheme();
  const [titles, setTitles] = useState([]);

  useEffect(() => {
    if (!account) return;

    const addAddress = async () => {
      const userDoc = {
        _type: "users",
        _id: account,
        userName: "Unnamed",
        walletAddress: account,
      };
      const result = await client.createIfNotExists(userDoc);
    };
    addAddress();
  }, [account]);

  useEffect(() => {
    let titleArray = [];
    for (let i = 0; i < data.length; i++) {
      titleArray.push(data[i].title);
    }
    setTitles(titleArray);
  }, [data]);

  return (
    <div className="relative w-full h-screen dark:bg-[#202225]">
      <div>
        <Header
          theme={theme}
          setTheme={setTheme}
          titles={titles}
          fullData={data}
          etherPrice={ethPrice.data[1].quote.USD.price}
        />
        <Hero theme={theme} setTheme={setTheme} />
        <NotableDrops theme={theme} setTheme={setTheme} />
        <TopCollections theme={theme} setTheme={setTheme} />
        <MeetOpensea theme={theme} setTheme={setTheme} />
        <Footer theme={theme} setTheme={setTheme} />
      </div>
    </div>
  );
}
