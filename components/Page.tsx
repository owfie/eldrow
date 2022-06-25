import Footer from './Footer'
import NoScrollLink from './NoScrollLink'
import styles from './Page.module.scss'

interface PageProps {
    children: React.ReactNode
    title: string
}

const Page: React.FC<PageProps> = (props) => {
  const { title, children } = props

  return <div className={styles.Page}>
    <NoScrollLink href='/'>  
        <a
          className={styles.back}
        >
          ← Back to eldroW
        </a>
    </NoScrollLink>
    <h2>{title}</h2>
    {children}
    <Footer />
  </div>
}

export { Page }