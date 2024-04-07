import { useEffect, useState } from "react";
import axios from "axios";
import { useAuthContext } from "../context/AuthContext";


const useTestMarks = () => {

  const { authUser } = useAuthContext();
  const [subjectMarks, setSubjectMarks] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMarks = async () => {
      setLoading(true);
      try {
        if (!authUser) {
            throw new Error('User not authenticated');
          }
        const testTypes = ["T1","T2","EndSem"];
        const marksData = {};

        for (const testType of testTypes) {
          const response = await axios.get("/api/mark/getmarks", {
            params: { userId:authUser._id , testname: testType },
          });
          if(response.length!=0){
            for (const mark of response.data.marks) {
              const subjectCode = mark.subject.subjectCode;
              if (!marksData[subjectCode]) {
                marksData[subjectCode] = { T1: null, T2: null, EndSem : null,SubjectName:null,totalObtained:null,totalMarks:null,totalPercentage:null };
                marksData[subjectCode]["SubjectName"]=mark.subject.subjectName;
                marksData[subjectCode]["totalObtained"]=0;
                marksData[subjectCode]["totalMarks"]=0;
              }
              marksData[subjectCode][testType] = mark.totalMarks;
              if(mark.totalMarks!=-1){
                marksData[subjectCode]["totalObtained"]+=mark.totalMarks
                if(testType=="T1"){
                  marksData[subjectCode]["totalMarks"]+=20
                }
                if(testType=="T2"){
                  marksData[subjectCode]["totalMarks"]+=20
                }
                if(testType=="EndSem"){
                  marksData[subjectCode]["totalMarks"]+=60
                }
                marksData[subjectCode]["totalPercentage"]=((marksData[subjectCode]["totalObtained"]/marksData[subjectCode]["totalMarks"])*100).toFixed(2);
              }
            }
          }
          
        }

        setSubjectMarks(marksData);
      } catch (error) {
        console.log(error);
        setSubjectMarks(null);
      } finally {
        setLoading(false);
      }
    };

    if (authUser) {
      fetchMarks();
    }
  }, [authUser]);

  return { subjectMarks, loading };
};

export default useTestMarks;
