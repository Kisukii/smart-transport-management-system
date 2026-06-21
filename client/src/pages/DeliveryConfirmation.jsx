const DeliveryConfirmation = () => {
  const handleConfirm = () => {
    alert("Delivery Confirmed!");
  };

  return (
    <div>
      <h1>Delivery Confirmation</h1>

      <p>Select a delivery from My Deliveries</p>

      <button onClick={()=>("Delivery Confirmed!")}>
        
        Confirm Delivery
      </button>
    </div>
  );
};

export default DeliveryConfirmation;