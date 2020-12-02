#include <napi.h>

namespace windowwindows {
	void getActiveWindow(Napi::Object& obj);
	Napi::Object getActiveWindowWrapped(const Napi::CallbackInfo& info);
	Napi::Object Init(Napi::Env env, Napi::Object exports);
}
