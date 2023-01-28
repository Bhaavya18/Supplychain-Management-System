export const businessColumns = [
  { field: "_id", headerName: "ID", width: 70 },
  {
    field: "name",
    headerName: "Business Name",
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.img || "https://i.ibb.co/MBtjqXQ/no-avatar.gif"} alt="avatar" />
          {params.row.name}
        </div>
      );
    },
  },

  {
    field: "country",
    headerName: "Country",
    width: 100,
  },
  {
    field: "status",
    headerName: "Status",
    width: 150,
  }
];

export const orderColumns = [
  { field: "_id", headerName: "ID", width: 70 },
  {
    field: "to",
    headerName: "To Country",
    width: 100,
  },
  {
    field: "from",
    headerName: "From Country",
    width: 100,
  },
  {
    field: "price",
    headerName: "price",
    width: 100,
  },
  {
    field: "qty",
    headerName: "Quantity",
    width: 100,
  },
  {
    field: "commodityName",
    headerName: "Commodity Name",
    width: 150,
  },
  {
    field: "volume",
    headerName: "Volume",
    width: 150,
  },
  {
    field: "status",
    headerName: "Status",
    width: 150,
  },
];