$(document).ready(function () {
  $('#myTable1').DataTable();
});

$(document).ready(function () {
  $('#myTable2').DataTable();
});

// Get the canvas element
var ctx = document.getElementById('salesChart').getContext('2d');

// Sample data for the sales chart
var data = {
  labels: ['September', 'October', 'November', 'December'],
  datasets: [{
    label: 'Sales',
    backgroundColor: 'rgba(75, 192, 192, 0.2)',
    borderColor: 'rgba(75, 192, 192, 1)',
    borderWidth: 1,
    data: [65000, 55000, 70000, 85000]
  }]
};

// Configure the chart options
var options = {
  scales: {
    y: {
      beginAtZero: true,
      scaleLabel: {
        display: true,
        labelString: '%'
      }
    }
  }
};

// Create the sales chart
var salesChart = new Chart(ctx, {
  type: 'bar',
  data: data,
  options: options
});

function validateForm(event) {
  event.preventDefault(); // Prevent the default form submission

  var passwordInput = document.getElementById('password');
  var password = passwordInput.value;

  if (password === "1234") {
    alert("Password is correct. Redirecting...");
    window.location.href = "admin.php";
  } else {
    alert("Incorrect password. Please try again.");
    passwordInput.value = "";
  }
}


  document.addEventListener("DOMContentLoaded", function () {
    const cartContainer = document.getElementById("cart-container");
    const openCartBtn = document.getElementById("open-cart-btn");
    const cartList = document.getElementById("cart");
    const totalSpan = document.getElementById("total");
    let total = 0;

    openCartBtn.addEventListener("click", function () {
      // Toggle the cart visibility with a transition from the right
      const rightValue = getComputedStyle(cartContainer).right;
      if (rightValue === "0px") {
        cartContainer.style.right = "-300px";
      } else {
        cartContainer.style.right = "0";
      }
    });

    document.addEventListener("click", function (event) {
      if (event.target.classList.contains("add-to-cart")) {
        const product = event.target.getAttribute("data-product");
        const price = parseFloat(event.target.getAttribute("data-price"));

        // Check if the product is already in the cart
        const existingItem = Array.from(cartList.children).find(item => item.dataset.product === product);

        if (existingItem) {
          // If the product is already in the cart, update the quantity
          const quantitySpan = existingItem.querySelector(".quantity");
          const quantity = parseInt(quantitySpan.textContent) + 1;
          quantitySpan.textContent = quantity;
        } else {
          // If the product is not in the cart, add it
          const listItem = document.createElement("li");
          listItem.classList.add("list-group-item");
          listItem.dataset.product = product;
          listItem.dataset.price = price;
          listItem.innerHTML = `
            ${product} - $${price.toFixed(2)} 
            <span class="quantity">1</span> 
            <button class="btn btn-outline-secondary btn-sm mx-2 add-item">+</button> 
            <button class="btn btn-outline-secondary btn-sm remove-item">-</button>
          `;

          cartList.appendChild(listItem);
        }

        // Update total
        total += price;
        totalSpan.textContent = total.toFixed(2);
      } else if (event.target.classList.contains("add-item")) {
        const listItem = event.target.closest("li");
        const price = parseFloat(listItem.dataset.price);

        // Update quantity
        const quantitySpan = listItem.querySelector(".quantity");
        const quantity = parseInt(quantitySpan.textContent) + 1;
        quantitySpan.textContent = quantity;

        // Update total
        total += price;
        totalSpan.textContent = total.toFixed(2);
      } else if (event.target.classList.contains("remove-item")) {
        const listItem = event.target.closest("li");
        const price = parseFloat(listItem.dataset.price);

        // Update quantity
        const quantitySpan = listItem.querySelector(".quantity");
        const quantity = parseInt(quantitySpan.textContent) - 1;

        if (quantity === 0) {
          // If quantity is zero, remove the item from the cart
          listItem.remove();
        } else {
          quantitySpan.textContent = quantity;
        }

        // Update total
        total -= price;
        totalSpan.textContent = total.toFixed(2);
      }
    });
  });
