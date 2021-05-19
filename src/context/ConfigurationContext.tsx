import React from "react";
import { createContext } from "react";
import ConfigurationContextType from "../models/ConfigurationContextType";
import IConfiguration from "../models/IConfiguration";
import EmptyConfigurationFactory from "../util/EmptyConfigurationFactory";

const configurationContextDefaultValues: ConfigurationContextType = { 
    configuration: EmptyConfigurationFactory(), 
    updateConfiguration: (configuration: IConfiguration) => {}
}

export const ConfigurationContext = createContext<ConfigurationContextType>(configurationContextDefaultValues);

export const useConfigurationContext = () => React.useContext(ConfigurationContext);