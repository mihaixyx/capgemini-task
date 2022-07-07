import { QueryClient, QueryClientProvider } from "react-query";
import TableComponent from "./TableComponent";
const queryClient = new QueryClient();

function TablePage(props) {
  return (
    <QueryClientProvider client={queryClient}>
      <TableComponent checkBox={props.checkBox} />
    </QueryClientProvider>
  );
}

export default TablePage;
