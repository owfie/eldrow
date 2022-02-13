import styles from './Chart.module.scss'

interface ChartProps {
  data: {
    label: string
    value: number
  }[]
  active: string
}

export const Chart: React.FC<ChartProps> = (props) => {

  const {data, active} = props

  // get max value from data
  const max = Math.max(...data.map(d => d.value))

  return (
    <div className={styles.Chart}>
      <div className={styles.axis}>
        {data.map((el, i) => {
          return <div key={i} className={styles.label}>{el.label}</div>
        })}
      </div>
      <div className={styles.data}>
        {data.map((el, i) => {

            const barWidth = el.value / max * 300

            return <div key={i} style={{width: barWidth}} className={`${styles.row} ${active === el.label && styles.active}`}>{el.value}</div>
        })}
      </div>
    </div>
  )
}