//an interface for the Candidate objects returned by the API
export interface Candidate {
    //checked api data types 
    username: string;
    avatar_url: string;
    html_url: string;
    name: string;
    company: string;
    location: string;
    email: string;
}