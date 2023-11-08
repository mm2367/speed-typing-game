import { useEffect, useMemo, useState } from "react";

export interface TimerProps {
    initialTime: number;
    runTimer:boolean;
    shouldDisplayResult:boolean;
    setShouldDisplayResult:(displayResult:boolean)=>void;
}
export const Timer = (props: TimerProps) => {
    const [localTimer,setLocalTimer]=useState<number>(props.initialTime);
   
    const prettyPrintTime = useMemo(() => {
        let seconds: number = localTimer as number % 60;
        let minutes: number = Math.floor(localTimer as number / 60);
        let minutesInString = minutes.toString().length === 1 ? "0" + minutes : minutes;
        let secondsInString = seconds.toString().length === 1 ? "0" + seconds : seconds;
        return `${minutesInString} : ${secondsInString}`;
    }, [localTimer])

    useEffect(()=>{
    if(localTimer as number > 0 && props.runTimer && !props.shouldDisplayResult){
        setTimeout(() => {
            setLocalTimer(prevCount => prevCount as number - 1);
        }, 1000);
    
    }
    if(localTimer as number===0){
        props.setShouldDisplayResult(true);
    }
},[localTimer,props.runTimer])
    
    return (
        <div className="mb-3">
        <div className="header-font">
            {prettyPrintTime}
        </div>
        <div className={props.runTimer? 'invisible':''}>{'Type to run timer'}</div>
        </div>
    )
}