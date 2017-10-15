import axios from 'axios';

const defaultHeaders = {  
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

function headers() {  
  const jwt = localStorage.getItem('token');

  return { ...defaultHeaders, Authorization: jwt };
}

export function checkStatus(response) {  
  if (response.ok) {
    return response;
  } else {
    var error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
}

export function parseJSON(response) {  
  return response.json();
}

export function get(url) {

  return axios.get(url, {
    headers: headers(),
  })
}

export function post(url, data) {  
  const body = JSON.stringify(data);

  return axios.post(url,body, {
    headers: headers(),
  })
}
export function put(url, data) {  
  const body = JSON.stringify(data);
  return axios.post(url, {
    headers: headers(),
    body: body,
  })
}
export function remove(url) {
  return axios.delete(url, {
    headers: headers()
  })
}