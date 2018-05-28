import React from "react";
import { render } from "react-dom";
import Device from "./device";
import DeviceModel from "./deviceModel";

const style = {
  svg: {
    backgroundColor: "lightyellow"
  }
};

const devicesRaw = [
  {
    id: "UROIDFW",
    x: 0,
    y: 0,
    angle: 0,
    model: "Wi002"
  },
  {
    id: "FEHRYSW",
    x: 200,
    y: 200,
    angle: 0,
    model: "Wi001"
  }
];

class App extends React.Component {
  state = {
    devices: devicesRaw.map(d => new DeviceModel(d))
  };
  onDrag = e => {
    let nowDev;
    const devices = this.state.devices.map(d => {
      if (d.id === e.id) {
        nowDev = d;
      }
      return d;
    });
    const nearDevices = devices
      .filter(d => d.id !== nowDev.id)
      .filter(d => nowDev.nearLeft(d));
    if (nearDevices.length) {
      nowDev.lockX = nearDevices[0].x;
    } else {
      nowDev.lockX = 0;
    }
    nowDev.move({
      deltaX: e.deltaX,
      deltaY: e.deltaY
    });
    this.setState({ devices });
  };
  onDragStop = id => {
    // this.
  };
  render() {
    const { devices } = this.state;
    return (
      <div>
        <svg width="800" height="800" style={style.svg}>
          {devices.map(d => (
            <Device
              key={d.id}
              data={d}
              onDrag={this.onDrag}
              onDragStop={this.onDragStop}
            />
          ))}
        </svg>
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));