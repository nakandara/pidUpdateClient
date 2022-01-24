import React, { useState, useEffect } from 'react'
import Swal from 'sweetalert2/dist/sweetalert2.js'

import 'sweetalert2/src/sweetalert2.scss'

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
import 'bootstrap/dist/css/bootstrap.min.css'
import SLTLDBConnection from '../../../src/apis/SLTLDBConnection'
import { notifyError } from 'src/utils/toastify'
import ListComp from '../../zDel/ListComp'
import TireSizeBasic from './individualListCreators/TireSizeBasicLstCreator'
import LugTypeLstCreator from './individualListCreators/LugTypeListCreator'
import ConfigListCreator from './individualListCreators/ConfigListCreator'
import RimSizeCreator from './individualListCreators/RimSizeListCreator'
import BrandNameLstCreator from './individualListCreators/BrandNameListCreator'
import SwMsgLstCreator from './individualListCreators/SwMsgListCreator'
import TireTypeLstCreator from './individualListCreators/TireTypeListCreator'
import 'react-dropdown/style.css'
import TireSizeBasicLstCreator from './individualListCreators/TireSizeBasicLstCreator'
import RimSizeLstCreator from './individualListCreators/RimSizeListCreator'
import ConfigLstCreator from './individualListCreators/ConfigListCreator'
import WheelColorLstCreator from './individualListCreators/WheelColorListCreator'
import SaveButton from './SaveButton'
import { cilAlignCenter } from '@coreui/icons'
import './PidUpdate.css'
import axios from 'axios'
import { useForm } from 'react-hook-form'
const PidUpdate = () => {
  //States---------------------------------------------------------------------------
  const [data, setData] = useState([])
  const [refinedArr, setRefinedArr] = useState([])

  const [sbid, setSbid] = useState(0)
  const [ltid, setLtid] = useState(0)
  const [configid, setConfigid] = useState(0)
  const [rimsizeid, setRimsizeid] = useState(0)
  const [brandid, setBrandid] = useState(0)
  const [swmsgid, setSwmsgid] = useState(0)
  const [wheelcolorid, setWheelcolorid] = useState(0)
  const [tiretypeid, setTiretypeid] = useState(0)

  const [view1, setView1] = useState([])
  const [view2, setView2] = useState([])
  const [view3, setView3] = useState([])
  const [view4, setView4] = useState([])
  const [sizeid, setSizeid] = useState([])
  const [pid, setPid] = useState([])
  const [moldIdArr, setMoldIDArr] = useState([])
  const [tirecode, setTirecode] = useState([])
  const [gettirecodeforvalidatepid, setGettirecodeforvalidatepid] = useState([])

  const [blnDropDownSelected, setBlnDropDownSelected] = useState(false)

  const [moldid, setMoldid] = useState([])
  const [valiPid, setValiPid] = useState([])
  const [getinputbox, setGetinputbox] = useState(true)
  const [getinputbox1, setGetinputbox1] = useState(1)
  const [gettirecodeforpid, setGettirecodeforpid] = useState([])
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
  // Validation
  const {
    register,
    handleSubmit,
    reset,
    trigger,
    formState: { errors },
  } = useForm()
  //Use Effects-----------------------------------------------------------------

  //DAta useEffect
  useEffect(() => {
    if (data) {
      const x = data.map((value) => {
        const obj = {}
        obj.id = value.sizebasicid
        obj.value = value.tiresizebasic
        return
      })

      setRefinedArr(x)
    }
  }, [data])

  useEffect(() => {
    if (view3.rowCount === 1) {
      Swal.fire({
        position: 'top-middle',
        icon: 'success',
        title: 'PID Save Success',
        showConfirmButton: false,
        timer: 1500,
      })
    } else {
    }
  }, [view3])

  useEffect(() => {}, [view2])

  useEffect(() => {
    view1.forEach((element) => {
      const value = Object.values(element)[0]
      setSizeid(value)
    })
  }, [view1])
  //--------------------------------------get only mold id
  view1.length !== 0 && console.log('View One', view1)
  sizeid.length !== 0 && console.log('View Two', sizeid)

  useEffect(() => {
    if (view4.rowCount === 1) {
      Swal.fire({
        position: 'top-middle',
        icon: 'success',
        title: 'Tire Code Save Success',
        showConfirmButton: false,
        timer: 1500,
      })
    } else {
    }
  }, [view4])
  //---------------------------------

  //-----------------------------------------------------

  //---------------------------------------------------

  //view1 useEffect

  //Hndlers---------------------------------------------------------------
  //Checking all dropdowns are selected
  const confirmAllDropDwonsSelected = () => {
    /**
    {
    tireSize: 'Tire Size',
    lugType: 'Lug Type',
    config: 'Configuration',
    tireType: 'Tire Type',
    rimSize: 'Rim',
    swMsg: 'Side Wall',
    brandName: 'Brand',
    wheelColor: 'Wheel Color',
  }
    */
    if (
      selectedDetailState.tireSize !== 'Tire Size' &&
      selectedDetailState.lugType !== 'Lug Type' &&
      selectedDetailState.config !== 'Configuration' &&
      selectedDetailState.tireType !== 'Tire Type' &&
      selectedDetailState.rimSize !== 'Rim' &&
      selectedDetailState.swMsg !== 'Side Wall' &&
      selectedDetailState.brandName !== 'Brand' &&
      selectedDetailState.wheelColor !== 'Wheel Color'
    ) {
      console.log(
        'tire size , LT ,configaration,Tire Type,Rim,Side Wall,Brand,Wheel Color is selected',
        setBlnDropDownSelected(false),
      )
    } else {
      console.log(
        'tire size , LT ,configaration,Tire Type,Rim,Side Wall,Brand,Wheel Color is NOT selected',
        setBlnDropDownSelected(true),
      )
    }
  }

  useEffect(() => {
    if (blnDropDownSelected === false) {
      addToList()
    } else {
      console.log('no pid')
    }
  }, [blnDropDownSelected])

  //UseEffect for SelectedDetailStage
  useEffect(() => {
    if (selectedDetailState) {
      confirmAllDropDwonsSelected()
    }
  }, [selectedDetailState])
  //---------------------
  useEffect(() => {
    addPid()
  }, [sizeid])
  //-----------------------
  useEffect(() => {
    moldidget()
  }, [sizeid])

  //------------------------------------

  //Drop Down Click Handler id dropDownName,value is descrbed in DropDwonComp.js
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
  //BClick handler of show size id
  const addToList = async () => {
    try {
      const add = await fetch(`http://localhost:5433/size/getsizeid/${sbid}/${ltid}/${configid}`)
      const fetchData = await add.json()
      console.log(fetchData)
      setView1(fetchData.rows)
      console.log(view1)
    } catch (err) {
      console.error(err.message)
    }

    validatepid()
    addPid()
  }
  //-----------------------------

  const validatepid = async () => {
    console.log(sizeid)
    try {
      // const valipid = await fetch(`http://localhost:5433/pid/onlypid-detail/${pid}`)
      // const fetchDatavalidpid = await valipid.json()
      // console.log(fetchDatavalidpid)
      // setValiPid(fetchDatavalidpid)
      // console.log(valiPid)

      const valipid = await SLTLDBConnection.get(`/pid/onlypid-detail/${pid}`)
      setValiPid(valipid)
      console.log(valipid)
    } catch (err) {
      console.error(err.message)
    }
  }
  const addPid = async () => {
    console.log(sizeid)
    console.log(rimsizeid)

    try {
      console.log('djdffhfh')
      const add1 = await fetch(
        `http://localhost:5433/pid/getpidno/${sizeid}/${rimsizeid}/${brandid}/${swmsgid}/${tiretypeid}/${wheelcolorid}`,
        {
          method: 'GET',
        },
      ).then((response) => {
        response.json().then((res) => {
          console.log(res)
          setView2(res)
        })
      })
    } catch (err) {
      console.error(err.message)
      console.log('no input box')
      setGetinputbox(1)
    }

    savePid()
  }

  const savePid = async (e) => {
    console.log(pid)
    try {
      const body = {
        pid,
        sizeid,
        rimsizeid,
        brandid,
        swmsgid,
        tiretypeid,
        wheelcolorid,
      }

      const add4 = await fetch('http://localhost:5433/pid/postpid', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      }).then((response) => {
        response.json().then((res) => {
          console.log(res)

          setView3(res)
        })
      })
    } catch (err) {
      console.log(err)
    }
    moldidget()
  }

  // get Mold id

  //-------------------------------------
  const moldidget = async () => {
    console.log(sizeid)
    try {
      const findmold = await fetch(`http://localhost:5433/size/getmoldid/${sizeid}`)
      const fetchDatamold = await findmold.json()
      console.log(fetchDatamold)
      setMoldIDArr(fetchDatamold.rows)
      console.log(moldIdArr)
    } catch (err) {
      console.error(err.message)
    }
    gettalltirecode()
  }
  // pid
  // get tire code all detils for pid

  const getTirecodeForpid = async () => {
    console.log(pid)
    try {
      const getTirecodepid = await fetch(
        `http://localhost:5433/tirecode/gettirecodedetailforpid/${pid}`,
      )
      const fetchDatatirecode = await getTirecodepid.json()
      console.log(fetchDatatirecode)
      setGettirecodeforpid(fetchDatatirecode)
    } catch (err) {
      console.error(err.message)
    }
  }
  // post tire code
  const savetirecode = async (e) => {
    console.log('moldid' + moldid)
    console.log('lastTirecode' + tirecode)
    //console.log(moldid)

    let tcode = tirecode

    try {
      const body = {
        tirecode,
        pid,
        moldid,
      }

      for (const mid of moldIdArr) {
        console.log(moldIdArr, '================')
        console.log(tcode)
        console.log(mid.moldid)
        const add6 = await fetch('http://localhost:5433/tirecode/posttirecode', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ tirecode: tcode, pid, moldid: mid.moldid }),
        }).then((response) => {
          response.json().then((res) => {
            console.log(res)
            setView4(res)
          })
          tcode = tcode + 1
          setTirecode(tcode + 1)
        })
      }
    } catch (err) {
      console.log(err)
    }
  }
  //--------

  //---------------------------------------------

  //getall tire code
  // const gettalltirecode = async () => {
  //   try {
  //     const add7 = await fetch(`http://localhost:5433/tirecode/gettirecodedetail`, {
  //       method: 'GET',
  //     }).then((response) => {
  //       response.json().then((res) => {
  //         console.log(res.rowCount + 153, 399)

  //         setTirecode(res.rowCount + 153, 399)
  //         console.log('latTirecode' + tirecode)
  //       })
  //     })
  //     add7()
  //   } catch (err) {
  //     console.error(err.message)
  //   }
  //   savetirecode()
  // }
  const onSubmit = () => {
    console.log()
    reset()
  }
  //
  const gettalltirecode = async () => {
    if (valiPid.length === 0) {
      try {
        const NumOfActual1 = await SLTLDBConnection.get(`/tirecode/gettirecodedetail`)
        console.log(NumOfActual1.data.data.restaurants[0].tirecode + 1)
        setTirecode(NumOfActual1.data.data.restaurants[0].tirecode + 1)
        savetirecode()
      } catch (err) {
        console.log(err)
      }
    }
  }
  //

  // const onGetId = (e) => {}

  // const deletetirecode = async (id) => {
  //   console.log('delete')
  //   try {
  //     const deletetire = await fetch(`http://192.168.1.26:3012/tirecode/deletetirecode/${id}`, {
  //       method: 'DELETE',
  //     })
  //     alert('delete succesful')
  //     setGettirecodeforpid(gettirecodeforpid.filter((b) => b.tirecode !== id))
  //   } catch (err) {
  //     console.error(err.message)
  //   }
  // }
  //--------------------------------------
  // const gettirecodeforvalidate = async () => {
  //   try {
  //     const gettirecodebyvalidate = await fetch(
  //       `http://192.168.1.26:3012/tirecode/gettirecodedetailvalidatepid${pid}`,
  //       {},
  //     )
  //     const fetchDatatirecodebyvalidate = await gettirecodebyvalidate.json()
  //     console.log(fetchDatatirecodebyvalidate)
  //     setGettirecodeforvalidatepid(fetchDatatirecodebyvalidate)
  //   } catch (err) {
  //     console.error(err.message)
  //   }
  // }
  return (
    <div className="container">
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

      <div>
        <div className="inputbox">
          <form onChange={handleSubmit(onSubmit)}>
            <input
              className="form-control"
              {...register('pid', {
                required: '',
                minLength: {
                  value: 6,
                  message: 'Minimum allowed pid length is 6',
                },
                maxLength: {
                  value: 6,
                  message: 'Maximum allowed pid length is 6',
                },
                pettern: {
                  value: /^[0-9]*$/,
                  message: 'only numbers are allowed',
                },
              })}
              type="text"
              placeholder="Enter New Pid"
              value={pid}
              onChange={(e) => setPid(e.target.value)}
              onKeyUp={() => {
                trigger('pid')
              }}
              maxLength={6}
            />
            {errors.pid && <small className="text-danger">{errors.pid.message}</small>}
          </form>
        </div>
      </div>

      <div className="saveb">
        {' '}
        <ButtonGroup className="mb-2">
          <Button
            onClick={() => {
              addToList()
            }}
          >
            Save PID
          </Button>
        </ButtonGroup>
      </div>

      <div>{view1?.rows?.length > 0 ? <p></p> : <p></p>}</div>
      <div>{getinputbox === 1 ? <div></div> : <p></p>}</div>
      <div>
        {view3.rowCount === 1 ? (
          <Button
            onClick={() => {
              getTirecodeForpid()
            }}
          >
            get tire code details
          </Button>
        ) : (
          <p></p>
        )}
      </div>
      <div style={{ marginLeft: 750, fontStyle: cilAlignCenter }}>
        {view2?.rows?.length > 0 ? <h3></h3> : <p></p>}
      </div>

      <div style={{ marginLeft: 800 }}>
        {view2?.rows?.map((d, key) => {
          return (
            <div className="pidmsg" key={key}>
              <h7>Already has pid :{d.pid} check your selection</h7>
            </div>
          )
        })}
      </div>

      <div style={{ marginLeft: 800 }}>
        {valiPid?.data?.rows?.map((d, key) => {
          return (
            <div className="pidmsg1" key={key}>
              <h7>Already has :{d.pid} number please enter another pid</h7>
            </div>
          )
        })}
      </div>

      <div>
        {view3?.rows?.map((b, key) => {
          return (
            <div key={key}>
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">pid</th>
                    <th scope="col">sizeid</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{b.pid}</td>
                    <td>{b.sizeid}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )
        })}
      </div>
      <div>
        <div>
          {gettirecodeforpid?.rows?.map((b, key) => {
            return (
              <div key={b.tirecode}>
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">tirecode</th>
                      <th scope="col">pid</th>
                      <th scope="col">Moldid</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{b.tirecode}</td>
                      <td>{b.pid}</td>
                      <td>{b.moldid}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )
          })}
        </div>
        <div>
          <div>
            {moldIdArr.map((d, key) => (
              <div key={key} value={d.moldid}></div>
            ))}
          </div>
        </div>
      </div>
      <div></div>

      <div></div>
    </div>
  )
}
export default PidUpdate
