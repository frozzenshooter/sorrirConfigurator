import IDegradationLevelState from "../../../models/IDegradationLevelState";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";
import './StateSelector.css';
import StateSelectorArrow from "./StateSelectorArrow";

export interface IStateSelectorState {
    isStartOffState: boolean;
    isResultOffState: boolean;
    startState: IDegradationLevelState | null;
    resultStates: IDegradationLevelState[];
    currentResultStateId: string | null; 
}

export interface IStateSelectorProps {
    states: IStateSelectorState;
    startLabel: string;
    resultLabel: string;
    onChange: (startStateId: string | null, resultStateId: string | null) => void;
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

    const {states, startLabel, resultLabel, onChange} = props;

    const classes = useStyles();

    const handleChange = (newStateId: string) => {
        let currentStartStateId : string | null = null;
        if(states.isStartOffState === false && states.startState!= null){
            currentStartStateId = states.startState.id;
        }

        onChange(currentStartStateId, newStateId);
    }
    
    return (
        <div className="state-selector-container" key={startLabel + " "+ resultLabel}>

            {states.isStartOffState === true ?
                <FormControl className={classes.formControl} key={"isOffState-start"}>
                    <InputLabel shrink id="start-state-selector-label">{startLabel}</InputLabel>
                    <Select
                        variant="outlined"
                        labelId="start-state-selector-label"
                        id="start-state-selector"
                        value={""}
                        displayEmpty
                        className={classes.selectEmpty}
                        disabled={true}
                    >
                        <MenuItem value={""}>
                            <em>{"Off"}</em>
                        </MenuItem>                                   
                    </Select>
                </FormControl>
            :                 
                <FormControl className={classes.formControl} key={states.startState +"start"}>
                    <InputLabel shrink id="start-state-selector-label">{startLabel}</InputLabel>
                    <Select
                        variant="outlined"
                        labelId="start-state-selector-label"
                        id="start-state-selector"
                        value={states.startState?.id}
                        displayEmpty
                        className={classes.selectEmpty}
                        disabled={true}
                    >
                        <MenuItem value={states.startState?.id}>
                            <em>{states.startState?.name}</em>
                        </MenuItem>                                   
                    </Select>
                </FormControl>                   
            }

            <StateSelectorArrow
                height={56}
                width={150}
            />

            {states.isResultOffState === true?
                <FormControl className={classes.formControl} key={(states.currentResultStateId === null? "": states.currentResultStateId)+ states.startState?.id+"result"}>
                    <InputLabel shrink id="result-state-selector-label">{resultLabel}</InputLabel>
                    <Select
                        variant="outlined"
                        labelId="result-state-selector-label"
                        id="result-state-selector"
                        value={""}
                        disabled={true}
                        displayEmpty
                        className={classes.selectEmpty}
                    >
                        <MenuItem value="">
                            <em>Off</em>
                        </MenuItem>               
                    </Select>
                </FormControl>
            : 
                <FormControl className={classes.formControl} key={(states.currentResultStateId === null? "": states.currentResultStateId)+ states.startState?.id+"result"}>
                    <InputLabel shrink id="result-state-selector-label">{resultLabel}</InputLabel>
                    <Select
                        variant="outlined"
                        labelId="result-state-selector-label"
                        id="result-state-selector"
                        value={states.currentResultStateId === null? "": states.currentResultStateId}
                        onChange={(ev)=> {
                            handleChange((ev.target.value as string));
                        }}
                            displayEmpty
                            className={classes.selectEmpty}
                        >
                        <MenuItem value="">
                            <em>DC</em>
                        </MenuItem>
                        {states.resultStates.map(rs => {
                                return (
                                    <MenuItem value={rs.id}>{rs.name}</MenuItem>
                                );
                            })
                        }                
                    </Select>
                </FormControl>
            }
            
        </div>   
    );
}

export default StateSelector;