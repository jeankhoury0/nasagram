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
       if (this.canBeFetche){
        console.log("ENTERD")
          this.params= {
            "api_key": this.API_KEY,
            "start_date": this.state.filter.startDate,
            "end_date": this.state.filter.endDate,
            "count" : this.state.filter.count
          }
        } else {
          this.params= {
            "api_key": this.API_KEY,
            "count" : 12
          }
        }
       this.fetchData()
       
     }
   }

   canBeFetched(){
      let startDate = this.state.filter.startDate
      let endDate = this.state.filter.endDate
      let count = this.state.filter.count
      return false
     
   }
  

  
  setFilters(){
    var startDate = document.getElementById("inputStartDate").value
    var endDate = document.getElementById("inputEndDate").value
    var inputCount = document.getElementById("inputCount").value
    this.setState({
      loading: true,
      filter : {
        startDate: startDate || "",
        endDate: endDate || "",
        count: inputCount || ""
      }
    })
  }
  

  render(){
    const {loading, data} = this.state
    return(
      <>
      <main>
      {/* Github button */}
        <a className="flex rounded-full bg-violet-500 hover:bg-violet-900 hover:shadow-lg transition-colors delay-100 w-[4em] h-[4em] fixed bottom-3 right-3 items-center justify-center shadow z-20"  href="https://github.com/jeankhoury0/nasagram" target="_blank" ref="nofollow">
          <li className="fab fa-github px-2 text-white text-5xl" alt="View the project on github"></li>
        </a>
        {/* Github button end */}

        <div className="text-center py-4 bg-white sticky top-0 left-0 right-0 text-2xl">
          <h1 className="">Nasagram</h1>
        </div>
        {/* Filter */}
        <div className="flex flex-col m-3 gap-3 ring-4 ring-black rounded">
          <h2 className="bg-black p-2 text-white">Filters</h2>
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
          <a onClick={this.setFilters} className="bg-black text-white text-xl text-center">refresh</a>
        </div>
        {/* End filter */}
        <div className="flex self-center items-center" id="root">
            <div className="columns-xs gap-8 space-y-8 py-2">
              {loading ? <Loading></Loading> : (
                  data.map(i =>{
                    return <ImagePost key={i.date} data={i}></ImagePost>
                  })
              )}
              
            </div>
          </div>
        </main>
        </>
    )
  }
  
}

export default IndexPage
