type RequestOptions = Partial<Record<'sources', string>>;
type BaseOptions = Readonly<Record<string, string>>;

interface RequestParams {
    endpoint: string;
    options?: RequestOptions;
}

class Loader {
    constructor(
        private baseLink: string,
        private options: BaseOptions
    ) {}

    public getResp<T>(
        { endpoint, options = {} }: RequestParams,
        callback: (data: T) => void = () => {
            console.error('No callback for GET response');
        }
    ): void {
        this.load<T>('GET', endpoint, callback, options);
    }

    public errorHandler(res: Response): Response {
        if (!res.ok) {
            if (res.status === 401 || res.status === 404)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    public makeUrl(options: RequestOptions, endpoint: string): string {
        const urlOptions = { ...this.options, ...options };
        const params = new URLSearchParams();

        Object.entries(urlOptions).forEach(([key, value]) => {
            if (value !== undefined) {
                params.append(key, value);
            }
        });

        return `${this.baseLink}${endpoint}?${params.toString()}`;
    }

    public load<T>(method: 'GET', endpoint: string, callback: (data: T) => void, options: RequestOptions = {}): void {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res) => res.json() as Promise<T>)
            .then((data) => callback(data))
            .catch((err: unknown) => console.error(err));
    }
}

export default Loader;
