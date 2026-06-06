<?php
    header('Content-Type: application/json');
    session_start();

    // Veritabanı bağlantısını çağır
    require_once 'config.php';

    $gelen_email = isset($_POST['eposta']) ? trim($_POST['eposta']) : '';
    $gelen_sifre = isset($_POST['sifre']) ? $_POST['sifre'] : '';

    if (empty($gelen_email) || empty($gelen_sifre)) {
        echo json_encode(['status' => 'error', 'message' => 'E-posta ve şifre boş olamaz!']);
        exit;
    }

    $sorgu = $pdo->prepare("SELECT * FROM kullanicilar WHERE email = ?");
    $sorgu->execute([$gelen_email]);
    $kullanici = $sorgu->fetch(); // config.php'de FETCH_ASSOC tanımlandığı için parametreye gerek yok

    if ($kullanici && password_verify($gelen_sifre, $kullanici['sifre'])) {
        $_SESSION['kullanici_id']    = $kullanici['id'];
        $_SESSION['kullanici_ad']    = $kullanici['ad'];
        $_SESSION['kullanici_email'] = $kullanici['email'];
        echo json_encode(['status' => 'success', 'isim' => $kullanici['ad']]);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'E-posta veya şifre hatalı!']);
    }
?>