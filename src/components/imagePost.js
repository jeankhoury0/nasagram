import React, { useState } from "react"

export default function ImagePost(props, key) {

    const data = props.data
    const [like, setLike] = useState({ fa: "far" })
    const [url, setURL] = useState({fa: "fas fa-link", copied: false})

    function toogleLike() {
        setLike(prevCount => {
            if (prevCount.fa === "far") {
                return { fa: "fas bg-pink-700 text-white" }
            }
            return { fa: "far" }
        })
    }

    function shareLink(){
        navigator.clipboard
          .writeText(data.url)
          .then(
              success => console.log("text copied"), 
              err => console.log("error copying text")
          ).then(
              setURL({fa: "fas fa-check-circle bg-primary text-white", copied: true})
          ).then(
              setTimeout(function(){setURL({fa: "fas fa-check-circle", copied: false})},1000)
          );
    }



    return (
        <div className="shadow-lg bg-white rounded-xl mx-2 break-inside-avoid overflow-hidden">

            <div className="">
                {data.media_type === "image" &&
                    <img src={data.url} alt={data.explanation} className="object-cover aspect-square w-[100%] h-100"></img>
                }
                {data.media_type === "video" &&
                    <iframe src={`${data.url}?autoplay=1&mute=1`} title={data.title} className="aspect-square w-full h-full" controls allow="autoplay" autoPlay>
                    </iframe>
                }
            </div>

            <div className="grid grid-cols-3 overflow-hidden">
                <div className="col-span-2 p-2">
                    <h2> {data.title}</h2>
                    <p> {data.date} </p>
                </div>
                <div className="flex justify-between grow items-stretch">
                    <button className={`${like.fa} fa-heart grow text-2xl transition-scale ease-in duration-300 hover:bg-pink-700 hover:scale-110 hover:text-white`} aria-label="Like the picture" onClick={toogleLike}>
                    </button>
                    <button className={`${url.fa} grow text-2xl ease-in duration-300 hover:bg-primary hover:text-white hover:scale-110`} aria-label="Get link to share" onClick={shareLink}></button>
                </div>
                
                { url.copied && 
                    <div className="inset-center bg-gray-600 text-white text-center font-bold p-3 text-l rounded-full">
                        URL copied successfully
                    </div>
                }
                

            </div>

        </div>
    )
}

