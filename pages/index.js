import Header from "../components/Header/Header";
import { useTheme } from "next-themes";
import Hero from "../components/Hero/Hero";
import NotableDrops from "../components/NotableDrops/NotableDrops";
import TopCollections from "../components/TopCollections/TopCollections";
import MeetOpensea from "../components/MeetOpensea/MeetOpensea";
import Footer from "../components/Footer/Footer";
import { useEffect } from "react";
import { client } from "../lib/sanityClient";
import { useAddress } from "@thirdweb-dev/react";

export default function Home() {
  const account = useAddress();
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    if (!account) return;
    const addAddress = async () => {
      const userDoc = {
        _type: "users",
        _id: account,
        userName: "Unnamed",
        walletAddress: account,
      };
      const result = await client.createIfNotExists(userDoc);
    };
    addAddress();
  }, [account]);

  return (
    <div className="relative w-full h-screen dark:bg-[#202225]">
      <div>
        <Header theme={theme} setTheme={setTheme} />
        <Hero theme={theme} setTheme={setTheme} />
        <NotableDrops theme={theme} setTheme={setTheme} />
        <TopCollections theme={theme} setTheme={setTheme} />
        <MeetOpensea theme={theme} setTheme={setTheme} />
        <Footer theme={theme} setTheme={setTheme} />
      </div>
    </div>
  );
}
