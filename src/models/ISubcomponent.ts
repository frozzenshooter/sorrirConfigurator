import IShadowmode from "./IShadowmode";

interface ISubcomponent {
    id: string;
    name:string;
    shadowmodes: IShadowmode[];
}

export default ISubcomponent;