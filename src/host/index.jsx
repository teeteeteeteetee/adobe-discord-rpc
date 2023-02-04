// if (typeof($) == 'undefined')
//     $ = {}

// $._ext = {
//     //Evaluate a file and catch the exception.
//     evalFile: function(path) {
//         try {
//             $.evalFile(path);
//         } catch (e) {
//             alert("Exception:" + e)
//         }
//     },
//     // Evaluate all the files in the given folder
//     evalFiles: function(jsxFolderPath) {
//         var folder = new Folder(jsxFolderPath)
//         if (folder.exists) {
//             var jsxFiles = folder.getFiles("*.jsx")
//             for (var i = 0; i < jsxFiles.length; i++) {
//                 var jsxFile = jsxFiles[i]
//                 $._ext.evalFile(jsxFile)
//                 console.log(jsxFile)
//             }
//         }
//     }
// }

function main(path) {
    try {
        $.evalFile(path);
    } catch (e) {
        alert("Exception:" + e)
    }
}

// // fileName is a String (with the .jsx extension included)
// function loadJSX(fileName) {
//     var csInterface = new CSInterface();
//     var extensionRoot = csInterface.getSystemPath(SystemPath.EXTENSION) + "/jsx/";
//     csInterface.evalScript('$.evalFile("' + extensionRoot + fileName + '")');
// }

// var extensionPath = $.fileName.split('/').slice(0, -1).join('/') + '/';
// alert(exceptionPath)

// try {
//     $.evalFile(extensionPath + "apps" + "/PHXS.jsx");
// } catch (e) {
//     alert("Exception:" + e)
// }