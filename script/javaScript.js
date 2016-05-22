/*
 * Name:  [Hamzah Shafeeq]
 * Assignment:  [Assignment2]

 * [This is the javascript for the pizza order web site. The app will validate
 *  all the information before it process the order. Also it will show an 
 *  error message to inform the user where they have made a mistake].
*/
function placeOrder() {
    var COST_SMALL = 8.99;
    var COST_MEDIUM = 10.99;
    var COST_LARGE = 12.99;
    var COST_EXTRA_LARGE = 14.99;
    var TOPPING_SMALL = 0.85;
    var TOPPING_MEDIUM = 0.95;
    var TOPPING_LARGE = 1.00;
    var TOPPING_EXTRA_LARGE = 1.10;
    var SMALL = "Small";
    var MEDIUM = "Medium";
    var LARGE = "Large";
    var EXTRA_LARGE = "Extra Large";
    var HST = 0.13;
    var size = 0;
    var numToppings = 0;

    var isEveryThingOk = true;
    //validate and setup the first 4 fields (name, address, city , provance).
    for (var i = 0; i < 4; i++) {
        var value = document.forms[0]["input-" + i].value;
        if (document.forms[0]["input-" + i].value !== ("")) {
            document.getElementById("output-" + i).innerHTML = value;
            document.getElementById("warning-input-" + i).innerHTML = "";
        } else {
            document.getElementById("warning-input-" + i).innerHTML =
                    "This part must be filled";
            isEveryThingOk = false;
        }
    }
    //validate and setup the last two fields (postal code, phone).
    var postaCode = document.forms[0]["input-4"].value;
    var patren1 = /^[A-z][0-9][A-z] ?[0-9][A-z][0-9]/;
    if (patren1.test(postaCode)) {
        document.getElementById("output-5").innerHTML = postaCode;
    } else {
        document.getElementById("warning-input-4").innerHTML = "postal\n\
         code is in the worng format ex. A0A 0A0";
        isEveryThingOk = false;
    }
    var patren2 = /^[0-9]{3} ?-?[0-9]{3} ?-?[0-9]{4}/;
    var phone = document.forms[0]["input-5"].value;
    if (patren2.test(phone)) {
        document.getElementById("output-4").innerHTML = "<h4>Phone: </h4>" 
                + phone ;
    } else {
        document.getElementById("warning-input-5").innerHTML = "phone is in\n\
        the wrong format";
        isEveryThingOk = false;
    }
    //the radio buttons:
    if (document.getElementById("opt-small").checked) {
        document.getElementById("size").innerHTML = "<h4>Size: </h4>" + SMALL;
        document.getElementById("size-charge").innerHTML = "$" + COST_SMALL;
        size = 1;
    } else if (document.getElementById("opt-medium").checked) {
        document.getElementById("size").innerHTML = "<h4>Size: </h4>" + MEDIUM;
        document.getElementById("size-charge").innerHTML = "$" + COST_MEDIUM;
        size = 2;
    } else if (document.getElementById("opt-large").checked) {
        document.getElementById("size").innerHTML = "<h4>Size: </h4>" + LARGE;
        document.getElementById("size-charge").innerHTML = "$" + COST_LARGE;
        size = 3;
    } else if (document.getElementById("opt-extra-large").checked) {
        document.getElementById("size").innerHTML = "<h4>Size: </h4>" 
                + EXTRA_LARGE;
        document.getElementById("size-charge").innerHTML = "$" + 
                COST_EXTRA_LARGE;
        size = 4;
    }
    //the check boxes:
    var nameToppings = "";
    var elements = document.forms[0].elements;
    for (var element in elements){
        if(elements.item(element).type === "checkbox"){
            if(elements.item(element).checked){
                nameToppings += (elements.item(element).value + ", ");
                numToppings += 1;
            }
        }
    }
    //setup the toppings.
    document.getElementById("toppings").innerHTML = "<h4>Toppings: </h4>" 
            + nameToppings;
    //cost of the toppings & the total:
    var toppingCost = 0.0;
    var total;
    if (size === 1) {
        toppingCost = numToppings * TOPPING_SMALL;
        total = toppingCost + COST_SMALL;
    } else if (size === 2) {
        toppingCost = numToppings * TOPPING_MEDIUM;
        total = toppingCost + COST_MEDIUM;
    } else if (size === 3) {
        toppingCost = numToppings * TOPPING_LARGE;
        total = toppingCost + COST_LARGE;
    } else if (size === 4) {
        toppingCost = numToppings * TOPPING_EXTRA_LARGE;
        total = toppingCost + COST_EXTRA_LARGE;
    }
    //calc the hst.
    var hst = total * HST;
    document.getElementById("toppings-charge").innerHTML = "$" 
            + toppingCost.toFixed(2);
    document.getElementById("hst").innerHTML = "$" + hst.toFixed(2);
    document.getElementById("total").innerHTML = "$" + total;

    //check if everything has been filled correctly:
    if (isEveryThingOk && size !== 0 && numToppings !== 0) {
        hide();
    } else {
        document.getElementById("error").style.display = "block";
        document.getElementById("error").innerHTML = "Oops, you have missed \n\
        filling one or more of the feilds. Please make sure you fill \n\
        all the feilds at the top, chose your size and toppings, \n\
        then press submit.";
    }
}

//function to hide the first div (#first) and show the second div instead
//(#second).
function hide() {
    document.getElementById("first").style.display = "none";
    document.getElementById("second").style.display = "block";
}

//function to prepare the program for another order.
function anotherOrder() {
    numToppings = 0;
    size = 0;
    location.reload();
    document.getElementById("first").style.display = "block";
    document.getElementById("second").style.display = "none";
}
