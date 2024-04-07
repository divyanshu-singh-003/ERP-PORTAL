import { useEffect, useState } from "react";
import axios from "axios";
import { useAuthContext } from "../context/AuthContext";


const useAttendance = () => {

  const { authUser } = useAuthContext();
  const [subjectAttendance, setSubjectAttendance] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAttendance = async () => {
      setLoading(true);
      try {
        if (!authUser) {
            throw new Error('User not authenticated');
          }
        
        const attendanceData ={};

        
          const response = await axios.get("/api/attendance/getattendance", {
            params: { userId:authUser._id },
          });

          for(const att of response.data.atten){
            const subjectCode= att.subject.subjectCode;
            if(!attendanceData[subjectCode]){
                attendanceData[subjectCode] = { totalAttended:null, totalClasses:null, SubjectName:null,percentage:null};
                attendanceData[subjectCode]["SubjectName"]=att.subject.subjectName;
                attendanceData[subjectCode]["totalClasses"]=att.subject.totalLectures;
                attendanceData[subjectCode]["totalAttended"]=att.totalAttendance;
                attendanceData[subjectCode]["percentage"] = ((att.totalAttendance / att.subject.totalLectures) * 100).toFixed(2);
                
            }
          }
  
  
          
        

        setSubjectAttendance(attendanceData);
      } catch (error) {
        console.log(error);
        setSubjectAttendance(null);
      } finally {
        setLoading(false);
      }
    };

    if (authUser) {
      fetchAttendance();
    }
  }, [authUser]);

  return { subjectAttendance, loading };
};

export default useAttendance;
