import React, { useState, useEffect } from 'react'
import { Button, Col, Dropdown, DropdownButton, Form, Row, Stack } from 'react-bootstrap'
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

const _compArr = [
    
]