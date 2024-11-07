const sqlite3 = require("sqlite3");
const fs = require("fs");

const db = new sqlite3.Database("./database.sqlite");

const table = document.getElementById("tabla");

const addBtn = document.getElementById("add");

const closeBtn = document.getElementById("close");
const closePreviewBtn = document.getElementById("close-preview");

const addProductField = document.getElementById("addProduct");
const containerField = document.querySelector(".container");

const previewProductWin = document.getElementById("previewProduct");

let deleteBtn;

let listOfAllProducts = [];

let n = 0;

// ADD items

const nameInput = document.getElementById("name_input");
const barcodeInput = document.getElementById("barcode_input");
const descInput = document.getElementById("desc_input");
const skuInput = document.getElementById("sku_input");
const locationInput = document.getElementById("location_input");
const qtyInput = document.getElementById("qty_input");
const vendorPriceInput = document.getElementById("vdprice_input");
const salePriceInput = document.getElementById("slprice_input");

const saveBtn = document.getElementById("addBtn");


// Preview Items

const nameField = document.getElementById("name-preview");
const barcodeField = document.getElementById("barcode-preview");
const descField = document.getElementById("desc-preview");
const skuField = document.getElementById("sku-preview");
const locField = document.getElementById("loc-preview");
const qtyField = document.getElementById("qty-preview");
const vendorPriceField = document.getElementById("vdprice_input-pr");
const salePriceField = document.getElementById("slprice_input-pr");

const updateBtn = document.getElementById("updateBtn");


const bodyEl = document.getElementById("bodyEl");

const themeBtn = document.getElementById("theme-btn");
const themeImg = document.getElementById("sun");

let currentId;

let currName;
let currBar;
let currDesc;
let currSKU;
let currLoc;
let currQTY;
let currVendor;
let currSale;

/*
db.run("CREATE TABLE Product (productId INTEGER PRIMARY KEY AUTOINCREMENT, sku varchar(255), name varchar(255), barcode INTEGER, qty INTEGER, location varchar(255), description varchar(255), vendorPrice varchar(255), salePrice varchar(255));", err => {
    if (err) console.error(err);
    else console.log("Created Table Product");
})*/

/*
db.run("ALTER TABLE Product ADD salePrice varchar(255)", (err) => {
    if(err) console.error(err);
    else console.log("Added salePrice as varchar(255)");
    
}); */

addBtn.addEventListener("click", () => {
    addProductField.classList.replace("add-product-false", "add-product");
    containerField.classList.replace("container", "container-false");
});

closeBtn.addEventListener("click", () => {
    addProductField.classList.replace("add-product", "add-product-false");
    containerField.classList.replace("container-false", "container");
});

closePreviewBtn.addEventListener("click", () => {
    previewProductWin.classList.replace("preview-true", "preview-false");
    containerField.classList.replace("container-false", "container");

    nameField.value = "";
    barcodeField.value = "";
    descField.value = "";
    skuField.value = "";
    locField.value = "";
    qtyField.value = "";
    vendorPriceField.value = "";
    salePriceField.value = "";

    currName = "";
    currBar = "";
    currDesc = "";
    currSKU = "";
    currLoc = "";
    currQTY = "";
    currVendor = "";
    currSale = "";

    currentId = 0;
})

let theme;

fs.readFile("../theme.txt", "utf-8", (err, data) => {
    if (err) console.error(err);
    else {
        console.log(data);
        theme = data;
        if (theme == "light") setLightTheme();
        else if (theme == "dark") setDarkTheme();
    }
})
/*
document.addEventListener("load", () => {
    fs.readFile("../theme.txt", "utf-8", (err, data) => {
        if (err) console.error(err);
        else {
            theme = data;
            if (theme == "light") setLightTheme();
            else if (theme == "dark") setDarkTheme();
        }
    })
})*/

const setLightTheme = () => {
    bodyEl.classList.remove("dark-theme");
    themeBtn.classList.replace("dark-btn", "light-btn");

    themeImg.src = "../../images/moon-solid.svg";
}

const setDarkTheme = () => {
    bodyEl.classList.add("dark-theme");

    themeBtn.classList.replace("light-btn", "dark-btn");
    themeImg.src = "../../images/sun-icon.png";
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

function deleteFunc(e) {
    let selectedRow = e.target.id.split("-")[1];

    db.run(`DELETE FROM Product WHERE productId=${selectedRow};`);

    //removeElements();

    //setProducts();
    /*
    db.all("SELECT productId FROM Product ORDER BY productId;", (err, products) => {
        if (err) console.error(err);
        else {
            let newId = 1;
            products.forEach(product => {
                db.run(`UPDATE Product SET productId = ? WHERE productId = ?;`, [newId, product.productId], (err) => {
                    if (err) console.error(err);
                    else {
                        console.log(`Updated ID from ${product.productId} to ${newId}`);
                    }
                });
                newId++;
            });

            db.run(`UPDATE SQLITE_SEQUENCE SET SEQ=${products.length} WHERE NAME='Product';`, (err) => {
                if (err) console.error(err);
            });
        }
    });


    setTimeout(() => {
        let n = 0;
        n++;
    }, 2000);
    */
    window.location.reload();
}

function setProducts() {
    n = 0;
    db.each("SELECT * FROM Product;", (err, product) => {
        if(err) console.error(err);
        else {
            console.log(product);
            /*
            const createArticle = () => {
                
            }
            createArticle();*/
            let tr = document.createElement("tr");
            tr.classList.add("article");
            tr.id = `${product.productId}`;

            /*
            let tdNum = document.createElement("td");
            tdNum.innerHTML = `${product.productId}`;
            tdNum.classList.add("num"); */
    
            let tdSKU = document.createElement("td");
            tdSKU.innerHTML = `${product.sku}`;
            tdSKU.classList.add("sku");
    
            let tdName = document.createElement("td");
            tdName.innerHTML = `${product.name}`;
            tdName.classList.add("name");
    
            let tdBarcode = document.createElement("td");
            tdBarcode.innerHTML = `${product.barcode}`;
            tdBarcode.classList.add("barcode");
    
            let tdQty = document.createElement("td");
            tdQty.innerHTML = `${product.qty}`;
            tdQty.classList.add("qty");
    
            let tdLoc = document.createElement("td");
            tdLoc.innerHTML = `${product.location}`;
            tdLoc.classList.add("loc");
    
            let tdDesc = document.createElement("td");
            tdDesc.innerHTML = `${product.description}`;
            tdDesc.classList.add("desc");
    
            let tdDelBtn = document.createElement("td");
            tdDelBtn.onclick = deleteFunc;
            tdDelBtn.classList.add("btns");
            tdDelBtn.id = `delete-${product.productId}`;
            tdDelBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';
            //tdDelBtn.addEventListener("click", deleteFunc);

            deleteBtn = tdDelBtn;
            
            let listOfTds = [tdSKU, tdName, tdBarcode, tdQty, tdLoc, tdDesc, tdDelBtn];

            
            listOfTds.forEach(td => {
                tr.append(td);
            });
            
            tr.onclick = preview;
            
            table.appendChild(tr);
            
            listOfAllProducts[n] = tr;
            n++;

            console.log(`Setted ${n} products`);
        }
    }); 
}

function removeElements() {
    listOfAllProducts.forEach(product => {
        table.removeChild(product);
    })

    listOfAllProducts = [];
}

function refreshProducts() {
    db.get("SELECT * FROM Product WHERE productID = (SELECT MAX(productID) FROM Product);", (err, product) => {
        if (err) console.error(err);
        else {
            let tr = document.createElement("tr");
            tr.classList.add("article");
            tr.id = `${product.productId}`;
            
            /*
            let tdNum = document.createElement("td");
            tdNum.innerHTML = `${product.productId}`;
            tdNum.classList.add("num");*/
    
            let tdSKU = document.createElement("td");
            tdSKU.innerHTML = `${product.sku}`;
            tdSKU.classList.add("sku");
    
            let tdName = document.createElement("td");
            tdName.innerHTML = `${product.name}`;
            tdName.classList.add("name");
    
            let tdBarcode = document.createElement("td");
            tdBarcode.innerHTML = `${product.barcode}`;
            tdBarcode.classList.add("barcode");
    
            let tdQty = document.createElement("td");
            tdQty.innerHTML = `${product.qty}`;
            tdQty.classList.add("qty");
    
            let tdLoc = document.createElement("td");
            tdLoc.innerHTML = `${product.location}`;
            tdLoc.classList.add("loc");
    
            let tdDesc = document.createElement("td");
            tdDesc.innerHTML = `${product.description}`;
            tdDesc.classList.add("desc");

            /*
            let tdEditBtn = document.createElement("td");
            tdEditBtn.classList.add("btns");
            tdEditBtn.id = "edit";
            tdEditBtn.innerHTML = '<i class="fa-solid fa-pen"></i>';
            */
            
            let tdDelBtn = document.createElement("td");
            tdDelBtn.classList.add("btns");
            tdDelBtn.id = `delete-${product.productId}`;
            tdDelBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';

            tdDelBtn.addEventListener("click", deleteFunc);
            
            let listOfTds = [tdSKU, tdName, tdBarcode, tdQty, tdLoc, tdDesc, tdDelBtn];

            listOfAllProducts = listOfTds;
    
            listOfTds.forEach(td => {
                tr.append(td);
            });

            tr.onclick = preview;
            
            table.append(tr);
        }
    });

    console.log("Refreshed");
}

window.onload = () => {
    //db.run("DROP TABLE Product");
    /*
    db.run("CREATE TABLE Product (productId INTEGER PRIMARY KEY AUTOINCREMENT, sku varchar(255), name varchar(255), barcode INTEGER, qty INTEGER, location varchar(255), description varchar(255));", err => {
        if (err) console.error(err);
        else console.log("table created");
    })*/

    setProducts();
}


saveBtn.addEventListener("click", () => {
    let barCode = barcodeInput.value;
    let name = nameInput.value;
    let description = descInput.value;
    let sku = skuInput.value;
    let qty = qtyInput.value;
    let location = locationInput.value;
    let vendorPrice = vendorPriceInput.value;
    let salePrice = salePriceInput.value;

    console.log(`Barcode: ${barCode} | Name: ${name} | Description: ${description} | SKU: ${sku} | Qty: ${qty} | Location: ${location} `);

    db.run(`INSERT INTO Product (sku, name, barcode, qty, location, description, vendorPrice, salePrice) VALUES ('${sku}', '${name}', ${barCode}, ${qty}, '${location}', '${description}', '${vendorPrice}', '${salePrice}');`);

    barcodeInput.value = "";
    nameInput.value = "";
    descInput.value = "";
    skuInput.value = "";
    qtyInput.value = "";
    locationInput.value = "";
    vendorPrice.value = "";
    salePrice.value = "";

    addProductField.classList.replace("add-product", "add-product-false");
    containerField.classList.replace("container-false", "container");

    refreshProducts();
})

function preview(e) {
    if (e.target.className != "btns") {
        let id = e.currentTarget.id;
        console.log(id);

        currentId = id;
    
        containerField.classList.replace("container", "container-false");
        previewProductWin.classList.replace("preview-false", "preview-true");
    
        db.get(`SELECT * FROM Product WHERE productId=${id}`, (err, article) => {
            if (err) console.error(err);
            else {
                nameField.value = `${article.name}`;
                barcodeField.value = `${article.barcode}`;
                descField.value = `${article.description}`;
                skuField.value = `${article.sku}`;
                locField.value = `${article.location}`;
                qtyField.value = `${article.qty}`;
                vendorPriceField.value = `${article.vendorPrice}`;
                salePriceField.value = `${article.salePrice}`;
            }
        });
    } 
}

updateBtn.addEventListener("click", (e) => {
    console.log(currentId);

    db.run(`UPDATE Product SET sku='${skuField.value}', name='${nameField.value}', barcode='${barcodeField.value}', qty='${qtyField.value}', location='${locField.value}', description='${descField.value}', vendorPrice='${vendorPriceField.value}', salePrice='${salePriceField.value}' WHERE productID=${currentId};`, (err) => {
        if (err) console.error(err);
        else console.log("Succesfully Updated Item!");
    })

    closePreviewBtn.click();

    removeElements();

    setProducts();
})