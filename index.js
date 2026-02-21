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

loadData();