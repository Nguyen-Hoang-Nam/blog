const lightMode = "☀️";
const darkMode = "🌙";

window.addEventListener("DOMContentLoaded", () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            const id = entry.target.getAttribute("id");
            if (entry.intersectionRatio > 0) {
                document
                    .querySelector(`nav li a[href="#${id}"]`)
                    .classList.add("active");
            } else {
                document
                    .querySelector(`nav li a[href="#${id}"]`)
                    .classList.remove("active");
            }
        });
    });

    document.querySelectorAll("h2[id], h3[id]").forEach((section) => {
        observer.observe(section);
    });

    function utterancesTheme(currentMode) {
        if (document.querySelector(".utterances-frame")) {
            const theme =
                currentMode === "dark" ? "github-dark" : "github-light";
            const message = {
                type: "set-theme",
                theme: theme,
            };
            const iframe = document.querySelector(".utterances-frame");
            iframe.contentWindow.postMessage(message, "https://utteranc.es");
        }
    }

    const lazyLoadImage = window.lozad();
    lazyLoadImage.observe();

    const mode = document.getElementById("mode");
    const githubIcon = document.getElementById("github-icon");
    const githubIcon1 = document.getElementById("github-icon-1");
    const rss = document.getElementById("rss");
    const chromaTheme = document.getElementById("chroma-theme");

    mode.addEventListener("click", function () {
        const currentMode = mode.textContent;
        if (currentMode === lightMode) {
            mode.textContent = darkMode;
            document.documentElement.setAttribute("data-theme", "dark");
            localStorage.setItem("mode", darkMode);

            utterancesTheme("dark");
            githubIcon.setAttribute(
                "src",
                "/images/GitHub-Mark-Light-32px.png"
            );
            githubIcon1.setAttribute(
                "src",
                "/images/GitHub-Mark-Light-32px.png"
            );
            rss.setAttribute("src", "/images/rss-dark.png");

            chromaTheme.href = "/css/syntax-dark.css";
        } else {
            mode.textContent = lightMode;
            document.documentElement.setAttribute("data-theme", "light");
            localStorage.setItem("mode", lightMode);

            utterancesTheme("light");
            githubIcon.setAttribute("src", "/images/GitHub-Mark-32px.png");
            githubIcon1.setAttribute("src", "/images/GitHub-Mark-32px.png");
            rss.setAttribute("src", "/images/rss-light.png");

            chromaTheme.href = "/css/syntax-light.css";
        }
    });

    const latestMode = localStorage.getItem("mode");
    if (latestMode) {
        mode.textContent = latestMode;
        if (latestMode === lightMode) {
            document.documentElement.setAttribute("data-theme", "light");
        } else {
            document.documentElement.setAttribute("data-theme", "dark");
            utterancesTheme("light");
            githubIcon.setAttribute(
                "src",
                "/images/GitHub-Mark-Light-32px.png"
            );
            githubIcon1.setAttribute(
                "src",
                "/images/GitHub-Mark-Light-32px.png"
            );
            rss.setAttribute("src", "/images/rss-dark.png");

            chromaTheme.href = "/css/syntax-dark.css";
        }
    } else {
        mode.textContent = lightMode;
        document.documentElement.setAttribute("data-theme", "light");
        localStorage.setItem("mode", lightMode);
    }
});

const connectMetamask = document.getElementById("connect-metamask");
const connectPhantom = document.getElementById("connect-phantom");
let currentWallet = "";

let accounts = [];

if (typeof window.ethereum === "undefined") {
    connectMetamask.disabled = true;
}

var provider;

var connection = new solanaWeb3.Connection(
    solanaWeb3.clusterApiUrl("devnet"),
    "confirmed"
);

const createTransferTransaction = async () => {
    var to = new solanaWeb3.PublicKey(
        "9ZZoqoTfzMvpzeM719AbDnxdTBGaz2UYK77ZCwb5CQDD"
    );

    var transaction = new solanaWeb3.Transaction().add(
        solanaWeb3.SystemProgram.transfer({
            fromPubkey: provider.publicKey,
            toPubkey: to,
            lamports: 0.0125 * solanaWeb3.LAMPORTS_PER_SOL,
        })
    );

    transaction.feePayer = provider.publicKey;
    transaction.recentBlockhash = (
        await connection.getRecentBlockhash()
    ).blockhash;

    return transaction;
};

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
        .then((txHash) => console.log(txHash))
        .catch((error) => console.error(error));
});

async function getMetamaskAccount() {
    accounts = await ethereum.request({
        method: "eth_requestAccounts",
    });
}

connectPhantom.addEventListener("click", async () => {
    await getPhantomAccount();

    try {
        const transaction = await createTransferTransaction();

        if (!transaction) {
            return;
        }

        let signed = await provider.signTransaction(transaction);
        let signature = await connection.sendRawTransaction(signed.serialize());
        await connection.confirmTransaction(signature);
    } catch (err) {
        console.error(err);
    }
});

async function getPhantomAccount() {
    try {
        await window.solana.connect();
    } catch (err) {
        console.error(err);
    }
}

const getProvider = async () => {
    if ("solana" in window) {
        const provider = window.solana;
        if (provider.isPhantom) {
            return provider;
        }
    } else {
        connectPhantom.disabled = true;
    }
};

window.onload = () => {
    getProvider()
        .then((result) => {
            provider = result;
        })
        .catch(function (error) {
            console.error(error);
        });
};
