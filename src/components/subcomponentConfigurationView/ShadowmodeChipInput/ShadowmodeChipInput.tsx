import { Chip, TextField } from "@material-ui/core";
import React from "react";
import IShadowmode from "../../../models/IShadowmode";
import './ShadowmodeChipInput.css';

export interface IShadowmodeChipInputProps{
    shadowmodes: IShadowmode[];
    onChange: (shadowmodes: IShadowmode[]) => void; 
}

const ShadowmodeChipInput = (props: IShadowmodeChipInputProps) => {
    
    const {shadowmodes, onChange} = props;

    const [textfieldValue, setTextFieldValue] = React.useState<string>("");

    const handleKeyPress = (ev: React.KeyboardEvent<HTMLDivElement>) => {
        if (ev.key === 'Enter' && textfieldValue.trim() !== "" ) {
            ev.preventDefault();
            const newShadowmode :IShadowmode = {
                id: textfieldValue,
                name: textfieldValue
            };

            const indexofShadowmodeWithSameId = shadowmodes.findIndex(s => s.id === newShadowmode.id);

            if(indexofShadowmodeWithSameId === -1){
                //only add if id doesn't exist
                const newShadowmodes = shadowmodes.slice();
                newShadowmodes.push(newShadowmode);

                onChange(newShadowmodes);             
            }
            
            setTextFieldValue("");   
        }
    };
    
    const handleShadowmodeDelete = (shadowmode: IShadowmode) => {
        const newShadowmodes = shadowmodes.filter(s => s.id !== shadowmode.id).slice();
        onChange(newShadowmodes);
    }

    return (
        <div id="shadowmode-chip-input-container">
            <TextField
                label="Shadowmodes" 
                value={textfieldValue}
                onChange={(ev) => {setTextFieldValue(ev.target.value);}}
                onKeyPress={handleKeyPress}
            />
            <ul id="shadowmode-chip-input-shadowmode-list">
                    {shadowmodes.map((shadowmode) => {
                        return (
                            <li key={shadowmode.id} className="shadowmode-chip-input-shadowmode-list-item">
                                <Chip
                                    label={shadowmode.name}
                                    onDelete={(ev) => {
                                            ev.preventDefault();
                                            handleShadowmodeDelete(shadowmode);
                                        }
                                    }
                                />
                            </li>);
                        })
                    }
            </ul>
        </div>
    );
};

export default ShadowmodeChipInput;