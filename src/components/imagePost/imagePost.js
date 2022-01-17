import React, {useState} from "react"

export default function ImagePost(props) {

    const [like, setLike] = useState({fa: "far"})


    function toogleLike(){
        setLike(prevCount => {
            if (prevCount.fa == "far"){
                return {fa: "fas"}
            }
            return {fa: "far"}
        })   
        
           
    }
    const data = props.data || (
         {
             "copyright": "Helmut Eder",
             "date": "2021-06-09",
             "explanation": "This moon appears multiply strange.  This moon was a full moon, specifically called a Flower Moon at this time of the year.  But that didn't make it strange -- full moons occur once a month (moon-th).  This moon was a supermoon, meaning that it reached its full phase near its closest approach to the Earth in its slightly elliptical orbit.  Somewhat strange, a supermoon appears a bit larger and brighter than the average full moon -- and enables it to be called a Super Flower Moon.  This moon was undergoing a total lunar eclipse. An eclipsed moon can look quite strange, being dark, unevenly lit, and, frequently, red -- sometimes called blood red. Therefore, this moon could be called a Super Flower Blood Moon. This moon was seen through thin clouds. These clouds created a faint corona around the moon, making it look not only strange, but colorful.  This moon was imaged so deeply that the heart of the Milky Way galaxy, far in the background, was visible to its lower right.  This moon, this shadow, this galaxy and these colors were all captured last month near Cassilis, NSW, Australia -- with a single shot. (Merged later with two lower shots that better capture the Milky Way.)   Details: Annular Solar Eclipse Tomorrow  Gallery: Total Eclipse of the Super Flower Blood Moon",
             "hdurl": "https://apod.nasa.gov/apod/image/2106/MultiEclipse_Eder_1080.jpg",
             "media_type": "image",
             "service_version": "v1",
             "title": "A Total Lunar Eclipse Corona",
             "url": "https://apod.nasa.gov/apod/image/2106/MultiEclipse_Eder_960.jpg"
         }
  
     )
     console.log(data)
    return(
        <div className="shadow-md bg-white rounded mx-2 break-inside-avoid">
            
            <div className="">
                {data.media_type == "image" && 
                    <img src={data.url} className="object-cover aspect-square w-[100%] h-100"></img>
                }
                {data.media_type == "video" && 
                    <iframe src={`${data.url}?autoplay=1&mute=1`} className="object-cover aspect-square w-[100%] h-100" controls autoplay>
                  </iframe>
                }                
            </div>
                 
            <div className="grid grid-cols-3">
                <div className="col-span-2 p-2">
                    <h2> {data.title}</h2>
                    <p> {data.date} </p>
                </div>
                <div className="flex justify-between grow items-stretch">
                    <button className={`${like.fa} fa-heart text-2xl bg-pink-700 text-white grow`} alt="Like the picture" onClick={toogleLike}>
                    </button>
                    <button className="fas fa-link text-2xl bg-blue-700 text-white grow" alt="Get link to share"></button>

                </div>
                
            </div>

        </div>
    )
}

