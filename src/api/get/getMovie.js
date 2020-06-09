import httpGet from '../../hoc/httpGet/httpGet'

function getMovie() {
    const url = 'https://casecomp.konnectrv.io/movie'
    return httpGet(url)
}

export default getMovie;