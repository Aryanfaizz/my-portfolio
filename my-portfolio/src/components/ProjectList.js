import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ProjectList({ theme, setLoading, setError }) {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get('http://localhost:9000/.netlify/functions/api/projects');
        setProjects(response.data);
      } catch (err) {
        setError('Failed to fetch projects. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, [setLoading, setError]);

  return (
    <section id="projects">
      <h2>Projects</h2>
      {projects.length > 0 ? (
        <div className="row">
          {projects.map(project => (
            <div key={project.name} className="col-md-4 mb-3">
              <div className={`card ${theme === 'dark' ? 'bg-dark text-light' : ''}`}>
                <div className="card-body">
                  <h5 className="card-title">{project.name}</h5>
                  <p className="card-text"><strong>Author:</strong> {project.author}</p>
                  <p className="card-text"><strong>Languages:</strong> {project.languages.join(', ')}</p>
                  <p className="card-text">{project.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No projects available.</p>
      )}
    </section>
  );
}

export default ProjectList;