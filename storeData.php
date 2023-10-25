<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = array(
        'fullname' => $_POST['fullname'],
        'services' => $_POST['services'],
        'estimatedBudget' => $_POST['estimatedBudget'],
        'phoneNumber' => $_POST['phoneNumber'],
        'emailAddress' => $_POST['emailAddress']
    );

    // Make a POST request to the Google Apps Script
    $googleAppsScriptUrl = 'https://script.google.com/macros/s/AKfycbyxaxcu05wDi_wKnibk9u0W6p4iHTcKwZhgmLZ5Xo8WmceUSFCEPKhx79MDik4N0CUt/exec';
    $ch = curl_init($googleAppsScriptUrl);
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
    curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));
    curl_exec($ch);
    curl_close($ch);
}
?>
