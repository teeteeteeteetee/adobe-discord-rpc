{
  "targets": [
    {
      "target_name": "wm",
      "sources": [ "cppsrc/main.cpp"],
      "cflags": ["-fexceptions -std=c++11"],
      "cflags_cc": ["-fexceptions"],
      'conditions': [
         ['OS=="linux"', {
           'sources': ["cppsrc/main.cpp", "cppsrc/linux/windowlinux.cpp"],
           'libraries': [
               "-lX11",
               "-lXss",
               "-lxcb"
             ],
             'cflags': ["-fexceptions -std=c++11 -lX11 -lXext -lXss"],
             'cflags_cc': ["-fexceptions -lX11 -lXext -lXss"],
           }
         ],
         ['OS=="win"', {
           'sources': ["cppsrc/main.cpp", "cppsrc/windows/windowwindows.cpp"]
            }
         ],
         ['OS=="mac"', {
           'sources': ["cppsrc/main.cpp", "cppsrc/macos/windowmacos.cpp"],
           'xcode_settings': {
             'GCC_ENABLE_CPP_EXCEPTIONS': 'YES'
           }
         }
         ],
      ],
      'include_dirs': [
           "<!@(node -p \"require('node-addon-api').include\")"
       ],
      'dependencies': [
         "<!(node -p \"require('node-addon-api').gyp\")"
       ],
       'defines': [ 'NAPI_DISABLE_CPP_EXCEPTIONS' ]
    },
  ]
}
