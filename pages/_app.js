import "../styles/globals.css";
import { ThirdwebWeb3Provider } from "@3rdweb/hooks";
import { ThemeProvider } from "next-themes";

const supportedChainIds = [5];
const connectors = {
  injected: {},
};

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider attribute="class">
      <ThirdwebWeb3Provider
        supportedChainIds={supportedChainIds}
        connectors={connectors}
      >
        <Component {...pageProps} />
      </ThirdwebWeb3Provider>
    </ThemeProvider>
  );
}

export default MyApp;
