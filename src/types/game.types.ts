export type Difficulty = 'easy' | 'medium' | 'hard'

export type GameCard = {
    id: number;
    icon: string;
    isMatched: boolean;
}

export type GameState = {
    cards: GameCard[]
    flippedCards: number[]
    moves: number,
    isGameStart: boolean
    matchedCards: number
}

export type HighScore = {
    moves: number;
    time: number; 
    difficulty: string;
};
