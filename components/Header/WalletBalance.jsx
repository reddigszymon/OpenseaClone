import React from 'react'
import axios from 'axios'
import { formatEther } from "@ethersproject/units";
import {IoIosArrowBack} from "react-icons/io"
import greenCircle from "../../assets/greenCircle.png"
import Image from "next/image"
import {useWeb3React} from "@web3-react/core"
import {useState, useEffect, useRef} from "react"
import {FaEthereum} from 'react-icons/fa'
import {BsThreeDotsVertical} from 'react-icons/bs'
import {IoIosCopy} from 'react-icons/io'
import {AiOutlinePlusCircle} from 'react-icons/ai'
import AddFundsComponent from './AddFundsComponent'
import { useWeb3 } from "@3rdweb/hooks"
import {useAddress, useSDK} from "@thirdweb-dev/react"


function WalletBalance({ setWalletOpen}) {
    // const [ethBalance, setEthBalance] = useState()
    const [ethPrice, setEthPrice] = useState()
    const [showCopy, setShowCopy] = useState(false)
    const [openSlide, setopenSlide] = useState("")
    const [showAddFunds, setShowAddFunds] = useState(false);
    const [balance, setBalance] = useState(0)

    // const {address, balance} = useWeb3()
    const sdk = useSDK()
    async function getBalance() {
        const myBalance = await sdk.wallet.balance();
        setBalance(myBalance.displayValue)
    }

    useEffect(() => {
        if (!sdk) return
        getBalance()
    }, [address])

    const address = useAddress()

    const styles = {
        wrapper: `absolute h-full w-full`,
        topContainer: `flex justify-between items-center px-[15px] py-[25px] border-b-[1px] dark:border-black`,
        topContainerLayout: `flex items-center relative`,
        arrowBack: `text-[24px] cursor-pointer`,
        imageContainer: `relative overflow-hidden rounded-full w-[26px] h-[26px] ml-[10px]`,
        wallet: `text-[16px] font-semibold font-poppins ml-[10px]`,
        accountAddress: `font-poppins text-[15px] text-[gray] font-medium cursor-pointer`,
        balanceContainer: `dark:border-black m-[15px] mt-[25px] flex justify-between items-center flex-col border-[1px] rounded-lg overflow-hidden`,
        totalBalanceContainer: `text-center mt-[10px] mb-[20px]`,
        totalBalance: `text-[14px] font-poppins text-[gray] font-medium`,
        totalBalanceUsd: `text-[20px] font-poppins font-semibold`,
        addFundsButton: `bg-[rgb(46,142,238)] hover:bg-[#3895f2] text-white w-full h-[60px] font-bold text-[18px] border-0`,
        ethBalance: `z-100 dark:border-black flex justify-between items-center m-[15px] mb-0 border-[1px] rounded-lg overflow-hidden p-[15px]`,
        etherumLogo: `text-[22px]`,
        etherumText: `ml-[15px]`,
        bigEth: `text-[14px] font-semibold font-poppins`,
        fullEth: `font-poppins text-[14px] text-[gray]`,
        ethBalanceRight: `mr-[15px]`,
        ethAmountRight: `text-end font-poppins font-semibold text-[14px]`,
        usdAmountRight: `font-poppins text-[14px]`,
        threeDots: `text-[18px] cursor-pointer`,
        copyBox: `absolute left-[40%] top-[-100%] text-[20px] text-black dark:text-[#828282]`,
        addEthDiv: `dark:bg-[#303339] flex items-center justify-end  mx-[15px] p-[15px] rounded-lg w-[120px] ml-auto mt-0 cursor-pointer`

    }

    console.log(balance)
    const catMenu = useRef(null)

    // useEffect(() => {
    //     setEthBalance(balance)
    // }, [address])


    async function fetchEthPrice() {
        try {
            let res = await axios.get('http://localhost:4000').then(response => setEthPrice(response.data.data[1].quote.USD.price))
        } catch (error) {
            console.log(error)
        }
    }

    fetchEthPrice()

    const closeOpenMenus = (e)=>{
        if(catMenu.current && openSlide && !catMenu.current.contains(e.target)){
          setopenSlide(false)
        }
    }

    document.addEventListener('mousedown',closeOpenMenus)


  return (
    <>
    <div className={styles.wrapper}>
        <div className={styles.topContainer}>
            <div className={styles.topContainerLayout}>
                <IoIosArrowBack className={styles.arrowBack} onClick={() => setWalletOpen(false)}/>
                <div className={styles.imageContainer}>
                    <Image layout='fill' objectFit='cover' src={greenCircle}  />
                </div>
                <h2 className={styles.wallet}>My Wallet</h2>
            </div>
            <div className="relative">
                <p className={styles.accountAddress} onMouseEnter={() => setShowCopy(true)} onMouseLeave={() => setShowCopy(false)} onClick={() =>  navigator.clipboard.writeText(address)} >{address.slice(0,6)+'...'+address.slice(38,42)}</p>
                {showCopy && <IoIosCopy className={styles.copyBox}/>}
            </div>
        </div>
        <div className={styles.balanceContainer}>
            <div className={styles.totalBalanceContainer}>
                <p className={styles.totalBalance}>Total balance</p>
                <h3 className={styles.totalBalanceUsd}>{ethPrice === undefined ? "..." : "$" + (balance.formatted*ethPrice).toFixed(2) + " " + "USD"}</h3>
            </div>
            <button className={styles.addFundsButton} onClick={() => setShowAddFunds(true)}>Add Funds</button>
        </div>
        <div className={styles.ethBalance}>
            <div className={styles.topContainerLayout}>
                <FaEthereum className={styles.etherumLogo}/> 
                <div className={styles.etherumText}>
                    <h2 className={styles.bigEth}>ETH</h2>
                    <p className={styles.fullEth}>Etherum</p>
                </div>
            </div>
            <div className={styles.topContainerLayout}>
                <div className={styles.ethBalanceRight}>
                    <h2 className={styles.ethAmountRight}>{balance === undefined ? "..." : parseFloat(balance).toFixed(4)}</h2>
                    <p className={styles.usdAmountRight}>{ethPrice === undefined ? "..." : "$" + (ethPrice*balance.formatted).toFixed(2) + " " + "USD"}</p>
                </div>
 
                {!openSlide &&<BsThreeDotsVertical className={styles.threeDots} onClick={() => setopenSlide(true)}/>}
                {openSlide &&<BsThreeDotsVertical className={styles.threeDots}/>}
            </div>
        </div>
        {openSlide && <div ref={catMenu} className={styles.addEthDiv} onClick={() => setShowAddFunds(true)}>
                <AiOutlinePlusCircle className="text-[24px]"/>
                <p className="text-[14px] ml-[8px] font-semibold font-poppins">Add ETH</p>
                    </div>}
    </div>
    <div>
        {showAddFunds && <AddFundsComponent setShowAddFunds={setShowAddFunds} address={address} />}
    </div>
    </>
  )
}

export default WalletBalance
