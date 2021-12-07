import React, { useState } from 'react';
import '../styles/ImageSearch.css';
import axios from 'axios';

// returning ImageSearch Component
const ImageSearch = () =>
{
    // Creating State Hook for Image Search text and Store response Images
    let [searchText, setSearchText] = useState('');
    let [unspalshImages, setUnsplashImages] = useState([]);

    // API Calling Function
    async function fetchImages(image_search_text)
    {
        // Creating Request URL with query parameter and client_id
        let unspalsh_api_url = `https://api.unsplash.com/search/photos?query=${image_search_text}&client_id=${process.env.REACT_APP_CLIET_ID_FOR_UNSPLASH_API_KEY}`;
        
        // Calling UnsplashAPI with axios package  
        await axios.get(unspalsh_api_url).then((res) => {
            if(res.data.results)
            {
                setUnsplashImages(res.data.results);
            }
        }).then((error)=>{ 
            console.log(error);
        });
    }

    // Call API only if user Input has some value
    async function searchImages()
    {
        if(searchText.length > 0)
        {
            await fetchImages(searchText);
        }
        else
        {
            alert("Please Enter Some Text..")
        }
    }
    
    // Search and Image Container
    return <div>
                <h1>Image Search Application with Unspalsh API</h1>
                <input className="input-search" type="text" name="image_search_text" 
                        placeholder="Enter Text for Images...."
                        onChange={(event) => {setSearchText(event.target.value)}}/>
                <br/>
                <button type = "submit" className = "search-button" onClick = { searchImages }>Search Images</button>

                {/* Image Container */}
                <div className="images-container">
                    {unspalshImages.map(image => <img className = "image-card" src = {image.urls.small} alt = "imageFromAPI" key={image.urls.id}/>)}
                </div>                   
            </div>
}

// exporting component
export default ImageSearch;