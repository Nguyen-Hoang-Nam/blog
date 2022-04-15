import "../css/style.css";

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

    function utterancesTheme(currentMode: string) {
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

            chromaTheme.href = "/css/syntax-dark.css";
        } else {
            mode.textContent = lightMode;
            document.documentElement.setAttribute("data-theme", "light");
            localStorage.setItem("mode", lightMode);

            utterancesTheme("light");

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

            chromaTheme.href = "/css/syntax-dark.css";
        }
    } else {
        mode.textContent = lightMode;
        document.documentElement.setAttribute("data-theme", "light");
        localStorage.setItem("mode", lightMode);
    }

    const tabIcon = document.getElementById("tab-icon") as HTMLLinkElement;
    const tabAppleIcon = document.getElementById(
        "tab-apple-icon"
    ) as HTMLLinkElement;
    if (
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
        tabIcon.href = "/images/logo-dark.svg";
        tabAppleIcon.href = "/images/logo-dark.svg";

        document.getElementsByTagName("head")[0].appendChild(tabIcon);
        document.getElementsByTagName("head")[0].appendChild(tabAppleIcon);
    }
});

document.addEventListener(
    "copy",
    (evt) => {
        evt.clipboardData.setData(
            "text/plain",
            "Copying is not allowed on this webpage"
        );

        evt.preventDefault();
    },
    false
);

const tabIcon = document.getElementById("tab-icon") as HTMLLinkElement;
const tabAppleIcon = document.getElementById(
    "tab-apple-icon"
) as HTMLLinkElement;
window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", (e) => {
        if (e.matches) {
            tabIcon.href = "/images/logo-dark.svg";
            tabAppleIcon.href = "/images/logo-dark.svg";
        } else {
            tabIcon.href = "/images/logo-light.svg";
            tabAppleIcon.href = "/images/logo-light.svg";
        }

        document.getElementsByTagName("head")[0].appendChild(tabIcon);
        document.getElementsByTagName("head")[0].appendChild(tabAppleIcon);
    });

// function fetchLikes(slug: string) {
//     const data = {
//         slug: slug,
//     };

//     fetch("/.netlify/functions/fetch-likes", {
//         method: "POST",
//         body: JSON.stringify(data),
//     })
//         .then(function (res) {
//             return res.json();
//         })
//         .then(function (data) {
//         });
// }

function registerLikes(slug: string) {
    const data = {
        slug: slug,
    };

    fetch("/.netlify/functions/register-likes", {
        method: "POST",
        body: JSON.stringify(data),
    });
}

const getCurrentPost = () => {
    const pathName = window.location.pathname;
    const pathElement = pathName.split("/");

    const length = pathElement.length;
    const lastElement = pathElement[length - 1];
    if (lastElement !== "") {
        return lastElement;
    }

    return pathElement[length - 2];
};

const likeButton = document.getElementById("like-button");
if (likeButton) {
    likeButton.addEventListener("click", () => registerLikes(getCurrentPost()));
}
