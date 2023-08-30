<div className="mb-8" style={{ height: '400px' }}>
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
