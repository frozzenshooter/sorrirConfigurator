import { Divider, Paper } from "@material-ui/core";
import { useConfigurationContext } from "../../context/ConfigurationContext";
import IDegradationLevel from "../../models/IDegradationLevel";
import DegradationLevelStateSelector, { DegradationLevelStateSelectorType } from "../degradationLevelStateSelector/DegradationLevelStateSelector";
import './DegradationStateConfigurationView.css'

const DegradationStateConfigurationView = () => {


    const {configuration} = useConfigurationContext();
    
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