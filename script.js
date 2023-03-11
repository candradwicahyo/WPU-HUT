window.onload = () => {
  
  const content = document.querySelector('.content');
  
  async function loadData() {
    try {
      // load data
      const data = await fetchData();
      // tampilkan hasilnya
      updateUI(data);
    } catch (error) {
      /*
        jika mengalami masalah pada saat mengambil data
        maka tampilkan pesan errornya
      */
      content.innerHTML = showError(error);
    }
  }
  
  loadData();
  
  function fetchData() {
    return fetch('data/data.json')
      .then(response => response.json())
      .then(response => response.menu)
      .catch(error => {
        /*
          jika mengalami masalah ketika mengambil data
          maka tampilkan error tersebut
        */  
        throw new Error(error);
      });
  }
  
  function showError(message) {
    return `
    <div class="col-md-6 mx-auto">
      <div class="alert alert-danger" role="alert">
        <h3 class="fw-normal mb-2">Error!</h3>
        <span class="fw-light">${message}</span>
      </div>
    </div>
    `;
  }
  
  function updateUI(params) {
    // string
    let result = '';
    // looping dan jalankan fungsi showCards()
    params.forEach(param => result += showCards(param));
    // tambahkan elementnya
    content.insertAdjacentHTML('beforeend', result);
  }
  
  function showCards(param) {
    return `
    <div class="col-md-4">
      <div class="card my-2" data-category="${param.kategori}">
        <img src="images/menu/${param.gambar}" class="card-img-top">
        <div class="card-body">
          <h5 class="card-title">${param.nama}</h5>
          <div class="d-flex justify-content-between align-items-center mb-2">
            <span class="fw-light">${param.kategori}</span>
            <span class="fw-light">${param.harga}</span>
          </div>
          <p class="card-text">${param.deskripsi}</p>
        </div>
      </div>
    </div>
    `;
  }
  
  // tombol untuk mem-filter content 
  const button = document.querySelectorAll('.button');
  button.forEach(btn => {
    // ketika tombol ditekan
    btn.addEventListener('click', function() {
      // hapus class active di semua tombol 
      button.forEach(btn => btn.classList.remove('active'));
      // berikan class active pada tombol yang ditekan
      this.classList.add('active');
      // value atau teks dari tombol yang ditekan
      const value = this.textContent.toLowerCase();
      // jalankan fungsi filterContent()
      filterContent(value);
    });
  });
  
  function filterContent(value) {
    const param = Array.from(content.children);
    // looping
    param.forEach(data => {
      /*
        jika ada data yang berkaitan dengan teks atau value tomhol, maka
        tampilkan data. tapi jika tidak ada kaitannya dengan value atau teks tombol, maka 
        sembunyikan data tersebut
      */
      data.style.display = (data.textContent.toLowerCase().indexOf(value) != -1 || value == 'semua') ? '' : 'none';
    });
  }
  
  // pencarian data
  const searchInput = document.querySelector('.search-input');
  searchInput.addEventListener('keyup', function() {
    // value input pencarian
    const value = this.value.trim();
    // jalankan fungsi searchData()
    searchData(value);
  });
  
  function searchData(value) {
    const param = Array.from(content.children);
    param.forEach(data => {
      /*
        jika ada data yang sama dengan isi input pencarian data,
        maka tampilkan data tersebut. tapi, jika ada data yang tidak 
        sama dengan isi input pencarian, maka sembunyikan data tersebut
      */
      data.style.display = (data.textContent.toLowerCase().indexOf(value) != -1) ? '' : 'none';
    });
  }
  
}