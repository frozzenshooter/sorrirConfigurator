import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import ILevelChange from '../../models/ILevelChange';
import IDegradationLevel from '../../models/IDegradationLevel';
import './DegradationLevelStateSelector.css';

/**
 * Styles for the @DegradationLevelStateSelector
 */
 const useStyles = makeStyles((theme: Theme) =>
 createStyles({
        formControl: {
            marginRight: theme.spacing(1),
            minWidth: 200,
            maxWidth: 200,
        }
   })
);

export interface IDegradationLevelStateSelectorProps {
    levelChange: ILevelChange;
    startDegradationLevel: IDegradationLevel | null;
    resultDegradationLevel: IDegradationLevel | null;
}

const DegradationLevelStateSelector = (props: IDegradationLevelStateSelectorProps) => {
    
    const {levelChange, startDegradationLevel, resultDegradationLevel} = props;

    const classes = useStyles();


    return (
        <div className="degradation-level-state-selector-container">

            <div className="degradation-level-state-selector-start-container">
                {startDegradationLevel?.label} ({startDegradationLevel?.id})
            </div>

            <div className="degradation-level-state-selector-result-container">
                {resultDegradationLevel?.label} ({resultDegradationLevel?.id})
            </div>    

        </div>
    );

/*
    return (
        <FormControl className={classes.formControl} key={subcomponent.id}>
            <InputLabel shrink id="shadowmode-select-label">{subcomponent.name}</InputLabel>
            <Select
                variant="outlined"
                labelId="shadowmode-select-label"
                id="shadowmode-select"
                value={shadowmodeId}
                onChange={(ev)=> {
                    handleChange((ev.target.value as string));
                }}
                displayEmpty
                className={classes.selectEmpty}
                >
                <MenuItem value="">
                    <em>DC</em>
                </MenuItem>
                {subcomponent.shadowmodes.map(sm => {
                        return (
                            <MenuItem value={sm.id}>{sm.name}</MenuItem>
                        );
                    })
                }                
            </Select>
        </FormControl>
    );*/
};

export default DegradationLevelStateSelector;