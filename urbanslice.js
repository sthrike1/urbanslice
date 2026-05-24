/* =============================================
   URBAN SLICE — Main JavaScript
   urbanslice.js
   ============================================= */

/* Cart state */
var cartQty = 0;
var cartSum = 0;

/* -------------------------------------------------
   addToCart(name, price)
   Called by every "+ " button on menu/deal cards.
   Shows the sticky cart bar and updates totals.
------------------------------------------------- */
function addToCart(name, price) {
  cartQty++;
  cartSum += price;

  var countEl = document.getElementById('cartCount');
  var totalEl = document.getElementById('cartTotal');
  var bar     = document.getElementById('cartBar');

  if (countEl) countEl.textContent = cartQty;
  if (totalEl) totalEl.textContent = 'Rs. ' + cartSum.toLocaleString();

  if (bar) {
    /* Show the bar */
    bar.style.display    = 'flex';
    bar.style.transform  = 'translateY(0)';

    /* Brief orange flash to confirm the add */
    bar.style.background = '#B33208';
    setTimeout(function () {
      bar.style.background = '#1A0F0A';
    }, 300);
  }

  return false; /* prevent any default form behaviour */
}

/* -------------------------------------------------
   checkout()
   Opens WhatsApp with a pre-filled order message.
------------------------------------------------- */
function checkout() {
  if (cartQty === 0) {
    alert('Your cart is empty! Add some items first.');
    return;
  }
  var msg = 'Assalam o Alaikum Urban Slice! '
    + 'I want to place an order. '
    + 'Cart total: Rs. ' + cartSum.toLocaleString()
    + ' (' + cartQty + ' items). Please confirm.';
  window.open(
    'https://wa.me/923294895964?text=' + encodeURIComponent(msg),
    '_blank'
  );
}

/* -------------------------------------------------
   showCat(cat, btn)
   Category filter tabs in the menu section.
   Hides all .menu-cat-section divs then shows
   only the one matching data-cat="cat",
   or all of them when cat === 'all'.
------------------------------------------------- */
function showCat(cat, btn) {
  /* Update active tab styling */
  var btns = document.querySelectorAll('.cat-btn');
  for (var i = 0; i < btns.length; i++) {
    btns[i].classList.remove('active');
  }
  btn.classList.add('active');

  /* Show / hide category sections */
  var sections = document.querySelectorAll('.menu-cat-section');
  for (var j = 0; j < sections.length; j++) {
    if (cat === 'all') {
      sections[j].style.display = 'block';
    } else {
      sections[j].style.display =
        (sections[j].getAttribute('data-cat') === cat) ? 'block' : 'none';
    }
  }
}

/* -------------------------------------------------
   Initialise on page load
------------------------------------------------- */
window.onload = function () {
  /* Hide cart bar until first item is added */
  var bar = document.getElementById('cartBar');
  if (bar) {
    bar.style.display   = 'none';
    bar.style.transform = 'translateY(0)';
  }

  /* Make all menu sections visible by default (All Items view) */
  var sections = document.querySelectorAll('.menu-cat-section');
  for (var i = 0; i < sections.length; i++) {
    sections[i].style.display = 'block';
  }
};
