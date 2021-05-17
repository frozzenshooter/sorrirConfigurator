import React from 'react';
import TextField from '@material-ui/core/TextField';
import Chip from '@material-ui/core/Chip';
import IShadowmode from '../../interfaces/IShadowmode';
import './ChipCreator.css';

export interface ChipCreatorProps{
    shadowmodes: IShadowmode[];
    handleChipCreation: (shadowmode: IShadowmode) => void;
    handleChipDeletion: (shadowmode: IShadowmode)=> void;
}

export interface ChipCreatorState{
    shadowmodeInput: string
}

/**
 * Component to create chips based on a string input
 */
export default class ChipCreator extends React.Component<ChipCreatorProps, {}> {

    state: ChipCreatorState;

    constructor(props: ChipCreatorProps){
        super(props);
        this.state = {
            shadowmodeInput: ""
        };
    }

    render() {
        return (
            <div id="chip-creator-container">
                <TextField label="Shadowmode" 

                    value={this.state.shadowmodeInput}
                    onChange={(ev)=>{
                        this.setState({shadowmodeInput: ev.target.value});
                    }}

                    onKeyPress={(ev) =>
                    {                        
                        if (ev.key === 'Enter' && this.state.shadowmodeInput.trim() !== "" ) {
                            ev.preventDefault();
                            this.setState({shadowmodeInput: ""});
                            this.props.handleChipCreation({ id: this.state.shadowmodeInput, name: this.state.shadowmodeInput});
                        }
                    }
                }/>
                <ul id="chip-creator-list">
                    {this.props.shadowmodes.map((shadowmode) => {
                        return (
                            <li key={shadowmode.id} className="chip-creator-list-item">
                                <Chip
                                label={shadowmode.name}
                                onDelete={(ev) => {
                                        ev.preventDefault();
                                        this.props.handleChipDeletion(shadowmode);
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
}