//imports
import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import { Candidate } from '../interfaces/Candidate.interface';

// CandidateSearch component
const CandidateSearch = () => {
  //variables
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [loading, setLoading] = useState(false);

  //useEffect
  useEffect(() => {
    const fetchCandidates = async () => {
      setLoading(true);
      try {
        const candidateList = await searchGithub(); //fetching candidates from the API
        console.log('Fetched candidates:', candidateList);

        //map the fetched data
        const mappedCandidates = candidateList.map((user: any) => ({
          username: user.login,
          avatar_url: user.avatar_url,
          location: user.location || 'Location not provided',
          name: user.name || user.login || 'Name not provided',
          email: user.email || 'Public email not provided',
          company: user.company || 'Company not provided',
          html_url: user.html_url,
        }));

        console.log('Mapped candidates:', mappedCandidates);
        setCandidates(mappedCandidates);

        if (mappedCandidates.length > 0) {
          const userDetails = await searchGithubUser(mappedCandidates[0].username); //fetching user details from the API
          const updatedCandidates = [...mappedCandidates];
          updatedCandidates[0] = userDetails;
          setCandidates(updatedCandidates);
          setCurrentIndex(0);
        }
      } catch (error) {
        console.error('error fetching candidates', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCandidates();
  }, []);
  
  const handleSaveCandidate = () => {
    if (candidates[currentIndex]) {
      //retrieve existing saved candidates from local storage
      const existingSavedCandidates: Candidate[] = JSON.parse(localStorage.getItem('savedCandidates') || '[]');

      //save the current candidate
      const updatedSavedCandidates: Candidate[] = [...existingSavedCandidates, candidates[currentIndex]];
      
      //update local storage with new list of saved candidates
      localStorage.setItem('savedCandidates', JSON.stringify(updatedSavedCandidates));
      nextCandidate();
    }
  };
  

  const nextCandidate = async () => {
    const nextIndex = currentIndex + 1;
    if (nextIndex < candidates.length) {
      const userDetails = await searchGithubUser(candidates[nextIndex].username);
      setCandidates((prev) => {
        const updatedCandidates = [...prev];
        updatedCandidates[nextIndex] = userDetails;
        return updatedCandidates;
      });
      setCurrentIndex(nextIndex);
    } else {
      console.log('No more candidates to show');
    }
  };

  const currentCandidate = candidates[currentIndex];
  if (loading) {
    return <p>Loading candidates...</p>;
  }
  if(!currentCandidate) {
    return <p>No candidates found</p>;
  }

  return (
    <main className='candidate-container'>
      <h1>Candidate Search</h1>
      {currentCandidate && (
        <div className='candidate-card'>
          <img src={currentCandidate.avatar_url} alt={`${currentCandidate.name}'s avatar`} />
          <h2>{currentCandidate.name || 'no name provided'}</h2>
          <p>Username: {currentCandidate.username}</p>
          <p>Location: {currentCandidate.location || 'not rovided'}</p>
          <p>Email: {currentCandidate.email}</p>
          <p>Company: {currentCandidate.company}</p>
          <p>Github: {currentCandidate.html_url}</p>
          <div className='button-container'>
            <button className='save-button' onClick={handleSaveCandidate}>+</button>
            <button className='reject-button' onClick={nextCandidate}>-</button>
          </div>
        </div>
        )}
    </main>
  );
};

export default CandidateSearch;
