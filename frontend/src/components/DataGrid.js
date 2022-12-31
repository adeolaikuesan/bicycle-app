import React, {useEffect, useState }from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios' 

function DataGridForJourneys(){
    const [data, setData] = useState([])

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

    const rows = data.map((row, index) => ({
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

    return (
        <div style={{ height: 700, width: '100%' }}>
          <DataGrid rows={rows} columns={columns} rowHeight={30} />
        </div>
      );    
}

export default DataGridForJourneys 