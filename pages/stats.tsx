import { Chart } from "components/Chart"
import { Layout } from "components/Layout"
import NoScrollLink from "components/NoScrollLink"
import { Page } from "components/Page"
import { NextPage } from "next"

import styles from "./Stats.module.scss"

const data = [
  {
    label: '1',
    value: 1
  }, {
    label: '2',
    value: 3
  }, {
    label: '3',
    value: 2
  }, {
    label: '4',
    value: 1
  }, {
    label: '5',
    value: 4
  }, {
    label: '6',
    value: 0
  }
]

const Stats: NextPage = () => {
  return (
    <Layout>
      <Page title="Stats">
        <div className={styles.Stats}>
          <div className={styles.statRow}>
            <div className={styles.stat}>
              <h3>8</h3>
              <p>Played</p>
            </div>
            <div className={styles.stat}>
              <h3>100</h3>
              <p>Win %</p>
            </div>
            <div className={styles.stat}>
              <h3>1</h3>
              <p>Current Streak</p>
            </div>
            <div className={styles.stat}>
              <h3>5</h3>
              <p>Max Streak</p>
            </div>
          </div>
          <h2>Guess Distribution</h2>
          <Chart active="1" data={data} />
          <h2>21:11:23</h2>
          <p>
            Until the next <b>eldroW</b>
          </p>
        </div>
      </Page>
    </Layout>
  )
}

export default Stats
