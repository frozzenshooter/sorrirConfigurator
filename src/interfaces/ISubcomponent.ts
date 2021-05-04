import IShadowmode from "./IShadowmode";

export default interface ISubcomponent {
    id: string;
    name:string;
    shadowmodes: IShadowmode[];
}