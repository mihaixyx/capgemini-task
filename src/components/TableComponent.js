import { useQuery } from "react-query";
import People from "./People";

const fetchPeople = async () => {
  let finalData = [];
  let res = await fetch("https://swapi.dev/api/people/");
  let data = await res.json();

  finalData = finalData.concat(data.results);

  while (data.next !== null) {
    res = await fetch(data.next);
    data = await res.json();

    finalData = finalData.concat(data.results);
  }

  return finalData;
};

function TableComponent(props) {
  const { isLoading, error, data } = useQuery(["peopleData"], fetchPeople);

  if (isLoading) return "Loading...";

  if (error) return "An error has occured: " + error.message;

  return (
    <div>
      <People checkBox={props.checkBox} people={data} />
    </div>
  );
}

export default TableComponent;
