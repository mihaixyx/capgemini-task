import Table from "antd/lib/table";
import Input from "antd/lib/input";
import { useState } from "react";

function People(props) {
  const [dataSource, setDataSource] = useState(props.people);
  const [value, setValue] = useState("");
  console.log(props.checkBox);

  const FilterByNameInput = (
    <Input
      placeholder="Search Name"
      value={value}
      disabled={props.checkBox}
      onChange={(e) => {
        const currValue = e.target.value;
        setValue(currValue);
        const filteredData = props.people.filter((entry) =>
          entry.name.includes(currValue)
        );
        setDataSource(filteredData);
      }}
    />
  );

  const columns = [
    {
      key: "name",
      title: FilterByNameInput,
      dataIndex: "name",
    },
    {
      key: "gender",
      title: "Gender",
      dataIndex: "gender",
    },
    {
      key: "birthyear",
      title: "Birth Year",
      dataIndex: "birth_year",
    },
  ];

  return (
    <Table
      rowKey={"name"}
      dataSource={dataSource}
      columns={columns}
      pagination={{ pageSize: 20 }}
    />
  );
}

export default People;
