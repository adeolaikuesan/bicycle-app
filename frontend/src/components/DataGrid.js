import React, {useEffect, useState }from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios' 


function DataGridForJourneys(){
    const [journeyData, setData] = useState([])

    const getJourneyData = async ()=> {
        await axios.get('http://localhost:5001/api/journeys').then((response) => {
            // console.log(typeof response.data)

            setData(response.data) 
            // console.log(typeof data);

    })
    }

    useEffect(() => {
        getJourneyData();
    }, [])


    const rows = journeyData.map((row, index) => ({
        id : index,
        departure_station_name : row.departure_station_name,
        return_station_name: row.return_station_name,
        covered_distance : Math.round(row.covered_distance) /1000,
        duration : Math.round(row.duration / 60)

    }));

    const columns = [
        {field: "departure_station_name", headerName: "Departure Station",flex: 4},
        {field: "return_station_name", headerName: "Return Station", flex: 4},
        {field: "covered_distance", headerName: "Distance (km)", flex: 2},
        {field: "duration", headerName: "Duration (mins)", flex: 2},

    ];

    // const [pageState, setPageState] = useState({
    //     isLoading:false,
    //     data: [],
    //     total: 0,
    //     page: 1,
    //     pageSize: 10,
    // })

    // useEffect(() => {
    //     const fetchData = async () => {
    //       console.log('ON')
    //       setPageState(old => ({ ...old, isLoading: true }))
    //       console.log(pageState.page)
    //       console.log(pageState.pageSize)
    //       const response = await axios.get(`http://localhost:5001/api/journeys?page=${pageState.page}&limit=${pageState.pageSize}`)
    //       const json = await response
    //       console.log(json.total)
    //       setPageState(old => ({ ...old, isLoading: false, data: json.data, total: json.total }))
    //     }
    //     fetchData()
    //   }, [pageState.page, pageState.pageSize])

    // rowCount={pageState.total}
    // getRowId={(row) => row.departure+  row.duration}
    // loading={pageState.isLoading}
    // rowsPerPageOptions={[10, 30, 50, 70, 100]}
    // pagination
    // page={pageState.page - 1}
    // pageSize={pageState.pageSize}
    // paginationMode="server"
    // onPageChange={(newPage) => {
    //   setPageState(old => ({ ...old, page: newPage + 1 }))
    // }}
    // onPageSizeChange={(newPageSize) => setPageState(old => ({ ...old, pageSize: newPageSize }))}

    return (
        
        <div style={{ height: 700, width: '100%' }}>
          <DataGrid rows={rows} columns={columns} rowHeight={30}
         />
        </div>
      );    
}

export default DataGridForJourneys 