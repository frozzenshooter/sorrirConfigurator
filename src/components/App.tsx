import React from "react";
import { ConfigurationContext } from "../context/ConfigurationContext";
import IConfiguration from "../models/IConfiguration";
import GetEmptyConfiguration from "../util/GetEmptyConfiguration";
import View from "../util/Views";
import AppWelcome from "./appWelcome/AppWelcome";
import Wizard from "./wizard/Wizard";

const App = () => {

  const [wizardStart, setWizardStart] = React.useState<boolean>(false);
  const [requiredViews, setRequiredViews] =  React.useState<View[]>([]);
  const [configuration, setConfiguration] = React.useState<IConfiguration>(GetEmptyConfiguration());

  const handleWizardStart = (requiredViews: View[]) => {
    setRequiredViews(requiredViews);
    setWizardStart(true);
  };

  const handleWizardRestart = () => {
    setConfiguration(GetEmptyConfiguration());
    setRequiredViews([]);
    setWizardStart(false);
  };

  const updateConfiguration = (newConfiguration: IConfiguration) => {
    console.log("Configuration updated: ", newConfiguration);
    setConfiguration(newConfiguration);
  };

  if(wizardStart===true) {
    return (
      <ConfigurationContext.Provider value={{configuration, updateConfiguration}}>
        <Wizard 
          requiredViews={requiredViews}
          onWizardRestart={handleWizardRestart}
          />
      </ConfigurationContext.Provider>
    );
  } else {
    return (
      <AppWelcome onWizardStart={handleWizardStart}/>
    );
  }
}

export default App;
