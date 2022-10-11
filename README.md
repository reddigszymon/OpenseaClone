# Opensea Clone

A fully responsive, functional and graphically pleasing clone of the most popular NFT marketplace. Gives you the ability to browse, sell, purchase NFTs and even create your own collections at the push of one button.

![Logo](https://scontent-vie1-1.xx.fbcdn.net/v/t1.15752-9/309720161_3337564136472572_3293559803973002809_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=ae9488&_nc_ohc=kx2_dCE15rsAX81Sn_Z&_nc_ht=scontent-vie1-1.xx&oh=03_AVKhUSUiKXRBoHPGWEbhBWXfVMELB2nylOygj2FMqHNdtQ&oe=6359B5AC)

# [Live Demo](https://opensea-clone-pqk6.vercel.app/)

### White Mode

![App Screenshot]([https://im5.ezgif.com/tmp/ezgif-5-1e825470cd.webp](https://scontent-vie1-1.xx.fbcdn.net/v/t1.15752-9/310862137_507299590925032_4585193234279014187_n.png?_nc_cat=107&ccb=1-7&_nc_sid=ae9488&_nc_ohc=iek7NjOJeVcAX80zCdT&_nc_ht=scontent-vie1-1.xx&oh=03_AVIV-Te3CJaqD2NEPZ2plG5sMzBkyLTUsbx4EHINKLeVCQ&oe=636C4543))

### Dark Mode

![App Screenshot]([https://im5.ezgif.com/tmp/ezgif-5-eab2c7ac63.webp](https://scontent-vie1-1.xx.fbcdn.net/v/t1.15752-9/310605803_684893619222074_6202230475256099787_n.png?_nc_cat=104&ccb=1-7&_nc_sid=ae9488&_nc_ohc=igSHAcnXbnkAX9mSOLx&_nc_ht=scontent-vie1-1.xx&oh=03_AVLPPjgIhHUI3KkCnujhr2V2PLeO-mWT9E1WZXhgKbM0ng&oe=636AFABB))

## Installation

Clone the repository

```bash
  git clone https://github.com/reddigszymon/OpenseaClone.git
```

Change the path to projects directory and install packages with yarn install

```bash
cd OpenseaClone
yarn install
```

Open up a second terminal, change the directory to studio and install remaining packages with yarn install

```bash
cd studio
yarn install
```

To run this project, you will need to add the following environment variables to your .env.local file

`NEXT_PUBLIC_SANITY_PROJECT_ID` - project Id of your sanity project

`NEXT_PUBLIC_SANITY_TOKEN` - token of your sanity project

`NEXT_PUBLIC_CMC_API_KEY` - coinmarketcap API key

`NEXT_PUBLIC_GOERLI_KEY` - etherscan goerli API key

After the environment variables have been added, you can run start the project by running

```bash
yarn dev
```

in your main directory and

```bash
sanity start
```

in your studio directory.

## Features

- Light/dark mode toggle
- Browse your favourite NFT collections
- Purchase NFTs, sell your NFTs and cancel your own listings
- Fully functional on the Goerli Ethereum Testnet
- Create your own collections
- Check your wallet balance in both Ethereum and USD
- Track all of the NFTs you own
- Ability to favourite NFTs
- Working Search Bar
- Edit your profile avatar and banner

## Create your own collection

First upload head to the Create tab, fill out the Collection Name, Collection Description and upload the Banner Image and The Avatar Image of the NFT collection.

After that hit _Create Collection_. After the Collection has been created, upload all the NFTs - please name every single NFT using the ID of the NFT. After you upload all the NFTs hit _Populate Collection with NFTs_!

![App Screenshot](https://im5.ezgif.com/tmp/ezgif-5-3d89b7764d.gif)

Remember to connect your metamask wallet and accept the incoming signatures.

After this process you should see the NFTs appear in your profile, and the NFT collections under _Collections_.

## Project assistance

If you want to say **thank you** and/or support active development of `OpenSea Clone` please add a github star to the project!
