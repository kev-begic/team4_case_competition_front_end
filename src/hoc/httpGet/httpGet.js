// const fetch = require("node-fetch")

function httpGet(url) {
    console.log('here', url)
    fetch(url)
    .then((resp) => resp.json())
    .then(function(data) {
        return data
    })
    .catch(function(error) {
        console.log(error);
    })
};

export default httpGet;

// httpGet("https://casecomp.konnectrv.io/movie")