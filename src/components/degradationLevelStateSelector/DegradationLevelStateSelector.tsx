import ILevelChange from '../../models/ILevelChange';
import IDegradationLevel from '../../models/IDegradationLevel';
import './DegradationLevelStateSelector.css';
import StateSelector from './StateSelector/StateSelector';
import IDegradationLevelState from '../../models/IDegradationLevelState';

export enum DegradationLevelStateSelectorType{
    Degradation = 0,
    Upgrade = 1
}


export interface IDegradationLevelStateSelectorProps {
    type: DegradationLevelStateSelectorType;
    levelChange: ILevelChange;
    startDegradationLevel: IDegradationLevel | null;
    resultDegradationLevel: IDegradationLevel | null;
}

const DegradationLevelStateSelector = (props: IDegradationLevelStateSelectorProps) => {
    
    const {type, levelChange, startDegradationLevel, resultDegradationLevel} = props;

    const getDegradationLevelLabel = (degradationLevel : IDegradationLevel | null) : string => {

        if(degradationLevel === null){
            // OFF case
            return "0 - OFF";
        }

        const labelText = degradationLevel.label !== "" ? degradationLevel.label : "Level";

        return degradationLevel.id + " - " + labelText;
    };

    const typeString = type === DegradationLevelStateSelectorType.Degradation ? "degradation" : "upgrade";

    const startLabel = getDegradationLevelLabel(startDegradationLevel);
    const resultLabel = getDegradationLevelLabel(resultDegradationLevel)

    return (
        <div className="degradation-level-state-selector-container">
                <div className="degradation-level-state-selector-title">
                    {"State changes for "+ typeString + " from '"} 
                        <b>{startLabel}</b>
                    {"' to '"}
                        <b>{resultLabel}</b>
                    {"'"}
                </div>
                <div className="degradation-level-state-selector-selectors-container">
                    {startDegradationLevel?.states.length === 0?
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
                                <div className="degradation-level-state-selector-selector-row">
                                    <StateSelector
                                        key={startDegradationLevel.id + s.id} // unqiue key required for react
                                        startState={s}
                                        resultStates={resultStates}  
                                        currentResultStateId={currentResultStateId}
                                        startLabel={startLabel}
                                        resultLabel={resultLabel}
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