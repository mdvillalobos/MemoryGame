import { getHighScores } from '../utils/game.utils';

const useGetHighScore = (difficulty: string) => {
    const currentHighScores = getHighScores();
    return currentHighScores[difficulty] || null
}

export default useGetHighScore

