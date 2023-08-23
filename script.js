
let cartItems = [];
let totalPrice = 0;
let discount = 0;
let totalCost = 0;

const productCards = document.querySelectorAll('.product-card');
const cartList = document.getElementById("cartItems");
const applyBtn = document.getElementById("applyBtn");
const purchaseBtn = document.getElementById("purchaseBtn");

productCards.forEach(card => {
  card.addEventListener('click', () => {
    const productName = card.getAttribute('data-name');
    const productPrice = parseFloat(card.getAttribute('data-price'));
    addToCart(productName, productPrice);
  });
});

function updateCartUI() {
cartList.innerHTML = "";
cartItems.forEach((item, index) => {
  const li = document.createElement("li");
  li.textContent = `${index + 1}. ${item.name}`;
  cartList.appendChild(li);
});
}

function addToCart(productName, price) {
  cartItems.push({ name: productName, price: price });
  totalPrice += price;
  updateCartUI();
  updatePurchaseButtons();
}

function applyCoupon() {
  const couponCode = document.getElementById("couponCode").value;
  if (couponCode === "SELL200") {
    discount = Math.min(totalPrice * 0.2, 200);
    updatePurchaseButtons();
  }
}

function updatePurchaseButtons() {
  totalCost = totalPrice - discount;
  applyBtn.disabled = totalCost < 200;
  purchaseBtn.disabled = totalCost <= 0;
  applyBtn.style.backgroundColor = totalCost < 200 ? "gray" : "#E527B2";
  purchaseBtn.style.backgroundColor = totalCost <= 0 ? "gray" : "#E527B2";
  document.getElementById("totalPrice").textContent = totalPrice.toFixed(2);
  document.getElementById("discount").textContent = discount.toFixed(2);
  document.getElementById("totalCost").textContent = totalCost.toFixed(2);
}


const congratulationsModal = document.getElementById("congratulationsModal");

function showCongratulationsModal() {
  congratulationsModal.classList.remove("hidden");
}

function closeCongratulationsModal() {
  congratulationsModal.classList.add("hidden");
  // Reset data
  cartItems = [];
  totalPrice = 0;
  discount = 0;
  totalCost = 0;
  updateCartUI();
  updatePurchaseButtons();
}


