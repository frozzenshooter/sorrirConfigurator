import { Paper } from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import './DegradationLevelConfigurationView.css';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    degradationLevelConfigurationViewPaper: {
        height: "100%",
    }
  }),
);

const DegradationLevelConfigurationView = () => {

    const classes = useStyles()

    return (
        <div id="degradation-level-configuration-view-container">
            <Paper className={classes.degradationLevelConfigurationViewPaper}>

            </Paper>
        </div>
    );
}

export default DegradationLevelConfigurationView;
