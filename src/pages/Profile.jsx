import React from 'react';

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

//   const maxAttendance = Math.max(...attendanceData.map(item => item.attendance));

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
                <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
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
      
      {/* Graph section - simple CSS-based implementation */}
      <div className="p-6 mt-6 bg-white shadow-sm">
        <h3 className="text-xl font-semibold mb-4">graph</h3>
        <div className="h-64 relative">
          {/* Y-axis labels */}
          <div className="absolute left-0 top-0 bottom-0 w-10 flex flex-col justify-between text-xs text-gray-500">
            <span>100%</span>
            <span>75%</span>
            <span>50%</span>
            <span>25%</span>
            <span>0%</span>
          </div>
          
          {/* Graph container */}
          <div className="ml-10 h-full flex items-end">
            {/* Bar chart instead of line chart */}
            <div className="flex-1 flex items-end justify-around h-full pt-4 pb-8">
              {attendanceData.map((item, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div 
                    className="w-12 bg-purple-500 rounded-t"
                    style={{ height: `${(item.attendance / 100) * 100}%` }}
                  >
                    <div className="text-xs text-white text-center mt-1">{item.attendance}%</div>
                  </div>
                  <div className="text-xs mt-2">{item.month}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-4">
          <p className="text-sm text-gray-600">Module attendance percentage by month</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;