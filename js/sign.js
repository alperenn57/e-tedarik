document.getElementById('kayitFormu').addEventListener('submit', function(event) {
    const sifre1 = document.getElementById('signSifre').value;
    const sifre2 = document.getElementById('signSifre2').value;

    // Şifre koşul kontrolü
    var uzunlukOk = sifre1.length >= 8;
    var sayiOk    = !/^\d+$/.test(sifre1);
    var ardisikOk = !ardisikVarMi(sifre1);
    var boslukOk  = !/\s/.test(sifre1);

    if (!uzunlukOk || !sayiOk || !ardisikOk || !boslukOk) {
        event.preventDefault();
        alert('Şifreniz gerekli koşulları sağlamıyor. Lütfen kuralları kontrol edin.');
        return;
    }

    if (sifre1 !== sifre2) {
        event.preventDefault();
        alert('Şifreler uyuşmuyor! Lütfen şifrenizi tekrar girin.');
        document.getElementById('signSifre').value = '';
        document.getElementById('signSifre2').value = '';
        return;
    }
});


window.addEventListener('popstate', function (event) {
    
    window.location.href = "index.html";
});

history.pushState(null, null, window.location.href);





var sifreInput  = document.getElementById('signSifre');
var sifreInput2 = document.getElementById('signSifre2');

function ardisikVarMi(str) {
    for (var i = 0; i < str.length - 2; i++) {
        var a = str.charCodeAt(i);
        var b = str.charCodeAt(i + 1);
        var c = str.charCodeAt(i + 2);
        if (b === a + 1 && c === a + 2) return true;
    }
    return false;
}

var kuralMetinleri = {
    'kural-uzunluk': 'En az 8 karakter olmalı',
    'kural-sayi':    'Tamamıyla sayısal olamaz',
    'kural-ardisik': 'Ardışık karakter olmamalı (örn: 123, abc)',
    'kural-bosluk':  'Boşluk içeremez'
};
// Başlangıçta tüm kurallar nötr (ne yeşil ne kırmızı)
document.getElementById('kural-uzunluk').classList.remove('gecti','hatali');
document.getElementById('kural-sayi').classList.remove('gecti','hatali');
document.getElementById('kural-ardisik').classList.remove('gecti','hatali');
document.getElementById('kural-bosluk').classList.remove('gecti','hatali');

function kuralGuncelle(id, gecti) {
    var el = document.getElementById(id);
    el.textContent = (gecti ? '✓ ' : '✗ ') + kuralMetinleri[id];
    el.classList.toggle('gecti', gecti);
    el.classList.toggle('hatali', !gecti);
}

sifreInput.addEventListener('focus', function() {
    document.getElementById('sifreGeriBildirim').style.display = 'block';
});

sifreInput.addEventListener('input', function() {
    var val = this.value;

    if (val.length === 0) {
        document.getElementById('sifreGeriBildirim').style.display = 'none';
        ['kural-uzunluk','kural-sayi','kural-ardisik','kural-bosluk'].forEach(function(id) {
            var el = document.getElementById(id);
            el.classList.remove('gecti','hatali');
            el.textContent = '✗ ' + kuralMetinleri[id];
        });
        this.classList.remove('hata');
        return;
    }

    var uzunlukOk  = val.length >= 8;
    var sayiOk     = !/^\d+$/.test(val);
    var ardisikOk  = !ardisikVarMi(val);
    var boslukOk   = !/\s/.test(val);

    kuralGuncelle('kural-uzunluk', uzunlukOk);
    kuralGuncelle('kural-sayi',    sayiOk);
    kuralGuncelle('kural-ardisik', ardisikOk);
    kuralGuncelle('kural-bosluk',  boslukOk);

    var tumKurallar = uzunlukOk && sayiOk && ardisikOk && boslukOk;
    this.classList.toggle('hata', val.length > 0 && !tumKurallar);

    // Şifre tekrar alanını da kontrol et
    if (sifreInput2.value.length > 0) {
        sifreInput2.classList.toggle('eslesmiyor', sifreInput2.value !== val);
        sifreInput2.classList.toggle('eslesiyor',  sifreInput2.value === val);
    }
});

sifreInput2.addEventListener('input', function() {
    var eslesiyor = this.value === sifreInput.value;
    this.classList.toggle('eslesmiyor', !eslesiyor);
    this.classList.toggle('eslesiyor',   eslesiyor);
});