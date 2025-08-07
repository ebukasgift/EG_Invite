// Gift Configuration
const GIFT_CONFIG = {
  gifts: [
    {
      id: 1,
      title: "Kitchen Stand Mixer",
      description:
        "Professional grade stand mixer perfect for baking adventures together",
      price: 99999,
      image:
        "https://images.pexels.com/photos/7693135/pexels-photo-7693135.jpeg?auto=compress&cs=tinysrgb&w=400",
      maxQuantity: 3,
      currentQuantity: 0,
    },
    {
      id: 2,
      title: "Kitchen Stand Mixer",
      description:
        "Professional grade stand mixer perfect for baking adventures together",
      price: 99999,
      image:
        "https://images.pexels.com/photos/7693135/pexels-photo-7693135.jpeg?auto=compress&cs=tinysrgb&w=400",
      maxQuantity: 3,
      currentQuantity: 0,
    },
    {
      id: 3,
      title: "Fine China Dinner Set",
      description: "Elegant 12-piece dinner set for hosting memorable dinners",
      price: 4500000,
      image:
        "https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=400",
      maxQuantity: 2,
      currentQuantity: 0,
    },
    {
      id: 4,
      title: "Luxury Bedding Set",
      description: "Premium cotton bedding set for comfortable nights",
      price: 180000,
      image:
        "https://images.pexels.com/photos/271897/pexels-photo-271897.jpeg?auto=compress&cs=tinysrgb&w=400",
      maxQuantity: 3,
      currentQuantity: 0,
    },
    {
      id: 5,
      title: "Coffee Machine",
      description: "Automatic espresso machine for perfect morning coffee",
      price: 80000,
      image:
        "https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?auto=compress&cs=tinysrgb&w=400",
      maxQuantity: 2,
      currentQuantity: 0,
    },
    {
      id: 6,
      title: "Wine Glasses Set",
      description: "Crystal wine glasses set for romantic evenings",
      price: 30000,
      image:
        "https://images.pexels.com/photos/109275/pexels-photo-109275.jpeg?auto=compress&cs=tinysrgb&w=400",
      maxQuantity: 4,
      currentQuantity: 0,
    },
    {
      id: 7,
      title: "Cast Iron Cookware",
      description: "Professional cast iron cookware set for gourmet cooking",
      price: 43000,
      image:
        "https://images.pexels.com/photos/4087392/pexels-photo-4087392.jpeg?auto=compress&cs=tinysrgb&w=400",
      maxQuantity: 4,
      currentQuantity: 0,
    },
  ],
};

// Application State
let selectedGifts = [];
let currentSelectedGift = null;

// DOM Elements
const giftsGrid = document.getElementById("giftsGrid");
const giftCart = document.getElementById("giftCart");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const giftModal = document.getElementById("giftModal");
const wishesForm = document.getElementById("wishesForm");

// Initialize Application
document.addEventListener("DOMContentLoaded", function () {
  initializeNavigation();
  initializeCountdown();
  renderGifts();
  initializeModal();
  initializeWishesForm();

  // Add loading animation to elements
  const elements = document.querySelectorAll(
    ".story-item, .detail-card, .gift-card"
  );
  elements.forEach((el, index) => {
    el.style.animationDelay = `${index * 0.1}s`;
    el.classList.add("loading");
  });
});

// Navigation Functions
function initializeNavigation() {
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");

  hamburger?.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      hamburger?.classList.remove("active");
      navMenu.classList.remove("active");
    });
  });

  // Smooth scroll with offset for fixed navbar
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("href");
      const target = document.querySelector(targetId);
      if (target) {
        const offsetTop = target.offsetTop - 70;
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
      }
    });
  });
}

// Countdown Timer
function initializeCountdown() {
  const weddingDate = new Date("January 31, 2026 16:00:00").getTime();

  function updateCountdown() {
    const now = new Date().getTime();
    const distance = weddingDate - now;

    if (distance < 0) {
      document.getElementById("countdown").innerHTML =
        '<h3 style="color: var(--primary-color);">We\'re Married! 💕</h3>';
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").textContent = days
      .toString()
      .padStart(2, "0");
    document.getElementById("hours").textContent = hours
      .toString()
      .padStart(2, "0");
    document.getElementById("minutes").textContent = minutes
      .toString()
      .padStart(2, "0");
    document.getElementById("seconds").textContent = seconds
      .toString()
      .padStart(2, "0");
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);
}

// Gift System Functions
function renderGifts() {
  giftsGrid.innerHTML = "";

  GIFT_CONFIG.gifts.forEach((gift) => {
    const isUnavailable = gift.currentQuantity >= gift.maxQuantity;
    const giftCard = document.createElement("div");
    giftCard.className = `gift-card ${isUnavailable ? "gift-unavailable" : ""}`;
    giftCard.style.position = "relative";

    giftCard.innerHTML = `
            <img src="${gift.image}" alt="${gift.title}" class="gift-image">
            <div class="gift-info">
                <h3 class="gift-title">${gift.title}</h3>
                <p class="gift-description">${gift.description}</p>
                <p class="gift-price">₦${gift.price}</p>
            </div>
        `;

    if (!isUnavailable) {
      giftCard.addEventListener("click", () => openGiftModal(gift));
    }

    giftsGrid.appendChild(giftCard);
  });
}

function openGiftModal(gift) {
  currentSelectedGift = gift;
  const modal = document.getElementById("giftModal");
  const modalTitle = document.getElementById("modalGiftTitle");
  const modalImage = document.getElementById("modalGiftImage");
  const modalDescription = document.getElementById("modalGiftDescription");
  const modalPrice = document.getElementById("modalGiftPrice");
  const quantitySelect = document.getElementById("giftQuantity");

  modalTitle.textContent = gift.title;
  modalImage.src = gift.image;
  modalImage.alt = gift.title;
  modalDescription.textContent = gift.description;
  modalPrice.textContent = gift.price;

  // Update quantity options
  quantitySelect.innerHTML = "";
  const availableQuantity = gift.maxQuantity - gift.currentQuantity;

  for (let i = 1; i <= availableQuantity; i++) {
    const option = document.createElement("option");
    option.value = i;
    option.textContent = i;
    quantitySelect.appendChild(option);
  }

  modal.style.display = "block";
}

function initializeModal() {
  const modal = document.getElementById("giftModal");
  const closeBtn = document.querySelector(".close");

  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });
}

function addToCart() {
  if (!currentSelectedGift) return;

  const quantity = parseInt(document.getElementById("giftQuantity").value);
  const existingGiftIndex = selectedGifts.findIndex(
    (g) => g.id === currentSelectedGift.id
  );

  if (existingGiftIndex > -1) {
    // Update existing gift quantity
    selectedGifts[existingGiftIndex].quantity += quantity;
  } else {
    // Add new gift to cart
    selectedGifts.push({
      ...currentSelectedGift,
      quantity: quantity,
    });
  }

  // Update gift availability
  const giftConfig = GIFT_CONFIG.gifts.find(
    (g) => g.id === currentSelectedGift.id
  );
  giftConfig.currentQuantity += quantity;

  updateCart();
  renderGifts();
  document.getElementById("giftModal").style.display = "none";

  // Show success message
  showNotification("Gift added to cart successfully!", "success");
}

function updateCart() {
  if (selectedGifts.length === 0) {
    giftCart.style.display = "none";
    return;
  }

  giftCart.style.display = "block";
  cartItems.innerHTML = "";
  let total = 0;

  selectedGifts.forEach((gift, index) => {
    const cartItem = document.createElement("div");
    cartItem.className = "cart-item";

    const itemTotal = gift.price * gift.quantity;
    total += itemTotal;

    cartItem.innerHTML = `
            <div class="cart-item-info">
                <div class="cart-item-title">${gift.title}</div>
                <div class="cart-item-quantity">Quantity: ${gift.quantity}</div>
            </div>
            <div class="cart-item-price">₦${itemTotal}</div>
            <button class="remove-item" onclick="removeFromCart(${index})">
                <i class="fas fa-trash"></i>
            </button>
        `;

    cartItems.appendChild(cartItem);
  });

  cartTotal.textContent = total;
}

function removeFromCart(index) {
  const removedGift = selectedGifts[index];

  // Update gift availability
  const giftConfig = GIFT_CONFIG.gifts.find((g) => g.id === removedGift.id);
  giftConfig.currentQuantity -= removedGift.quantity;

  selectedGifts.splice(index, 1);
  updateCart();
  renderGifts();

  showNotification("Gift removed from cart", "info");
}

function clearCart() {
  // Reset all gift quantities
  selectedGifts.forEach((gift) => {
    const giftConfig = GIFT_CONFIG.gifts.find((g) => g.id === gift.id);
    giftConfig.currentQuantity -= gift.quantity;
  });

  selectedGifts = [];
  updateCart();
  renderGifts();

  showNotification("Cart cleared", "info");
}

// Payment Integration (Paystack)
function proceedToPayment() {
  if (selectedGifts.length === 0) {
    showNotification("Your cart is empty", "warning");
    return;
  }

  const total = selectedGifts.reduce(
    (sum, gift) => sum + gift.price * gift.quantity,
    0
  );

  // Initialize Paystack payment
  // NOTE: You need to replace 'YOUR_PAYSTACK_PUBLIC_KEY' with your actual Paystack public key
  const handler = PaystackPop.setup({
    key: "pk_test_553f816421471144f50fc11d6e6303b551bc6c53", // Replace with your Paystack public key
    email: "customer@email.com", // Customer email - you might want to collect this
    amount: total * 100, // Amount in kobo (cents)
    currency: "NGN", // Change to your preferred currency
    ref: "wedding_gift_" + Math.floor(Math.random() * 1000000000 + 1),
    metadata: {
      custom_fields: [
        {
          display_name: "Wedding Gifts",
          variable_name: "wedding_gifts",
          value: selectedGifts
            .map((g) => `${g.title} (x${g.quantity})`)
            .join(", "),
        },
      ],
    },
    callback: function (response) {
      // Payment successful
      showNotification(
        "Payment successful! Thank you for your gift! 💕",
        "success"
      );

      // Clear cart after successful payment
      selectedGifts = [];
      updateCart();

      // You might want to send payment confirmation to your backend here
      console.log("Payment successful:", response);
    },
    onClose: function () {
      showNotification("Payment cancelled", "warning");
    },
  });

  handler.openIframe();
}

// Utility Functions
function openMap() {
  const address = "computer village, Lagos, Nigeria"; // Replace with your actual address
  showNotification("Opening map for directions...", "info");
  const url = `https://maps.google.com?q=${encodeURIComponent(address)}`;
  window.open(url, "_blank");
}

function showHotels() {
  showNotification("Hotel booking information will be sent via email", "info");
  // You can implement hotel booking logic here
}

function showNotification(message, type = "info") {
  const notification = document.createElement("div");
  notification.className = `notification ${type}`;
  notification.style.cssText = `
        position: fixed;
        top: 90px;
        right: 20px;
        background: ${
          type === "success"
            ? "#d4edda"
            : type === "warning"
            ? "#fff3cd"
            : "#d1ecf1"
        };
        color: ${
          type === "success"
            ? "#155724"
            : type === "warning"
            ? "#856404"
            : "#0c5460"
        };
        padding: 1rem 1.5rem;
        border-radius: 5px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 3000;
        font-weight: 500;
        animation: slideIn 0.3s ease;
    `;

  notification.textContent = message;
  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.animation = "slideOut 0.3s ease";
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// Form Handling
// function initializeWishesForm() {
//   wishesForm.addEventListener("submit", function (e) {
//     e.preventDefault();

//     const formData = new FormData(this);
//     const wishData = {
//       name: formData.get("name"),
//       email: formData.get("email"),
//       message: formData.get("message"),
//     };

//     // Simulate email sending (replace with actual email service)
//     sendWishesEmail(wishData);
//   });
// }

function sendWishesEmail(wishData) {
  // This is a placeholder for email functionality
  // In a real implementation, you would send this data to your backend
  // which would then send an email using a service like EmailJS, Nodemailer, etc.

  console.log("Sending wishes email:", wishData);

  // Simulate API call
  setTimeout(() => {
    showNotification("Your wishes have been sent! Thank you! 💕", "success");
    wishesForm.reset();
  }, 1000);

  // For now, show a loading state
  // const submitButton = wishesForm.querySelector(".submit-button");
  // const originalText = submitButton.textContent;
  // submitButton.textContent = "Sending...";
  // submitButton.disabled = true;

  setTimeout(() => {
    submitButton.textContent = originalText;
    submitButton.disabled = false;
  }, 1000);
}

// Photo Gallery Functions (for after-wedding photos)
// function addWeddingPhoto(photoUrl, caption = "") {
//   const photoGallery = document.getElementById("photoGallery");

//   // Remove placeholder if it exists
//   const placeholder = photoGallery.querySelector(".photo-placeholder");
//   if (placeholder) {
//     placeholder.remove();
//   }

//   const photoElement = document.createElement("div");
//   photoElement.className = "gallery-photo-container";
//   photoElement.innerHTML = `
//         <img src="${photoUrl}" alt="${caption}" class="gallery-photo" onclick="openPhotoModal('${photoUrl}', '${caption}')">
//         ${caption ? `<p class="photo-caption">${caption}</p>` : ""}
//     `;

//   photoGallery.appendChild(photoElement);
// }

// function openPhotoModal(photoUrl, caption) {
//   // Create and show photo modal
//   const modal = document.createElement("div");
//   modal.className = "photo-modal";
//   modal.style.cssText = `
//         position: fixed;
//         top: 0;
//         left: 0;
//         width: 100%;
//         height: 100%;
//         background: rgba(0,0,0,0.9);
//         display: flex;
//         align-items: center;
//         justify-content: center;
//         z-index: 3000;
//         cursor: pointer;
//     `;

//   modal.innerHTML = `
//         <div style="max-width: 90%; max-height: 90%; text-align: center;">
//             <img src="${photoUrl}" style="max-width: 100%; max-height: 100%; object-fit: contain;">
//             ${
//               caption
//                 ? `<p style="color: white; margin-top: 1rem; font-size: 1.1rem;">${caption}</p>`
//                 : ""
//             }
//         </div>
//     `;

//   modal.addEventListener("click", () => modal.remove());
//   document.body.appendChild(modal);
// }

// // Add CSS animations
// const style = document.createElement("style");
// style.textContent = `
//     @keyframes slideIn {
//         from { transform: translateX(100%); opacity: 0; }
//         to { transform: translateX(0); opacity: 1; }
//     }

//     @keyframes slideOut {
//         from { transform: translateX(0); opacity: 1; }
//         to { transform: translateX(100%); opacity: 0; }
//     }

//     .photo-caption {
//         text-align: center;
//         margin-top: 0.5rem;
//         color: var(--text-light);
//         font-style: italic;
//     }

//     .gallery-photo-container {
//         position: relative;
//     }
// `;
// document.head.appendChild(style);

// Add Paystack script to document head
const paystackScript = document.createElement("script");
paystackScript.src = "https://js.paystack.co/v1/inline.js";
document.head.appendChild(paystackScript);
