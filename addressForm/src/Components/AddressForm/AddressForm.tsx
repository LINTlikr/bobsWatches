import React, { useState } from "react";
import "./AddressForm.css";
import location_icon from "../Assets/location-icon.png";
import { Autocomplete } from "@react-google-maps/api";
import axios from "axios";

let savedAddress = "";

axios.get("http://localhost:8080").then((data: any) => {
  if (
    data.data !== undefined &&
    data.data[0] !== undefined &&
    data.data[0].address !== undefined
  ) {
    savedAddress = data.data[0].address;
  }
});

export const AddressForm = () => {
  const [address, setAddress] = useState(savedAddress);
  const [searchResult, setSearchResult] = useState<any>("");

  const handleSave = () => {
    axios
      .post("http://localhost:8080/save", { address: address })
      .then((data: any) => {
        alert(data.data);
      });
  };

  const addressChange = (event: any) => {
    setAddress(event.target.value);
  };

  const clearClicked = (event: any) => {
    setAddress("");
  };

  function onPlaceChanged() {
    if (searchResult != null) {
      const place = searchResult.getPlace();
      setAddress(place.formatted_address);
    } else {
      alert("Please enter text");
    }
  }

  function onLoad(autocomplete: any) {
    setSearchResult(autocomplete);
  }

  return (
    <div className="container">
      <div className="header">
        <div className="text">Address Form</div>
        <div className="underline"></div>
      </div>
      <div className="inputs">
        <div className="input">
          <img src={location_icon} alt="" />
          <Autocomplete onPlaceChanged={onPlaceChanged} onLoad={onLoad}>
            <input
              type="text"
              placeholder="Enter Address..."
              value={address}
              onChange={addressChange}
            />
          </Autocomplete>
        </div>
      </div>
      <div className="submit-container">
        <div className="submit" onClick={clearClicked}>
          Clear
        </div>
        <div
          className={address === "" ? "submit disabled" : "submit"}
          onClick={
            address === ""
              ? () => {
                  return null;
                }
              : handleSave
          }
        >
          Save
        </div>
      </div>
    </div>
  );
};

export default AddressForm;
