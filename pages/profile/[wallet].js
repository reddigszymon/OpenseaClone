import React, { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import UserImages from "../../components/Profile/UserImages";
import UserInfo from "../../components/Profile/UserInfo";
import { client } from "../../lib/sanityClient";
import { useNFTCollection } from "@thirdweb-dev/react";
import { useRouter } from "next/router";
import { useAddress } from "@thirdweb-dev/react";
import { useMarketplace } from "@thirdweb-dev/react";

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

  const data = await client.fetch(query);
  const userData = await client.fetch(userQuery);
  return {
    props: {
      data,
      userData,
    },
  };
}

function profile({ data, userData }) {
  const [nfts, setNfts] = useState([]);
  const [iter, setIter] = useState(0);
  const [allNfts, setAllNfts] = useState([]);
  const [canRender, setCanRender] = useState(false);
  const [listings, setListings] = useState();

  const router = useRouter();
  const { wallet } = router.query;
  const address = useAddress();

  const marketplace = useMarketplace(
    "0x1De7A966aa3FC7d43bfA7Ae450AEF02600E9d5Db"
  );

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
  }, [nfts]);

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
  }, [address]);

  return (
    <div>
      <Header />
      <UserImages userData={userData} />
      <UserInfo nfts={allNfts} listings={listings} userData={userData} />
    </div>
  );
}

export default profile;
