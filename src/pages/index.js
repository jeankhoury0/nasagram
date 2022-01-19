import { data } from "autoprefixer"
import * as React from "react"
import { Helmet } from "react-helmet"
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
        if (json.code) {
          console.error("Error while rendering the date")
          this.setState({
            loading: false,
            error: true,
            errorMsg: "An error occured please try again"
          })
          return
        }
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
        console.warn("Nothing to be sent, just refreshing")
        return false
      }
      return true
    }

    if (count < 0) {
      console.error("Count cannot be negative")
      this.setState({ errorMsg: "Count cannot be negative" })
      return false
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
        <Helmet><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" integrity="sha512-Fo3rlrZj/k7ujTnHg4CGR2D7kSs0v4LLanw2qksYuRlEzO+tcaEPQogQ0KaoGN26/zrn20ImR1DfuLWnOo7aBA==" crossOrigin="anonymous" referrerPolicy="no-referrer" /></Helmet>
        <main>
          <GithubButton />

          <div className="text-center py-4 bg-white shadow sticky top-0 left-0 right-0 text-2xl">
            <h1 className="">Nasagram</h1>
          </div>
          {/* NEW Filter */}
          <form>
            <div className="">
              <h2 className="bg-black p-2 text-white text-center">Filters</h2>
              {errorMsg &&
                <div class="text-white font-bold bg-red-600 p-2 text-center">
                  <p aria-invalid="true">{errorMsg}</p>
                </div>
              }
              <div className="px-3 grid grid-col-1 items-center md:grid-cols-4 gap-3 m-3 mb-6">
                <div>
                  <label htmlFor="inputStartDate">Start Date</label> <br />
                  <input type="date" id="inputStartDate" className="w-full" min="1995-07-01" max={new Date().toISOString().split("T")[0]}></input>
                </div>
                <div>
                  <label htmlFor="inputEndDate">End Date</label><br />
                  <input type="date" id="inputEndDate" className="w-full" min="1995-07-01" max={new Date().toISOString().split("T")[0]}></input>
                </div>
                <div>
                  <label htmlFor="inputCount">Count</label><br />
                  <input type="number" id="inputCount" className="w-full" min="1" max="23" ></input>
                </div>
                <button onClick={this.setFilters} className="w-1/2 bg-black justify-self-center md:justify-self-end p-3 text-white text-xl text-center  self-stretch rounded hover:bg-primary hover:text-white">Refresh</button>
              </div>
              <hr className="py-4 mx-5" />
            </div>
          </form>

          {/* End filter */}
          <div className="flex justify-center items-center" id="root">
            <div className="columns-1 md:columns-2 lg:columns-4 xl:columns-5 gap-3 space-y-3">
              {loading ? <Loading></Loading> : (
                data?.map(i => {
                  return <ImagePost key={i.date} data={i}></ImagePost>
                })
              )}
            </div>
          </div>
        </main>
        <footer className="m-5 text-center text-gray-800">
          <hr></hr>
          <p> © <a href="https://jeankhoury.com">Jean Khoury</a> | All right reserved</p>
        </footer>
      </>
    )
  }

}

export default IndexPage
