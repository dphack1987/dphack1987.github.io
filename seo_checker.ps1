param([string]$Url = "https://www.mapaturisticodelquindio.com")

Write-Host "====================================================" -ForegroundColor Cyan
Write-Host " ANALIZADOR DE SEO TÉCNICO PARA BUSCADORES (BOT)" -ForegroundColor Cyan
Write-Host "====================================================" -ForegroundColor Cyan
Write-Host "Analizando la URL: $Url" -ForegroundColor Yellow

$ua = "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)"

try {
    $res = Invoke-WebRequest -Uri $Url -UserAgent $ua -Method Get -TimeoutSec 10
    Write-Host "`n[✔] Estado HTTP: $($res.StatusCode) ($($res.StatusDescription))" -ForegroundColor Green
    
    $html = $res.Content

    if ($html -match "<title>(.*?)</title>") {
        Write-Host "[✔] Title: $($Matches[1])" -ForegroundColor White
    } else {
        Write-Host "[✖] Alerta: Sin etiqueta <title>" -ForegroundColor Red
    }

    if ($html -match "name=['""]description['""]\s+content=['""](.*?)['""]") {
        Write-Host "[✔] Description encontrada" -ForegroundColor White
    } else {
        Write-Host "[✖] Alerta: Sin Meta Description" -ForegroundColor Red
    }

    if ($html -match "rel=['""]canonical['""]\s+href=['""](.*?)['""]") {
        Write-Host "[✔] Canonical encontrada: $($Matches[1])" -ForegroundColor White
    } else {
        Write-Host "[!] Aviso: Sin etiqueta Canonical" -ForegroundColor Yellow
    }

} catch {
    Write-Host "[✖] Error de conexión: $_" -ForegroundColor Red
}

$uri = [System.Uri]$Url
$rob = "$($uri.Scheme)://$($uri.Authority)/robots.txt"

Write-Host "`nVerificando Robots.txt: $rob" -ForegroundColor Yellow

try {
    $r = Invoke-WebRequest -Uri $rob -UserAgent $ua -Method Get -TimeoutSec 5
    if ($r.StatusCode -eq 200) { 
        Write-Host "[✔] Robots.txt accesible." -ForegroundColor Green 
    }
} catch {
    Write-Host "[✖] No se pudo leer robots.txt" -ForegroundColor Red
}

Write-Host "====================================================" -ForegroundColor Cyan