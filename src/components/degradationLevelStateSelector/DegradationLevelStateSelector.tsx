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
    onChange: (levelChange: ILevelChange, startState: IDegradationLevelState, resultStateId: string) => void;
}

const DegradationLevelStateSelector = (props: IDegradationLevelStateSelectorProps) => {
    
    const {treeType, levelChange, startDegradationLevel, resultDegradationLevel, onChange} = props;

    //#region Label creation

    const getDegradationLevelLabel = (degradationLevel : IDegradationLevel | null) : string => {

        if(degradationLevel === null){
            // OFF case
            return "0 - OFF";
        }

        const labelText = degradationLevel.label !== "" ? degradationLevel.label : "Level";

        return degradationLevel.id + " - " + labelText;
    };

    const typeString = treeType === TreeType.Degradation ? "degradation" : "upgrade";

    const startLabel = getDegradationLevelLabel(startDegradationLevel);
    const resultLabel = getDegradationLevelLabel(resultDegradationLevel)

    //#endregion

    const handleChange = (startState: IDegradationLevelState, resultStateId: string) => {
        onChange(levelChange, startState, resultStateId);
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
                    {startDegradationLevel?.states.length === 0 || startDegradationLevel === null ?
                        <div className="degradation-level-state-selector-selectors-no-start-states-container">
                            {"No start states found!"}
                        </div>
                    : 
                        null
                    }

                    {startDegradationLevel?.states.map(s => {

                            let resultStates : IDegradationLevelState[] = [];
                            if(resultDegradationLevel){
                                resultStates = resultDegradationLevel.states;
                            }

                            let currentResultStateId : string | null = null;
                            const currentResultState = levelChange.stateChanges.find(st => st.startStateId === s.id);
                            if(currentResultState){
                                currentResultStateId = currentResultState.resultStateId;
                            }

                            return (
                                <div className="degradation-level-state-selector-selector-row" key={startDegradationLevel.id + s.id + "row"}>
                                    <StateSelector
                                        key={startDegradationLevel.id + s.id} // unqiue key required for react
                                        startState={s}
                                        resultStates={resultStates}  
                                        currentResultStateId={currentResultStateId}
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