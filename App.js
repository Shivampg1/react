import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');

  const fetchQuote = async () => {
    try {
      const response = await axios.get('https://api.quotable.io/random');
      setQuote(response.data.content);
      setAuthor(response.data.author);
    } catch (error) {
      console.error('Error fetching quote:', error);
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  const tweetQuote = () => {
    const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(`"${quote}" - ${author}`)}`;
    window.open(tweetUrl, '_blank');
  };

  return (
    <div id="quote-box" className="quote-box">
      <p id="text" className="quote-text">"{quote}"</p>
      <p id="author" className="quote-author">- {author}</p>
      <button id="new-quote" onClick={fetchQuote} className="btn btn-primary">New Quote</button>
      <a 
        id="tweet-quote" 
        onClick={tweetQuote} 
        className="btn btn-secondary" 
        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`"${quote}" - ${author}`)}`} 
        target="_blank" 
        rel="noopener noreferrer"
      >
        Tweet Quote
      </a>
    </div>
  );
};

export default App;