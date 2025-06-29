import { Paper } from "@material-ui/core";
import { useConfigurationContext } from "../../context/ConfigurationContext";
import IConfiguration from "../../models/IConfiguration";
import IDegradationLevel from "../../models/IDegradationLevel";
import ILevelChange from "../../models/ILevelChange";
import { TreeType } from "../../models/TreeType";
import DegradationLevelStateSelector from "../degradationLevelStateSelector/DegradationLevelStateSelector";
import './UpgradeStateConfigrationView.css'

const UpgradeStateConfigrationView = () => {

    const {configuration, updateConfiguration} = useConfigurationContext();
    
    const handleChange = (levelChange: ILevelChange, startStateId: string | null, resultStateId: string | null) => {
        const newConfiguration: IConfiguration = Object.assign({}, configuration);
        
        const levelChangeIndex = newConfiguration.upgrades.findIndex(lc => lc.startDegradationLevelId === levelChange.startDegradationLevelId && lc.resultDegradationLevelId === levelChange.resultDegradationLevelId);

        if(levelChangeIndex !== -1){

            if(resultStateId === ""){
                // This is the DC case - just remove the stateChange because we dont save empty values
                newConfiguration.upgrades[levelChangeIndex].stateChanges = newConfiguration.upgrades[levelChangeIndex].stateChanges.filter(sc => sc.startStateId !== startStateId).slice();
            }else{

                const stateChangeIndex = newConfiguration.upgrades[levelChangeIndex].stateChanges.findIndex(sc => sc.startStateId === startStateId);

                if(stateChangeIndex !== -1 ){
                    newConfiguration.upgrades[levelChangeIndex].stateChanges[stateChangeIndex].resultStateId = resultStateId;
                }else{
                    // we have to add the state change
                    newConfiguration.upgrades[levelChangeIndex].stateChanges.push({
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
        <div id="upgrade-state-configuration-view-container">
            <Paper elevation={1}>
                {configuration.upgrades.length > 0?
                        <div className="upgrade-state-configuration-view-overflow-container">
                            
                            {configuration.upgrades.map(lvlChg => {

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
                                        <DegradationLevelStateSelector key={startDegradationLevel?.id + " " + resultDegradationLevel?.id + " " +TreeType.Upgrade} // key required for react
                                            treeType={TreeType.Upgrade}
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
                        <div className="upgrade-state-configuration-view-no-upgrades-container">
                            {"No upgrades specified!"}
                        </div>
                    }
            </Paper>
        </div>
    );
}

export default UpgradeStateConfigrationView;