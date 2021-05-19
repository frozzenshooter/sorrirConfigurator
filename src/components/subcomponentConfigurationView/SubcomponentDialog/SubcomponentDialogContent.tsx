import { Theme, withStyles } from '@material-ui/core/styles';
import MuiDialogContent from '@material-ui/core/DialogContent';

/**
 * Content of the @SubcomponentDialog
 */
 const SubcomponentDialogContent = withStyles((theme: Theme) => ({
    root: {
    padding: theme.spacing(2),
    },
}))(MuiDialogContent);

export default SubcomponentDialogContent;