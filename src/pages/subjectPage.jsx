import React from 'react';
import { useNavigate, useParams } from "react-router-dom";

const Card = ({ children, className, ...props }) => (
  <div className={`bg-black/20 backdrop-blur-lg border border-white/10 rounded-2xl ${className}`} {...props}>
    {children}
  </div>
);
const ArrowRightIcon = () => <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>;
const mockSubjectData = {
  dsa: {
    title: "Data Structures & Algorithms",
    description: "Master fundamental data structures and algorithmic thinking",
    problems: [
        { id: "problem-1", title: "Find the Largest Number in an Array", description: "Learn array traversal and comparison operations", topic: "Arrays", difficulty: "Easy" },
        { id: "problem-2", title: "Implement Binary Search", description: "Understand divide and conquer approach", topic: "Searching", difficulty: "Medium" },
        { id: "problem-3", title: "Reverse a Linked List", description: "Master pointer manipulation in linked structures", topic: "Linked Lists", difficulty: "Medium" },
    ],
  },
  wap: {
    title: "Web Application Programming",
    description: "Build modern web applications with best practices",
    problems: [
      { id: "problem-1", title: "Create a Responsive Navigation Bar", description: "Build mobile-first navigation with CSS and JavaScript", topic: "HTML/CSS", difficulty: "Easy" },
      { id: "problem-2", title: "Implement User Authentication", description: "Create secure login and registration system", topic: "Backend", difficulty: "Hard" },
    ],
  },
  maths: {
    title: "Mathematics",
    description: "Strengthen your mathematical foundation and problem-solving",
    problems: [
      { id: "problem-1", title: "Solve Quadratic Equations", description: "Master the quadratic formula and factoring methods", topic: "Algebra", difficulty: "Easy" },
      { id: "problem-2", title: "Calculate Derivatives", description: "Apply differentiation rules to various functions", topic: "Calculus", difficulty: "Medium" },
    ],
  },
};

const SubjectPage = () => {
  const { subjectId = 'dsa' } = useParams();
  const navigate = useNavigate();
  const currentSubject = mockSubjectData[subjectId];

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Easy": return "bg-green-500/20 text-green-300";
      case "Medium": return "bg-yellow-500/20 text-yellow-300";
      case "Hard": return "bg-red-500/20 text-red-300";
      default: return "bg-gray-500/20 text-gray-300";
    }
  };

  if (!currentSubject) {
    return <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">Subject not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white py-12 relative overflow-hidden pt-50">
      <div className="absolute inset-0 bg-grid-white/5"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-transparent to-gray-900"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="mb-12 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400">
            {currentSubject.title}
          </h1>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">{currentSubject.description}</p>
        </div>

        <div className="mb-8 flex flex-col md:flex-row gap-4">
            <input type="search" placeholder="Search problems..." className="flex-grow bg-white/5 border border-white/10 rounded-lg p-3 outline-none focus:ring-2 focus:ring-teal-500"/>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentSubject.problems.map((problem) => (
            <div key={problem.id} className="cursor-pointer group" onClick={() => navigate(`/${subjectId}/${problem.id}`)}>
              <Card className="p-6 h-full transition-all duration-300 group-hover:border-teal-400/50 group-hover:-translate-y-1">
                <div className="flex justify-between items-start mb-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(problem.difficulty)}`}>{problem.difficulty}</span>
                  <span className="text-xs text-gray-400 bg-white/5 px-2 py-1 rounded">{problem.topic}</span>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">{problem.title}</h3>
                <p className="text-sm text-gray-400 mb-6 flex-grow">{problem.description}</p>
                <div className="flex items-center text-teal-400 text-sm font-medium transition-colors group-hover:text-teal-300">
                  Start Problem <ArrowRightIcon />
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubjectPage;
