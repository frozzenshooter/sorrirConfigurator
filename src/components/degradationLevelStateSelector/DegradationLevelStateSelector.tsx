import ILevelChange from '../../models/ILevelChange';
import IDegradationLevel from '../../models/IDegradationLevel';
import './DegradationLevelStateSelector.css';
import StateSelector from './StateSelector/StateSelector';
import IDegradationLevelState from '../../models/IDegradationLevelState';
import { TreeType } from '../../models/TreeType';

export interface IDegradationLevelStateSelectorProps {
    treeType: TreeType;
    levelChange: ILevelChange;
    startDegradationLevel: IDegradationLevel | null;
    resultDegradationLevel: IDegradationLevel | null;
    onChange: (levelChange: ILevelChange, startStateId: string | null, resultStateId: string | null) => void;
}

const DegradationLevelStateSelector = (props: IDegradationLevelStateSelectorProps) => {
    
    const {treeType, levelChange, startDegradationLevel,  resultDegradationLevel, onChange} = props;

    //#region Label creation

    const getDegradationLevelLabel = (degradationLevel : IDegradationLevel | null) : string => {

        if(degradationLevel === null){
            // OFF case
            return "0 - OFF";
        }

        let shortDegradationLevelLabel = degradationLevel.label ;
        if(shortDegradationLevelLabel.length > 20){
            shortDegradationLevelLabel = shortDegradationLevelLabel.substring(0, 17) + "...";
        } 

        const labelText = shortDegradationLevelLabel !== "" ? shortDegradationLevelLabel : "Level";
        
        return degradationLevel.id + " - " + labelText;
    };

    const typeString = treeType === TreeType.Degradation ? "degradation" : "upgrade";

    const startLabel = getDegradationLevelLabel(startDegradationLevel);
    const resultLabel = getDegradationLevelLabel(resultDegradationLevel);

    //#endregion

    const handleChange = (startStateId: string | null, resultStateId: string | null) => {
        onChange(levelChange, startStateId, resultStateId);
    }


    let resultStates : IDegradationLevelState[] = [];
    if(resultDegradationLevel !== null){
        resultStates = resultDegradationLevel.states;
    }


    let currentResultStateId : string | null = null;
    if(startDegradationLevel === null){
        // OFF STATE as start state - find the result state
        const currentResultState = levelChange.stateChanges.find(st => st.startStateId === null);

        if(currentResultState){
            currentResultStateId = currentResultState.resultStateId;
        }
    }


    return (
        <div className="degradation-level-state-selector-container" key={(startLabel+ " " + resultLabel)}>
                <div className="degradation-level-state-selector-title">
                    {"State changes for "+ typeString + " from '"} 
                        <b>{startLabel}</b>
                    {"' to '"}
                        <b>{resultLabel}</b>
                    {"'"}
                </div>
                <div className="degradation-level-state-selector-selectors-container">
                    {startDegradationLevel?.states.length === 0 ?
                        <div className="degradation-level-state-selector-selectors-no-start-states-container">
                            {"No start states found!"}
                        </div>
                    : 
                        null
                    }

                    {startDegradationLevel === null ?                    
                        <div className="degradation-level-state-selector-selector-row" key={"off row"}>
                            <StateSelector
                                states={{
                                    isResultOffState: false,
                                    isStartOffState: true,
                                    currentResultStateId: currentResultStateId,
                                    startState: null,
                                    resultStates: resultStates
                                }}
                                startLabel={startLabel}
                                resultLabel={resultLabel}
                                onChange={handleChange}
                            />
                        </div>
                    : 
                        startDegradationLevel.states.map(s => {

                            // this will only render if the startDegradationLevel is not the OFF-Level
                            const currentResultState = levelChange.stateChanges.find(st => st.startStateId === s.id);
                            if(currentResultState){
                                currentResultStateId = currentResultState.resultStateId;
                            }

                            return (
                                <div className="degradation-level-state-selector-selector-row" key={startDegradationLevel.id + s.id + "row"}>
                                    <StateSelector
                                        key={startDegradationLevel.id + s.id} // unqiue key required for react
                                        states={{
                                            isResultOffState: resultDegradationLevel === null? true : false,
                                            isStartOffState: false,
                                            currentResultStateId: currentResultStateId,
                                            startState: s,
                                            resultStates: resultStates
                                        }}
                                        startLabel={startLabel}
                                        resultLabel={resultLabel}
                                        onChange={handleChange}
                                    />
                                </div>
                            );
                        })
                    }

                </div>
        </div>
    );
};

export default DegradationLevelStateSelector;