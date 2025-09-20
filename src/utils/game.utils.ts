import { GAME_ICONS } from "../constants/game.constants";

export const createGameCards = (pairs: number) => {
    const iconsToBeUse = GAME_ICONS.slice(0, pairs)
    const shuffledCards = [...iconsToBeUse, ...iconsToBeUse]
        .map((icon, index) => ({ id: index, icon, isMatched: false }))
        .sort(() => Math.random() - 0.5);

    return shuffledCards
}

export const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString()} : ${secs.toString().padStart(2, '0')}`;
};

export const getHighScores = () => {
    const stored = localStorage.getItem('highscore');
    return stored ? JSON.parse(stored) : {};
}



