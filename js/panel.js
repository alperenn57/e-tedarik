document.addEventListener('DOMContentLoaded', function() {
    
    const talepButonu = document.getElementById('btnTaleplerim');
    if (talepButonu) {
        talepButonu.onclick = function() {
            window.location.href = 'taleplerim.html';
        };
    }
    const teklifButonu = document.getElementById('btnTekliflerim');
    
    if (teklifButonu) {
        teklifButonu.onclick = function() {
            window.location.href = 'tekliflerim.html';
        };
    }

});




window.onload = function() {
    const isim = localStorage.getItem('kullaniciAdi');
    if (isim) {
        document.getElementById('kullaniciYeri').innerText = isim.toUpperCase();
    } else {
        window.location.href = 'login.html';
    }
};

function talepEkle() {
    var inputs = document.querySelectorAll('.talep-formu input, .talep-formu select');
    var urun   = inputs[0].value.trim();
    var adet   = inputs[1].value.trim();
    var birim  = inputs[2].value;
    var fiyat  = inputs[3].value.trim();
    var tarih  = inputs[4].value;

    if (!urun || !adet || !birim || !fiyat || !tarih) {
        alert('Lütfen tüm alanları doldurun.');
        return;
    }

    
    var yeniTalep = {
        id: Date.now(),
        urun: urun,
        adet: adet,
        birim: birim,
        fiyat: fiyat,
        tarih: tarih,
        durum: 'Yayında'
    };

    // localStorage'a kaydet
    var talepler = JSON.parse(localStorage.getItem('kullaniciTalepleri') || '[]');
    talepler.push(yeniTalep);
    localStorage.setItem('kullaniciTalepleri', JSON.stringify(talepler));

    // Anlık DOM güncellemesi
    talepleriniGoster();

    // Formu temizle
    inputs.forEach(function(inp) { inp.value = ''; });
    alert('Talebiniz eklendi!');
}

function talepleriniGoster() {
    var alan = document.getElementById('eklenenKalemlerAlani');
    if (!alan) return;

    var talepler = JSON.parse(localStorage.getItem('kullaniciTalepleri') || '[]');
    if (talepler.length === 0) {
        alan.innerHTML = '';
        return;
    }

    var html = '<h3 style="color:#261543; margin-bottom:16px; font-size:17px; border-bottom:2px solid #e5cef8; padding-bottom:8px;">📋 Eklediğiniz Talepler</h3>';
        html += '<div style="display:flex; flex-direction:column; gap:10px;">';
        talepler.forEach(function(t) {
            html += '<div style="background:#f9f5ff; border:1px solid #e0d4f7; border-radius:8px; padding:12px 16px; display:flex; justify-content:space-between; align-items:center; font-size:14px;">'
                + '<span style="font-weight:bold; color:#261543;">' + t.urun + '</span>'
                + '<span style="color:#555;">' + t.adet + ' ' + t.birim + '</span>'
                + '<span style="color:#705e82;">🎯 ' + t.fiyat + ' TL</span>'
                + '<span style="color:#959595;">📅 ' + t.tarih + '</span>'
                + '<span style="background:#5941a9; color:#fff; border-radius:12px; padding:3px 10px; font-size:12px;">' + t.durum + '</span>'
                + '</div>';
    });
html += '</div>';
    html += '</ul>';
    alan.innerHTML = html;
}


talepleriniGoster();


var btnGonder = document.querySelector('.btn-gonder');
if (btnGonder) {
    btnGonder.addEventListener('click', talepEkle);
}