import axios from 'axios'

export default axios.create({
  baseURL: 'http://localhost:5433', //<== no back    slashe here
})
