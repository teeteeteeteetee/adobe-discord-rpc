#include <stdio.h>
#include <sys/stat.h>

#import <AppKit/AppKit.h>

#include "register.h"

static bool RegisterURL(const char* scheme) {
  char url[256];
  snprintf(url, sizeof(url), "%s", scheme);
  CFStringRef cfURL = CFStringCreateWithCString(NULL, url, kCFStringEncodingUTF8);

  NSString* myBundleId = [[NSBundle mainBundle] bundleIdentifier];
  if (!myBundleId)
    return false;

  NSURL* myURL = [[NSBundle mainBundle] bundleURL];
  if (!myURL)
    return false;

  OSStatus status = LSSetDefaultHandlerForURLScheme(cfURL, (__bridge CFStringRef)myBundleId);
  if (status != noErr)
    return false;

  status = LSRegisterURL((__bridge CFURLRef)myURL, true);
  if (status != noErr)
    return false;

  return true;
}

bool Register(const char* scheme, const char* command) {
  // raii lite
  @autoreleasepool {
    return RegisterURL(scheme);
  }
}
