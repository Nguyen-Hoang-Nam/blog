let page = 2;
let lastPage = false;

let scrollHeight = document.documentElement.scrollHeight;

const listContents = document.getElementById("list-contents");

const loadPage = () => {
    if (lastPage) {
        return;
    }

    fetch(`page/${page}`).then((response) => {
        if (response.ok) {
            response.text().then((html) => {
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, "text/html");
                const posts = doc.querySelectorAll(".post");

                posts.forEach((nodeList) => {
                    listContents.appendChild(nodeList);
                });

                page++;
                scrollHeight = document.documentElement.scrollHeight;
            });
        } else {
            lastPage = true;
        }
    });
};

window.addEventListener("scroll", () => {
    if (!listContents) {
        return;
    }

    if (window.scrollY + window.innerHeight >= scrollHeight) {
        loadPage();
    }
});
