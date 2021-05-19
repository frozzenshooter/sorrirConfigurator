import { Paper } from "@material-ui/core";
import ConfigurationFileImport from "./ConfigurationFileImport/ConfigurationFileImport";
import './ImportView.css';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';



const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    importViewPaper: {
        padding: theme.spacing(3),
    },
  }),
);


const ImportView = () => {

    const classes = useStyles();

    return (
        <div id="import-view-container">
            <Paper elevation={1} className={classes.importViewPaper}>
                <ConfigurationFileImport/>
            </Paper>
        </div>
    );
}

export default ImportView;