import "../css/style.css";

const lightMode: string = "☀️";
const darkMode: string = "🌙";

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

    function utterancesTheme(currentMode: String) {
        if (document.querySelector(".utterances-frame")) {
            const theme =
                currentMode === "dark" ? "github-dark" : "github-light";
            const message = {
                type: "set-theme",
                theme: theme,
            };
            const iframe = document.querySelector(
                ".utterances-frame"
            ) as HTMLIFrameElement;
            iframe.contentWindow.postMessage(message, "https://utteranc.es");
        }
    }

    const mode = document.getElementById("mode") as HTMLElement;
    const githubIcon = document.getElementById("github-icon");
    const githubIcon1 = document.getElementById("github-icon-1");
    const rss = document.getElementById("rss");
    const chromaTheme = document.getElementById(
        "chroma-theme"
    ) as HTMLLinkElement;

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

const connectMetamask = document.getElementById(
    "connect-metamask"
) as HTMLButtonElement;

let accounts = [];

const anyWindow: any = window;
if (typeof anyWindow.ethereum === "undefined") {
    connectMetamask.disabled = true;
}

var ethereum: any;

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
