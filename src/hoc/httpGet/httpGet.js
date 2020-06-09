function httpGet(url) {
    fetch(url)
    .then((resp) => resp.json())
    .then(function(data) {
        let obj = data.results;
        console.log(obj)
        return obj
    })
    .catch(function(error) {
        console.log(error);
    })
};

export default httpGet;