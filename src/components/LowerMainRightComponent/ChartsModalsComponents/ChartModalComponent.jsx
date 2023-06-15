import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import openChart from "../../../assets/img/open-in-new-window.svg";
import { TemperatureChart } from "../ChartsComponents/TemperatureChart";
import { WindChart } from "../ChartsComponents/WindChart";
import { HumidityChart } from "../ChartsComponents/HumidityChart";

export const ChartModalComponent = ({ data, type }) => {
  const [showChart, setShowChart] = useState(false);

  return (
    <>
      <Button
        className="open-chart-btn d-flex align-items-center p-1  me-md-3 shadow-none"
        onClick={() => {
          setShowChart(true);
        }}
      >
        <img src={openChart} alt="open in other tab icon" />
      </Button>

      <Modal
        size="lg"
        centered={true}
        show={showChart}
        onHide={() => setShowChart(false)}
        aria-labelledby="contained-modal-title-vcenter"
        className="chart-modal pr-0"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {type === "temp"
              ? "Temperature "
              : type === "wind"
              ? "Wind "
              : "Humidity "}
            Chart
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            In this chart it's possible to observe the predicted development of
            the{" "}
            {type === "temp"
              ? "temperatures levels "
              : type === "wind"
              ? "wind strenght "
              : "humidity levels "}{" "}
            during the course of the next 5 days.
          </p>
          {data &&
            (type === "temp" ? (
              <TemperatureChart chartData={data} />
            ) : type === "wind" ? (
              <WindChart chartData={data} />
            ) : (
              <HumidityChart chartData={data} />
            ))}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowChart(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
