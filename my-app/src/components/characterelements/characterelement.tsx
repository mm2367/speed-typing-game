import styles from './styles.module.scss';
export interface CharacterElementProps{
    character:string;
    style:'correct' | 'wrong' |'current'|undefined;
}
export const CharacterElement=(props:CharacterElementProps)=>{
    const getStyle=()=>{
        switch(props.style){
            case 'correct':
                return styles.correct
            case 'wrong':
                return styles.wrong
            case 'current':
                return styles.current
            default:
                return styles.default
        }
    }
    return(
        <span className={getStyle()}>{props.character}</span>
    )
}