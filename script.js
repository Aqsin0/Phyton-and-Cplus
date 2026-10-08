let globalData = {};
let currentTab = 'cpp';

// Səhifə yüklənəndə data.json faylından məlumat çəkilir
fetch('data.json')
  .then(response => response.json())
  .then(data => {
    globalData = data;
    renderTable();
  })
  .catch(error => console.error('Məlumat yüklənmədi:', error));

function switchTab(tabName) {
  currentTab = tabName;
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  event.target.classList.add('active');
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

  // Başlıqlar
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
  
  // Cari reytinqə görə azalan sıra ilə çeşidləmə
  globalData[currentTab].sort((a, b) => {
    const totalA = calculateTotals(a).cari_reyting;
    const totalB = calculateTotals(b).cari_reyting;
    return totalB - totalA;
  });

  renderTable();
}
