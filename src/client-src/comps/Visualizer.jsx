/**
 * @author Tomer Riko Shalev
 * @modified by Tee
 */

import React from "react";
import Paper from "@material-ui/core/Paper";

import Grid from "@material-ui/core/Grid";
import withStyles from "@material-ui/core/styles/withStyles";
import ButtonBase from "@material-ui/core/ButtonBase";
import Container from "@material-ui/core/Container";
import Avatar from "@material-ui/core/Avatar";

const styles = (theme) => ({
    root: {
        paddingTop: theme.spacing.unit * 1,
    },
    paper: {
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#7289da",
        borderRadius: "25px",
    },
    avatar: {
        width: "80px",
        height: "80px",
        borderStyle: "solid",
        borderColor: "rgba(0, 0, 0)",
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
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <Container fixed>
                    <Paper elevation={5} className={classes.paper}>
                        <div style={{margin: "24px", justifyContent: "center"}}>
                            <Avatar
                                alt="avatar"
                                src="https://cdn.discordapp.com/avatars/223882126020444160/ead18c39086cb8d2fed1ea3d2d3b264b.webp?size=2048"
                                className={classes.avatar}
                            />
                            <h1>Tee#0001</h1>
                        </div>
                        <h1>PLAYING A GAME</h1>
                        <Grid
                            container
                            spacing={8}
                            direction="row"
                            justify="center"
                            alignItems="flex-start"
                        >
                            <Grid item xs={2}>
                                <Grid item>
                                    <ButtonBase>
                                        <img />
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

                        {/* <a href="" onClick={cep.util.openURLInDefaultBrowser('https://github.com/lolitee/adobe-discord-rpc')} target={"_blank"}>
                            Repository
                        </a> */}
                    </Paper>
                </Container>
            </div>
        );
    }
}

export default withStyles(styles)(Visualizer);
