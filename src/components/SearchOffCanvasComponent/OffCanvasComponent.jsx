import "./OffCanvas.scss";
import { useState } from "react";
import { Button, Container, FormControl, InputGroup } from "react-bootstrap";
import Offcanvas from "react-bootstrap/Offcanvas";
import { BsSearch } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { setCoordinates } from "../../redux/actions";

export const OffCanvasComponent = () => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [inputSearch, setInputSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const showCanvas = () => {
    setShow(true);
  };

  const hideCanvas = () => {
    setShow(false);
  };

  const displayOptions = async (inputString) => {
    try {
      const response = await fetch(
        `http://api.openweathermap.org/geo/1.0/direct?q=${inputString}&limit=5&appid=a07c515bd5eb284d7c76a2d03970002b`
      );
      if (response.ok) {
        const data = await response.json();
        setSearchResults(data);
      } else {
        alert("errore nella response della fetch", response);
      }
    } catch (error) {
      alert("errore fatale", error);
    }
  };

  const fetchLocation = async (location) => {
    try {
      const response = await fetch(
        `http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=6&appid=a07c515bd5eb284d7c76a2d03970002b`
      );
      if (response.ok) {
        const data = await response.json();
        const coordinates = {
          lat: data[0].lat,
          lon: data[0].lon,
        };
        dispatch(setCoordinates(coordinates));
      } else {
        alert("errore nella response della fetch", response);
      }
    } catch (error) {
      alert("errore fatale", error);
    } finally {
      setInputSearch("");
      setSearchResults([]);
    }
  };

  return (
    <>
      <Button
        variant="secondary"
        className="d-flex align-items-center p-0 offcanvas-button"
        onClick={() => showCanvas()}
      >
        <BsSearch className="mx-3 mx-md-1 mx-lg-2 search-icon" />
        <FormControl type="text" placeholder="Digit your city" />
      </Button>
      <Offcanvas
        show={show}
        onHide={() => {
          hideCanvas();
          setSearchResults([]);
        }}
        placement="top"
        bsPrefix="offcanvas"
        className="d-flex flex-row justify-content-center canvas-locations"
      >
        <Container>
          <Offcanvas.Header closeButton>
            <div className="offcanvas-title-container">
              <h1 className="offcanvas-title">
                Location research
                <span>OFFERED BY MY WEATHER APP</span>
              </h1>
            </div>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <p className="mb-3 offcanvas-info">
              Digit the location in the input below and pick one of the given
              results to see the weather predictions for the next week.
            </p>
            <div className="d-flex">
              <InputGroup className="inputContainer">
                <InputGroup.Text id="basic-addon1" className="searchIcon">
                  <BsSearch className="inputIcon" />
                </InputGroup.Text>
                <FormControl
                  placeholder="Search for places..."
                  aria-label="Search for places..."
                  aria-describedby="basic-addon1"
                  className="inputSearch p-1"
                  value={inputSearch}
                  autoFocus
                  onKeyDown={() => {
                    inputSearch !== "" && displayOptions(inputSearch);
                  }}
                  onChange={(e) => setInputSearch(e.target.value)}
                />
              </InputGroup>
            </div>
            <div>
              <h5
                className={`location-results-title ${
                  searchResults.length > 0 && "on-results"
                }`}
              >
                Results:
              </h5>
              <ul className="location-results-list">
                {searchResults.length > 0 &&
                  searchResults.map((el, index) => (
                    <li
                      className="d-flex aling-items-center location-result position-relative"
                      key={index + " - " + el.name}
                      onClick={() => {
                        fetchLocation(el.name);
                        hideCanvas();
                      }}
                    >
                      <span className="position-absolute location-country rounded d-flex align-items-center justify-content-center">
                        {el.country}
                      </span>
                      <p className="location-data w-100 d-flex align-items-center justify-content-between">
                        <span className="location-name">{el.name}</span>

                        <span className="location-state">{el.state}</span>
                      </p>
                    </li>
                  ))}
              </ul>
            </div>
          </Offcanvas.Body>
        </Container>
      </Offcanvas>
    </>
  );
};
