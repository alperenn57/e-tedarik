function loginPageButton(event) {
    
    event.preventDefault(); 
    
    
    document.getElementById('yukleniyor-ekrani').style.display = 'flex';
    
    
    setTimeout(function() {
        window.location.href = 'panel.html';
    }, 1200); 
}




// login.js


window.addEventListener('popstate', function (event) {
    window.location.href = "index.html";
});
history.pushState(null, null, window.location.href);


const loginButonu = document.getElementById('giris');

if (loginButonu) {
    loginButonu.addEventListener('click', function() {
        
        const loader = document.getElementById('yukleniyor-ekrani');
        if(loader) loader.style.display = 'flex';

        const eposta = document.getElementById('eposta').value;
        const sifre = document.getElementById('sifre').value;

        const formData = new FormData();
        formData.append('eposta', eposta);
        formData.append('sifre', sifre);

        fetch('php/login.php', {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.json();
        })
        .then(data => {
            if(data.status === 'success') {
                // İsmi hafızaya at ve yönlendir
                localStorage.setItem('kullaniciAdi', data.isim);
                window.location.href = 'panel.html';
            } else {
                if(loader) loader.style.display = 'none';
                alert("Hata: " + data.message);
            }
        })
        .catch(error => {
            if(loader) loader.style.display = 'none';
            console.error('Hata:', error);
            alert("Sunucuya bağlanırken bir hata oluştu!");
        });
    });
} else {
    console.error("HATA: 'giris' ID'li buton bulunamadı!");
}






