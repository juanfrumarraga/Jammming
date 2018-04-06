import React, { Component } from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import PlayList from '../PlayList/PlayList';
import Spotify from '../../util/Spotify'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [
        {id: 4,
        name:'ABC',
        artist:'Phil',
        album:'numero1',
        uri:1234},
        {id: 5,
        name:'ADF',
        artist:'Pepe',
        album:'Nothing',
        uri:123457},
        {id: 6,
        name:'23423',
        artist:'Phal',
        album:'yeap',
        uri:12345678}
      ],
      playlistName : 'Playlist numero 1',
      playlistTracks : [
        {id: 1,
        name:'Afdaf',
        artist:'Philippe',
        album:'numero23424',
        uri:12342425435},
        {id: 2,
        name:'ADFdfa',
        artist:'Pepexxxx',
        album:'Nothinghill',
        uri:12345432565},
        {id:3,
        name:'23423242wds',
        artist:'Phalalaala',
        album:'yeappipiruli',
        uri:1234453678376826275}
      ]
    }
    this.addTrack=this.addTrack.bind(this)
    this.removeTrack=this.removeTrack.bind(this)
    this.updatePlaylistName=this.updatePlaylistName.bind(this)
    this.savePlaylist=this.savePlaylist.bind(this)
    this.search=this.search.bind(this)
  }

  addTrack(track){
    let ids = []
    let match=false
    this.state.playlistTracks.map(song=>{
      ids.push(song.id)
    })
    for(let i=0; i<ids.length;i++){
      if(ids[i] === track.id){
        match=true
      }
    }
    if(!match) {
      const list = Object.assign(this.state.playlistTracks)
      list.push(track)
      console.log(list);
      this.setState({playlistTracks:list})
    }
  }

  removeTrack(track){
    let index=-1;
    for (var i = 0; i < this.state.playlistTracks.length; i++){
      if (this.state.playlistTracks[i].id === track.id) {
        index=i
      }
    }
    const list = Object.assign(this.state.playlistTracks);
    list.splice(index,1)
    this.setState({playlistTracks:list})

  }


  updatePlaylistName(name){
    this.setState({playlistName:name})
  }

  savePlaylist(){
    const trackURIs = this.state.playlistTracks.map(track=>{
      return track.uri
    })
    console.log(trackURIs);
  }


  search(searchTerm){
    Spotify.search(searchTerm).then(tracks=>console.log(tracks)).then(tracks=>this.setState({searchResults:tracks}))

  }


  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search}/>
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack}/>
            <PlayList playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} onRemove={this.removeTrack} onNameChange={this.updatePlaylistName} onSave={this.savePlaylist}/>
          </div>
        </div>
    </div>
    )
  }
}

export default App;
