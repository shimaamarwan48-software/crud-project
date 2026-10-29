let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("create");
let temp;
let mood = "create";
// get total
function getTotal() {
  if (price.value != "") {
    let result = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = result;
    total.style.backgroundColor = "green";
    total.style.color = "white";
  } else {
    total.innerHTML = "";
    total.style.backgroundColor = "pink";
    total.style.color = "black";
  }
}
// create product
let newdata;
if (localStorage.product != null) {
  newdata = JSON.parse(localStorage.product);
} else {
  newdata = [];
}
submit.onclick = function () {
  let dataPro = {
    title: title.value.toLowerCase(),
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value.toLowerCase(),
  };
  if (
    title.value != "" &&
    price.value != "" &&
    category.value != "" &&
    count.value < 100
  ) {
    if (mood === "create") {
      if (dataPro.count > 1) {
        for (let i = 0; i < dataPro.count; i++) {
          newdata.push(dataPro);
        }
      } else {
        newdata.push(dataPro);
      }
    } else {
      newdata[temp] = dataPro;
      mood = "create";
      submit.innerHTML = "create";
      count.style.display = "block";
    }
    clearData();
  }
  //   save in localStorage
  localStorage.setItem("product", JSON.stringify(newdata));
  clearData();
  showData();
};
// clear inputs
function clearData() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "";
  count.value = "";
  category.value = "";
}
//read
function showData() {
  getTotal();
  let table = "";
  for (let i = 0; i < newdata.length; i++) {
    table += `
      <tr>
      <td>${[i + 1]}</td>
      <td>${newdata[i].title}</td>
      <td>${newdata[i].price}</td>
      <td>${newdata[i].taxes}</td>
      <td>${newdata[i].ads}</td>
      <td>${newdata[i].discount}</td>
      <td>${newdata[i].total}</td>
      <td>${newdata[i].category}</td>
      <td><button onclick='updateData(${i})' id="update">update</button></td>
      <td><button onclick="deleteItem(${i})" id="delete">delete</button></td>
      </tr>
      `;
  }
  document.getElementById("tbody").innerHTML = table;
  let deleteBtn = document.getElementById("deleteAll");
  if (newdata.length > 0) {
    deleteBtn.innerHTML = `<button onclick='deleteAll()'>Delete All(${newdata.length})</button>`;
  } else {
    deleteBtn.innerHTML = "";
  }
}
showData();
//delete
function deleteItem(i) {
  newdata.splice(i, 1);
  localStorage.product = JSON.stringify(newdata);
  showData();
}
function deleteAll() {
  localStorage.clear();
  newdata.splice(0);
  showData();
}

//update
function updateData(i) {
  title.value = newdata[i].title;
  price.value = newdata[i].price;
  taxes.value = newdata[i].taxes;
  ads.value = newdata[i].ads;
  discount.value = newdata[i].discount;
  getTotal();
  count.style.display = "none";
  category.value = newdata[i].category;
  submit.innerHTML = "Update";
  mood = "update";
  temp = i;
  scroll({
    top: 0,
    behavior: "smooth",
  });
}
//search
let searchMood = "title";
function getSearchMood(id) {
  let search = document.getElementById("search");
  if (id == "searchTitle") {
    searchMood = "title";
  } else {
    searchMood = "category";
  }
  search.focus();
  search.placeholder = "Search By " + searchMood;
  search.value = "";
  showData();
}
function searchData(value) {
  let table = "";
  for (let i = 0; i < newdata.length; i++) {
    if (searchMood === "title") {
      if (newdata[i].title.includes(value.toLowerCase())) {
        table += `
         <tr>
         <td>${[i]}</td>
         <td>${newdata[i].title}</td>
         <td>${newdata[i].price}</td>
         <td>${newdata[i].taxes}</td>
         <td>${newdata[i].ads}</td>
         <td>${newdata[i].discount}</td>
         <td>${newdata[i].total}</td>
         <td>${newdata[i].category}</td>
         <td><button onclick='updateData(${i})' id="update">update</button></td>
         <td><button onclick="deleteItem(${i})" id="delete">delete</button></td>
         </tr>
         `;
      }
    } else {
      if (newdata[i].category.includes(value.toLowerCase())) {
        table += `
         <tr>
         <td>${[i]}</td>
         <td>${newdata[i].title}</td>
         <td>${newdata[i].price}</td>
         <td>${newdata[i].taxes}</td>
         <td>${newdata[i].ads}</td>
         <td>${newdata[i].discount}</td>
         <td>${newdata[i].total}</td>
         <td>${newdata[i].category}</td>
         <td><button onclick='updateData(${i})' id="update">update</button></td>
         <td><button onclick="deleteItem(${i})" id="delete">delete</button></td>
         </tr>
         `;
      }
    }
  }
  document.getElementById("tbody").innerHTML = table;
}
