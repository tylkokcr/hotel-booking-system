// --- Register ---
window.register = async function() {
  const username = document.getElementById('regUsername').value;
  const password = document.getElementById('regPassword').value;
  if (!username || !password) {
    alert("Please fill all fields.");
    return;
  }
  const res = await fetch("http://localhost:3000/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  });
  const data = await res.json();
  alert(data.message);
};

// --- Login ---
window.login = async function() {
  const username = document.getElementById('loginUsername').value;
  const password = document.getElementById('loginPassword').value;
  if (!username || !password) {
    alert("Please fill all fields.");
    return;
  }
  const res = await fetch("http://localhost:3000/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  });
  const data = await res.json();
  alert(data.message);
  if (res.ok) {
    localStorage.setItem("user", username);
    showUserUI(username);
  }
};

// --- Logout ---
window.logout = function() {
  localStorage.removeItem("user");
  location.reload();
};

// --- Oturum durumuna göre UI ---
function showUserUI(username) {
  document.getElementById('welcomeMsg').textContent = `Welcome, ${username}!`;
  document.getElementById('logoutBtn').style.display = "block";
  // Formları toplu şekilde gizle
  document.getElementById('registerForm').style.display = "none";
  document.getElementById('loginForm').style.display = "none";
  // E-mail alanını doldur ve kitlet
  const reviewEmail = document.getElementById("reviewEmail");
  if (reviewEmail) {
    reviewEmail.value = username;
    reviewEmail.disabled = true;
  }
}

// --- Sayfa açılışında oturum kontrolü ---
document.addEventListener("DOMContentLoaded", () => {
  const user = localStorage.getItem("user");
  if (user) {
    showUserUI(user);
  } else {
    document.getElementById('logoutBtn').style.display = "none";
    document.getElementById('registerForm').style.display = "block";
    document.getElementById('loginForm').style.display = "block";
    // Review e-mail alanını aç
    const reviewEmail = document.getElementById("reviewEmail");
    if (reviewEmail) {
      reviewEmail.value = "";
      reviewEmail.disabled = false;
    }
  }
});

// --- Review eklerken login kontrolü ---
window.addReview = function () {
  const user = localStorage.getItem("user");
  if (!user) {
    alert("Please login to submit a review.");
    return;
  }
  const roomNumber = parseInt(document.getElementById("reviewRoom").value);
  const body = document.getElementById("reviewBody").value.trim();

  if (isNaN(roomNumber) || !body) {
    alert("Please fill out all fields correctly.");
    return;
  }

  // Email alanı username ile eşleşiyor
  const email = user;

  const review = { email, roomNumber, body };

  fetch("http://localhost:3000/reviews", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(review)
  })
    .then(res => {
      if (!res.ok) throw new Error("Failed to add review.");
      return res.json();
    })
    .then(() => {
      alert("Review submitted!");
      document.getElementById("reviewRoom").value = "";
      document.getElementById("reviewBody").value = "";
      // E-mail alanı zaten username'de kalıyor
    })
    .catch(err => alert("Error: " + err.message));
};
