
let colorsDay;
let colors;
let image;
let mesValue;
let radioSelect;
let radioSelectLetra;
let colorsNames;
let select;
let option;
let selectA;
let changeColor;
let diaValue;
let imageArray;
let randomNumber;
let local = {};

//COLOR OF THE DAY
axios.get("https://api.harvardartmuseums.org/spectrum?size=366&apikey=5695fa7b-f550-422e-981c-a150cd458f50&page=1")
    .then(function (response) {
        if (response.status != 200) {
            alert("Sorry, we are taking a coffee.\nPlease reload the page.");
        }
        colorsDay = response.data.records;

    }).then(function () {
        document.querySelector("#form").addEventListener("submit", function (e) {
            e.preventDefault();
            mesValue = document.querySelector("#mes").value;
            diaValue = document.querySelector("#dia").value;

            if (mesValue && diaValue) {
                document.querySelector(".errorOne").innerHTML = "";
                if (mesValue == 2 && 1 <= diaValue && diaValue <= 29) {
                    document.querySelector(".errorOne").innerHTML = "";
                    colorsDayFunct();
                }
                else if (4 <= mesValue && mesValue <= 6 && mesValue % 2 == 0 && 1 <= diaValue && diaValue <= 30) {
                    document.querySelector(".errorOne").innerHTML = "";
                    colorsDayFunct();
                }
                else if (9 <= mesValue && mesValue <= 11 && mesValue % 2 != 0 && 1 <= diaValue && diaValue <= 30) {
                    document.querySelector(".errorOne").innerHTML = "";
                    colorsDayFunct();
                }
                else if (8 <= mesValue && mesValue <= 12 && mesValue % 2 == 0 && 1 <= diaValue && diaValue <= 31) {
                    document.querySelector(".errorOne").innerHTML = "";
                    colorsDayFunct();
                }
                else if (1 <= mesValue && mesValue <= 7 && mesValue % 2 != 0 && 1 <= diaValue && diaValue <= 31) {
                    document.querySelector(".errorOne").innerHTML = "";
                    colorsDayFunct();
                }
                else {
                    document.querySelector(".errorOne").innerHTML = "Enter a day that exists in our calendar.";
                }
            }
            else {
                document.querySelector(".errorOne").innerHTML = "Please, enter all values.";
            }
        })
    })

//COLORS
axios.get("https://api.harvardartmuseums.org/color?size=147&apikey=5695fa7b-f550-422e-981c-a150cd458f50&")
    .then(function (response) {
        if (response.status != 200) {
            alert("Sorry, we are taking a coffee.\nPlease reload the page.");
        }
        colors = response.data.records;
    }).then(function () {
        document.querySelector("#formTwo").addEventListener("click", function () {
            selectALetter();

        })
        document.querySelector("#select").addEventListener("click", function () {
            if (!option) {
                document.querySelector(".errorThree").innerHTML = "Before selecting a color, select a letter.";
            }
            else {
                document.querySelector(".errorThree").innerHTML = "";
                document.querySelector("#select").addEventListener("change", function () {
                    selectAColor();
                })
            }
        })      

    })

//RANDOM IMAGE
imageArray = ["nega/15303290.jpg", "nega/15303291.jpg", "nega/15303295.jpg", "nega/15303306.jpg", "nega/15303310.jpg", "nega/15303319.jpg", "nega/15303337.jpg", "nega/15303349.jpg", "nega/15303355.jpg", "nega/15303357.jpg", "nega/15303376.jpg", "nega/15303382.jpg", "nega/15303383.jpg", "nega/15303400.jpg", "nega/15324555.jpg", "nega/15324558.jpg", "nega/15324559.jpg", "nega/15324608.jpg", "nega/15324616.jpg", "nega/15331263.jpg", "nega/15331267.jpg", "nega/15331280.jpg", "nega/15331301.jpg", "nega/15331344.jpg", "nega/15331362.jpg", "nega/15331370.jpg", "nega/15331372.jpg", "nega/15331374.jpg", "nega/15336147.jpg", "nega/15336151.jpg"];
document.querySelector("#imgBut").addEventListener("click", function () {
    randomImage();
})

//LOCALSTORAGE
document.querySelector("#fav").addEventListener("click", function () { 
    if (local.dateDayMonthL && local.colorL && local.imageL) {
        document.querySelector(".errorFour").innerHTML = "";
        favorite();
    }
    else {
        document.querySelector(".errorFour").innerHTML = "Please, choose all options.";
    }
})

document.querySelector("#myfav").addEventListener("click", function () { 
    pintarLocal();
})


//FUNCTIONS
function colorsDayFunct() {
    let i = 0;
    let exit = false
    while (exit == false) {
        if (colorsDay[i].month == mesValue && colorsDay[i].day == diaValue) {
            exit = true
        }
        else { i++; }
    }

    document.querySelector(".usuDivTwo").innerHTML = `<span class="usuDivTwoP">You visited the museum: ${colorsDay[i].day}/${colorsDay[i].month}/some year </span>`
    document.querySelector(".usuDivTwoP").style.background = colorsDay[i].color;

    local.dateDayMonthL = "";  
    local.dateDayMonthL = i;
}

function selectALetter() {
    radioSelect = document.formTwo.colores;
    radioSelectLetra = radioSelection(radioSelect);

    colorsNames = [];
    for (let i = 0; i < colors.length; i++) {
        colorsNames.push(colors[i].name);
    }

    select = document.querySelector("#select");
    option;
    select.innerHTML = "";
    selectA = document.createElement("option")
    selectA.innerHTML = "COLORS";
    select.appendChild(selectA);
    for (let i = 0; i < colorsNames.length; i++) {
        if (colorsNames[i].substring(0, 1) == radioSelectLetra) {
            option = document.createElement("option");
            option.value = colors[i].name;
            option.innerHTML = colors[i].name;
            option.style.background = colors[i].hex;
            select.appendChild(option);
        }
    }
}

function radioSelection(seleccionado) {
    for (i = 0; i < seleccionado.length; i++) {
        if (seleccionado[i].checked) {
            seleccionadoValue = seleccionado[i].value;
            return seleccionadoValue
        }
    }
}

function selectAColor() {

    document.querySelector(".usuP").innerHTML = "";
    changeColor = document.querySelector("#select").value;
    let y = 0;
    let exit = false
    while (exit == false) {
        if (colorsNames[y] == changeColor) {
            exit = true
        }
        else {
            y++;
        }
    }
    document.querySelector(".usuDivOne").style.background = colors[y].hex;
    document.querySelector(".usuP").innerHTML = `<img class="imgLogoPrint" src="archivos/logo-03.png"">`

    local.colorL = "";
    local.colorL = y;
}

function randomImage() {
    randomNumber = Math.floor(Math.random() * (imageArray.length - 1))
    document.querySelector(".imgUsu").innerHTML = `<img class="imgRamUsu" src=${imageArray[randomNumber]}>`
    local.imageL = "";
    local.imageL = randomNumber;
}


function favorite() {
    let localArray = [];
    if (localStorage.getItem("favs")) { 
        localArray = localStorage.getItem("favs"); 
        localArray = JSON.parse(localArray); 
        if (!localArray.includes(local, 0)) { 
            localArray.push(local); 
        }
    }
    else {
        localArray.push(local); 
    }
    localStorage.setItem("favs", JSON.stringify(localArray)); 
}

function pintarLocal() {
    let infoLocal;
    infoLocal = localStorage.getItem("favs");
    infoLocal = JSON.parse(infoLocal);

    if (localStorage.getItem("favs")) {
        document.querySelector(".noFavs").innerHTML = "";
        document.querySelector("#favs").innerHTML = "";
        for (let i = 0; i < infoLocal.length; i++) {
            document.querySelector("#favs").innerHTML += `<div id="usuDivOneFav${i}" class="usuDivOneFav"><div id="usuDivTwoFav${i}" class="usuDivTwoFav"></div><div id="imgUsuFav${i}" class="imgUsuFav"></div><div id="usuPFav${i}" class="usuPFav"></div></div>`
            document.querySelector(`#usuDivTwoFav${i}`).innerHTML += `<span id="usuDivTwoPFav${i}" class="usuDivTwoPFav">You visited the museum: ${colorsDay[infoLocal[i].dateDayMonthL].day}/${colorsDay[infoLocal[i].dateDayMonthL].month}/some year </span>`
            document.querySelector(`#usuDivTwoPFav${i}`).style.background += colorsDay[infoLocal[i].dateDayMonthL].color;
            document.querySelector(`#usuDivOneFav${i}`).style.background += colors[infoLocal[i].colorL].hex;
            document.querySelector(`#usuPFav${i}`).innerHTML += `<img class="imgLogoPrint" src="archivos/logo-03.png"">`
            document.querySelector(`#imgUsuFav${i}`).innerHTML += `<img class="imgRamUsu" src=${imageArray[infoLocal[i].imageL]}>`
        }
    }
    else {
        document.querySelector(".noFavs").innerHTML = "You don´t have any print.";
    }
}