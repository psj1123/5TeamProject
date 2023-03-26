import React from 'react';

const ProjectOverview = ({ title, description }) => {
  return (
    <div className="projectOverview">
      <h4>{title}</h4>
      <p>{description}</p>
    </div>
  );
};

export default ProjectOverview;
