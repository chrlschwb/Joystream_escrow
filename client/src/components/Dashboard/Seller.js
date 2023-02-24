import React, { useState, useEffect } from 'react';
import { Col, Row, Card, InputGroup, Form, Button, Table, Modal } from 'react-bootstrap';
import Web3 from 'web3';
import escrowAbi from '../../contract/escrowAbi.json';
import TableScrollbar from 'react-table-scrollbar';
import ReactPaginate from 'react-paginate';

var contractAddress;
const abi = escrowAbi;
const web3 = new Web3(Web3.givenProvider);

var addressBalance;
var sellerItemData = [];
var buffer = [];
var valTableBuyIndex;

function Seller() {
	const [ formData, setFormData ] = useState({
		buyerAddress: '',
		escrowAddress: '',
		buyerValue: '',
		buyerNote: '' /// now not user
	});

	const [ validError, setvalidError ] = useState(false);
	const [ buyerValid, setBuyerValid ] = useState(false);
	const [ escrowValid, setEscrowValid ] = useState(false);
	const [ valueValid, setValueValid ] = useState(false);

	const [ fundValue, setFundValue ] = useState(0);

	const { buyerAddress, escrowAddress, buyerValue, buyerNote } = formData;

	const [ show, setShow ] = useState(false);
	const [ buyModalShow, setBuyModalShow ] = useState(false);

	var [ list, setList ] = useState([]);
	const [ perPage, setperPage ] = useState(3);
	const [ page, setPage ] = useState(0);
	const [ pages, setPages ] = useState(0);

	useEffect(() => {
		if (window.localStorage.getItem('isAuthenticated') === 'true') {
			web3.eth.getBalance(window.localStorage.getItem('userAddress')).then((res) => {
				addressBalance = res;
			});
			getTransactionData();

			setList(sellerItemData);
			setPages(Math.floor(list.length / perPage));
		}
	});

	const handleClose = () => setShow(false);

	const handleShow = () => {
		setShow(true);
		setBuyerValid(false);
		setEscrowValid(false);
		setValueValid(false);
		setvalidError(false);
		setFormData({ buyerAddress: '', escrowAddress: '', buyerValue: 0 });
	};

	const handleBuyModalClose = () => setBuyModalShow(false);
	const handleBuyModalShow = (e) => {
		valTableBuyIndex = e;
		setBuyModalShow(true);
	};

	function getTransactionData() {
		if (window.localStorage.getItem('isAuthenticated') === 'true') {
			const presaleContract = new web3.eth.Contract(abi, contractAddress);
			presaleContract.methods
				.getNumTransactions(window.localStorage.getItem('userAddress'), 1)
				.call()
				.then((res) => {
					sellerItemData = [];
					for (let i = 0; i < res; i++) {
						presaleContract.methods
							.getSpecificTransaction(window.localStorage.getItem('userAddress'), 1, i)
							.call()
							.then((data) => {
								buffer = data;
							});
						sellerItemData.push(buffer);
					}
				});
			presaleContract.methods.CheckBalance(window.localStorage.getItem('userAddress')).call().then((data) => {
				setFundValue((data / 10 ** 18).toFixed(3));
			});
		}
	}

	function newEscrowContract() {
		if (window.localStorage.getItem('isAuthenticated') === 'true') {
			const presaleContract = new web3.eth.Contract(abi, contractAddress);
			presaleContract.methods
				.newEscrow(
					buyerAddress,
					escrowAddress,
					'0x0000000000000000000000000000000000000000000000000000000000000000'
				)
				.send({ from: window.localStorage.getItem('userAddress'), value: buyerValue * 10 ** 18 })
				.then((res) => {
					console.log(res);
					setShow(false);
				});
		}

		setvalidError(false);
	}

	switch (window.localStorage.getItem('chainId')) {
		case '1':
			contractAddress = '0xc0E369fa597392f60460B9561Ce1d45ca130e26D';
			break;
		case '941':
			contractAddress = '0xc0E369fa597392f60460B9561Ce1d45ca130e26D';
			break;

		default:
			contractAddress = '0xc0E369fa597392f60460B9561Ce1d45ca130e26D';
			break;
	}

	const onChange = (e) => {
		validateField(e.target.name, e.target.value);
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	function validateField(fieldName, value) {
		let sellerValidInput = buyerValid;
		let escrowValidInput = escrowValid;
		let sellerValueInput = valueValid;

		switch (fieldName) {
			case 'buyerAddress':
				sellerValidInput = value.length >= 41 ? true : false;
				break;
			case 'escrowAddress':
				escrowValidInput = value.length >= 41 ? true : false;
				break;
			case 'buyerValue':
				sellerValueInput = value > 0 ? true : false;
				break;

			default:
				break;
		}

		setBuyerValid(sellerValidInput);
		setEscrowValid(escrowValidInput);
		setValueValid(sellerValueInput);
		setvalidError(sellerValidInput && escrowValidInput && sellerValueInput);
	}

	function handlePageClick(event) {
		// setPage(page );
		// console.log(event);
	}

	const onRelaseFundBtn = () => {
		if (window.localStorage.getItem('isAuthenticated') === 'true') {
			const presaleContract = new web3.eth.Contract(abi, contractAddress);
			presaleContract.methods
				.buyerFundRelease(Number(valTableBuyIndex))
				.send({ from: window.localStorage.getItem('userAddress') })
				.then((res) => {
					setBuyModalShow(false);
				});
		}
	};

	const onEscrowBtn = () => {
		if (window.localStorage.getItem('isAuthenticated') === 'true') {
			const presaleContract = new web3.eth.Contract(abi, contractAddress);
			presaleContract.methods
				.EscrowEscalation(1, Number(valTableBuyIndex))
				.send({ from: window.localStorage.getItem('userAddress') })
				.then((res) => {
					setBuyModalShow(false);
				});
		}
	};

	const onWithDrawFunds = () => {
		if (window.localStorage.getItem('isAuthenticated') === 'true') {
			const presaleContract = new web3.eth.Contract(abi, contractAddress);
			presaleContract.methods
				.WithdrawFunds()
				.send({ from: window.localStorage.getItem('userAddress') })
				.then((res) => {});
		}
	};
	let items = list.slice(page * perPage, (page + 1) * perPage);
	let datas =
		items.map((item, i) => {
			return (
				<tr
					key={i}
					onClick={function test() {
						handleBuyModalShow(i);
					}}
				>
					<td>{i}</td>
					<td>{item[0]}</td>
					<td>{item[2]}</td>
					<td>{item[3]}</td>
					<td>{item[4]}</td>
					<td>{item[5]}</td>
					<td>{item[6]}</td>
				</tr>
			);
		}) || '';

	return (
		<div className="seller-back">
			<div className="container">
				<Modal show={show} onHide={handleClose} centered size="lg">
					<Modal.Header closeButton>
						<Modal.Title>Create Buy</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Form noValidate>
							<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
								<Form.Label>Buyer Address</Form.Label>
								<Form.Control
									type="text"
									name="buyerAddress"
									placeholder="buyer contract address"
									isValid={buyerValid}
									isInvalid={!buyerValid}
									onChange={onChange}
								/>
								<Form.Control.Feedback type="invalid">
									Buyer address input is valid
								</Form.Control.Feedback>
							</Form.Group>
							<Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
								<Form.Label>Escrow Address</Form.Label>
								<Form.Control
									type="text"
									name="escrowAddress"
									placeholder="escrow wallet address"
									isValid={escrowValid}
									isInvalid={!escrowValid}
									onChange={onChange}
								/>
								<Form.Control.Feedback type="invalid">
									Escrow address input is valid
								</Form.Control.Feedback>
							</Form.Group>
							<Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
								<Form.Label>Seller value</Form.Label>
								<Form.Control
									type="number"
									name="buyerValue"
									isValid={valueValid}
									isInvalid={!valueValid}
									placeholder="seller value input"
									onChange={onChange}
								/>
								<Form.Control.Feedback type="invalid">
									Seller value input is valid
								</Form.Control.Feedback>
							</Form.Group>
						</Form>
					</Modal.Body>
					<Modal.Footer>
						<Form.Control.Feedback tooltip>Escrow address input is valid</Form.Control.Feedback>
						<Button variant="secondary" onClick={handleClose}>
							Cancel
						</Button>
						<Button disabled={!validError} variant="primary" onClick={newEscrowContract}>
							New Transaction
						</Button>
					</Modal.Footer>
				</Modal>
				<Modal show={buyModalShow} onHide={handleBuyModalClose} centered dialogClassName="buy-modal">
					<Modal.Header closeButton>
						<Modal.Title className="text-center">Seller Options</Modal.Title>
					</Modal.Header>
					<Modal.Footer>
						<Button
							onClick={onRelaseFundBtn}
							className="buy-card-btn"
							style={{ marginLeft: '1px', marginRight: '1px' }}
						>
							ReFund
						</Button>
						<Button
							onClick={onEscrowBtn}
							className="buy-card-btn"
							style={{ marginLeft: '1px', marginRight: '1px' }}
						>
							Escrow
						</Button>
						<Button
							variant="secondary"
							onClick={handleBuyModalClose}
							className="buy-card-btn"
							style={{ marginLeft: '1px', marginRight: '1px' }}
						>
							Cancel
						</Button>
					</Modal.Footer>
				</Modal>
				<Row>
					<Col sm="6" xs="12">
						<div className="form-group">
							<Card className="text-center">
								<Card.Header>My Balance</Card.Header>
								<Card.Body>
									<Card.Title>{(addressBalance / 10 ** 18).toFixed(3)} ETH</Card.Title>
								</Card.Body>
								<Card.Footer className="text-muted">
									<Button className="card-button" disabled>
										initialize New Transaction
									</Button>
								</Card.Footer>
							</Card>
						</div>
					</Col>
					<Col sm="6" xs="12">
						<div className="form-group">
							<Card className="text-center">
								<Card.Header>Contract Balance</Card.Header>
								<Card.Body>
									<Card.Title>{fundValue} ETH</Card.Title>
								</Card.Body>
								<Card.Footer className="text-muted">
									<Button className="card-button" onClick={onWithDrawFunds}>
										Withdraw Funds
									</Button>
								</Card.Footer>
							</Card>
						</div>
					</Col>
				</Row>
				<Row>
					<div className="form-group">
						<Card>
							<Card.Header className="text-center">Recent Purchases</Card.Header>
							<Card.Body>
								<div style={{ height: '300px' }}>
									<TableScrollbar>
										<Table>
											<thead>
												<tr>
													<th>No</th>
													<th>Buyer Address</th>
													<th>Escrow Address</th>
													<th>mount</th>
													<th>status</th>
													<th>Escrow Fee</th>
													<th>Escrow Note</th>
												</tr>
											</thead>
											<tbody>{datas}</tbody>
										</Table>
									</TableScrollbar>
								</div>
							</Card.Body>
							<Card.Footer className="text-center">
								<Button className="card-button-2" value="increase" onClick={handlePageClick()}>
									Prev
								</Button>
								<Button className="card-button-2" value="decrease" onClick={handlePageClick()}>
									Next
								</Button>
							</Card.Footer>
						</Card>
					</div>
				</Row>
			</div>
		</div>
	);
}

export default Seller;
