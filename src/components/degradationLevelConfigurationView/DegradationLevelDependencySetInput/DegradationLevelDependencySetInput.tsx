import React from "react";
import IDegradationLevelDependencySet from "../../../models/IDegradationLevelDependencySet";
import ISubcomponent from "../../../models/ISubcomponent";
import DegradationLevelDependencySetInputRow from "./DegradationLevelDependencySetInputRow";

export interface IDegradationLevelDependencySetInputProps {
    subcomponents: ISubcomponent[];
    dependencySets: IDegradationLevelDependencySet[];
    onChange: (dependencySets: IDegradationLevelDependencySet[]) => void
}

const DegradationLevelDependencySetInput = (props: IDegradationLevelDependencySetInputProps) => {

    const {dependencySets, subcomponents, onChange} = props;

    const handleDelete = (setIdToDelete: number) => {
        const newDependencySets = dependencySets.filter(set => set.id !== setIdToDelete);

        onChange(newDependencySets);
    };

    const handleAdd = () => {

        const newDependencySets = dependencySets.slice();

        // We need to id to be able to compare different sets 
        // (if this is not the case we might have two sets with the same values and can't handle a delete 
        // -> would delete both even if a user wants to delete only one)
        let highestId = 0;
        if(newDependencySets.length > 0){
            highestId = newDependencySets.map(set => set.id).reduce((a,b) => {return Math.max(a,b);});
        }

        const newId = highestId +1;
        
        newDependencySets.push({
            id: newId,
            dependencies: []
        });

        onChange(newDependencySets);
    };

    const handleChange = (degradationLevelDependencySet: IDegradationLevelDependencySet) => {
        
        const newDependencySets = dependencySets.slice();

        const index = newDependencySets.findIndex(set => set.id === degradationLevelDependencySet.id);
        
        if(index !== -1){

            newDependencySets[index].dependencies = degradationLevelDependencySet.dependencies.slice();
            onChange(newDependencySets);

        }else{
            // Should never happen
            console.log("Id of dependecy set not found.");
        }
    };

    return (
        <React.Fragment>
            <React.Fragment>
                {dependencySets.map(set => {
                    return (
                        <DegradationLevelDependencySetInputRow
                            degradationLevelDependencySet={set}
                            subcomponents={subcomponents}
                            onDelete={handleDelete}
                            onChange={handleChange}
                        />
                    )
                    })
                }
                <div onClick={handleAdd}>
                    ADD BUTTON
                </div>
            </React.Fragment>           
        </React.Fragment>
    );

}

export default DegradationLevelDependencySetInput;