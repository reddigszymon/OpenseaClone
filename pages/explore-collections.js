import React, { useState, useEffect } from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import ExploreCollections from "../components/ExploreCollections/ExploreCollections";
import { client } from "../lib/sanityClient";
import axios from "axios";

export async function getServerSideProps() {
  const query = `*[_type == "marketItems"]  {
    title,
    "imageUrl": profileImage.asset->url,
    contractAddress,
    "bannerImageUrl": bannerImage.asset->url
  }`;

  let res = await axios.get(
    `https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?CMC_PRO_API_KEY=${process.env.NEXT_PUBLIC_CMC_API_KEY}`
  );

  const data = await client.fetch(query);
  return {
    props: {
      data,
      ethPrice: res.data,
    },
  };
}

function allcollections({ data, ethPrice }) {
  const [titles, setTitles] = useState([]);

  useEffect(() => {
    let titleArray = [];
    for (let i = 0; i < data.length; i++) {
      titleArray.push(data[i].title);
    }
    setTitles(titleArray);
  }, [data]);

  return (
    <div>
      <Header
        titles={titles}
        fullData={data}
        etherPrice={ethPrice.data[1].quote.USD.price}
      />
      <ExploreCollections data={data} />
      <Footer />
    </div>
  );
}

export default allcollections;
