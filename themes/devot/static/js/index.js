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

    const mode = document.getElementById("mode");
    const githubIcon = document.getElementById("github-icon");
    const githubIcon1 = document.getElementById("github-icon-1");

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
        } else {
            mode.textContent = lightMode;
            document.documentElement.setAttribute("data-theme", "light");
            localStorage.setItem("mode", lightMode);

            utterancesTheme("light");
            githubIcon.setAttribute("src", "/images/GitHub-Mark-32px.png");
            githubIcon1.setAttribute("src", "/images/GitHub-Mark-32px.png");
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
        }
    } else {
        mode.textContent = lightMode;
        document.documentElement.setAttribute("data-theme", "light");
        localStorage.setItem("mode", lightMode);
    }
});
