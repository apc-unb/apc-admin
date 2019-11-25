import React from "react";
import Header from "../../components/Header";
import GetNews from "../../components/News/GetNews";
import CreateNews from "../../components/News/CreateNews";
import GetStudents from "../../components/SchoolClass/GetStudents";
import CreateProjectType from "../../components/ProjectType/CreateProjectType";
import GetProjectType from "../../components/ProjectType/GetProjectType";
import CreateStudent from "../../components/SchoolClass/CreateStudent";
import CreateAdmin from "../../components/Admin/CreateAdmin";
import GetAdmins from "../../components/Admin/GetAdmins";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Link from "@material-ui/core/Link";
import "./style.css";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="#">
        DraGon T
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  toolbar: {
    paddingRight: 24 // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: 36
  },
  menuButtonHidden: {
    display: "none"
  },
  title: {
    flexGrow: 1
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9)
    }
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    marginTop: theme.spacing(2),
    flexGrow: 1,
    height: "100vh",
    overflow: "auto"
  },
  container: {
    marginTop: theme.spacing(6),
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4)
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column"
  },
  fixedHeight: {
    maxHeight: 755
  }
}));

function Home() {
  const classes = useStyles();
  const admin_data = JSON.parse(sessionStorage.getItem("admin"));
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
    <div className={classes.root}>
      <Header />
      <main className={classes.content}>
        <div className={classes.appBarSpacer}>
          <Container maxWidth="lg" className={classes.container}>
            <Grid container spacing={3}>
              {/* News */}
              <Grid item xs={12} md={5} lg={4}>
                <Paper className={fixedHeightPaper}>
                  <CreateNews />
                </Paper>
              </Grid>
              <Grid item xs={12} md={7} lg={8}>
                <Paper className={fixedHeightPaper}>
                  <GetNews />
                </Paper>
              </Grid>
              {/* Students */}
              <Grid item xs={12} md={6} lg={7}>
                <Paper className={fixedHeightPaper}>
                  <GetStudents />
                </Paper>
              </Grid>
              <Grid item xs={12} md={6} lg={5}>
                <Paper className={fixedHeightPaper}>
                  <CreateStudent />
                </Paper>
              </Grid>
              {/* Projects */}
              {admin_data.admin.professor === true && (
                <>
                  <Grid item xs={12} md={6} lg={5}>
                    <Paper className={fixedHeightPaper}>
                      <CreateProjectType />
                    </Paper>
                  </Grid>
                  <Grid item xs={12} md={6} lg={7}>
                    <Paper className={fixedHeightPaper}>
                      <GetProjectType />
                    </Paper>
                  </Grid>
                </>
              )}
              {/* Admins */}
              {admin_data.admin.professor === true && (
                <>
                  <Grid item xs={12} md={6} lg={7}>
                    <Paper className={fixedHeightPaper}>
                      <GetAdmins />
                    </Paper>
                  </Grid>
                  <Grid item xs={12} md={6} lg={5}>
                    <Paper className={fixedHeightPaper}>
                      <CreateAdmin />
                    </Paper>
                  </Grid>
                </>
              )}
            </Grid>
          </Container>
          <Copyright />
        </div>
      </main>
    </div>
  );
}

export default Home;
