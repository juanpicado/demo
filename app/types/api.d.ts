export namespace Api {
    interface Page<T> {
        page: number;
        total_pages: number;
        total_results: number;
        results: T;
    }

    interface TrendingItem {
        poster_path: string | null;
        adult: boolean;
        overview: string;
        release_date: string;
        genre_ids: number[];
        id: number;
        original_title: string;
        original_language: string;
        title: string;
        backdrop_path: string | null;
        popularity: number;
        vote_count: number;
        video: boolean;
        vote_average: number;
        media_type: string;
        success?: boolean;
    }

    type Item = Movie | TV;

    interface Movie extends TrendingItem {
        media_type: "movie";
    }

    interface TV {
        poster_path: string | null;
        popularity: number;
        id: number;
        backdrop_path: string | null;
        vote_average: number;
        overview: string;
        first_air_date: string;
        origin_country: string[];
        genre_ids: number[];
        original_language: string;
        vote_count: number;
        name: string;
        original_name: string;
        media_type: "tv";
        success?: boolean;
    }

    type ItemDetails = MovieDetails | TVDetails;

    interface MovieDetails {
        adult: boolean;
        backdrop_path: string | null;
        budget: number;
        genres: Genre[];
        homepage: string | null;
        id: number;
        imdb_id: string | null;
        original_title: string;
        original_language: string;
        overview: string;
        popularity: number;
        poster_path: string | null;
        production_companies: ProductionCompany[];
        release_date: string;
        revenue: number;
        runtime: number | null;
        spoken_languages: Language[];
        status: string;
        tagline: string | null;
        title: string;
        video: boolean;
        vote_count: number;
        vote_average: number;
        media_type: "movie";
        success?: boolean;
    }

    interface TVDetails {
        backdrop_path: string | null;
        genres: Genre[];
        homepage: string | null;
        id: number;
        name: string;
        original_name: string;
        original_language: string;
        overview: string;
        popularity: number;
        poster_path: string | null;
        production_companies: ProductionCompany[];
        status: string;
        seasons: any[];
        tagline: string | null;
        type: string;
        vote_count: number;
        vote_average: number;
        media_type: "tv";
        success?: boolean;
    }

    interface Language {
        iso_639_1: string;
        name: string;
    }

    interface ProductionCompany {
        name: string;
        id: number;
        logo_path: string | null;
        origin_country: string;
    }

    interface GenreList {
        genres: Genre[];
    }

    interface Genre {
        id: string;
        name: string;
        media_type: string;
    }
}
