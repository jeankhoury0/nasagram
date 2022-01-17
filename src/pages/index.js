import * as React from "react"
import { Helmet } from "react-helmet"

import ImagePost from "../components/imagePost/imagePost"
import Loading from "../components/loading"
// markup
class IndexPage extends React.Component {
  constructor(){
    super()
    this.state= {
      loading: true,
      error: false,
      filter: 
      {
      startDate: "",
      endDate: "",
      count: "10"
    },
      data: []
    }

    this.setFilters = this.setFilters.bind(this)
    this.setState = this.setState.bind(this)

  }

  URL = new URL("https://api.nasa.gov/planetary/apod")
  API_KEY = "mPPJDe7A3eOPnUtTr8MWWfrWvLdJg8HuhEgVmiAW"
  params= {
    "api_key": this.API_KEY,
    "count": "10"
  } 


  async fetchData(){

    this.URL.search = new URLSearchParams(this.params).toString()

    fetch(this.URL)
      .then(res =>{
        return res.json()})
      .then(json =>{
        console.log(json)
        this.setState({
          data: json,
          loading: false
        })
      })
  }

  componentDidMount(){
    this.fetchData()
  }

  componentDidUpdate(prevProps, prevState) {
     if (prevState.filter !== this.state.filter){
       console.log("ENTERED")
       this.params= {
        "api_key": this.API_KEY,
        "start_date": this.state.filter.startDate,
        "end_date": this.state.filter.endDate,
        "count" : this.state.filter.count
      } 
      this.fetchData()
     }
   }

  

  
  setFilters(){
    var startDate = document.getElementById("inputStartDate").value
    var endDate = document.getElementById("inputEndDate").value
    var inputCount = document.getElementById("inputCount").value
    console.log(startDate, endDate, document.getElementById("inputStartDate").value)
    this.setState({
      loading: true,
      filter : {
        startDate: startDate || "",
        endDate: endDate || "",
        count: inputCount || "23"
      }
    })
  }
  

  render(){
    const {loading, data} = this.state
    return(
      <><Helmet>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" integrity="sha512-Fo3rlrZj/k7ujTnHg4CGR2D7kSs0v4LLanw2qksYuRlEzO+tcaEPQogQ0KaoGN26/zrn20ImR1DfuLWnOo7aBA==" crossorigin="anonymous" referrerpolicy="no-referrer" />
        <title>Nasagram</title>
      </Helmet>

      <div className="text-center bg-opacity-90 py-4 bg-white sticky top-0 left-0 right-0 text-2xl">
        <h1 className="">Nasagram</h1>
        <a href="https://github.com/jeankhoury0/nasagram" target="_blank" ref="nofollow"> <li className="fab fa-github px-2"></li>Check the code</a>
      </div>
      {/* Filter */}
      <div className="container grid gap-3 bg-slate-300 ">
        <h2>Filter</h2>
        <div>
          <label htmlFor="inputStartDate" className="p-3">Start Date</label>
          <input type="date" id="inputStartDate" min="07-01-1995" max={new Date().toISOString().split("T")[0]}></input>
        </div>
        <div>
          <label htmlFor="inputEndDate" className="p-3">End Date</label>
          <input type="date" id="inputEndDate"  min="07-01-1995" max={new Date().toISOString().split("T")[0]}></input>
        </div>
        <div>
          <label htmlFor="inputCount" className="p-3">Count</label>
          <input type="number" id="inputCount" max="23" ></input>
        </div>
        <a onClick={this.setFilters}>refresh</a>
      </div>
      {/* End filter */}
      <main className="flex self-center items-center" id="root">
          <div className="columns-xs gap-8 space-y-8 py-2">
            {loading ? <Loading></Loading> : (
                data.map(i =>{
                  return <ImagePost data={i}></ImagePost>
                })
            )}
            
          </div>
        </main>
        </>
    )
  }
  
}

export default IndexPage
