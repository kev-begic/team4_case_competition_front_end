// const fetch = require("node-fetch")

function httpGet(url) {
    let an_array = []
    const promise = fetch(url);
    return promise;

    // promise.then((resp) => resp.json())
    // promise.then((data) => console.log(data))
    // promise.then(function(data) {
        // an_array = data;
    //     // return an_array;
    //     an_array = data;
    // })
    // promise.then(function() {
    //     console.log(an_array)
    //     return an_array;
    // })
    // .catch(function(error) {
    //     console.log(error);
    // })
    
};

export default httpGet;

// httpGet("https://casecomp.konnectrv.io/movie")