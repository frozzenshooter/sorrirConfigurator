import IState from "./IState"

export default interface Component {
    name: string;
    states: IState[];
}