const API_URL = "http://localhost:5000"; // Adjust if port changes

function showPage(pageId) {
  document.querySelectorAll(".page").forEach(p => p.style.display = "none");
  document.getElementById(pageId).style.display = "block";
}

// Signup
document.getElementById("signup-form").addEventListener("submit", async e => {
  e.preventDefault();
  const email = document.getElementById("signup-email").value;
  const password = document.getElementById("signup-password").value;

  const res = await fetch(`${API_URL}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();
  alert(data.message);
  if (res.ok) showPage("login");
});

// Login
document.getElementById("login-form").addEventListener("submit", async e => {
  e.preventDefault();
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();
  if (res.ok) {
    alert("Login successful!");
    document.getElementById("main-header").style.display = "block";
    showPage("home");
  } else {
    alert(data.message || "Login failed");
  }
});

// Upload Course
document.getElementById("upload-form").addEventListener("submit", async e => {
  e.preventDefault();
  const title = document.getElementById("course-title").value;
  const pdf = document.getElementById("course-pdf").files[0];
  const formData = new FormData();
  formData.append("title", title);
  formData.append("pdf", pdf);

  const res = await fetch(`${API_URL}/courses`, {
    method: "POST",
    body: formData
  });

  const data = await res.json();
  alert(data.message || "Uploaded!");
  showPage("courses");
  loadCourses();
});

// Load Courses
async function loadCourses() {
  showPage("courses");
  const res = await fetch(`${API_URL}/courses`);
  const data = await res.json();

  const list = document.getElementById("course-list");
  list.innerHTML = "";

  data.forEach(course => {
    const div = document.createElement("div");
    div.innerHTML = `
      <h3>${course.title}</h3>
      <a href="${API_URL}/${course.pdf}" target="_blank" download>Download</a>
      <hr />
    `;
    list.appendChild(div);
  });
}
