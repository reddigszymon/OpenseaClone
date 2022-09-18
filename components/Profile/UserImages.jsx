import React, {useEffect, useState} from 'react'
import {FiEdit2} from "react-icons/fi"
import {client} from "../../lib/sanityClient"
import { useRouter } from "next/router";
import {useAddress, useMetamask} from "@thirdweb-dev/react"

function UserImages({userData}) {
  const [showBannerEdit, setShowBannerEdit] = useState(false)
  const [showAvatarEdit, setShowAvatarEdit] = useState(false)
  const [newBannerAsset, setNewBannerAsset] = useState()
  const [newAvatarAsset, setNewAvatarAsset] = useState()
  const [activeBanner, setActiveBanner] = useState(userData[0].bannerUrl)
  const [activeAvatar, setActiveAvatar] = useState(userData[0].imageUrl)
  const [isOwner, setIsOwner] = useState(false)

  const address = useAddress()
  const router = useRouter();
  const { wallet } = router.query;


  useEffect(() => {
    if (wallet === address) {
      setIsOwner(true)
    }
  }, [address])

  const handleEditBanner = async (event) => {
    setActiveBanner(URL.createObjectURL(event.target.files[0]))
      client.assets
        .upload("image", event.target.files[0], {
          contentType: event.target.files[0].type,
          filename: event.target.files[0].name,
        })
        .then((document) => {
          setNewBannerAsset(document);
        });
  }

  
  const handleEditAvatar = async (event) => {
    setActiveAvatar(URL.createObjectURL(event.target.files[0]))
      client.assets
        .upload("image", event.target.files[0], {
          contentType: event.target.files[0].type,
          filename: event.target.files[0].name,
        })
        .then((document) => {
          setNewAvatarAsset(document);
        });
  }

  useEffect(() => {
    if (newAvatarAsset !== undefined) {
      client.patch(wallet).set({profileImage: {
        _type: "image",
        asset: {
          _type: "reference",
          _ref: newAvatarAsset._id
        }
      }}).commit()
    }
  }, [newAvatarAsset])

  useEffect(() => {
    if (newBannerAsset !== undefined) {
      client.patch(wallet).set({bannerImage: {
        _type: "image",
        asset: {
          _type: "reference",
          _ref: newBannerAsset._id
        }
      }}).commit()
    }
  }, [newBannerAsset])

  return (
    <div className="relative">
        <div onMouseEnter={() => setShowBannerEdit(true)} onMouseLeave={() => setShowBannerEdit(false)} className="relative w-screen h-auto relative max-h-[300px] overflow-hidden ">
            <img className="w-full hover:brightness-90" src={activeBanner === null ? "https://images.squarespace-cdn.com/content/v1/5e0fce2e4e593e7ac10fc6af/1586041124068-SHJTFXJ42RR8X5SGXH3F/Light+Gray+Banner.png?format=2500w" : activeBanner} />
            <input type="file" className="hidden" id="contained-button-file" onChange={(event) => handleEditBanner(event)} />
            {showBannerEdit && 
            <label htmlFor='contained-button-file'>
              {isOwner && 
              <FiEdit2 className="absolute top-[50%] left-[50%] cursor-pointer" />
              
              }
            </label>
            }
        </div>
            <div onMouseEnter={() => setShowAvatarEdit(true)} onMouseLeave={() => setShowAvatarEdit(false)} className="rounded-full overflow-hidden h-[82px] w-[82px] md:w-[120px] md:h-[120px] lg:h-[160px] lg:w-[160px] border-[5px] border-white dark:border-[rgb(53,56,64)] shadow-sm absolute top-[60%] left-[4%] md:top-[50%] lg:top-[40%]">
              <img className="relative hover:brightness-90" src={activeAvatar === null ? "https://storage.googleapis.com/opensea-static/opensea-profile/22.png" : activeAvatar}/>
              <input type="file" className="hidden" id="avatar-button-file" onChange={(event) => handleEditAvatar(event)} />
              {showAvatarEdit && 
              <label htmlFor='avatar-button-file'>
                {isOwner && 
                <FiEdit2 className="absolute top-[48%] left-[45%] cursor-pointer" />
                }
              </label>
            }
            </div>
    </div>
  )
}

export default UserImages