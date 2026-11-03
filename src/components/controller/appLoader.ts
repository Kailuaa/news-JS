import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        super(process.env.API_URL, {});
    }
}

export default AppLoader;
