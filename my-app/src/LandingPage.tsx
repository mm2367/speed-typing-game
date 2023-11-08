import { useCallback, useEffect, useState } from "react"
import { DifficultyButtonRow } from "./components/DifficultyButtonRow"
import { Timer } from "./components/Timer";

import { difficulty } from "./types";
import { paragraphDifficulty } from "./paragraphs";
import { CharacterElement } from "./components/characterelements/characterelement";
import { Results } from "./components/results";
import { GameTitle } from "./components/GameTitle";
import { ParagraphDifficulty } from "./components/ParagraphDifficulty";

export const LandingPage=()=>{
    const [currentDifficulty,setCurrentDifficulty]=useState<difficulty|''>('');
    const [timerInSeconds, setTimerInSeconds]=useState<number>(60);
    const [characterElementArr,setcharacterElementArr]=useState<JSX.Element[]>([]);
    const [paragraphCharArr, setParagraphCharArr]=useState<string[]>([])
    const [shouldShowResult, setShouldShowResult]=useState<boolean>(false);
    const [totalInputLetterCount,setInputTotalLetterCount]=useState<number>(0);
    const [inputCharacters, setInputCharacters]=useState<string[]>([])
    const [runTimer,setRunTimer]=useState<boolean>(false);
    // updates diiffuclty and timer when user clicks difficulty
    const handleDiffcultySelection=(difficulty:difficulty)=>{
        setCurrentDifficulty(difficulty);
        switch(difficulty){
            case "easy":
                setTimerInSeconds(60);
                return;
            case "medium":
                setTimerInSeconds(90);
                return
            case "hard":
                setTimerInSeconds(120);
                return
            case "veteran":
                setTimerInSeconds(120)
                return
        }
    }
    //when user start to type update timer and update css for correct/wrong entry
    const handleCharacterInput=(characterInput:string)=>{
        if(!runTimer){
            setRunTimer(!runTimer)
        }
        let inputVal=characterInput.split('')
        setInputCharacters(inputVal);
        setInputTotalLetterCount(inputCharacters.length)
        let copyArr=[...characterElementArr];
        if(inputVal[inputVal.length-1]===paragraphCharArr[inputVal.length-1]){
            copyArr[inputVal.length-1]=<CharacterElement character={paragraphCharArr[inputVal.length-1]} style={"correct"}/>
            setcharacterElementArr(copyArr);
        }
        else if(inputVal[inputVal.length-1]!==paragraphCharArr[inputVal.length-1]){
            copyArr[inputVal.length-1]=<CharacterElement character={paragraphCharArr[inputVal.length-1]} style={"wrong"}/>
            setcharacterElementArr(copyArr);
        }
        if(inputVal.length===paragraphCharArr.length){
            setRunTimer(false)
            setShouldShowResult(true)

        }
    }

    const handlReset=()=>{
        setCurrentDifficulty('');
        setInputCharacters([])
        setInputTotalLetterCount(0)
        setTimerInSeconds(60)
        setParagraphCharArr([])
        setShouldShowResult(false)
        setRunTimer(false)
        setcharacterElementArr([])
    }
    
    useEffect(()=>{
        if(currentDifficulty){
            let splitSelectedParagraph: JSX.Element[]| string[] =paragraphDifficulty[currentDifficulty].split('');
            setParagraphCharArr(splitSelectedParagraph)
            let splitCharactersElements= splitSelectedParagraph.map((character:string)=><CharacterElement  style={undefined}character={character}/>)
            setcharacterElementArr(splitCharactersElements);
        }

    },[currentDifficulty])

    const getWPM = useCallback(() => {
        const result = (totalInputLetterCount / 5) / Number((timerInSeconds / 60).toFixed(1));
        return Number(result.toFixed(2)) ;

    },[totalInputLetterCount,timerInSeconds])
    const getAccuracy=useCallback(()=>{
        let incorrectCount=0
        inputCharacters.forEach((letter,index)=>{
             if(letter!==paragraphCharArr[index])
             incorrectCount++
            })
        const percentage = (((totalInputLetterCount - incorrectCount) / totalInputLetterCount) * 100).toFixed(2)
        return  parseFloat(percentage);
    },[totalInputLetterCount, inputCharacters, paragraphCharArr])

    return (
     <div>
        <GameTitle shouldShowResetButton={!!currentDifficulty} handleReset={handlReset}/>
        {!currentDifficulty && <DifficultyButtonRow setCurrentDifficulty={handleDiffcultySelection}/>}
        {currentDifficulty && <Timer initialTime={timerInSeconds} runTimer={runTimer} setShouldDisplayResult={setShouldShowResult} shouldDisplayResult={shouldShowResult}/>}
        {currentDifficulty && !shouldShowResult && <ParagraphDifficulty children={characterElementArr}/>}
        {currentDifficulty &&  !shouldShowResult && <input className='text-input' onChange={(characterVal)=>handleCharacterInput(characterVal.target.value)}/>}
        {shouldShowResult && <Results wpm={getWPM()} accuracy={getAccuracy()}/>}
     </div>   
    )
}