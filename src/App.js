import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import store from "./store";
import router from "./router";

function App() {
  return (
    <div className="flex h-full">
      <Provider store={store}>
        <div className="flex-1 max-h-full overflow-hidden overflow-y-hidden">
          <RouterProvider router={router} />
        </div>
      </Provider>
    </div>
  );
}

export default App;
