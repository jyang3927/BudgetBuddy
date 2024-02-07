document.addEventListener("DOMContentLoaded", (event) => {
  const btn = document.querySelector(".btn");
  const container = document.querySelector(".container");
  const budgetMain = document.querySelector(".budget-main");

  btn.addEventListener("click", function (e) {
    e.preventDefault();
    container.style.display = "none";
    budgetMain.style.display = "flex";
  });
});
