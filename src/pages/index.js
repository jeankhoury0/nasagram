import * as React from "react"
import { Helmet } from "react-helmet"

import ImagePost from "../components/imagePost/imagePost"

// markup
class IndexPage extends React.Component {

  state= {
    loading: true,
    error: false,
    data: []
  }

  componentDidMount(){
    fetch("https://api.nasa.gov/planetary/apod?api_key=mPPJDe7A3eOPnUtTr8MWWfrWvLdJg8HuhEgVmiAW&count=10")
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
      <h1>NasaGram</h1>
      <main className="flex" id="root">
          <div className="columns-3xs gap-8 space-y-8 py-2">
            {loading ? <p>Loading...</p> : (
                data.map(i =>{
                  return <ImagePost data={i}></ImagePost>
                })
            )}
            
          </div>
        </main></>
    )
  }
  
}

export default IndexPage
