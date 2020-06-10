import httpGet from '../../hoc/httpGet/httpGet'

function getMovie() {
    const url = 'https://casecomp.konnectrv.io/show'
    const obj = httpGet(url)
    return obj
}

export default getMovie;