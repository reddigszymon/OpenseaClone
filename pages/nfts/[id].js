import React, { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/router";
import Header from "../../components/Header/Header";
import { useTheme } from "next-themes";
import NFTPageSmall from "../../components/Nfts/NFTPageSmall";
import NFTPageLarge from "../../components/Nfts/NFTPageLarge";
import { client } from "../../lib/sanityClient";
import Footer from "../../components/Footer/Footer";
import { useMarketplace } from "@thirdweb-dev/react";
import { useNFTCollection } from "@thirdweb-dev/react";
import { useAddress } from "@thirdweb-dev/react";
import axios from "axios";

export async function getServerSideProps() {
  const query = `*[_type == "marketItems"]  {
    title,
    "imageUrl": profileImage.asset->url,
    contractAddress
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

function nftPage({ data, ethPrice }) {
  const address = useAddress();
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const nftInfo = router.query;
  const { isListed, collectionAddress, id } = nftInfo;
  const [nfts, setNfts] = useState([]);
  const [myModule, setMyModule] = useState("");
  const [listings, setListings] = useState([]);
  const [collection, setCollection] = useState([]);
  const [user, setUser] = useState("");
  const [titles, setTitles] = useState([]);

  useEffect(() => {
    let titleArray = [];
    for (let i = 0; i < data.length; i++) {
      titleArray.push(data[i].title);
    }
    setTitles(titleArray);
  }, [data]);

  const marketplace = useMarketplace(
    "0x1De7A966aa3FC7d43bfA7Ae450AEF02600E9d5Db"
  );
  const nftCollection = useNFTCollection(collectionAddress);

  const getListings = async () => {
    try {
      const list = await marketplace.getActiveListings();
      setListings(list);
    } catch (e) {
      console.log(e);
    }
  };

  const getNfts = async () => {
    try {
      const myNfts = await nftCollection.getAll();
      setNfts(myNfts);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getListings();
  }, [address, collectionAddress]);

  useEffect(() => {
    getNfts();
  }, [address, collectionAddress]);

  const nft = nfts.filter((nft) => nft.metadata.name === id);
  const listing = listings.filter((listing) => listing.asset.name === id);

  const fetchCollectionData = async () => {
    const query = `*[_type == "marketItems" && contractAddress == "${collectionAddress}"] {
      "imageUrl": profileImage.asset->url,
       title,
      description,
    }`;

    const collectionData = await client.fetch(query);
    await setCollection(collectionData[0]);
  };

  useMemo(() => {
    fetchCollectionData();
  }, [collectionAddress]);

  const owner = nft.length < 1 ? "" : nft[0].owner;

  const fetchUserData = async () => {
    const query = `*[_type == "users" && walletAddress == "${owner}"] {
      userName
    }`;

    const userData = await client.fetch(query);
    await setUser(userData[0]);
  };

  useMemo(() => {
    fetchUserData();
  }, [owner, collectionAddress]);

  return (
    <>
      <Header
        theme={theme}
        setTheme={setTheme}
        titles={titles}
        fullData={data}
        etherPrice={ethPrice.data[1].quote.USD.price}
      />
      <div className="lg:hidden">
        <NFTPageSmall
          nft={nft}
          listing={listing}
          collection={collection}
          username={user}
          allNfts={nfts}
          allListings={listings}
        />
      </div>
      <div className="hidden lg:block">
        <NFTPageLarge
          nft={nft}
          listing={listing}
          collection={collection}
          username={user}
          allNfts={nfts}
          allListings={listings}
        />
      </div>
      <Footer />
    </>
  );
}

export default nftPage;
