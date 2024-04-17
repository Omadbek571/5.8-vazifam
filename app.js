const form = document.querySelector(".form");
const nameInput = document.querySelector(".carName");
const ageInput = document.querySelector(".carSpeed");
const cityInput = document.querySelector(".carPrice");
const imgUrlInput = document.querySelector(".carImgUrl");
const colorInput = document.querySelector(".carColor");
const result = document.getElementById("carList");

document.addEventListener("DOMContentLoaded", function () {
  const cars = JSON.parse(localStorage.getItem("cars")) || [];
  cars.forEach(function (car) {
    const { id, name, speed, city, imgUrl, color } = car;
    addCarToList(id, name, speed, city, imgUrl, color);
  });
});

function generateId() {
  return Math.random().toString(36).substr(2, 9);
}

function saveDataToLocalStorage(id, name, speed, city, imgUrl, color) {
  const cars = JSON.parse(localStorage.getItem("cars")) || [];
  cars.push({ id, name, speed, city, imgUrl, color });
  localStorage.setItem("cars", JSON.stringify(cars));
}

function deleteDataFromLocalStorage(id) {
  const cars = JSON.parse(localStorage.getItem("cars")) || [];
  const updatedCars = cars.filter((car) => car.id !== id);
  localStorage.setItem("cars", JSON.stringify(updatedCars));
}

function addCarToList(id, name, speed, city, imgUrl, color) {
  const nameLi = document.createElement("li");
  nameLi.classList.add("list-item")
  nameLi.textContent = `Car name: ${name}`;

  const ageLi = document.createElement("li");
  ageLi.classList.add("list-item")
  ageLi.textContent = `Speed: ${speed}`;

  const cityLi = document.createElement("li");
  cityLi.classList.add("list-item")
  cityLi.textContent = `Price: ${city}`;

  const imgLi = document.createElement("img");
  imgLi.classList.add("img-item");
  imgLi.setAttribute("src", imgUrl);
  imgLi.setAttribute("alt", name);
  imgLi.style.width = "200px";
  imgLi.style.height = "150px";

  const colorLi = document.createElement("div");
  colorLi.classList.add("liclass");
  colorLi.textContent = `Color: `;
  colorLi.style.backgroundColor = color;
  colorLi.style.width = "200px";
  colorLi.style.height = "30px";

  const buttonLi = document.createElement("button");
  buttonLi.innerHTML = `<i class="fa-solid fa-trash" onclick="deleteTodo(${id})"></i>`;
  
  buttonLi.classList.add("delete-btn");
  buttonLi.addEventListener("click", function () {
    deleteDataFromLocalStorage(id);
    deleteCarFromUI(id);
  });

  const list = document.createElement("ul");
  list.classList.add("carInfo");
  list.id = id; 

  list.appendChild(imgLi);
  list.appendChild(nameLi);
  list.appendChild(ageLi);
  list.appendChild(cityLi);
  list.appendChild(colorLi);
  list.appendChild(buttonLi);

  result.appendChild(list);
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const id = generateId(); 
  const name = nameInput.value;
  const speed = ageInput.value;
  const city = cityInput.value;
  const imgUrl = imgUrlInput.value;
  const color = colorInput.value;

  addCarToList(id, name, speed, city, imgUrl, color);
  saveDataToLocalStorage(id, name, speed, city, imgUrl, color);

  nameInput.value = "";
  ageInput.value = "";
  cityInput.value = "";
  imgUrlInput.value =
    "https://avatars.mds.yandex.net/i?id=8f54182029091a94870fccc8529b0f1dc7b8e38c-10814230-images-thumbs&n=13";
});

function deleteCarFromUI(id) {
  const car = document.getElementById(id);
  if (car) {
    car.remove();
  }
}
