const connectMetamask = document.getElementById(
    "connect-metamask"
) as HTMLButtonElement;

let accounts = [];

if (typeof (window as any).ethereum === "undefined") {
    connectMetamask.disabled = true;
}

let ethereum: any;

connectMetamask.addEventListener("click", async () => {
    getMetamaskAccount();

    ethereum
        .request({
            method: "eth_sendTransaction",
            params: [
                {
                    from: accounts[0],
                    to: "0x0374fAe44F049252A9FDc517514566a57b5D9Af9",
                    value: "0x1c6bf52634000",
                },
            ],
        })
        .catch(() => {
            // TODO: Show error message
        });
});

async function getMetamaskAccount() {
    accounts = await ethereum.request({
        method: "eth_requestAccounts",
    });
}
