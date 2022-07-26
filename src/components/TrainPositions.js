import React from 'react';
import { useEffect, useState } from 'react';

import { BlueLine, SilverLine, GreenLine, OrangeLine, RedLine, YellowLine, Special, NoPassengers, Passengers, Small, Medium, Large, NoCar } from '../images/index.js';

const TrainPositions = () => {

  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");

  const noData = '--';

  const getData = () => {
    fetch("https://api.wmata.com/TrainPositions/TrainPositions?contentType=json",
      {
        headers: {
          api_key: process.env.REACT_APP_API_KEY,
        }
      }
    ).then((response) => {
      return response.json();
    }).then((response) => {
      setData(response.TrainPositions)
    });
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (data.length !== 0) {
      setIsLoading(false);
    }
  }, [data]);

  return (
    <div>
      {isLoading ? (<p>Loading...</p>) : (
        <div>
          <div className="search-input">
            <input
              type="text"
              className="search"
              placeholder="Search..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <table className="table">
            <thead>
              <tr>
                <th>Train</th>
                <th>Car</th>
                <th>Service Type</th>
                <th>Rail Line</th>
              </tr>
            </thead>
            {data.filter((e) => {
              if (
                (query === "")
                || (e.LineCode != null && e.LineCode.toLowerCase().includes(query.toLowerCase()))
                || (e.ServiceType.toLowerCase().includes(query.toLowerCase()))
                || (e.TrainId.includes(query.toLowerCase()))
                || (e.CarCount.toString().includes(query.toLowerCase()))
              ) {
                return e;
              } 
            }).map((e, i) => (
              <tbody key={i}>
                <tr>
                  <td>{e.TrainId}</td>
                  <td className="car-count">
                    {(() => {
                      switch (true) {
                        case e.CarCount === 0: return <span>0<img src={NoCar} alt="No Car"></img></span>
                        case e.CarCount > 0 && e.CarCount <= 3: return <span>{e.CarCount}<img src={Small} alt="Small"></img></span>
                        case e.CarCount > 3 && e.CarCount <= 6: return <span>{e.CarCount}<img src={Medium} alt="Medium"></img></span>
                        case e.CarCount > 6: return <span>{e.CarCount}<img src={Large} alt="Large"></img></span>
                        default: return <span>{noData}<img src={Large} alt="No Car"></img></span>
                      }
                    })()}
                  </td>
                  <td className="service-type">
                    {(() => {
                      switch (e.ServiceType) {
                        case 'Normal': return <span>Normal <img src={Passengers} alt="Normal"></img></span>
                        case 'Special': return <span>Special <img src={Special} alt="Special"></img></span>
                        case 'NoPassengers': return <span>NoPassengers <img src={NoPassengers} alt="No Passengers"></img></span>
                        case 'Unknown':
                        default: return <span>{noData}</span>
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
                        default: return <span>{noData}</span>
                      }
                    })()}
                  </td>
                </tr>
              </tbody>
            ))
            }
          </table>
        </div>
      )}
    </div>
  );
};


export default TrainPositions;


