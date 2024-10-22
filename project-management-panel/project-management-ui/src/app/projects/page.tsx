"use client"
import { useEffect, useState } from 'react';
import axios from 'axios';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [name, setName] = useState('');

  const fetchProjects = async () => {
    const response = await axios.get('http://localhost:3001/projects');
    setProjects(response.data);
  };

  const createProject = async () => {
    await axios.post('http://localhost:3001/projects', { name });
    setName('');
    fetchProjects();
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div>
      <h1>Projects</h1>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Project Name"
      />
      <button onClick={createProject}>Create Project</button>
      
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project: any) => (
            <tr key={project.id}>
              <td>{project.title}</td>
              <td>{project.content}</td>
              <td>{project.date || 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <style jsx>{`
        table {
          width: 100%;
          border-collapse: collapse;
        }
        th, td {
          border: 1px solid #ccc;
          padding: 8px;
          text-align: left;
        }
        th {
          background-color: #f4f4f4;
        }
      `}</style>
    </div>
  );
};

export default Projects;
