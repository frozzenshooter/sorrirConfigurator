import IDegradationLevelState from "../../../models/IDegradationLevelState";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";
import './StateSelector.css';
import StateSelectorArrow from "./StateSelectorArrow";

export interface IStateSelectorProps {
    startState: IDegradationLevelState;
    resultStates: IDegradationLevelState[];
    startLabel: string;
    resultLabel: string;
    currentResultStateId: string | null; 
    onChange: (startState: IDegradationLevelState, resultStateId: string) => void;
}


/**
 * Styles for the @DegradationLevelStateSelector
 */
 const useStyles = makeStyles((theme: Theme) =>
 createStyles({
        formControl: {
            marginRight: theme.spacing(1),
            minWidth: 200,
            maxWidth: 200,
        },
        selectEmpty: {
            marginTop: theme.spacing(2),
        },
   })
);


const StateSelector = (props: IStateSelectorProps) => {

    const {currentResultStateId, resultStates, startState, startLabel, resultLabel, onChange} = props;

    const classes = useStyles();

    const handleChange = (newStateId: string) => {
        onChange(startState, newStateId);
    }

    return (
        <div className="state-selector-container" key={startLabel + " "+ resultLabel}>
            <FormControl className={classes.formControl} key={startState.id}>
                <InputLabel shrink id="start-state-selector-label">{startLabel}</InputLabel>
                <Select
                    variant="outlined"
                    labelId="start-state-selector-label"
                    id="start-state-selector"
                    value={startState.id}
                    displayEmpty
                    className={classes.selectEmpty}
                    disabled={true}
                >
                    <MenuItem value={startState.id}>
                        <em>{startState.name}</em>
                    </MenuItem>                                   
                </Select>
            </FormControl>

            <StateSelectorArrow
                height={56}
                width={150}
            />

            <FormControl className={classes.formControl} key={(currentResultStateId === null? "": currentResultStateId)}>
                <InputLabel shrink id="result-state-selector-label">{resultLabel}</InputLabel>
                <Select
                    variant="outlined"
                    labelId="result-state-selector-label"
                    id="result-state-selector"
                    value={currentResultStateId === null? "": currentResultStateId}
                    onChange={(ev)=> {
                        handleChange((ev.target.value as string));
                    }}
                        displayEmpty
                        className={classes.selectEmpty}
                    >
                    <MenuItem value="">
                        <em>DC</em>
                    </MenuItem>
                    {resultStates.map(s => {
                            return (
                                <MenuItem value={s.id}>{s.name}</MenuItem>
                            );
                        })
                    }                
                </Select>
            </FormControl>
        </div>   
    );
}

export default StateSelector;