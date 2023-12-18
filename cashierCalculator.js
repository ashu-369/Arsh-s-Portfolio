let products = [];
let productList = [];
let receipt = [];

//function to add a new product in the system
function addProduct() {
    let name = document.getElementById("addProductName").value.trim();
    if (name) {
        //if the product doesn't exists
        if (productList.indexOf(name) === -1) {
            productList.push(name);
            productNameList();
            addProductName.value = "";
        } 
        //if the product already exists
        else {
            alert("The product already exists!");
        }
    } 
    //if invalid input
    else {
        alert("Enter a product name.");
    }
}

//making the  list of products in drop down menu
function productNameList() {
    let List = document.getElementById("selectProducts1");
    let ListHtml = "";
    for (let product of productList) {
        ListHtml += `<option value="${product}">${product}</option>`;
    }
    List.innerHTML = ListHtml;
}


//adding the price of the selected product
function addProductPrice() {
    let selectedProduct = document.getElementById("selectProducts1");
    let price = document.getElementById("productPrice").value;

    //ensuring that a product is selected before entering a price
    if (selectedProduct.value === "") {
        alert("Select a product before entering the price.");
        return;
    }

    if (!price.trim()) {
        alert("Enter a price for the selected product.");
        return;
    }

    //ensuring that the input is a number
    if (!isNaN(price)) {
        let existingProduct = products.find(p => p.name === selectedProduct.value);

        if (existingProduct) {
            // The product already has a price, ask the user if they want to update it
            let updatePrice = confirm(`The price for ${existingProduct.name} is already entered. Do you want to update it?`);

            if (updatePrice) {
                if (!price.trim()) {
                    alert("Enter a price for the selected product.");
                    return;
                }
                // Update the existing product's price
                else{
                existingProduct.price = price;}
                productPrice.value = "";
            }
        } 
        //entering the price of the product whose price is not previously assigned
        else {
            products.push({
                name: selectedProduct.value,
                price: price
            });
            productPrice.value = "";
        }
    } 
    //if invalid input
    else {
        alert("Enter a valid number.");
    }
    productNameList2();
}

//making the list containing product along with their price in second drop down menu
function productNameList2() {
    let List = document.getElementById("selectProducts2");
    let ListHtml = "";
    for (let product of products) {
        ListHtml += `<option value="${product.name}">${product.name} $${product.price}/unit</option>`;
    }
    List.innerHTML = ListHtml;
}

// function for the working of Add to Cart button
function addToCart() {
    let selectedProductDropdown = document.getElementById("selectProducts2");
    let selectedProductName = selectedProductDropdown.value;
    let units = Number(document.getElementById("unitInput").value);

    if (!isNaN(units)) {
        // Find the selected product in the 'products' array
        let selectedProductData = products.find(p => p.name === selectedProductName);

        if (selectedProductData) {
            // Check if the product is already in the receipt
            let existingProduct = receipt.find(p => p.name === selectedProductData.name);

            if (existingProduct) {
                // If the product is already in the receipt, ask the user if they want to update the quantity
                let updateQuantity = confirm(`The product ${existingProduct.name} is already in the receipt. Do you want to update the quantity?`);

                if (updateQuantity) {
                    existingProduct.units += units;
                } else {
                    alert("Operation canceled. Quantity not updated.");
                }
            } else {
                // If the product is not in the receipt, add it
                receipt.push({
                    "name": selectedProductData.name,
                    "price": selectedProductData.price,
                    "units": units
                });
            }

            addReceipt();
            unitInput.value = "";
        } else {
            alert("Select a valid product.");
        }
    } else {
        alert("Enter a valid input.");
    }
}


function addUnits(n) {
    let units = document.getElementById("unitInput").value;
    units += n;
    document.getElementById("unitInput").value = units;
}

let dateAndTimePrinted = false; // Flag to track if date and time have been printed

//function to update date and time 
function updateDateAndTime() {
    let date = document.getElementById("dateDiv");
    let time = document.getElementById("timeDiv");

    if (!dateAndTimePrinted) {
        // Print date and time only once
        let currentDate = new Date();
        let formattedDate = currentDate.toLocaleDateString();
        let formattedTime = currentDate.toLocaleTimeString();

        date.innerHTML = `Date: ${formattedDate}`;
        time.innerHTML = `Time: ${formattedTime}`;
     
        dateAndTimePrinted = true; // Update the flag
    }
}

//function to add rows in the receipt containing details of the products added to the cart
function addReceipt() {
    let tableHtml = "";

    updateDateAndTime();

    for (let product of receipt) {
        let subtotal = product.price * product.units;
        tableHtml += `<tr>
            <td>${product.name}</td>
            <td>${product.price}</td>
            <td>${product.units}</td>
            <td>${subtotal}</td>
        </tr>`;

    }

    document.getElementById("receiptProducts").innerHTML = tableHtml;

    let totalPrice = 0;
    //calculating the total price every time a product is added or updated
    for (let product of receipt) {
        totalPrice += product.price * product.units;
    }

    // Calculate taxes evry time a product is added or updated
    let taxRate = 0.05; // 5%
    let taxes = totalPrice * taxRate;

    // Calculate the final amount due evry time a product is added or updated
    let amountDue = totalPrice + taxes;

    // Updating payment details like total, tax, amount due
    document.getElementById("price").textContent = `Total Price: ${totalPrice.toFixed(2)}`;
    document.getElementById("tax").textContent = `Taxes: ${taxes.toFixed(2)}`;
    document.getElementById("totalPrice").textContent = `Amount Due: ${amountDue.toFixed(2)}`;
}

//function for the working of New Transaction button
function newTransaction() {
    // Clear the receipt array 
    receipt = [];

    document.getElementById("unitInput").value = "";

    clearReceipt();

    alert("The current transaction will be deleted and the receipt will be cleared.");
}

//function to clear the date, time, and other elements of the receipt
function clearReceipt() {
    document.getElementById("receiptProducts").innerHTML = "";
    document.getElementById("price").textContent = "Total Price: 0";
    document.getElementById("tax").textContent = "Taxes: 0";
    document.getElementById("totalPrice").textContent = "Amount Due: 0";

    let date = document.getElementById("dateDiv");
    let time = document.getElementById("timeDiv");
    date.innerHTML = `Date:`;
    time.innerHTML = `Time:`;
}

//function for the working of the Pay button 
function pay() {
    // Clear the receipt array 
    receipt = [];

    //automatically clearing the receipt after the bill is paid.
    clearReceipt();

    //message to confirm that the bill is paid.
    alert("Thank you for shopping with us! The receipt will be cleared after you click ok.");
}

// Both, New transaction and pay button, clear the receipt when clicked. The difference between them is that if the user want to clear the receipt without paying due to some odd reason(eg. made some mistakes in adding the products), he/she can press the new transaction button to clear the receipt. Otherwise the receipt is automatically cleared when the user has paid the bill. 
//I have tried to remove as many bugs as i can. like the price cannot be entered until the product is not selected, if the price is already assigned to the product, and while updating the price the price is not entered(i.e. add price is clicked without entering the price), the price will not be updated, clearing the receipt array whenever the new transaction button or pay button is pressed(if i haven't done this the receipt would be empty but when i would be adding a product that was added in the receipt before clicking pay or new transaction button, it will give alert that the product is already in the receipt just because the it was not removed from the array), etc. Do let me know in the feedback if there is any other bug, so that i can improve my iq skills to build logic for a site or an app.
//Thank you 