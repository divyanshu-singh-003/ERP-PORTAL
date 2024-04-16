import React, { useState , useEffect} from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import UploadTrip from '../../components/item/UploadTrip';
import toast from "react-hot-toast";

const CabSharing = () => {
  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'stuid', headerName: 'Full Name', width: 200 },
    { field: 'phoneNumber', headerName: 'Phone No.', width: 200 },
    { field: 'train', headerName: 'Train No.', width: 150 },
    { field: 'hour', headerName: 'Hour', width: 120 },
    { field: 'minute', headerName: 'Minute', width: 120 },
    { field: 'date', headerName: 'Date', width: 120 },
    { field: 'destination', headerName: 'Destination', width: 120 },
  ];

  const  [rows,setRows] = useState([]);

  const [openData, setOpenData] = useState(true);
  const [openUploadTrip, setOpenUploadTrip] = useState(false);

  const handleUploadTripOpen = () => {
    setOpenUploadTrip(true);
    setOpenData(false);
  };

  const handleUploadTripClose = () => {
    setOpenUploadTrip(false);
    setOpenData(true);
  };

  const fetchCabs = async(date , destination) =>{

    const response = await fetch(`/api/cabs/getcab?date=${date}&destination=${destination}`,{
        method:"get"
    });
    const dataResponse=await response.json();
    if(dataResponse.error){
        toast.error(dataResponse.message);
    }
    // console.log("Here at cabs");
    // console.log(dataResponse.data);

    const rowsWithIds = dataResponse.data.map((item, index) => ({
        ...item,
        id: index + 1 // You can use any logic to generate the id, here I'm just using index + 1
      }));
  
   
    setRows(rowsWithIds);
  }
 useEffect(()=>{
    fetchCabs()
  },[])
  return (
    <div>
      <div className="bg-white py-3 px-4 flex justify-between items-center">
        <h2 className='font-bold text-lg text-black'>Find Cabs</h2>
        <button className='border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-all py-1 px-3 rounded-full' onClick={handleUploadTripOpen}>Upload Trip</button>
      </div>

      {openUploadTrip && (
        <UploadTrip onClose={handleUploadTripClose} fetchCabs={fetchCabs} />
      )}

      {openData && (
        <div>
          <DataGrid
            className="bg-white p-5 mt-6"
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 10,
                },
              },
            }}
            slots={{ toolbar: GridToolbar }}
            slotProps={{
              toolbar: {
                showQuickFilter: true,
                quickFilterProps: { debounceMs: 500 },
              },
            }}
          />
        </div>
      )}
    </div>
  );
};

export default CabSharing;
