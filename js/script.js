// Write solution code here to dynamically add the form fields 

// Save the order details on clicking the submit button
var count = 0;
var flag = true;
var submittedOrders = [];
var orderArr = [];
var sum = 0;
var orderId = 101;
var categoryNameCol = document.querySelector("#categoryName");
//doubt
var quantityCol = document.querySelector("#quantity")
var itemNameCol = document.querySelector("#itemName");
var amountCol = document.querySelector("#amount");
var priceCol = document.querySelector("#price");
var input6;
var input5;
document.querySelector("#orderId").value = orderId;
var customerDetails = document.querySelectorAll("#customerDetails input");


let orderDetailsOption = () => {
    if (flag) {
        flag = false;
        count++;
        var input1 = document.createElement("input");
        input1.type = "text";
        input1.placeholder = "Category Name";
        input1.style.width = "100%";
        input1.class = "tex";
        categoryNameCol.appendChild(input1);

        let input2 = document.createElement("input");
        input2.placeholder = "Item Name";
        input2.type = "text";
        input2.class = "tex";
        input2.style.width = "100%";
        itemNameCol.appendChild(input2);

        let input3 = document.createElement("input");
        input3.type = "number";
        input3.placeholder = "Price";
        input3.style.gridArea = "a"
        input3.class = "num";
        input3.style.width = "100%"
        input3.addEventListener("input", () => {
            if ((input4.value != "") && (input3.value != "")) {
                input5.value = input3.value * input4.value;
                input6.value = "Rs " + (Number(input5.value) + sum);
            }
        })
        priceCol.appendChild(input3);

        let input4 = document.createElement("input");
        input4.type = "number";
        input4.placeholder = "Quantity";
        input4.style.width = "100%"
        input4.class = "num";
        input4.addEventListener("input", () => {
            if ((input4.value != "") && (input3.value != "")) {
                input5.value = input3.value * input4.value;
                input6.value = "Rs " + (Number(input5.value) + sum);
            }
        })
        quantityCol.appendChild(input4);

        input5 = document.createElement("input");
        input5.type = "number";
        input5.placeholder = "Amount";
        input5.style.width = "100%";
        input5.disabled = true;
        amountCol.appendChild(input5);

        let addbtn = document.createElement("button")
        addbtn.appendChild(document.createTextNode("Done"));
        addbtn.style.marginTop = "20px";
        document.querySelector("#btn").appendChild(addbtn);
        if (count == 1) {
            totalAmount();
        }
        addbtn.addEventListener("click", () => {
            if (validation()) {

                let orderObj = {
                    categoryName: input1.value,
                    itemName: input2.value,
                    price: input3.value,
                    quantity: input4.value,
                    amount: input5.value
                }
                sum += Number(input5.value);
                if (count == 1) {
                    orderName();
                }
                orderArr.push(orderObj);
                displayOrderDetails(orderObj);
                addbtn.remove();
                flag = true
                let inputs = document.querySelectorAll("#orderDetails input");
                inputs.forEach(elem => { elem.remove() });
            }
        });
    }

}




function validation() {
    let count2 = 0;
    let spans = document.querySelectorAll("#orderDetails span");
    if (spans.length > 0) {
        spans.forEach((el) => {
            el.remove();
        })
    }
    let spans1 = document.querySelectorAll("#orderRow div");
    for(let i = 0 ; i < spans1.length-1 ; i++){
        if (spans1[i].lastElementChild.value == null || spans1[i].lastElementChild.value == "") {
            let span = document.createElement("span");
            span.style.color = "red";
            span.style.width = "100%";
            spans1[i].appendChild(span);
            span.innerHTML = "* can't be empty";
            spans1[i].addEventListener("input", () => {
                span.remove();
            })
        } else { count2++; }
    }
    if (priceCol.lastElementChild.value <= 0) {
        let span = document.createElement("span");
        span.style.color = "red";
        span.style.width = "100%";
        span.class = "orderSpan";
        priceCol.appendChild(span);
        span.innerHTML = "* can't be negative or 0";

        priceCol.addEventListener("input", () => {
            span.remove();
        })
    } else { count2++; }
  
    if (quantityCol.lastElementChild.value <= 0) {
        let span = document.createElement("span");
        span.style.color = "red";
        span.style.width = "100%";
        span.class = "orderSpan";
        quantityCol.appendChild(span);
        span.innerHTML = "* can't be negative or 0";

        quantityCol.addEventListener("input", () => {
            span.remove();
        })
    } else { count2++; }

    if (count2 == 6) {
        return true;
    }
    else {
        return false;
    }
}

function orderName() {
    let cols = document.querySelectorAll("#orderRow div")
    for (let i = 0; i < cols.length; i++) {
        let element = document.createElement("h6");
        switch (i) {
            case 0:
                element.appendChild(document.createTextNode("Category Name"));
                categoryNameCol.appendChild(element);
                break;
            case 1:
                element.appendChild(document.createTextNode("Item Name"));
                itemNameCol.appendChild(element);
                break;
            case 2:
                element.appendChild(document.createTextNode("Price"));
                priceCol.appendChild(element);
                break;
            case 3:
                element.appendChild(document.createTextNode("Quantity"));
                quantityCol.appendChild(element);
                break;
            case 4:
                element.appendChild(document.createTextNode("Amount"));
                amountCol.appendChild(element);
                break;
        }
    }
}

function displayOrderDetails(obj) {

    let categoryName = document.createElement("p");
    categoryName.appendChild(document.createTextNode(obj.categoryName));
    categoryNameCol.appendChild(categoryName);

    let itemName = document.createElement("p");
    itemName.appendChild(document.createTextNode(obj.itemName));
    itemNameCol.appendChild(itemName);

    let price = document.createElement("p");
    price.appendChild(document.createTextNode(obj.price));
    priceCol.appendChild(price);

    let quantity = document.createElement("p");
    quantity.appendChild(document.createTextNode(obj.quantity));
    quantityCol.appendChild(quantity);

    let amount = document.createElement("p");
    amount.appendChild(document.createTextNode(obj.amount));
    amountCol.appendChild(amount);


}
function submitForm() {
    let address = document.querySelector("textarea");
    let customerName = customerDetails[1].value;
    let emailId = customerDetails[2].value;
    let contactNumber = customerDetails[3].value;
    let orderDate = customerDetails[4].value;
    let addr = address.value;
    let count = 0;
    if (address.value == null || address.value == "") {
        let span = address.nextElementSibling;
        address.addEventListener("input", () => {
            span.innerHTML = "";

        })
        span.innerHTML = "* this field can not be empty";
    } else if (address.value.length < 10) {
        let span = address.nextElementSibling;
        span.innerHTML = "Address should have atleast 10 characters";
    }
    else {
        let span = address.nextElementSibling;
        span.innerHTML = "";
        count++;
    }

    customerDetails.forEach((elem) => {
        let span = elem.nextElementSibling;
        if (elem.value == "") {
            elem.addEventListener("input", () => {
                span.innerHTML = "";
            })
            span.innerHTML = "* this field can not be empty";
        }
        else {
            // span.innerHTML = "";
            count++;

        }
        if (count == 6) {
            if (orderArr.length > 0) {
                let submitOrderObj = {
                    "orderId": orderId,
                    "CustomerName": customerName,
                    "emailId": emailId,
                    "contactNumber": contactNumber,
                    "orderDate": orderDate,
                    "address": addr,
                    "orderDetails": orderArr
                }
                orderId++;
                submittedOrders.push(submitOrderObj);
                showAlert()
                console.log(submittedOrders)
                document.querySelector("#submitForm").reset();
                let ps = document.querySelectorAll("#orderRow p");
                ps.forEach((el) => {
                    el.remove();
                })
                let h6 = document.querySelectorAll("#orderRow h6");
                h6.forEach((el) => {
                    el.remove();
                })
                count = 0;
                sum = 0 ;
                input6.value = 0;
                orderArr = [];
                document.querySelector("#orderId").value = orderId;


            } else {
                alert("Add atleast one order")
            }

        }

    })







}

function totalAmount() {
    let totalAmt = document.createElement("h6");
    totalAmt.style.display = "inline";
    totalAmt.appendChild(document.createTextNode("Total Amount :"));
    input6 = document.createElement("input");
    totalAmt.appendChild(input6);
    input6.style.display = "inline-block";
    input6.type = "text";
    input6.id = "totalA";
    input6.disabled = true;
    document.querySelector("#totalAmt").appendChild(totalAmt);

}

function calculateTotalAmt(obj) {
    obj.forEach(element => {
        sum += element.amount;
    })
    console.log(sum);
    return sum;

}

function showAlert(){
    alert(`Customer Name : ${customerDetails[1].value} \nEmail Id : ${customerDetails[2].value} \nContact No : ${customerDetails[3].value} \nTotal Amount To be pay : Rs ${sum}`);
}


