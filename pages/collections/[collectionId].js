import React from "react";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { useWeb3 } from "@3rdweb/hooks";
import { useRouter } from "next/router";
import { useMemo, useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import { client } from "../../lib/sanityClient";
import CollectionData from "../../components/Collections/CollectionData";
import { useTheme } from "next-themes";
import fetchNfts from "../../hooks/fetchNfts";
import fetchListings from "../../hooks/fetchListings";

function Collection() {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const { collectionId } = router.query;
  const { provider } = useWeb3();
  const [nfts, setNfts] = useState([]);
  const [listings, setListings] = useState([]);
  const [collection, setCollection] = useState([]);

  async function getNfts() {
    const fetchedNfts = await fetchNfts(collectionId);
    await setNfts(fetchedNfts);
  }

  async function getListings() {
    const fetchedListings = await fetchListings();
    await setListings(fetchedListings);
  }

  getNfts();
  getListings();

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
    await setCollection(collectionData[0]);
  };

  useMemo(() => {
    fetchCollectionData();
  }, [collectionId]);

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
