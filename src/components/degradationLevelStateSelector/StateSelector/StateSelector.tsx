import IDegradationLevelState from "../../../models/IDegradationLevelState";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";
import './StateSelector.css';
import StateSelectorArrow from "./StateSelectorArrow";
import IOffState from "../../../models/IOffState";

export interface IStateSelectorProps {
    startState: IDegradationLevelState | IOffState;
    resultStates: IDegradationLevelState[] | IOffState[];
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
        onChange((startState as IDegradationLevelState), newStateId);
    }

    return (
        <div className="state-selector-container" key={startLabel + " "+ resultLabel}>

            {startState.hasOwnProperty("isOffState") && (startState as IOffState).isOffState === true ?
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
                () => {
                    // case for all startStates expect the off state

                    return (
                    <FormControl className={classes.formControl} key={(startState as IDegradationLevelState).id+"start"}>
                        <InputLabel shrink id="start-state-selector-label">{startLabel}</InputLabel>
                        <Select
                            variant="outlined"
                            labelId="start-state-selector-label"
                            id="start-state-selector"
                            value={(startState as IDegradationLevelState).id}
                            displayEmpty
                            className={classes.selectEmpty}
                            disabled={true}
                        >
                            <MenuItem value={(startState as IDegradationLevelState).id}>
                                <em>{(startState as IDegradationLevelState).name}</em>
                            </MenuItem>                                   
                        </Select>
                    </FormControl>
                    );
                }
            }

            <StateSelectorArrow
                height={56}
                width={150}
            />
            {resultStates.some(s => s.hasOwnProperty("isOffState"))?
                <div>OFFSTATE</div>
            : 
                <FormControl className={classes.formControl} key={(currentResultStateId === null? "": currentResultStateId)+(startState as IDegradationLevelState).id+"result"}>
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
                        {(resultStates as IDegradationLevelState[]).map(rs => {
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