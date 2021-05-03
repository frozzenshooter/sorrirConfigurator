import {Component} from 'react';

/**
 * Properties of a View
 */
export interface ViewProps {
    showNextView: () => void;
    showPreviousView: () => void;
    showView: (viewIndex: number) => void;
    currentView: number;
    isLast: boolean;
    isFirst: boolean;
 }

 /**
  * View that will be used in the wizard
  */
export interface View{
    title: string;
    element: (viewProps: ViewProps) => JSX.Element;
}

/**
 * State of the Wizard
 */
export interface WizardState{
    activeView: number;
}

/**
 * Properties for the wizard
 */
export interface WizardProps {
    views: View[];
}

/**
 * Wizard to navigate through Views forward and backwards 
 */
export class Wizard extends Component<WizardProps,{}>{

    state: WizardState;
    private amountOfViews: number;
    private views: View[];

    constructor(props: WizardProps){ 
        super(props);    

        this.views= props.views;
        this.amountOfViews = this.views.length;    

        this.state  = {
            activeView: 0            
        };
    }

    /**
     * Show the next view
     */
    private showNextView(){
        const nextView = this.state.activeView + 1;
        if (nextView < this.amountOfViews) {
            this.setState({
                activeView: nextView
            });
        }
    }

    /**
     * Show the previous view
     */
    private showPreviousView(){
        const nextView = this.state.activeView - 1;
        if (nextView >= 0) {
            this.setState({
                activeView: nextView
            });
        }
    }

    /**
     * Show a selected view
     */
    private showView(viewId: number){
        if (viewId >= 0 && viewId < this.amountOfViews) {
            this.setState({
                activeView: viewId
            });
        }
    }

    render() {

        const currentIndex = this.state.activeView;
        const view = this.views[currentIndex];
        return  (
        <div>       
            {<view.element
              showNextView= {() => {this.showNextView();}}
              showPreviousView={() => {this.showPreviousView();}}
              showView={(index) => {this.showView(index);}}
              currentView={currentIndex}
              isFirst={false}
              isLast={false}
            />
            }
        </div>
        ); 
    }
}