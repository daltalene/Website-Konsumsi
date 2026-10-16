const defaultData = [
  { id: 1, target: "Ketua", kategori: "Panitia Siang", koor: "Ketua Panitia", porsi: 1, taken: false },
  { id: 2, target: "Sekretaris", kategori: "Panitia Siang", koor: "Koor Sekre", porsi: 2, taken: false },
  { id: 3, target: "Steering Committee (SC)", kategori: "Panitia Siang", koor: "Koor SC", porsi: 2, taken: false },
  { id: 4, target: "Bendahara", kategori: "Panitia Siang", koor: "Koor Bendahara", porsi: 2, taken: false },
  { id: 5, target: "Divisi Humas", kategori: "Panitia Siang", koor: "Koor Humas", porsi: 10, taken: false },
  { id: 6, target: "Divisi Kreatif", kategori: "Panitia Siang", koor: "Koor Kreatif", porsi: 6, taken: false },
  { id: 7, target: "Divisi Fun Game", kategori: "Panitia Siang", koor: "Koor Fun Game", porsi: 4, taken: false },
  { id: 8, target: "Divisi Expo", kategori: "Panitia Siang", koor: "Koor Expo", porsi: 5, taken: false },
  { id: 9, target: "Divisi Logistik", kategori: "Panitia Siang", koor: "Koor Logis", porsi: 7, taken: false },
  { id: 10, target: "Divisi Lomba", kategori: "Panitia Siang", koor: "Koor Lomba", porsi: 7, taken: false },
  { id: 11, target: "Divisi Konsumsi", kategori: "Panitia Siang", koor: "Koor Konsum", porsi: 9, taken: false },
  { id: 12, target: "Divisi Acara", kategori: "Panitia Siang", koor: "Koor Acara", porsi: 5, taken: false },
  { id: 13, target: "Narasumber Workshop", kategori: "VVIP/Sponsor", koor: "Divisi Konsumsi", porsi: 3, taken: true },
  { id: 14, target: "Sponsor Platinum", kategori: "VVIP/Sponsor", koor: "Divisi Konsumsi", porsi: 5, taken: false },
  { id: 15, target: "Peserta Ruang A", kategori: "Peserta Snack", koor: "Divisi Konsumsi", porsi: 50, taken: false }
];

function getConsumptionData() {
  const saved = localStorage.getItem('itfest_konsumsi');
  return saved ? JSON.parse(saved) : defaultData;
}

function saveData(data) {
  localStorage.setItem('itfest_konsumsi', JSON.stringify(data));
  renderAll();
}

function renderAll() {
  const data = getConsumptionData();
  
  const tabel = document.getElementById('tabel-konsumsi');
  if (tabel) {
    tabel.innerHTML = '';
    data.forEach((item, index) => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td><b>${item.target}</b></td>
        <td>${item.kategori}</td>
        <td>${item.koor}</td>
        <td><b>${item.porsi}</b> Porsi</td>
        <td>
          <span class="badge ${item.taken ? 'badge-done' : 'badge-pending'}">
            ${item.taken ? 'Sudah Diambil' : 'Belum Diambil'}
          </span>
        </td>
        <td>
          <button class="btn-check ${item.taken ? 'done' : ''}" onclick="toggleStatus(${index})">
            ${item.taken ? 'Batal' : 'Checklist'}
          </button>
        </td>
      `;
      tabel.appendChild(tr);
    });
  }

  const statPanitia = document.getElementById('stat-panitia');
  const statPeserta = document.getElementById('stat-peserta');
  const statVvip = document.getElementById('stat-vvip');

  if (statPanitia && statPeserta && statVvip) {
    const panitia = data.filter(d => d.kategori.includes('Panitia'));
    const peserta = data.filter(d => d.kategori.includes('Peserta'));
    const vvip = data.filter(d => d.kategori.includes('VVIP'));

    statPanitia.innerText = `${panitia.filter(d => d.taken).length} / ${panitia.length}`;
    statPeserta.innerText = `${peserta.filter(d => d.taken).length} / ${peserta.length}`;
    statVvip.innerText = `${vvip.filter(d => d.taken).length} / ${vvip.length}`;
  }
}

// Ubah status pengambilan (Checklist / Batal)
function toggleStatus(index) {
  const data = getConsumptionData();
  data[index].taken = !data[index].taken;
  saveData(data);
}

// Tambah data baru dari form
function tambahData() {
  const target = document.getElementById('input-nama').value;
  const kategori = document.getElementById('input-kategori').value;
  const koor = document.getElementById('input-koor').value;
  const porsi = document.getElementById('input-porsi').value;

  if (!target || !koor || !porsi) {
    alert('Harap isi semua kolom data!');
    return;
  }

  const data = getConsumptionData();
  data.push({
    id: Date.now(),
    target: target,
    kategori: kategori,
    koor: koor,
    porsi: parseInt(porsi),
    taken: false
  });

  saveData(data);

  // Clear Form Input
  document.getElementById('input-nama').value = '';
  document.getElementById('input-koor').value = '';
  document.getElementById('input-porsi').value = '';
}

// Jalankan saat halaman di-load
document.addEventListener('DOMContentLoaded', renderAll);