import { useEffect, useState } from 'react'
import './App.css'
import axios from "axios"

function App() {
  let [data, setdata] = useState([])
  let [countryName, setcountryName] = useState("")
  let [st, setSt] = useState({
    data :  [{
      "name": {
        "common": "Wallis and Futuna"
      },
      "tld": [
        ".wf"
      ],
  
      "currencies": {
        "XPF": {
          "name": "CFP franc",
          "symbol": "₣"
        }
      },
      "capital": [
        "Mata-Utu"
      ],
    
      "languages": {
        "fra": "French"
      },
  
      "population": 11750,
      "timezones": [
        "UTC+12:00"
      ],
  
      "flags": {
        "png": "https://flagcdn.com/w320/wf.png"
      }
    }]
  })

useEffect(()=>{
  let fetchData = async()=>{

  let res = await axios.get("https://restcountries.com/v3.1/all")
  setdata( await res.data)
}
fetchData()
},[])

useEffect(()=>{
  let api = async()=>{ 
  let country = await axios.get(`https://restcountries.com/v3.1/name/${countryName}?fullText=True`);
  setSt(country);
}
api()
},[countryName])
  return (
      <div className='body'>
        <div className='content'>
          <div className="head">
            <select name="contry"  onChange={(e)=>(setcountryName(e.target.value))}>
              {data.map((res,index)=>(
                <option key={index} value={res.name.common} >{res.name.common}</option>
              ))}
            </select>
          </div>

          <div className="flag">
            <img src={st.data[0].flags.png} alt="Image Broken" width={"200px"} height={"150px"} />
          </div>

          <div className="main">
            <div className="captial">Capital : <span> {st.data[0].capital} </span> </div> 
            <div className="curr"> Region : <span> {st.data[0].region?st.data[0].region:"Not Found"} </span> </div>
            <div className="laun"> Laungage : <span> {(Object.values(st.data[0].languages)).toString()} </span> </div>
            <div className="pop"> Population : <span> {st.data[0].population} </span> </div>
            <div className="time"> TimeZone : <span> {st.data[0].timezones.toString()} </span> </div>
          </div>
        </div>
      </div>
  )
}

export default App
