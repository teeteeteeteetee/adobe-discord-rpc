#include <stdio.h>

#include <errno.h>
#include <stdlib.h>
#include <string.h>
#include <sys/stat.h>
#include <sys/types.h>
#include <unistd.h>

bool Mkdir(const char* path) {
  int result = mkdir(path, 0755);
  if (result == 0) 
    return true;
  if (errno == EEXIST)
    return true;
  return false;
}

extern "C" bool Register(const char* scheme, const char* command) {
  // Add a desktop file and update some mime handlers so that xdg-open does the right thing.
  const char* home = getenv("HOME");
  if (!home)
    return false;

  char exePath[1024];
  if (!command || !command[0]) {
    if (readlink("/proc/self/exe", exePath, sizeof(exePath)) <= 0)
      return false;
    command = exePath;
  }

  const char* destopFileFormat = "[Desktop Entry]\n"
                                 "Name=Game %s\n"
                                 "Exec=%s %%u\n" // note: it really wants that %u in there
                                 "Type=Application\n"
                                 "NoDisplay=true\n"
                                 "MimeType=x-scheme-handler/%s;\n";

  char desktopFile[2048];
  int fileLen = snprintf(
    desktopFile, sizeof(desktopFile), destopFileFormat, scheme, command, scheme);

  if (fileLen <= 0)
      return false;

  char desktopFilename[256];
  snprintf(desktopFilename, sizeof(desktopFilename), "/%s.desktop", scheme);

  char desktopFilePath[1024];
  snprintf(desktopFilePath, sizeof(desktopFilePath), "%s/.local", home);
  if (!Mkdir(desktopFilePath))
    return false;

  strcat(desktopFilePath, "/share");
  if (!Mkdir(desktopFilePath))
    return false;

  strcat(desktopFilePath, "/applications");
  if (!Mkdir(desktopFilePath))
    return false;

  strcat(desktopFilePath, desktopFilename);

  FILE* fp = fopen(desktopFilePath, "w");
  if (fp) {
    fwrite(desktopFile, 1, fileLen, fp);
    fclose(fp);
  } else {
    return false;
  }

  char xdgMimeCommand[1024];
  snprintf(xdgMimeCommand,
           sizeof(xdgMimeCommand),
           "xdg-mime default %s.desktop x-scheme-handler/%s",
           scheme,
           scheme);

  if (system(xdgMimeCommand) < 0)
    return false;

  return false;
}
