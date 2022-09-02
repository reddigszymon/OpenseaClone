import React, { useState, useMemo } from "react";
import { useRouter } from "next/router";
import Header from "../../components/Header/Header";
import { useTheme } from "next-themes";
import fetchNfts from "../../hooks/fetchNfts";
import fetchListings from "../../hooks/fetchListings";
import NFTPageSmall from "../../components/Nfts/NFTPageSmall";
import NFTPageLarge from "../../components/Nfts/NFTPageLarge";
import { client } from "../../lib/sanityClient";
import Footer from "../../components/Footer/Footer";

function nftPage() {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const nftInfo = router.query;
  const { isListed, collectionAddress, id } = nftInfo;
  const [nfts, setNfts] = useState([]);
  const [listings, setListings] = useState([]);
  const [collection, setCollection] = useState([]);
  const [user, setUser] = useState("");

  async function getNfts() {
    const fetchedNfts = await fetchNfts(collectionAddress);
    await setNfts(fetchedNfts);
  }

  async function getListings() {
    const fetchedListings = await fetchListings();
    await setListings(fetchedListings);
  }

  getNfts();
  getListings();

  const nft = nfts.filter((nft) => nft.metadata.name === id);
  const listing = listings.filter((listing) => listing.asset.name === id);

  const fetchCollectionData = async () => {
    const query = `*[_type == "marketItems" && contractAddress == "${collectionAddress}"] {
      "imageUrl": profileImage.asset->url,
       title,
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
  }, [owner]);

  return (
    <>
      <Header theme={theme} setTheme={setTheme} />
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
