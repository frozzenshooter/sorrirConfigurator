import { Paper } from "@material-ui/core";
import ConfigurationFileImport from "./ConfigurationFileImport/ConfigurationFileImport";
import './ImportView.css';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import SyntaxHighlighter from 'react-syntax-highlighter';
import lightfair from 'react-syntax-highlighter/dist/esm/styles/hljs/lightfair';
import { useConfigurationContext } from "../../context/ConfigurationContext";


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    importViewPaper: {
        padding: theme.spacing(3)
    },
    importViewSyntaxHighlighterPaper: {
        marginTop: theme.spacing(2),
    }
  }),
);

const ImportView = () => {

    const classes = useStyles();

    const {configuration} = useConfigurationContext();
    const configurationString = JSON.stringify(configuration, undefined, 4);

    return (
        <div id="import-view-container">
            <Paper elevation={1} className={classes.importViewPaper}>
                <ConfigurationFileImport/>
                <Paper variant="outlined" className={classes.importViewSyntaxHighlighterPaper}>
                    <SyntaxHighlighter 
                                language='json' 
                                style={lightfair}
                                showLineNumbers={true}
                                wrapLongLines={true}
                            >
                        {configurationString}
                    </SyntaxHighlighter> 
                </Paper>
            </Paper>
        </div>
    );
}

export default ImportView;