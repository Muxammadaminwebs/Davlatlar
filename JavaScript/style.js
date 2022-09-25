"use strict"
async function Allcountry() {
    const response = await fetch('https://restcountries.com/v2/all')
    const result = await response.json()
    renderData(result)

}
Allcountry()


setInterval
// render
function renderData(data = []) {
    if (data.length === 0) {
        $(".all").innerHTML = `<span class="loader"></span>`;
    } else {
        $(".all").innerHTML = "";
        data.forEach((item) => {
            const card = createElement("div", "box p-3 d-flex", `<img src="${item.flags.png}" class="box-img" alt="img">
                       <div class="box-body">
                         <h3 class="contry">${item.name}</h3><p>${item.nativeName}</p></div>`)
            card.dataset.info = item.name
            $(".all").appendChild(card)
            card.addEventListener("click", (e) => {
                console.log(card.getAttribute("data-info"));
                rebderModal(card.getAttribute('data-info').toLowerCase())
            })
        })
    }
}
renderData()
// search countroes
async function searchCountry(query) {
     $(".all").innerHTML = `<span class="loader"></span>`;
    const data = await fetch(`https://restcountries.com/v2/name/${query}`);
    const res = await data.json();
    $(".all").innerHTML = "";
    if (res.massage) {
        $(".all").innerHTML = " <h1>Malumot topilmadi</h1>";
    } else {
        renderData(res);
    }
    console.log(res);
}
// search countroes
$(".search").addEventListener("keyup", (e) => {
    if (e.target.value.length === 0) {
        Allcountry();
    } else {
        searchCountry(e.target.value.trim().toLowerCase());
    }
})
$(".modalContent").style.display = "none"
async function rebderModal(data) {
    const result = await fetch(`https://restcountries.com/v2/name/${data}`);
    const res = await result.json();
    const modal = createElement("div", "modalw", `<img src="${res[0].flags.png}" class="flags" alt="card">
            <h2 class="countryName">${res[0].name}</h2><div class="countryInfo"><p class="alpha2Code">alpha2Code=(${res[0].alpha2Code})</p>
            <p class="borders">borders=${res[0].borders}</p><p class="population">population=(${res[0].population})</p>
            <p class="nativeName">nativeName=(${res[0].nativeName})</p>
            <p class="numericCode">numericCode=(${res[0].numericCode})</p>
            <p class = "timezones" > timezones=(${res[0].timezones})</p>
            <p class="demonym">demonym=(${res[0].demonym})</p>
            <p class="latlng">latlng=(${res[0].latlng})</p>
            <p class="region">region=(${res[0].region})</p>
            <p class="capital">capital=(${res[0].capital})</p>
            <p class="callingCodes">callingCodes=(${res[0].callingCodes})</p>
            <p class="languages">languages=(${res[0].languages})</p></div > `);
    $(".modalContent").style.display = "flex";
    $(".wrapper").appendChild(modal);
    console.log(data);
    console.log(res);
}
$(".closebtn").addEventListener("click", () => {
    $(".wrapper").innerHTML = "";
    $(".modalContent").style.display = "none";
})
