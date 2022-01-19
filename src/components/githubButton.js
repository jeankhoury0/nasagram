import React from "react"

export default function GithubButton(){

    return(
        <a className="flex rounded-full bg-violet-500 hover:bg-violet-900 hover:shadow-lg transition-colors delay-100 w-[4em] h-[4em] fixed bottom-3 right-3 items-center justify-center shadow z-20" href="https://github.com/jeankhoury0/nasagram" target="_blank" rel="noreferrer">
            <p className="fab fa-github px-2 text-white text-5xl" aria-label="View the project on github"></p>
          </a>
    )
}
