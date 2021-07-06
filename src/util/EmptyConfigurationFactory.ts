import IConfiguration from "../models/IConfiguration";

const GetEmptyConfiguration = (): IConfiguration => {

    return {
        subcomponents: [],
        degradationLevels: [],
        degradations: [],
        upgrades: []
    };
};

export default GetEmptyConfiguration;