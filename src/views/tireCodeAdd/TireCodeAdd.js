import PropTypes, { number } from 'prop-types'
import React, { useEffect, useState } from 'react'
import {
  Alert,
  Button,
  ButtonGroup,
  Col,
  Dropdown,
  DropdownButton,
  Form,
  Row,
  Stack,
} from 'react-bootstrap'
import SLTLDBConnection from '../../../src/apis/SLTLDBConnection'
import TireSizeBasic from '../pidUpdate/individualListCreators/TireSizeBasicLstCreator'
import LugTypeLstCreator from '../pidUpdate/individualListCreators/LugTypeListCreator'
import ConfigLstCreator from '../pidUpdate/individualListCreators/ConfigListCreator'
import RimSizeLstCreator from '../pidUpdate/individualListCreators/RimSizeListCreator'
import TireSizeBasicLstCreator from '../pidUpdate/individualListCreators/SwMsgListCreator'
import BrandNameLstCreator from '../pidUpdate/individualListCreators/BrandNameListCreator'
import SwMsgLstCreator from '../pidUpdate/individualListCreators/SwMsgListCreator'
import WheelColorLstCreator from '../pidUpdate/individualListCreators/WheelColorListCreator'
import TireTypeLstCreator from '../pidUpdate/individualListCreators/TireTypeListCreator'
import { useForm } from 'react-hook-form'

const TireCodeAdd = () => {
  const [pid, setPid] = useState([])
  // drop down box state
  const [sbid, setSbid] = useState(0)
  const [ltid, setLtid] = useState(0)
  const [configid, setConfigid] = useState(0)
  const [rimsizeid, setRimsizeid] = useState(0)
  const [brandid, setBrandid] = useState(0)
  const [swmsgid, setSwmsgid] = useState(0)
  const [wheelcolorid, setWheelcolorid] = useState(0)
  const [tiretypeid, setTiretypeid] = useState(0)
  const [validpid, setValidtPid] = useState(0)
  const [sizeid, setSizeid] = useState(0)
  const [moldNum, setMoldNum] = useState(0)
  const [selectedDetailState, setSelectedDetailState] = useState({
    tireSize: 'Tire Size',
    lugType: 'Lug Type',
    config: 'Configuration',
    tireType: 'Tire Type',
    rimSize: 'Rim',
    swMsg: 'Side Wall',
    brandName: 'Brand',
    wheelColor: 'Wheel Color',
  })
  const {
    register,
    handleSubmit,
    reset,
    trigger,
    formState: { errors },
  } = useForm()
  const onSubmit = () => {
    console.log()
    reset()
  }
  useEffect(() => {
    getmoldDetails()
  }, [sizeid])
  const handler = (id, value, dropDownName) => {
    switch (dropDownName) {
      case 'tireSize':
        setSbid(id)
        setSelectedDetailState((prevState) => ({
          ...prevState,
          tireSize: value,
        }))
        break
      case 'swMsg':
        setSwmsgid(id)
        setSelectedDetailState((prevState) => ({
          ...prevState,
          swMsg: value,
        }))
        break
      case 'rimSize':
        setRimsizeid(id)
        setSelectedDetailState((prevState) => ({
          ...prevState,
          rimSize: value,
        }))
        break
      case 'tireType':
        setTiretypeid(id)
        setSelectedDetailState((prevState) => ({
          ...prevState,
          tireType: value,
        }))
        break
      case 'lugType':
        setLtid(id)
        setSelectedDetailState((prevState) => ({
          ...prevState,
          lugType: value,
        }))
        break
      case 'config':
        setConfigid(id)
        setSelectedDetailState((prevState) => ({
          ...prevState,
          config: value,
        }))
        break
      case 'brandName':
        setBrandid(id)
        setSelectedDetailState((prevState) => ({
          ...prevState,
          brandName: value,
        }))
        break
      case 'wheelColor':
        setWheelcolorid(id)
        setSelectedDetailState((prevState) => ({
          ...prevState,
          wheelColor: value,
        }))

        break
      default:
        return
    }
  }
  const validatepid = async () => {
    try {
      const valipid = await SLTLDBConnection.get(`/pid/getpidDetailForTirCodeTable/${validpid}`)
      console.log(valipid.data.data.restaurants[0])
      setSizeid(valipid.data.data.restaurants[0].sizeid)
    } catch (err) {
      console.error(err.message)
    }
  }
  const getmoldDetails = async () => {
    try {
      const molddedail = await SLTLDBConnection.get(`/pid/getSizeDetailsFortireCode/${validpid}`)
      console.log(molddedail.rows)
      setMoldNum(molddedail.rows)
    } catch (err) {
      console.error(err.message)
    }
  }
  return (
    <div className="container-fluid">
      <form onChange={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="Enter New Pid"
          value={validpid}
          onChange={(e) => setValidtPid(e.target.value)}
          maxLength={6}
        />
      </form>
      <Button
        onClick={() => {
          validatepid()
        }}
      >
        Save PID
      </Button>
      <Stack direction="horizontal" gap={1}>
        <TireSizeBasicLstCreator
          clickeventfrmMain={handler}
          selectedDetailState={selectedDetailState}
        />
        <div className="vr" />
        <LugTypeLstCreator clickeventfrmMain={handler} selectedDetailState={selectedDetailState} />
        <div className="vr" />
        <ConfigLstCreator clickeventfrmMain={handler} selectedDetailState={selectedDetailState} />
        <div className="vr" />
        <RimSizeLstCreator clickeventfrmMain={handler} selectedDetailState={selectedDetailState} />
        <div className="vr" />

        <BrandNameLstCreator
          clickeventfrmMain={handler}
          selectedDetailState={selectedDetailState}
        />

        <div className="vr" />
        <SwMsgLstCreator clickeventfrmMain={handler} selectedDetailState={selectedDetailState} />

        <div className="vr" />
        <TireTypeLstCreator clickeventfrmMain={handler} selectedDetailState={selectedDetailState} />
        <div className="vr" />

        <WheelColorLstCreator
          clickeventfrmMain={handler}
          selectedDetailState={selectedDetailState}
        />
      </Stack>
      <>{moldNum}</>
    </div>
  )
}

export default TireCodeAdd
