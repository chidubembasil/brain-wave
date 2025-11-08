$content = Get-Content "admin-dashboard.html" -Raw

$content = $content -replace 'onclick="viewSubjectContent\(', 'onclick="window.adminDashboard.viewSubjectContent('
$content = $content -replace 'onclick="editSubject\(', 'onclick="window.adminDashboard.editSubject('
$content = $content -replace 'onclick="deleteSubject\(', 'onclick="window.adminDashboard.deleteSubject('

Set-Content "admin-dashboard.html" -Value $content

Write-Host "Button onclick handlers updated successfully!"