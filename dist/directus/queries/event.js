import eventsFields from './fields/events.js';
import eventFilter from './filter/event.js';

export default `#graphql
query($slug: String, $lang: String){
    event: events(${eventFilter}) {
        ${eventsFields}
    }
}`;
