export interface SearchSummary {
    id: number;
    name: string;
    slug: string;
    released: string;
    background_image: string;
    rating: number;
    rating_top: number;
    added: number;
    platforms: {
        platform:
        { name: string }
    }[];
    genres: {
        name: string
    }[];
    stores: {
        store: { name: string }
    }[];
}


// {
// "count": 0,
// "next": "http://example.com",
// "previous": "http://example.com",
// "results": [
// {
// "id": 0,
// "slug": "string",
// "name": "string",
// "released": "2025-06-30",
// "tba": true,
// "background_image": "http://example.com",
// "rating": 0,
// "rating_top": 0,
// "ratings": { },
// "ratings_count": 0,
// "reviews_text_count": "string",
// "added": 0,
// "added_by_status": { },
// "metacritic": 0,
// "playtime": 0,
// "suggestions_count": 0,
// "updated": "2025-06-30T08:16:39Z",
// "esrb_rating": {
// "id": 0,
// "slug": "everyone",
// "name": "Everyone"
// },
// "platforms": [
// {
// "platform": {
// "id": 0,
// "slug": "string",
// "name": "string"
// },
// "released_at": "string",
// "requirements": {
// "minimum": "string",
// "recommended": "string"
// }
// }
// ]
// }
// ]
// }