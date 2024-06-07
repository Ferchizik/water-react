import React, { useState, useEffect } from 'react';
import './PageNews.css';
import NavMenu from '../components/NavMenu';

interface News {
    id: number;
    title: string;
    content: string;
    created_at: string;
}

const NewsPage: React.FC = () => {
    const [news, setNews] = useState<News[]>([]);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [createdAt, setCreatedAt] = useState('');

    useEffect(() => {
        fetch('https://water-react.ru/php/news.php')
            .then(response => response.json())
            .then(data => setNews(data));
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        formData.append('created_at', createdAt);

        fetch('https://water-react.ru/php/news.php', {
            method: 'POST',
            body: formData,
        })
            .then(response => response.json())
            .then(data => {
                if (data.status === 'success') {
                    setNews([{ id: Date.now(), title, content, created_at: createdAt }, ...news]);
                    setTitle('');
                    setContent('');
                    setCreatedAt('');
                } else {
                    alert('Error: ' + data.message);
                }
            });
    };

    return (
        <div className="App">
            <header className="header">
                <h1>Новости</h1>
                <NavMenu/>
            </header>
            <div className="container2">
                <div className="nav_panel_left">
                    <h1>Новости</h1>
                    <form onSubmit={handleSubmit} className="news-form">
                    <input
                        type="text"
                        placeholder="Заголовок"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                    <textarea
                        placeholder="Содержание"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                    />
                    <input
                        type="datetime-local"
                        value={createdAt}
                        onChange={(e) => setCreatedAt(e.target.value)}
                        required
                    />
                    <button type="submit">Добавить новость</button>
                    </form>
                </div>
                <div className='main2'>     
                    <div className="news-list">
                        {news.map((item) => (
                            <div key={item.id} className="news-item">
                                <h2>{item.title}</h2>
                                <p>{item.content}</p>
                                <small>{new Date(item.created_at).toLocaleString()}</small>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        <div className='footer'>
            &copy; 2024 Сайт судоходства - Маршруты
        </div>
    </div>
    );
};

export default NewsPage;
