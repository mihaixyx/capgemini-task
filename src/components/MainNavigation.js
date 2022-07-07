import { Menu } from "antd";
import { Link } from "react-router-dom";
import { Checkbox } from "antd";
import React from "react";
import { FormOutlined, TableOutlined } from "@ant-design/icons";
import { useContext } from "react";
import { ReadOnlyContext } from "../context/ReadOnlyContext";

function MainNavigation() {
  const { setCheckboxReadOnly } = useContext(ReadOnlyContext);

  const items = [
    { label: <Link to="/">Form</Link>, key: "item-1", icon: <FormOutlined /> },
    {
      label: <Link to="/table">Table</Link>,
      key: "item-2",
      icon: <TableOutlined />,
    },
    {
      label: (
        <Checkbox
          onChange={(e) => {
            setCheckboxReadOnly(e.target.checked);
          }}
        >
          Read Only
        </Checkbox>
      ),
      key: "item-3",
    },
  ];
  return <Menu mode="horizontal" items={items} />;
}

export default MainNavigation;
