import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import toast from "react-hot-toast";

import { useAuthContext } from '../../context/AuthContext';

const Complaint = () => {
    const { authUser } = useAuthContext();
    const types = ["Mess","Hostel","Administration","Accounts","Exam Cell","Others"]

  const [complaint, setComplaint] = useState('');

  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Your EmailJS service ID, template ID, and Public Key
    const serviceId = 'service_mirte0o';
    const templateId = 'template_l2uocwn';
    const publicKey = 'jRRgEi0gwK0UKraGS';

    const templateParams = {
      from_name: authUser.fullName,
      user_email: authUser.email,
      complaint: complaint,
      message: message,
    };

    emailjs.send(serviceId, templateId, templateParams, publicKey)
      .then((response) => {
        toast.success('Email sent successfully!', response);
        setMessage('');
        setComplaint('')
      })
      .catch((error) => {
        console.error('Error sending email:', error);
      });
    console.log("I am here");
  };

  return (
    <div className="flex-col justify-center items-center text-black">
        <div className="w-full flex justify-center">
        <h1 className="font-bold text-lg text-white">COMPLAINT FORM!!</h1>
        </div>
        <div className="w-full flex justify-center">
      <form onSubmit={handleSubmit} className="grid p-4 gap-10 w-1/2">

        <select value={complaint} name="type" onChange={(e) => setComplaint(e.target.value)} className="p-2 bg-slate-100 border rounded">
            <option value={""}>Select Complaint Category</option>
                {
                    types.map((el,index)=>{
                        return <option value={el} key={index+1}>{el}</option>
                    })
                }
          </select>
        
        <textarea
          cols="30"
          rows="15"
          placeholder="Description"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className='p-2 bg-slate-100 border rounded'
        />
        <div className="w-full flex justify-center">
        <button type="submit" className="px-3 py-1 bg-red-600 text-white mb-10 hover:bg-red-700 w-1/4">Send Complaint</button>
        </div>
      </form>
      </div>
    </div>
  );
};

export default Complaint;
