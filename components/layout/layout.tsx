import { FC, Fragment, ReactNode } from 'react'
import MainNavigation from './main-navigation/main-navigation'

const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <Fragment>
      <MainNavigation />
      {children}
    </Fragment>
  )
}

export default Layout
