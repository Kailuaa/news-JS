import AppLoader from './appLoader';
import { SourcesResponse, NewsResponse, ApiEndpoint } from '../../types';

class AppController extends AppLoader {
    public getSources(callback: (data: SourcesResponse) => void): void {
        super.getResp(
            {
                endpoint: ApiEndpoint.SOURCES,
            },
            callback
        );
    }

    public getNews(e: MouseEvent, callback: (data: NewsResponse) => void): void {
        let target: Element | null = e.target instanceof Element ? e.target : null;
        const newsContainer = e.currentTarget;

        if (!target || !(newsContainer instanceof Element)) {
            return;
        }

        while (target && target !== newsContainer) {
            if (target.classList.contains('source__item')) {
                const sourceId = target.getAttribute('data-source-id');

                if (!sourceId) return;

                if (newsContainer.getAttribute('data-source') !== sourceId) {
                    newsContainer.setAttribute('data-source', sourceId);
                    super.getResp(
                        {
                            endpoint: ApiEndpoint.EVERYTHING,
                            options: {
                                sources: sourceId,
                            },
                        },
                        callback
                    );
                }
                return;
            }
            target = target.parentNode instanceof Element ? target.parentNode : null;
        }
    }
}

export default AppController;
