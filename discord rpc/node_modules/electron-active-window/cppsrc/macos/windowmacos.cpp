#include "windowmacos.h"

#include <stdio.h>
#include <stdlib.h>
#include <string>
#include <stdexcept>

void windowmacos::getActiveWindow(Napi::Object &obj) {
    
    obj.Set("os", "macos");
    obj.Set("windowClass", "wm_class");
    obj.Set("windowName", "wm_name");
    obj.Set("windowDesktop", "t");
    obj.Set("windowType", "d");
    obj.Set("windowPid", "b");
}

Napi::Object windowmacos::getActiveWindowWrapped(const Napi::CallbackInfo& info)
{
    Napi::Env env = info.Env();
    Napi::Object obj = Napi::Object::New(env);

    try {
        windowmacos::getActiveWindow(obj);
    } catch (const std::invalid_argument& e) {
        // For compatibility
        obj.Set("os", "macos");
        obj.Set("windowClass", "");
        obj.Set("windowName", "");
        obj.Set("windowDesktop", "0");
        obj.Set("windowType", "0");
        obj.Set("windowPid", "0");

        obj.Set("error", "1");
        obj.Set("errorMessage", e.what());
    }

    return obj;
}

Napi::Object windowmacos::Init(Napi::Env env, Napi::Object exports)
{
  exports.Set(
    "getActiveWindow", Napi::Function::New(env, windowmacos::getActiveWindowWrapped)
  );

  return exports;
}
