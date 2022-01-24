import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter>
      <div>
        <a href="https://coreui.io" target="_blank" rel="noopener noreferrer">
          SUNTWS-MANUFACTURING SYSTEM
        </a>
        <span className="ms-1">&copy; 2021 creativeLabs.</span>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
