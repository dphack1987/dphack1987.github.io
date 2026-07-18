param(
  [string]$RootPath = ".",
  [switch]$Fix,
  [switch]$Verbose
)

function Normalize-Link($link) {
  $l = $link.Split('#')[0].Split('?')[0]
  $l = [System.Uri]::UnescapeDataString($l)
  return $l
}

function To-FilePath($link, $fileDir, $root) {
  if ($link -match '^[a-zA-Z]+:') { return $null }
  $l = $link -replace '\\','/'
  if ($l -like '/*') {
    $candidate = Join-Path $root ($l.TrimStart('/'))
  } else {
    $candidate = Join-Path $fileDir $l
  }
    if ($candidate.EndsWith('/')) { $candidate = Join-Path $candidate 'index.html' }
    $rp = Resolve-Path -LiteralPath $candidate -ErrorAction SilentlyContinue
    if ($rp) { return $rp.ProviderPath } else { return $null }
}

function Get-Relative($fromDir, $targetPath) {
  $fromUri = (New-Object System.Uri((Resolve-Path $fromDir).ProviderPath + [IO.Path]::DirectorySeparatorChar))
  $toUri = New-Object System.Uri((Resolve-Path $targetPath).ProviderPath)
  $rel = $fromUri.MakeRelativeUri($toUri).ToString()
  $rel = [System.Uri]::UnescapeDataString($rel) -replace '/','\\'
  return $rel
}

$root = (Resolve-Path $RootPath).ProviderPath
$report = @()

Get-ChildItem -Path $root -Filter *.html -Recurse | ForEach-Object {
  $file = $_
  $fileDir = $file.DirectoryName
  $content = Get-Content $file.FullName -Raw -ErrorAction SilentlyContinue
  if (-not $content) { return }
  $matches = [regex]::Matches($content, 'href\s*=\s*"(.*?)"', 'IgnoreCase')
  foreach ($m in $matches) {
    $link = $m.Groups[1].Value
    $norm = Normalize-Link $link
    if ($norm -match '\.html$' -and -not ($norm -match '^(https?:|\\/)')) {
      $resolved = To-FilePath $norm $fileDir $root
      if (-not $resolved) {
        $name = [IO.Path]::GetFileName($norm)
        $found = Get-ChildItem -Path $root -Filter $name -Recurse -ErrorAction SilentlyContinue | Select-Object -First 1
          if ($found) { $foundPath = $found.FullName } else { $foundPath = $null }
        $report += [PSCustomObject]@{
          File = $file.FullName
          Link = $link
          Resolved = $null
          FoundCandidate = $foundPath
        }
        if ($Fix -and $foundPath) {
          $rel = Get-Relative $fileDir $foundPath
          $newLink = $rel -replace '\\\\','/'
          if ($Verbose) { Write-Host "Fix: $($file.FullName) -> $link  =>  $newLink" -ForegroundColor Yellow }
          (Get-Content $file.FullName) -replace [regex]::Escape($link), $newLink | Set-Content $file.FullName
        }
      } else {
        # exists
      }
    }
  }
}

$broken = $report | Where-Object { -not $_.Resolved }
if ($broken) {
  $broken | Select-Object File, Link, FoundCandidate | Format-Table -AutoSize
  $broken | Export-Csv -Path (Join-Path $root "check-links-report.csv") -NoTypeInformation
  Write-Host "Informe guardado en check-links-report.csv" -ForegroundColor Green
} else {
  Write-Host "No se encontraron enlaces .html rotos según las reglas." -ForegroundColor Green
}
