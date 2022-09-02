import React from 'react'
import TransferDiv from './TransferDiv'

function ActivityCard() {
  return (
    <div className="bg-[#fbfdff] pb-[10px]">
        <div className="flex p-[20px] text-[14px] w-[580px] bg-white border-[1px] lg:w-[650px]">
            <div className="w-[130px]">Event</div>
            <div className="w-[130px]">Price</div>
            <div className="w-[130px]">From</div>
            <div className="w-[130px]">To</div>
            <div className="w-[130px]">Date</div>
          </div>
        <TransferDiv price={89} from="0x5F13c" to="SohrobVault" date="1 month ago"/>
        <TransferDiv price={92} from="DoodleWhale" to="Giancarlo" date="1 month ago"/>
        <TransferDiv price={88} from="13D8FA" to="0xNotorious77" date="2 months ago"/>
        <TransferDiv price={90} from="jkoss_vault" to="Pranksy" date="1 months ago"/>
        <TransferDiv price={103} from="D2BEDA" to="zacf" date="3 months ago"/>
    </div>
  )
}

export default ActivityCard