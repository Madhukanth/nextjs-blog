import Image from 'next/image'
import { FC } from 'react'

import classes from './hero.module.css'

const Hero: FC = () => {
  return (
    <section className={classes.hero}>
      <div className={classes.image}>
        <Image
          src='/images/site/1.jpg'
          height={300}
          width={300}
          alt='Random guy'
        />
      </div>
      <h1>Hi! I am Madhu</h1>
      <p>
        I blog about web development - especially about UI Frameworks like React
        and Angular
      </p>
    </section>
  )
}

export default Hero
