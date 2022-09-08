import React from "react";
import { useRouter } from "next/router";
import { useMemo, useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import { client } from "../../lib/sanityClient";
import CollectionData from "../../components/Collections/CollectionData";
import { useTheme } from "next-themes";
import { useMarketplace } from "@thirdweb-dev/react";
import { useNFTCollection } from "@thirdweb-dev/react";
import axios from "axios";

function Collection() {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const { collectionId } = router.query;
  const [nfts, setNfts] = useState([]);
  const [listings, setListings] = useState([]);
  const [collection, setCollection] = useState([]);
  const [volumeData, setVolumeData] = useState([]);
  const [totalVolume, setTotalVolume] = useState(0);

  const marketplace = useMarketplace(
    "0x1De7A966aa3FC7d43bfA7Ae450AEF02600E9d5Db"
  );

  const fetchVolume = async () => {
    axios
      .get(
        `https://api-goerli.etherscan.io/api?module=account&action=txlist&contractaddress=${collectionId}&address=0x1De7A966aa3FC7d43bfA7Ae450AEF02600E9d5Db&startblock=0&endblock=99999999&sort=asc&apikey=JSNPEK1KPZ7Z7NEP2URAQX4DF2K2EFS17K`
      )
      .then((res) => setVolumeData(res.data.result));
  };

  useEffect(() => {
    fetchVolume();
  }, []);

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
  }, []);

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
  }, []);

  return (
    <div>
      <Header theme={theme} setTheme={setTheme} />
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
    </div>
  );
}

export default Collection;
