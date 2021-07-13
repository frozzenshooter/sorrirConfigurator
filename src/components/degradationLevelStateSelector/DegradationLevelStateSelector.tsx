import ILevelChange from '../../models/ILevelChange';
import IDegradationLevel from '../../models/IDegradationLevel';
import './DegradationLevelStateSelector.css';
import StateSelector from './StateSelector/StateSelector';
import IDegradationLevelState from '../../models/IDegradationLevelState';
import { TreeType } from '../../models/TreeType';
import IOffState from '../../models/IOffState';

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

        let shortDegradationLevelLabel = degradationLevel.label ;
        if(shortDegradationLevelLabel.length > 20){
            shortDegradationLevelLabel = shortDegradationLevelLabel.substring(0, 17) + "...";
        } 

        const labelText = shortDegradationLevelLabel !== "" ? shortDegradationLevelLabel : "Level";
        
        return degradationLevel.id + " - " + labelText;
    };

    const typeString = treeType === TreeType.Degradation ? "degradation" : "upgrade";

    const startLabel = getDegradationLevelLabel(startDegradationLevel);
    const resultLabel = getDegradationLevelLabel(resultDegradationLevel)

    //#endregion

    const handleChange = (startState: IDegradationLevelState, resultStateId: string) => {
        onChange(levelChange, startState, resultStateId);
    }

    let resultStates : IDegradationLevelState[] | IOffState[] = [];
    if(resultDegradationLevel !== null){
        resultStates = resultDegradationLevel.states;
    }else{
        // the OFF case
        resultStates = [{isOffState: true}]
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
                        () => {
                            // This handles the OFF case as the current start level

                            let currentResultStateId : string | null = null;
                            const currentResultState = levelChange.stateChanges.find(st => st.startStateId === null);
                            if(currentResultState){
                                currentResultStateId = currentResultState.resultStateId;
                            }

                            return (
                                <div className="degradation-level-state-selector-selector-row" key={"off row"}>
                                    <StateSelector
                                        startState={{isOffState: true}}
                                        resultStates={resultStates}  
                                        currentResultStateId={currentResultStateId}
                                        startLabel={startLabel}
                                        resultLabel={resultLabel}
                                        onChange={handleChange}
                                    />
                                </div>
                            );
                        }
                    : 
                        null    
                    }

                    {startDegradationLevel?.states.map(s => {
                            // this will only render if the startDegradationLevel is not the OFF-Level

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