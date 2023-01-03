const globals = {
  html: {
    scrollBehavior: "smooth",
    overflow: 'auto'
  },
  "::-webkit-scrollbar": {
    width: "10px",
    visibility: 'hidden',
    // ":hover": {
    //   visibility: 'visible'
    // }
    // display: 'none'
  },
  // "*::-webkit-scrollbar:hover" : {
  //   visibility: 'visible'
  // },
  // "*::-webkit-scrollbar-track": {
  //   // visibility: "hidden",
  //   display: 'none'
  // },
  "::-webkit-scrollbar-thumb": {
    visibility: "hidden",
    // display: 'none'
    border: '5px solid gray',
    borderRadius: '10px',
    ":hover" : {
      visibility: 'visible'
    }
  },
  // ":hover": {
  //   "::-webkit-scrollbar-thumb": {
  //     border: "5px solid gray",
  //     borderRadius: "10px",
  //     visibility: "visible"
  //   },
  //   "::-webkit-scrollbar": {
  //     visibility: 'visible'
  //   },
  //   "::-webkit-scrollbar-track" : {
  //     visibility: 'visible'
  //   },
  // },
  "a:link": {
    color: 'cornflowerblue'
  },
  "a:visited": {
    color: 'cornflowerblue'
  }
};

export default globals;