import React from "react";
import { useRouter } from "next/router";
import { useMemo, useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { client } from "../../lib/sanityClient";
import CollectionData from "../../components/Collections/CollectionData";
import { useTheme } from "next-themes";
import { useMarketplace } from "@thirdweb-dev/react";
import { useNFTCollection } from "@thirdweb-dev/react";
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

function Collection({ data, ethPrice }) {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const { collectionId } = router.query;
  const [nfts, setNfts] = useState([]);
  const [listings, setListings] = useState([]);
  const [collection, setCollection] = useState([]);
  const [volumeData, setVolumeData] = useState([]);
  const [totalVolume, setTotalVolume] = useState(0);
  const [titles, setTitles] = useState([]);

  const marketplace = useMarketplace(
    "0x1De7A966aa3FC7d43bfA7Ae450AEF02600E9d5Db"
  );

  useEffect(() => {
    let titleArray = [];
    for (let i = 0; i < data.length; i++) {
      titleArray.push(data[i].title);
    }
    setTitles(titleArray);
  }, [data, collectionId]);

  const fetchVolume = async () => {
    axios
      .get(
        `https://api-goerli.etherscan.io/api?module=account&action=txlist&contractaddress=${collectionId}&address=0x1De7A966aa3FC7d43bfA7Ae450AEF02600E9d5Db&startblock=0&endblock=99999999&sort=asc&apikey=${process.env.NEXT_PUBLIC_GOERLI_KEY}`
      )
      .then((res) => setVolumeData(res.data.result));
  };

  useEffect(() => {
    fetchVolume();
  }, [collectionId]);

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
  }, [collectionId]);

  const nftCollection = useNFTCollection(collectionId);

  const getNfts = async () => {
    try {
      const myNfts = await nftCollection.getAll();
      setNfts(myNfts);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCollectionData = async () => {
    const query = `*[_type == "marketItems" && contractAddress == "${collectionId}"] {
      volumeTraded,
      createdBy,
      "imageUrl": profileImage.asset->url,
      "bannerImageUrl": bannerImage.asset->url,
      contractAddress,
      "creator": createdBy->userName,
      title,
      "allOwners": owners[] ->,
      description,
      company

    }`;

    const collectionData = await client.fetch(query);
    setCollection(collectionData[0]);
  };

  const calculateVolume = () => {
    if (volumeData == undefined) return;
    let total = 0;
    for (let i = 0; i < volumeData.length; i++) {
      total += parseInt(volumeData[i].value);
    }
    total = total * 1e-18;
    setTotalVolume(total.toFixed(2));
  };

  useEffect(() => {
    calculateVolume();
  }, [volumeData]);

  useMemo(() => {
    fetchCollectionData();
  }, [collectionId]);

  useEffect(() => {
    getNfts();
  }, [collectionId]);

  return (
    <div>
      <Header
        theme={theme}
        setTheme={setTheme}
        titles={titles}
        fullData={data}
        etherPrice={ethPrice.data[1].quote.USD.price}
      />
      <CollectionData
        bannerImageUrl={
          collection == undefined ? "" : collection.bannerImageUrl
        }
        imageUrl={collection == undefined ? "" : collection.imageUrl}
        title={collection == undefined ? "" : collection.title}
        company={collection == undefined ? "" : collection.company}
        description={collection == undefined ? "" : collection.description}
        // nfts={nfts == undefined ? [] : nfts}
        allOwners={collection == undefined ? [] : collection.allOwners}
        volumeTraded={volumeData == undefined ? "" : totalVolume}
        listings={listings == undefined ? [] : listings}
      />
      <Footer />
    </div>
  );
}

export default Collection;
