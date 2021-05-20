import { Button, Paper } from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import React from 'react';
import './DegradationLevelConfigurationView.css';
import DegradationLevelDialog from './DegradationLevelDialog/DegradationLevelDialog';
import DegradationLevelDialogType from './DegradationLevelDialog/DegradationLevelDialogType';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    degradationLevelConfigurationViewPaper: {
        height: "100%",
    }
  }),
);

const DegradationLevelConfigurationView = () => {

    const classes = useStyles()

    const [createDialogOpen, setCreateDialogOpen] = React.useState<boolean>(false);

    return (
      <>
        <div id="degradation-level-configuration-view-container">
            <Paper className={classes.degradationLevelConfigurationViewPaper}>
              <Button
                onClick={() => {setCreateDialogOpen(true);}}
              >
                Create
              </Button>
            </Paper>
        </div>

        <DegradationLevelDialog 
          open={createDialogOpen}
          onClose={() => {setCreateDialogOpen(false);}}
        />
      </>
    );
}

export default DegradationLevelConfigurationView;
