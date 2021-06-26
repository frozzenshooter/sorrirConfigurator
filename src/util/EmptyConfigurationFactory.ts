import IConfiguration from "../models/IConfiguration";

const EmptyConfigurationFactory = (): IConfiguration => {

    return {
        subcomponents: [],
        degradationLevels: [],
        degradations: [],
        upgrades: []
    };
};

export default EmptyConfigurationFactory;