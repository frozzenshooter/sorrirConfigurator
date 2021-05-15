import IShadowmode from "./IShadowmode";

export default interface ISubComponent {
    id: string;
    name:string;
    shadowmodes: IShadowmode[];
}