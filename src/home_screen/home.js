const { ipcRenderer } = require("electron");
const fs = require("fs");

const themeBtn = document.getElementById("theme-btn");

const bodyEl = document.getElementById("body");
const headerEl = document.getElementById("header");
const container = document.getElementById("container");

const themeImg = document.getElementById("sun");
const logoImg = document.getElementById("logo");
const cartImg = document.getElementById("cart");
const stckImg = document.getElementById("stckImg");
const dashboardImg = document.getElementById("dashboard");
const nameHolders = document.getElementsByName("name-holder");

const stockApp = document.getElementById("stock-app");

stockApp.addEventListener("click", () => {
    ipcRenderer.send("msg-from-home", "load-stock-app");
})

let theme;

window.onload = () => {
    fs.readFile("../theme.txt", "utf-8", (err, data) => {
        if (err) console.error(err);
        else {
            theme = data;
            if (theme == "light") setLightTheme();
            else if (theme == "dark") setDarkTheme();
        }
    })
}

const setLightTheme = () => {
    bodyEl.classList.replace("dark-theme", "light-theme");
    headerEl.classList.replace("dark-header", "light-header");
    container.classList.replace("container-dark", "container-light");
    themeBtn.classList.replace("dark-btn", "light-btn");

    themeImg.src = "../../images/moon-solid.svg";
    logoImg.src = "../../images/dashboard-icon-l.png";
    cartImg.src = "../../images/cart-icon-l.png";
    stckImg.src = "../../images/Dashboard-icon-l.png";
    dashboardImg.src = "../../images/dash-icon-l.png";

    nameHolders.forEach(nameHolder => {
        nameHolder.classList.replace("name-holder-d", "name-holder-l");
    });
}

const setDarkTheme = () => {
    bodyEl.classList.replace("light-theme", "dark-theme");
    headerEl.classList.replace("light-header", "dark-header");
    container.classList.replace("container-light", "container-dark");

    themeBtn.classList.replace("light-btn", "dark-btn");
    themeImg.src = "../../images/sun-icon.png";
    logoImg.src = "../../images/dashboard-icon.png"
    cartImg.src = "../../images/cart-icon.png";
    stckImg.src = "../../images/Dashboard-icon-large.png";
    dashboardImg.src = "../../images/dash-icon.png";

    nameHolders.forEach(nameHolder => {
        nameHolder.classList.replace("name-holder-l", "name-holder-d");
    });
}

themeBtn.addEventListener("click", () => {
    if (theme == "dark") {

        theme = "light";

        fs.writeFile("../theme.txt", "light", (err) => {
            if (err) console.error(err);
        });
        
        setLightTheme();
        
    } else if (theme == "light") {
        theme = "dark";

        fs.writeFile("../theme.txt", "dark", (err) => {
            if (err) console.error(err);
        });

        setDarkTheme();
    }
})