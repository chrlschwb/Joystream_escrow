import React, { Fragment, useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import meta from '../assets/img/metamask.png';
import avax from '../assets/img/avax.png';
import bnb from '../assets/img/bnb.png';
import bsc from '../assets/img/bsc.png';
import crs from '../assets/img/cronos.png';
import eth from '../assets/img/eth.png';
import wallet from '../assets/img/walletconnect.png';
import pls from '../assets/img/PLS.png';
import disconnect from '../assets/img/disconnect.png';
import polkadot from '../assets/img/polkadot.png';
import web3 from 'web3';
import { useMoralis } from 'react-moralis';
import Moralis from 'moralis';

var netImage = '';
function HeaderBar() {
	const { authenticate, isAuthenticated = false, logout } = useMoralis();
	const { activeState, setActiveState } = useState();

	const loginMetaMask = async () => {
		if (!isAuthenticated) {
			await authenticate({ signingMessage: 'Connect to SaFuTrendzPad' })
				.then(function (user) {
					Moralis.enableWeb3()
						.then((res) => {
							const userAddress = user.attributes.accounts[0];
							window.localStorage.setItem('isAuthenticated', 'true');
							window.localStorage.setItem('userAddress', userAddress);
						})
						.catch((err) => console.log(err));
				})
				.catch(function (error) {
					console.log(error);
				});
		}
	};

	const loginWalletconnect = async () => {
		if (!isAuthenticated) {
			await authenticate({ provider: 'walletconnect' })
				.then(function (user) {
					const userAddress = user.currentProvider.accounts[0];
					window.localStorage.setItem('isAuthenticated', 'true');
					window.localStorage.setItem('userAddress', userAddress);
				})
				.catch(function (error) {
					console.log(error);
				});
		}
	};

	function logOut() {
		window.localStorage.setItem('isAuthenticated', 'false');
		logout();
	}

	switch (window.localStorage.getItem('chainId')) {
		case '1':
			netImage = eth;
			break;
		case '3':
			netImage = eth;
			break;
		case '56':
			netImage = bnb;
			break;
		case '97':
			netImage = bsc;
			break;
		case '43114':
			netImage = avax;
			break;
		case '25':
			netImage = crs;
			break;
		case '941':
			netImage = pls;
			break;
		default:
			netImage = disconnect;
			break;
	}
	var headerCss = 'header-connect';
	if (activeState) {
		headerCss = 'header-connect' + ' active';
	} else {
		headerCss = 'header-connect';
	}

	return (
		<Navbar collapseOnSelect expand="lg" className="nav-back">
			<Container>
				<Link to="/">
					<Navbar.Brand className="text-white">
						<span className="header-title"> Joystream Escrow </span>
					</Navbar.Brand>
				</Link>
				<Navbar.Toggle aria-controls="responsive-navbar-nav" />
				<Navbar.Collapse id="responsive-navbar-nav">
					<Nav className="me-auto" />
					<Link to="/buyer">
						<Nav className="header-connect">Buyer</Nav>
					</Link>
					<Link to="/seller">
						<Nav className="header-connect">Seller</Nav>
					</Link>
					<Link to="/escrown">
						<Nav className="header-connect">Escrow Agent</Nav>
					</Link>
					{isAuthenticated ? (
						<Nav
							className="header-connect text-white-50"
							onClick={logOut}
							style={{ marginLeft: '20px', marginRight: '20px', display: 'revert !important' }}
						>
							<img src={netImage} alt="net" style={{ width: '20px', padding: '0px' }} />
							{'  '}Disconnect
						</Nav>
					) : (
						<NavDropdown title="Connect" className="header-connect nav-drop">
							<NavDropdown.Item onClick={loginMetaMask}>
								<img src={polkadot} style={{ width: '20px' }} /> Polkadot
							</NavDropdown.Item>
							<NavDropdown.Item onClick={loginWalletconnect}>
								<img src={wallet} style={{ width: '20px' }} /> WalletConnect
							</NavDropdown.Item>
						</NavDropdown>
					)}
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}

export default HeaderBar;
