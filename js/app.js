let currentPrice = [],
    currentvalue = [],
    finalPrice = [];

let initial, calPrice;
let count = 0,
    val = 1,
    alreadyExits = false,
    number = 1;
let showfinalPrice = 0;
let fPrice = 0,
    gPrice = 0;

let prize = document.querySelector("#prize");
let orderjs = document.getElementsByClassName("order");
let total = document.getElementById("prize");

let time = new Date();
let weeked = false;


$(document).ready(function() {
    initial();
    // each card action 
    $(".card").click(function() {
        // console.log(cards.childNodes[count]);
        $(".order-container").show(100);
        $(".order-box").show(500);
        $(".total").css("display", "flex");
        $(".show-address").css("display", "none");

        // get data 
        let img = $(this).find("img").attr("src"),
            alt = $(this).find("img").attr("alt"),
            cost = $(this).find(".cost").text(),
            clothname = $(this).find(".cloth-name").text(),
            clothid = "(" + $(this).find(".cloth-id").text() + ")";
        // console.log(img, cost, clothname, clothid);

        alreadyExits = false;
        // if same cloth id have,work this function
        let order = $(".order");
        for (let index = 0; index < order.length; index++) {
            console.log(order[index].childNodes);
            let exit = order[index].childNodes[2].childNodes[1].innerText;
            if (exit === clothid) {
                alreadyExits = true;
                alert("already have");
                $(`input`).val(val++);
            }
        };

        // check same item and add  order data
        if (alreadyExits === false) {
            currentPrice.push(Number(cost));
            if (weeked) {
                $(".order-box").append(`<div class='order'><div class='img-box'><img src='${img}' alt='${alt}'></div> <p class='name'>${clothname}<span class='id'>${clothid}</span></p><input type='text' class='number' value="1"/>  <ion-icon name="trash-outline" id="${count}" class="icon"></ion-icon> <p class="eachprize">${cost}</p><div class="discount">15%</div></div>`);
            } else {
                $(".order-box").append(`<div class='order'><div class='img-box'><img src='${img}' alt='${alt}'></div> <p class='name'>${clothname}<span class='id'>${clothid}</span></p><input type='text' class='number' value="1"/>  <ion-icon name="trash-outline" id="${count}" class="icon"></ion-icon> <p class="eachprize">${cost}</p></div>`);
            }
            count++;
            calPrice();
        };
    });

    // blur on input type
    $(document).on("blur", "input", function() {
        calPrice();
    })

    // delete icon btn action 
    $(document).on("click", ".icon", function() {
        currentPrice[this.id] = 0;
        $(this).closest(".order").remove();
        if ($(".order").length == 0) {
            currentPrice = [];
            currentvalue = [];
            finalPrice = [];
            count = 0;
        }
        calPrice();
    });

    // confirm btn 
    $(".confirm").click(function() {
        if ($(".confirm").text() == "Confirm") {
            // console.log("hay");
            $(".address-cotainer ").css("display", "flex");
            $(".order-box").hide(500);
            $(".order-box").empty();
            $(".deliver-container").show(500);
            $(".confirm").text("Place to Order");
        } else if ($(".confirm").text() == "Place to Order") {
            var id = $(".information .name");
            var ph = $(".information #phnumber");
            var address = $(".information #address");
            $(".address-cotainer").css("display", "none");
            $(".total").css("display", "none");
            $(".show-address").css("display", "block");
            $(".cancel ").css("display", "flex");
            // console.log(id, ph, address);
            $(".cusname").text(id.val());
            $(".cusphnum").text(ph.val());
            $(".cusadd").text(address.val());
            id.val(" ");
            ph.val(" ");
            address.val(" ");
            $(".confirm").text("Complete");
        } else {
            $(".order-container").hide(500);
            $(".cancel ").css("display", "none");
            $(".confirm").text("Confirm");
            currentPrice = [];
            currentvalue = [];
            finalPrice = [];
            alert("your order is completed");
        }

        $(document).on("change", "#deliverycost", function() {
            calPrice();
            let delivercost = Number($("#deliverycost").val());
            delivercost += gPrice;
            $(".total-prize p:last-of-type").text(delivercost);
        });
    });

    $(".cancel").click(function() {
        const cusname = $(".show-address .cusname");
        const cusphnum = $(".show-address .cusphnum");
        const cusadd = $(".show-address .cusadd");
        $(".show-address").css("display", "none");
        $(".cancel ").css("display", "none");
        $(".address-cotainer").css("display", "flex");
        $(".total").css("display", "flex");
        $(".confirm").text("Place to Order");
        $(".information .name").val(cusname.text());
        $(".information .name").val(cusphnum.text());
        $(".information .name").val(cusadd.text());
    });
});

// initial function state 
initial = () => {
    $(".total-name p:nth-of-type(2)").css("display", "none");
    $(".total-name p:first-of-type").css("display", "none");
    $(".total-prize p:nth-of-type(2)").css("display", "none");
    $(".total-prize p:first-of-type").css("display", "none");
    checkWeeked();
}

//  to give discount,check time 
function checkWeeked() {
    if (time.getDay() == 0 || time.getDay() == 6) {
        if (Number(time.getHours()) >= 9 && Number(time.getHours()) <= 19) {
            weeked = true;
            $(".total-name p:nth-of-type(2)").css({ "display": "flex", "color": "red" });
            $(".total-name p:first-of-type").css("display", "flex");
            $(".total-prize p:nth-of-type(2)").css({ "display": "flex", "color": "red" });
            $(".total-prize p:first-of-type").css("display", "flex");
        }

    }
}


// calculate Prize
calPrice = () => {
    fPrice = 0;
    // order value  
    for (let index = 0; index < orderjs.length; index++) {
        currentvalue[index] = Number(orderjs[index].childNodes[3].value);
    }
    console.log(currentPrice, currentvalue, finalPrice);
    // order price * order value add array 
    for (let index = 0; index < currentPrice.length; index++) {
        finalPrice[index] = currentPrice[index] * currentvalue[index];
    }
    for (let index = 0; index < finalPrice.length; index++) {
        fPrice += Number(finalPrice[index]);
    }
    if (weeked) {
        $(".total-prize p:first-of-type").text(fPrice);
        gPrice = parseInt(fPrice - (fPrice * 0.15));
        $(".total-prize p:last-of-type").text(gPrice);
    } else {
        gPrice = fPrice;
        $(".total-prize p:last-of-type").text(fPrice);
    }
}