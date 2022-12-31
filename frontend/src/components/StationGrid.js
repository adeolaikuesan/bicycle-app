import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import InfoIcon from "@mui/icons-material/Info";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Map from "./Map";

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

  const getStationData = async () => {
    await axios.get("http://localhost:5001/api/stations").then((response) => {
      // console.log(response.data)
      setData(response.data);
      // console.log(typeof data);
    });
  };

  //   const getJourneyData = async (name) => {
  //     await axios.get(`http://localhost:5001/api/journeys/?name=${name}`).then((response) => {
  //         console.log(response.data)
  //         // setData(response.data)
  //         // console.log(typeof data);
  // })
  // }

  useEffect(() => {
    getStationData();
  }, []);

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

  const handleOpen = (rowData) => {
    setRowData(rowData);
    console.log(rowData.Nimi);
    setOpen(true);
  };

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
              rowData.id
            }{" "}
            <br></br>
            Total number of journeys ending at the station:
          </Typography>

          <Typography id="modal-modal-description" sx={{ mt: 2 }}></Typography>
        </Box>
      </Modal>
    </div>
  );
}

export default DataGridForStations;
