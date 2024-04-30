import React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import './datatable.scss';

import { useGetAllStudents } from '../../hooks/getStudents';

const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'avatar',
      headerName: 'Avatar',
      width: 100,
      renderCell: (params) => (
        <img
          src={params.row.gender === 'male' ? 'https://cdn3d.iconscout.com/3d/premium/thumb/cute-boy-avatar-5460344-4544330.png?f=webp' : 'https://thumbs.dreamstime.com/b/d-avatar-illustration-smiling-happy-girl-cartoon-close-up-portrait-standing-isolated-transparent-png-background-generative-272798686.jpg'}
          
          alt={params.row.gender === 'male' ? 'Boy' : 'Girl'}
          style={{ width: '50px', height: '50px', borderRadius: '50%' }}
        />
      ),
    },
    
    { field: 'fullName', headerName: 'Full Name', width: 200 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'year', headerName: 'Year', width: 120 },
    { field: 'department', headerName: 'Department', width: 150 },
    { field: 'dob', headerName: 'Date of Birth', width: 150 },
    { field: 'contactNumber', headerName: 'Contact Details', width: 150 },
  ];
  

const DataTable = () => {
  const { students, loading, error } = useGetAllStudents();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Add 'id' field to each student
  const studentsWithId = students.map((student, index) => ({
    id: index + 1, // Assuming id is a unique incremental value starting from 1
    ...student,
  }));

  return (
    <div className="dataTable">
      
        <DataGrid
          className="dataGrid"
          rows={studentsWithId}
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
  );
};

export default DataTable;
