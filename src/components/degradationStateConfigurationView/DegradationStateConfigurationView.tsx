import { Paper } from "@material-ui/core";
import { useConfigurationContext } from "../../context/ConfigurationContext";
import DegradationLevelStateSelector from "../degradationLevelStateSelector/DegradationLevelStateSelector";
import './DegradationStateConfigurationView.css'

const DegradationStateConfigurationView = () => {


    const {configuration} = useConfigurationContext();
    
    return (
        <div id="degradation-state-configuration-view-container">
            <Paper elevation={1}>
                {configuration.degradations.map(lvlChg => {

                        const startDegradationLevelIndex = configuration.degradationLevels.findIndex(dl => dl.id === lvlChg.startDegradationLevelId); 
                        const resultDegradationLevelIndex = configuration.degradationLevels.findIndex(dl => dl.id === lvlChg.resultDegradationLevelId); 

                        if(startDegradationLevelIndex !== -1 && resultDegradationLevelIndex !== -1){

                            return (
                                <DegradationLevelStateSelector
                                    startDegradationLevel={configuration.degradationLevels[startDegradationLevelIndex]}
                                    resultDegradationLevel={configuration.degradationLevels[resultDegradationLevelIndex]}
                                    levelChange={lvlChg}
                                />
                            );
                        }else{
                            // should never happen but just in chase
                            console.log("Rendering not successful: start or result DegradationLevel for degradation not found");
                            return (<>
                            </>);
                        }                       
                    })
                }
            </Paper>
        </div>
    );
}

export default DegradationStateConfigurationView;