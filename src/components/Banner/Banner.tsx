import types from './Banner.module.scss'
import { IoMdTrophy } from "react-icons/io";

type BannerProps = {
    moves: number
    time: string
    isBeated: boolean
    newGame: () => void
    setIsOpen:  () => void
}

const Banner = ({ moves, time, isBeated, newGame, setIsOpen }: BannerProps) => {
    return (
        <section className={types.container}>
           <div className={types.banner}>
                <div className={types.head}>
                    <p  className={types.icon}><IoMdTrophy/></p>
                    <p className={types.youWin}>YOU WIN</p>
                    {isBeated && (<p className={types.newScore}>New Score!</p>)}
                </div>

                <div className={types.dataContainer}>
                    <p className={types.data}>Moves: {moves}</p>

                    <p className={types.data}>Time: {time}</p>
                </div>

                <button 
                    onClick={() => { setIsOpen(), newGame()}}
                    className={types.resetBtn}
                >
                    New game
                </button>
           </div>
        </section>
    )
}

export default Banner
