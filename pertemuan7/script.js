
// Navigasi halaman
const pageButtons = document.querySelectorAll("[data-page]");
const pages = document.querySelectorAll(".page");

function showPage(pageId) {
    pages.forEach(function (page) {
        page.classList.add("d-none");
    });

    const selectedPage = document.getElementById(pageId);

    if (selectedPage) {
        selectedPage.classList.remove("d-none");
    }

    document.querySelectorAll(".nav-link-btn").forEach(function (button) {
        button.classList.toggle("active", button.dataset.page === pageId);
    });

    window.scrollTo(0, 0);
}

// Semua tombol dan link navigasi
pageButtons.forEach(function (button) {
    button.addEventListener("click", function (event) {
        event.preventDefault();
        showPage(button.dataset.page);
    });
});

// Validasi form login
const loginForm = document.getElementById("loginForm");
const loginMessage = document.getElementById("loginMessage");

loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value;

    if (password.length < 6) {
        loginMessage.className = "alert alert-danger mt-3";
        loginMessage.textContent = "Password minimal 6 karakter.";
        return;
    }

    loginMessage.className = "alert alert-info mt-3";
    loginMessage.textContent =
        "Form berhasil divalidasi untuk " + email +
        ". Login sungguhan memerlukan backend.";
});

// Validasi form registrasi
const registerForm = document.getElementById("registerForm");
const registerMessage = document.getElementById("registerMessage");

registerForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const nama = document.getElementById("registerName").value.trim();
    const email = document.getElementById("registerEmail").value.trim();
    const password = document.getElementById("registerPassword").value;
    const konfirmasi = document.getElementById("confirmPassword").value;

    if (password.length < 6) {
        registerMessage.className = "alert alert-danger mt-3";
        registerMessage.textContent = "Password minimal 6 karakter.";
        return;
    }

    if (password !== konfirmasi) {
        registerMessage.className = "alert alert-danger mt-3";
        registerMessage.textContent =
            "Password dan konfirmasi password tidak sama.";
        return;
    }

    registerMessage.className = "alert alert-success mt-3";
    registerMessage.textContent =
        "Validasi registrasi berhasil. Selamat datang, " + nama +
        "! Data akun belum disimpan ke database.";

    registerForm.reset();
});
