import { BrowserRouter } from "react-router-dom";
import Provider from "./provider";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <BrowserRouter>
      <Provider>
        <AppRoutes />
      </Provider>
    </BrowserRouter>
  );
}

export default App;
