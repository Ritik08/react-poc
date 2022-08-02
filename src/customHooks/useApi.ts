import {useEffect, useState} from "react";

export enum Method {
    get = "GET",
    post = "POST",
    patch = "PATCH",
    delete = "DELETE"
}

const fetchData = async (url: string, method: Method, body?: any) => {
    try {
        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: body
        })
        if (response.status >= 300) {
            throw new Error(response.statusText)
        }
        const res = await response.json()
        return {res, status: 200}
    } catch (error) {
        return {error}
    }

}
export const useApi = (url: string, method: Method, body?: any) => {
    const [loading, setLoading] = useState(true)
    const [response, setResponse] = useState<any | null>();
    useEffect(() => {
        setLoading(false)
        const result = fetchData(url, method, body);
        result.then((data) => setResponse(data))
    }, [url]);
    return {loading, response}
}

