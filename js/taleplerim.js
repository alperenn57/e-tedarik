var teklifVerisi = [
    {
        talepIndex: 0,
        teklifler: [
            { id: 1, firma: 'TechStore A.Ş.',  fiyat: '14.500 TL', tarih: '03.05.2026', durum: 'Bekliyor' },
            { id: 2, firma: 'Bilişim Ltd.',     fiyat: '13.200 TL', tarih: '04.05.2026', durum: 'Bekliyor' },
            { id: 3, firma: 'Donanım Plus',     fiyat: '15.000 TL', tarih: '04.05.2026', durum: 'Bekliyor' }
        ]
    },
    {
        talepIndex: 1,
        teklifler: [
            { id: 4, firma: 'MobilYa A.Ş.',  fiyat: '8.200 TL', tarih: '28.04.2026', durum: 'Bekliyor' },
            { id: 5, firma: 'Ergosit Ltd.',   fiyat: '9.100 TL', tarih: '29.04.2026', durum: 'Bekliyor' },
            { id: 6, firma: 'OfficePro',      fiyat: '7.950 TL', tarih: '30.04.2026', durum: 'Bekliyor' }
        ]
    }
];

var aktifTalepIndex = null;

function modalAc(baslik, talepIndex) {
    aktifTalepIndex = talepIndex;
    document.getElementById('modalBaslik').textContent = baslik + ' — Gelen Teklifler';
    tabloYenile();
    document.getElementById('teklifModal').style.display = 'flex';
}

function modalKapat() {
    document.getElementById('teklifModal').style.display = 'none';
    aktifTalepIndex = null;
}

function tabloYenile() {
    var tbody = document.getElementById('modalTeklifler');
    tbody.innerHTML = '';
    var grup = teklifVerisi.find(function(g) { return g.talepIndex === aktifTalepIndex; });
    if (!grup || grup.teklifler.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" style="padding:12px; color:gray;">Henüz teklif yok.</td></tr>';
        return;
    }
    grup.teklifler.forEach(function(t) {
        var renkMap = { 'Kabul Edildi': '#16a34a', 'Reddedildi': '#dc2626', 'Bekliyor': '#d97706' };
        var renk = renkMap[t.durum] || '#555';
        var islemHTML = '';
        if (t.durum === 'Bekliyor') {
            islemHTML = '<button onclick="teklifKabul(' + t.id + ')" style="background:#16a34a; color:#fff; border:none; border-radius:4px; padding:4px 8px; cursor:pointer; margin-right:4px; font-size:12px;">Kabul Et</button>'
                      + '<button onclick="teklifRed(' + t.id + ')" style="background:#dc2626; color:#fff; border:none; border-radius:4px; padding:4px 8px; cursor:pointer; font-size:12px;">Reddet</button>';
        } else {
            islemHTML = '<span style="font-size:12px; color:' + renk + '; font-weight:bold;">' + t.durum + '</span>';
        }
        tbody.innerHTML +=
            '<tr style="border-bottom:1px solid #eee;">'
          + '<td style="padding:8px;">' + t.firma + '</td>'
          + '<td style="padding:8px;">' + t.fiyat + '</td>'
          + '<td style="padding:8px;">' + t.tarih + '</td>'
          + '<td style="padding:8px; color:' + renk + '; font-weight:bold;">' + t.durum + '</td>'
          + '<td style="padding:8px;">' + islemHTML + '</td>'
          + '</tr>';
    });
}

function teklifKabul(teklifId) {
    if (!confirm('Bu teklifi kabul etmek istediğinize emin misiniz?')) return;
    var grup = teklifVerisi.find(function(g) { return g.talepIndex === aktifTalepIndex; });
    
    grup.teklifler = grup.teklifler.filter(function(t) {
        return t.id === teklifId;
    });
    grup.teklifler[0].durum = 'Kabul Edildi';
    tabloYenile();
    
    guncelleTalepDurumu(aktifTalepIndex, 'Kabul Edildi');
}

function teklifRed(teklifId) {
    if (!confirm('Bu teklifi reddetmek istediğinize emin misiniz?')) return;
    var grup = teklifVerisi.find(function(g) { return g.talepIndex === aktifTalepIndex; });
    
    grup.teklifler = grup.teklifler.filter(function(t) { return t.id !== teklifId; });
    tabloYenile();
}

function guncelleTalepDurumu(talepIndex, yeniDurum) {
    
    var satirlar = document.querySelectorAll('.talep-tablosu tbody tr');
    if (satirlar[talepIndex]) {
        var durumSpan = satirlar[talepIndex].querySelector('.durum');
        if (durumSpan) {
            durumSpan.textContent = yeniDurum;
            durumSpan.className = 'durum ' + (yeniDurum === 'Kabul Edildi' ? 'aktif' : 'kapali');
        }
    }
}


document.getElementById('teklifModal').addEventListener('click', function(e) {
    if (e.target === this) modalKapat();
});


function dinamikTalepleriYukle() {
    var tbody    = document.querySelector('.talep-tablosu tbody');
    var talepler = JSON.parse(localStorage.getItem('kullaniciTalepleri') || '[]');
    talepler.forEach(function(t, i) {
        var index = 2 + i; // mock data 0 ve 1, kullanıcı talepleri 2'den başlar
        // teklifVerisi'ne boş grup ekle
        teklifVerisi.push({ talepIndex: index, teklifler: [] });
        var tr = document.createElement('tr');
        tr.innerHTML =
            '<td>' + t.urun + '</td>'
          + '<td>' + t.adet + ' ' + t.birim + '</td>'
          + '<td>' + t.tarih + '</td>'
          + '<td><span class="durum aktif">' + t.durum + '</span></td>'
          + '<td><strong>0</strong> Teklif</td>'
          + '<td><button class="btn-teklif" onclick="modalAc(\'' + t.urun + '\', ' + index + ')">Teklifleri İncele</button></td>';
        tbody.appendChild(tr);
    });
}

dinamikTalepleriYukle();