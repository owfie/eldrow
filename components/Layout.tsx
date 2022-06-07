import { motion as Motion } from 'framer-motion'

const variants = {
  hidden: { opacity: 0, x: -200, y: 0 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: 0, y: -100 },
}

export const Layout: React.FC = ({ children }) => {
  return (
    <Motion.div
      variants={variants}
      initial="hidden"
      animate="enter"
      exit="exit"
      transition={{type: 'linear'}}
    >
      {children}
    </Motion.div>
  )
}
