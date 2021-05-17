import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import SaveIcon from '@material-ui/icons/Save';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';
import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { DecisionDialog } from '../decisionDialog/DecisionDialog';
import IConfiguration from '../../interfaces/IConfiguration';

export enum DegradationLevelDialogType {
    Create = 0,
    Edit = 1
}

/**
 * Styles for the @DecisionDialog
 */
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
        title: {            
            flexGrow: 1,
        },
        appBarSpacer: theme.mixins.toolbar
    })
);


/**
 * Properties for the @DecisionDialog
 */
export interface IDegradationLevelDialogProps{
    degradationLevelName?: string,
    type: DegradationLevelDialogType,
    configuration: IConfiguration,
    isOpen: boolean;
    handleSave: () => void;
    handleCancel: () => void;
}

/**
 * Transition of the dialog to slide in from the topside 
 */
const Transition = React.forwardRef(function Transition(
    props: TransitionProps & { children?: React.ReactElement },
    ref: React.Ref<unknown>,
  ) {
    return <Slide direction="down" ref={ref} {...props} />;
  }
);


export const DegradationLevelDialog = (props: IDegradationLevelDialogProps) => {

    const {configuration, degradationLevelName, type, isOpen, handleSave, handleCancel } = props;

    const classes = useStyles();

    // Title generation
    let title = "";

    if(type === DegradationLevelDialogType.Create){
        title += "Create";
    }else if(type === DegradationLevelDialogType.Edit){
        title += "Edit";
        if(degradationLevelName !== null){
            title = title + " - " + degradationLevelName;
        }
    }

    // Cancel confirmation dialog
    const [cancelConfirmationDialogOpen, setCancelConfirmationDialogOpen] = React.useState<boolean>(false);

    const handleCloseIconClicked = () => {
        setCancelConfirmationDialogOpen(true);
    }

    const handleCancelConfirmationDialogAccept = () => {
        setCancelConfirmationDialogOpen(false);
        handleCancel();
    }

    const handleCancelConfirmationDialogCancel = () => {
        setCancelConfirmationDialogOpen(false);
    }

    return (
        <Dialog
            fullScreen={true}
            open={isOpen}
            onClose={handleCancel}
            TransitionComponent={Transition}
            >
                <AppBar position="fixed">
                    <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={handleCloseIconClicked}>
                        <CloseIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        {title}
                    </Typography>
                    <IconButton edge="end" color="inherit" onClick={handleSave}>
                        <SaveIcon />
                    </IconButton>

                    </Toolbar>
                </AppBar>
                <div className={classes.appBarSpacer}></div>
                <div>
                    CONTENT
                </div>
                 {configuration.subComponents.map(subComponent => {
                     return (<div className="test"> <div>{subComponent.id}</div> <div>{subComponent.name}</div> </div>);
                 })}
                <DecisionDialog
                    isOpen={cancelConfirmationDialogOpen}
                    handleAccept={handleCancelConfirmationDialogAccept}
                    handleCancel={handleCancelConfirmationDialogCancel}
                    text={"All changes will be discarded!"}
                    title={"Discard changes?"}
                />
        </Dialog>
    );    
}