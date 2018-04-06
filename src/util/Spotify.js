
let clientId = '14993a5c66024eee8e0990e427aeca33'
let redirectURI = 'http://localhost:3000/'

let accessToken
let expiresIn

const Spotify = {

  getAccessToken() {
    // 1. case: already there?
    if (accessToken) {
        console.log(accessToken);
        return accessToken;
    }
    // 2. case: already in URL?
    let url = window.location.href;
    console.log(url);
    accessToken = url.match(/access_token=([^&]*)/);
    console.log(typeof accessToken);
    if (accessToken) {
        expiresIn = url.match(/expires_in=([^&]*)/)
        window.setTimeout(() => accessToken = '', expiresIn * 1000);
        window.history.pushState('Access Token', null, '/');
        console.log("access token successful retrieved.");
        console.log(accessToken);
        return accessToken[1];
    } else {
        // 3. case: fetch from spotify
        let state = 4321; // TODO generate state, save to app-state and validate
        window.location.href = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-private&redirect_uri=${redirectURI}`;
    }
},

  search(term){
    fetch(`https://api.spotify.com/v1/search?q=${term}&type=track`, {
      headers: this.buildHeaders()}).then(response=>{
        if (response.ok) {
          return response.json
        }
      }).then(jsonReponse =>{
        console.log(jsonReponse);
        return jsonReponse
      })
    },


  buildHeaders(){
    let token = this.getAccessToken()
    return {Authorization: `Bearer ${token}`}
  }
}

export default Spotify;
