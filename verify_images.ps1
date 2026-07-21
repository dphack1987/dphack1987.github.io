$root = Get-Location
$imgPattern = '(?i)<img[^>]+src=["\']([^"\']+\.(?:png|jpe?g|gif|webp|svg|avif))["\']'
$cssPattern = '(?i)url\(["\']?([^"\')]+\.(?:png|jpe?g|gif|webp|svg|avif))["\']?\)'
$refs = @()
Get-ChildItem -Recurse -Include *.html,*.css | ForEach-Object {
    $content = Get-Content -Raw -LiteralPath $_.FullName
    $pattern = if ($_.Extension -eq '.html') { [regex]$imgPattern } else { [regex]$cssPattern }
    foreach ($m in $pattern.Matches($content)) {
        $refs += [pscustomobject]@{ File = $_.FullName; Ref = $m.Groups[1].Value.Trim() }
    }
}
$missing = @()
foreach ($ref in $refs) {
    if ($ref.Ref -match '^(?:[a-zA-Z]+:|//)') { continue }
    $candidate = Join-Path (Split-Path $ref.File) $ref.Ref
    if (-not (Test-Path $candidate -PathType Leaf)) {
        $candidate = Join-Path $root ($ref.Ref.TrimStart('/','\\'))
    }
    if (-not (Test-Path $candidate -PathType Leaf)) {
        $missing += [pscustomobject]@{ File = $ref.File; Ref = $ref.Ref }
    }
}
$summary = @()
$summary += "TOTAL_REFS:$($refs.Count)"
$summary += "MISSING:$($missing.Count)"
$summary | Out-File verify_images_summary.txt -Encoding utf8
$missing | Select-Object -First 200 | Format-Table -AutoSize | Out-String | Out-File verify_images_missing.txt -Encoding utf8
Write-Output 'verify_images_summary.txt and verify_images_missing.txt generated.'
