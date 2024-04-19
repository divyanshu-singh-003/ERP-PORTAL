import React, { useState , useEffect } from 'react';
import MenuBookIcon from "@mui/icons-material/MenuBook";
import Spinner from '../../../utils/Spinner';
import { useAuthContext } from '../../context/AuthContext';
import toast from "react-hot-toast";

const Attendance = () => {
    const [loading, setLoading] = useState(false);
    const { authUser } = useAuthContext();
    const [attendance, setAttendance] = useState([]); // Changed variable name from subjectAttendance to attendance
    const fetchAttendance = async () => {
        try {
            setLoading(true);
            const response = await fetch(`/api/attendance/userattendance?userId=${authUser._id}`, {
                method: "GET"
            });
            const responseData = await response.json();

            if (responseData.error) {
                toast.error(responseData.message);
            } else {
                setAttendance(responseData.data); // Updated variable name from subjectAttendance to attendance
            }
        } catch (e) {
            console.error("Error fetching attendance:", e);
            toast.error("Error fetching attendance. Please try again.");
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        fetchAttendance();
    }, []);

    return (
        <div className="flex-[0.8] mt-3">
            <div className="space-y-5 flex flex-col justify-center items-center">
                <div className="flex text-gray-400 items-center space-x-2">
                    <MenuBookIcon />
                    <h1>All Subjects</h1>
                </div>
                <div className="mr-10 bg-white rounded-xl pt-6 pl-6 h-[29.5rem]">
                    <div className="col-span-3 mr-6">
                        <div className="flex justify-center mt-6">
                            {loading && (
                                <Spinner
                                    message="Loading"
                                    height={50}
                                    width={150}
                                    color="#111111"
                                    messageColor="blue"
                                />
                            )}
                        </div>
                        <div className="overflow-y-auto scrollbar-thin scrollbar-track-white scrollbar-thumb-black h-[25rem] shadow-lg pl-5 rounded-md overflow-x-hidden">
                            <div className="grid grid-cols-12 bg-white">
                                <h1 className="font-bold py-2 px-2 col-span-2 text-black flex justify-center items-center">
                                    Sr no.
                                </h1>
                                <h1 className="font-bold py-2 px-2 col-span-2 text-black flex justify-center items-center">
                                    Subject Code
                                </h1>
                                <h1 className="font-bold py-2 px-2 col-span-2 text-black flex justify-center items-center">
                                    Subject Name
                                </h1>
                                <h1 className="font-bold py-2 px-2 col-span-2 text-black flex justify-center items-center">
                                    Total Attended
                                </h1>
                                <h1 className="font-bold py-2 px-2 col-span-2 text-black flex justify-center items-center">
                                    Total Classes
                                </h1>
                                <h1 className="font-bold py-2 px-2 col-span-2 text-black flex justify-center items-center">
                                    Percentage
                                </h1>
                            </div>
                            {
                                attendance && 
                                attendance.map((subject, idx) => (
                                    <div key={idx} className="grid grid-cols-12">
                                        <h1 className="font-bold py-2 px-2 col-span-2 text-black flex justify-center items-center">
                                            {idx + 1}
                                        </h1>
                                        <h1 className="font-bold py-2 px-2 col-span-2 text-black flex justify-center items-center">
                                            {subject.subjectCode}
                                        </h1>
                                        <h1 className="font-bold py-2 px-2 col-span-2 text-black flex justify-center items-center">
                                            {subject.subjectName}
                                        </h1>
                                        <h1 className="font-bold py-2 px-2 col-span-2 text-black flex justify-center items-center">
                                            {subject.totalAttended}
                                        </h1>
                                        <h1 className="font-bold py-2 px-2 col-span-2 text-black flex justify-center items-center">
                                            {subject.totalLectures}
                                        </h1>
                                        <h1 className="font-bold py-2 px-2 col-span-2 text-black flex justify-center items-center">
                                            {subject.percentageAttended}
                                        </h1>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Attendance;
