//an interface for the Candidate objects returned by the API
export interface Candidate {
    //checked api data types 
    username: string;
    avatar_url: string;
    location: string;
    name?: string;
    email?: string;
    company?: string;
    bio?: string;
    isRejected?: boolean;
}