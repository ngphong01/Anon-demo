"use strict";

// Đảm bảo chỉ chạy code khi DOM đã sẵn sàng
document.addEventListener("DOMContentLoaded", function() {
  // ===== Modal Newsletter =====
  const modal = document.querySelector("[data-modal]");
  const modalCloseBtn = document.querySelector("[data-modal-close]");
  const modalCloseOverlay = document.querySelector("[data-modal-overlay]");

  if (modal && modalCloseBtn && modalCloseOverlay) {
    const modalCloseFunc = function() {
      modal.classList.add("closed");
    };

    modalCloseOverlay.addEventListener("click", modalCloseFunc);
    modalCloseBtn.addEventListener("click", modalCloseFunc);
  }

  // ===== Toast Notifications =====
  const allToasts = document.querySelectorAll("[data-toast]");
  let currentToastIndex = 0;
  let toastDisplaying = false;

  function hideAllToasts() {
    allToasts.forEach(toast => {
      toast.classList.add("closed");
    });
  }

  function showToast(index) {
    if (toastDisplaying || allToasts.length === 0) return;
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

  // Khởi tạo toasts
  if (allToasts.length > 0) {
    hideAllToasts();
    allToasts.forEach(toast => {
      toast.style.animation = "slideInOut 10s ease-in-out";
    });
    setTimeout(() => {
      showToast(currentToastIndex);
    }, 3000);
  }

  // ===== Slider =====
  const sliderItems = document.querySelectorAll('.slider-item');
  const indicators = document.querySelectorAll('.slider-indicator');
  const prevBtn = document.querySelector('.slider-nav-btn.prev');
  const nextBtn = document.querySelector('.slider-nav-btn.next');
  const sliderContainer = document.querySelector('.slider-container');
  
  if (sliderItems.length > 0 && sliderContainer) {
    let currentIndex = 0;
    
    function updateSlider() {
      sliderItems.forEach(item => item.classList.remove('active'));
      indicators.forEach(dot => dot.classList.remove('active'));
      sliderItems[currentIndex].classList.add('active');
      if (indicators[currentIndex]) indicators[currentIndex].classList.add('active');
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
  
  // ===== Auth Modal =====
  const userIcon = document.querySelector(".header-user-actions .action-btn:first-child");
  const authModal = document.getElementById("authModal");
  const authCloseBtn = document.getElementById("authCloseBtn");
  const authTabs = document.querySelectorAll(".auth-tab");
  const authForms = document.querySelectorAll(".auth-form");

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

  // Xử lý hiển thị/ẩn mật khẩu cho form mới
  setTimeout(() => {
    const passwordFields = document.querySelectorAll('.modern-form-container input[type="password"]');
    passwordFields.forEach(field => {
      // Tạo nút hiển thị/ẩn mật khẩu
      const toggleBtn = document.createElement('span');
      toggleBtn.innerHTML = '<ion-icon name="eye-outline"></ion-icon>';
      toggleBtn.className = 'password-toggle';
      toggleBtn.style.position = 'absolute';
      toggleBtn.style.right = '15px';
      toggleBtn.style.top = '50%';
      toggleBtn.style.transform = 'translateY(-50%)';
      toggleBtn.style.cursor = 'pointer';
      toggleBtn.style.color = '#999';
      toggleBtn.style.fontSize = '20px';
      toggleBtn.style.zIndex = '10';
      
      // Chèn nút vào sau trường mật khẩu
      if (field.parentNode) {
        field.parentNode.style.position = 'relative';
        field.parentNode.appendChild(toggleBtn);
        
        // Xử lý sự kiện click
        toggleBtn.addEventListener('click', function() {
          if (field.type === 'password') {
            field.type = 'text';
            toggleBtn.innerHTML = '<ion-icon name="eye-off-outline"></ion-icon>';
          } else {
            field.type = 'password';
            toggleBtn.innerHTML = '<ion-icon name="eye-outline"></ion-icon>';
          }
        });
      }
    });
  }, 500); // Đợi một chút để DOM được cập nhật đầy đủ

  // Xử lý submit form đăng nhập mới
  const loginForm = document.querySelector("#loginForm .form");
  if (loginForm) {
    loginForm.addEventListener("submit", function(e) {
      e.preventDefault();
      alert("Đăng nhập thành công!");
      if (authModal) {
        authModal.classList.remove("active");
        document.body.style.overflow = "";
      }
    });
  }

  // Xử lý submit form đăng ký mới
  const registerForm = document.querySelector("#registerForm .form");
  if (registerForm) {
    registerForm.addEventListener("submit", function(e) {
      e.preventDefault();
      alert("Đăng ký thành công!");
      if (authModal) {
        authModal.classList.remove("active");
        document.body.style.overflow = "";
      }
    });
  }

  // ===== Cart Functionality =====
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
        renderCartItems();
      }
    });
  });
  
  if (cartCloseBtn) {
    cartCloseBtn.addEventListener("click", function() {
      cartModal.classList.remove("active");
    });
  }
  
  if (cartModal) {
    cartModal.addEventListener("click", function(e) {
      if (e.target === cartModal) {
        cartModal.classList.remove("active");
      }
    });
  }
  
  if (continueShoppingBtn) {
    continueShoppingBtn.addEventListener("click", function() {
      cartModal.classList.remove("active");
    });
  }
  
  updateCartCount();

  // ===== Mobile Menu =====
  const mobileMenuOpenBtn = document.querySelectorAll("[data-mobile-menu-open-btn]");
  const mobileMenu = document.querySelectorAll("[data-mobile-menu]");
  const mobileMenuCloseBtn = document.querySelectorAll("[data-mobile-menu-close-btn]");
  const overlay = document.querySelector("[data-overlay]");

  for (let i = 0; i < mobileMenuOpenBtn.length; i++) {
    const mobileMenuCloseFunc = function () {
      mobileMenu[i].classList.remove("active");
      if (overlay) overlay.classList.remove("active");
    };

    mobileMenuOpenBtn[i].addEventListener("click", function () {
      mobileMenu[i].classList.add("active");
      if (overlay) overlay.classList.add("active");
    });

    if (mobileMenuCloseBtn[i]) {
      mobileMenuCloseBtn[i].addEventListener("click", mobileMenuCloseFunc);
    }
    if (overlay) {
      overlay.addEventListener("click", mobileMenuCloseFunc);
    }
  }

  // ===== Accordion =====
  const accordionBtn = document.querySelectorAll("[data-accordion-btn]");
  const accordion = document.querySelectorAll("[data-accordion]");

  for (let i = 0; i < accordionBtn.length; i++) {
    accordionBtn[i].addEventListener("click", function () {
      const clickedBtn = this.nextElementSibling.classList.contains("active");

      if (!clickedBtn) {
        for (let j = 0; j < accordion.length; j++) {
          if (accordion[j].classList.contains("active")) {
            accordion[j].classList.remove("active");
            accordionBtn[j].classList.remove("active");
          }
        }
      }

      this.nextElementSibling.classList.toggle("active");
      this.classList.toggle("active");
    });
  }

  // ===== Team Section =====
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
