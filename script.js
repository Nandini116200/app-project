
    const screens = document.querySelectorAll('.screen');
    let currentProduct = "";
    let isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    let basePrice = 0;
    const navTriggers = document.querySelectorAll('[data-go-screen]');
    let previousScreen = "home";
    let lastWishlistScreen = "";
    const bottomNavItems = document.querySelectorAll('.bottom-nav .nav-item');
    const filterButtons = document.querySelectorAll('[data-filter]');
    const productSections = document.querySelectorAll('[data-section]');
    const planCards = document.querySelectorAll('.plan-card');
    const radioPills = document.querySelectorAll('.radio-pill');
    const dayPills = document.querySelectorAll('.day-pill');
    const quantityDisplay = document.getElementById('quantity-value');
    const plusBtn = document.querySelector('.plus-btn');
    const minusBtn = document.querySelector('.minus-btn');
    let quantity = Number(quantityDisplay?.textContent || 1);

function setActiveScreen(screenName) {
      document
        .querySelector('.mobile-app')
        ?.classList.toggle(
          'wide-cart-layout',
          screenName === 'orders' || screenName === 'cartAddress'
        );

      if (screenName === 'orders') loadOrders();
      if (screenName === 'cartAddress') renderCartAddressPage();
      if (screenName === 'checkout') {
  loadCheckout();
}

      if (screenName === 'wishlist') {
  loadWishlist();
}

    screens.forEach(screen =>
      screen.classList.toggle('active', screen.dataset.screen === screenName)
  );

  bottomNavItems.forEach(item =>
    item.classList.toggle('active', item.dataset.goScreen === screenName)
  );

  // 🔥 ADD THIS BLOCK
  if (screenName === 'productDetail') {
    const planBox = document.getElementById('planBox');

    if (planBox) {
      planBox.classList.add('glow-effect');

      setTimeout(() => {
        planBox.classList.remove('glow-effect');
      }, 3000); // 3 seconds
    }
  }
}
    

    navTriggers.forEach((trigger) => {
  trigger.addEventListener('click', () => {

    const target = trigger.dataset.goScreen;
    const category = trigger.dataset.category;

    // 🔥 LOGIN CHECK
    const protectedScreens = ["wallet", "profile", "orders", "addmoney"];

    if (protectedScreens.includes(target) && !isLoggedIn) {
      setActiveScreen("login");
      return;
    }
    if (target === "profile") {
      loadProfileData(); // 🔥 ADD THIS
    }
    if (target === "wishlist") {
   previousScreen = document
      .querySelector('.screen.active')
      ?.dataset.screen || "home";
}

    if (target) {
      setActiveScreen(target);


      if (category) {
        filterButtons.forEach(btn => btn.classList.remove('active'));

        const selectedBtn = document.querySelector(`[data-filter="${category}"]`);
        if (selectedBtn) {
  selectedBtn.classList.add('active');

  // 🔥 AUTO SCROLL FIX
  selectedBtn.scrollIntoView({
    behavior: "smooth",
    inline: "center"
  });
}

        productSections.forEach(section => {
          section.style.display =
            section.dataset.section === category ? 'block' : 'none';
        });
      }
    }
  });
});

    filterButtons.forEach((button) => {
      button.addEventListener('click', () => {
        const selected = button.dataset.filter;
        filterButtons.forEach((item) => item.classList.remove('active'));
        button.classList.add('active');

        button.scrollIntoView({
          behavior: "smooth",
          inline: "center"
        }); 

        productSections.forEach((section) => {
          section.style.display = selected === 'all' || section.dataset.section === selected ? 'block' : 'none';
        });
      });
    });

    function updatePlanSelection(selectedCard) {
  planCards.forEach((card, index) => {
    const isActive = card === selectedCard;
    card.classList.toggle('selected', isActive);
    radioPills[index]?.classList.toggle('selected', isActive);
  });
}

    planCards.forEach((card) => {
      card.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();
        updatePlanSelection(card);
      });
    });

    radioPills.forEach((pill, index) => {
      pill.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();
        updatePlanSelection(planCards[index]);
      });
    });

    dayPills.forEach((pill) => {
      pill.addEventListener('click', (event) => {
        event.preventDefault();
        pill.classList.toggle('active');
      });
    });

    plusBtn?.addEventListener('click', (event) => {
      event.preventDefault();
      quantity += 1;
      quantityDisplay.textContent = quantity;
    });

    minusBtn?.addEventListener('click', (event) => {
      event.preventDefault();
      if (quantity > 1) {
        quantity -= 1;
        quantityDisplay.textContent = quantity;
      }
    });
    const mobileInput = document.querySelector('.login-input:nth-child(2)');
    const otpBtn = document.querySelector('.get-otp-btn');

    const loginInputs = document.querySelectorAll('.login-input');

loginInputs.forEach(input => {
  input.addEventListener('input', () => {
    let isFilled = false;

    loginInputs.forEach(inp => {
      if (inp.value.trim() !== '') {
        isFilled = true;
      }
    });

    if (isFilled) {
      otpBtn.style.background = "#7fcdf4";
      otpBtn.style.color = "#fff";
    } else {
      otpBtn.style.background = "#d3d3d3";
      otpBtn.style.color = "#222";
    }
  });
});
const getOtpBtn = document.querySelector('.get-otp-btn');
function updateNavbar() {
  const navUser = document.getElementById("nav-user");

  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const name = localStorage.getItem("userName");

  if (isLoggedIn === "true" && name) {
    navUser.textContent = "Welcome, " + name;
  } else {
    navUser.textContent = "Log In";
  }
}

getOtpBtn.addEventListener('click', async () => {

  const enteredMobile =
    document.querySelectorAll('.login-input')[0]
    .value.trim();

  const enteredEmail =
    document.querySelectorAll('.login-input')[1]
    .value.trim();

  const savedMobile =
    localStorage.getItem("userMobile");

  const savedEmail =
    localStorage.getItem("userEmail");

  // 🔥 user exists check
  if (
    enteredMobile !== savedMobile &&
    enteredEmail !== savedEmail
  ) {

    setActiveScreen('register');
    return;
  }

  // 🔥 SEND EMAIL OTP
  const { data, error } =
   await supabaseClient.auth.signInWithOtp({

  email: enteredEmail,

  options: {
  shouldCreateUser: false
}

});

  if (error) {

    console.log(error);

    alert(error.message);

    return;
  }

  // 🔥 save login email
  localStorage.setItem(
    "loginEmail",
    enteredEmail
  );

  alert("OTP sent to your email 📩");

  setActiveScreen('otp');

});
const otpInput = document.querySelector('.otp-input');
const successSub = document.querySelector('.success-sub');
const successMain = document.querySelector('.success-main');

otpInput.addEventListener('input', async () => {

  const value = otpInput.value.trim();

  if (value.length === 6) {

    const email =
      localStorage.getItem("loginEmail");

    const { data, error } =
      await supabaseClient.auth.verifyOtp({

        email: email,
        token: value,
        type: "email"

      });

    if (error) {

      console.log(error);

      alert("Invalid OTP ❌");

      return;
    }

    successSub.textContent =
      "Log In";

    successMain.textContent =
      "Successfully!!!";

    localStorage.setItem(
      "isLoggedIn",
      "true"
    );

    isLoggedIn = true;

    setActiveScreen('success');

    setTimeout(() => {

      updateNavbar();
      updateProfile();

      setActiveScreen('home');

    }, 1000);
  }
});


const createAccountBtns = document.querySelectorAll(".create-account-link");

createAccountBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    setActiveScreen("register");
  });
});

function setupRegisterInputs() {
  const registerInputs = document.querySelectorAll("#register-screen .register-line-input");
  const createBtn =
  document.querySelector(".create-btn");

const newCreateBtn = createBtn;

  function checkRegisterForm() {
    let allFilled = true;

    registerInputs.forEach(inp => {
      if (!inp.value.trim()) allFilled = false;
    });

    if (allFilled) {
      newCreateBtn.style.background = "#7fcdf4";
      newCreateBtn.style.color = "#fff";
    } else {
      newCreateBtn.style.background = "#d5e4eb";
      newCreateBtn.style.color = "#8b8b8b";
    }

    return allFilled;
  }

  registerInputs.forEach(input => {
    input.addEventListener("input", checkRegisterForm);
  });

  newCreateBtn.addEventListener("click", async () => {
    if (!checkRegisterForm()) return;

    const name = registerInputs[0].value.trim();
    const mobile = registerInputs[1].value.trim();
    const email = registerInputs[2].value.trim();
    const dob = registerInputs[3].value;

   // 🔥 CLEAN MOBILE
const cleanMobile =
  mobile.replace(/^0+/, "");

// 🔥 CHECK EXISTING USER
const { data: existingUser, error: checkError } =
  await supabaseClient
    .from("Users")
    .select("*");

if (checkError) {
  console.log(checkError);
  alert("User check failed");
  return;
}

// 🔥 MATCH EMAIL OR MOBILE
const alreadyExists =
  existingUser.some(user => {

    const dbMobile =
      String(user.mobile).replace(/^0+/, "");

    return (
      user.email === email ||
      dbMobile === cleanMobile
    );
  });

// 🔥 USER EXISTS
if (alreadyExists) {

  alert("Account already exists. Please login.");

  setActiveScreen("login");

  return;
}
const { data: authData, error: authError } =
  await supabaseClient.auth.signUp({
    email: email,
    password: mobile
  });

if (authError) {
  console.log(authError);
  alert(authError.message);
  return;
}
    const { data, error } = await supabaseClient
  .from("Users")
  .insert([
    {
      name: name,
      mobile: mobile,
      email: email,
      dob: dob
    }
  ]);
  if (error) {

  console.log(error);

  // 🔥 duplicate email/mobile
  if (
    error.message.includes("duplicate") ||
    error.message.includes("unique")
  ) {

    alert(
      "Account already exists. Please login."
    );

    setActiveScreen("login");

  }

  else {

    alert(error.message);

  }

  return;
}
// 🔥 SAVE USER DATA
localStorage.setItem("userName", name);
localStorage.setItem("userMobile", mobile);
localStorage.setItem("userEmail", email);

    successSub.textContent = "Account Created";
    successMain.textContent = "Successfully!!!";

    localStorage.setItem("isLoggedIn", "true");
    isLoggedIn = true;
    setActiveScreen("success");

    setTimeout(() => {
  updateNavbar();
  updateProfile(); // 🔥 ADD THIS
  setActiveScreen("home");
}, 1000);
  });
}

setupRegisterInputs();
function loadProfileData() {
  const name = localStorage.getItem('userName');
  const mobile = localStorage.getItem('userMobile');

  if (name && mobile) {
    document.getElementById('profile-name').textContent = name;
    document.getElementById('profile-mobile').textContent = mobile;
  }
}

const logoutBtn = document.querySelector('.logout-btn');
const logoutModal = document.getElementById('logoutModal');
const yesBtn = document.querySelector('.yes-btn');
const cancelBtn = document.querySelector('.cancel-btn');

// open modal
logoutBtn.addEventListener('click', () => {
  logoutModal.classList.add('active');
});

// YES → logout
yesBtn.addEventListener('click', () => {

  // 🔥 sirf login session remove karo
  localStorage.setItem("isLoggedIn", "false");

  isLoggedIn = false;

  updateNavbar();
  updateProfile();

  logoutModal.classList.remove('active');

  setActiveScreen('login');
});

// CANCEL → close modal
cancelBtn.addEventListener('click', () => {
  logoutModal.classList.remove('active');
});
const profileCard = document.getElementById('profile-card-click');

if (profileCard) {
  profileCard.addEventListener('click', () => {
    loadEditProfileData();
    setActiveScreen('editProfile');
  });
}
function loadEditProfileData() {
  const name = localStorage.getItem('userName');
  const mobile = localStorage.getItem('userMobile');

  document.getElementById('edit-name').value = name || '';
  document.getElementById('edit-mobile').value = mobile || '';
}
const updateBtn = document.querySelector('.update-btn');

updateBtn.addEventListener('click', () => {
  const name = document.getElementById('edit-name').value;
  const mobile = document.getElementById('edit-mobile').value;

  localStorage.setItem('userName', name);
  localStorage.setItem('userMobile', mobile);

  localStorage.setItem("isLoggedIn", "true"); // 🔥 IMPORTANT
updateNavbar(); // 🔥 UI update
updateProfile(); // 🔥 ADD THIS

  setActiveScreen('profileSuccess');

  // 2 sec baad automatically profile screen pe
  setTimeout(() => {
    setActiveScreen('profile');
  }, 2000);
});
const planModal = document.getElementById('planModal');
const planTitle = document.getElementById('planTitle');
const miniPlanCards = document.querySelectorAll('.mini-plan-card');

miniPlanCards.forEach((card, index) => {
  card.addEventListener('click', (e) => {
    e.stopPropagation();

    if (index === 0) {
      planTitle.textContent = "Monthly Subscription Plan";
    } 
    else if (index === 1) {
      planTitle.textContent = "15 Days Subscription Plan";
    }
    else if (index === 2) {
  planTitle.textContent = "Weekly Subscription Plan";
}

    planModal.classList.add('active');
  });
});

// close on outside click
planModal.addEventListener('click', (e) => {
  if (e.target === planModal) {
    planModal.classList.remove('active');
  }
});
const heroImage = document.getElementById("heroImage");

const images = [
  "./images/Banner 1.png",
  "./images/Banner 2.png",
  "./images/Banner 3.png"
];

let index = 0;

setInterval(() => {

  // fade out
  heroImage.style.opacity = 0;

  setTimeout(() => {
    // image change
    index = (index + 1) % images.length;
    heroImage.src = images[index];

    // fade in
    heroImage.style.opacity = 1;

  }, 400);

}, 3000);
const rechargeCards = document.querySelectorAll('.recharge-card');
const amountInput = document.querySelector('.amount-input');

const paymentCards = document.querySelectorAll('.payment-card');

rechargeCards.forEach(card => {
  card.addEventListener('click', () => {
    const amount = card.dataset.amount;

    amountInput.value = amount;

    // highlight recharge
    rechargeCards.forEach(c => c.classList.remove('active'));
    card.classList.add('active');

    // glow effect
    paymentCards.forEach(p => p.classList.add('glow'));

    setTimeout(() => {
      paymentCards.forEach(p => p.classList.remove('glow'));
    }, 2000);
  });
});
const upiRow = document.querySelector('.upi-row');
const cardForm = document.querySelector('.card-form');

paymentCards.forEach(card => {
  card.addEventListener('click', () => {

    paymentCards.forEach(c => c.classList.remove('active'));
    card.classList.add('active');

    const selected = card.textContent.trim();

    if (selected === "UPI") {
  upiRow.style.display = "flex";
  cardForm.style.display = "none";

  // 🔥 RESET
  upiInput.value = "";
  upiPayBtn.style.opacity = "0.5";
  upiPayBtn.style.pointerEvents = "none";
}
    else if (selected === "Card") {
      upiRow.style.display = "none";
      cardForm.style.display = "flex";
    } 
    else {
      upiRow.style.display = "none";
      cardForm.style.display = "none";
    }

  });
});
const cardNumberInput = document.querySelector('.card-number');
if (cardNumberInput) {
cardNumberInput.addEventListener('input', () => {
  let value = cardNumberInput.value.replace(/\D/g, ""); // only numbers

  value = value.substring(0, 16); // max 16 digits

  value = value.replace(/(.{4})/g, "$1 ").trim(); // spacing

  cardNumberInput.value = value;
})};
const cvvInput = document.querySelector('.cvv-input');

if (cvvInput) {
  cvvInput.addEventListener('input', () => {
    let value = cvvInput.value.replace(/\D/g, "");
    cvvInput.value = value.substring(0, 3);
  });
}
const expiryInput = document.querySelector('.expiry-input');
if (expiryInput) {
  expiryInput.addEventListener('input', () => {
    let value = expiryInput.value.replace(/\D/g, "");

    if (value.length >= 3) {
      value = value.substring(0, 2) + "/" + value.substring(2, 4);
    }

    expiryInput.value = value;
  });
}
const cardInputs = document.querySelectorAll('.card-form input');
const payBtn = document.querySelector('.card-pay-btn');

cardInputs.forEach(input => {
  input.addEventListener('input', () => {

    let allFilled = true;

    cardInputs.forEach(inp => {
      if (inp.value.trim() === "") {
        allFilled = false;
      }
    });

    if (allFilled) {
      payBtn.style.opacity = "1";
      payBtn.style.pointerEvents = "auto";
    } else {
      payBtn.style.opacity = "0.5";
      payBtn.style.pointerEvents = "none";
    }

  });
});
const nameInput = document.querySelector('.name-input');

if (nameInput) {
  nameInput.addEventListener('input', () => {
    let value = nameInput.value;

    value = value.replace(/[^a-zA-Z\s]/g, "");
    value = value.replace(/\b\w/g, char => char.toUpperCase());

    nameInput.value = value;
  });
}
const upiInput = document.querySelector('.upi-input');
const upiPayBtn = document.querySelector('.upi-pay-btn');

if (upiInput) {
  upiInput.addEventListener('input', () => {
    let value = upiInput.value;

    value = value.replace(/\s/g, "");
    upiInput.value = value;

    const parts = value.split('@');

    if (parts.length === 2 && parts[1].length > 0) {
      upiPayBtn.style.opacity = "1";
      upiPayBtn.style.pointerEvents = "auto";
    } else {
      upiPayBtn.style.opacity = "0.5";
      upiPayBtn.style.pointerEvents = "none";
    }
  });
}

amountInput.addEventListener('input', () => {
  const value = amountInput.value.trim();

  let matched = false;

  rechargeCards.forEach(card => {
    const amount = card.dataset.amount;

    if (value === amount) {
      rechargeCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      matched = true;
    }
  });
  // ❌ no match → remove highlight
  if (!matched) {
    rechargeCards.forEach(c => c.classList.remove('active'));
  }

  // 🔥 ALWAYS GLOW (chahe match ho ya na ho)
  if (value !== "") {
    paymentCards.forEach(p => p.classList.add('glow'));

    setTimeout(() => {
      paymentCards.forEach(p => p.classList.remove('glow'));
    }, 2000);
  }
});
const getStartedBtn = document.querySelector('.plan-btn');
const subscribeNowBtn = document.querySelector('.primary-cta');

subscribeNowBtn.addEventListener('click', () => {
  setActiveScreen('products');
});

getStartedBtn.addEventListener('click', () => {
  getStartedBtn.style.transform = "scale(0.95)";
  getStartedBtn.style.boxShadow = "0 0 15px #7fcdf4";

  setTimeout(() => {
    getStartedBtn.style.transform = "scale(1)";
  }, 150);

  planModal.classList.remove('active');

  // 🔥 ADD THIS
  setActiveScreen('products');
});
const subscribeBtns = document.querySelectorAll('.buy-btn');
const featuredCards = document.querySelectorAll('.featured-card');
let selectedPlanType = "";
let count = 1;

function openProductDetailFromCard(card) {
  if (!card) return;

  const detailQuantitySelect = document.getElementById('quantity-select');
  const detailSlotSelect = document.getElementById('slot-select');
  const detailStartDate = document.getElementById('start-date');
  const detailEndDate = document.getElementById('end-date');
  const detailPacketCount = document.getElementById('packet-count');
  const detailCustomDatesWrap = document.getElementById('custom-dates-wrap');

  currentProduct = ""; // 🔥 RESET EVERY TIME
  selectedPlanType = "";

  document.querySelectorAll('.plan-pill')
    .forEach(p => p.classList.remove('active'));

  detailCustomDatesWrap.innerHTML = "";
  detailStartDate.value = "";
  detailEndDate.value = "";
  detailEndDate.disabled = true;
  detailSlotSelect.value = "";
  detailQuantitySelect.selectedIndex = 0;
  count = 1;
  detailPacketCount.textContent = 1;

  document.getElementById('buy-now-btn').disabled = true;
  document.getElementById('cart-btn').disabled = true;
  document.getElementById('buy-now-btn').style.background = "#dcdcdc";
  document.getElementById('cart-btn').style.background = "#dcdcdc";

  const name = card.querySelector('h3').textContent;
  const price = card.querySelector('strong').textContent;
  let image = "";

  if (name === "PANEER") {
    image = "./images/Paneer.png";
  }
  else if (name === "DAHI") {
    image = "./images/Dahi.png";
  }
  else if (name === "BUFFALO BILONA CHAACH") {
    image = "./images/Chaach.png";
  }
  else if (name === "COW BILONA CHAACH") {
    image = "./images/C chaach .png";
  }
  else if (name === "RAW BUFFALO MILK") {
    image = "./images/buffalo milk.png";
  }
  else if (name === "RAW COW MILK") {
    image = "./images/Milk.png";
  }
  else if (name === "RAW A2 COW MILK") {
    image = "./images/a2 milk (2).png";
  }
  else if (name === "RAW A2 COW GHEE") {
    image = "./images/Ghee.png";
  }
  else if (name ===  "COW GHEE") {
    image = "./images/cow ghee.png";
  }
  else if (name === "BUFFALO GHEE") {
    image = "./images/Ghee.png";
  }
  else {
    image = card.querySelector('img').src;
  }

  document.getElementById('detail-image').src = image;
  document.getElementById('detail-name').textContent = name;

  if (name === "RAW A2 COW MILK") {
    currentProduct = "A2";
    basePrice = 80;
    document.getElementById('detail-price').textContent = "Price: ₹85/L";
    document.getElementById('product-description').innerHTML = `
• Premium quality A2 milk obtained from indigenous Sahiwal cows known for their naturally nutritious milk.<br><br>
• Contains A2 protein which is easier to digest and considered healthier compared to regular milk varieties.<br><br>
• Rich source of calcium, protein, and natural nutrients that help support immunity, digestion, and overall wellness.<br><br>
• Freshly collected and delivered with care to preserve purity, taste, and authentic farm freshness every day.
`;
  }
  else if (name === "RAW COW MILK") {
    currentProduct = "COW";
    basePrice = 48;
    document.getElementById('detail-price').textContent = "Price: ₹55/L";
    document.getElementById('product-description').innerHTML = `
• Pure and fresh cow milk collected daily from trusted farms to ensure natural taste and high quality.<br><br>
• Rich in protein, calcium, vitamins, and essential nutrients that support a healthy and balanced lifestyle.<br><br>
• Light, easy to digest, and suitable for daily consumption for children, adults, and elderly family members.<br><br>
• Ideal for tea, coffee, milkshakes, breakfast, and homemade dairy products with natural farm freshness.
`;
  }
  else if (name === "RAW BUFFALO MILK") {
    currentProduct = "BUFFALO";
    basePrice = 72;
    document.getElementById('detail-price').textContent = "Price: ₹80/L";
    document.getElementById('product-description').innerHTML = `
• Fresh raw buffalo milk sourced directly from healthy farm buffaloes with no added preservatives or chemicals.<br><br>
• Naturally rich in calcium, protein, and healthy fats that help support strong bones, energy, and daily nutrition.<br><br>
• Thick creamy texture and authentic taste make it perfect for tea, coffee, sweets, curd, and traditional dairy recipes.<br><br>
• Hygienically collected and carefully delivered fresh to maintain purity, freshness, and farm-to-home quality.
`;
  }
  else if (name === "BUFFALO BILONA CHAACH") {
    currentProduct = "CHAACH";
    basePrice = 36;
    document.getElementById('detail-price').textContent = "Price: ₹42/L";
    document.getElementById('product-description').innerHTML = `
• Traditional bilona chaach prepared using authentic methods for a naturally refreshing and healthy drink.<br><br>
• Helps improve digestion, keeps the body cool, and provides natural hydration during daily routines.<br><br>
• Rich creamy taste with balanced texture makes it a perfect healthy refreshment for every meal.<br><br>
• Prepared hygienically from fresh curd without artificial flavors or preservatives for authentic homemade quality.
`;
  }
  else if (name === "COW BILONA CHAACH") {
    currentProduct = "COW_CHAACH";
    basePrice = 30;
    document.getElementById('detail-price').textContent = "Price: ₹35/L";
    document.getElementById('product-description').innerHTML = `
• Fresh and light bilona chaach made from pure cow curd using traditional preparation techniques.<br><br>
• Supports healthy digestion, gut health, and natural body cooling with refreshing taste and nutrition.<br><br>
• Smooth texture and authentic flavor make it perfect for summer refreshment and daily healthy consumption.<br><br>
• Carefully prepared and packed hygienically to maintain freshness, purity, and traditional homemade goodness.
`;
  }
  else if (name === "DAHI") {
    currentProduct = "DAHI";
    basePrice = 72;
    document.getElementById('detail-price').textContent = "Price: ₹72/500g";
    document.getElementById('product-description').innerHTML = `
• Fresh homemade-style dahi prepared from pure milk with thick texture and natural creamy taste.<br><br>
• Rich in probiotics and nutrients that help improve digestion, gut health, and daily nutrition.<br><br>
• Smooth consistency and refreshing flavor make it perfect for meals, raita, lassi, and healthy snacks.<br><br>
• Hygienically prepared and packed fresh to maintain purity, freshness, and authentic homemade quality.
`;
  }
  else if (name === "PANEER") {
    currentProduct = "PANEER";
    basePrice = 450;
    document.getElementById('detail-price').textContent = "Price: ₹450/Kg";
    document.getElementById('product-description').innerHTML = `
• Soft and fresh paneer prepared from pure milk with rich texture and authentic taste.<br><br>
• High in protein and calcium, making it a healthy choice for balanced meals and daily nutrition.<br><br>
• Perfect for curries, snacks, salads, sandwiches, and a variety of homemade dishes.<br><br>
• Freshly prepared under hygienic conditions to ensure softness, freshness, and premium quality.
`;
  }
  else if (name.includes("GHEE")) {
    currentProduct = "GHEE";

    if (name === "BUFFALO GHEE") {
      basePrice = 1300;
      document.getElementById('product-description').innerHTML = `
• Pure buffalo ghee prepared using traditional methods to preserve authentic aroma, richness, and nutrition.<br><br>
• Rich in healthy fats and natural energy that enhance the taste and nutrition of everyday meals.<br><br>
• Thick texture and strong flavor make it ideal for cooking, sweets, rotis, and traditional Indian dishes.<br><br>
• Carefully processed from quality milk under hygienic conditions to ensure purity and premium quality.
`;
    }
    else if (name === "COW GHEE") {
      basePrice = 1100;
      document.getElementById('product-description').innerHTML = `
• Traditional cow ghee made from pure milk with rich aroma, authentic flavor, and natural nutrition.<br><br>
• Contains healthy fats and essential nutrients that support energy, digestion, and balanced daily diet.<br><br>
• Perfect for cooking, frying, sweets, and adding traditional taste to homemade meals and recipes.<br><br>
• Hygienically prepared to maintain freshness, purity, and premium quality in every spoon.
`;
    }
    else if (name === "RAW A2 COW GHEE") {
      basePrice = 2800;
      document.getElementById('product-description').innerHTML = `
• Premium bilona A2 cow ghee prepared from A2 milk of indigenous cows using traditional techniques.<br><br>
• Known for its rich nutrition, authentic aroma, and natural Ayurvedic benefits for healthy living.<br><br>
• Contains healthy fats and essential nutrients that support digestion, immunity, and daily wellness.<br><br>
• Carefully crafted in hygienic conditions to preserve purity, freshness, and superior traditional quality.
`;
    }

    document.getElementById('detail-price').textContent = `Price: ₹${basePrice}/Kg`;
  }

  detailQuantitySelect.innerHTML = `
    <option value="0.5">500 ml</option>
    <option value="1">1 L</option>
  `;

  if (name === "PANEER") {
    detailQuantitySelect.innerHTML = `
      <option value="0.1">100 g</option>
      <option value="0.5">500 g</option>
      <option value="1">1 Kg</option>
    `;
  }
  else if (name === "DAHI") {
    detailQuantitySelect.innerHTML = `
      <option value="0.25">250 g</option>
      <option value="0.5">500 g</option>
      <option value="1">1 Kg</option>
    `;
  }
  else if (name.includes("GHEE")) {
    detailQuantitySelect.innerHTML = `
      <option value="0.5">500 g</option>
      <option value="1">1 Kg</option>
    `;
  }

  updatePrice();
  setActiveScreen('productDetail');
  syncDetailWishlistButton();
}

featuredCards.forEach(card => {

  card.addEventListener('click', () => {

    if (!isLoggedIn) {
      setActiveScreen("login");
      return;
    }

    const name = card.dataset.name;

    // 🔥 Find same product card from products section
    const productCards =
      document.querySelectorAll('#products-screen .product-card');

    productCards.forEach(product => {

      const productName =
        product.querySelector('h3').textContent;

      if (productName === name) {

        // 🔥 SAME SUBSCRIBE BUTTON CLICK TRIGGER
        product.querySelector('.buy-btn')?.click();
      }

    });

  });

});

const featuredList = document.querySelector('.featured-list');

featuredList?.addEventListener('click', (e) => {
  if (e.target.closest('.wishlist-heart')) return;

  const featuredCard = e.target.closest('.featured-card');
  if (!featuredCard) return;

  e.stopPropagation();

  if (!isLoggedIn) {
    setActiveScreen("login");
    return;
  }

  const name = featuredCard.dataset.name;
  const productCard = Array
    .from(document.querySelectorAll('#products-screen .product-card'))
    .find(product =>
      product.querySelector('h3')?.textContent.trim() === name
    );

  productCard?.querySelector('.buy-btn')?.click();
}, true);

document.getElementById('products-screen')?.addEventListener('click', (e) => {
  const subscribeButton = e.target.closest('.buy-btn');
  if (!subscribeButton) return;

  e.preventDefault();
  e.stopImmediatePropagation();

  if (!isLoggedIn) {
    setActiveScreen("login");
    return;
  }

  openProductDetailFromCard(subscribeButton.closest('.product-card'));
}, true);

subscribeBtns.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();

    if (!isLoggedIn) {
  setActiveScreen("login");
  return;
}

    openProductDetailFromCard(btn.closest('.product-card'));
    return;

    const detailQuantitySelect = document.getElementById('quantity-select');
    const detailSlotSelect = document.getElementById('slot-select');
    const detailStartDate = document.getElementById('start-date');
    const detailEndDate = document.getElementById('end-date');
    const detailPacketCount = document.getElementById('packet-count');
    const detailCustomDatesWrap = document.getElementById('custom-dates-wrap');

    currentProduct = ""; // 🔥 RESET EVERY TIME
    // 🔥 RESET PRODUCT DETAIL SCREEN

selectedPlanType = "";

document.querySelectorAll('.plan-pill')
  .forEach(p => p.classList.remove('active'));

detailCustomDatesWrap.innerHTML = "";

detailStartDate.value = "";

detailEndDate.value = "";

detailEndDate.disabled = true;

detailSlotSelect.value = "";

detailQuantitySelect.selectedIndex = 0;

count = 1;

detailPacketCount.textContent = 1;

    document.querySelectorAll('.plan-pill').forEach(btn => {
  btn.classList.remove('active');
});

    const card = btn.closest('.product-card');
    if (!card) return;

    const name = card.querySelector('h3').textContent;
    const price = card.querySelector('strong').textContent;
    let image = "";

if (name === "PANEER") {
  image = "./images/Paneer.png";
}
else if (name === "DAHI") {
  image = "./images/Dahi.png";
}
else if (name === "BUFFALO BILONA CHAACH") {
  image = "./images/Chaach.png";
}
else if (name === "COW BILONA CHAACH") {
  image = "./images/C chaach .png";
}
else if (name === "RAW BUFFALO MILK") {
  image = "./images/buffalo milk.png";
}
else if (name === "RAW COW MILK") {
  image = "./images/Milk.png";
}
else if (name === "RAW A2 COW MILK") {
  image = "./images/a2 milk (2).png";
}
else if (name === "RAW A2 COW GHEE") {
  image = "./images/Ghee.png";
}
else if (name ===  "COW GHEE") {
  image = "./images/cow ghee.png";
}
else if (name === "BUFFALO GHEE") {
  image = "./images/Ghee.png";
}
else {
  // fallback (just in case)
  image = card.querySelector('img').src;
}
document.getElementById('detail-image').src = image;

    // 🔥 set data in detail screen
    document.getElementById('detail-name').textContent = name;
    const cleanPrice = price.replace("Rs.", "").trim();

if (name === "RAW A2 COW MILK") {
  currentProduct = "A2";
  basePrice = 80;

  document.getElementById('detail-price').textContent = "Price: ₹85/L";
document.getElementById('product-description').innerHTML = `
• Premium quality A2 milk obtained from indigenous Sahiwal cows known for their naturally nutritious milk.<br><br>

• Contains A2 protein which is easier to digest and considered healthier compared to regular milk varieties.<br><br>

• Rich source of calcium, protein, and natural nutrients that help support immunity, digestion, and overall wellness.<br><br>

• Freshly collected and delivered with care to preserve purity, taste, and authentic farm freshness every day.
`;}

else if (name === "RAW COW MILK") {
  currentProduct = "COW";
  basePrice = 48;

  document.getElementById('detail-price').textContent = "Price: ₹55/L"; // default (you can change)
document.getElementById('product-description').innerHTML = `
• Pure and fresh cow milk collected daily from trusted farms to ensure natural taste and high quality.<br><br>

• Rich in protein, calcium, vitamins, and essential nutrients that support a healthy and balanced lifestyle.<br><br>

• Light, easy to digest, and suitable for daily consumption for children, adults, and elderly family members.<br><br>

• Ideal for tea, coffee, milkshakes, breakfast, and homemade dairy products with natural farm freshness.
`;}

else if (name === "RAW BUFFALO MILK") {
  currentProduct = "BUFFALO";
  basePrice = 72;

  document.getElementById('detail-price').textContent = "Price: ₹80/L"; // default (you can change)
document.getElementById('product-description').innerHTML = `
• Fresh raw buffalo milk sourced directly from healthy farm buffaloes with no added preservatives or chemicals.<br><br>

• Naturally rich in calcium, protein, and healthy fats that help support strong bones, energy, and daily nutrition.<br><br>

• Thick creamy texture and authentic taste make it perfect for tea, coffee, sweets, curd, and traditional dairy recipes.<br><br>

• Hygienically collected and carefully delivered fresh to maintain purity, freshness, and farm-to-home quality.
`;}

else if (name === "BUFFALO BILONA CHAACH") {
  currentProduct = "CHAACH";
  basePrice = 36;

  document.getElementById('detail-price').textContent = "Price: ₹42/L"; // default
document.getElementById('product-description').innerHTML = `
• Traditional bilona chaach prepared using authentic methods for a naturally refreshing and healthy drink.<br><br>

• Helps improve digestion, keeps the body cool, and provides natural hydration during daily routines.<br><br>

• Rich creamy taste with balanced texture makes it a perfect healthy refreshment for every meal.<br><br>

• Prepared hygienically from fresh curd without artificial flavors or preservatives for authentic homemade quality.
`;}

else if (name === "COW BILONA CHAACH") {
  currentProduct = "COW_CHAACH";
  basePrice = 30;

  document.getElementById('detail-price').textContent = "Price: ₹35/L"; // default
document.getElementById('product-description').innerHTML = `
• Fresh and light bilona chaach made from pure cow curd using traditional preparation techniques.<br><br>

• Supports healthy digestion, gut health, and natural body cooling with refreshing taste and nutrition.<br><br>

• Smooth texture and authentic flavor make it perfect for summer refreshment and daily healthy consumption.<br><br>

• Carefully prepared and packed hygienically to maintain freshness, purity, and traditional homemade goodness.
`;}

else if (name === "DAHI") {
  currentProduct = "DAHI";
  basePrice = 72;

  document.getElementById('detail-price').textContent = "Price: ₹72/500g";
document.getElementById('product-description').innerHTML = `
• Fresh homemade-style dahi prepared from pure milk with thick texture and natural creamy taste.<br><br>

• Rich in probiotics and nutrients that help improve digestion, gut health, and daily nutrition.<br><br>

• Smooth consistency and refreshing flavor make it perfect for meals, raita, lassi, and healthy snacks.<br><br>

• Hygienically prepared and packed fresh to maintain purity, freshness, and authentic homemade quality.
`;}

else if (name === "PANEER") {
  currentProduct = "PANEER";
  basePrice = 450;

  document.getElementById('detail-price').textContent = "Price: ₹450/Kg";
document.getElementById('product-description').innerHTML = `
• Soft and fresh paneer prepared from pure milk with rich texture and authentic taste.<br><br>

• High in protein and calcium, making it a healthy choice for balanced meals and daily nutrition.<br><br>

• Perfect for curries, snacks, salads, sandwiches, and a variety of homemade dishes.<br><br>

• Freshly prepared under hygienic conditions to ensure softness, freshness, and premium quality.
`;}

else if (name.includes("GHEE")) {
  currentProduct = "GHEE";

  if (name === "BUFFALO GHEE"){ basePrice = 1300;
    document.getElementById('product-description').innerHTML = `
• Pure buffalo ghee prepared using traditional methods to preserve authentic aroma, richness, and nutrition.<br><br>

• Rich in healthy fats and natural energy that enhance the taste and nutrition of everyday meals.<br><br>

• Thick texture and strong flavor make it ideal for cooking, sweets, rotis, and traditional Indian dishes.<br><br>

• Carefully processed from quality milk under hygienic conditions to ensure purity and premium quality.
`;
  }
  else if (name === "COW GHEE"){ basePrice = 1100;
    document.getElementById('product-description').innerHTML = `
• Traditional cow ghee made from pure milk with rich aroma, authentic flavor, and natural nutrition.<br><br>

• Contains healthy fats and essential nutrients that support energy, digestion, and balanced daily diet.<br><br>

• Perfect for cooking, frying, sweets, and adding traditional taste to homemade meals and recipes.<br><br>

• Hygienically prepared to maintain freshness, purity, and premium quality in every spoon.
`;
  }
  else if (name === "RAW A2 COW GHEE"){ basePrice = 2800;
    document.getElementById('product-description').innerHTML = `
• Premium bilona A2 cow ghee prepared from A2 milk of indigenous cows using traditional techniques.<br><br>

• Known for its rich nutrition, authentic aroma, and natural Ayurvedic benefits for healthy living.<br><br>

• Contains healthy fats and essential nutrients that support digestion, immunity, and daily wellness.<br><br>

• Carefully crafted in hygienic conditions to preserve purity, freshness, and superior traditional quality.
`;
  }

  document.getElementById('detail-price').textContent = `Price: ₹${basePrice}/Kg`;
}
updatePrice();
    document.getElementById('detail-image').src = image;
    const quantitySelect =
  detailQuantitySelect;

// 🔥 Default for milk & chaach
quantitySelect.innerHTML = `
  <option value="0.5">500 ml</option>
  <option value="1">1 L</option>
`;

// 🔥 For ghee, paneer, dahi
if (
  name.includes("GHEE") ||
  name === "PANEER" ||
  name === "DAHI"
) {

  if (name === "PANEER") {

  quantitySelect.innerHTML = `
    <option value="0.1">100 g</option>
    <option value="0.5">500 g</option>
    <option value="1">1 Kg</option>
  `;
}

else if (name === "DAHI") {

  quantitySelect.innerHTML = `
    <option value="0.25">250 g</option>
    <option value="0.5">500 g</option>
    <option value="1">1 Kg</option>
  `;
}

else if (name.includes("GHEE")) {

  quantitySelect.innerHTML = `
    <option value="0.5">500 g</option>
    <option value="1">1 Kg</option>
  `;
}
}

    // 🔥 go to detail screen
    setActiveScreen('productDetail');
    syncDetailWishlistButton();

  });
});
const planPills = document.querySelectorAll('.plan-pill');

const startInput = document.getElementById('start-date');
const endInput = document.getElementById('end-date');

planPills.forEach(btn => {
  btn.addEventListener('click', () => {
    // 🔥 CUSTOMISED PLAN
if (
  btn.textContent.trim() === "Customised"
) {

  endDate.disabled = false;

}
else {

  endDate.disabled = true;

}

    // active toggle
    planPills.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    // 🔥 REMOVE OLD CUSTOM BLOCKS
if (btn.textContent.trim() !== "Customised") {

  document.getElementById(
    'custom-dates-wrap'
  ).innerHTML = "";

}

    selectedPlanType = btn.textContent.trim();

    // reset
    endInput.readOnly = true;
    startInput.classList.remove('date-glow');
    endInput.classList.remove('date-glow');

    void startInput.offsetWidth;

    if (selectedPlanType === "Customised") {
      // 🔥 both glow
      startInput.classList.add('date-glow');
      endInput.classList.add('date-glow');

      endInput.readOnly = false; // editable
    } else if (selectedPlanType === "One Time Only") {
      startInput.classList.add('date-glow');

      if (startInput.value) {
        endInput.value = startInput.value;
      }
    } else {
      // 🔥 only start glow
      startInput.classList.add('date-glow');
    }

    setTimeout(() => {
      startInput.classList.remove('date-glow');
      endInput.classList.remove('date-glow');
    }, 3000);

    updateEndDate(); // 🔥 auto calculation
    updatePrice();
    checkForm();
  });
});
function updateEndDate() {

  if (!startInput.value) return;

  const start = new Date(startInput.value);

  let daysToAdd = 0;

  if (selectedPlanType === "One Time Only") daysToAdd = 0;
  else if (selectedPlanType === "Monthly") daysToAdd = 30;
  else if (selectedPlanType === "15 Days") daysToAdd = 15;
  else if (selectedPlanType === "Weekly") daysToAdd = 7;
  else return; // Custom → skip

  start.setDate(start.getDate() + daysToAdd);

  const year = start.getFullYear();
  const month = String(start.getMonth() + 1).padStart(2, '0');
  const day = String(start.getDate()).padStart(2, '0');

  endInput.value = `${year}-${month}-${day}`;
}
function generateCustomDateBlocks() {

  const wrap =
    document.getElementById('custom-dates-wrap');

  wrap.innerHTML = "";

  const start =
    new Date(startInput.value);

  const end =
    new Date(endInput.value);

  if (!startInput.value || !endInput.value)
    return;

  let current =
    new Date(start);

  while (current <= end) {

    const day =
      current.getDate();

    const month =
      current.toLocaleString('default', {
        month: 'short'
      });

    const fullDate =
      `${day} ${month}`;

    const block =
      document.createElement('div');

    block.className = "date-block";

    block.innerHTML = `
      ${fullDate}

      <div class="date-config">

        <select>
          <option>Qty 1</option>
          <option>Qty 2</option>
          <option>Qty 3</option>
        </select>

        <select>
          <option>Morning</option>
          <option>Evening</option>
        </select>

      </div>
    `;

    block.addEventListener('click', () => {

      block.classList.toggle('active');

      const config =
        block.querySelector('.date-config');

      config.classList.toggle('active');

    });

    wrap.appendChild(block);

    current.setDate(
      current.getDate() + 1
    );
  }
}
const countDisplay = document.getElementById('packet-count');

document.getElementById('plus').addEventListener('click', () => {
  count++;
  countDisplay.textContent = count;
});

document.getElementById('minus').addEventListener('click', () => {
  if (count > 1) {
    count--;
    countDisplay.textContent = count;
  }
});
const quantitySelect = document.getElementById('quantity-select');
const slotSelect = document.getElementById('slot-select');
const startDate = document.getElementById('start-date');
const endDate = document.getElementById('end-date');
const buyNowBtn = document.getElementById('buy-now-btn');

function checkForm() {

  const quantity = quantitySelect.value;
  const slot = slotSelect.value;
  const start = startDate.value;
  const end = endDate.value;
  const selectedPlanBtn =
    document.querySelector('.plan-pill.active');

  if (selectedPlanBtn && quantity && slot && start && end) {
    buyNowBtn.disabled = false;
    cartBtnClick.disabled = false;

    buyNowBtn.style.background = "#7fcdf4";
    cartBtnClick.style.background = "#7fcdf4";
  } else {
    buyNowBtn.disabled = true;
    cartBtnClick.disabled = true;

    buyNowBtn.style.background = "#dcdcdc";
    cartBtnClick.style.background = "#dcdcdc";
  }
}
quantitySelect.addEventListener('change', checkForm);
quantitySelect.addEventListener('change', updatePrice);
slotSelect.addEventListener('change', checkForm);
startDate.addEventListener('change', () => {

  let selectedPlanBtn =
    document.querySelector('.plan-pill.active');

  // 🔥 PLAN REQUIRED
  if (!selectedPlanBtn) {

    endDate.value = "";

    endDate.disabled = true;

  }

  else {

    const plan =
      selectedPlanBtn.textContent.trim();

    // 🔥 ONE TIME ONLY
    if (plan === "One Time Only") {

      endDate.value = startDate.value;

      endDate.disabled = true;

    }

    // 🔥 CUSTOMISED
    else if (plan === "Customised") {

      endDate.disabled = false;

      endDate.value = "";

    }

    // 🔥 WEEKLY
    else if (plan === "Weekly") {

      let start = new Date(startDate.value);

      start.setDate(start.getDate() + 6);

      endDate.value =
        start.toISOString().split('T')[0];

      endDate.disabled = true;

    }

    // 🔥 15 DAYS
    else if (plan === "15 Days") {

      let start = new Date(startDate.value);

      start.setDate(start.getDate() + 14);

      endDate.value =
        start.toISOString().split('T')[0];

      endDate.disabled = true;

    }

    // 🔥 MONTHLY
    else if (plan === "Monthly") {

      let start = new Date(startDate.value);

      start.setMonth(start.getMonth() + 1);

      start.setDate(start.getDate() - 1);

      endDate.value =
        start.toISOString().split('T')[0];

      endDate.disabled = true;

    }

  }

  checkForm();

});
endDate.addEventListener('change', checkForm);
endDate.addEventListener('change', () => {

  const selectedPlan =
    document.querySelector('.plan-pill.active');

  if (
    selectedPlan &&
    selectedPlan.textContent.trim() === "Customised"
  ) {

    generateCustomDateBlocks();

  }

});
buyNowBtn.addEventListener('click', () => {

  if (!isLoggedIn) {
    setActiveScreen("login");
    return;
  }

  const productName =
    document.getElementById('detail-name').textContent;

  const productPrice =
    document.getElementById('detail-price').textContent;

  const productImage =
    document.getElementById('detail-image').src;

  const quantity =
    document.getElementById('quantity-select').value;

  const packets =
    document.getElementById('packet-count').textContent;

  const start =
    document.getElementById('start-date').value;

  const end =
    document.getElementById('end-date').value;

  const slot =
    document.getElementById('slot-select').value;

  let selectedPlanBtn =
    document.querySelector('.plan-pill.active');

  if (!selectedPlanBtn) return;

  let plan = selectedPlanBtn.textContent.trim();

  const buyNowItem = {
    name: productName,
    price: productPrice,
    image: productImage,
    quantity,
    packets,
    start,
    end,
    slot,
    plan
  };

  localStorage.setItem(
    'buyNowItem',
    JSON.stringify(buyNowItem)
  );

  setActiveScreen('checkout');

});

    

const cartBtnClick = document.getElementById('cart-btn');

cartBtnClick.addEventListener('click', () => {
  if (!isLoggedIn) {
  setActiveScreen("login");
  return;
}

  const productName = document.getElementById('detail-name').textContent;
  
const priceText =
  document.getElementById('detail-price')
  .textContent;

const productPrice =
  parseFloat(
    priceText
      .replace('Price: ₹', '')
      .split('/')[0]
  );

const productImage = document.getElementById('detail-image').src;
  const quantity = document.getElementById('quantity-select').value;
  const packets = document.getElementById('packet-count').textContent;
  const start = document.getElementById('start-date').value;
  const end = document.getElementById('end-date').value;
  const slot = document.getElementById('slot-select').value;
  let selectedPlanBtn = document.querySelector('.plan-pill.active');

if (!selectedPlanBtn) return;

let plan = selectedPlanBtn.textContent.trim();


  const cartItem = {
    name: productName,
    price: productPrice,
    image: productImage,
    quantity,
    packets,
    start,
    end,
    slot,
    plan
  };

  let cart = JSON.parse(localStorage.getItem('cart')) || [];

// 🔍 check if same product already exists
const existingItem = cart.find(item =>
  item.name === cartItem.name &&
  item.quantity === cartItem.quantity &&
  item.slot === cartItem.slot &&
  item.plan === cartItem.plan
);

// ✅ if exists → increase packets
if (existingItem) {
  existingItem.packets = Number(existingItem.packets) + Number(cartItem.packets);
} else {
  // ❌ if different → create new card
  cart.push(cartItem);
}

// save
localStorage.setItem('cart', JSON.stringify(cart));
updateCartBadge(); // 🔥 ADD THIS

  // success screen
  setActiveScreen('cartSuccess');

  setTimeout(() => {
    setActiveScreen('home');
  }, 1500);
});
cartBtnClick.addEventListener('click', () => {
  cartBtnClick.style.transform = "scale(0.35)";

  setTimeout(() => {
    cartBtnClick.style.transform = "scale(1)";
  }, 150);
});
const customPlanBanner = document.querySelector('.custom-plan-banner');

customPlanBanner.addEventListener('click', (e) => {
  e.stopPropagation();
  planTitle.textContent = "Customised Subscription Plan";
  planModal.classList.add('active');
});
function getBasePrice(priceStr) {
  return Number(priceStr.replace(/[^0-9.]/g, ""));
}
let selectedCartItems = new Set();

function saveSelectedCartItems() {
  localStorage.setItem(
    'selectedCartItems',
    JSON.stringify([...selectedCartItems])
  );
}

function loadSelectedCartItems() {
  selectedCartItems = new Set(
    JSON.parse(localStorage.getItem('selectedCartItems')) || []
  );
}

function getSelectedCartTotal(cart) {
  let total = 0;

  selectedCartItems.forEach(index => {
    const item = cart[index];
    if (!item) return;

    total += Number(item.price) * Number(item.packets);
  });

  return total;
}

function renderCartPricePanel(cart) {
  const panel =
    document.getElementById('cart-price-panel');

  if (!panel) return;

  const selectedCount = selectedCartItems.size;
  const totalMrp = getSelectedCartTotal(cart);
  const platformFee = selectedCount > 0 ? 0 : 0;
  const totalAmount = totalMrp + platformFee;

  panel.innerHTML = `
    <div class="price-details-box">
      <h3>
        PRICE DETAILS (${selectedCount} Item${selectedCount === 1 ? "" : "s"})
      </h3>

      <div class="price-line">
        <span>Total MRP</span>
        <strong>₹${totalMrp}</strong>
      </div>

      <div class="price-line">
        <span>Platform Fee</span>
        <strong>${platformFee === 0 ? "Free" : `₹${platformFee}`}</strong>
      </div>

      <div class="price-total-line">
        <span>Total Amount</span>
        <strong>₹${totalAmount}</strong>
      </div>

      <button
        type="button"
        class="place-order-btn"
        ${selectedCount === 0 ? "disabled" : ""}
      >
        PLACE ORDER
      </button>
    </div>
  `;

  panel
    .querySelector('.place-order-btn')
    ?.addEventListener('click', () => {
      if (selectedCartItems.size === 0) return;
      setActiveScreen('cartAddress');
    });
}

function getSelectedCartItems(cart) {
  return [...selectedCartItems]
    .map(index => cart[index])
    .filter(Boolean);
}

function getDeliveryEstimateText() {
  const estimate = new Date();
  estimate.setDate(estimate.getDate() + 4);

  return estimate.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });
}

function formatDeliveryDate(dateValue) {
  if (!dateValue) return "";

  const date = new Date(dateValue);
  if (Number.isNaN(date.getTime())) return dateValue;

  return date.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });
}

function getDeliveryTimeWindow(slot) {
  const normalizedSlot = String(slot || "").toLowerCase();

  if (normalizedSlot === "morning") {
    return "7 a.m - 9 a.m";
  }

  if (normalizedSlot === "evening") {
    return "4 p.m - 7 p.m";
  }

  return "As per selected slot";
}

function getDeliveryDateRange(item) {
  const start = formatDeliveryDate(item.start);
  const end = formatDeliveryDate(item.end);

  if (!start && !end) return "";
  if (!end || start === end) return start;

  return `${start} - ${end}`;
}

function renderCartAddressSummary(cart) {
  const summary =
    document.getElementById('cartAddressSummary');

  if (!summary) return;

  const selectedItems = getSelectedCartItems(cart);
  const selectedCount = selectedItems.length;
  const totalMrp = getSelectedCartTotal(cart);
  const platformFee = selectedCount > 0 ? 0 : 0;
  const totalAmount = totalMrp + platformFee;

  summary.innerHTML = `
    <div class="delivery-estimate-box">
      <h3>DELIVERY ESTIMATES</h3>
      ${selectedItems.length ? `
        <div class="delivery-estimate-list">
          ${selectedItems.map(item => `
            <div class="delivery-estimate-row">
              <img src="${item.image}" alt="">
              <p>
                Estimated delivery between
                <strong>${getDeliveryTimeWindow(item.slot)}</strong>
                on
                <strong>${getDeliveryDateRange(item)}</strong>
              </p>
            </div>
          `).join("")}
        </div>
      ` : `
        <p class="muted-summary-text">Select items from your bag first.</p>
      `}
    </div>

    <div class="price-details-box address-price-box">
      <h3>
        PRICE DETAILS (${selectedCount} Item${selectedCount === 1 ? "" : "s"})
      </h3>

      <div class="price-line">
        <span>Total MRP</span>
        <strong>₹${totalMrp}</strong>
      </div>

      <div class="price-line">
        <span>Platform Fee</span>
        <strong>${platformFee === 0 ? "Free" : `₹${platformFee}`}</strong>
      </div>

      <div class="price-total-line">
        <span>Total Amount</span>
        <strong>₹${totalAmount}</strong>
      </div>

      <button
        type="button"
        class="place-order-btn"
        ${selectedCount === 0 ? "disabled" : ""}
      >
        CONTINUE
      </button>
    </div>
  `;
}

function renderCartAddressPage() {
  const cart =
    JSON.parse(localStorage.getItem('cart')) || [];

  loadSelectedCartItems();
  selectedCartItems = new Set(
    [...selectedCartItems].filter(index => index < cart.length)
  );
  saveSelectedCartItems();

  const list =
    document.getElementById('cartAddressList');

  if (!list) return;

  const addresses =
    JSON.parse(localStorage.getItem('addresses')) || [];

  const selectedAddressId =
    Number(localStorage.getItem('selectedDeliveryAddressId')) ||
    addresses[0]?.id;

  renderCartAddressSummary(cart);

  if (addresses.length === 0) {
    list.innerHTML = `
      <div class="cart-address-empty">
        No saved address yet.
      </div>
    `;
    return;
  }

  list.innerHTML = `
    <h3 class="address-group-title">SAVED ADDRESS</h3>
    ${addresses.map(address => `
      <article class="cart-address-card ${address.id === selectedAddressId ? "selected" : ""}">
        <label>
          <input
            type="radio"
            name="cartSelectedAddress"
            value="${address.id}"
            ${address.id === selectedAddressId ? "checked" : ""}
          >
          <span></span>
        </label>

        <div class="cart-address-info">
          <h3>
            ${address.name}
            <small>HOME</small>
          </h3>

          <p>${address.house}, ${address.street}</p>
          <p>${address.town ? `${address.town}, ` : ""}${address.city}, ${address.state} - ${address.pin}</p>
          <p>Mobile: <strong>${address.mobile}</strong></p>
          <p class="cod-line">Pay on Delivery available</p>

          <div class="address-actions">
            <button type="button" data-remove-address="${address.id}">REMOVE</button>
            <button type="button" data-edit-address="${address.id}">EDIT</button>
          </div>
        </div>
      </article>
    `).join("")}
  `;

  document
    .querySelectorAll('[name="cartSelectedAddress"]')
    .forEach(radio => {
      radio.addEventListener('change', (e) => {
        localStorage.setItem(
          'selectedDeliveryAddressId',
          e.target.value
        );
        renderCartAddressPage();
      });
    });

  document
    .querySelectorAll('[data-remove-address]')
    .forEach(btn => {
      btn.addEventListener('click', () => {
        removeAddress(Number(btn.dataset.removeAddress));
        renderCartAddressPage();
      });
    });

  document
    .querySelectorAll('[data-edit-address]')
    .forEach(btn => {
      btn.addEventListener('click', () => {
        fillCartAddressForm(Number(btn.dataset.editAddress));
      });
    });
}

function loadOrders() {

  const container = document.getElementById('orders-container');
  container.innerHTML = "";

  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  loadSelectedCartItems();

  selectedCartItems = new Set(
    [...selectedCartItems].filter(index => index < cart.length)
  );
  saveSelectedCartItems();
  renderCartPricePanel(cart);

  container.innerHTML = `
    <div class="cart-select-header">
      <label class="cart-check-wrap">
        <input
          type="checkbox"
          id="select-all-cart"
          ${cart.length > 0 && selectedCartItems.size === cart.length ? "checked" : ""}
        >
        <span></span>
      </label>

      <p>
        (${selectedCartItems.size}/${cart.length})
      </p>
    </div>
  `;

  if (cart.length === 0) {
    container.innerHTML += "<p class='empty-cart-text'>No products in bag</p>";
    return;
  }

  cart.forEach((item, index) => {
const basePrice = Number(item.price);
const packets = Number(item.packets);

const totalPrice = basePrice * packets;

    const card = `
<div class="order-card" data-index="${index}">
  <label class="cart-check-wrap cart-item-check">
    <input
      type="checkbox"
      class="cart-card-checkbox"
      data-index="${index}"
      ${selectedCartItems.has(index) ? "checked" : ""}
    >
    <span></span>
  </label>

  <!-- remove -->
  <button class="remove-btn">✕</button>

  <!-- LEFT -->
  <div class="cart-left">
    <img src="${item.image}" class="cart-product-img">

  </div>

  <!-- RIGHT -->
  <div class="cart-right">

    <h3 class="cart-title">
      ${item.name}
    </h3>

    <div class="cart-price">
      ₹ ${totalPrice}
    </div>

    <!-- size + qty row -->
    <div class="cart-select-row">

      <div class="cart-select-group">
        <span>Size:</span>

        <select class="size-select">

${item.name.includes("MILK") || item.name.includes("CHAACH") ? `

  <option value="500ml"
    ${item.quantity == "500ml" || item.quantity == "0.5" ? "selected" : ""}>
    500ml
  </option>

  <option value="1L"
    ${item.quantity == "1L" || item.quantity == "1" ? "selected" : ""}>
    1L
  </option>

` : ""}

${item.name.includes("GHEE") ? `

  <option value="500g"
    ${item.quantity == "500g" || item.quantity == "0.5" ? "selected" : ""}>
    500g
  </option>

  <option value="1Kg"
    ${item.quantity == "1Kg" || item.quantity == "1" ? "selected" : ""}>
    1Kg
  </option>

` : ""}

${item.name == "PANEER" ? `

  <option value="100g"
    ${item.quantity == "100g" || item.quantity == "0.1" ? "selected" : ""}>
    100g
  </option>

  <option value="500g"
    ${item.quantity == "500g" || item.quantity == "0.5" ? "selected" : ""}>
    500g
  </option>

  <option value="1Kg"
    ${item.quantity == "1Kg" || item.quantity == "1" ? "selected" : ""}>
    1Kg
  </option>

` : ""}

${item.name == "DAHI" ? `

  <option value="250g"
    ${item.quantity == "250g" || item.quantity == "0.25" ? "selected" : ""}>
    250g
  </option>

  <option value="500g"
    ${item.quantity == "500g" || item.quantity == "0.5" ? "selected" : ""}>
    500g
  </option>

  <option value="1Kg"
    ${item.quantity == "1Kg" || item.quantity == "1" ? "selected" : ""}>
    1Kg
  </option>

` : ""}

</select>
      </div>

      <div class="cart-select-group">
        <span>Qty:</span>

        <select class="qty-dropdown">
          <option ${item.packets == 1 ? 'selected' : ''}>1</option>
          <option ${item.packets == 2 ? 'selected' : ''}>2</option>
          <option ${item.packets == 3 ? 'selected' : ''}>3</option>
          <option ${item.packets == 4 ? 'selected' : ''}>4</option>
        </select>

      </div>

    </div>

    <div class="cart-detail">
      Plan: ${item.plan}
    </div>

    <div class="cart-detail">
      Start: ${item.start}
    </div>

    <div class="cart-detail">
      End: ${item.end}
    </div>

    <div class="cart-detail">
      Slot: ${item.slot}
    </div>

  </div>

</div>
`;
    container.innerHTML += card; // ✅ IMPORTANT
  });

  const selectAllCart =
    document.getElementById('select-all-cart');

  selectAllCart?.addEventListener('change', (e) => {
    if (e.target.checked) {
      selectedCartItems = new Set(cart.map((_, index) => index));
    } else {
      selectedCartItems.clear();
    }

    saveSelectedCartItems();
    loadOrders();
  });

  document.querySelectorAll('.cart-card-checkbox').forEach(checkbox => {
    checkbox.addEventListener('change', (e) => {
      const index = Number(e.target.dataset.index);

      if (e.target.checked) {
        selectedCartItems.add(index);
      } else {
        selectedCartItems.delete(index);
      }

      saveSelectedCartItems();
      loadOrders();
    });
  });

  // 🔥 REMOVE LOGIC (LOOP KE BAAD)
  document.querySelectorAll('.remove-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {

      const card = e.target.closest('.order-card');
      const index = card.dataset.index;

      let cart = JSON.parse(localStorage.getItem('cart')) || [];

      cart.splice(index, 1);
      selectedCartItems = new Set(
        [...selectedCartItems]
          .filter(selectedIndex => selectedIndex !== Number(index))
          .map(selectedIndex =>
            selectedIndex > Number(index) ? selectedIndex - 1 : selectedIndex
          )
      );
      saveSelectedCartItems();

      localStorage.setItem('cart', JSON.stringify(cart));
      updateCartBadge();

      loadOrders();
    });
  });
  
// 🔥 SIZE CHANGE
document.querySelectorAll('.size-select').forEach(select => {

  select.addEventListener('change', (e) => {

    const card = e.target.closest('.order-card');

    const index = card.dataset.index;

    let cart =
      JSON.parse(localStorage.getItem('cart')) || [];

    const item = cart[index];

    const selectedSize = e.target.value;

    item.quantity = selectedSize;

    // 🔥 PRICE RECALCULATION

    // 🔥 RAW BUFFALO MILK
if (item.name === "RAW BUFFALO MILK") {

  if (item.plan === "Monthly") {
    item.price =
      selectedSize === "500ml" ? 36 : 72;
  }

  else if (item.plan === "15 Days") {
    item.price =
      selectedSize === "500ml" ? 36.5 : 73;
  }

  else if (item.plan === "Weekly") {
    item.price =
      selectedSize === "500ml" ? 37 : 74;
  }
    // fallback safety
  else {
    item.price =
      selectedSize === "500ml" ? 37.5 : 75;
  }

}

// 🔥 RAW COW MILK
else if (item.name === "RAW COW MILK") {

  if (item.plan === "Monthly") {
    item.price =
      selectedSize === "500ml" ? 24 : 48;
  }

  else if (item.plan === "15 Days") {
    item.price =
      selectedSize === "500ml" ? 24.5 : 49;
  }

  else if (item.plan === "Weekly") {
    item.price =
      selectedSize === "500ml" ? 25 : 50;
  }
   // fallback safety
  else {
    item.price =
      selectedSize === "500ml" ? 25.5 : 51;
  }

}

// 🔥 RAW A2 COW MILK
else if (item.name === "RAW A2 COW MILK") {

  if (item.plan === "Monthly") {
    item.price =
      selectedSize === "500ml" ? 40 : 80;
  }

  else if (item.plan === "15 Days") {
    item.price =
      selectedSize === "500ml" ? 40.5 : 81;
  }

  else if (item.plan === "Weekly") {
    item.price =
      selectedSize === "500ml" ? 41.5 : 83;
  }

  else {
    item.price =
      selectedSize === "500ml" ? 42.5 : 85;
  }

}

// 🔥 BUFFALO CHAACH
else if (item.name === "BUFFALO BILONA CHAACH") {

  if (item.plan === "Monthly") {
    item.price =
      selectedSize === "500ml" ? 18 : 36;
  }

  else if (item.plan === "15 Days") {
    item.price =
      selectedSize === "500ml" ? 18.5 : 37;
  }

  else if (item.plan === "Weekly") {
    item.price =
      selectedSize === "500ml" ? 19 : 38;
  }

  else {
    item.price =
      selectedSize === "500ml" ? 20 : 40;
  }

}

// 🔥 COW CHAACH
else if (item.name === "COW BILONA CHAACH") {

  if (item.plan === "Monthly") {
    item.price =
      selectedSize === "500ml" ? 15 : 30;
  }

  else if (item.plan === "15 Days") {
    item.price =
      selectedSize === "500ml" ? 15.5 : 31;
  }

  else if (item.plan === "Weekly") {
    item.price =
      selectedSize === "500ml" ? 16.5 : 33;
  }

  else {
    item.price =
      selectedSize === "500ml" ? 17.5 : 35;
  }

}

     // GHEE'S
    else if (item.name === "BUFFALO GHEE") {

      if (selectedSize === "500g") {
        item.price = 650;
      }

      else {
        item.price = 1300;
      }

    }
    else if (item.name === "COW GHEE") {

      if (selectedSize === "500g") {
        item.price = 550;
      }

      else {
        item.price = 1100;
      }

    }

    else if (item.name === "RAW A2 COW GHEE") {

      if (selectedSize === "500g") {
        item.price = 1400;
      }

      else {
        item.price = 2800;
      }

    }

    // PANEER
    else if (item.name === "PANEER") {

      if (selectedSize === "100g") {
        item.price = 45;
      }

      else if (selectedSize === "500g") {
        item.price = 225;
      }

      else {
        item.price = 450;
      }

    }

    // DAHI
    else if (item.name === "DAHI") {

      if (selectedSize === "250g") {
        item.price = 36;
      }

      else if (selectedSize === "500g") {
        item.price = 72;
      }

      else {
        item.price = 144;
      }

    }

    localStorage.setItem(
      'cart',
      JSON.stringify(cart)
    );

    updateCartBadge();

    loadOrders();

  });

});
// 🔥 QTY CHANGE
document.querySelectorAll('.qty-dropdown').forEach(select => {

  select.addEventListener('change', (e) => {

    const card =
      e.target.closest('.order-card');

    const index =
      card.dataset.index;

    let cart =
      JSON.parse(localStorage.getItem('cart')) || [];

    const item = cart[index];

    // 🔥 UPDATE QUANTITY
    item.packets =
      Number(e.target.value);

    localStorage.setItem(
      'cart',
      JSON.stringify(cart)
    );

    updateCartBadge();

    loadOrders();

  });

});

  
}
function updatePrice() {

  let pricePerLitre = 0;

  const selectedPlan = document.querySelector('.plan-pill.active');

  // 🔥 A2 LOGIC
  if (currentProduct === "A2") {

    pricePerLitre = 85;

    if (selectedPlan) {
      const plan = selectedPlan.textContent.trim();

      if (plan === "Weekly") pricePerLitre = 83;
      else if (plan === "15 Days") pricePerLitre = 81;
      else if (plan === "Monthly") pricePerLitre = 80;
    }
  }

  // 🔥 RAW COW MILK LOGIC
  else if (currentProduct === "COW") {

    pricePerLitre = 51;

    if (selectedPlan) {
      const plan = selectedPlan.textContent.trim();

      if (plan === "Weekly") pricePerLitre = 50;
      else if (plan === "15 Days") pricePerLitre = 49;
      else if (plan === "Monthly") pricePerLitre = 48;
    }
  }

  // 🔥 BUFFALO MILK LOGIC
else if (currentProduct === "BUFFALO") {

  pricePerLitre = 75; // default

  if (selectedPlan) {
    const plan = selectedPlan.textContent.trim();

    if (plan === "Weekly") pricePerLitre = 74;
    else if (plan === "15 Days") pricePerLitre = 73;
    else if (plan === "Monthly") pricePerLitre = 72;
  }
}

// 🔥 BUFFALO CHAACH LOGIC
else if (currentProduct === "CHAACH") {

  pricePerLitre = 40; // default

  if (selectedPlan) {
    const plan = selectedPlan.textContent.trim();

    if (plan === "Weekly") pricePerLitre = 38;
    else if (plan === "15 Days") pricePerLitre = 37;
    else if (plan === "Monthly") pricePerLitre = 36;
  }
}

// 🔥 COW CHAACH LOGIC
else if (currentProduct === "COW_CHAACH") {

  pricePerLitre = 35; // default

  if (selectedPlan) {
    const plan = selectedPlan.textContent.trim();

    if (plan === "Weekly") pricePerLitre = 33;
    else if (plan === "15 Days") pricePerLitre = 31;
    else if (plan === "Monthly") pricePerLitre = 30;
  }
}
// 🔥 GHEE
else if (currentProduct === "GHEE") {
  pricePerLitre = basePrice;
}

// 🔥 PANEER
else if (currentProduct === "PANEER") {

  const quantity =
    document.getElementById('quantity-select').value;

  if (quantity == "0.1") {
    pricePerLitre = 450;
  } else {
    pricePerLitre = basePrice;
  }
}

// 🔥 DAHI LOGIC
else if (currentProduct === "DAHI") {

  const quantity =
    document.getElementById('quantity-select').value;

  // 🔥 250g pricing
  if (quantity == "0.25") {

  // 🔥 250g equivalent pricing
  pricePerLitre = 144;

  if (selectedPlan) {

    const plan =
      selectedPlan.textContent.trim();

    if (plan === "Weekly")
      pricePerLitre = 140;

    else if (plan === "15 Days")
      pricePerLitre = 136;

    else if (plan === "Monthly")
      pricePerLitre = 130;
  }
}

  // 🔥 Existing pricing for bigger quantities
  else {

  // 🔥 1Kg equivalent pricing
  pricePerLitre = 144;

  if (selectedPlan) {

    const plan =
      selectedPlan.textContent.trim();

    if (plan === "Weekly")
      pricePerLitre = 140;

    else if (plan === "15 Days")
      pricePerLitre = 136;

    else if (plan === "Monthly")
      pricePerLitre = 130;
  }
}
}

  const quantity = document.getElementById('quantity-select').value;
  const qty = quantity ? Number(quantity) : 1;

  const finalPrice = pricePerLitre * qty;

  let unit = "L";

if (currentProduct === "GHEE" || currentProduct === "PANEER") {
  unit = "Kg";
}
else if (currentProduct === "DAHI") {
  unit = "500g";
}

let displayUnit = unit;

// 🔥 quantity based display
if (quantity == "0.1") {
  displayUnit = "100g";
}

else if (quantity == "0.25") {
  displayUnit = "250g";
}

else if (quantity == "0.5") {

  if (unit === "L") {
    displayUnit = "500ml";
  }

  else if (unit === "Kg") {
    displayUnit = "500g";
  }
}

document.getElementById('detail-price').textContent =
  `Price: ₹${finalPrice}/${displayUnit}`;
}

updateNavbar();
updateProfile();

function updateProfile() {
  const name = localStorage.getItem("userName");
  const mobile = localStorage.getItem("userMobile");

  const nameEl = document.getElementById("profile-name");
  const mobileEl = document.getElementById("profile-mobile");

  if (nameEl) nameEl.textContent = name || "Name";
  if (mobileEl) mobileEl.textContent = mobile || "Mobile";
}
const hearts = document.querySelectorAll('.product-card .wishlist-heart');

hearts.forEach(heart => {
  heart.addEventListener('click', (e) => {
    e.stopPropagation(); // 🔥 product detail me na jaye


    const card = e.target.closest('.product-card');
    const name = card.querySelector('h3').textContent;
    const price = card.querySelector('strong').textContent;
    const image = card.querySelector('img').src;

    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

    const existing = wishlist.find(item => item.name === name);

    if (existing) {
      // ❌ remove
      wishlist = wishlist.filter(item => item.name !== name);
      heart.classList.add('animate');
      setTimeout(() => heart.classList.remove('animate'), 400);
      heart.classList.remove('active');

      // 🔥 ADD THIS
      heart.classList.add('animate');
      setTimeout(() => heart.classList.remove('animate'), 400);

      showToast("Removed from Wishlist ❌"); // 🔥 ADD
    } else {
      // ✅ add
      let category = "";

if (name.includes("MILK")) category = "milk";
else if (name.includes("CHAACH")) category = "chaach";
else if (name.includes("GHEE")) category = "ghee";
else if (name === "DAHI") category = "dahi";
else if (name === "PANEER") category = "paneer";

wishlist.push({
  name,
  price,
  image,
  category
});
      heart.classList.add('active');

      // 🔥 ADD THIS
      heart.classList.add('animate');
      setTimeout(() => heart.classList.remove('animate'), 400);

      showToast("Added to Wishlist ✅"); // 🔥 ADD
    }

    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    updateWishlistBadge(); // 🔥 ADD
    syncWishlistUI();
    updateCartBadge();
  });
});
function loadWishlistState() {
  const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

  document.querySelectorAll('.product-card').forEach(card => {
    const name = card.querySelector('h3').textContent;
    const heart = card.querySelector('.wishlist-heart');

    const exists = wishlist.find(item => item.name === name);

    if (exists) {
      heart.classList.add('active');
    }
  });
}

loadWishlistState();
updateWishlistBadge();
syncWishlistUI();
document.querySelectorAll('.featured-card').forEach(card => {
  const name = card.dataset.name;
  const heart = card.querySelector('.wishlist-heart');

  const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

  const exists = wishlist.find(item => item.name === name);

  if (exists && heart) {
    heart.classList.add('active');
  }
});
function loadWishlist() {

  const container = document.getElementById('wishlist-container');
  container.innerHTML = "";

  const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

  if (wishlist.length === 0) {
    container.innerHTML = "<p style='padding:20px;'>No items in wishlist</p>";
    return;
  }

  wishlist.forEach(item => {

    const card = `
  <article class="product-card" data-category="${item.category}">
    
    <div class="product-visual">
      <img src="${item.image}">
      <span class="wishlist-heart active">❤</span>
    </div>

    <div class="product-body">
      <h3>${item.name}</h3>

      <strong>${item.price}</strong>

      <button class="wishlist-cart-btn" data-product="${item.name}">
        ADD TO CART
      </button>
    </div>

  </article>
`;

    container.innerHTML += card;
  });
  document.querySelectorAll('#wishlist-container .wishlist-heart').forEach(heart => {
  heart.addEventListener('click', (e) => {

    const card = e.target.closest('.product-card');
    const name = card.querySelector('h3').textContent;

    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

    wishlist = wishlist.filter(item => item.name !== name);

    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    updateWishlistBadge(); // 🔥 ADD
    syncWishlistUI();

    showToast("Removed from Wishlist ❌"); // 🔥 ADD THIS


    loadWishlist(); // 🔥 reload
  });
});
  document.querySelectorAll('.wishlist-cart-btn').forEach(btn => {

  btn.addEventListener('click', (e) => {

    const productName = e.target.dataset.product;

    // 🔥 RAW COW MILK
    if (productName === "RAW COW MILK") {

      currentProduct = "COW";
      basePrice = 48;

      document.getElementById('detail-name').textContent = "RAW COW MILK";
      document.getElementById('detail-price').textContent = "Price: ₹51/L";
      document.getElementById('detail-image').src = "./images/Milk.png";
    }

    // 🔥 BUFFALO CHAACH
    else if (productName === "BUFFALO BILONA CHAACH") {

      currentProduct = "CHAACH";
      basePrice = 36;

      document.getElementById('detail-name').textContent = "BUFFALO BILONA CHAACH";
      document.getElementById('detail-price').textContent = "Price: ₹40/L";
      document.getElementById('detail-image').src = "./images/Chaach.png";
    }

    // 🔥 DAHI
    else if (productName === "DAHI") {

      currentProduct = "DAHI";
      basePrice = 72;

      document.getElementById('detail-name').textContent = "DAHI";
      document.getElementById('detail-price').textContent = "Price: ₹72/500g";
      document.getElementById('detail-image').src = "./images/Dahi.png";
    }

    // 🔥 A2 GHEE
    else if (productName === "RAW A2 COW GHEE") {

      currentProduct = "GHEE";
      basePrice = 1100;

      document.getElementById('detail-name').textContent = "RAW A2 COW GHEE";
      document.getElementById('detail-price').textContent = "Price: ₹1100/Kg";
      document.getElementById('detail-image').src = "./images/Ghee.png";
    }
    // 🔥 SAVE WISHLIST SCREEN
    lastWishlistScreen = "wishlist";

    // 🔥 OPEN DETAIL SCREEN
    setActiveScreen('productDetail');
    syncDetailWishlistButton();

  });

});
};

const wishlistFilters = document.querySelectorAll('.wishlist-filter');

wishlistFilters.forEach(btn => {

  btn.addEventListener('click', () => {

    wishlistFilters.forEach(b =>
      b.classList.remove('active')
    );

    btn.classList.add('active');

    btn.scrollIntoView({
  behavior: "smooth",
  inline: "center"
});

    const selected = btn.dataset.wishlist.toLowerCase();

    document
      .querySelectorAll('#wishlist-container .product-card')
      .forEach(card => {

        const category = card.dataset.category?.toLowerCase();

        if (selected === "all" || category === selected) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }

      });

  });

});
const featuredHearts = document.querySelectorAll('.featured-card .wishlist-heart');

featuredHearts.forEach(heart => {
  heart.addEventListener('click', (e) => {

    e.stopPropagation(); // 🔥 IMPORTANT (product open na ho)

    const card = e.target.closest('.featured-card');
    const name = card.dataset.name;
    const image = card.querySelector('img').src;

    let price = "";

    // 🔥 price mapping
    if (name.includes("MILK")) price = "₹50/L";
    else if (name.includes("CHAACH")) price = "₹40/L";
    else if (name.includes("GHEE")) price = "₹1100/Kg";
    else if (name === "DAHI") price = "₹72/500g";
    else if (name === "PANEER") price = "₹450/Kg";

    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

    const exists = wishlist.find(item => item.name === name);

    if (exists) {
      wishlist = wishlist.filter(item => item.name !== name);
      heart.classList.remove('active');

      heart.classList.add('animate');
      setTimeout(() => heart.classList.remove('animate'), 400);
      showToast("Removed from Wishlist ❌"); // 🔥 ADD
    } else {
      let category = "";

if (name.includes("MILK")) category = "milk";
else if (name.includes("CHAACH")) category = "chaach";
else if (name.includes("GHEE")) category = "ghee";
else if (name === "DAHI") category = "dahi";
else if (name === "PANEER") category = "paneer";

wishlist.push({
  name,
  price,
  image,
  category
});
      heart.classList.add('active');
      heart.classList.add('animate');
      setTimeout(() => heart.classList.remove('animate'), 400);
      showToast("Added to Wishlist ✅"); // 🔥 ADD
    }

    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    updateWishlistBadge();
    syncWishlistUI(); // 🔥 ADD THIS
  });
});
function showToast(message) {
  const toast = document.getElementById("toast");

  toast.textContent = message;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 1500);
}
function syncWishlistUI() {
  const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

  // 🔹 Product cards
  document.querySelectorAll('.product-card').forEach(card => {
    const name = card.querySelector('h3')?.textContent;
    const heart = card.querySelector('.wishlist-heart');

    if (!heart || !name) return;

    const exists = wishlist.find(item => item.name === name);

    heart.classList.toggle('active', !!exists);
  });

  // 🔹 Featured cards
  document.querySelectorAll('.featured-card').forEach(card => {
    const name = card.dataset.name;
    const heart = card.querySelector('.wishlist-heart');

    if (!heart || !name) return;

    const exists = wishlist.find(item => item.name === name);

    heart.classList.toggle('active', !!exists);
  });
}
function updateWishlistBadge() {
  const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

  const badge1 = document.getElementById('wishlist-count');
  const badge2 = document.getElementById('wishlist-count-nav');

  if (badge1) badge1.textContent = wishlist.length;
  if (badge2) badge2.textContent = wishlist.length;
}
function updateCartBadge() {

  const cart =
    JSON.parse(localStorage.getItem('cart')) || [];

  const badge =
    document.getElementById('cart-count');

  if (!badge) return;

  // 🔥 total packets count
  let totalItems = 0;

  cart.forEach(item => {
    totalItems += Number(item.packets);
  });

  badge.textContent = totalItems;
}

/* 🔥 ANIMATED SEARCH PLACEHOLDER */

const searchWords = [
  "Search Milk",
  "Search Ghee",
  "Search Paneer",
  "Search Chaach",
  "Search Dahi"
];

const placeholder = document.getElementById("animated-placeholder");

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {

  const currentWord = searchWords[wordIndex];

  if (!isDeleting) {
    placeholder.textContent =
      currentWord.substring(0, charIndex + 1);

    charIndex++;

    if (charIndex === currentWord.length) {
      isDeleting = true;

      setTimeout(typeEffect, 1200);
      return;
    }
  }

  else {

    placeholder.textContent =
      currentWord.substring(0, charIndex - 1);

    charIndex--;

    if (charIndex === 0) {
      isDeleting = false;

      wordIndex =
        (wordIndex + 1) % searchWords.length;
    }
  }

  setTimeout(typeEffect, isDeleting ? 60 : 120);
}

typeEffect();
function syncDetailWishlistButton() {
  const detailWishlistBtn =
    document.getElementById('detail-wishlist-btn');

  if (!detailWishlistBtn) return;

  const name =
    document.getElementById('detail-name').textContent;

  const wishlist =
    JSON.parse(localStorage.getItem('wishlist')) || [];

  const exists =
    wishlist.find(item => item.name === name);

  if (exists) {
    detailWishlistBtn.innerHTML = "Wishlist ❤️";
  } else {
    detailWishlistBtn.innerHTML = "Wishlist ♡";
  }
}
updateCartBadge();
function loadCheckout() {

  const container =
    document.getElementById('checkout-container');

  const item =
    JSON.parse(localStorage.getItem('buyNowItem'));

  if (!item) return;

  container.innerHTML = `

    <div class="checkout-product-card">

      <img src="${item.image}">

      <div>

        <h3>${item.name}</h3>

        <p>${item.price}</p>

        <p>Plan: ${item.plan}</p>

        <p>Qty: ${item.packets}</p>

        <p>Slot: ${item.slot}</p>

      </div>

    </div>

    <button class="checkout-btn">
      Proceed to Checkout
    </button>

  `;
}
// =========================
// NAME VALIDATION
// =========================

const addressName = document.getElementById("addressName");

addressName.addEventListener("input", (e) => {

  // only alphabets + spaces
  let value = e.target.value.replace(/[^a-zA-Z\s]/g, "");

  // auto capitalize every word
  value = value.replace(/\b\w/g, char => char.toUpperCase());

  e.target.value = value;
});


// =========================
// MOBILE VALIDATION
// =========================

const addressMobile = document.getElementById("addressMobile");

addressMobile.addEventListener("input", (e) => {

  // only numbers
  let value = e.target.value.replace(/\D/g, "");

  // max 10 digits
  value = value.slice(0, 10);

  e.target.value = value;
});


// =========================
// PINCODE VALIDATION
// =========================

const addressPincode = document.getElementById("addressPincode");

addressPincode.addEventListener("input", (e) => {

  // only numbers
  let value = e.target.value.replace(/\D/g, "");

  // max 7 digits
  value = value.slice(0, 7);

  e.target.value = value;
});
renderAddresses();
/* ADDRESS SYSTEM */

const addressToggle =
  document.getElementById('addressToggle');

const addressFormWrap =
  document.getElementById('addressFormWrap');

const saveAddressBtn =
  document.getElementById('saveAddressBtn');

const cancelAddressBtn =
  document.getElementById('cancelAddressBtn');


// TOGGLE

addressToggle.addEventListener('click', () => {

  addressFormWrap.classList.toggle('active');

});


// CANCEL

cancelAddressBtn.addEventListener('click', () => {

  addressFormWrap.classList.remove('active');

});


// SAVE ADDRESS

saveAddressBtn.addEventListener('click', () => {

  const name =
    document.getElementById('addressName').value;

  const mobile =
    document.getElementById('addressMobile').value;

  const pin =
    document.getElementById('addressPincode').value;

  const house =
    document.getElementById('addressHouse').value;

  const street =
    document.getElementById('addressStreet').value;

  const town =
    document.getElementById('addressTown').value;

  const city =
    document.getElementById('addressCity').value;

  const state =
    document.getElementById('addressState').value;

  let addresses =
    JSON.parse(localStorage.getItem('addresses')) || [];

  // EDIT MODE

  if(window.editingAddressId){

    addresses = addresses.map(item => {

      if(item.id === window.editingAddressId){

        return {
          ...item,
          name,
          mobile,
          pin,
          house,
          street,
          town,
          city,
          state
        };
      }

      return item;
    });

    window.editingAddressId = null;

  } else {

    // NEW ADDRESS

    addresses.push({
      id: Date.now(),
      name,
      mobile,
      pin,
      house,
      street,
      town,
      city,
      state
    });

  }

  localStorage.setItem(
    'addresses',
    JSON.stringify(addresses)
  );

  addressFormWrap.classList.remove('active');

  renderAddresses();

});
function renderAddresses() {

  const container =
    document.getElementById('savedAddresses');

  container.innerHTML = "";

  const addresses =
    JSON.parse(localStorage.getItem('addresses')) || [];

  addresses.forEach((address,index) => {

    container.innerHTML += `

      <div class="saved-address-card">

        <div class="address-top">

          <input
            type="radio"
            name="selectedAddress"
            class="address-radio"
            ${index === 0 ? "checked" : ""}
          >

          <div class="address-info">

            <h3>

              ${address.name}

              

            </h3>

            
            <p>
              ${address.house},
              ${address.street}
            </p>

            <p>
              ${address.city},
              ${address.state}
              - ${address.pin}
            </p>

            <p>
              Mobile:
              <strong>${address.mobile}</strong>
            </p>

            <div class="address-actions">

              <button onclick="removeAddress(${address.id})">
                REMOVE
              </button>

              <button onclick="editAddress(${address.id})">
  EDIT
</button>

            </div>

          </div>

        </div>

      </div>

    `;
  });

}
function removeAddress(id){

  let addresses =
    JSON.parse(localStorage.getItem('addresses')) || [];

  addresses =
    addresses.filter(item => item.id !== id);

  localStorage.setItem(
    'addresses',
    JSON.stringify(addresses)
  );

  renderAddresses();
}
window.removeAddress = removeAddress;

function editAddress(id){

  const addresses =
    JSON.parse(localStorage.getItem('addresses')) || [];

  const address =
    addresses.find(item => item.id === id);

  if(!address) return;

  // FORM OPEN
  addressFormWrap.classList.add('active');

  // PREFILL VALUES

  document.getElementById('addressName').value =
    address.name;

  document.getElementById('addressMobile').value =
    address.mobile;

  document.getElementById('addressPincode').value =
    address.pin;

  document.getElementById('addressHouse').value =
    address.house;

  document.getElementById('addressStreet').value =
    address.street;

  document.getElementById('addressTown').value =
    address.town;

  document.getElementById('addressCity').value =
    address.city;

  document.getElementById('addressState').value =
    address.state;

  // SAVE CURRENT EDITING ID

  window.editingAddressId = id;
}
window.editAddress = editAddress;

const cartAddAddressBtn =
  document.getElementById('cartAddAddressBtn');

const cartAddressFormWrap =
  document.getElementById('cartAddressFormWrap');

const cartCancelAddressBtn =
  document.getElementById('cartCancelAddressBtn');

const cartSaveAddressBtn =
  document.getElementById('cartSaveAddressBtn');

function clearCartAddressForm() {
  [
    'cartAddressName',
    'cartAddressMobile',
    'cartAddressPincode',
    'cartAddressHouse',
    'cartAddressStreet',
    'cartAddressTown',
    'cartAddressCity',
    'cartAddressState'
  ].forEach(id => {
    const input = document.getElementById(id);
    if (input) input.value = "";
  });

  window.editingCartAddressId = null;
}

function fillCartAddressForm(id) {
  const addresses =
    JSON.parse(localStorage.getItem('addresses')) || [];

  const address =
    addresses.find(item => item.id === id);

  if (!address) return;

  cartAddressFormWrap.classList.add('active');

  document.getElementById('cartAddressName').value =
    address.name || "";
  document.getElementById('cartAddressMobile').value =
    address.mobile || "";
  document.getElementById('cartAddressPincode').value =
    address.pin || "";
  document.getElementById('cartAddressHouse').value =
    address.house || "";
  document.getElementById('cartAddressStreet').value =
    address.street || "";
  document.getElementById('cartAddressTown').value =
    address.town || "";
  document.getElementById('cartAddressCity').value =
    address.city || "";
  document.getElementById('cartAddressState').value =
    address.state || "";

  window.editingCartAddressId = id;
}

cartAddAddressBtn?.addEventListener('click', () => {
  clearCartAddressForm();
  cartAddressFormWrap.classList.add('active');
});

cartCancelAddressBtn?.addEventListener('click', () => {
  cartAddressFormWrap.classList.remove('active');
  clearCartAddressForm();
});

cartSaveAddressBtn?.addEventListener('click', () => {
  const name =
    document.getElementById('cartAddressName').value;
  const mobile =
    document.getElementById('cartAddressMobile').value;
  const pin =
    document.getElementById('cartAddressPincode').value;
  const house =
    document.getElementById('cartAddressHouse').value;
  const street =
    document.getElementById('cartAddressStreet').value;
  const town =
    document.getElementById('cartAddressTown').value;
  const city =
    document.getElementById('cartAddressCity').value;
  const state =
    document.getElementById('cartAddressState').value;

  if (!name || !mobile || !pin || !house || !street || !city || !state) {
    alert("Please fill all required address details");
    return;
  }

  let addresses =
    JSON.parse(localStorage.getItem('addresses')) || [];

  if (window.editingCartAddressId) {
    addresses = addresses.map(item => {
      if (item.id !== window.editingCartAddressId) return item;

      return {
        ...item,
        name,
        mobile,
        pin,
        house,
        street,
        town,
        city,
        state
      };
    });

    localStorage.setItem(
      'selectedDeliveryAddressId',
      window.editingCartAddressId
    );
  } else {
    const id = Date.now();

    addresses.push({
      id,
      name,
      mobile,
      pin,
      house,
      street,
      town,
      city,
      state
    });

    localStorage.setItem('selectedDeliveryAddressId', id);
  }

  localStorage.setItem(
    'addresses',
    JSON.stringify(addresses)
  );

  cartAddressFormWrap.classList.remove('active');
  clearCartAddressForm();
  renderAddresses();
  renderCartAddressPage();
});

const dynamicBackBtn =
  document.getElementById("dynamic-back-btn");

dynamicBackBtn?.addEventListener("click", () => {

   const activeScreen =
      document.querySelector('.screen.active')
      ?.dataset.screen;

   // 🔥 IF PRODUCT PAGE OPEN
   if (activeScreen === "productDetail") {

      setActiveScreen(lastWishlistScreen || previousScreen);

      return;
   }

   // 🔥 NORMAL BACK
   setActiveScreen(previousScreen);

});
