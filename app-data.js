// Inisialisasi Data Awal di localStorage jika belum ada
const defaultPeserta = [
  { id: 1, nama: "Farrell Alvaro", divisi: "Panitia", pagi: true, siang: true, malam: false },
  { id: 2, nama: "Clarissa Daltalene", divisi: "Panitia", pagi: true, siang: true, malam: false },
  { id: 3, nama: "Naflah Keumala", divisi: "Panitia", pagi: true, siang: false, malam: false },
  { id: 4, nama: "Pak Levi", divisi: "VIP", pagi: false, siang: false, malam: false },
  { id: 5, nama: "Adzkia Zafira", divisi: "Peserta", pagi: false, siang: false, malam: false },
  { id: 6, nama: "Shaskia Fitri", divisi: "Peserta", pagi: false, siang: false, malam: false }
];

const defaultMenu = {
  pagi: { jam: "07:00 - 08:00 WIB", nama: "Makan Pagi", isi: "Nasi Uduk Komplit, Ayam Goreng, Telur Balado, Kerupuk, & Teh Hangat." },
  snackPagi: { jam: "10:00 WIB", nama: "Snack Pagi", isi: "Kue Lemper Ayam, Pastel Pastry, & Kopi/Teh." },
  siang: { jam: "12:00 - 13:00 WIB", nama: "Makan Siang", isi: "Nasi Putih, Rendang Daging, Sayur Sop, Tahu/Tempe, & Buah Semangka." },
  snackSore: { jam: "15:30 WIB", nama: "Snack Sore", isi: "Roti Bakar Cokelat Keju & Jus Jeruk Segar." },
  malam: { jam: "18:30 - 19:30 WIB", nama: "Makan Malam", isi: "Nasi Putih, Ikan Bakar Jimbaran, Capcay Seafood, Sambal, & Melon." }
};

function getPesertaData() {
  const data = localStorage.getItem('peserta_konsumsi');
  return data ? JSON.parse(data) : defaultPeserta;
}

function savePesertaData(data) {
  localStorage.setItem('peserta_konsumsi', JSON.stringify(data));
}

function getMenuData() {
  const data = localStorage.getItem('menu_konsumsi');
  return data ? JSON.parse(data) : defaultMenu;
}

function saveMenuData(data) {
  localStorage.setItem('menu_konsumsi', JSON.stringify(data));
}

// Fungsi Mengubah Status Pengambilan (Klik Badge)
function toggleStatus(pesertaId, sesi) {
  let pesertaList = getPesertaData();
  const index = pesertaList.findIndex(p => p.id === pesertaId);
  if (index !== -1) {
    pesertaList[index][sesi] = !pesertaList[index][sesi];
    savePesertaData(pesertaList);
    location.reload(); // Refresh untuk memperbarui tampilan & stat
  }
}

// Fungsi Hapus Peserta
function hapusPeserta(pesertaId) {
  if (confirm("Apakah Anda yakin ingin menghapus peserta ini?")) {
    let pesertaList = getPesertaData();
    pesertaList = pesertaList.filter(p => p.id !== pesertaId);
    savePesertaData(pesertaList);
    location.reload();
  }
}