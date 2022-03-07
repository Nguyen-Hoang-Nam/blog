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
});
