import IConfiguration from "./IConfiguration";

type ConfigurationContextType = {
    configuration: IConfiguration
    updateConfiguration: (configuration: IConfiguration) => void
}

export default ConfigurationContextType;