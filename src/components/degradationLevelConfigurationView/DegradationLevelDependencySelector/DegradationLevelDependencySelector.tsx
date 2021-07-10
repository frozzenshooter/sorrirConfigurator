import IDegradationLevelDependency from "../../../models/IDegradationLevelDependency";
import ISubcomponent from "../../../models/ISubcomponent";
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

/**
 * Styles for the @DegradationLevelDependencySelector
 */
 const useStyles = makeStyles((theme: Theme) =>
 createStyles({
        formControl: {
            marginRight: theme.spacing(1),
            minWidth: 200,
            maxWidth: 200,
            marginTop: "8px",
        },
       selectEmpty: {
           marginTop: theme.spacing(2),
       },
   })
);

export interface IDegradationLevelDependencySelectorProps {
    subcomponent: ISubcomponent;
    shadowmodeId: string;
    onChange: (dependency: IDegradationLevelDependency) => void;
}

const DegradationLevelDependencySelector = (props: IDegradationLevelDependencySelectorProps) => {

    const {subcomponent, shadowmodeId, onChange} = props;

    const classes = useStyles();

    const handleChange = (shadowmodeId: string) => {

        const newDegradationLevelDependency: IDegradationLevelDependency = {
            shadowmodeId: shadowmodeId,
            subcomponentId: subcomponent.id
        };

        onChange(newDegradationLevelDependency);
    };

    let label = subcomponent.name;
    if(label.length > 20){
        label = label.substring(0, 17) + "...";
    }

    return (
        <FormControl className={classes.formControl} key={subcomponent.id}>
            <InputLabel shrink id="shadowmode-select-label">{label}</InputLabel>
            <Select
                variant="outlined"
                labelId="shadowmode-select-label"
                id="shadowmode-select"
                value={shadowmodeId}
                onChange={(ev)=> {
                    handleChange((ev.target.value as string));
                }}
                displayEmpty
                className={classes.selectEmpty}
                >
                <MenuItem value="">
                    <em>DC</em>
                </MenuItem>
                {subcomponent.shadowmodes.map(sm => {
                        return (
                            <MenuItem value={sm.id}>{sm.name}</MenuItem>
                        );
                    })
                }                
            </Select>
        </FormControl>
    );
};

export default DegradationLevelDependencySelector; 