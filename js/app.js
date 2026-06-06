

window.addEventListener('scroll', function() {
  
  let kaydirmaMiktari = window.scrollY;
  let heroDiv = document.getElementById('hero');
  
  
  let yeniOpaklik = 1 - (kaydirmaMiktari / 600);
  
  if (yeniOpaklik >= 0) {
    heroDiv.style.opacity = yeniOpaklik;
  }
});
// EKLEME: Demo butonu artık modal açıyor
function demoButton(event) {
    event.preventDefault();
    document.getElementById('demoModal').style.display = 'flex';
}

function demoGonder() {
    var ad    = document.getElementById('demoAd').value.trim();
    var mail  = document.getElementById('demoMail').value.trim();
    var firma = document.getElementById('demoFirma').value.trim();
    if (!ad || !mail || !firma) {
        alert('Lütfen tüm alanları doldurun.');
        return;
    }
    
    document.getElementById('demoMesaj').style.display = 'block';
    setTimeout(function() {
        document.getElementById('demoModal').style.display = 'none';
        document.getElementById('demoMesaj').style.display = 'none';
        document.getElementById('demoAd').value = '';
        document.getElementById('demoMail').value = '';
        document.getElementById('demoFirma').value = '';
    }, 2500);
}


function logBtn(){
  event.preventDefault();     
  
  document.getElementById('yukleniyor-ekrani').style.display = 'flex'; 
  setTimeout(function() {
        window.location.replace('login.html');
  }, 1200);
    
};

function signBtn(){
  event.preventDefault();     
  
  document.getElementById('yukleniyor-ekrani2').style.display = 'flex'; 
  setTimeout(function() {
        window.location.replace('sign.html');
  }, 1200);
};


// Kullanıcı tarayıcıda 'Geri' tuşuna bastığı anı yakalar
window.addEventListener('popstate', function (event) {
    // Tarayıcıyı zorla index.html'e fırlatır
    window.location.href = "index.html";
});

// Sayfa yüklendiğinde boş bir geçmiş noktası oluşturur ki 'Geri' tuşu aktif olsun
history.pushState(null, null, window.location.href);  
