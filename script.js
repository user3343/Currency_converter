const BASE_URL =
  "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/";

const dropdown = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");
const input = document.querySelector("input");

for (const select of dropdown) {
  for (currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    select.append(newOption);
    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "selected"; // selected the first country(currCode) which is USD
    } else if (select.name === "to" && currCode === "INR") {
      newOption.selected = "selected"; // selected the first country(currCode) which is INR,.
    }
  }
  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}

const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

btn.addEventListener("click", async (evt) => {
  evt.preventDefault();
  let amount = document.querySelector(".amount input");

  let amtVal = amount.value;
  if (amtVal == "" || amtVal < 1) {
    amtVal = 1;
    amount.value = 1;
  }
  const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
  let response = await fetch(URL);
  console.log(response);
  let data = await response.json();
  let rate = data[toCurr.value.toLowerCase()];
  rate = Math.floor(rate);
  console.log(rate);
  let finalAmount = rate * amtVal;

  msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
});
