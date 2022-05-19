export function SendData(request) {
  console.log(`there is a request${JSON.stringify(request)}`)
  var myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/json')

  var raw = JSON.stringify({
    ...request
  })

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  }

  fetch('http://localhost:3500/yampi/create-customer', requestOptions)
    .then(response => response.text())
    .then(result => console.log('sucess', result))
    .catch(error => console.log('error', error))
}
