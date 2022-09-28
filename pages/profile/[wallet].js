import React, { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import UserImages from "../../components/Profile/UserImages";
import UserInfo from "../../components/Profile/UserInfo";
import { client } from "../../lib/sanityClient";
import { useNFTCollection } from "@thirdweb-dev/react";
import { useRouter } from "next/router";
import { useAddress } from "@thirdweb-dev/react";
import { useMarketplace } from "@thirdweb-dev/react";
import Footer from "../../components/Footer/Footer";
import axios from "axios";

export async function getServerSideProps(context) {
  const { wallet } = context.query;
  const query = `*[_type == "marketItems"]  {
    contractAddress,
  }`;

  const userQuery = `*[_type == "users" && walletAddress == "${wallet}"] {
    "imageUrl": profileImage.asset->url,
    "bannerUrl": bannerImage.asset->url,
     userName,
  }`;

  const searchQuery = `*[_type == "marketItems"]  {
    title,
    "imageUrl": profileImage.asset->url,
    contractAddress
  }`;

  let res = await axios.get(
    `https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?CMC_PRO_API_KEY=8cdc4749-80b3-4fd7-8076-1a337c193e78`
  );

  const data = await client.fetch(query);
  const userData = await client.fetch(userQuery);
  const searchData = await client.fetch(searchQuery);
  return {
    props: {
      data,
      userData,
      searchData,
      ethPrice: res.data,
    },
  };
}

function profile({ data, userData, searchData, ethPrice }) {
  const [nfts, setNfts] = useState([]);
  const [iter, setIter] = useState(0);
  const [allNfts, setAllNfts] = useState([]);
  const [canRender, setCanRender] = useState(false);
  const [listings, setListings] = useState();
  const [titles, setTitles] = useState([]);

  const router = useRouter();
  const { wallet } = router.query;
  const address = useAddress();

  const marketplace = useMarketplace(
    "0x1De7A966aa3FC7d43bfA7Ae450AEF02600E9d5Db"
  );

  useEffect(() => {
    let titleArray = [];
    for (let i = 0; i < searchData.length; i++) {
      titleArray.push(searchData[i].title);
    }
    setTitles(titleArray);
  }, [data]);

  if (data[0] !== undefined) {
    for (let i = 0; i < data.length; i++) {
      if (i === iter) {
        const collection = useNFTCollection(data[i].contractAddress);

        async function getNfts() {
          if (collection !== undefined) {
            await collection.getOwned(wallet).then((res) => {
              for (let j = 0; j < res.length; j++) {
                res[j]["contractAddress"] = data[i].contractAddress;
              }
              setNfts((nfts) => [...nfts, res]);
            });
          }
        }
        getNfts();
        setIter((prev) => prev + 1);
      }
    }
  }

  useEffect(() => {
    if (iter === data.length) {
      let newNfts = Array.from(new Set(nfts.map(JSON.stringify)), JSON.parse);
      let endNfts = [];
      for (let i = 0; i < newNfts.length; i++) {
        for (let j = 0; j < newNfts[i].length; j++) {
          endNfts.push(newNfts[i][j]);
        }
      }
      setAllNfts(endNfts);
      setCanRender(true);
    }
  }, [nfts, wallet]);

  const getListings = async () => {
    try {
      const list = await marketplace.getActiveListings();
      setListings(list);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getListings();
  }, [address, wallet]);

  return (
    <div className="overflow-x-hidden">
      <Header
        titles={titles}
        fullData={searchData}
        etherPrice={ethPrice.data[1].quote.USD.price}
      />
      <UserImages userData={userData} />
      <UserInfo nfts={allNfts} listings={listings} userData={userData} />
      <Footer />
    </div>
  );
}

export default profile;
