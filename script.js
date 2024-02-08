document.addEventListener("DOMContentLoaded", (event) => {
  const btn = document.querySelector(".btn");
  const container = document.querySelector(".container");
  const budgetMain = document.querySelector(".budget-main");
  const nameValue = document.getElementById("name").value;
  const budgetValue = document.getElementById("budget").value;

  btn.addEventListener("click", function (e) {
    e.preventDefault();
    container.style.display = "none";
    budgetMain.style.display = "flex";
  });
  // Name and budget goes into local storage, and the "display none"
  localStorage.setItem("name", nameValue);
  localStorage.setItem("budget", budgetValue);
});
