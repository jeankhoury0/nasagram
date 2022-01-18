import {React, useEffect} from "react"
import queryString from 'query-string'

export default function Post() {


    const pageUrl = typeof window !== 'undefined' ? window.location.href : '';
    const query = queryString.parseUrl(pageUrl.toString())
    const date = query.query.date || null
    
    const URL = new URL("https://api.nasa.gov/planetary/apod")
    const API_KEY = "mPPJDe7A3eOPnUtTr8MWWfrWvLdJg8HuhEgVmiAW"
    const params= {
      "api_key": API_KEY,
      "date": date
    }

    URL.search = new URLSearchParams(params).toString()

    

  useEffect(() => {
    fetch(URL)
    .then(res =>{
      return res.json()})
    .then(json =>{
      console.log(json)
    //   setState({
    //     data: json,
    //     loading: false
    //   })
    })

      return () => {
        <div>
        <h1>HTs</h1>
        <div>
            {date}
        {console.log(URL)}
        </div>
    </div>
      }
  })
    
}