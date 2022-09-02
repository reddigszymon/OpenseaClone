import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { useMemo, useState } from "react";
import { useWeb3 } from "@3rdweb/hooks";

export default function fetchListingsAndNfts(collectionId) {
  const { provider } = useWeb3();
  const [listings, setListings] = useState([]);

  const goerliKey = process.env.GOERLI_API_KEY;

  function getNftMarketplace() {
    if (provider == undefined) return;
    const sdk = ThirdwebSDK.fromSigner(provider.getSigner(), goerliKey);
    return sdk.getMarketplace("0x1De7A966aa3FC7d43bfA7Ae450AEF02600E9d5Db");
  }
  const nftMarketplace = getNftMarketplace();

  useMemo(() => {
    if (nftMarketplace == undefined) return;
    nftMarketplace.getAllListings().then((res) => setListings(res));
  }, [provider]);

  return listings;
}
