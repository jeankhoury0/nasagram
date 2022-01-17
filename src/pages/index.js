import * as React from "react"
import { Helmet } from "react-helmet"

import ImagePost from "../components/imagePost/imagePost"
import Loading from "../components/loading"
// markup
class IndexPage extends React.Component {

  state= {
    loading: true,
    error: false,
    data: []
  }

  componentDidMount(){
    var url = new URL("https://api.nasa.gov/planetary/apod")
    const API_KEY = "mPPJDe7A3eOPnUtTr8MWWfrWvLdJg8HuhEgVmiAW"
    var params= {
      "api_key": API_KEY,
      "count": 20
    }
    url.search = new URLSearchParams(params).toString()
    fetch(url)
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

  render(){
    const {loading, data} = this.state
    return(
      <><Helmet>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" integrity="sha512-Fo3rlrZj/k7ujTnHg4CGR2D7kSs0v4LLanw2qksYuRlEzO+tcaEPQogQ0KaoGN26/zrn20ImR1DfuLWnOo7aBA==" crossorigin="anonymous" referrerpolicy="no-referrer" />
      </Helmet>
      <div className="text-center bg-opacity-90 py-4 bg-white sticky top-0 left-0 right-0 text-2xl">
        <h1 className="">Nasa Gram</h1>
        <a href="https://github.com/jeankhoury0/nasagram" target="_blank" ref="nofollow"> <li className="fab fa-github px-2"></li>Check the code</a>
      </div>
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
