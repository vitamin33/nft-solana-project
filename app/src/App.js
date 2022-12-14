import React, {useEffect, useState} from "react";
import "./App.css";
import twitterLogo from "./assets/twitter-logo.svg";
import luggageLogo from "./assets/air_luggage.png";
import CandyMachine from "./CandyMachine"

// Constants
const TWITTER_HANDLE = "B_serbin";
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;

const App = () => {
	const [walletAddress, setWalletAddress] = useState(null)
	const checkIfWalletIsConnected = async () => {
		try {
			const {solana} = window;
			if (solana) {
				if (solana.isPhantom) {
					const response = await solana.connect({
						onlyIfTrusted: true
					})
					console.log("Connect with public key: ", response.publicKey.toString())

					setWalletAddress(response.publicKey.toString())
				}
			} else {
				alert("Solana wallet not found! Please install Phantom wallet.")
			}
		} catch (e) {
			console.log(e)
		}
	}
	const connectWallet = async () => {
		const {solana} = window;
		if (solana) {
			const response = await solana.connect()
			console.log('Connected with public key: ', response.publicKey.toString())
			setWalletAddress(response.publicKey.toString())
		}
	}
	const renderNotConnectedContainer = () => {
		return <button
			className="cta-button, connect-wallet-button"
			onClick={() => connectWallet()}
		>Connect wallet</button>
	}
	useEffect(() => {
		const onLoad = async () => {
			await checkIfWalletIsConnected()
		}
		window.addEventListener('load', onLoad)
		return () => window.removeEventListener('load', onLoad)
	}, [])


	return (
		<div className="App">
			<div className="container">
				<div className="header-container">
					<img
						alt="Luggage Logo"
						width={100} height={100}
						className="luggage-logo"
						src={luggageLogo}
					/>
					<p className="header">Luggage Drop</p>
					<p className="sub-text">NFT drop machine with fair mint</p>
					{!walletAddress && renderNotConnectedContainer()}
				</div>
				{walletAddress && (
					<CandyMachine walletAddress={window.solana}/>
				)}
				<div className="footer-container">
					<img
						alt="Twitter Logo"
						className="twitter-logo"
						src={twitterLogo}
					/>
					<a
						className="footer-text"
						href={TWITTER_LINK}
						target="_blank"
						rel="noreferrer"
					>{`Adapted from @${TWITTER_HANDLE}`}</a>
				</div>
			</div>
		</div>
	);
};

export default App;
