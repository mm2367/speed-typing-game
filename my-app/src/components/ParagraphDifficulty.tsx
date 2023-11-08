

export interface ParagraphDifficultyProp{
    children:JSX.Element[];
}
export const ParagraphDifficulty=(props:ParagraphDifficultyProp)=>{
    
    return(
        <div className="mx-4">
            {props.children}
        </div>
    )
}