<?php
    session_start();

    // Veritabanı bağlantısını çağır
    require_once 'config.php';

    $ad     = isset($_POST['ad'])     ? trim($_POST['ad'])     : '';
    $soyad  = isset($_POST['soyad'])  ? trim($_POST['soyad'])  : '';
    $eposta = isset($_POST['eposta']) ? trim($_POST['eposta']) : '';
    $sifre  = isset($_POST['sifre'])  ? $_POST['sifre']        : '';

    if (empty($ad) || empty($soyad) || empty($eposta) || empty($sifre)) {
        die("Tüm alanlar zorunludur.");
    }

    $kontrol = $pdo->prepare("SELECT id FROM kullanicilar WHERE email = ?");
    $kontrol->execute([$eposta]);
    if ($kontrol->fetch()) {
        die("Bu e-posta adresi zaten kayıtlı!");
    }

    $sifre_hash = password_hash($sifre, PASSWORD_DEFAULT);

    $sorgu = $pdo->prepare("INSERT INTO kullanicilar (ad, soyad, email, sifre) VALUES (?, ?, ?, ?)");
    $sorgu->execute([$ad, $soyad, $eposta, $sifre_hash]);

    $yeni_id = $pdo->lastInsertId();
    $_SESSION['kullanici_id']    = $yeni_id;
    $_SESSION['kullanici_ad']    = $ad;
    $_SESSION['kullanici_email'] = $eposta;
?>