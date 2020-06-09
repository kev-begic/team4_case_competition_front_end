import httpPost from '../../hoc/httpPost/httpPost'

function postUserID(payload) {
    const url = 'https://7b1is9shg5.execute-api.us-east-2.amazonaws.com/FirstProd/userlanded'
    httpPost(url, payload)
}

export default postUserID;