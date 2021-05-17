import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

/**
 * Properties for the @DecisionDialog
 */
export interface IDecisionDialogProps{
    isOpen: boolean;
    title: string;
    text: string;
    handleAccept: () => void;
    handleCancel: () => void;
}

/**
 * Fexible decision dialog to display a title, a text and a confirm/abort button
 * 
 * @param props 
 * @returns 
 */
export const DecisionDialog = (props: IDecisionDialogProps) => {

    const { isOpen, title, text, handleAccept, handleCancel} = props;

    return (
        <Dialog
            open={isOpen}
            onClose={handleCancel}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            >
            <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
            <DialogContent>
            <DialogContentText id="alert-dialog-description">
                {text}
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleCancel} color="primary">
                Cancel
            </Button>
            <Button onClick={handleAccept} color="primary" autoFocus>
                Agree
            </Button>
            </DialogActions>
        </Dialog>
    );

}