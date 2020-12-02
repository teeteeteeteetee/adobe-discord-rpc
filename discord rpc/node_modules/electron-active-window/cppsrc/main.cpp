#include <napi.h>

#ifdef __linux__
#include "linux/windowlinux.h"
#endif

#ifdef _WIN32
#include "windows/windowwindows.h"
#endif

#ifdef __APPLE__
#include "macos/windowmacos.h"
#endif


Napi::Object InitAll(Napi::Env env, Napi::Object exports) {
	#ifdef _WIN32
		return windowwindows::Init(env, exports);
	#elif __linux
		return windowlinux::Init(env, exports);
	#elif __APPLE__
		return windowmacos::Init(env, exports);
	#endif
}

NODE_API_MODULE(testaddon, InitAll)
