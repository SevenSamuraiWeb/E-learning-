// import React from 'react'
// import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";


// const Profile = () => {
//   // Sample data for completed courses
//   const completedCourses = [
//     { id: 1, title: "Introduction to Programming", date: "Jan 15, 2025", progress: 100 },
//     { id: 2, title: "Web Development Fundamentals", date: "Feb 2, 2025", progress: 100 },
//     { id: 3, title: "Database Management", date: "Feb 20, 2025", progress: 100 },
//     { id: 4, title: "UI/UX Design Principles", date: "Mar 5, 2025", progress: 100 },
//     { id: 5, title: "Mobile App Development", date: "Mar 22, 2025", progress: 100 },
//     { id: 6, title: "Cloud Computing Essentials", date: "Apr 10, 2025", progress: 100 },
//   ];

//   // Sample data for attendance graph
//   const attendanceData = [
//     { month: "Jan", attendance: 85 },
//     { month: "Feb", attendance: 92 },
//     { month: "Mar", attendance: 78 },
//     { month: "Apr", attendance: 88 },
//     { month: "May", attendance: 95 },
//     { month: "Jun", attendance: 90 },
//     { month: "Jul", attendance: 82 },
//   ];

//   return (
//     <div className="flex flex-col min-h-screen bg-gray-100 p-6">
//       {/* Profile section */}
//       <div className="flex flex-col md:flex-row items-center p-6 bg-white shadow rounded-lg">
//         <div className="flex flex-col items-center md:items-start md:mr-8">
//           <div className="w-32 h-32 bg-gray-200 rounded-full mb-4" />
//           <h2 className="text-2xl font-bold">Sahana</h2>
//           <p className="text-gray-600">Username: Ss</p>
//           <p className="text-gray-600">Email: xxx@gmail.com</p>
//         </div>
        
//         {/* Completed journey section */}
//         <div className="w-full mt-6 md:mt-0">
//           <h3 className="text-xl font-semibold mb-4">Completed Journey</h3>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//             {completedCourses.map(course => (
//               <div key={course.id} className="p-4 bg-pink-50 rounded-lg shadow hover:shadow-md transition">
//                 <h4 className="font-medium text-gray-800">{course.title}</h4>
//                 <p className="text-sm text-gray-500 mt-2">Completed: {course.date}</p>
//                 <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
//                   <div className="bg-green-500 h-2 rounded-full" style={{ width: `${course.progress}%` }}></div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
      
//       {/* Attendance Graph */}
//       <div className="p-6 mt-6 bg-white shadow rounded-lg">
//         <h3 className="text-xl font-semibold mb-4">Attendance Graph</h3>
//         <ResponsiveContainer width="100%" height={300}>
//           <BarChart data={attendanceData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
//             <XAxis dataKey="month" />
//             <YAxis domain={[0, 100]} />
//             <Tooltip />
//             <Bar dataKey="attendance" fill="#6B46C1" radius={[5, 5, 0, 0]} />
//           </BarChart>
//         </ResponsiveContainer>
//         <p className="text-sm text-gray-600 mt-4">Module attendance percentage by month</p>
//       </div>
//     </div>
//   );
// };

// export default Profile;

import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Profile = () => {
  // Sample data for completed courses
  const completedCourses = [
    { id: 1, title: "Introduction to Programming", date: "Jan 15, 2025", progress: 100 },
    { id: 2, title: "Web Development Fundamentals", date: "Feb 2, 2025", progress: 100 },
    { id: 3, title: "Database Management", date: "Feb 20, 2025", progress: 100 },
    { id: 4, title: "UI/UX Design Principles", date: "Mar 5, 2025", progress: 100 },
    { id: 5, title: "Mobile App Development", date: "Mar 22, 2025", progress: 100 },
    { id: 6, title: "Cloud Computing Essentials", date: "Apr 10, 2025", progress: 100 },
  ];

  // Sample data for attendance graph
  const attendanceData = [
    { month: 'Jan', attendance: 85 },
    { month: 'Feb', attendance: 92 },
    { month: 'Mar', attendance: 78 },
    { month: 'Apr', attendance: 88 },
    { month: 'May', attendance: 95 },
    { month: 'Jun', attendance: 90 },
    { month: 'Jul', attendance: 82 },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Profile section */}
      <div className="flex flex-col md:flex-row items-center p-6 bg-white shadow-sm">
        <div className="flex flex-col items-center md:items-start md:mr-8">
          <div className="w-32 h-32 bg-gray-200 rounded-full mb-4"></div>
          <h2 className="text-2xl font-bold">Sahana</h2>
          <p className="text-gray-600">username:Ss</p>
          <p className="text-gray-600">email:xxx@gmail.com</p>
        </div>
        
        {/* Completed journey section */}
        <div className="w-full mt-6 md:mt-0">
          <h3 className="text-xl font-semibold mb-4">completed journey</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {completedCourses.map(course => (
              <div 
                key={course.id} 
                className="p-4 bg-pink-50 rounded shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <h4 className="font-medium text-gray-800">{course.title}</h4>
                <p className="text-sm text-gray-500 mt-2">Completed: {course.date}</p>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full" 
                    style={{ width: `${course.progress}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Attendance Graph */}
      <div className="p-6 bg-white shadow-sm mt-6">
        <h3 className="text-xl font-semibold mb-4">Attendance Overview</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={attendanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="attendance" 
                stroke="#8884d8" 
                strokeWidth={2}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Profile;