import React from "react";
import { createContext } from "react";
import ConfigurationContextType from "../models/ConfigurationContextType";
import IConfiguration from "../models/IConfiguration";

const configurationContextDefaultValues: ConfigurationContextType = { 
    configuration: { label: "" }, 
    updateConfiguration: (configuration: IConfiguration) => {}
}

export const ConfigurationContext = createContext<ConfigurationContextType>(configurationContextDefaultValues);

export const useConfigurationContext = () => React.useContext(ConfigurationContext);