#include "windowlinux.h"

#include <X11/Xlib.h>
#include <X11/Xatom.h>
#include <X11/Xutil.h>
#include <X11/extensions/scrnsaver.h>

#include <time.h>
#include <stdio.h>
#include <stdlib.h>
#include <string>
#include <stdexcept>
#include <unistd.h>

extern "C" {
    // SEE xprop
    #define MAXSTR 1000
    unsigned long window;
    unsigned char *prop;
    Display *display;

    unsigned char* get_string_property(char* property_name)
    {
        Atom actual_type, filter_atom;
        int actual_format, status;
        unsigned long nitems, bytes_after;

        filter_atom = XInternAtom(display, property_name, True);
        status = XGetWindowProperty(display, window, filter_atom, 0, MAXSTR, False, AnyPropertyType,
                                    &actual_type, &actual_format, &nitems, &bytes_after, &prop);

        if (status != Success) {
            return 0;
        }

        return prop;
    }

    unsigned long get_long_property(char* property_name)
    {
        unsigned char* prop = get_string_property(property_name);

        if (prop == 0) {
            return 0;
        }

        unsigned long long_property = prop[0] + (prop[1]<<8) + (prop[2]<<16) + (prop[3]<<24);
        return long_property;
    }

    Display* getDisplay() {
        char *display_name = NULL;  // could be the value of $DISPLAY
        display = XOpenDisplay(display_name);

        return display;
    }
}

void windowlinux::getActiveWindow(Napi::Object &obj) {
    Display* display = getDisplay();
    int screen = XDefaultScreen(display);
    window = RootWindow(display, screen);

    if (!window) {
        throw std::invalid_argument("Couldn't get window.");
    }

    window = get_long_property("_NET_ACTIVE_WINDOW");

    if (!window) {
        throw std::invalid_argument("Couldn't get _NET_ACTIVE_WINDOW (is 0).");
    }

    time_t idle_time;
    static XScreenSaverInfo *mit_info;
    mit_info = XScreenSaverAllocInfo();
    screen = DefaultScreen(display);

    XScreenSaverQueryInfo(display, RootWindow(display,screen), mit_info);
    idle_time = (mit_info->idle) / 1000;
    XFree(mit_info);

    std::string wm_pid = std::to_string(get_long_property("_NET_WM_PID"));
    char* wm_class = reinterpret_cast<char*>(get_string_property("WM_CLASS"));
    
    // std::printf("_NET_WM_NAME: %s\n", get_string_property("_NET_WM_NAME"));

    // Workaround for null values
    unsigned char* net_wm_name = get_string_property("_NET_WM_NAME");

    char* wm_name = "";

    if (net_wm_name != NULL) {
        wm_name = reinterpret_cast<char*>(get_string_property("_NET_WM_NAME"));
    }

    obj.Set("os", "linux");
    obj.Set("windowClass", wm_class);
    obj.Set("windowName", wm_name);
    obj.Set("windowDesktop", std::to_string(get_long_property("_NET_WM_DESKTOP")));
    obj.Set("windowType", std::to_string(get_long_property("_NET_WM_WINDOW_TYPE")));
    obj.Set("windowPid", wm_pid);
    obj.Set("idleTime", std::to_string(idle_time));

    XCloseDisplay(display);
}

Napi::Object windowlinux::getActiveWindowWrapped(const Napi::CallbackInfo& info)
{
    Napi::Env env = info.Env();
    Napi::Object obj = Napi::Object::New(env);

    try {
        windowlinux::getActiveWindow(obj);
    } catch (const std::invalid_argument& e) {
        // For compatibility
        obj.Set("os", "linux");
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

Napi::Object windowlinux::Init(Napi::Env env, Napi::Object exports)
{
  exports.Set(
    "getActiveWindow", Napi::Function::New(env, windowlinux::getActiveWindowWrapped)
  );

  return exports;
}
