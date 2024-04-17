import React, { useState, useEffect } from 'react';
import MenuBookIcon from "@mui/icons-material/MenuBook";
import Spinner from '../../../utils/Spinner';

import { useAuthContext } from '../../context/AuthContext';

import toast from "react-hot-toast";

const Marks = () => {
    const [loading, setLoading] = useState(false);
    const [subjectMarks, setSubjectMarks] = useState([]);
    console.log(subjectMarks);

    const { authUser } = useAuthContext();

    const fetchMarks = async () => {
        try {
            setLoading(true);
            const response = await fetch(`/api/mark/getmarks2?userId=${authUser._id}`, {
                method: "GET"
            });
            const responseData = await response.json();

            if (responseData.error) {
                toast.error(responseData.message);
            } else {
                setSubjectMarks(responseData.marks);
            }
        } catch (error) {
            console.error("Error fetching marks:", error);
            toast.error("Error fetching marks. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMarks();
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
                            <div className="grid grid-cols-9 bg-white">
                                <h1 className="font-bold py-2 px-2 col-span-1 text-black flex justify-center items-center">
                                    Sr no.
                                </h1>
                                <h1 className="font-bold py-2 px-2 col-span-1 text-black flex justify-center items-center">
                                    Subject Code
                                </h1>
                                <h1 className="font-bold py-2 px-2 col-span-1 text-black flex justify-center items-center">
                                    Subject Name
                                </h1>
                                <h1 className="font-bold py-2 px-2 col-span-1 text-black flex justify-center items-center">
                                    T1(20)
                                </h1>
                                <h1 className="font-bold py-2 px-2 col-span-1 text-black flex justify-center items-center">
                                    T2(20)
                                </h1>
                                <h1 className="font-bold py-2 px-2 col-span-1 text-black flex justify-center items-center">
                                    ES(60)
                                </h1>
                                <h1 className="font-bold py-2 px-2 col-span-1 text-black flex justify-center items-center">
                                    Total Marks
                                </h1>
                                <h1 className="font-bold py-2 px-2 col-span-1 text-black flex justify-center items-center">
                                    Percentage
                                </h1>
                            </div>
                            {subjectMarks && Object.keys(subjectMarks).map((subjectCode, idx) => (
                                <div key={idx} className="grid grid-cols-9">
                                    <h1 className="font-bold py-2 px-2 col-span-1 text-black flex justify-center items-center">
                                        {idx + 1}
                                    </h1>
                                    <h1 className="font-bold py-2 px-2 col-span-1 text-black flex justify-center items-center">
                                        {subjectCode}
                                    </h1>
                                    <h1 className="font-bold py-2 px-2 col-span-1 text-black flex justify-center items-center">
                                    { subjectMarks[subjectCode].subjectName}
                                    </h1>
                                    <h1 className="font-bold py-2 px-2 col-span-1 text-black flex justify-center items-center">
                                        { subjectMarks[subjectCode].T1}
                                    </h1>
                                    <h1 className="font-bold py-2 px-2 col-span-1 text-black flex justify-center items-center">
                                        {subjectMarks[subjectCode].T2}
                                    </h1>
                                    <h1 className="font-bold py-2 px-2 col-span-1 text-black flex justify-center items-center">
                                        { subjectMarks[subjectCode].EndSem}
                                    </h1>
                                    <h1 className="font-bold py-2 px-2 col-span-1 text-black flex justify-center items-center">
                                        {subjectMarks[subjectCode].TotalMarksObtained}/{subjectMarks[subjectCode].TotalMarksAvailable}
                                    </h1>
                                    <h1 className="font-bold py-2 px-2 col-span-1 text-black flex justify-center items-center">
                                        {subjectMarks[subjectCode].Percentage}
                                    </h1>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Marks;
