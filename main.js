"use strict";
const modal = document.querySelector("[data-modal]");
const modalCloseBtn = document.querySelector("[data-modal-close]");
const modalCloseOverlay = document.querySelector("[data-modal-overlay]");

const modalCloseFunc = function () {
  modal.classList.add("closed");
};

modalCloseOverlay.addEventListener("click", modalCloseFunc);
modalCloseBtn.addEventListener("click", modalCloseFunc);

const allToasts = document.querySelectorAll("[data-toast]");
let currentToastIndex = 0;
let toastDisplaying = false;

function hideAllToasts() {
  allToasts.forEach(toast => {
    toast.classList.add("closed");
  });
}

document.addEventListener("DOMContentLoaded", function() {
    const sliderItems = document.querySelectorAll('.slider-item');
    const indicators = document.querySelectorAll('.slider-indicator');
    const prevBtn = document.querySelector('.slider-nav-btn.prev');
    const nextBtn = document.querySelector('.slider-nav-btn.next');
    const sliderContainer = document.querySelector('.slider-container');
    
    let currentIndex = 0;
    
    function updateSlider() {
      sliderItems.forEach(item => item.classList.remove('active'));
      indicators.forEach(dot => dot.classList.remove('active'));
      sliderItems[currentIndex].classList.add('active');
      indicators[currentIndex].classList.add('active');
      if (sliderContainer) {
        sliderContainer.scrollLeft = sliderItems[currentIndex].offsetLeft;
      }
    }
    
    if (indicators.length > 0) {
      indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
          currentIndex = index;
          updateSlider();
        });
      });
    }
    
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + sliderItems.length) % sliderItems.length;
        updateSlider();
      });
    }
    
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % sliderItems.length;
        updateSlider();
      });
    }
    
    let slideInterval;
    
    function startSlideInterval() {
      slideInterval = setInterval(() => {
        currentIndex = (currentIndex + 1) % sliderItems.length;
        updateSlider();
      }, 5000);
    }
    
    if (sliderItems.length > 0) {
      sliderContainer.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
      });
      
      sliderContainer.addEventListener('mouseleave', () => {
        startSlideInterval();
      });
      
      sliderItems[0].classList.add('active');
      if (indicators.length > 0) {
        indicators[0].classList.add('active');
      }
      
      startSlideInterval();
    }
    
    const userIcon = document.querySelector(".header-user-actions .action-btn:first-child");
    const authModal = document.getElementById("authModal");
    const authCloseBtn = document.getElementById("authCloseBtn");
    const authTabs = document.querySelectorAll(".auth-tab");
    const authForms = document.querySelectorAll(".auth-form");
    const passwordInputs = document.querySelectorAll('input[type="password"]');
    const togglePasswordBtns = document.querySelectorAll(".toggle-password");
    
    if (userIcon && authModal) {
      userIcon.addEventListener("click", function() {
        authModal.classList.add("active");
        document.body.style.overflow = "hidden";
      });
    
      if (authCloseBtn) {
        authCloseBtn.addEventListener("click", function() {
          authModal.classList.remove("active");
          document.body.style.overflow = ""; 
        });
      }
    
      authModal.addEventListener("click", function(e) {
        if (e.target === authModal) {
          authModal.classList.remove("active");
          document.body.style.overflow = "";
        }
      });
    }
    
    if (authTabs.length > 0 && authForms.length > 0) {
      authTabs.forEach(tab => {
        tab.addEventListener("click", function() {
          authTabs.forEach(t => t.classList.remove("active"));
          authForms.forEach(f => f.classList.remove("active"));
          this.classList.add("active");
          const formId = this.getAttribute("data-tab") === "login" ? "loginForm" : "registerForm";
          document.getElementById(formId).classList.add("active");
        });
      });
    }
  
    if (togglePasswordBtns.length > 0 && passwordInputs.length > 0) {
      togglePasswordBtns.forEach((btn, index) => {
        btn.addEventListener("click", function() {
          const input = passwordInputs[index];
          const showIcon = this.querySelector(".show-pwd");
          const hideIcon = this.querySelector(".hide-pwd");
          
          if (input.type === "password") {
            input.type = "text";
            showIcon.style.display = "none";
            hideIcon.style.display = "block";
          } else {
            input.type = "password";
            showIcon.style.display = "block";
            hideIcon.style.display = "none";
          }
        });
      });
    }
  
    const loginForm = document.querySelector("#loginForm form");
    if (loginForm) {
      loginForm.addEventListener("submit", function(e) {
        e.preventDefault();
        alert("Đăng nhập thành công!");
        authModal.classList.remove("active");
        document.body.style.overflow = "";
      });
    }
  
    const registerForm = document.querySelector("#registerForm form");
    if (registerForm) {
      registerForm.addEventListener("submit", function(e) {
        e.preventDefault();
        alert("Đăng ký thành công!");
        authModal.classList.remove("active");
        document.body.style.overflow = "";
      });
    }
});

document.addEventListener("DOMContentLoaded", function() {
    const cartBtns = document.querySelectorAll(".header-user-actions .action-btn:nth-child(3), .mobile-bottom-navigation .action-btn:nth-child(2)");
    const cartCountBadges = document.querySelectorAll(".count");
    const addToCartBtns = document.querySelectorAll(".add-cart-btn, .btn-action:last-child");
    const cartModal = document.getElementById("cartModal");
    const cartCloseBtn = document.getElementById("cartCloseBtn");
    const cartEmpty = document.getElementById("cartEmpty");
    const cartItemsContainer = document.getElementById("cartItemsContainer");
    const cartFooter = document.getElementById("cartFooter");
    const cartTotal = document.getElementById("cartTotal");
    const continueShoppingBtn = document.getElementById("continueShoppingBtn");
  
    let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    
    function updateCartCount() {
      const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
      cartCountBadges.forEach(badge => {
        badge.textContent = totalItems;
        if (totalItems > 0) {
          badge.classList.add("active");
        } else {
          badge.classList.remove("active");
        }
      });
      if (totalItems === 0) {
        if (cartEmpty) cartEmpty.style.display = "flex";
        if (cartItemsContainer) cartItemsContainer.style.display = "none";
        if (cartFooter) cartFooter.style.display = "none";
      } else {
        if (cartEmpty) cartEmpty.style.display = "none";
        if (cartItemsContainer) cartItemsContainer.style.display = "block";
        if (cartFooter) cartFooter.style.display = "block";
      }
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }
    
    function calculateCartTotal() {
      if (!cartTotal) return;
      const total = cartItems.reduce((sum, item) => sum + (parseFloat(item.price) * item.quantity), 0);
      cartTotal.textContent = `$${total.toFixed(2)}`;
    }
    
    function renderCartItems() {
      if (!cartItemsContainer) return;
      cartItemsContainer.innerHTML = "";
      
      cartItems.forEach((item, index) => {
        const cartItemElement = document.createElement("div");
        cartItemElement.classList.add("cart-item");
        cartItemElement.innerHTML = `
          <img src="${item.image}" alt="${item.name}" class="cart-item-img">
          <div class="cart-item-details">
            <h4 class="cart-item-name">${item.name}</h4>
            <div class="cart-item-price">$${item.price}</div>
            <div class="cart-item-quantity">
              <button class="quantity-btn minus-btn" data-index="${index}">-</button>
              <input type="number" class="quantity-input" value="${item.quantity}" min="1" max="99" data-index="${index}">
              <button class="quantity-btn plus-btn" data-index="${index}">+</button>
            </div>
          </div>
          <div class="remove-item-btn" data-index="${index}">
            <ion-icon name="trash-outline"></ion-icon>
          </div>
        `;
        cartItemsContainer.appendChild(cartItemElement);
      });
      addCartItemEvents();
      calculateCartTotal();
    }
    
    function addCartItemEvents() {
      document.querySelectorAll(".plus-btn").forEach(btn => {
        btn.addEventListener("click", function() {
          const index = parseInt(this.getAttribute("data-index"));
          cartItems[index].quantity++;
          updateCartCount();
          renderCartItems();
        });
      });
      
      document.querySelectorAll(".minus-btn").forEach(btn => {
        btn.addEventListener("click", function() {
          const index = parseInt(this.getAttribute("data-index"));
          if (cartItems[index].quantity > 1) {
            cartItems[index].quantity--;
          } else {
            cartItems.splice(index, 1);
          }
          updateCartCount();
          renderCartItems();
        });
      });
      
      document.querySelectorAll(".quantity-input").forEach(input => {
        input.addEventListener("change", function() {
          const index = parseInt(this.getAttribute("data-index"));
          const value = parseInt(this.value);
          if (value > 0 && value < 100) {
            cartItems[index].quantity = value;
          } else if (value <= 0) {
            cartItems.splice(index, 1);
          } else {
            this.value = 99;
            cartItems[index].quantity = 99;
          }
          updateCartCount();
          renderCartItems();
        });
      });
      
      document.querySelectorAll(".remove-item-btn").forEach(btn => {
        btn.addEventListener("click", function() {
          const index = parseInt(this.getAttribute("data-index"));
          cartItems.splice(index, 1);
          updateCartCount();
          renderCartItems();
        });
      });
    }
    
    function addToCart(product) {
      const existingItemIndex = cartItems.findIndex(item => item.id === product.id);
      if (existingItemIndex !== -1) {
        cartItems[existingItemIndex].quantity++;
      } else {
        cartItems.push({
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity: 1
        });
      }
      cartCountBadges.forEach(badge => {
        badge.classList.add("cart-animation");
        setTimeout(() => {
          badge.classList.remove("cart-animation");
        }, 500);
      });
      updateCartCount();
      renderCartItems();
    }
    
    addToCartBtns.forEach(btn => {
      btn.addEventListener("click", function(e) {
        e.preventDefault();
        const productElement = this.closest(".showcase");
        if (!productElement) return;
        const productId = Math.random().toString(36).substr(2, 9);
        const productName = productElement.querySelector(".showcase-title") ? 
                            productElement.querySelector(".showcase-title").textContent.trim() : 
                            "Sản phẩm";
        const productPriceElement = productElement.querySelector(".price");
        const productPrice = productPriceElement ? 
                             productPriceElement.textContent.replace("$", "").trim() : 
                             "0.00";
        const productImgElement = productElement.querySelector(".product-img") || 
                                 productElement.querySelector(".showcase-img");
        const productImg = productImgElement ? productImgElement.src : "";
        const product = {
          id: productId,
          name: productName,
          price: productPrice,
          image: productImg
        };
        addToCart(product);
      });
    });
    
    cartBtns.forEach(btn => {
      btn.addEventListener("click", function() {
        if (cartModal) {
          cartModal.classList.add("active");
          // Loại bỏ dòng document.body.style.overflow = "hidden"
          renderCartItems();
        }
      });
    });
    
    if (cartCloseBtn) {
      cartCloseBtn.addEventListener("click", function() {
        cartModal.classList.remove("active");
        // Loại bỏ dòng document.body.style.overflow = ""
      });
    }
    
    if (cartModal) {
      cartModal.addEventListener("click", function(e) {
        if (e.target === cartModal) {
          cartModal.classList.remove("active");
          // Loại bỏ dòng document.body.style.overflow = ""
        }
      });
    }
    
    if (continueShoppingBtn) {
      continueShoppingBtn.addEventListener("click", function() {
        cartModal.classList.remove("active");
        // Loại bỏ dòng document.body.style.overflow = ""
      });
    }
    
    
    updateCartCount();
});

function showToast(index) {
  if (toastDisplaying) return;
  toastDisplaying = true;
  hideAllToasts();
  allToasts[index].classList.remove("closed");
  setTimeout(() => {
    allToasts[index].classList.add("closed");
    toastDisplaying = false;
    setTimeout(() => {
      currentToastIndex = (currentToastIndex + 1) % allToasts.length;
      showToast(currentToastIndex);
    }, 1000);
  }, 10000);
}

document.querySelectorAll("[data-toast-close]").forEach((btn) => {
  btn.addEventListener("click", function() {
    const toast = this.closest("[data-toast]");
    toast.classList.add("closed");
    toastDisplaying = false;
    setTimeout(() => {
      currentToastIndex = (currentToastIndex + 1) % allToasts.length;
      showToast(currentToastIndex);
    }, 1000);
  });
});

const mobileMenuOpenBtn = document.querySelectorAll("[data-mobile-menu-open-btn]");
const mobileMenu = document.querySelectorAll("[data-mobile-menu]");
const mobileMenuCloseBtn = document.querySelectorAll("[data-mobile-menu-close-btn]");
const overlay = document.querySelector("[data-overlay]");

for (let i = 0; i < mobileMenuOpenBtn.length; i++) {
  const mobileMenuCloseFunc = function () {
    mobileMenu[i].classList.remove("active");
    overlay.classList.remove("active");
  };

  mobileMenuOpenBtn[i].addEventListener("click", function () {
    mobileMenu[i].classList.add("active");
    overlay.classList.add("active");
  });

  mobileMenuCloseBtn[i].addEventListener("click", mobileMenuCloseFunc);
  overlay.addEventListener("click", mobileMenuCloseFunc);
}

const accordionBtn = document.querySelectorAll("[data-accordion-btn]");
const accordion = document.querySelectorAll("[data-accordion]");

for (let i = 0; i < accordion.length; i++) {
  accordionBtn[i].addEventListener("click", function () {
    const clickedBtn = this.nextElementSibling.classList.contains("active");

    for (let i = 0; i < accordion.length; i++) {
      if (clickedBtn) break;
      if (accordion[i].classList.contains("active")) {
        accordion[i].classList.remove("active");
        accordionBtn[i].classList.remove("active");
      }
    }

    this.nextElementSibling.classList.toggle("active");
    this.classList.toggle("active");
  });
}

document.addEventListener("DOMContentLoaded", () => {
  hideAllToasts();
  allToasts.forEach(toast => {
    toast.style.animation = "slideInOut 10s ease-in-out";
  });
  setTimeout(() => {
    showToast(currentToastIndex);
  }, 3000);
  
  const teamMembers = document.querySelectorAll(".team-member");
  teamMembers.forEach((member) => {
    member.addEventListener("mouseenter", () => {
      member.style.boxShadow = "0 6px 12px rgba(0, 0, 0, 0.2)";
    });
    member.addEventListener("mouseleave", () => {
      member.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
    });
  });

  function adjustLayout() {
    const width = window.innerWidth;
    const teamContainer = document.querySelector(".team-container");
    if (width <= 480 && teamContainer) {
      teamContainer.style.flexDirection = "column";
    } else if (teamContainer) {
      teamContainer.style.flexDirection = "row";
    }
  }

  window.addEventListener("resize", adjustLayout);
  adjustLayout();
});
"use strict";

document.addEventListener("DOMContentLoaded", () => {
  // Modal Newsletter
  const modal = document.querySelector("[data-modal]");
  const modalCloseBtn = document.querySelector("[data-modal-close]");
  const modalCloseOverlay = document.querySelector("[data-modal-overlay]");

  const modalCloseFunc = () => {
    if (modal) modal.classList.add("closed");
  };

  if (modalCloseOverlay) modalCloseOverlay.addEventListener("click", modalCloseFunc);
  if (modalCloseBtn) modalCloseBtn.addEventListener("click", modalCloseFunc);

  // Toast Notifications
  const allToasts = document.querySelectorAll("[data-toast]");
  let currentToastIndex = 0;
  let toastDisplaying = false;

  function hideAllToasts() {
    allToasts.forEach((toast) => {
      if (toast) toast.classList.add("closed");
    });
  }

  function showToast(index) {
    if (toastDisplaying) return;
    toastDisplaying = true;
    hideAllToasts();
    const toast = allToasts[index];
    if (toast) {
      toast.classList.remove("closed");
      setTimeout(() => {
        toast.classList.add("closed");
        toastDisplaying = false;
        currentToastIndex = (currentToastIndex + 1) % allToasts.length;
        setTimeout(() => showToast(currentToastIndex), 1000);
      }, 10000);
    }
  }

  document.querySelectorAll("[data-toast-close]").forEach((btn) => {
    btn.addEventListener("click", function () {
      const toast = this.closest("[data-toast]");
      if (toast) {
        toast.classList.add("closed");
        toastDisplaying = false;
        currentToastIndex = (currentToastIndex + 1) % allToasts.length;
        setTimeout(() => showToast(currentToastIndex), 1000);
      }
    });
  });

  hideAllToasts();
  allToasts.forEach((toast) => {
    if (toast) toast.style.animation = "slideInOut 10s ease-in-out";
  });
  setTimeout(() => showToast(currentToastIndex), 3000);

  // Slider
  const sliderItems = document.querySelectorAll(".slider-item");
  const indicators = document.querySelectorAll(".slider-indicator");
  const prevBtn = document.querySelector(".slider-nav-btn.prev");
  const nextBtn = document.querySelector(".slider-nav-btn.next");
  const sliderContainer = document.querySelector(".slider-container");

  let currentIndex = 0;

  function updateSlider() {
    if (!sliderItems.length) return;
    sliderItems.forEach((item) => item.classList.remove("active"));
    indicators.forEach((dot) => dot.classList.remove("active"));
    sliderItems[currentIndex].classList.add("active");
    if (indicators[currentIndex]) indicators[currentIndex].classList.add("active");
    if (sliderContainer) {
      sliderContainer.scrollTo({
        left: sliderItems[currentIndex].offsetLeft,
        behavior: "smooth",
      });
    }
  }

  if (indicators.length > 0) {
    indicators.forEach((indicator, index) => {
      indicator.addEventListener("click", () => {
        currentIndex = index;
        updateSlider();
      });
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      currentIndex = (currentIndex - 1 + sliderItems.length) % sliderItems.length;
      updateSlider();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      currentIndex = (currentIndex + 1) % sliderItems.length;
      updateSlider();
    });
  }

  let slideInterval;
  function startSlideInterval() {
    slideInterval = setInterval(() => {
      currentIndex = (currentIndex + 1) % sliderItems.length;
      updateSlider();
    }, 5000);
  }

  if (sliderItems.length > 0) {
    sliderContainer.addEventListener("mouseenter", () => clearInterval(slideInterval));
    sliderContainer.addEventListener("mouseleave", startSlideInterval);
    sliderItems[0].classList.add("active");
    if (indicators[0]) indicators[0].classList.add("active");
    startSlideInterval();
  }

  // Auth Modal
  const userIcon = document.querySelector(".header-user-actions .action-btn:first-child");
  const authModal = document.getElementById("authModal");
  const authCloseBtn = document.getElementById("authCloseBtn");
  const authTabs = document.querySelectorAll(".auth-tab");
  const authForms = document.querySelectorAll(".auth-form");
  const passwordInputs = document.querySelectorAll('input[type="password"]');
  const togglePasswordBtns = document.querySelectorAll(".toggle-password");

  if (userIcon && authModal) {
    userIcon.addEventListener("click", () => {
      authModal.classList.add("active");
      document.body.style.overflow = "hidden";
    });

    if (authCloseBtn) {
      authCloseBtn.addEventListener("click", () => {
        authModal.classList.remove("active");
        document.body.style.overflow = "";
      });
    }

    authModal.addEventListener("click", (e) => {
      if (e.target === authModal) {
        authModal.classList.remove("active");
        document.body.style.overflow = "";
      }
    });
  }

  if (authTabs.length > 0 && authForms.length > 0) {
    authTabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        authTabs.forEach((t) => t.classList.remove("active"));
        authForms.forEach((f) => f.classList.remove("active"));
        tab.classList.add("active");
        const formId = tab.getAttribute("data-tab") === "login" ? "loginForm" : "registerForm";
        document.getElementById(formId).classList.add("active");
      });
    });
  }

  if (togglePasswordBtns.length > 0 && passwordInputs.length > 0) {
    togglePasswordBtns.forEach((btn, index) => {
      btn.addEventListener("click", () => {
        const input = passwordInputs[index];
        const showIcon = btn.querySelector(".show-pwd");
        const hideIcon = btn.querySelector(".hide-pwd");

        if (input.type === "password") {
          input.type = "text";
          showIcon.style.display = "none";
          hideIcon.style.display = "block";
        } else {
          input.type = "password";
          showIcon.style.display = "block";
          hideIcon.style.display = "none";
        }
      });
    });
  }

  const loginForm = document.querySelector("#loginForm form");
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("Đăng nhập thành công!");
      authModal.classList.remove("active");
      document.body.style.overflow = "";
    });
  }

  const registerForm = document.querySelector("#registerForm form");
  if (registerForm) {
    registerForm.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("Đăng ký thành công!");
      authModal.classList.remove("active");
      document.body.style.overflow = "";
    });
  }

  // Mobile Menu
  const mobileMenuOpenBtn = document.querySelectorAll("[data-mobile-menu-open-btn]");
  const mobileMenu = document.querySelectorAll("[data-mobile-menu]");
  const mobileMenuCloseBtn = document.querySelectorAll("[data-mobile-menu-close-btn]");
  const overlay = document.querySelector("[data-overlay]");

  mobileMenuOpenBtn.forEach((btn, i) => {
    const mobileMenuCloseFunc = () => {
      if (mobileMenu[i]) mobileMenu[i].classList.remove("active");
      if (overlay) overlay.classList.remove("active");
    };

    btn.addEventListener("click", () => {
      if (mobileMenu[i]) mobileMenu[i].classList.add("active");
      if (overlay) overlay.classList.add("active");
    });

    if (mobileMenuCloseBtn[i])
      mobileMenuCloseBtn[i].addEventListener("click", mobileMenuCloseFunc);
    if (overlay) overlay.addEventListener("click", mobileMenuCloseFunc);
  });

  // Accordion
  const accordionBtn = document.querySelectorAll("[data-accordion-btn]");
  const accordion = document.querySelectorAll("[data-accordion]");

  accordionBtn.forEach((btn) => {
    btn.addEventListener("click", function () {
      const clickedBtn = this.nextElementSibling.classList.contains("active");

      accordion.forEach((acc, index) => {
        if (clickedBtn) return;
        if (acc.classList.contains("active")) {
          acc.classList.remove("active");
          accordionBtn[index].classList.remove("active");
        }
      });

      this.nextElementSibling.classList.toggle("active");
      this.classList.toggle("active");
    });
  });

  // Team Hover Effects
  const teamMembers = document.querySelectorAll(".team-member");
  teamMembers.forEach((member) => {
    member.addEventListener("mouseenter", () => {
      member.style.boxShadow = "0 6px 12px rgba(0, 0, 0, 0.2)";
    });
    member.addEventListener("mouseleave", () => {
      member.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
    });
  });

  // Team Layout Adjustment
  function adjustLayout() {
    const width = window.innerWidth;
    const teamContainer = document.querySelector(".team-container");
    if (width <= 480 && teamContainer) {
      teamContainer.style.flexDirection = "column";
    } else if (teamContainer) {
      teamContainer.style.flexDirection = "row";
    }
  }

  window.addEventListener("resize", adjustLayout);
  adjustLayout();

  // Cart Functionality
  const cartBtn = document.querySelector("[data-open-cart]");
  const cartModal = document.getElementById("cartModal");
  const cartCloseBtn = document.querySelector("[data-close-cart]");
  const goToCartBtn = document.querySelector("#goToCartBtn");
  const cartEmpty = document.getElementById("cartEmpty");
  const cartItemsContainer = document.getElementById("cartItemsContainer");
  const cartFooter = document.getElementById("cartFooter");
  const cartTotal = document.getElementById("cartTotal");
  const cartCountBadges = document.querySelectorAll(".count");
  const addToCartBtns = document.querySelectorAll(".add-cart-btn, .btn-action:last-child");

  let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

  function updateCartCount() {
    const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
    cartCountBadges.forEach((badge) => {
      badge.textContent = totalItems;
      if (totalItems > 0) {
        badge.classList.add("active");
      } else {
        badge.classList.remove("active");
      }
    });
    if (totalItems === 0 && cartEmpty && cartItemsContainer && cartFooter) {
      cartEmpty.style.display = "flex";
      cartItemsContainer.style.display = "none";
      cartFooter.style.display = "none";
    } else if (cartEmpty && cartItemsContainer && cartFooter) {
      cartEmpty.style.display = "none";
      cartItemsContainer.style.display = "block";
      cartFooter.style.display = "block";
    }
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }

  function calculateCartTotal() {
    if (!cartTotal) return;
    const total = cartItems.reduce((sum, item) => sum + parseFloat(item.price) * item.quantity, 0);
    cartTotal.textContent = `$${total.toFixed(2)}`;
  }

  function renderCartItems() {
    if (!cartItemsContainer) return;
    cartItemsContainer.innerHTML = "";

    cartItems.forEach((item, index) => {
      const cartItemElement = document.createElement("div");
      cartItemElement.classList.add("cart-item");
      cartItemElement.innerHTML = `
        <img src="${item.image}" alt="${item.name}" class="cart-item-img">
        <div class="cart-item-details">
          <h4 class="cart-item-name">${item.name}</h4>
          <p class="cart-item-price">${item.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
          <div class="cart-item-quantity">
            <button class="quantity-btn minus-btn" data-index="${index}">-</button>
            <input type="number" class="quantity-input" value="${item.quantity}" min="1" max="99" data-index="${index}">
            <button class="quantity-btn plus-btn" data-index="${index}">+</button>
          </div>
        </div>
        <button class="remove-item-btn" data-index="${index}">
          <ion-icon name="close-outline"></ion-icon>
        </button>
      `;
      cartItemsContainer.appendChild(cartItemElement);
    });
    addCartItemEvents();
    calculateCartTotal();
  }

  function addCartItemEvents() {
    document.querySelectorAll(".plus-btn").forEach((btn) => {
      btn.addEventListener("click", function () {
        const index = parseInt(this.getAttribute("data-index"));
        cartItems[index].quantity++;
        updateCartCount();
        renderCartItems();
      });
    });

    document.querySelectorAll(".minus-btn").forEach((btn) => {
      btn.addEventListener("click", function () {
        const index = parseInt(this.getAttribute("data-index"));
        if (cartItems[index].quantity > 1) {
          cartItems[index].quantity--;
        } else {
          cartItems.splice(index, 1);
        }
        updateCartCount();
        renderCartItems();
      });
    });

    document.querySelectorAll(".quantity-input").forEach((input) => {
      input.addEventListener("change", function () {
        const index = parseInt(this.getAttribute("data-index"));
        const value = parseInt(this.value);
        if (value > 0 && value < 100) {
          cartItems[index].quantity = value;
        } else if (value <= 0) {
          cartItems.splice(index, 1);
        } else {
          this.value = 99;
          cartItems[index].quantity = 99;
        }
        updateCartCount();
        renderCartItems();
      });
    });

    document.querySelectorAll(".remove-item-btn").forEach((btn) => {
      btn.addEventListener("click", function () {
        const index = parseInt(this.getAttribute("data-index"));
        cartItems.splice(index, 1);
        updateCartCount();
        renderCartItems();
      });
    });
  }

  function addToCart(product) {
    const existingItemIndex = cartItems.findIndex((item) => item.id === product.id);
    if (existingItemIndex !== -1) {
      cartItems[existingItemIndex].quantity++;
    } else {
      cartItems.push({
        id: product.id,
        name: product.name,
        price: product.price.replace(/\D/g, '') / 1000, // Chuyển từ VND dạng 535,000đ sang 535
        image: product.image,
        quantity: 1,
      });
    }
    cartCountBadges.forEach((badge) => {
      badge.classList.add("cart-animation");
      setTimeout(() => {
        badge.classList.remove("cart-animation");
      }, 500);
    });
    updateCartCount();
    renderCartItems();
  }

  addToCartBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const productElement = btn.closest(".showcase");
      if (!productElement) return;
      const productId = Math.random().toString(36).substr(2, 9);
      const productName = productElement.querySelector(".showcase-title")?.textContent.trim() || "Sản phẩm";
      const productPriceElement = productElement.querySelector(".price");
      const productPrice = productPriceElement ? productPriceElement.textContent.replace(/\D/g, '') : "0"; // Lấy số từ chuỗi giá
      const productImgElement = productElement.querySelector(".product-img") || productElement.querySelector(".showcase-img");
      const productImg = productImgElement ? productImgElement.src : "";
      const product = {
        id: productId,
        name: productName,
        price: `${productPrice / 1000}000đ`, // Chuyển thành định dạng VND
        image: productImg,
      };
      addToCart(product);
    });
  });

  if (cartBtn && cartModal) {
    cartBtn.addEventListener("click", () => {
      cartModal.classList.add("active");
      document.body.style.overflow = "hidden";
      renderCartItems();
    });
  }

  if (cartCloseBtn) {
    cartCloseBtn.addEventListener("click", () => {
      cartModal.classList.remove("active");
      document.body.style.overflow = "";
    });
  }

  if (cartModal) {
    cartModal.addEventListener("click", (e) => {
      if (e.target === cartModal) {
        cartModal.classList.remove("active");
        document.body.style.overflow = "";
      }
    });
  }

  if (goToCartBtn) {
    goToCartBtn.addEventListener("click", () => {
      window.location.href = "/cart"; // Thay bằng URL thực tế của bạn
    });
  }

  if (cartEmpty && cartItemsContainer && cartFooter) {
    cartEmpty.style.display = cartItems.length === 0 ? "flex" : "none";
    cartItemsContainer.style.display = cartItems.length > 0 ? "block" : "none";
    cartFooter.style.display = cartItems.length > 0 ? "block" : "none";
  }

  updateCartCount();
  renderCartItems();
});
