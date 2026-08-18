@echo off
title Push Sabnam Handlooms to GitHub
echo ============================================================
echo   Sabnam Handlooms & Arts - GitHub Upload Helper
echo ============================================================
echo.
echo Please paste your GitHub Repository URL below:
echo (Example: https://github.com/your-username/sabnam-handlooms.git)
echo.
set /p REPO_URL="GitHub Repo URL: "

if "%REPO_URL%"=="" (
    echo Error: Repository URL cannot be empty.
    pause
    exit /b
)

echo.
echo [1/4] Initializing Git repository...
git init

echo [2/4] Adding all project files, images, and folders...
git add -A

echo [3/4] Creating commit...
git commit -m "Sabnam Handlooms full catalog and admin panel"

echo [4/4] Uploading to GitHub...
git branch -M main
git remote remove origin 2>nul
git remote add origin %REPO_URL%
git push -u origin main --force

echo.
echo ============================================================
echo   SUCCESS! All files and folders uploaded to GitHub!
echo   Vercel will now deploy your site automatically.
echo ============================================================
pause
