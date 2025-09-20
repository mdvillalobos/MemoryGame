import React, { useState } from "react"
import type { Difficulty } from "../../types/game.types"
import styles from './DropDown.module.scss';
import { FaCaretDown } from "react-icons/fa6";
import { FaCaretUp } from "react-icons/fa6";

interface DropDownProps { 
    difficulty: Difficulty
    setDifficulty: React.Dispatch<React.SetStateAction<Difficulty>>;
}

const DropDown = ({ difficulty, setDifficulty }: DropDownProps) => {
    const [ isOpen, setIsOpen ] = useState(false)
    
    const listOfDifficulties: Difficulty[] = [
        'easy',
        'medium',
        'hard'
    ];

    return (
        <div className={styles.container}>
            <button
                className={styles.dataHolder}
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Choose Difficulty"
            >
                {difficulty}
                <span className={styles.icon}>{isOpen ? <FaCaretUp/> : <FaCaretDown/>}</span>
            </button>

            {isOpen ? (
                <div className={styles.options}>
                    {listOfDifficulties.map((data, index) => (
                        <button 
                            key={index}
                            onClick={() => { setDifficulty(data), setIsOpen(!isOpen)}}
                            className={styles.choices}
                            aria-label={`${data}`}
                        >
                            {data}
                        </button>
                    ))}

                </div>
            ) : (
                null
            )}
        </div>


    )
}

export default DropDown
