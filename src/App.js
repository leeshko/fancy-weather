import './App.css';
import React, { useState } from 'react';
import Buttons from './components/Buttons/Buttons'


function App() {

  const [imageUrl, setImage] = useState('');

  const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const url = 'https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=0f15ff623f1198a1f7f52550f8c36057&tags=nature,spring,morning&tag_mode=all&extras=url_h&format=json&nojsoncallback=1';
  fetch(url)
    .then(response => response.json())
    .then(data => {
      console.log(data.photos.photo[getRandomInt(0, data.photos.photo.length)].url_h);
      // setImage(data.photos.photo[getRandomInt(0, data.photos.photo.length)].url_h);
    });

  return (
    <div className="container">
      <div className='background'>
        <img src='https://live.staticflickr.com/65535/51122918529_0f4e76d30b_h.jpg' alt="background"></img>
        {/* style={{ backgroundImage: `url(${imageUrl})`}}>
            style={{ backgroundImage: `url(https://live.staticflickr.com/65535/51122918529_0f4e76d30b_h.jpg)`}}> */}
        <div className='wrapper'>
          <div className='buttons'>
            <Buttons />    
          </div>

          <div className='infoblock'>

          </div>
        </div>


      </div>
    </div>
  );
}

export default App;
