import editionsFields from './fields/editions.js';

export default `#graphql
query($lang: String) {
    currentEdition: current_edition {
        edition {
            id,
            ${editionsFields}
        }
    }
}`;
