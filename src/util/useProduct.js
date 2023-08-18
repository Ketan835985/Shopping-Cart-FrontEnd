import { useState } from 'react'
function useProductHttp(){
    const [errorMessages, setErrorMessages] = useState(null)
    function getProducts(url, method, body, headers, callback){
        fetch(url, {
            method: method,
            body: body,
            headers: headers,
        })
        .then(response => response.json())
        .then(data => callback(data))
        .catch(error => {
            setErrorMessages(error.message)
        })
    }
    return [errorMessages, getProducts]
}


export default useProductHttp