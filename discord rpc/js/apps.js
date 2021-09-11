function getAppName(_appID) {

    var appID;

    switch (_appID) {
        case "AEFT":
            appID = "After Effects"
            break;
        case "AICY":
            appID = "InCopy"
            break;
        case "AUDT":
            appID = "Audition"
            break;
        case "DRWV":
            appID = "Dreamweaver"
            break;
        case "FLPR":
            appID = "Animate"
            break;
        case "IDSN":
            appID = "InDesign"
            break;
        case "ILST":
            appID = "Illustrator"
            break;
        case "PHSP":
        case "PHXS":
            appID = "Photoshop"
            break;
        case "PPRO":
            appID = "Premiere Pro"
            break;
        case "PRLD":
            appID = "Prelude"
            break;
        case "RUSH":
            appID = "Premiere Rush"
            break;
    }

    return appID

}