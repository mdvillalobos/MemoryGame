import { getHighScores } from "../utils/game.utils"

const useSaveHighScore = ( moves: number, time: number, difficulty: string ) => {
    const highScores = getHighScores();

    const currentHighScore = highScores[difficulty];

    if(!currentHighScore || currentHighScore.moves > moves || (currentHighScore === moves && currentHighScore.time > time)) {
        highScores[difficulty] = { moves: moves, time: time, difficulty: difficulty }
        localStorage.setItem('highscore', JSON.stringify(highScores))
        return true;
    }

    return false
}

export default useSaveHighScore