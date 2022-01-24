import React, { useState, useEffect } from 'react'
import { Button, Col, Dropdown, DropdownButton, Form, Row, Stack } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import SLTLDBConnection from '../../../src/apis/SLTLDBConnection'
import { notifyError } from 'src/utils/toastify'
const SpecUpdate = () => {
  const [pidLst, setPidLst] = useState([])
  const [mold, setMold] = useState([])

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const info = await SLTLDBConnection.get(`/sizebasic/getallsizebasic`)
  //       //for valied sn only
  //       if (info.data) {
  //         setPidLst(info.data.rows)
  //       } else {
  //       }
  //     } catch (err) {
  //       notifyError(err.message)
  //     }
  //   }
  //   fetchData()
  // }, [])

  return <div>asdfasdfasf</div>
}
export default SpecUpdate
