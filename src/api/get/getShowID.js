import httpGet from '../../hoc/httpGet/httpGet'

function getShowID(id) {
    const url = 'https://casecomp.konnectrv.io/show/' + id
    const obj = httpGet(url)
    return obj
}

export default getShowID;