var app;

exports.run = activeApp;

function activeApp(x){
        switch(x){
                //AEFT
                case "AfterFX":
                    app = "AEFT";
                    break;

                //AICY
                case "InCopy":
                    app = "AICY";
                    break;
                //AUDT
                case "Adobe Audition":
                    app = "AUDT";
                    break;
                //FLPR
                case "Animate":
                    app = "FLPR";
                    break;
                //IDSN
                case "InDesign":
                    app = "IDSN";
                    break;
                //ILST
                case "Illustrator":
                    app = "ILST";
                    break;
                //PSXS & PHSP
                case "Photoshop":
                    app = "PHXS";
                    break;
                //PPRO
                case "Adobe Premiere Pro":
                    app = "PPRO";
                    break;
                //PRLD
                case "Adobe Prelude":
                    app = "PRLD";
                    break;
                //RUSH
                case "Adobe Premiere Rush":
                    app = "RUSH";
                    break;
                case "Adobe Media Encoder":
                    app = "MEDIA_ENCODER";
                    break;
            }
            return app
        }
      
