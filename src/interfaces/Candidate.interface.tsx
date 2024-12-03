// TODO: Create an interface for the Candidate objects returned by the API
interface Candidate {
    login: string;
    id: number;
    avatar_url: string;
    html_url: string;
    followers: number;
    following: number;
    public_repos: number;
    bio?: string;
}