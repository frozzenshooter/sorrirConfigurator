import React from 'react';
import { IStepperViewProps, IViewProps } from '../wizard/Wizard';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MoreIcon from '@material-ui/icons/MoreVert';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { DecisionDialog } from '../decisionDialog/DecisionDialog';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { AvailableViews, ResolveViewLabel } from '../AvailableViews';
import Paper from '@material-ui/core/Paper';

// Local imports 

import './DegradationConfigurationView.css';
import { DegradationGraph } from './DegradationGraph';
import { DegradationLevelDialog, DegradationLevelDialogType } from './DegradationLevelDialog';
import IConfiguration from '../../interfaces/IConfiguration';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
        grow: {
            flexGrow: 1,
        },
        title: {            
            flexGrow: 1,
        },
        appBarSpacer: theme.mixins.toolbar
    })
);

export interface IDegradationConfigurationViewProps extends IStepperViewProps {
    configuration: IConfiguration;
}


/**
 * View for configuration of the degraadation levels 
 *
 */
export const DegradationConfigurationView = (props: IDegradationConfigurationViewProps) => {

    const {showView, handleConfigurationUpdate, views, configuration} = props;

    const classes = useStyles();

    const handleStep = (index: number) => {
        showView(views[index]);
    }

    // State for the menu
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [isConfigurationResetDialogOpen, setIsConfigurationResetDialogOpen] = React.useState<boolean>(false);

    const handleMoreButtonClicked = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
  
    const handleCloseMoreMenu = () => {
        setAnchorEl(null);
    };

    const handleResetConfiguration = () => {
        setAnchorEl(null);
        setIsConfigurationResetDialogOpen(true);
    };

    const resetConfiguration = () => {
        // This will reset the configuration when the user starts a new configuration on the WelcomeView
        showView(AvailableViews.WelcomeView);
    };

    // State for DegradationLevelDialog
    const [degradationLevelCreateDialogOpen, setdegradationLevelCreateDialogOpen] = React.useState<boolean>(false);

    const handleDegradationLevelCreateDialogCancel = () => {
        setdegradationLevelCreateDialogOpen(false);
    }

    const handleDegradationLevelCreateDialogSave = () => {
        setdegradationLevelCreateDialogOpen(false);
    }

    // Logic for DegradationLevel creation, updated and deletion

    const handleCreateDegradationLevel = () => {
        setdegradationLevelCreateDialogOpen(true);
    }

    const handleEditDegradationLevel = () => {
        //TODO: implement own dialog
        setdegradationLevelCreateDialogOpen(true);
    }

    const handleDeleteDegradationLevel = () => {
        //TODO implement own dialog
        setdegradationLevelCreateDialogOpen(true);
    }

    return (
        <div id="degradation-configuration-container">
            <AppBar position="fixed">
                <Toolbar>
                    <Typography className={classes.title} variant="h6" noWrap>
                        {ResolveViewLabel(AvailableViews.DegradationConfigurationView)}
                    </Typography>
                    <IconButton edge="end" color="inherit" onClick={handleMoreButtonClicked}>
                        <MoreIcon />
                    </IconButton>
                    <Menu
                        anchorEl={anchorEl}
                        anchorOrigin={
                            {
                                vertical: 'top',
                                horizontal: 'right',
                            }
                        }
                        keepMounted
                        transformOrigin={
                            {
                                vertical: 'top',
                                horizontal: 'right',
                            }
                        }
                        open={Boolean(anchorEl)}
                        onClose={handleCloseMoreMenu}
                    >
                        <MenuItem onClick={handleResetConfiguration}>Reset configuration</MenuItem>
                    </Menu>

                </Toolbar>
            </AppBar>
            <DecisionDialog
                handleAccept={resetConfiguration}
                handleCancel={() => {setIsConfigurationResetDialogOpen(false);}}
                isOpen={isConfigurationResetDialogOpen}
                title={"Reset configuration"}
                text={"Confirm the reset of the current configuration. All unsaved data will be deleted!"}
            />
            <div className={classes.appBarSpacer}></div>
            <div id="degradation-configuration-stepper-container">
                    <Stepper elevation={1} square={false} className={classes.grow} nonLinear activeStep={views.findIndex(v => v === AvailableViews.DegradationConfigurationView)}>
                        {views.map((view, index) => (
                            <Step key={ResolveViewLabel(view)}>
                                <StepButton onClick={() => {handleStep(index);}}>
                                    {ResolveViewLabel(view)}
                                </StepButton>
                            </Step>
                        ))}
                    </Stepper>
            </div>
            <div id="degradation-configuration-flow-graph">
                <Paper id="degradation-configuration-flow-graph-paper">
                    <DegradationGraph 
                        createDegradationLevel={handleCreateDegradationLevel}
                        deleteDegradationLevel={handleDeleteDegradationLevel}
                        editDegradationLevel={handleEditDegradationLevel}
                        />
                </Paper>
            </div>
            <DegradationLevelDialog
                type={DegradationLevelDialogType.Create}
                configuration={configuration}
                isOpen={degradationLevelCreateDialogOpen}
                handleCancel={handleDegradationLevelCreateDialogCancel}
                handleSave={handleDegradationLevelCreateDialogSave}
            />

        </div>

    );
 }
