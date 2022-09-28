import React, {useRef, useState, useEffect} from 'react'
import {useSDK} from "@thirdweb-dev/react"
import {useAddress} from "@thirdweb-dev/react"
import { useNFTCollection } from '@thirdweb-dev/react'
import {client} from "../../lib/sanityClient"
import toast, { Toaster } from 'react-hot-toast'
import MoonLoader from "react-spinners/MoonLoader";
import { usePromiseTracker } from "react-promise-tracker";
import { trackPromise} from 'react-promise-tracker';
import { useRouter } from 'next/router'

function CreateNewItem() {

    const address = useAddress()

    const [banner, setBanner] = useState() 
    const [avatar, setAvatar] = useState()
    const [avatarAsset, setAvatarAsset] = useState();
    const [bannerAsset, setBannerAsset] = useState();
    const [nfts, setNfts] = useState([])
    const [collectionName, setCollectionName] = useState("")  
    const [finalCollectionName, setFinalCollectionName] = useState("")  
    const [collectionDescription, setCollectionDescription] = useState("") 
    const [finalCollectionDescription, setFinalCollectionDescription] = useState("") 
    const [royaltyFees, setRoyaltyFees] = useState()
    const [nftsText, setNftsText] = useState([])
    const [avatarText, setAvatarText] = useState()
    const [bannerText, setBannerText] = useState()
    const [thirdWebAddress, setThirdWebAddress] = useState()
    const [deployedCollection, setDeployedCollection] = useState(false)

    const { promiseInProgress } = usePromiseTracker();
    const router = useRouter()

    const collectionCreation = (toastHandler = toast) =>
    toastHandler.success(`Collection created successfully!`, {
    style: {
      background: '#04111d',
      color: '#fff',
    },
    })

    const nftsPopulated = (toastHandler = toast) =>
    toastHandler.success(`NFTs added successfully!`, {
    style: {
      background: '#04111d',
      color: '#fff',
    },
    })

    const handleChange = event => {
        const fileUploaded = event.target.files[0];
        setBanner(fileUploaded)
    }


    const handleAvatarChange = async (event) => {
        const fileUploaded = event.target.files[0];
        await setAvatar(fileUploaded)
    }


    const handleNftsChange = event => {
        const fileUploaded = event.target.files;
        setNfts(fileUploaded)
    }

    const sdk = useSDK()


    const deployCollection = async () => {

        if (!address) return

        setFinalCollectionDescription(collectionDescription)
        setFinalCollectionName(collectionName)
        
        const contractAddress = await sdk.deployer.deployNFTCollection({
            name: collectionName,
            primary_sale_recipient: address
        })
        setDeployedCollection(true)
        setThirdWebAddress(contractAddress)
        collectionCreation()
        
    }

    const nftCollection = deployedCollection ? useNFTCollection(thirdWebAddress) : undefined

    const populateCollection = async () => {
      if (nftCollection !== undefined) {
        if (royaltyFees !== undefined) {
          nftCollection.royalties.setDefaultRoyaltyInfo({
            seller_fee_basis_points: royaltyFees*100,
            fee_recipient: address
          })
        }

        const metadatas = []

        if (nfts !== undefined) {
          for (let i=0; i<nfts.length; i++) {
            const obj = {
              name: nfts[i].name.slice(0,-4),
              image: nfts[i]
            }
            metadatas.push(obj)
          }
        }

        const tx = await nftCollection.mintBatchTo(address, metadatas)
        const receipt = tx[0].receipt
        setDeployedCollection(false)

        uploadImages()
        nftsPopulated()
      }
    }

    useEffect(() => {
      if (nfts !== undefined) {
        const filesArray = []
        for (let i=0; i<nfts.length; i++) {
          let text = `Uploaded ${nfts[i].name}...`
          filesArray.push(text)
        }
        setNftsText(filesArray)
      }
    }, [nfts])

    useEffect(() => {
      if (avatar !== undefined) { 
        let text = `Uploaded ${avatar.name}...`
        setAvatarText(text)
      }
    }, [avatar])


    useEffect(() => {
      if (banner !== undefined) { 
        let text = `Uploaded ${banner.name}...`
        setBannerText(text)
      }
    }, [banner])



    function uploadImages() {
      if (avatar !== undefined && banner !== undefined) {
        client.assets
          .upload("image", avatar, {
            contentType: avatar.type,
            filename: avatar.name,
          })
          .then((document) => {
            setAvatarAsset(document);
          });
    
        client.assets
          .upload("image", banner, {
            contentType: banner.type,
            filename: banner.name,
          })
          .then((document) => {
            setBannerAsset(document);
          });
      }
    }

    const saveImage = async () => {
        if (bannerAsset?._id && avatarAsset?._id) {
          const doc = {
            _type: "marketItems",
            _id: thirdWebAddress,
            title: finalCollectionName,
            contractAddress: thirdWebAddress,
            description: finalCollectionDescription,
            company: address,
            profileImage: {
              _type: "image",
              asset: {
                _type: "reference",
                _ref: avatarAsset?._id,
              },
            },
            bannerImage: {
              _type: "image",
              asset: {
                _type: "reference",
                _ref: bannerAsset?._id,
              },
            },
          };
          client.create(doc);
        }
    };

    useEffect(() => {
        saveImage();
      }, [bannerAsset, avatarAsset]);

  return (
    <div className="font-poppins w-full">
      <Toaster position="top-center" reverseOrder={false} />
        <h1 className="text-[28px] my-[30px] text-center font-bold">Create Your Own Collection</h1>
        <div className="mb-[15px] max-w-[600px] mx-auto">
            <p className="text-[12px] text-[rgba(0,0,0,0.6)] dark:text-[rgba(255,255,255,0.4)]"><span className="text-[red] mr-[5px]">*</span>Required fields</p>
        </div>
        <div className="w-full flex flex-col items-center justify-center">
            <div className="mb-[20px] w-full flex flex-col items-center">
                <div className="max-w-[600px] w-full">
                    <h2 className="font-semibold mb-[10px]">Collection Name<span className="ml-[5px] text-[red]">*</span></h2>
                    <input onChange={(e) => setCollectionName(e.target.value)} className="w-full h-[48px] dark:border-none border-2 rounded-lg p-[10px] outline-none" placeholder="Collection Name"></input>
                </div>
            </div>
            <div className="mb-[20px] w-full flex flex-col items-center">
            <div className="max-w-[600px] w-full">
                <h2 className="font-semibold mb-[10px]">Collection Description<span className="ml-[5px] text-[red]">*</span></h2>
                <input onChange={(e) => {setCollectionDescription(e.target.value)}} className="w-full dark:border-none h-[48px] border-2 rounded-lg p-[10px] outline-none" placeholder="Collection Description"></input>
            </div>
            </div>
            <div className="mb-[20px] w-full flex flex-col items-center">
            <div className="max-w-[600px] w-full">
                <h2 className="font-semibold mb-[10px]">Royalty Fees</h2>
                <input onChange={(e) => setRoyaltyFees(e.target.value)} className="w-full h-[48px] dark:border-none border-2 rounded-lg p-[10px] outline-none" placeholder="Fees percentage (e.g. 0.5)"></input>
            </div>
            </div>
            <div className="mb-[20px] w-full flex flex-col items-center">
                <div className="max-w-[600px] w-full">
                    <h2 className="font-semibold mb-[10px]">Banner Image<span className="ml-[5px] text-[red]">*</span></h2>
                    <p className="dark:text-[rgba(255,255,255,0.4)] text-[13px] text-[rgba(0,0,0,0.5)] mb-[5px]">File types supported: JPG, PNG, GIF, SVG. Max size: 100 MB</p>
                        <input type="file" onChange={handleChange}/>
                        <div className="text-black dark:text-white mt-[10px]">
                          {bannerText}
                        </div>
                </div>
            </div>
            <div className="mb-[20px] w-full flex flex-col items-center">
                <div className="max-w-[600px] w-full">
                    <h2 className="font-semibold mb-[10px]">Avatar Image<span className="ml-[5px] text-[red]">*</span></h2>
                    <p className="dark:text-[rgba(255,255,255,0.4)] text-[13px] text-[rgba(0,0,0,0.5)] mb-[5px]">File types supported: JPG, PNG, GIF, SVG. Max size: 100 MB</p>
                        <input type="file" onChange={handleAvatarChange}/>
                        <div className="text-black dark:text-white mt-[10px]">
                          {avatarText}
                        </div>
                </div>
            </div>
            <button onClick={() => {trackPromise(deployCollection())}} className="flex items-center justify-center bg-[gray] hover:bg-[#a0a0a0] transition-all duration-[400ms] text-white w-full rounded-lg p-[10px] max-w-[600px] mb-[40px] mt-[20px]">
                    {!promiseInProgress && <p>Create Collection</p>}
                    {promiseInProgress && <MoonLoader size={19} color={"#ffff"}/>}
            </button>
            <div className="mb-[40px] w-full flex flex-col items-center">
                <div className="max-w-[600px] w-full">
                    <h2 className="font-semibold mb-[10px]">NFT Images<span className="ml-[5px] text-[red]">*</span></h2>
                    <p className="dark:text-[rgba(255,255,255,0.4)] text-[13px] text-[rgba(0,0,0,0.5)] mb-[5px]">File types supported: JPG, PNG, GIF, SVG. Max size: 100 MB</p>
                    <p className="dark:text-[rgba(255,255,255,0.4)] text-[13px] text-[rgba(0,0,0,0.5)] mb-[5px]">Change the name of your files to match the IDs of the NFTs!</p>
                        <input type="file" multiple="multiple" onChange={(event) => handleNftsChange(event)}/>
                    <div className="text-black dark:text-white">
                      {nftsText === undefined ? "" : nftsText.map(text => (
                        <p>{text}</p>
                      ))}
                    </div>
                </div>
            </div>
            {deployedCollection &&  <button onClick={() => {trackPromise(populateCollection())}} className="bg-[rgb(79,21,255)] hover:bg-[rgb(103,59,236)] transition-all duration-[400ms] text-white w-full rounded-lg p-[10px] max-w-[600px] mb-[40px] flex items-center justify-center">
                    {!promiseInProgress && <p>Populate collection with NFTs</p>}
                    {promiseInProgress && <MoonLoader size={19} color={"#ffff"}/>}
            </button>}
            {!deployedCollection && <button disabled className="cursor-not-allowed bg-[#fc4646] transition-all duration-[400ms] text-white w-full rounded-lg p-[10px] max-w-[600px] mb-[40px]">
                    Please create your collection to add NFTs...
            </button>}
        </div>
    </div>
  )
}

export default CreateNewItem