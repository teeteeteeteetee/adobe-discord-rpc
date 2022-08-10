import React from "react";

import "./styles.css";
import { PanelController } from "./controllers/PanelController.jsx";
import { CommandController } from "./controllers/CommandController.jsx";
import { About } from "./components/About.jsx";
import { Demos } from "./panels/Demos.jsx";
import { MoreDemos } from "./panels/MoreDemos.jsx";

import { entrypoints } from "uxp";

const aboutController = new CommandController(({ dialog }) => <About dialog={dialog}/>, { id: "showAbout", title: "React Starter Plugin Demo", size: { width: 480, height: 480 } });
const demosController =  new PanelController(() => <Demos/>, {id: "demos", menuItems: [
    { id: "reload1", label: "Reload Plugin", enabled: true, checked: false, oninvoke: () => location.reload() },
    { id: "dialog1", label: "About this Plugin", enabled: true, checked: false, oninvoke: () => aboutController.run() },
] });
const moreDemosController =  new PanelController(() => <MoreDemos/>, { id: "moreDemos", menuItems: [
    { id: "reload2", label: "Reload Plugin", enabled: true, checked: false, oninvoke: () => location.reload() }
] });

entrypoints.setup({
    plugin: {
        create(plugin) {
            /* optional */ console.log("created", plugin);
        },
        destroy() {
            /* optional */ console.log("destroyed");
        }
    },
    commands: {
        showAbout: aboutController
    },
    panels: {
        demos: demosController,
        moreDemos: moreDemosController
    }
});
