[![Netlify Status](https://api.netlify.com/api/v1/badges/1d3a2040-b1a4-4297-bbfa-56b9238a2530/deploy-status)](https://app.netlify.com/sites/sad-kilby-81ebd0/deploys)

![Nasagram](https://github.com/jeankhoury0/nasagram/blob/main/src/images/NasagramFrontPage%20(1).png)

## About

Check the final website on https://nasa.jeankhoury.com/

Frontend for NASA’s [Astronomy Picture of the Day](https://api.nasa.gov#apod) API. 

**Statck**: Gatsby.js / Tailwind / Font awesome / npm

**Note**: this is a mobile first experience 

-------
## Features
- [x] Loading state while waiting for NASA API to return results
- [x] Query specifier
    - by count
    - by start/end date
- [x] Like button
- [x] Create sharable links


## Future improvement


- [ ] Create sharable view
- [ ] Save like state
- [ ] PWA offline mode
- [ ] Find a way to optimized the images for a quicker loadtime (cache)

## How to install

> If it is only to view the site please visit https://nasa.jeankhoury.com/

- Download the repo 
- Check your version of node by running 
- Check that your version of node is superior to 14.xx.xx
``` console
    foo@bar:~$ node -v
```

- Run the following to install dependencies

``` console
    foo@bar:~$ cd <path_to_the_repo>
    foo@bar:~$ npm install
```

- Start the dev server by runing
``` console
    foo@bar:~$ npm start
```

