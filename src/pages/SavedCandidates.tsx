//imports
import { useEffect, useState } from 'react';
import { Candidate } from '../interfaces/Candidate.interface';

const SavedCandidates = () => {
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    const loadSavedCandidates = () => {
      const saved = localStorage.getItem('savedCandidates');
      if (saved) {
        setSavedCandidates(JSON.parse(saved));
      }
    };
    loadSavedCandidates();
  }, []);

  //haneleRejectedCandidate function
  const handleRejectedCandidate = (username: string) => {
    const updatedSavedCandidates = savedCandidates.filter(candidate => candidate.username !== username);
    setSavedCandidates(updatedSavedCandidates);
    localStorage.setItem('savedCandidates', JSON.stringify(updatedSavedCandidates));
  }
  return (
    <>
      <h1>Potential Candidates</h1>
      {savedCandidates.length === 0 ? (
        <p>No Saved Candidates found!</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Img</th>
              <th>Name</th>
              <th>Location</th>
              <th>Email</th>
              <th>company</th>
              <th>Github</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {savedCandidates.map(candidate => (
              <tr key={candidate.username}>
                <td>
                <img src={candidate.avatar_url} alt={`${candidate.name}'s avatar`} style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
                </td>
                <td>{candidate.name || candidate.username}</td>
                <td>{candidate.location}</td>
                <td>{candidate.email}</td>
                <td>{candidate.company}</td>
                <td>{candidate.html_url}</td>
                <td>
                  <button onClick={() => handleRejectedCandidate(candidate.username)}>Reject</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        )}
    </>
  );
};

export default SavedCandidates;
