import { difficulty } from "../types"

export interface DifficultyButtonProps{
    difficulty:difficulty; 
    setDifficulty:(difficulty:difficulty)=> void;

}
export const DifficultyButton=(props:DifficultyButtonProps)=>{
    return(
        <>
            <button id={`${props.difficulty}`} className='difficulty-button' onClick={()=>props.setDifficulty(props.difficulty)}>{props.difficulty}</button>
        </>
    )
}