import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import ApexCharts from 'react-apexcharts';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';


const ChartsandMaps = () => {
  const [countryData, setCountryData] = useState([]);
  const [selectedCountryData, setSelectedCountryData] = useState(null);

  useEffect(() => {
    axios.get('https://disease.sh/v3/covid-19/countries')
      .then(response => {
        setCountryData(response.data);
      })
      .catch(error => {
        console.error('Error fetching country data:', error);
      });
  }, []);

  const apexOptions = {
    chart: {
      height: 350,
      type: 'line',
      dropShadow: {
        enabled: true,
        color: '#000',
        top: 18,
        left: 7,
        blur: 10,
        opacity: 0.2,
      },
      toolbar: {
        show: false,
      },
    },
    colors: ['#77B6EA', '#545454'],
    dataLabels: {
      enabled: true,
    },
    stroke: {
      curve: 'smooth',
    },
    title: {
      text: 'Average High & Low Temperature',
      align: 'left',
    },
    grid: {
      borderColor: '#e7e7e7',
      row: {
        colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
        opacity: 0.5,
      },
    },
    markers: {
      size: 1,
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
      title: {
        text: 'Month',
      },
    },
    yaxis: {
      title: {
        text: 'Temperature',
      },
      min: 5,
      max: 40,
    },
    legend: {
      position: 'top',
      horizontalAlign: 'right',
      floating: true,
      offsetY: -25,
      offsetX: -5,
    },
  };

  const apexSeries = [
    {
      name: 'High - 2013',
      data: [28, 29, 33, 36, 32, 32, 33],
    },
    {
      name: 'Low - 2013',
      data: [12, 11, 14, 18, 17, 13, 13],
    },
  ];

  const handleMarkerClick = (country) => {
    setSelectedCountryData(country);
  };

  return (
    <div className="max-w-6xl mx-auto bg-white rounded-lg shadow p-6 md:p-8">
      <h2 className="text-xl font-semibold mb-4">COVID-19 Statistics and Maps</h2>

      <div className="flex flex-col md:flex-row space-y-8 md:space-y-0 md:space-x-8">
        {/* Apex Line Chart */}
        <div className="flex-grow md:w-1/2">
          <ApexCharts options={apexOptions} series={apexSeries} type="line" height={350} />
        </div>

        {/* Map */}
        <div className="flex-grow md:w-1/2" style={{ height: '400px' }}>
          <MapContainer center={[0, 0]} zoom={2} style={{ height: '100%', width: '100%' }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {countryData.map(country => (
              <Marker
                key={country.country}
                position={[country.countryInfo.lat, country.countryInfo.long]}
                onClick={() => handleMarkerClick(country)}
              >
                <Popup>
                  Country: {country.country}<br />
                  Active Cases: {country.active}<br />
                  Recovered Cases: {country.recovered}<br />
                  Deaths: {country.deaths}
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>

      {/* Other content... */}
    </div>
  );
};

export default ChartsandMaps;
