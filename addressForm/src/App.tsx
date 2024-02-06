import "./App.css";
import AddressForm from "./Components/AddressForm/AddressForm";

import { useJsApiLoader } from "@react-google-maps/api";

function App() {
  let res = useJsApiLoader({
    googleMapsApiKey: "AIzaSyDijSVeCbRPmM7YWiHV2l2NP50aue6ipHM",
    libraries: ["places"],
  });

  if (!res.isLoaded) {
    return null;
  }

  return (
    <div>
      <AddressForm />
    </div>
  );
}

export default App;
