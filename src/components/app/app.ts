import AppController from '../controller/controller';
import { AppView } from '../view/appView';

class App {
    constructor(
        private controller: AppController = new AppController(),
        private view: AppView = new AppView()
    ) {}

    start(): void {
        const sourcesElement = document.querySelector<HTMLElement>('.sources');

        if (!sourcesElement) throw new Error('Sources element not found');

        sourcesElement.addEventListener('click', (e: MouseEvent) => {
            this.controller.getNews(e, (data) => this.view.drawNews(data));
        });

        this.controller.getSources((data) => this.view.drawSources(data));
    }
}

export default App;
