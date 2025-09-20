import { useState, useEffect, useCallback, useMemo } from 'react'
import { LEVEL_OF_DIFFICULTIES, MAX_FLIPPED_CARDS } from '../../constants/game.constants'
import { createGameCards, formatTime } from '../../utils/game.utils'
import type { GameState, HighScore } from '../../types/game.types'
import { PiCrownSimpleFill } from "react-icons/pi";
import styles from './GamePage.module.scss'
import useTimer from '../../hooks/useTimer'
import useGetHighScore from '../../hooks/useGetHighScore'
import useSaveHighScore from '../../hooks/useSaveHighScore'
import Card from '../../components/Card/Card'
import Stats from '../../components/Stats/Stats'
import DropDown from '../../components/DropDown/DropDown';
import Banner from '../../components/Banner/Banner';

const GamePage = () => {
    const [ highScore, setHighScore ] = useState<HighScore>()
    const [ difficulty, setDifficulty ] = useState<keyof typeof LEVEL_OF_DIFFICULTIES>('medium');
    const [ isOpen, setIsOpen ] = useState({
        open: false,
        isBeated: false
    });
    const [ gameState, setGameState ] = useState<GameState>({
        cards: [],
        flippedCards: [],
        moves: 0,
        isGameStart: false,
        matchedCards: 0,
    })

    const { timer, resetTimer, stopTimer } = useTimer(gameState.isGameStart);
    const formattedTime = formatTime(timer);
    
    const startGame = useCallback((level: keyof typeof LEVEL_OF_DIFFICULTIES) => {
        const totalPairs = (LEVEL_OF_DIFFICULTIES[level] * LEVEL_OF_DIFFICULTIES[level]) / 2;
    
        const gameCards = createGameCards(totalPairs);
    
        setGameState(prev => ({ 
            ...prev, 
            cards: gameCards, 
            flippedCards: [],
            moves: 0,
            isGameStart: false,
            matchedCards: 0,
        }));
        
        resetTimer();
    }, [resetTimer])
    
    const flipCard = useCallback((index: number) => {
        setGameState(prev => {
            if (prev.flippedCards.length === MAX_FLIPPED_CARDS) return prev;

            if (prev.flippedCards.includes(index)) return prev;

            const newFlipped = [...prev.flippedCards, index];
            let updatedCards = prev.cards;
            let matchedCards = prev.matchedCards;
            let moves = prev.moves;

            if (newFlipped.length === 2) {
                const [firstIndex, secondIndex] = newFlipped;
                const matched = prev.cards[firstIndex].icon === prev.cards[secondIndex].icon;

                if (matched) {
                    updatedCards = prev.cards.map((card, idx) =>
                        idx === firstIndex || idx === secondIndex
                            ? { ...card, isMatched: true }
                            : card
                    );
                    matchedCards += 1;
                }
                
                moves += 1;
                setTimeout(() => {
                    setGameState(prev => ({
                        ...prev,
                        flippedCards: [],
                        cards: updatedCards,
                        moves,
                        matchedCards,
                    }));
                }, 500);
                return { ...prev, flippedCards: newFlipped, isGameStart: true };
            }

            return { ...prev, flippedCards: newFlipped, isGameStart: true };
        });
    }, []);

    const flipCardHandlers = useMemo(() => {
        return gameState.cards.map((_, index) => () => flipCard(index));
    }, [gameState.cards, flipCard]);


    useEffect(() => {
        startGame(difficulty)
        setHighScore(useGetHighScore(difficulty))
    }, [difficulty])

    useEffect(() => {
        if(gameState.isGameStart && gameState.matchedCards === gameState.cards.length / 2){
            stopTimer()
            const isScoreBeated = useSaveHighScore(gameState.moves, timer, difficulty)
            setIsOpen({ open: true, isBeated: isScoreBeated})
        }
    }, [gameState.matchedCards])

    return (
        <main className={isOpen.open ? styles.noscroll : ''}>
            {isOpen.open ? (
                <Banner
                    moves={gameState.moves}
                    time={formattedTime}
                    isBeated={isOpen.isBeated}
                    newGame={() => startGame(difficulty)}
                    setIsOpen = {() => setIsOpen({ open: false, isBeated: false })}
                />
            ) : null}

            <section className={styles.header}>
                <div className={styles.highScore}>
                    <PiCrownSimpleFill className={styles.icon}/>
                    <p className={styles.highScoreLabel}>{ highScore?.moves ? highScore.moves : 0 }</p>
                </div>

                <h1 className={styles.title}>MEMOPLUSGOLD</h1>

                <button 
                    onClick={() => startGame(difficulty)}
                    className={styles.resetBtn}
                >
                    RESTART
                </button>
            </section>

            <section className={styles.pageBody}>
                <div className={styles.score}>
                    <Stats data={gameState.moves}/>
                </div>
                
                <div className={styles.main}>
                    <div className={styles.details}>
                        <p className={styles.timer}>Timer: {formattedTime}</p>
                        <DropDown
                            difficulty={difficulty}
                            setDifficulty ={setDifficulty}
                        />
                    </div>

                    <div 
                        className={styles.board}
                        style={{
                            gridTemplateColumns: `repeat(${LEVEL_OF_DIFFICULTIES[difficulty]}, 1fr)`,
                            gridTemplateRows: `repeat(${LEVEL_OF_DIFFICULTIES[difficulty]}, 1fr)`,
                        }}
                    >
                        {gameState.cards.map((card, index) => (
                            <Card
                                key={card.id}
                                value={card.icon}
                                isMatched={card.isMatched}
                                isFlipped={gameState.flippedCards.includes(index)}
                                onFlipped={flipCardHandlers[index]}
                            />
                        ))}
                    </div>
                </div>
           </section>
        </main>
    )
}

export default GamePage
