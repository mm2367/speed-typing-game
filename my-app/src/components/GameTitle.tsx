import { ResetButton } from "./ResetButton"
export interface GameTitleProps{
    shouldShowResetButton:boolean;
    handleReset:()=> void;
}
export const GameTitle=(props:GameTitleProps)=>{
    return(
        <div>
        <div className='header-font'>Speed Typing Test</div>
        {props.shouldShowResetButton && <ResetButton handleReset={()=>props.handleReset()}/>}
        </div>
    )
}