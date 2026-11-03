export interface Source {
    id: string;
    name: string;
}

export interface Article {
    urlToImage: string | null;
    author: string | null;
    source: {
        name: string;
    };
    publishedAt: string;
    title: string;
    description: string | null;
    url: string;
}

export type ArticlePreview = Pick<Article, 'title' | 'url'>;

export interface SourcesResponse {
    sources: Source[];
}

export interface NewsResponse {
    articles: Article[];
}

export enum ApiEndpoint {
    SOURCES = 'sources',
    EVERYTHING = 'everything',
}
