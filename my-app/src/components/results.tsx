export interface ResultsProps{
    accuracy:number;
    wpm:number
}
export const Results=(props:ResultsProps)=>{
    return(
        <div className="header-font">
            <div>{props.wpm} WPM</div>
            <div>{props.accuracy}%</div>
        </div>
    
    )
}