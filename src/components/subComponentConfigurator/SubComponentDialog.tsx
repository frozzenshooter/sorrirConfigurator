import React from 'react';
import Dialog, { DialogProps } from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';

import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import ISubComponent from '../../interfaces/ISubComponent';
import ChipCreator from '../chipCreator/ChipCreator';
import IShadowmode from '../../interfaces/IShadowmode';
import './SubComponentDialog.css';

/**
 * Styles for the subcomponent dialog
 * 
 * @param theme 
 * @returns 
 */
const styles = (theme: Theme) => createStyles({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

/**
 * Properties for the @SubComponentDialog
 */
interface ISubComponentDialogTitleProps extends WithStyles<typeof styles> {
    id: string;
    children: React.ReactNode;
    onClose: () => void;
}

/**
 * Title for the @SubComponentDialog
 */
const SubComponentDialogTitle = withStyles(styles)((props: ISubComponentDialogTitleProps) => {
    const { children, classes, onClose, ...other } = props;
    return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
        <Typography variant="h6">{children}</Typography>
        {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
            <CloseIcon />
        </IconButton>
        ) : null}
    </MuiDialogTitle>
    );
});

/**
 * Content of the @SubComponentDialog
 */
const SubComponentDialogContent = withStyles((theme: Theme) => ({
    root: {
    padding: theme.spacing(2),
    },
}))(MuiDialogContent);

/**
 * Styles for the dialog actions
 */
const SubComponentDialogActions = withStyles((theme: Theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
    },
}))(MuiDialogActions);

/**
 * The different SubComponentDialog-Types
 */
export enum SubComponentDialogType {    
    Create = 0,
    Edit = 1
}

/**
 * Properties for the @SubComponentDialog
 */
export interface ISubComponentDialogProps{
    type: SubComponentDialogType;
    open: boolean;
    error: string;
    subComponent: ISubComponent;
    onSubComponentChange: (subComponent: ISubComponent) => void;
    onAbort: () => void;
    onSaveClose: () => void;
}

/**
 * The subcomponent dialog allows to create and edit a subcomponent
 * 
 * @param props 
 * @returns 
 */
export function SubComponentDialog(props: ISubComponentDialogProps){

    const {type, open, error, onAbort, onSaveClose, subComponent, onSubComponentChange} = props;

    const handleChipCreation = (shadowmodeToCreate: IShadowmode) => {
        const chipExisting = subComponent.shadowmodes.findIndex(shadowmode => shadowmode.id === shadowmodeToCreate.id);
        
        if(chipExisting === -1){

            const newShadowModes : IShadowmode[] = subComponent.shadowmodes.slice();
            newShadowModes.push(
            {
                id: shadowmodeToCreate.id,
                name: shadowmodeToCreate.name
            });

            const newSubComponentState : ISubComponent = {
                id: subComponent.id,
                name: subComponent.name,
                shadowmodes: newShadowModes 
            };

            onSubComponentChange(newSubComponentState);            
        }
    };

    const handleChipDeletion = (shadowmodeToDelete: IShadowmode) => {
        const newShadowModes = subComponent.shadowmodes.filter(shadowmode => shadowmode.id !== shadowmodeToDelete.id ).slice();

        const newSubComponentState : ISubComponent = {
            id: subComponent.id,
            name: subComponent.name,
            shadowmodes: newShadowModes 
        };

        onSubComponentChange(newSubComponentState);  
    };

    const handleIDInput = (ev : React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const newSubComponentState : ISubComponent = {
            id: ev.target.value,
            name: subComponent.name,
            shadowmodes: subComponent.shadowmodes 
        };

        onSubComponentChange(newSubComponentState);  
    };

    const handleNameInput = (ev : React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const newSubComponentState : ISubComponent = {
            id: subComponent.id,
            name: ev.target.value,
            shadowmodes: subComponent.shadowmodes 
        };

        onSubComponentChange(newSubComponentState);
    };

    return (
            <Dialog 
                onClose={onAbort} 
                aria-labelledby="customized-dialog-title"
                open={open} 
                fullWidth={true}
                maxWidth={'md' as DialogProps['maxWidth']}>
                <SubComponentDialogTitle id="customized-dialog-title" onClose={onAbort}>
                    {type === SubComponentDialogType.Create ? "Create new subcomponent" : "Edit subcomponent"}
                </SubComponentDialogTitle>
                <SubComponentDialogContent dividers>  
                    {error !== ""? <div id="subcomponent-dialog-error-container"><ErrorOutlineIcon id="subcomponent-dialog-error-icon"/> {error} </div> : ""}
                    <div id="subcomponent-dialog-content-container">            
                        <TextField 
                            disabled ={type === SubComponentDialogType.Edit ? true : false}
                            id="id"
                            label="ID" 
                            value={subComponent.id}
                            onChange={handleIDInput}
                            className="subcomponent-dialog-content-container-item"/>
                        <TextField 
                            id="name"
                            label="Name"
                            value={subComponent.name}
                            onChange={handleNameInput}
                            className="subcomponent-dialog-content-container-item"/>
                        <ChipCreator
                            shadowmodes={subComponent.shadowmodes}
                            handleChipCreation={handleChipCreation}
                            handleChipDeletion={handleChipDeletion}
                        />
                    </div>    
                </SubComponentDialogContent>
                <SubComponentDialogActions>
                    <Button autoFocus onClick={onSaveClose} color="primary">
                        Save changes
                    </Button>
                    <Button onClick={onAbort} color="secondary">
                        Close
                    </Button>
                </SubComponentDialogActions>
            </Dialog>
    );
}