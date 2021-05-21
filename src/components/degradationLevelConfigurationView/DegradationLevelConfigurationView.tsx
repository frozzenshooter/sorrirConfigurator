import { Button, Paper } from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import React from 'react';
import './DegradationLevelConfigurationView.css';
import DegradationLevelDialog, { DegradationLevelDialogType } from './DegradationLevelDialog/DegradationLevelDialog';
import IDegradationLevel from '../../models/IDegradationLevel';

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
    const [editDialogOpen, setEditDialogOpen] = React.useState<boolean>(false);
    const [selectedDegradationLevels, setSelectedDegradationLevel] = React.useState<IDegradationLevel[]>([ {
      id: 1,
      label: "d1",
      dependencies: []
    }]);

    return (
      <>
        <div id="degradation-level-configuration-view-container">
            <Paper className={classes.degradationLevelConfigurationViewPaper}>
              <Button
                onClick={() => {setCreateDialogOpen(true);}}
              >
                Create
              </Button>
              <Button
                onClick={() => {setEditDialogOpen(true);}}
              >
                Edit
              </Button>
              <Button
                onClick={() => {
                  const d1 :IDegradationLevel = {
                    id: 1,
                    label: "d1",
                    dependencies: []
                  };
                  const d2 :IDegradationLevel = {
                    id: 2,
                    label: "d2",
                    dependencies: []
                  };

                  if(selectedDegradationLevels[0].id === 1){
                    console.log("Swap: ", [d2]);
                    setSelectedDegradationLevel([d2]);

                  }else{
                    console.log("Swap: ", [d1]);
                    setSelectedDegradationLevel([d1]);
                  }
                }}
              >
                Swap Edit
              </Button>
              
            </Paper>
        </div>

        <DegradationLevelDialog 
          open={createDialogOpen}
          type={DegradationLevelDialogType.Create}
          onClose={() => {setCreateDialogOpen(false);}}
        />

        {selectedDegradationLevels.length === 1 && editDialogOpen? 

            <DegradationLevelDialog 
              open={editDialogOpen}
              type={DegradationLevelDialogType.Edit}
              degradationLevel={selectedDegradationLevels[0]}
              onClose={() => {setEditDialogOpen(false);}}
              />
          : 
            null
        }
      </>
    );
}

export default DegradationLevelConfigurationView;
