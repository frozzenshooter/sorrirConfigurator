import { Paper } from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import React from 'react';
import './DegradationLevelConfigurationView.css';
import DegradationLevelDialog from './DegradationLevelDialog/DegradationLevelDialog';
import IDegradationLevel from '../../models/IDegradationLevel';
import DegradationLevelDialogType from './DegradationLevelDialog/DegradationLevelDialogType';
import SelectionMenuBar from '../selectionMenuBar/SelectionMenuBar';
import DegradationLevelDeleteDialog from './DegradationLevelDeleteDialog/DegradationLevelDeleteDialog';
import DegradationLevelHierarchyEditor, { DegradationLevelHierarchyEditorType } from '../degradationLevelHierarchyEditor/DegradationLevelHierarchyEditor';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    degradationLevelConfigurationViewPaper: {
        height: "100%",
    },
    height100: {
      height: "100%",
    }
  }),
);

const DegradationLevelConfigurationView = () => {

    const classes = useStyles()

    const [createDialogOpen, setCreateDialogOpen] = React.useState<boolean>(false);
    const [editDialogOpen, setEditDialogOpen] = React.useState<boolean>(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = React.useState<boolean>(false);
    const [selectedDegradationLevels, setSelectedDegradationLevel] = React.useState<IDegradationLevel[]>([]);

    const handleSelectionChanged = (selectedDegradationLevel: IDegradationLevel) => {

        const index = selectedDegradationLevels.findIndex(d => d.id === selectedDegradationLevel.id);
        let newSelectedDegradationLevels = selectedDegradationLevels.slice();
        if(index === -1){
            // add to the selected elements
            newSelectedDegradationLevels.push(selectedDegradationLevel);
        }else{
            // remove because it was selected
            newSelectedDegradationLevels = newSelectedDegradationLevels.filter(d => d.id !== selectedDegradationLevel.id);
        }

        setSelectedDegradationLevel(newSelectedDegradationLevels);
    };

    return (
      <>
        <div id="degradation-level-configuration-view-container">
            <Paper className={classes.degradationLevelConfigurationViewPaper}>
              <div id="degradation-level-configuration-graph-container">
                    <SelectionMenuBar
                        amountOfSelectedItems={selectedDegradationLevels.length}
                        onCreateClick={() =>{setCreateDialogOpen(true);}}
                        onEditClick={() =>{setEditDialogOpen(true);}}
                        onDeleteClick={() =>{setDeleteDialogOpen(true);}}
                        />
                    <DegradationLevelHierarchyEditor
                        onSelectionChanged={handleSelectionChanged}
                        selectedDegradationLevels={selectedDegradationLevels}
                        degradationLevelHierarchyEditorType={DegradationLevelHierarchyEditorType.Degradation}
                        />
              </div>
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

        {selectedDegradationLevels.length > 0 && deleteDialogOpen ?
            <DegradationLevelDeleteDialog
                open={deleteDialogOpen}
                degradationLevels={selectedDegradationLevels}
                onClose={() => {setDeleteDialogOpen(false);}} 
                onDeleteComplete={() => {
                  setDeleteDialogOpen(false); 
                  setSelectedDegradationLevel([]); 
                }}           
            />
            : 
            null
        }
      </>
    );
}

export default DegradationLevelConfigurationView;
