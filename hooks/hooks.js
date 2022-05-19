import { useState, useEffect, useRef } from 'react'

export function useInterval(callback, delay = 10000) {
  const savedCallback = useRef()

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current()
    }
    if (delay !== null) {
      let id = setInterval(tick, delay)
      return () => clearInterval(id)
    }
  }, [delay])
}

export function useData(refreshInterval = 5000) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [hash, setHash] = useState(null)
  const [payload, setPayload] = useState({})

  useInterval(() => {
    setError(null)
    fetch('http://localhost:3500/yampi/create-customer/hash')
      .then(response => {
        if (response.status === 200) {
          return response.json()
        }

        return response
          .json()
          .then(error => Promise.reject(new Error(error.message)))
      })
      .then(nextHash => {
        if (nextHash !== hash) {
          setLoading(true)
          fetch('http://localhost:3500/yampi/create-customer')
            .then(response => {
              if (response.status === 200) {
                return response.json()
              } else {
                console.log(error)
              }

              return response
                .json()
                .then(error => Promise.reject(new Error(error.message)))
            })
            .then(data => {
              console.info('sucess')
              console.info('changed hash [%s=>%s]', hash, nextHash)
              setHash(nextHash)
              setPayload(data)
            })
            .catch(setError)
            .finally(() => setLoading(false))
        }
      })
      .catch(setError)
  }, refreshInterval)

  return {
    hash,
    loading,
    payload
  }
}
