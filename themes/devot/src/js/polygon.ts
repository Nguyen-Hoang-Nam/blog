import Web3 from "web3";

const anyWindow: any = window;
let web3: any;

const getWeb3 = () =>
    new Promise((resolve) => {
        window.addEventListener("load", () => {
            let currentWeb3: Web3;

            if (anyWindow.ethereum) {
                currentWeb3 = new Web3(anyWindow.ethereum);
                try {
                    // Request account access if needed
                    anyWindow.ethereum.enable();
                    // Acccounts now exposed
                    resolve(currentWeb3);
                } catch (error) {
                    // User denied account access...
                    alert("Please allow access for the app to work");
                }
            } else if (anyWindow.web3) {
                anyWindow.web3 = new Web3(web3.currentProvider);
                // Acccounts always exposed
                resolve(currentWeb3);
            } else {
                // Disable button
            }
        });
    });
