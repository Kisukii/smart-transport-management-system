const RouteNavigation = () => {
  return (
    <div>
      <h1>Route Navigation</h1>

      <p>Destination: Marine Drive</p>
      <p>Distance: 5 km</p>
      <p>ETA: 15 mins</p>

      <button onClick={() => alert("Navigation Started!")}>
        Start Navigation
      </button>

      {/* <h3>Steps</h3>
      <ul>
        <li>Start from current location</li>
        <li>Go straight</li>
        <li>Turn right</li>
        <li>Arrive at destination</li>
      </ul> */}
    </div>
  );
};

export default RouteNavigation;