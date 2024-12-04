//imports
import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import { Candidate } from '../interfaces/Candidate.interface';

// CandidateSearch component
const CandidateSearch = () => {
  //variables
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [SavedCandidates, setSavedCandidates] = useState<Candidate[]>([]);
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
          location: user.location || undefined,
          name: user.name || undefined,
          email: user.email || undefined,
          company: user.company || undefined,
        }));

        console.log('Mapped candidates:', mappedCandidates);
        setCandidates(mappedCandidates);

        if (mappedCandidates.length > 0) {
          const userDetails = await searchGithubUser(mappedCandidates[0].username); //fetching user details from the API
          setCandidates([userDetails]);//set first candidates details
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
      setSavedCandidates([...SavedCandidates, candidates[currentIndex]]);
      localStorage.setItem('savedCandidates', JSON.stringify([...SavedCandidates, candidates[currentIndex]]));
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
    <div>
      {currentCandidate && (
        <div>
          <h2>{currentCandidate.name || 'no name provided'}</h2>
          <p>UserName: {currentCandidate.username}</p>
          <p>Location: {currentCandidate.location || 'not provided'}</p>
          <img src={currentCandidate.avatar_url} alt={`${currentCandidate.name}'s avatar`} />
          <p>Email: {currentCandidate.email}</p>
          <p>Company: {currentCandidate.company}</p>
          <button onClick={handleSaveCandidate}>+</button>
          <button onClick={nextCandidate}>-</button>
        </div>
      )}
    </div>
  );
};

export default CandidateSearch;
