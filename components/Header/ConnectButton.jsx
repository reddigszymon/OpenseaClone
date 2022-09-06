import React, { useEffect } from 'react'
import {useWeb3} from "@3rdweb/hooks"
import {useAddress, useMetamask} from "@thirdweb-dev/react"

function ConnectButton() {
    
    // const {address, connectWallet} = useWeb3()
    const address = useAddress()
    const connectWallet = useMetamask()
  return (
    <div>
        {address ? <button className="text-white w-full mx-auto px-10 py-5 rounded-md font-bold text-lg bg-[rgb(31,129,224)] cursor-not-allowed" disabled>Wallet Connected!</button> : <button onClick={() => connectWallet('injected')} className="text-white w-full mx-auto block px-10 py-5 rounded-md font-bold text-lg bg-[rgb(31,129,224)]">Connect Wallet</button>}
    </div>
  )
}

export default ConnectButton