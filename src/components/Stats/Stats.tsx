import styles from './Stats.module.scss'

interface StatsInterface {
    data: number
}

const Stats = ({ data  }: StatsInterface ) => {
    return (
        <div className={styles.data}>
            <h4>{data}</h4>
        </div>
    )
}

export default Stats
