import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './App.css';

import { Provider } from 'react-redux';
import { MoralisProvider } from 'react-moralis';
import store from './store';

import FooterBar from './components/Layout/FooterBar';
import HeaderBar from './components/Layout/HeaderBar';
import SiderBar from './components/Layout/SiderBar';
import Landing from './components/Layout/Landing';
import Buyer from './components/Dashboard/Buyer';
import Seller from './components/Dashboard/Seller';
import Escrown from './components/Dashboard/Escrown';
import web3 from 'web3';

function App() {
	const [ chainId, setChainId ] = useState();
	useEffect(() => {
		const interval = setInterval(() => {
			window.localStorage.setItem('chainId', parseInt(web3.givenProvider.chainId, 16));
			window.localStorage.setItem('userAddress', web3.givenProvider.selectedAddress);
			setChainId(window.localStorage.getItem('chainId'));
		}, 1000);
		return () => clearInterval(interval);
	}, []);
	return (
		<MoralisProvider
			serverUrl="https://1kzo6n3g9tyb.usemoralis.com:2053/server"
			appId="pyeo31gKHlNSCU0fDjA9MiXDDyIZW1nRCi9KwMYt"
		>
			<Provider store={store}>
				<Router>
					<HeaderBar />
					{/* <Alert /> */}

					<div className="App">
						<Routes>
							<Route path="/" element={<Landing />} />

							<Route path="/buyer" element={<Buyer />} />
							<Route path="seller" element={<Seller />} />
							<Route path="escrown" element={<Escrown />} />
						</Routes>
					</div>
				</Router>
			</Provider>
		</MoralisProvider>
	);
}

export default App;
