// Bütün şagird məlumatları və balları buradadır:
let globalData = {
  cpp: [
    {
      id: 1,
      ad: "Əli Məmmədov",
      foto: "https://i.pravatar.cc/150?img=11",
      fm: 85,
      stepping: 90,
      e_olimp: 75,
      codesources: 88,
      hackerrank: 92,
      kecmis_reyting: 410
    },
    {
      id: 2,
      ad: "Aysel Əliyeva",
      foto: "https://i.pravatar.cc/150?img=5",
      fm: 95,
      stepping: 88,
      e_olimp: 90,
      codesources: 94,
      hackerrank: 96,
      kecmis_reyting: 450
    },
    {
      id: 3,
      ad: "Murad Həsənov",
      foto: "https://i.pravatar.cc/150?img=12",
      fm: 60,
      stepping: 70,
      e_olimp: 65,
      codesources: 72,
      hackerrank: 80,
      kecmis_reyting: 360
    }
  ],
  python: [
    {
      id: 1,
      ad: "Əli Məmmədov",
      foto: "https://i.pravatar.cc/150?img=11",
      fm: 90,
      stepping: 95,
      e_olimp: 85,
      codesources: 90,
      hackerrank: 94,
      kecmis_reyting: 430
    },
    {
      id: 2,
      ad: "Leyla Quliyeva",
      foto: "https://i.pravatar.cc/150?img=9",
      fm: 88,
      stepping: 92,
      e_olimp: 80,
      codesources: 85,
      hackerrank: 90,
      kecmis_reyting: 420
    }
  ],
  common: [
    {
      id: 1,
      ad: "Əli Məmmədov",
      foto: "https://i.pravatar.cc/150?img=11",
      cari_reyting: 884,
      kecmis_reyting: 840
    },
    {
      id: 2,
      ad: "Aysel Əliyeva",
      foto: "https://i.pravatar.cc/150?img=5",
      cari_reyting: 913,
      kecmis_reyting: 890
    }
  ]
};

let currentTab = 'cpp';

function switchTab(tabName) {
  currentTab = tabName;
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  if (event && event.target) {
    event.target.classList.add('active');
  }
  renderTable();
}

function calculateTotals(student) {
  if (currentTab === 'common') {
    const artim = student.cari_reyting - student.kecmis_reyting;
    return { ...student, artim };
  } else {
    const cari = (student.fm || 0) + (student.stepping || 0) + (student.e_olimp || 0) + (student.codesources || 0) + (student.hackerrank || 0);
    const artim = cari - (student.kecmis_reyting || 0);
    return { ...student, cari_reyting: cari, artim };
  }
}

function renderTable() {
  const tableHead = document.querySelector('#ratingTable thead');
  const tableBody = document.querySelector('#tableBody');
  const rawList = globalData[currentTab] || [];

  const list = rawList.map(calculateTotals);

  // Sütun Başlıqları
  if (currentTab === 'common') {
    tableHead.innerHTML = `
      <tr>
        <th>#</th>
        <th>Şagird</th>
        <th>Cari Reytinq</th>
        <th>Keçmiş Reytinq</th>
        <th>Artım</th>
      </tr>
    `;
  } else {
    tableHead.innerHTML = `
      <tr>
        <th>#</th>
        <th>Şagird</th>
        <th>FM</th>
        <th>Stepping.org</th>
        <th>e-olimp.com</th>
        <th>codesources.com</th>
        <th>hackerrank.com</th>
        <th>Cari Reytinq</th>
        <th>Keçmiş Reytinq</th>
        <th>Artım</th>
      </tr>
    `;
  }

  // Sətirlər
  tableBody.innerHTML = '';
  list.forEach((item, index) => {
    const row = document.createElement('tr');
    const artimClass = item.artim >= 0 ? 'badge-positive' : 'badge-negative';
    const artimSign = item.artim >= 0 ? `+${item.artim}` : item.artim;

    if (currentTab === 'common') {
      row.innerHTML = `
        <td class="rank-col">${index + 1}</td>
        <td>
          <div class="student-info">
            <img class="avatar" src="${item.foto}" alt="${item.ad}">
            <span class="student-name">${item.ad}</span>
          </div>
        </td>
        <td><strong>${item.cari_reyting}</strong></td>
        <td>${item.kecmis_reyting}</td>
        <td class="${artimClass}">${artimSign}</td>
      `;
    } else {
      row.innerHTML = `
        <td class="rank-col">${index + 1}</td>
        <td>
          <div class="student-info">
            <img class="avatar" src="${item.foto}" alt="${item.ad}">
            <span class="student-name">${item.ad}</span>
          </div>
        </td>
        <td>${item.fm}</td>
        <td>${item.stepping}</td>
        <td>${item.e_olimp}</td>
        <td>${item.codesources}</td>
        <td>${item.hackerrank}</td>
        <td><strong>${item.cari_reyting}</strong></td>
        <td>${item.kecmis_reyting}</td>
        <td class="${artimClass}">${artimSign}</td>
      `;
    }
    tableBody.appendChild(row);
  });
}

function sortAndRender() {
  if (!globalData[currentTab]) return;
  
  globalData[currentTab].sort((a, b) => {
    const totalA = calculateTotals(a).cari_reyting;
    const totalB = calculateTotals(b).cari_reyting;
    return totalB - totalA;
  });

  renderTable();
}

// Səhifə yüklənəndə cədvəli avtomatik çək
window.onload = renderTable;
