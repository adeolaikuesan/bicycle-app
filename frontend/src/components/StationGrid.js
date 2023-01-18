import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import InfoIcon from "@mui/icons-material/Info";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "70%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function DataGridForStations() {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false); // State to control the modal
  const [rowData, setRowData] = useState({});
  const [departures, setDeparture] = useState([]);
  const [returns, setReturn] = useState([]);
  const [avgReturn, setAvgReturn] = useState([]);

  const getStationData = async () => {
    await axios.get(`http://localhost:5001/api/stations`).then((response) => {
      // console.log(response.data)
      setData(response.data);
      // console.log(typeof data);
    });
  };

  const getDepartures = async (id) => {
    // console.log(id)

    try {
      const [response1, response2, response3] = await Promise.all([
        axios.get(`http://localhost:5001/api/stations/departures/?id=${id}`),
        axios.get(`http://localhost:5001/api/stations/returns/?id=${id}`),
        axios.get(`http://localhost:5001/api/stations/returns/avg/?id=${id}`),
      ]);
      // console.log(response1.data);
      // console.log(response2.data);
      // console.log(response3.data);

      setDeparture(response1.data[0].count);
      setReturn(response2.data[0].count);

      setAvgReturn(Math.round(response3.data[0].avg / 100) /10);
    } catch (error) {
      console.error(error);
    }
  };



  useEffect(() => {
    getStationData();
  }, []);

  const handleOpen = (rowData) => {
    getDepartures(rowData.id);
    // console.log(rowData)
    setRowData(rowData);
    // console.log(rowData.Nimi);
    setOpen(true);
  };

  const rows = data.map((row) => ({
    id: row.ID,
    Nimi: row.Nimi,
    Name: row.Name,
    Osoite: row.Osoite,
    x: row.x,
    y: row.y,
  }));

  const columns = [
    {
      field: "Info",
      headerName: "Station Info",
      flex: 2,
      renderCell: (value) => (
        <Button onClick={() => handleOpen(value.row)}>
          <InfoIcon fontSize="small" color={value ? "primary" : "disabled"} />
        </Button>
      ),
    },
    { field: "Name", headerName: "Station Name", flex: 10 },
  ];

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div style={{ height: 700, width: "100%" }}>
      <DataGrid rows={rows} columns={columns} rowHeight={30} />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {rowData.Name}
          </Typography>
          <Typography variant="p" component="p">
            {rowData.Osoite} <br></br> <br></br>
            Total number of journeys starting from the station: {
              departures
            }{" "}
            <br></br>
            Total number of journeys ending at the station: {returns}
            <br></br>
            The average distance of a journey ending at the station: {
              avgReturn
            }{" "}
            km
          </Typography>

          <Typography id="modal-modal-description" sx={{ mt: 2 }}></Typography>
        </Box>
      </Modal>
    </div>
  );
}

export default DataGridForStations;
