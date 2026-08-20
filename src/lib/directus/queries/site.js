import siteNavigationFields from './fields/siteNavigation.js';
import settingsFields from './fields/settings.js';

export default `#graphql
query($lang: String){
    navigation: pages(sort: "order") {
        ${siteNavigationFields}
    }
    settings {
        ${settingsFields}
    }
    currentEdition: current_edition {
        edition {
            year
        }
    }
}`;
