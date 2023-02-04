/**
 * @author Tomer Riko Shalev
 * @modified by Tee
 */

import React from "react";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";

import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import withStyles from "@material-ui/core/styles/withStyles";
import ButtonBase from '@material-ui/core/ButtonBase';
import Avatar from "@material-ui/core/Avatar";

import PluginItem from "./PluginItem.jsx";
import BrowseItem from "./BrowseItem.jsx";

const styles = (theme) => ({
    root: {
        paddingTop: theme.spacing.unit * 1,
    },
    paper: {
        display: "flex",
        flexDirection: "column",
    },
    export: {
        margin: theme.spacing.unit * 3,
        alignSelf: "flex-end",
    },
});

/**
 * Visualizer tab content
 *
 */
class Visualizer extends React.Component {
    constructor() {
        super();
    }

    render() {
        const { user } = this.props;

        return (
            <div>
                <Paper elevation={5}>
                    <Avatar 
                        alt="tee"
                        src="https://cdn.discordapp.com/avatars/223882126020444160/ead18c39086cb8d2fed1ea3d2d3b264b.webp?size=80"
                        sx={{ width: 256, height: 256 }}
                        />
                    <h1>PLAYING A GAME</h1>
                    <Grid container
                        spacing={8}
                        direction="row"
                        justify="center"
                        alignItems="flex-start">
                        <Grid item xs={2}>
                            <Grid item>
                                <ButtonBase>
                                    <img/>
                                </ButtonBase>
                            </Grid>
                        </Grid>
                        <Grid item xs={8}>
                            <h1>After Effects</h1>
                            <p>state</p>
                            <p>detail</p>
                            <p>00:00 elapsed</p>
                        </Grid>
                    </Grid>

                    <Button
                        size="small"
                    >
                        Force Reconnect
                    </Button>
                    {/* <a href="" onClick={cep.util.openURLInDefaultBrowser('https://github.com/lolitee/adobe-discord-rpc')} target={"_blank"}>
                        Repository
                    </a> */}
                </Paper>
            </div>
        );
    }
}

export default withStyles(styles)(Visualizer);
