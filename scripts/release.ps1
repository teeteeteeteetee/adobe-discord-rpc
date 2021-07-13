
$repo = "lolitee/adobe-discord-rpc"
$name = "discord rpc"

$releases = "https://api.github.com/repos/$repo/releases/latest"

Write-Host Getting latest release
$tag = (Invoke-WebRequest $releases | ConvertFrom-Json)[0].tag_name
$download = (Invoke-WebRequest $releases | ConvertFrom-Json)[0].assets[0].browser_download_url
$body = (Invoke-WebRequest $releases | ConvertFrom-Json)[0].body

Write-Host $download
Write-Host $body -ForegroundColor green

$zip = "$name-$tag.zip"
$dir = "$name-$tag"

Write-Host Downloading released version
Invoke-WebRequest $download -Out $zip

Write-Host Extracting files
Expand-Archive $zip -Force

Remove-Item $name -Recurse -Force -ErrorAction SilentlyContinue 

Move-Item $dir\$name -Destination $name -Force

Remove-Item $zip -Force
Remove-Item $dir -Recurse -Force

Write-Host "Make sure to restart your Adobe app, if you've updated it through the panel!"
Remove-Item .\\latest.ps1

PAUSE
