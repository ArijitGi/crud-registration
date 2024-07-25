import './App.css';
import { FaEnvelope, FaLock, FaUser} from 'react-icons/fa';
import { useEffect, useState } from 'react';
import axios from "axios"

axios.defaults.baseURL = "http://localhost:8000/"


function App() {
  // const [addSection,setAddSection] = useState(false)
  const [formData,setFormData] = useState({
    email : "",
    password : "",
    retpePassword : "",
    firstname : "",
    lastname : "",
    gender : "",
    country : "",
    terms : "",
    newsletter : "",
  })

  const [dataList,setDataList] = useState([])

  const handleOnChange = (e)=>{
    const {value,name} = e.target
    setFormData((preve)=>{
      return{
        ...preve,
        [name] : value
      }
    })
  }

  

  const handleSubmit = async(e)=>{
    e.preventDefault()
    const data = await axios.post("/create", formData)
    console.log(data)
    if(data.data.success){
      // setAddSection(false)
      alert(data.data.message)
    }
  }
  const getFetchData = async()=>{
    const data = await axios.get("/")
    console.log(data)
    if(data.data.success){
      setDataList(data.data.data)
      // alert(data.data.message)
    }
  }
  useEffect(()=>{
    getFetchData()
  },[])

  console.log(dataList)

  return (
    <>
      <div className="container">
        <div className="addContainer">
          <form onSubmit={handleSubmit}>
            <h1>Responsive Registration Form</h1>

            <div className="inputContainer">
              <FaEnvelope className="icon" />
              <input type="email" placeholder="Email" name="email" className='form-control rounded-0' onChange={handleOnChange} />
            </div>

            <div className="inputContainer">
              <FaLock className="icon" />
              <input type="password" placeholder="Password" name="password" className='form-control rounded-0' onChange={handleOnChange} />
            </div>

            <div className="inputContainer">
              <FaLock className="icon" />
              <input type="password" placeholder="Re-type Password" name="retypePassword" className='form-control rounded-0' onChange={handleOnChange} />
            </div>

            <div className="nameContainer">
              <div className="inputContainer">
                <FaUser className="icon" />
                <input type="text" id="firstName" placeholder="First Name" name="firstname" className='form-control rounded-0' onChange={handleOnChange} />
              </div>
              
              <div className="inputContainer">
                <FaUser className="icon" />
                <input type="text" id="lastName" placeholder="Last Name" name="lastname" className='form-control rounded-0' onChange={handleOnChange} />
              </div>
            </div>

            <div className="genderContainer">
              <input type="radio" id="male" name="gender" value="male" onChange={handleOnChange} />
              <label htmlFor="male">Male</label>

              <input type="radio" id="female" name="gender" value="female" onChange={handleOnChange} />
              <label htmlFor="female">Female</label>
            </div>

            <div className="inputContainer">
              <select id="country" defaultValue="" name="country" className='form-control rounded-0' onChange={handleOnChange}>
                <option value="" disabled>Select a country</option>
                <option value="usa">United States</option>
                <option value="uk">United Kingdom</option>
                <option value="canada">Canada</option>
              </select>
            </div>

            <div className="termsContainer">
              <input type="checkbox" id="terms" name="terms" onChange={handleOnChange} />
              <label htmlFor="terms">I agree with the terms and conditions</label>
            </div>

            <div className="newsletterContainer">
              <input type="checkbox" id="newsletter" name="newsletter" onChange={handleOnChange} />
              <label htmlFor="newsletter">I want to receive the newsletter</label>
            </div>

            <button type="submit" className='btn'>Register</button>
          </form>
        </div>
      </div>


    </>
  );
}

export default App;
