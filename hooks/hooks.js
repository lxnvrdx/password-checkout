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
export function CreateCustomer() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [payload, setPayload] = useState({})
  // useInterval(() => {
  useEffect(() => {
    setError(null)
    setLoading(true)
    fetch(
      'https://tarjas-prodigio-default-rtdb.firebaseio.com/create_customer/.json?print=pretty'
    )
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
        setPayload(data)
      })
      .catch(setError)
      .finally(() => setLoading(false))
  }, {})
  // }, 10000)
  return {
    loading,
    payload
  }
}

export function getOrderStatus() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [payload, setPayload] = useState({})

  useEffect(
    () => {
      setError(null)
      setLoading(true)
      fetch(
        'https://tarjas-prodigio-default-rtdb.firebaseio.com/order/resource/status/data/id.json?print=pretty'
      )
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
          setPayload(data)
        })
        .catch(setError)
        .finally(() => setLoading(false))
    },
    { payload }
  )

  return {
    loading,
    payload
  }
}

export function SendData(request) {
  var myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/json')

  var raw = JSON.stringify({
    ...request
  })

  var requestOptions = {
    method: 'PUT',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  }

  fetch(
    'https://tarjas-prodigio-default-rtdb.firebaseio.com/create_customer/.json?print=pretty',
    requestOptions
  )
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error))
}

export function setOrderStatus(status) {
  var myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/json')

  var raw = JSON.stringify(status)

  var requestOptions = {
    method: 'PUT',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  }

  fetch(
    'https://tarjas-prodigio-default-rtdb.firebaseio.com/create_customer/payment.json?print=pretty',
    requestOptions
  )
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error))
}
