import { Chip, TextField } from "@material-ui/core";
import React from "react";
import './ChipInput.css';

export interface IChip {
    id: string;
    name:string;
}

export interface ChipInputProps {
    label: string,
    chips: IChip[],
    onChange: (chips: IChip[]) => void
}

/**
 * Chip input that allows to display already existing Chips and add more or remove them
 * 
 * A chip will contain an id and a name and can therefore be directly mapped to shadowmodes 
 * 
 * The on change method will always be called when either a new chip was added or one was deleted. It will hand obver a complete list of all chips
 * 
 * @param props 
 * @returns 
 */
const ChipInput = (props: ChipInputProps) => {

    const {label, chips, onChange} = props;

    const [textfieldValue, setTextFieldValue] = React.useState<string>("");

    const handleKeyPress = (ev: React.KeyboardEvent<HTMLDivElement>) => {
        if (ev.key === 'Enter' && textfieldValue.trim() !== "" ) {
            ev.preventDefault();
            const newChip : IChip = {
                id: textfieldValue,
                name: textfieldValue
            };

            const indexofChipWithSameId = chips.findIndex(c => c.id === newChip.id);

            if(indexofChipWithSameId === -1){
                //only add if id doesn't exist
                const newChips = chips.slice();
                newChips.push(newChip);

                onChange(newChips);             
            }
            
            setTextFieldValue("");   
        }
    };

    const handleChipDelete = (chip: IChip) => {
        const newChips = chips.filter(c => c.id !== chip.id).slice();
        onChange(newChips);
    }

    return (
        <div id="chipinput-chip-input-container">
            <TextField
                style={{flexShrink: 0}}
                label={label}
                value={textfieldValue}
                onChange={(ev) => {setTextFieldValue(ev.target.value);}}
                onKeyPress={handleKeyPress}
            />
            <ul id="chipinput-chip-input-chip-list">
                    {chips.map((chip) => {
                        return (
                            <li key={chip.id} className="chipinput-chip-input-chip-list-item">
                                <Chip
                                    label={chip.name}
                                    onDelete={(ev) => {
                                            ev.preventDefault();
                                            handleChipDelete(chip);
                                        }
                                    }
                                />
                            </li>);
                        })
                    }
            </ul>
        </div>
    );

}

export default ChipInput;
