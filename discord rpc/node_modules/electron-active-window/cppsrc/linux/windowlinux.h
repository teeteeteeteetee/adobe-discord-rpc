#include <napi.h>

namespace windowlinux {
    void getActiveWindow(Napi::Object &obj);
    Napi::Object getActiveWindowWrapped(const Napi::CallbackInfo& info);
    Napi::Object Init(Napi::Env env, Napi::Object exports);
}
