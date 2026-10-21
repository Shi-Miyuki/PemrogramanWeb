const form = document.getElementById("formAnggota");
const daftar = document.getElementById("daftar");
const cari = document.getElementById("cari");

let anggota = JSON.parse(localStorage.getItem("anggota")) || [];

function simpan() {
    localStorage.setItem("anggota", JSON.stringify(anggota));
}

function tampilkan(kata = "") {
    daftar.innerHTML = "";

    const hasil = anggota.filter(a =>
        a.nama.toLowerCase().includes(kata.toLowerCase()) ||
        a.nim.toLowerCase().includes(kata.toLowerCase())
    );

    hasil.forEach(a => {
        const baris = document.createElement("tr");

        [a.nama, a.nim, a.prodi].forEach(teks => {
            const kolom = document.createElement("td");
            kolom.textContent = teks;
            baris.appendChild(kolom);
        });

        const aksi = document.createElement("td");
        const tombol = document.createElement("button");

        tombol.textContent = "Hapus";
        tombol.className = "btn btn-danger btn-sm";

        tombol.onclick = () => {
            if (confirm("Hapus anggota ini?")) {
                anggota = anggota.filter(x => x.id !== a.id);
                simpan();
                tampilkan(cari.value);
            }
        };

        aksi.appendChild(tombol);
        baris.appendChild(aksi);
        daftar.appendChild(baris);
    });

    if (hasil.length === 0) {
        daftar.innerHTML =
            '<tr><td colspan="4" class="text-center">Belum ada data</td></tr>';
    }
}

form.addEventListener("submit", function(e) {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(form));
    data.nama = data.nama.trim();
    data.nim = data.nim.trim();

    const duplikat = anggota.some(a =>
        a.nim.toLowerCase() === data.nim.toLowerCase()
    );

    if (duplikat) {
        alert("NIM/NIP sudah terdaftar!");
        return;
    }

    data.id = Date.now();

    anggota.push(data);
    simpan();
    tampilkan(cari.value);

    form.reset();
    alert("Pendaftaran berhasil!");

    document.getElementById("anggota").scrollIntoView({
        behavior: "smooth"
    });
});

cari.addEventListener("input", function() {
    tampilkan(cari.value);
});

tampilkan();
