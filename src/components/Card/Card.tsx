import styles from './Card.module.scss'
import { TbPlayHandball } from "react-icons/tb";

type CardProps = {
    value: string
    isMatched: boolean
    isFlipped: boolean
    onFlipped: () => void
}   

const Card = ({ value, isMatched, isFlipped, onFlipped } : CardProps) => {
    return (
        <button 
            className={`
                ${styles.card} 
                ${isFlipped || isMatched ? styles.flipped : ''} 
                ${isMatched ? styles.matched : ''} 
            `}
            aria-label={isFlipped || isMatched ? `Card ${value} flipped` : 'Flip card'}
            aria-pressed={isFlipped}
            onClick={isMatched ? undefined : onFlipped}
            onKeyDown={(e) => {
                if ((e.key === 'Enter' || e.key === ' ') && !isMatched) {
                    e.preventDefault();
                    onFlipped();
                }
            }}
            disabled={isMatched}
        >
             <div className={styles.cardInner}>
                <div className={styles.cardFront}><TbPlayHandball/></div>
                <div className={styles.cardBack}>{value}</div>
            </div>
        </button>
    )
}

export default Card

