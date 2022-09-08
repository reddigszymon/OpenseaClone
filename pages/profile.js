import React, { useState, useEffect } from "react";
import Header from "../components/Header/Header";
import { useAddress } from "@thirdweb-dev/react";
import { client } from "../lib/sanityClient";

function profile() {
  const address = useAddress();
  const [collection, setCollection] = useState([]);

  const fetchCollectionData = async () => {
    const query = `*[_type == "users" && walletAddress == "${address}"] {
      fav

    }`;

    const collectionData = await client.fetch(query);
    setCollection(collectionData[0]);
  };

  useEffect(() => {
    fetchCollectionData();
  }, [address]);

  console.log(collection);
  return (
    <div>
      <Header />
    </div>
  );
}

export default profile;
