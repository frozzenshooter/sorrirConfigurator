import React from 'react';
import TextField from '@material-ui/core/TextField';
import Chip from '@material-ui/core/Chip';


export interface ChipCreatorProps{
    shadowmodes: string[];
    handleChipCreation: (shadowmode: string) => void;
    handleChipDeletion: (shadowmode: string)=> void;
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
                        if (ev.key === 'Enter' && this.state.shadowmodeInput != "") {
                            ev.preventDefault();
                            this.setState({shadowmodeInput: ""});
                            this.props.handleChipCreation(this.state.shadowmodeInput);
                        }
                    }
                }/>
                <ol>
                    {this.props.shadowmodes.map((shadowmode) => {
                        return (
                            <li key={shadowmode}>
                                <Chip
                                label={shadowmode}
                                onDelete={(ev) => {
                                        ev.preventDefault();
                                        this.props.handleChipDeletion(shadowmode);
                                    }
                                }
                                />
                            </li>);
                        })
                    }
                </ol>
            </div>
        );
    }    
}