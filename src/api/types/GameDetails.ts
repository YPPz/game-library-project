export interface GameDetails {
  id: string;
  name: string;
  slug: string;
  description: string;
  released: string;
  background_image: string;
  background_image_additional: string;
  rating: number;

  platforms: {
    platform: { name: string };
  }[];

  genres: {
    id: number;
    name: string;
    slug: string;
  }[];

  tags: {
    id: number;
    name: string;
    slug: string;
  }[];
}


//   "id": 0,
//   "slug": "string",
//   "name": "string",
//   "name_original": "string",
//   "description": "string",
//   "metacritic": 0,
//   "metacritic_platforms": [
//     {
//       "metascore": 0,
//       "url": "string"
//     }
//   ],
//   "released": "2025-06-30",
//   "tba": true,
//   "updated": "2025-06-30T08:16:39Z",
//   "background_image": "http://example.com",
//   "background_image_additional": "string",
//   "website": "http://example.com",
//   "rating": 0,
//   "rating_top": 0,
//   "ratings": {},
//   "reactions": {},
//   "added": 0,
//   "added_by_status": {},
//   "playtime": 0,
//   "screenshots_count": 0,
//   "movies_count": 0,
//   "creators_count": 0,
//   "achievements_count": 0,
//   "parent_achievements_count": "string",
//   "reddit_url": "string",
//   "reddit_name": "string",
//   "reddit_description": "string",
//   "reddit_logo": "http://example.com",
//   "reddit_count": 0,
//   "twitch_count": "string",
//   "youtube_count": "string",
//   "reviews_text_count": "string",
//   "ratings_count": 0,
//   "suggestions_count": 0,
//   "alternative_names": [
//     "string"
//   ],
//   "metacritic_url": "string",
//   "parents_count": 0,
//   "additions_count": 0,
//   "game_series_count": 0,
//   "esrb_rating": {
//     "id": 0,
//     "slug": "everyone",
//     "name": "Everyone"
//   },
//   "platforms": [
//     {
//       "platform": {
//         "id": 0,
//         "slug": "string",
//         "name": "string"
//       },
//       "released_at": "string",
//       "requirements": {
//         "minimum": "string",
//         "recommended": "string"
//       }
//     }
//   ]