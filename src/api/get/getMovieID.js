import httpGet from '../../hoc/httpGet/httpGet'

function getMovieID(id) {
    const url = 'https://casecomp.konnectrv.io/movie/' + id
    const obj = httpGet(url)
    return obj
}

export default getMovieID;