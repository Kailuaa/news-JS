import './news.css';
import { Article, ArticlePreview } from '../../../types';

class News {
    public draw(data: Article[]): void {
        const news = data.length >= 10 ? data.filter((_item, idx) => idx < 10) : data;

        const fragment = document.createDocumentFragment();
        const newsItemTemp = document.querySelector<HTMLTemplateElement>('#newsItemTemp');

        if (!newsItemTemp) return;

        news.forEach((item, idx) => {
            const newsClone = newsItemTemp.content.cloneNode(true) as DocumentFragment;

            const newsItem = newsClone.querySelector<HTMLTemplateElement>('.news__item');
            if (idx % 2 && newsItem) newsItem.classList.add('alt');

            const newsPhoto = newsClone.querySelector<HTMLTemplateElement>('.news__meta-photo');
            if (newsPhoto) newsPhoto.style.backgroundImage = `url(${item.urlToImage || 'img/news_placeholder.jpg'})`;

            const newsAuthor = newsClone.querySelector<HTMLElement>('.news__meta-author');
            if (newsAuthor) {
                newsAuthor.textContent = item.author || item.source.name;
            }

            const newsDate = newsClone.querySelector<HTMLElement>('.news__meta-date');
            if (newsDate) {
                newsDate.textContent = item.publishedAt.slice(0, 10).split('-').reverse().join('-');
            }

            const newsTitle = newsClone.querySelector<HTMLElement>('.news__description-title');
            if (newsTitle) newsTitle.textContent = item.title;

            const newsSource = newsClone.querySelector<HTMLElement>('.news__description-source');
            if (newsSource) newsSource.textContent = item.source.name;

            const newsDescription = newsClone.querySelector<HTMLElement>('.news__description-content');
            if (newsDescription) newsDescription.textContent = item.description;

            const articlePreview: ArticlePreview = {
                title: item.title,
                url: item.url,
            };

            const newsLink = newsClone.querySelector<HTMLAnchorElement>('.news__read-more a');
            if (newsLink) newsLink.setAttribute('href', articlePreview.url);

            fragment.append(newsClone);
        });

        const newsContainer = document.querySelector('.news');
        if (!newsContainer) return;

        newsContainer.innerHTML = '';
        newsContainer.appendChild(fragment);
    }
}

export default News;
