import { Paper } from "@material-ui/core";
import { useConfigurationContext } from "../../context/ConfigurationContext";
import IConfiguration from "../../models/IConfiguration";
import IDegradationLevel from "../../models/IDegradationLevel";
import ILevelChange from "../../models/ILevelChange";
import { TreeType } from "../../models/TreeType";
import DegradationLevelStateSelector from "../degradationLevelStateSelector/DegradationLevelStateSelector";
import './DegradationStateConfigurationView.css'

const DegradationStateConfigurationView = () => {

    const {configuration, updateConfiguration} = useConfigurationContext();
    
    const handleChange = (levelChange: ILevelChange, startStateId: string | null, resultStateId: string | null) => {
        const newConfiguration: IConfiguration = Object.assign({}, configuration);
        
        const levelChangeIndex = newConfiguration.degradations.findIndex(d => d.startDegradationLevelId === levelChange.startDegradationLevelId && d.resultDegradationLevelId === levelChange.resultDegradationLevelId);

        if(levelChangeIndex !== -1){

            if(resultStateId === ""){
                // This is the DC case - just remove the stateChange because we dont save empty values
                newConfiguration.degradations[levelChangeIndex].stateChanges = newConfiguration.degradations[levelChangeIndex].stateChanges.filter(sc => sc.startStateId !== startStateId).slice();
            }else{

                const stateChangeIndex = newConfiguration.degradations[levelChangeIndex].stateChanges.findIndex(sc => sc.startStateId === startStateId);

                if(stateChangeIndex !== -1 ){
                    newConfiguration.degradations[levelChangeIndex].stateChanges[stateChangeIndex].resultStateId = resultStateId;
    
                }else{
                    // we have to add the state change
                    newConfiguration.degradations[levelChangeIndex].stateChanges.push({
                        startStateId: startStateId,
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
                                    <DegradationLevelStateSelector key={lvlChg + " " +TreeType.Degradation} // key required for react
                                        treeType={TreeType.Degradation}
                                        levelChange={lvlChg}
                                        startDegradationLevel={startDegradationLevel}
                                        resultDegradationLevel={resultDegradationLevel}
                                        onChange={handleChange}
                                    />
                                );                    
                            })
                        }
                    </div>
                : 
                    <div className="degradation-state-configuration-view-no-degradations-container">
                        {"No degradations specified!"}
                    </div>
                }
            </Paper>
        </div>
    );
}

export default DegradationStateConfigurationView;