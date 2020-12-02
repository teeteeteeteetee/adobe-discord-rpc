#include "windowwindows.h"

#include <windows.h>
#include <stringapiset.h>

#include <codecvt>
#include <string>
#include <locale>

void windowwindows::getActiveWindow(Napi::Object& obj) {
	WCHAR window_title[256];
	HWND foreground_window = GetForegroundWindow();
	GetWindowTextW(foreground_window, window_title, 256);

	std:setlocale(LC_ALL, "en_US.UTF-8");

	DWORD pid;
	GetWindowThreadProcessId(foreground_window, &pid);
	// Process
	TCHAR process_filename[MAX_PATH];
	DWORD charsCarried = MAX_PATH;

	HANDLE hProc = OpenProcess(PROCESS_QUERY_LIMITED_INFORMATION | PROCESS_QUERY_INFORMATION, false, pid);

	QueryFullProcessImageNameA(hProc, 0, process_filename, &charsCarried);

	std::string fullpath = process_filename;

	const size_t last_slash_idx = fullpath.find_last_of("\\/");

	if (std::string::npos != last_slash_idx) {
		fullpath.erase(0, last_slash_idx + 1);
	}

	// Last input time
	LASTINPUTINFO last_input;
    // without setting cbSize GetLastError() returns the parameter is incorrect
    last_input.cbSize = sizeof(last_input);  
	DWORD idle_time;

	GetLastInputInfo( &last_input );
	idle_time = (GetTickCount() - last_input.dwTime) / 1000;

	std::wstring ws( window_title );
	std::wstring_convert<std::codecvt_utf8<wchar_t>> myconv;

	obj.Set("os", "windows");
	obj.Set("windowClass", fullpath);
	obj.Set("windowName", myconv.to_bytes(ws));
	obj.Set("windowDesktop", "0");
	obj.Set("windowType", "0");
	obj.Set("windowPid", std::to_string(pid));
	obj.Set("idleTime", std::to_string(idle_time));
}

Napi::Object windowwindows::getActiveWindowWrapped(const Napi::CallbackInfo& info)
{
	Napi::Env env = info.Env();

	Napi::Object obj = Napi::Object::New(env);
	windowwindows::getActiveWindow(obj);

	return obj;
}

Napi::Object windowwindows::Init(Napi::Env env, Napi::Object exports)
{
	exports.Set(
		"getActiveWindow", Napi::Function::New(env, windowwindows::getActiveWindowWrapped)
	);

	return exports;
}
