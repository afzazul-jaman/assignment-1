const loadData = () => {
  fetch('https://fakestoreapi.com/products')
    .then(res => res.json())
    .then(data => displayData(data))
}

const displayData = (data) => {

  const productContainer = document.querySelector(".product-grid");
  productContainer.innerHTML = "";

  data.forEach(element => {

    const cardDiv = document.createElement("div");

    cardDiv.innerHTML = `
      <div class="card">
        <img src="${element.image}" alt="${element.title}" class="product-img">

        <span class="category">${element.category}</span>

        <h3 class="title">${element.title.substring(0,45)}...</h3>

        <div class="rating">
          ⭐ <span>${element.rating.rate} (${element.rating.count})</span>
        </div>

        <p class="price">$${element.price}</p>

        <div class="button-group">
          <button class="btn btn-outline">Details</button>
          <button class="btn btn-primary">Add</button>
        </div>
      </div>
    `;

    productContainer.appendChild(cardDiv);
  });
}

const loadCategories = () => {
  fetch('https://fakestoreapi.com/products/categories')
    .then(res => res.json())
    .then(data => displayCategories(data))
}

const displayCategories = (categories) => {

  const container = document.getElementById("category-container");

  const allBtn = document.createElement("button");
  allBtn.innerText = "All";
  allBtn.className = "category-btn active";
  allBtn.onclick = () => {
    setActive(allBtn);
    loadData();
  };
  container.appendChild(allBtn);

  categories.forEach(cat => {
    const btn = document.createElement("button");
    btn.innerText = cat;
    btn.className = "category-btn";

    btn.onclick = () => {
      setActive(btn);
      loadCategoryProducts(cat);
    };

    container.appendChild(btn);
  });
}

const loadCategoryProducts = (category) => {
  fetch(`https://fakestoreapi.com/products/category/${category}`)
    .then(res => res.json())
    .then(data => displayData(data))
}

const setActive = (clickedBtn) => {
  document.querySelectorAll(".category-btn").forEach(btn =>
    btn.classList.remove("active")
  );
  clickedBtn.classList.add("active");
}

loadCategories();
loadData();