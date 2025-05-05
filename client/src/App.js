import { useEffect, useState, useRef } from 'react';
import './App.css';

function App() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState(
    localStorage.getItem('searchQuery') || ''
  );
  const [selectedCategory, setSelectedCategory] = useState(
    localStorage.getItem('selectedCategory') || 'All'
  );
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const searchRef = useRef();

  const categories = ['All', 'Business', 'Entertainment', 'Health', 'Science', 'Sports', 'Technology'];

  useEffect(() => {
    const endpoint =
      selectedCategory === 'All'
        ? `https://newsapi.org/v2/top-headlines?country=us&pageSize=12&page=${page}&apiKey=805d7dd98c3a479390af0a068a70fb6c`
        : `https://newsapi.org/v2/top-headlines?country=us&category=${selectedCategory.toLowerCase()}&pageSize=12&page=${page}&apiKey=805d7dd98c3a479390af0a068a70fb6c`;

    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        const enriched = data.articles.map(article => ({
          ...article,
          category: selectedCategory,
          date: new Date(article.publishedAt).toLocaleDateString(),
          image: article.urlToImage
        }));
        setArticles(prev => [...prev, ...enriched]);
        setLoading(false);
        if (!data.articles || data.articles.length < 12) setHasMore(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [selectedCategory, page]);

  useEffect(() => {
    localStorage.setItem('searchQuery', searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    localStorage.setItem('selectedCategory', selectedCategory);
  }, [selectedCategory]);

  useEffect(() => {
    setPage(1);
    setArticles([]);
    setHasMore(true);
  }, [selectedCategory]);

  const filteredArticles = articles.filter(article =>
    article.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(e.target)
      ) {
        setSearchVisible(false);
      }
    };
    if (searchVisible) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [searchVisible]);

  return (
    <div className="app">
      <header className="topbar">
        <div className="container">
          <div className="logo">Aza<span>News</span></div>
          <nav className="nav">
            {categories.map(cat => (
              <a
                key={cat}
                href="#"
                className={selectedCategory === cat ? 'active' : ''}
                onClick={e => {
                  e.preventDefault();
                  setSelectedCategory(cat);
                  setLoading(true);
                }}
              >
                {cat}
              </a>
            ))}
          </nav>

          <div
            className={`search-wrapper ${searchVisible ? 'expanded' : ''}`}
            ref={searchRef}
            onClick={() => setSearchVisible(true)}
          >
            <button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                fill="none"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </header>

      <main className="container">
        {loading && page === 1 ? (
          <>
            <div className="spinner" />
            <div className="news-grid">
              {[...Array(6)].map((_, i) => (
                <div className="skeleton-card" key={i}>
                  <div className="skeleton-img" />
                  <div className="skeleton-line short" />
                  <div className="skeleton-line long" />
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
            <div className="news-grid">
              {filteredArticles.map((article, i) => (
                <a
                  className="news-card"
                  key={i}
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={article.image} alt="" />
                  <div className="news-content">
                    <span className="tag">{article.category}</span>
                    <h3>{article.title}</h3>
                    <p>{article.date}</p>
                    <div className="read-more">Read More →</div>
                  </div>
                </a>
              ))}
            </div>
            {hasMore && (
              <div style={{ textAlign: 'center', margin: '30px 0' }}>
                <button
                  onClick={() => {
                    setPage(prev => prev + 1);
                    setLoading(true);
                  }}
                  className="load-more"
                >
                  Load More
                </button>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}

export default App;
