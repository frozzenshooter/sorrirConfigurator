import React from 'react';
import TextField from '@material-ui/core/TextField';
import Chip from '@material-ui/core/Chip';
import IShadowmode from '../../interfaces/IShadowmode';


export interface ChipCreatorProps{
    shadowmodes: IShadowmode[];
    handleChipCreation: (subcomponentId: string, shadowmode: IShadowmode) => void;
    handleChipDeletion: (subcomponentId: string, shadowmode: IShadowmode)=> void;
}

export interface ChipCreatorState{
    shadowmodeInput: string
}

export class ChipCreator extends React.Component<ChipCreatorProps, {}> {

    state: ChipCreatorState;

    constructor(props: ChipCreatorProps){
        super(props);
        this.state = {
            shadowmodeInput: ""
        };
    }

    render() {
        return (
            <div>
                <TextField label="Shadowmode" 

                    value={this.state.shadowmodeInput}
                    onChange={(ev)=>{
                        this.setState({shadowmodeInput: ev.target.value});
                    }}

                    onKeyPress={(ev) =>
                    {                        
                        if (ev.key === 'Enter' && this.state.shadowmodeInput !== "") {
                            ev.preventDefault();
                            this.setState({shadowmodeInput: ""});
                            this.props.handleChipCreation("Subcomponent1", { id: this.state.shadowmodeInput, name: this.state.shadowmodeInput});
                        }
                    }
                }/>
                <ul>
                    {this.props.shadowmodes.map((shadowmode) => {
                        return (
                            <li key={shadowmode.id}>
                                <Chip
                                label={shadowmode.name}
                                onDelete={(ev) => {
                                        ev.preventDefault();
                                        this.props.handleChipDeletion("Subcomponent1", shadowmode);
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