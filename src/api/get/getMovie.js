import httpGet from '../../hoc/httpGet/httpGet'

function getMovie() {
    const url = 'https://casecomp.konnectrv.io/movie'
    let res =  httpGet(url);
    
    console.log(res);
    return res;
}

export default getMovie;