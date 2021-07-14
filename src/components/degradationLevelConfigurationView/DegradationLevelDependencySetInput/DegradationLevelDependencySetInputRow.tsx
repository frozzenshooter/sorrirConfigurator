import IDegradationLevelDependency from "../../../models/IDegradationLevelDependency";
import IDegradationLevelDependencySet from "../../../models/IDegradationLevelDependencySet";
import ISubcomponent from "../../../models/ISubcomponent";
import DegradationLevelDependencySelector from "../DegradationLevelDependencySelector/DegradationLevelDependencySelector";

export interface IDegradationLevelDependencySetInputRowProps {
    subcomponents: ISubcomponent[];
    degradationLevelDependencySet: IDegradationLevelDependencySet;
    onDelete: (degradationLevelDependencySetId: number) => void;
    onChange: (degradationLevelDependencySet: IDegradationLevelDependencySet) => void;
}

const DegradationLevelDependencySetInputRow = (props: IDegradationLevelDependencySetInputRowProps) => {

    const {subcomponents, degradationLevelDependencySet, onDelete, onChange} = props;

    const handleChange = (degradationLevelDependency: IDegradationLevelDependency) => {

        const newDegradationLevelDependencySet =  Object.assign({}, degradationLevelDependencySet);

        const index = newDegradationLevelDependencySet.dependencies.findIndex(d => d.subcomponentId === degradationLevelDependency.subcomponentId);

        if(index ===-1){
            newDegradationLevelDependencySet.dependencies.push(degradationLevelDependency);
        }else{
            newDegradationLevelDependencySet.dependencies[index].shadowmodeId = degradationLevelDependency.shadowmodeId;
        }

        onChange(newDegradationLevelDependencySet);
    }

    const getShadowmodeId = (subcomponentId: string) => {

        const index = degradationLevelDependencySet.dependencies.findIndex(d => d.subcomponentId === subcomponentId);

        if(index !== -1){
            return degradationLevelDependencySet.dependencies[index].shadowmodeId;
        }

        //This means the subcomponent is "DC" - don't care
        return "";
    }

    const handleDelete = () => {
        onDelete(degradationLevelDependencySet.id);
    };

    return (
        <div>
            <div onClick={handleDelete}>
                Delete Button
            </div>           
            {subcomponents.length > 0?
                <div className="degradation-level-dependency-set-input-row-dependency-container">
                    {subcomponents.map(subc => {
                            return (
                                <DegradationLevelDependencySelector
                                    key={subc.id} 
                                    subcomponent={subc}
                                    onChange={handleChange}
                                    shadowmodeId={getShadowmodeId(subc.id)}
                                />
                            );
                    })}
                </div>
                :
                <div>
                    No subcomponents defined!
                </div>
            }
        </div>
    );
};

export default DegradationLevelDependencySetInputRow;