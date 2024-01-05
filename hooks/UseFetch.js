import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { API_KEY } from '@env'

const UseFetch = (endpoint, query) => {

    const APIKey = API_KEY

    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    const options = {
      method: 'GET',
      url: `https://api.rawg.io/api/${endpoint}?key=${APIKey}`,
      params: { ...query },
    };
      
    const fetchData = async () =>
    {
        setIsLoading(true)

        try {
            const res = await axios.request(options)
            if(endpoint === 'games') setData(res.data.results)
            else setData(res.data)
        } catch (error) {
            setError(error)
            alert('There is an error')
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() =>
    {
        fetchData()
    }, [])

    const refetch = () =>
    {
        setIsLoading(true)
        fetchData()
    }

  return { data, isLoading, error, refetch }
}

export default UseFetch