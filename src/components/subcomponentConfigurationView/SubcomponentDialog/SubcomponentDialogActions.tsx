import { Theme, withStyles } from '@material-ui/core/styles';
import MuiDialogActions from '@material-ui/core/DialogActions';

/**
 * Styles for the dialog actions
 */
 const SubcomponentDialogActions = withStyles((theme: Theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
    },
}))(MuiDialogActions);

export default SubcomponentDialogActions;