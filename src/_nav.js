import React from 'react'
import CIcon from '@coreui/icons-react'
import { cilSpeedometer, cilLibraryAdd, cilBarcode } from '@coreui/icons'
import { CNavItem } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'PID Update',
    to: '/pidupdate',
    icon: <CIcon icon={cilLibraryAdd} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'SpecUpdate',
    to: '/specupdate',
    icon: <CIcon icon={cilBarcode} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'TireCodeUpdate',
    to: '/addtirecode',
    icon: <CIcon icon={cilBarcode} customClassName="nav-icon" />,
  },
]

export default _nav
