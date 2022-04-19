import Web3 from "web3";
// import SimpleStorageContract from "./contracts/SimpleStorage.json";
// import Adoption from "./contracts/Adoption.json";

const getWeb3 = async() => {
    var web3;
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        try {
            await window.ethereum.enable();            
        }
        catch (err) {
            console.log(err);
            return err;
        }
    }
    else if (window.web3) {
        web3 = new Web3(window.web3.currentProvider);
        console.log("Injected web3 detected.");
    }
    else {
        const provider = new Web3.providers.HttpProvider("http://121.0.0.1:8545");
        web3 = new Web3(provider);
        console.log("No web3 instance injected, using Local web3.");
    }
    return web3;
}

const initiateContract = async (web3,contractJson) => {
    const networkId = await web3.eth.net.getId();
    console.log(networkId);
    const deployedNetwork = contractJson.networks[networkId];
    console.log(deployedNetwork);
    const instance = new web3.eth.Contract(
        contractJson.abi,
        deployedNetwork&& deployedNetwork.address
    )
    console.log(instance)
    return instance;
}

export { getWeb3,initiateContract };