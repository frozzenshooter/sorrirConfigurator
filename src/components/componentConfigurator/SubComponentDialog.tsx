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

import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import ISubcomponent from '../../interfaces/ISubcomponent';
import ChipCreator from '../chipCreator/ChipCreator';
import IShadowmode from '../../interfaces/IShadowmode';
import './SubComponentDialog.css';


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

interface SubComponentDialogTitleProps extends WithStyles<typeof styles> {
    id: string;
    children: React.ReactNode;
    onClose: () => void;
}

const SubComponentDialogTitle = withStyles(styles)((props: SubComponentDialogTitleProps) => {
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

const SubComponentDialogContent = withStyles((theme: Theme) => ({
    root: {
    padding: theme.spacing(2),
    },
}))(MuiDialogContent);

const SubComponentDialogActions = withStyles((theme: Theme) => ({
root: {
  margin: 0,
  padding: theme.spacing(1),
},
}))(MuiDialogActions);

export enum SubComponentDialogType {    
    Create = 0,
    Edit = 1
}

export interface SubComponentDialogProps{
    type: SubComponentDialogType;
    open: boolean;
    subcomponent: ISubcomponent;
    onAbort: () => void;
    onSaveClose: (subComponentToSave: ISubcomponent) => void;
}

export function SubComponentDialog(props: SubComponentDialogProps){

    const {type, open, onAbort, onSaveClose, subcomponent} = props;

    // Dialog can be used as Edit and Create Dialog
    let initalSubComponent: ISubcomponent = subcomponent;
    if(type === SubComponentDialogType.Create){
        initalSubComponent = {
            id: "123",
            name: "123",
            shadowmodes: []
        };
    }

    const [subcomponentState, setSubComponent] = React.useState<ISubcomponent>(initalSubComponent);

    const handleChipCreation = (shadowmodeToCreate: IShadowmode) => {
        const chipExisting = subcomponentState.shadowmodes.findIndex(shadowmode => shadowmode.id === shadowmodeToCreate.id);
        
        if(chipExisting === -1){

            const newShadowModes : IShadowmode[] = subcomponentState.shadowmodes.slice();
            newShadowModes.push(
            {
                id: shadowmodeToCreate.id,
                name: shadowmodeToCreate.name
            });

            const newSubComponentState : ISubcomponent = {
                id: subcomponentState.id,
                name: subcomponentState.name,
                shadowmodes: newShadowModes 
            };

            setSubComponent(newSubComponentState);            
        }
    };

    const handleChipDeletion = (shadowmodeToDelete: IShadowmode) => {
        const newShadowModes = subcomponentState.shadowmodes.filter(shadowmode => shadowmode.id !== shadowmodeToDelete.id ).slice();

        const newSubComponentState : ISubcomponent = {
            id: subcomponentState.id,
            name: subcomponentState.name,
            shadowmodes: newShadowModes 
        };

        setSubComponent(newSubComponentState);
    };

    const handleIDInput = (ev : React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const newSubComponentState : ISubcomponent = {
            id: ev.target.value,
            name: subcomponentState.name,
            shadowmodes: subcomponentState.shadowmodes 
        };

        setSubComponent(newSubComponentState);
    };

    const handleNameInput = (ev : React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const newSubComponentState : ISubcomponent = {
            id: subcomponentState.id,
            name: ev.target.value,
            shadowmodes: subcomponentState.shadowmodes 
        };

        setSubComponent(newSubComponentState);
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
                    <div className="subcomponent-dialog-content-container">            
                        <TextField 
                            disabled ={type === SubComponentDialogType.Edit ? true : false}
                            id="id"
                            label="ID" 
                            value={subcomponent.id}
                            onChange={handleIDInput}
                            className="subcomponent-dialog-content-container-item"/>
                        <TextField 
                            id="name"
                            label="Name"
                            value={subcomponent.name}
                            onChange={handleNameInput}
                            className="subcomponent-dialog-content-container-item"/>
                        <ChipCreator
                            shadowmodes={subcomponent.shadowmodes}
                            handleChipCreation={handleChipCreation}
                            handleChipDeletion={handleChipDeletion}
                        />
                    </div>    
                </SubComponentDialogContent>
                <SubComponentDialogActions>
                    <Button autoFocus onClick={() => {onSaveClose(subcomponentState);}} color="primary">
                        Save changes
                    </Button>
                    <Button onClick={onAbort} color="secondary">
                        Close
                    </Button>
                </SubComponentDialogActions>
            </Dialog>
    );
}