import React from "react";
import View from "../util/Views";
import AppWelcome from "./appWelcome/AppWelcome";
import Wizard from "./wizard/Wizard";

const App = () => {

  const [wizardStart, setWizardStart] = React.useState<boolean>(false);
  const [requiredViews, setRequiredViews] =  React.useState<View[]>([]);

  const handleWizardStart = (requiredViews: View[]) => {
    setRequiredViews(requiredViews);
    setWizardStart(true);
  };

  const handleWizardRestart = () => {
    setRequiredViews([]);
    setWizardStart(false);
  };

  if(wizardStart===true) {
    return (
      <Wizard 
        requiredViews={requiredViews}
        onWizardRestart={handleWizardRestart}
        />
    );
  } else {
    return (
      <AppWelcome onWizardStart={handleWizardStart}/>
    );
  }
}

export default App;
