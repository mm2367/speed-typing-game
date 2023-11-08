import { difficulty } from "../types";
import { DifficultyButton } from "./DifficultyButton";
export interface DifficultyButtonRowProps{
    setCurrentDifficulty:(difficulty:difficulty)=> void;
}
export const DifficultyButtonRow=(props:DifficultyButtonRowProps)=>{
    const difficulties:difficulty[]= ['easy','medium','hard','veteran'];
    
    return(
        <div className="difficulty-button-row-wrapper">
            {difficulties.map((difficulty:difficulty)=>{
             return (
             <DifficultyButton
             setDifficulty={()=>props.setCurrentDifficulty(difficulty)}
             difficulty={difficulty}
             />   
        )
        })}
        </div>

    )
}