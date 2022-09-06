import React from "react";
import { useRouter } from "next/router";
import { useMemo, useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import { client } from "../../lib/sanityClient";
import CollectionData from "../../components/Collections/CollectionData";
import { useTheme } from "next-themes";
import { useMarketplace } from "@thirdweb-dev/react";
import { useNFTCollection } from "@thirdweb-dev/react";

function Collection() {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const { collectionId } = router.query;
  const [nfts, setNfts] = useState([]);
  const [listings, setListings] = useState([]);
  const [collection, setCollection] = useState([]);

  const marketplace = useMarketplace(
    "0x1De7A966aa3FC7d43bfA7Ae450AEF02600E9d5Db"
  );

  const getListings = async () => {
    try {
      const list = await marketplace.getAll();
      setListings(list);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getListings();
  }, []);

  const nftCollection = useNFTCollection(
    "0xa9d524c82a5e5530AE26Ae194f8caCE75C8097F4"
  );

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
      floorPrice,
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

  useMemo(() => {
    fetchCollectionData();
  }, [collectionId]);

  useEffect(() => {
    getNfts();
  }, []);

  console.log(listings);

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
        nfts={nfts == undefined ? [] : nfts}
        allOwners={collection == undefined ? [] : collection.allOwners}
        volumeTraded={collection == undefined ? "" : collection.volumeTraded}
        floorPrice={collection == undefined ? "" : collection.floorPrice}
        listings={listings == undefined ? [] : listings}
      />
    </div>
  );
}

export default Collection;
