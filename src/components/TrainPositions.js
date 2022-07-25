import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';

import { BlueLine, SilverLine, GreenLine, OrangeLine, RedLine, YellowLine} from '../images/index.js';
import { Special, NoPassengers, Passengers } from '../images/index.js';
// import tooltipIcon from '../../src/images/tooltip.png';


const TrainPositions = () => {

  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");

  const getData = () => {
    // axios.get('https://api.wmata.com/StationPrediction.svc/json/GetPrediction/All'
    axios.get('https://api.wmata.com/TrainPositions/TrainPositions?contentType={contentType}'
      , {
        headers: {
          'api_key': process.env.REACT_APP_API_KEY,
          'Content-Type': 'application/json',
        }
      }
    )
      .then(res => {
        setData(res.data.TrainPositions)
      })
  }

  useEffect(() => {
    getData();
  }, [data])

  return (
    <div>
      <input
        type="text"
        className="search"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <table className="table">
        <tbody>
          <th>Train</th>
          <th>Car</th>
          <th>Service Type</th>
          <th>Rail Line</th>
        </tbody>
        {data.filter((e) => {
          //  {(() => {
          //   switch (query) {
          //     case "" : return e;
          //     default: return e
          //   }
          // })()}
          if (query === "") {
            return e;
          } else if (e.LineCode != null && e.LineCode.toLowerCase().includes(query.toLowerCase())) {
            return e;
          } else if (e.ServiceType.toLowerCase().includes(query.toLowerCase())) {
            return e;
          } else if (e.TrainId.includes(query.toLowerCase())) {
            return e;
          } else if (e.CarCount.toString().includes(query.toLowerCase())) {
            return e;
          }else {
            return;
          }
        }).map((e, i) => (
          <tbody key={i}>
            <tr>
              <td>{e.TrainId}</td>
              <td>
                {(() => {
                  switch (true) {
                    case e.CarCount === 0: return <span>--</span>
                    case e.CarCount > 0 && e.CarCount <= 3: return <span>Small size: {e.CarCount}</span>
                    case e.CarCount > 3 && e.CarCount <= 6: return <span>Med size: {e.CarCount}</span>
                    case e.CarCount > 6: return <span>Lg size: {e.CarCount}</span>
                    default: return <span>N/A</span>
                  }
                })()}
              </td>
              <td className="service-type">
                {(() => {
                  switch (e.ServiceType) {
                    case 'Unknown': return <span>--</span>
                    case 'Normal': return <span>Normal <img src={Passengers} alt="Normal"></img></span>
                    case 'Special': return <span>Special <img src={Special} alt="Special"></img></span>
                    case 'NoPassengers': return <span>NoPassengers <img src={NoPassengers} alt="No Passengers"></img></span>
                    default: return <span>--</span>
                  }
                })()}
              </td>
              <td className="line-code">
                {(() => {
                  switch (e.LineCode) {
                    case 'BL': return <img src={BlueLine} alt="Blue Line"></img>
                    case 'SV': return <img src={SilverLine} alt="Silver Line"></img>
                    case 'GR': return <img src={GreenLine} alt="Green Line"></img>
                    case 'YL': return <img src={YellowLine} alt="Yellow Line"></img>
                    case 'OR': return <img src={OrangeLine} alt="Orange Line"></img>
                    case 'RD': return <img src={RedLine} alt="Red Line"></img>
                    default: return <span>--</span>
                  }
                })()}
              </td>
            </tr>
          </tbody>
        ))
        }
      </table>
    </div>
  )
}


export default TrainPositions;


