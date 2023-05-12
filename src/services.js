export function fetchLogin(username) {
    return fetch('/api/session', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify( {username} ),
    })
    .catch( err => Promise.reject({ error: 'network-error' }) )
    .then( response => {
      if(!response.ok) {  
        return response.json().then( err => Promise.reject(err) );
      }
      return response.json(); 
    });
}

export function fetchMenu() {
    return fetch('/api/menu')
      .then(response => response.json())
      .catch(error => console.error(error));
  }
  

export function fetchCart() {
    return fetch('/api/cart', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(response.status);
          }
          return response.json();
        })
        .catch((error) => {
          console.error(error);
        });      
}

export function fetchCheckout() {
  return fetch('/api/cart', {
    method: 'DELETE',
    headers: {
        'Content-Type': 'application/json'
    },
    })
    .then(response => {
        if(!response.ok) {
        throw new Error(response.statusText);
        }
    })
    .catch(error => {
        console.error(error);
    });
}
  

export function fetchLogout() {
    return fetch('/api/session', {
      method: 'DELETE',
    })
    .catch( err => Promise.reject({ error: 'network-error' }) )
    .then( response => {
      if(!response.ok) {  
        return response.json().then( err => Promise.reject(err) );
      }
      return response.json(); 
    });
}