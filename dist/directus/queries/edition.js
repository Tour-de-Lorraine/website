import editionsFields from './fields/editions.js';

export default `#graphql
query($year: GraphQLStringOrFloat, $lang: String){
    edition: editions(filter: {year: {_eq: $year}}) {
        ${editionsFields}
    }
}`;
