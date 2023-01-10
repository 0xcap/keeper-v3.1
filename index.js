import * as dotenv from 'dotenv'
dotenv.config()

import { ethers } from 'ethers'

const ABIS = {
	Trade: [
		`function executeOrders()`,
		`function getExecutableOrderIds() public view returns (uint256[])`,
		`function liquidateUsers()`,
		`function getLiquidatableUsers() public view returns (address[])`
	]
};

function getContract() {
	const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
	const pkey = process.env.PKEY;
	return new ethers.Contract(process.env.TRADE_CONTRACT, ABIS['Trade'], new ethers.Wallet(pkey, provider));
}

async function executeOrders() {

	console.log('checking orders to execute...');

	const contract = await getContract();

	// Check for if there are executable orders
	const executableOrderIds = await contract.getExecutableOrderIds();

	console.log('executableOrderIds', executableOrderIds);

	if (executableOrderIds && executableOrderIds.length > 0) {

		const tx = await contract.executeOrders();

		const receipt = await tx.wait();

		console.log('receipt', receipt);

		// receipt.logs contains all events emitted by this tx, including errors
		if (receipt && receipt.status == 1) {
			console.log('executed order ids', executableOrderIds);
		}

	}

}

async function liquidateUsers() {

	console.log('checking users to liquidate...');

	const contract = await getContract();

	// Check for if there are executable orders
	const liquidatableUsers = await contract.getLiquidatableUsers();

	console.log('liquidatableUsers', liquidatableUsers);

	if (liquidatableUsers && liquidatableUsers.length > 0) {

		const tx = await contract.liquidateUsers();

		const receipt = await tx.wait();

		console.log('receipt', receipt);

		// receipt.logs contains all events emitted by this tx, including errors
		if (receipt && receipt.status == 1) {
			console.log('liquidated users', liquidatableUsers);
		}

	}

}

async function poller() {
	await executeOrders();
	await liquidateUsers();
	setTimeout(poller, 5000);
}

poller();