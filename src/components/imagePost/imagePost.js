import React, {useState} from "react"

export default function ImagePost(props, key) {

    const [like, setLike] = useState({fa: "far"})


    function toogleLike(){
        setLike(prevCount => {
            if (prevCount.fa == "far"){
                return {fa: "fas bg-pink-700 text-white"}
            }
            return {fa: "far"}
        })   
        
           
    }
    const data = props.data 
  
     
    return(
        <div className="shadow-md bg-white rounded-xl mx-2 break-inside-avoid">
            
            <div className="">
                {data.media_type == "image" && 
                    <img src={data.url} className="object-cover aspect-square w-[100%] h-100"></img>
                }
                {data.media_type == "video" && 
                    <iframe src={`${data.url}?autoplay=1&mute=1`} className="object-cover aspect-square w-[100%] h-100" controls autoPlay>
                  </iframe>
                }                
            </div>
                 
            <div className="grid grid-cols-3">
                <div className="col-span-2 p-2">
                    <h2> {data.title}</h2>
                    <p> {data.date} </p>
                </div>
                <div className="flex justify-between grow items-stretch">
                    <button className={`${like.fa} fa-heart text-2xl   grow transition ease-in-out delay-150 hover:bg-pink-700 focus:bg-pink-700 hover:text-white focus:text-white`} alt="Like the picture" onClick={toogleLike}>
                    </button>
                    <button className="fas fa-link text-2xl hover:bg-blue-700 focus:bg-blue-700 hover:text-white focus:text-white grow" alt="Get link to share"></button>

                </div>
                
            </div>

        </div>
    )
}

