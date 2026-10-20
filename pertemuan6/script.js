// =====================================
// 1. NAVIGASI ANTARHALAMAN
// =====================================

const navLinks = document.querySelectorAll(".nav-link");
const pages = document.querySelectorAll(".page");
const openPageButtons = document.querySelectorAll(".open-page");

function showPage(pageId) {
    pages.forEach(function (page) {
        page.classList.toggle("active", page.id === pageId);
    });

    navLinks.forEach(function (link) {
        link.classList.toggle(
            "active",
            link.dataset.page === pageId
        );
    });
}

navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
        showPage(link.dataset.page);
    });
});

openPageButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        showPage(button.dataset.page);
    });
});


// =====================================
// 2. REGISTRASI MAHASISWA
// =====================================

const registrationForm = document.getElementById("registrationForm");
const registrationResult = document.getElementById("registrationResult");

registrationForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const nama = document.getElementById("nama").value.trim();
    const nim = document.getElementById("nim").value.trim();
    const mataKuliah = document.getElementById("mataKuliah").value;
    const dosen = document.getElementById("dosen").value;
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    if (password.length < 6) {
        registrationResult.textContent =
            "Kata sandi harus memiliki minimal 6 karakter.";
        return;
    }

    registrationResult.textContent =
        "Registrasi berhasil!\n\n" +
        "Nama: " + nama + "\n" +
        "NIM: " + nim + "\n" +
        "Mata Kuliah: " + mataKuliah + "\n" +
        "Dosen: " + dosen + "\n" +
        "Email: " + email;

    registrationForm.reset();
});


// =====================================
// 3. DATA CONTOH KODE POS
// =====================================

const postalData = {
    "Jawa Timur": {
        "Surabaya": {
            "Gubeng": "60281",
            "Tegalsari": "60261",
            "Wonokromo": "60243"
        },
        "Malang": {
            "Klojen": "65111",
            "Blimbing": "65126",
            "Lowokwaru": "65141"
        }
    },

    "Jawa Barat": {
        "Bandung": {
            "Coblong": "40132",
            "Sukajadi": "40162",
            "Lengkong": "40261"
        }
    },

    "DKI Jakarta": {
        "Jakarta Selatan": {
            "Tebet": "12810",
            "Kebayoran Baru": "12110"
        }
    }
};

const provinsiSelect = document.getElementById("provinsi");
const kotaSelect = document.getElementById("kota");
const kecamatanSelect = document.getElementById("kecamatan");
const postalForm = document.getElementById("postalForm");
const postalResult = document.getElementById("postalResult");

function fillDropdown(selectElement, values, placeholder) {
    selectElement.innerHTML = "";

    const defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.textContent = placeholder;
    selectElement.appendChild(defaultOption);

    values.forEach(function (value) {
        const option = document.createElement("option");
        option.value = value;
        option.textContent = value;
        selectElement.appendChild(option);
    });
}

// Tampilkan daftar provinsi saat halaman dimuat
fillDropdown(
    provinsiSelect,
    Object.keys(postalData),
    "Pilih provinsi"
);

// Saat provinsi dipilih, tampilkan kota
provinsiSelect.addEventListener("change", function () {
    const provinsi = provinsiSelect.value;

    fillDropdown(
        kotaSelect,
        provinsi ? Object.keys(postalData[provinsi]) : [],
        "Pilih kota/kabupaten"
    );

    kotaSelect.disabled = !provinsi;
    kecamatanSelect.disabled = true;

    fillDropdown(
        kecamatanSelect,
        [],
        "Pilih kecamatan"
    );

    postalResult.textContent = "";
});

// Saat kota dipilih, tampilkan kecamatan
kotaSelect.addEventListener("change", function () {
    const provinsi = provinsiSelect.value;
    const kota = kotaSelect.value;

    const kecamatan = provinsi && kota
        ? Object.keys(postalData[provinsi][kota])
        : [];

    fillDropdown(
        kecamatanSelect,
        kecamatan,
        "Pilih kecamatan"
    );

    kecamatanSelect.disabled = !kota;
    postalResult.textContent = "";
});

// Tampilkan kode pos
postalForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const provinsi = provinsiSelect.value;
    const kota = kotaSelect.value;
    const kecamatan = kecamatanSelect.value;

    const kodePos = postalData[provinsi][kota][kecamatan];

    postalResult.textContent =
        "Informasi Wilayah\n\n" +
        "Provinsi: " + provinsi + "\n" +
        "Kota/Kabupaten: " + kota + "\n" +
        "Kecamatan: " + kecamatan + "\n" +
        "Kode Pos: " + kodePos;
});


// =====================================
// 4. DROPDOWN FAKULTAS DAN PROGRAM STUDI
// =====================================

const studyData = {
    teknologi: [
        "Informatika",
        "Sistem Informasi",
        "Teknik Elektro"
    ],

    ekonomi: [
        "Manajemen",
        "Akuntansi",
        "Ekonomi Pembangunan"
    ],

    hukum: [
        "Ilmu Hukum"
    ]
};

const fakultasSelect = document.getElementById("fakultas");
const prodiSelect = document.getElementById("prodi");
const programForm = document.getElementById("programForm");
const programResult = document.getElementById("programResult");

fakultasSelect.addEventListener("change", function () {
    const fakultas = fakultasSelect.value;
    const daftarProdi = fakultas ? studyData[fakultas] : [];

    fillDropdown(
        prodiSelect,
        daftarProdi,
        "Pilih program studi"
    );

    prodiSelect.disabled = !fakultas;
    programResult.textContent = "";
});

programForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const fakultas = fakultasSelect.options[
        fakultasSelect.selectedIndex
    ].text;

    const prodi = prodiSelect.value;

    programResult.textContent =
        "Pilihan Program Studi\n\n" +
        "Fakultas: " + fakultas + "\n" +
        "Program Studi: " + prodi;
});