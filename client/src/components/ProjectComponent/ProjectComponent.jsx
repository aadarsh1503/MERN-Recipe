import React from 'react';

const ProjectsComponent = () => {
  const projects = [
    {
      title: "Porsche",
      location: "Paul Ekman HQ, USA",
      imageUrl: "/path/to/your-porsche-image.jpg",
    },
    {
      title: "Barry's",
      location: "Paul Ekman HQ, USA",
      imageUrl: "/path/to/your-barrys-image.jpg",
    },
  ];

  return (
    <div className="bg-white flex flex-wrap justify-center p-10">
      <h2 className="w-full text-gray-600 text-center uppercase mb-8 tracking-widest text-sm">Selected Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project, index) => (
          <div
            key={index}
            className="relative flex flex-col items-center"
          >
            <img
              src={project.imageUrl}
              alt={project.title}
              className="w-full h-72 object-cover mb-4 rounded-md shadow-lg"
            />
            <div className="text-center text-gray-800">
              <p className="font-bold uppercase tracking-widest">{project.title}</p>
              <p className="text-xs text-gray-500 mt-1">{project.location}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsComponent;
