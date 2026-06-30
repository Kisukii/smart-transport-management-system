import { useLocation, useNavigate } from "react-router-dom";


const RouteNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  

  const routeData = location.state || {
    orderId: "ORD001",
    pickupLocation: "Kochi",
    dropLocation: "Trivandrum",
    estimatedTime: "45 minutes",
    distance: "210 km",
    status: "In Transit",
  };

  const openGoogleMaps = () => {
    const origin = encodeURIComponent(routeData.pickupLocation);
    const destination = encodeURIComponent(routeData.dropLocation);

    const mapUrl = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}`;
    window.open(mapUrl, "_blank");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">


      <main className="p-8">
        <button
          onClick={() => navigate("/driverdeliveries")}
          className="mb-6 bg-slate-800 hover:bg-indigo-600 px-5 py-3 rounded-xl"
        >
          Back to Deliveries
        </button>

        <h1 className="text-3xl font-bold mb-8">Route Navigation</h1>

        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2 bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl">
            <h2 className="text-2xl font-bold mb-6">
              Order ID: {routeData.orderId}
            </h2>

            <div className="bg-slate-800 rounded-3xl h-96 flex items-center justify-center mb-6">
              <p className="text-slate-400 text-lg">
                Google Maps preview will be connected here
              </p>
            </div>

            <button
              onClick={openGoogleMaps}
              className="bg-indigo-600 hover:bg-indigo-700 px-6 py-3 rounded-xl font-semibold"
            >
              Open Route in Google Maps
            </button>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl">
            <h2 className="text-2xl font-bold mb-6">Route Details</h2>

            <div className="space-y-5">
              <div className="bg-slate-800 rounded-2xl p-5">
                <p className="text-slate-400 text-sm">Pickup Location</p>
                <h3 className="font-semibold mt-1">
                  {routeData.pickupLocation}
                </h3>
              </div>

              <div className="bg-slate-800 rounded-2xl p-5">
                <p className="text-slate-400 text-sm">Drop Location</p>
                <h3 className="font-semibold mt-1">
                  {routeData.dropLocation}
                </h3>
              </div>

              <div className="bg-slate-800 rounded-2xl p-5">
                <p className="text-slate-400 text-sm">Estimated Time</p>
                <h3 className="font-semibold mt-1">
                  {routeData.estimatedTime}
                </h3>
              </div>

              <div className="bg-slate-800 rounded-2xl p-5">
                <p className="text-slate-400 text-sm">Distance</p>
                <h3 className="font-semibold mt-1">{routeData.distance}</h3>
              </div>

              <div className="bg-slate-800 rounded-2xl p-5">
                <p className="text-slate-400 text-sm">Delivery Status</p>
                <h3 className="font-semibold mt-1 text-yellow-400">
                  {routeData.status}
                </h3>
              </div>
            </div>
          </div>
        </div>

        {/* Backend later:
          GET /api/orders/:orderId/route
          Response should contain:
          {
            orderId,
            pickupLocation,
            dropLocation,
            estimatedTime,
            distance,
            status
          }
        */}
      </main>
    </div>
  );
};

export default RouteNavigation;