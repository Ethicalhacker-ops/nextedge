
document.addEventListener("DOMContentLoaded", function() {
    // Load header
    fetch("header.html")
        .then(response => response.text())
        .then(data => {
            document.querySelector("body").insertAdjacentHTML("afterbegin", data);
        });

    // Load footer
    fetch("footer.html")
        .then(response => response.text())
        .then(data => {
            document.querySelector("body").insertAdjacentHTML("beforeend", data);
        });
});
