import React, { useState } from 'react';
import '../styles/ImageSearch.css';
import axios from 'axios';

// returning ImageSearch Component
const ImageSearch = () =>
{
    let [searchText, setSearchText] = useState('');
    let [unspalshImages, setUnsplashImages] = useState([]);

    async function fetchImages(image_search_text){
        let unspalsh_api_url = `https://api.unsplash.com/search/photos?query=${image_search_text}&client_id=lZMfOCDzWg7QwxJ1vioPYfuJ4s9C287NRONTONk7VDY`;
        
        await axios.get(unspalsh_api_url).then((response)=>{
            console.log(response['data']['results']);
            if(response.data.results)
            {
                setUnsplashImages(response.data.results);
            }
        }).then((error)=>{ 
            console.log(error)
        });
    }

    // Call API only if user Input has some value
    async function searchImages()
    {
        if(searchText.length > 0)
        {
            await fetchImages(searchText);
        }
    }
    
    // Search and Image Container
    return <div className="container">
                <h1>Image Search Application with Unspalsh API</h1>
                <input className="input-search" type="text" name="image_search_text" 
                        placeholder="Enter Text for Images...."
                        onChange={(event)=>{setSearchText(event.target.value)}}/>
                    <br/>
                <button type="submit" className="search-button" onClick={searchImages}>Search Images</button>
                <div className="images-container">
                   {unspalshImages.map((images) => {
                       console.log(images.urls.small);
                       <img src={require("'" + images.urls.small + "'")} alt="images"/>
                   })}
                </div>                   
            </div>
}

export default ImageSearch;