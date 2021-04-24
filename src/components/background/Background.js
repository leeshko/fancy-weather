import s from './background.module.css';
import React, { useState } from 'react'


const Background = () => {
    
    const [imageUrl, setImage] = useState('');

    const getRandomInt = (min, max)  => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    const url = 'https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=0f15ff623f1198a1f7f52550f8c36057&tags=nature,spring,morning&tag_mode=all&extras=url_h&format=json&nojsoncallback=1';
    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data.photos.photo[getRandomInt(0, data.photos.photo.length)].url_h);
            setImage(data.photos.photo[getRandomInt(0, data.photos.photo.length)].url_h);
        });
    return (
        <div
            className={s.backgroundImage}
           
            style={{ backgroundImage: `url(${imageUrl})`}}>
        </div>
    )

}




export default Background;