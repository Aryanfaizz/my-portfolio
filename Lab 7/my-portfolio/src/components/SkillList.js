import React, { useState } from 'react';

function SkillList({ theme }) {
  const skills = [
    { name: 'JavaScript', category: 'Programming' },
    { name: 'React', category: 'Frontend' },
    { name: 'Node.js', category: 'Backend' },
    { name: 'CSS', category: 'Frontend' },
    { name: 'Python', category: 'Programming' },
  ];

  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  const filteredSkills = skills.filter(skill =>
    skill.name.toLowerCase().includes(search.toLowerCase()) &&
    (!categoryFilter || skill.category === categoryFilter)
  );

  const categories = [...new Set(skills.map(skill => skill.category))];

  return (
    <section id="skills" className="mb-5" style={{ animation: 'fadeIn 1s ease-in-out' }}>
      <h2 className={theme === 'dark' ? 'text-white' : ''}>Skills</h2>
      <div className="mb-4">
        <input
          type="text"
          className={`form-control ${theme === 'dark' ? 'bg-dark text-white border-light' : 'text-dark'}`}
          placeholder="Search skills..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="mb-4">
        {categories.map(category => (
          <div className="form-check form-check-inline" key={category}>
            <input
              type="checkbox"
              className="form-check-input"
              id={category}
              checked={categoryFilter === category}
              onChange={() => setCategoryFilter(categoryFilter === category ? '' : category)}
            />
            <label
              className={`form-check-label ${theme === 'dark' ? 'text-white' : ''}`}
              htmlFor={category}
            >
              {category}
            </label>
          </div>
        ))}
      </div>
      <ul className={`list-group ${theme === 'dark' ? 'list-group-dark' : ''}`}>
        {filteredSkills.map(skill => (
          <li
            key={skill.name}
            className={`list-group-item ${theme === 'dark' ? 'text-white bg-dark' : ''}`}
            style={{ animation: 'fadeIn 0.5s ease-in-out' }}
          >
            {skill.name}{' '}
            <span className={theme === 'dark' ? 'text-white' : 'text-muted'}>({skill.category})</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default SkillList;