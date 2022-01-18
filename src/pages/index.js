import * as React from "react"
import GithubButton from "../components/githubButton"
import ImagePost from "../components/imagePost"
import Loading from "../components/loading"

class IndexPage extends React.Component {
  API_URL = new URL("https://api.nasa.gov/planetary/apod")
  API_KEY = "mPPJDe7A3eOPnUtTr8MWWfrWvLdJg8HuhEgVmiAW"
  API_DEFAULT_COUNT = 24
  params = {
    "api_key": this.API_KEY,
    "count": this.API_DEFAULT_COUNT
  }

  constructor() {
    super()
    this.state = {
      loading: true,
      error: false,
      errorMsg: null,
      filter:
      {
        startDate: "",
        endDate: "",
        count: this.API_DEFAULT_COUNT
      },
      data: []
    }
    this.setFilters = this.setFilters.bind(this)
    this.setState = this.setState.bind(this)

  }

  async fetchData() {
    this.API_URL.search = new URLSearchParams(this.params).toString()

    fetch(this.API_URL)
      .then(res => {
        return res.json()
      })
      .then(json => {
        this.setState({
          data: json,
          loading: false
        })
      })
  }

  componentDidMount() {
    this.fetchData()
  }


  componentDidUpdate(prevProps, prevState) {
    if (prevState.filter !== this.state.filter) {
      if (this.canBeFetched()) {
        this.params = {
          "api_key": this.API_KEY,
          "start_date": this.state.filter.startDate,
          "end_date": this.state.filter.endDate,
          "count": this.state.filter.count
        }
      } else {
        this.params = {
          "api_key": this.API_KEY,
          "count": this.API_DEFAULT_COUNT
        }
      }
      this.fetchData()
    }
  }

  canBeFetched() {
    let startDate = this.state.filter.startDate
    let endDate = this.state.filter.endDate
    let count = this.state.filter.count
    this.setState({ errorMsg: null })

    if (startDate === "" || endDate === "") {
      if (count === "") {
        console.error("Either set Start and EndDate or Count")
        this.setState({ errorMsg: "Either set Start and EndDate or Count" })
        return false
      }
      return true
    }

    if (count !== "") {
      console.warn("Count is not compatible with date. Fixing data")
      this.state.filter.count = ""
      return true
    }

    if (new Date(startDate) >= new Date(endDate)) {
      console.error("Start date need to be superior to end date")
      this.setState({ errorMsg: "Start date need to be superior to end date" })
      return false
    }

    return true

  }

  setFilters() {
    var startDate = document.getElementById("inputStartDate").value
    var endDate = document.getElementById("inputEndDate").value
    var inputCount = document.getElementById("inputCount").value

    this.setState({
      loading: true,
      filter: {
        startDate: startDate || "",
        endDate: endDate || "",
        count: inputCount || ""
      }
    })
  }


  render() {
    const { loading, data, errorMsg } = this.state
    return (
      <>
        <main>
          <GithubButton/>

          <div className="text-center py-4 bg-white sticky top-0 left-0 right-0 text-2xl">
            <h1 className="">Nasagram</h1>
          </div>
          {/* Filter */}
          <div className="flex flex-col m-3 gap-3 ring-4 ring-black rounded overflow-hidden">
            <h2 className="bg-black p-2 text-white">Filters</h2>
            <div className="flex flex-col md:[flex-direction:unset] justify-center items-center md:gap-3">
              <div>
                <label htmlFor="inputStartDate" className="p-3">Start Date</label> <br />
                <input type="date" id="inputStartDate" min="1995-07-01" max={new Date().toISOString().split("T")[0]}></input>
              </div>
              <div>
                <label htmlFor="inputEndDate" className="p-3">End Date</label><br />
                <input type="date" id="inputEndDate" min="1995-07-01" max={new Date().toISOString().split("T")[0]}></input>
              </div>
              <div>
                <label htmlFor="inputCount" className="p-3">Count</label><br />
                <input type="number" id="inputCount" min="1" max="23" ></input>
              </div>
            </div>
            {errorMsg &&
              <div class="text-white font-bold bg-red-600 p-2 text-center">
                <p aria-invalid="true">{errorMsg}</p>
              </div>
            }

            <button onClick={this.setFilters} className="bg-black text-white text-xl text-center p-2 hover:bg-primary hover:text-white rounded-b hover:cursor-pointer">Refresh</button>
          </div>
          {/* End filter */}
          <div className="flex justify-center items-center" id="root">
            <div className="columns-1 md:columns-2 lg:columns-4 xl:columns-5 gap-3 space-y-3">
              {loading ? <Loading></Loading> : (
                data.map(i => {
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
