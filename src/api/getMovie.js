import httpGet from '../hoc/httpGet/httpGet'

function getMovie() {
    const obj = httpGet('https://casecomp.konnectrv.io/movie')
    return obj
}

export default httpGet;