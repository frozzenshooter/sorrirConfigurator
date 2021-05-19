import { useConfigurationContext } from "../../context/ConfigurationContext";
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Paper } from "@material-ui/core";
import SyntaxHighlighter from 'react-syntax-highlighter';
import lightfair from 'react-syntax-highlighter/dist/esm/styles/hljs/lightfair';
import { FileExporter } from "./FileExporter/FileExporter";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    exportViewPaper: {
        padding: theme.spacing(3)
    },
    exportViewSyntaxHighlighterPaper: {
        marginTop: theme.spacing(2),
    }
  }),
);

const ExportView = () => {
    const {configuration} = useConfigurationContext();
    const configurationString = JSON.stringify(configuration, undefined, 4);

    const classes = useStyles();

    return (
        <div id="import-view-container">
            <Paper elevation={1} className={classes.exportViewPaper}>
                <FileExporter/>
                <Paper variant="outlined" className={classes.exportViewSyntaxHighlighterPaper}>
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

export default ExportView;