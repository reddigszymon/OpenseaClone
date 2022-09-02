import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { useMemo, useState } from "react";
import { useWeb3 } from "@3rdweb/hooks";

export default function fetchListingsAndNfts(collectionAddress) {
  const [nfts, setNfts] = useState([]);
  const { provider } = useWeb3();

  const goerliKey = process.env.GOERLI_API_KEY;

  function getNftCollection() {
    if (provider == undefined) return;
    const sdk = ThirdwebSDK.fromSigner(provider.getSigner(), goerliKey);
    return sdk.getNFTCollection(collectionAddress);
  }

  const nftCollection = getNftCollection();

  useMemo(() => {
    if (nftCollection == undefined) return;
    nftCollection.getAll().then((res) => setNfts(res));
  }, [provider]);

  return nfts;
}
