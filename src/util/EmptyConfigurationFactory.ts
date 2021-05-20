import IConfiguration from "../models/IConfiguration";

const EmptyConfigurationFactory = (): IConfiguration => {

    return {
        subcomponents: [],
        degradationLevels: []
    };
};

export default EmptyConfigurationFactory;