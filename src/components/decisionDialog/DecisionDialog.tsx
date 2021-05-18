import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export interface IDecisionDialogProps {
    open: boolean;
    title: string;
    text: string;
    onConfirmClick: () => void;
    onCancelClick: () => void;
}

const DecisionDialog = (props: IDecisionDialogProps) => {

    const { open, title, text, onConfirmClick, onCancelClick} = props;

    return (
        <Dialog
            open={open}
            onClose={onCancelClick}
            >
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {text}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onCancelClick} color="primary">
                    Cancel
                </Button>
                <Button onClick={onConfirmClick} color="primary" autoFocus>
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DecisionDialog;