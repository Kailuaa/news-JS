import './sources.css';
import { Source } from '../../../types/index';

class Sources {
    public draw(data: Source[]): void {
        const fragment = document.createDocumentFragment();
        const sourceItemTemp = document.querySelector<HTMLTemplateElement>('#sourceItemTemp');

        if (!sourceItemTemp) return;

        data.forEach((item) => {
            const sourceClone = sourceItemTemp.content.cloneNode(true) as DocumentFragment;

            const sourceName = sourceClone.querySelector<HTMLTemplateElement>('.source__item-name');
            if (sourceName) sourceName.textContent = item.name;

            const sourceItem = sourceClone.querySelector<HTMLTemplateElement>('.source__item');
            if (sourceItem) sourceItem.setAttribute('data-source-id', item.id);

            fragment.append(sourceClone);
        });

        const sourcesContainer = document.querySelector('.sources');
        if (!sourcesContainer) return;
        sourcesContainer.append(fragment);
    }
}

export default Sources;
