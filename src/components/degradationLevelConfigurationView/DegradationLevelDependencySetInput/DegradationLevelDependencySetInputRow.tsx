import IDegradationLevelDependency from "../../../models/IDegradationLevelDependency";
import IDegradationLevelDependencySet from "../../../models/IDegradationLevelDependencySet";
import ISubcomponent from "../../../models/ISubcomponent";
import DegradationLevelDependencySelector from "../DegradationLevelDependencySelector/DegradationLevelDependencySelector";
import RemoveCircleOutlineOutlinedIcon from '@material-ui/icons/RemoveCircleOutlineOutlined';
import { IconButton } from "@material-ui/core";
import Divider from '@material-ui/core/Divider';
import { Paper } from "@material-ui/core";
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import './DegradationLevelDependencySetInputRow.css';

export interface IDegradationLevelDependencySetInputRowProps {
    subcomponents: ISubcomponent[];
    degradationLevelDependencySet: IDegradationLevelDependencySet;
    onDelete: (degradationLevelDependencySetId: number) => void;
    onChange: (degradationLevelDependencySet: IDegradationLevelDependencySet) => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    rowPaper: {
        width: "100%",
        display: "inline-flex",
        margin: theme.spacing(1)
    }
  }),
);

const DegradationLevelDependencySetInputRow = (props: IDegradationLevelDependencySetInputRowProps) => {

    const {subcomponents, degradationLevelDependencySet, onDelete, onChange} = props;

    const classes = useStyles();

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
        <div className="degradation-level-dependency-set-input-row-container" key={"row "+degradationLevelDependencySet.id}>
            <Paper variant="outlined" className={classes.rowPaper}>
                <div className="degradation-level-dependency-set-input-row-delete-button-container">
                    <IconButton onClick={handleDelete} color="secondary">
                        <RemoveCircleOutlineOutlinedIcon /> 
                    </IconButton>    
                </div>    
                <Divider 
                    className="degradation-level-dependency-set-input-row-divider"
                    orientation="vertical" 
                    flexItem 
                    style={{
                        marginRight: "8px",  
                    }}
                />       
                {subcomponents.length > 0?
                    <div className="degradation-level-dependency-set-input-row-dependency-container">
                        {subcomponents.map(subc => {
                                return (
                                    <DegradationLevelDependencySelector
                                        key={subc.id + " " + degradationLevelDependencySet.id} 
                                        subcomponent={subc}
                                        onChange={handleChange}
                                        shadowmodeId={getShadowmodeId(subc.id)}
                                    />
                                );
                        })}
                    </div>
                    :
                    <div className="degradation-level-dependency-set-input-row-no-subcomponents-container">
                        No subcomponents defined!
                    </div>
                }
            </Paper>
        </div>
    );
};

export default DegradationLevelDependencySetInputRow;