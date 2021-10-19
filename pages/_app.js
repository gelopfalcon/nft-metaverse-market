import '../styles/globals.css'
import styles from '../styles/Home.module.css'
import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import Link from 'next/link';
import Web3Modal from "web3modal";

function MyApp({ Component, pageProps }) {
  const [currentAccount, setCurrentAccount] = useState("");

  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        console.log("Make sure you have metamask!");
        return;
      } else {
        console.log("We have the ethereum object", ethereum);
      }

      const accounts = await ethereum.request({ method: 'eth_accounts' });

      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log("Found an authorized account:", account);
        setCurrentAccount(account);
        const provider = new ethers.providers.Web3Provider(ethereum);
        provider.getSigner();
      } else {
        console.log("No authorized account found")
      }

    } catch (error) {
      console.log(error);
    }
  }




  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }

      const accounts = await ethereum.request({ method: "eth_requestAccounts" });

      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    checkIfWalletIsConnected();
  }, [])

  return (

    <div>
      {!currentAccount && (
        <div className={styles.container}>
          <button className={styles.walletButton} onClick={connectWallet}>
            <div className={styles.falcondiv}>
              <p className={styles.walletButtonText}> Connect Wallet</p>
            </div>
          </button>
        </div>
      )}



      {currentAccount && (
        <main>
          <nav className="border-b p-6">
            <p className="text-4xl font-bold">Indie Gallery</p>
            <div className="flex mt-4">
              <Link href="/">
                <a className="mr-4 text-pink-500">
                  Home
            </a>
              </Link>
              <Link href="/create-token">
                <a className="mr-6 text-pink-500">
                  Sell Digital Asset
            </a>
              </Link>
              <Link href="/my-nfts">
                <a className="mr-6 text-pink-500">
                  My Digital NFTs
            </a>
              </Link>
              <Link href="/creator-dashboard">
                <a className="mr-6 text-pink-500">
                  Creator Dashboard
            </a>
              </Link>
            </div>
          </nav>
        </main>
      )}

      <Component {...pageProps} />
    </div>
  )
}

export default MyApp
