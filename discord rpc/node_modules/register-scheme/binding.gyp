{
  "targets": [
    {
      "target_name": "register-protocol-handler",
      "target_type": "static_library",
      "cflags!": [ "-fno-exceptions" ],
      "cflags_cc!": [ "-fno-exceptions" ],
      "sources": [
        "src/addon.cc",
      ],
      'conditions': [
         ['OS == "win"', {
          'sources': [
            'src/register_win.cpp',
          ],
        }],
        ['OS == "linux"', {
          'sources': [
            'src/register_linux.cpp',
          ],
        }],
        ['OS == "mac"', {
          'sources': [
            'src/register_mac.m',
          ],
          'defines': ['__MACOSX_CORE__'],
          'link_settings': {
            'libraries': [
              '-framework Foundation'
            ],
          },
          'xcode_settings': {
            'CLANG_CXX_LIBRARY': 'libc++',
            'OTHER_CFLAGS': [
              '-ObjC++',
              '-std=c++11'
            ],
          },
        }],
      ],
      "include_dirs": [
        "<!@(node -p \"require('node-addon-api').include\")",
      ],
      'dependencies': [
        "<!(node -p \"require('node-addon-api').gyp\")",
      ],
      "defines": [ 'NAPI_DISABLE_CPP_EXCEPTIONS' ],
    }
  ]
}
