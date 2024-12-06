import { Candidate } from '../interfaces/Candidate.interface';
const searchGithub = async () => {
  try {
    const start = Math.floor(Math.random() * 100000000) + 1;
    console.log('Using token:', import.meta.env.VITE_GITHUB_TOKEN);
    console.log('Environment Variables:', import.meta.env);
    const response = await fetch(
      `https://api.github.com/users?since=${start}`,
      {
        headers: {
          Authorization: `token ${import.meta.env.VITE_GITHUB_TOKEN}`,
        },
      }
    );
    // console.log('Response:', response);
    const data = await response.json();
    if (!response.ok) {
      throw new Error('invalid API response, check the network tab');
    }
    // console.log('Data:', data);
    return data;
  } catch (err) {
    // console.log('an error occurred', err);
    return [];
  }
};

const searchGithubUser = async (username: string): Promise<Candidate> => {
  try {
    console.log('Using token:', import.meta.env.VITE_GITHUB_TOKEN);
    console.log('Environment Variables:', import.meta.env);
    console.log('fetching user:', username);
    const response = await fetch(`https://api.github.com/users/${username}`, {
      headers: {
        Authorization: `token ${import.meta.env.VITE_GITHUB_TOKEN}`,
      },
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error('invalid API response, check the network tab');
    }
    return {
      username: data.login,
      avatar_url: data.avatar_url,
      html_url: data.html_url,
      name: data.name || 'Name not provided',
      company: data.company || 'Company not provided',
      location: data.location || 'Location not provided',
      email: data.email || 'Public email not provided',
    } as Candidate;
  } catch (err) {
    console.log('an error occurred', err);
    return {
      username: 'unknown',
      avatar_url: '',
      html_url: '',
      name: 'Name not provided',
      company: 'Company not provided',
      location: 'Location not provided',
      email: 'Public email not provided',
    };
  }
};

export { searchGithub, searchGithubUser };
