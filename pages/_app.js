import "../styles/globals.css";
import { chainId, ThirdwebProvider } from "@thirdweb-dev/react";
import { ThemeProvider } from "next-themes";
import { ChainId } from "@usedapp/core";

function MyApp({ Component, pageProps }) {
  return (
    <ThirdwebProvider desiredChainId={ChainId.Goerli}>
      <ThemeProvider attribute="class">
        <Component {...pageProps} />
      </ThemeProvider>
    </ThirdwebProvider>
  );
}

export default MyApp;
