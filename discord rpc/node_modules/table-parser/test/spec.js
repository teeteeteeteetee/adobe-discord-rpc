var chai = require('chai');
var Assert = chai.assert;
var TableParser = require('../lib/index');
var FS = require('fs');
var Path = require('path');

var GetOutput = function (filename) {
  return FS.readFileSync(Path.resolve(__dirname, 'output/' + filename)).toString();
};

describe('tabler-parser', function () {

  it('a normal linux ps output', function () {
    var output = GetOutput('ps.log');
    var result = TableParser.parse(output);

    var expectResult = [
      {
        'PID': ['692'],
        'TTY': ['ttys000'],
        'TIME': ['0:00.06'],
        'CMD': ['login', '-pfl', 'neekey', '/bin/bash', '-c', 'exec', '-la', 'bash', '/bin/bash']
      },
      {
        'PID': ['49693'],
        'TTY': ['ttys000666'],
        'TIME': ['0:00.06'],
        'CMD': ['-bash']
      },
      {
        'PID': [''],
        'TTY': ['ttys000'],
        'TIME': ['0:47.81'],
        'CMD': ['/Users/neekey/Dropbox/nodejs/app/windTest/Redis/mac_linux/src/redis-server']
      },
      {
        'PID': ['52300'],
        'TTY': ['ttys001'],
        'TIME': ['0:00.05'],
        'CMD': ['login', '-pfl', 'neekey', '/bin/bash', '-c', 'exec', '-la', 'bash', '/bin/bash']
      }
    ];

    Assert.deepEqual(result, expectResult);
  });

  it('a windows output', function () {
    var output = GetOutput('wmic.log');
    var result = TableParser.parse(output);

    var expectResult = [
      {
        'CommandLine': ['just', 'test', '"dummy'],
        'Description': ['System', 'Idle', 'Process'],
        'OSName': ['Microsoft', 'Windows', 'XP', 'Professional|C:\\WINDOWS|\\Device\\Harddisk0\\Partition1'],
        'ProcessId': ['0']
      },
      {
        'CommandLine': ['C:\\Program Files\\Parallels\\Parallels Tools\\Services\\prl_tools.exe', 'aaa', '--hello'],
        'Description': ['System'],
        'OSName': ['Microsoft', 'Windows', 'XP', 'Professional|C:\\WINDOWS|\\Device\\Harddisk0\\Partition2'],
        'ProcessId': ['4']
      },
      {
        'CommandLine': ['\\SystemRoot\\System32\\smss.exe'],
        'Description': ['smss.exe'],
        'OSName': ['Microsoft', 'Windows', 'XP', 'Professional|C:\\WINDOWS|\\Device\\Harddisk0\\Partition3'],
        'ProcessId': ['532']
      },
      {
        'CommandLine': ['C:\\WINDOWS\\system32\\csrss.exe', 'ObjectDirectory="\\Windows SharedSection"=1024,3072,512', 'Windows=On', 'SubSystemType=Windows', 'ServerDll=basesrv,1', 'ServerDll=winsrv:UserServerDllInitialization,3', 'ServerDll=winsrv:ConServerDllInitialization,2', 'ProfileControl=Off', 'MaxRequestThreads=16'],
        'Description': ['csrss.exe'],
        'OSName': ['Microsoft', 'Windows', 'XP', 'Professional|C:\\WINDOWS|\\Device\\Harddisk0\\Partition4'],
        'ProcessId': ['596']
      },
      {
        'CommandLine': ['winlogon.exe'],
        'Description': ['winlogon.exe'],
        'OSName': ['Microsoft', 'Windows', 'XP', 'Professional|C:\\WINDOWS|\\Device\\Harddisk0\\Partition5'],
        'ProcessId': ['624']
      }
    ];

    Assert.deepEqual(result, expectResult);
  });

  it('windows wmic EOL as \r', function () {
    var output = GetOutput('windows-wmic.log');
    var result = TableParser.parse(output);
    Assert.equal(result.length > 0, true);
  });

  it('should work for `aux`', function() {
    var output = GetOutput('auxlog.log');
    var result = TableParser.parse(output);
    Assert.equal(result.length > 0, true);
    result.forEach(function(ret) {
      Assert.equal(ret.PID.length, 1);
      Assert.equal(ret.USER.length, 1);
      Assert.equal(/^\d+$/.test(ret.PID), true);
      Assert.equal(/^\w+$/.test(ret.USER), true);
    });
  });
});
