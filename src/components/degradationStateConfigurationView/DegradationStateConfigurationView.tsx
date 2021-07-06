import { Paper } from "@material-ui/core";
import { useConfigurationContext } from "../../context/ConfigurationContext";
import IConfiguration from "../../models/IConfiguration";
import IDegradationLevel from "../../models/IDegradationLevel";
import IDegradationLevelState from "../../models/IDegradationLevelState";
import ILevelChange from "../../models/ILevelChange";
import DegradationLevelStateSelector, { DegradationLevelStateSelectorType } from "../degradationLevelStateSelector/DegradationLevelStateSelector";
import './DegradationStateConfigurationView.css'

const DegradationStateConfigurationView = () => {

    const {configuration, updateConfiguration} = useConfigurationContext();
    
    const handleChange = (levelChange: ILevelChange, startState: IDegradationLevelState, resultStateId: string) => {
        const newConfiguration: IConfiguration = Object.assign({}, configuration);
        
        const levelChangeIndex = newConfiguration.degradations.findIndex(d => d.startDegradationLevelId === levelChange.startDegradationLevelId && d.resultDegradationLevelId === levelChange.resultDegradationLevelId);

        if(levelChangeIndex !== -1){

            if(resultStateId === ""){
                // This is the DC case - just remove the stateChange because we dont save empty values
                newConfiguration.degradations[levelChangeIndex].stateChanges = newConfiguration.degradations[levelChangeIndex].stateChanges.filter(sc => sc.startStateId !== startState.id).slice();
            }else{

                const stateChangeIndex = newConfiguration.degradations[levelChangeIndex].stateChanges.findIndex(sc => sc.startStateId === startState.id);

                if(stateChangeIndex !== -1 ){
                    newConfiguration.degradations[levelChangeIndex].stateChanges[stateChangeIndex].resultStateId = resultStateId;
    
                }else{
                    // we have to add the state change
                    newConfiguration.degradations[levelChangeIndex].stateChanges.push({
                        startStateId: startState.id,
                        resultStateId: resultStateId
                    });  
                }
            }          
            
            updateConfiguration(newConfiguration);
        }else{
            // Should never happen
            console.log("Not possible to find changed levelChange in configuration");
        }
    }

    return (
        <div id="degradation-state-configuration-view-container">
            <Paper elevation={1}>
                {configuration.degradations.length > 0?
                    <div className="degradation-state-configuration-view-overflow-container">
                        
                        {configuration.degradations.map(lvlChg => {

                                let startDegradationLevel: IDegradationLevel | null = null;
                                if(lvlChg.startDegradationLevelId !== 0){
                                    const startLevel = configuration.degradationLevels.find(dl => dl.id === lvlChg.startDegradationLevelId);
                                    startDegradationLevel = startLevel === undefined ? null : startLevel;
                                }

                                let resultDegradationLevel: IDegradationLevel | null = null;
                                if(lvlChg.resultDegradationLevelId !== 0){
                                    const resultLevel = configuration.degradationLevels.find(dl => dl.id === lvlChg.resultDegradationLevelId);
                                    resultDegradationLevel = resultLevel === undefined ? null : resultLevel;
                                }

                                return (
                                    <DegradationLevelStateSelector
                                        type={DegradationLevelStateSelectorType.Degradation}
                                        startDegradationLevel={startDegradationLevel}
                                        resultDegradationLevel={resultDegradationLevel}
                                        levelChange={lvlChg}
                                        onChange={handleChange}
                                    />
                                );                    
                            })
                        }
                    </div>
                : 
                    null
                }
            </Paper>
        </div>
    );
}

export default DegradationStateConfigurationView;