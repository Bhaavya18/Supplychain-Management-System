import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns, userRows } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { useLocation } from "react-router-dom";
import axios from "axios";
const Datatable = ({columns}) => {
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  const [list,setList] = useState([]);
  const {data, loading, error}= useFetch(`/${path}`);

  useEffect(() => {
    setList(data)
  }, [data]);


  const handleDelete = async (id) => {
    try{
      await axios.delete(`/${path}/${id}`);
      setList(list.filter((item) => item._id !== id));
    }catch(err){

    }
    
  };

  const handleAccept = async (id) => {
    try{
      await axios.put(`/${path}/${id}`, {
        status: "Accepted"
      })
    }catch(err){
    }
    
  };

  const handleReject = async (id) => {
    try{
      await axios.put(`/${path}/${id}`, {
        status: "Rejected"
      })
    }catch(err){
    }
    
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            {/* <Link to="/users/test" style={{ textDecoration: "none" }}>
              <div onClick={()}className="viewButton">Accept</div>
            </Link> */}
            <div
              className="viewButton"
              onClick={() => handleAccept(params.row._id)}
            >
              Accept
              </div>
            {/* <div
              className="deleteButton"
              onClick={() => handleDelete(params.row._id)}
            >
              Reject
            </div> */}
            <div
              className="deleteButton"
              onClick={() => handleReject(params.row._id)}
            >
              Reject
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        {path}
        <Link to={`/${path}/new`} className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={list}
        columns={columns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
        getRowId={row=>row._id}
      />
    </div>
  );
};

export default Datatable;
