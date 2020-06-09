function httpPost(url, payload) {
    const options = {
        method: 'POST',
        body: JSON.stringify(payload),
        mode: "no-cors",
        headers: {
            'Content-Type': 'application/json'
        }
    }
    fetch(url, options)
    .then((resp) => resp.json())
    .then((resp) => console.log(resp))
    .catch(function(error) {
        console.log(error);
    })
};

export default httpPost;