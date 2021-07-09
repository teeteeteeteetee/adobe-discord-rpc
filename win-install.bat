
@echo off

SETLOCAL enabledelayedexpansion
SET POWERSHELL_PATH=C:\Windows\System32\WindowsPowershell\v1.0\

REM Check for permissions
    IF "%PROCESSOR_ARCHITECTURE%" EQU "amd64" (
>nul 2>&1 "%SYSTEMROOT%\SysWOW64\cacls.exe" "%SYSTEMROOT%\SysWOW64\config\system"
) ELSE (
>nul 2>&1 "%SYSTEMROOT%\system32\cacls.exe" "%SYSTEMROOT%\system32\config\system"
)

REM If error flag set, we do not have admin.
if '%errorlevel%' NEQ '0' (
    echo Requesting administrative privileges...
    goto UACPrompt
) else ( goto gotAdmin )

:UACPrompt
    echo Set UAC = CreateObject^("Shell.Application"^) > "%temp%\getadmin.vbs"
    set params= %*
    echo UAC.ShellExecute "cmd.exe", "/c ""%~s0"" %params:"=""%", "", "runas", 1 >> "%temp%\getadmin.vbs"

    "%temp%\getadmin.vbs"
    del "%temp%\getadmin.vbs"
    exit /B

:gotAdmin
    pushd "%CD%"
    CD /D "%~dp0"

WHERE powershell

IF %ERRORLEVEL% NEQ 0 (
	ECHO Couldn't find PowerShell in Environment paths!
	ECHO Adding PowerShell in path, you can always remove this by running [WIN] + [R] and "rundll32.exe sysdm.cpl,EditEnvironmentVariables", edit, select %POWERSHELL_PATH% and remove it.
	SETX path "%path%;%POWERSHELL_PATH%;"
	TIMEOUT /t 5
	START win-install.bat
EXIT
)

REM Start PowerShell
powershell.exe 
$currentPrincipal = New-Object Security.Principal.WindowsPrincipal([Security.Principal.WindowsIdentity]::GetCurrent())
$currentPrincipal.IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)

PAUSE
