<?php
$location = $date = $time = $type = $humidity = $climate = $altitude = "";
$output = "";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $location = isset($_POST['loc']) ? trim($_POST['loc']) : '';
    $date = isset($_POST['date']) ? $_POST['date'] : '';
    $time = isset($_POST['time']) ? $_POST['time'] : '';
    $type = isset($_POST['type']) ? $_POST['type'] : '';
    $humidity = isset($_POST['humidity']) ? $_POST['humidity'] : '';
    $climate = isset($_POST['climate']) ? $_POST['climate'] : '';
    $altitude = isset($_POST['altitude']) ? trim($_POST['altitude']) : '';


        $dateObj = DateTime::createFromFormat('Y-m-d', $date);
        $today = new DateTime();
            $today->setTime(0, 0, 0);
        $formattedDate = $dateObj->format('d/m/Y');

        // Create type description
        $typeDescriptions = [
            's' => 'OFC',
            'a' => 'AMB',
            'r' => 'DRA'
        ];
        $typeDescription = isset($typeDescriptions[$type]) ? $typeDescriptions[$type] : $type;

        // Create output
        $output = "<div class='alert alert-success'>";
        $output .= "<h3>Rivelazione Temperatura Registrata</h3>";
        $output .= "<p><strong>Data inserimento:</strong> " . date('d/m/Y H:i:s') . "</p>";
        $output .= "<p><strong>Data rivelazione:</strong> $formattedDate</p>";
        $output .= "<p><strong>Ora:</strong> $time</p>";
        $output .= "<p><strong>Località:</strong> $location</p>";
        $output .= "<p><strong>Tipo Rivelazione:</strong> $typeDescription</p>";
        $output .= "<p><strong>Umidità:</strong> $humidity</p>";
        $output .= "<p><strong>Clima Attuale:</strong> $climate</p>";
        $output .= "<p><strong>Altitudine:</strong> $altitude m</p>";
        $output .= "</div>";
}
?>

<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css">
    <title>Rivelazione Temperatura - Risultato</title>
</head>
<body>
<div class="container mt-4">
    <div class="row">
        <div class="col-12">
            <h1 class="mb-4">Sistema di Rivelazione Temperatura</h1>

            <?php if (!empty($output)) {
                echo $output;
            } ?>
        </div>
    </div>
</div>
</body>
