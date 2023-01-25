import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MDBBtn } from 'mdb-react-ui-kit';


function News() {
  const [news, setNews] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('date');

  useEffect(() => {
    async function fetchData() {
      const result = await axios(
        'https://newsapi.org/v2/top-headlines?country=pl&apiKey=77f66d066964476babb5bd8ab8dc9e95'
      );
      setNews(result.data.articles);
    }
    fetchData();
  }, []);

  const handleSearch = (e: any) => {
    setSearchTerm(e.target.value);
  };

  const handleSort = (sortBy: string) => {
    setSortBy(sortBy);
  };

  const filteredNews = news.filter((article) =>
  String(article['title']).toLowerCase().includes(searchTerm.toLowerCase())
);

  const sortedNews = filteredNews.sort((a, b) => {
    return sortBy === 'date'
      ? new Date(b['publishedAt']).getTime() - new Date(a['publishedAt']).getTime()
      : sortBy === 'title'
      ? String(a['title']).localeCompare(String(b['title']))
      : 0;
  });

  const addToFavorites = (article:any) => {
    axios.post('http://localhost:3000/favorites', article)
    .then(res => console.log(res.data))
}

  return ( <div>
    <h1>New news</h1>
    <input type="text" placeholder="Search news" value={searchTerm} onChange={handleSearch} />
    
    <select className="custom-select" value={sortBy} onChange={(e)=> handleSort(e.target.value)}> <br></br>
      <option value="date">Sort by date</option>
      <option value="title" >Sort by title</option>
    </select>
    <div style={{display: 'flex', flexWrap: 'wrap'}}> {sortedNews.map((article, index) => ( <div key={index} style={{flex: '1 0 30%', margin: '1em'}}>
    <a className='custom-link' href={article['url']} target="_blank" rel="noopener noreferrer">
  <h2>{article['title']}</h2>
</a>
        <p>{article['description']}</p>
        <img height="150" src={article['urlToImage']} alt={article['title']} />
        <footer>Source: {article['source']['name']}</footer>
        <MDBBtn className="custom-button" onClick={()=> addToFavorites(article)}>Add to favorites</MDBBtn>
      </div> ))} </div>
  </div> ); 
  }

export default News;