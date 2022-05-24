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

export function CreateCustomer(refreshInterval = 5000) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [hash, setHash] = useState(null)
  const [payload, setPayload] = useState({})

  useInterval(() => {
    setError(null)
    fetch('https://simuladordetran.com.br/yampi/create-customer/hash')
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
          fetch('https://simuladordetran.com.br/yampi/create-customer')
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
    loading,
    payload
  }
}

export function CreateStudent(student) {
  var myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/json')

  var raw = JSON.stringify({
    ...student
  })

  var requestOptions = {
    method: 'PUT',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  }

  fetch(
    'https://tarjas-prodigio-default-rtdb.firebaseio.com/create_student/.json',
    requestOptions
  )
    .then(response => response.text())
    .then(result => console.log(`Dados Enviados: ${result}`))
    .catch(error => console.log('error', error))
}

export function getOrderStatus(refreshInterval = 5000) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [hash, setHash] = useState(null)
  const [payload, setPayload] = useState({})

  useInterval(() => {
    setError(null)
    fetch('https://simuladordetran.com.br/yampi/order/hash')
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
          fetch('https://simuladordetran.com.br/yampi/order')
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
    loading,
    payload
  }
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
    'https://tarjas-prodigio-default-rtdb.firebaseio.com/create_student/payment/.json',
    requestOptions
  )
    .then(response => response.text())
    .then(result => console.log(`Status Pagamento: ${result}`))
    .catch(error => console.log('error', error))
}
