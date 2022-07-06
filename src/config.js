

export const YOUTUBE_VIDEO_BASE_URL = "https://www.youtube.com/watch?v="

export const YOUTUBE_API_BASE_URL = "https://www.googleapis.com/youtube/v3"

export const columnWidths = {
  "Keyword" : 240,
  "Source" : 220,
  "Master Track" : 148,
  "KeyAndBpm" : 60
}

export const columnTypes = [
  "Vocals",
  "Accompaniment"
]

const DEVELOPMENT = false;

const LOCAL_SERVER = "http://localhost:3000"

const LOCAL_BACKEND_SERVER = "http://34.66.84.254:8000"

const PRODUCTION_BACKEND_SERVER = "http://34.66.84.254:8000"

const PRODUCTION_SERVER = "https://dj-assistant-frontend.herokuapp.com"

export const REDIRECT_URI = DEVELOPMENT? LOCAL_SERVER : PRODUCTION_SERVER;

export const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";

export const TOKEN_AUTH_ENDPOINT = "https://accounts.spotify.com/api/token";

export const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;

export const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET;

export const RESPONSE_TYPE = "code";

export const SPOTIFY_API_URL = "https://api.spotify.com/v1"

export const SEARCH_ENDPOINT = "/search"

export const AUDIO_FEATURES_ENDPOINT = "/audio-features/"

export const PLAYLISTS_ENDPOINT = "/me/playlists"

//https://developer.spotify.com/documentation/general/guides/authorization/scopes/
export const SCOPE = "playlist-read-collaborative playlist-read-private"

export const BACKEND_URL =  DEVELOPMENT? LOCAL_BACKEND_SERVER : PRODUCTION_BACKEND_SERVER
