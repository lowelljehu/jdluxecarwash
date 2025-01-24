import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Car, User, ChevronLeft, Check, Calendar } from 'lucide-react';

export default function BookingSystem() {
  const [view, setView] = useState('login');
  const [showPayment, setShowPayment] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [details, setDetails] = useState({
    carType: '',
    color: '',
    licensePlate: '',
    serviceType: '',
    timeSlot: null,
    date: new Date(),
    customerName: '',
    phone: '',
    email: '',
    apt: ''
  });

  const [providerBookings, setProviderBookings] = useState([
    {
      time: '9:00 AM - 12:00 PM',
      customer: 'John Doe',
      phone: '555-0123',
      email: 'john@email.com',
      apt: '301',
      car: 'Toyota Camry',
      color: 'Pearl White',
      plate: 'ABC123',
      spot: 'B12',
      service: 'Internal & External Wash',
      price: 100,
      status: 'Pending',
      date: new Date().toISOString().split('T')[0]
    }
  ]);

  const services = [
    { id: 'full', name: 'Internal & External Wash', price: 100 },
    { id: 'external', name: 'External Wash Only', price: 70 }
  ];

  const times = [
    '9:00 AM - 12:00 PM',
    '12:00 PM - 3:00 PM',
    '3:00 PM - 6:00 PM'
  ];

  const handlePayment = () => {
    // Create new booking for provider view
    const newBooking = {
      time: times[details.timeSlot],
      customer: details.customerName,
      phone: details.phone,
      email: details.email,
      apt: details.apt,
      car: details.carType,
      color: details.color,
      plate: details.licensePlate,
      spot: 'TBD',
      service: services.find(s => s.id === details.serviceType)?.name,
      price: services.find(s => s.id === details.serviceType)?.price,
      status: 'Pending',
      date: details.date.toISOString().split('T')[0]
    };
    
    setProviderBookings(prev => [...prev, newBooking]);
    setShowPayment(false);
    setShowConfirmation(true);
  };

  if (view === 'login') {
    return (
      <Card className="w-full max-w-xl mx-auto">
        <CardHeader>
          <CardTitle className="text-center text-red-800">JD Apartments Car Wash</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-center mb-6">Select User Type</h2>
            <button onClick={() => setView('customer')} 
              className="w-full p-4 bg-red-800 text-white rounded mb-4 hover:bg-red-900">
              <User className="inline mr-2 h-5 w-5" />Customer
            </button>
            <button onClick={() => setView('provider')} 
              className="w-full p-4 bg-gray-800 text-white rounded hover:bg-gray-900">
              <Car className="inline mr-2 h-5 w-5" />Service Provider
            </button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (view === 'customer') {
    return (
      <Card className="w-full max-w-xl mx-auto">
        <CardHeader>
          <CardTitle className="text-center text-red-800">Book Your Car Wash</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <button onClick={() => setView('login')} className="text-red-800">
              <ChevronLeft className="h-6 w-6" />
            </button>

            <div>
              <label className="block text-sm font-medium mb-1">Select Date</label>
              <input 
                type="date"
                className="w-full p-2 border rounded"
                value={details.date.toISOString().split('T')[0]}
                onChange={(e) => setDetails({...details, date: new Date(e.target.value)})}
                min={new Date().toISOString().split('T')[0]}
              />
            </div>

            <div className="space-y-4 mb-4">
              <label className="block text-sm font-medium mb-1">Customer Details</label>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  value={details.customerName}
                  onChange={(e) => setDetails({...details, customerName: e.target.value})}
                  className="w-full p-2 border rounded"
                  placeholder="Full Name"
                />
                <input
                  type="text"
                  value={details.phone}
                  onChange={(e) => setDetails({...details, phone: e.target.value})}
                  className="w-full p-2 border rounded"
                  placeholder="Phone Number"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="email"
                  value={details.email}
                  onChange={(e) => setDetails({...details, email: e.target.value})}
                  className="w-full p-2 border rounded"
                  placeholder="Email"
                />
                <input
                  type="text"
                  value={details.apt}
                  onChange={(e) => setDetails({...details, apt: e.target.value})}
                  className="w-full p-2 border rounded"
                  placeholder="Apartment Number"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Car Type</label>
                <input
                  type="text"
                  value={details.carType}
                  onChange={(e) => setDetails({...details, carType: e.target.value})}
                  className="w-full p-2 border rounded"
                  placeholder="e.g. Toyota Camry"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Car Color</label>
                <input
                  type="text"
                  value={details.color}
                  onChange={(e) => setDetails({...details, color: e.target.value})}
                  className="w-full p-2 border rounded"
                  placeholder="e.g. Black"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">License Plate</label>
              <input
                type="text"
                value={details.licensePlate}
                onChange={(e) => setDetails({...details, licensePlate: e.target.value})}
                className="w-full p-2 border rounded"
                placeholder="Enter license plate"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium mb-1">Select Service</label>
              {services.map(service => (
                <button
                  key={service.id}
                  onClick={() => setDetails({...details, serviceType: service.id})}
                  className={`w-full p-4 border rounded text-left ${
                    details.serviceType === service.id ? 'border-red-800 bg-red-50' : ''
                  }`}
                >
                  <div className="flex justify-between">
                    <span>{service.name}</span>
                    <span>${service.price}</span>
                  </div>
                </button>
              ))}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium mb-1">Select Time</label>
              {times.map((time, index) => (
                <button
                  key={index}
                  onClick={() => setDetails({...details, timeSlot: index})}
                  className={`w-full p-3 rounded ${
                    details.timeSlot === index ? 'bg-red-800 text-white' : 'bg-gray-100'
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>

            <button
              onClick={() => setShowPayment(true)}
              disabled={!details.carType || !details.color || !details.licensePlate || 
                        !details.serviceType || details.timeSlot === null || 
                        !details.customerName || !details.phone || !details.email || !details.apt}
              className="w-full p-3 bg-red-800 text-white rounded hover:bg-red-900 disabled:bg-gray-300"
            >
              Proceed to Payment
            </button>

            {showPayment && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md mx-4">
                  <h3 className="text-xl font-bold mb-4">Payment Details</h3>
                  <div className="space-y-4">
                    <input
                      type="text"
                      className="w-full p-2 border rounded"
                      placeholder="Card Number"
                      maxLength="16"
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        className="w-full p-2 border rounded"
                        placeholder="MM/YY"
                        maxLength="5"
                      />
                      <input
                        type="password"
                        className="w-full p-2 border rounded"
                        placeholder="CVV"
                        maxLength="3"
                      />
                    </div>
                    <div className="bg-gray-50 p-4 rounded">
                      <p className="font-medium">
                        Total: ${services.find(s => s.id === details.serviceType)?.price}
                      </p>
                    </div>
                    <button
                      onClick={handlePayment}
                      className="w-full p-3 bg-red-800 text-white rounded hover:bg-red-900"
                    >
                      Pay Now
                    </button>
                    <button
                      onClick={() => setShowPayment(false)}
                      className="w-full p-3 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}

            {showConfirmation && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
                  <Check className="h-16 w-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-4 text-center">Booking Confirmed!</h3>
                  <div className="bg-gray-50 p-4 rounded space-y-2">
                    <p>Car: {details.carType}</p>
                    <p>Color: {details.color}</p>
                    <p>Plate: {details.licensePlate}</p>
                    <p>Service: {services.find(s => s.id === details.serviceType)?.name}</p>
                    <p>Time: {times[details.timeSlot]}</p>
                    <p>Price: ${services.find(s => s.id === details.serviceType)?.price}</p>
                  </div>
                  <button
                    onClick={() => {
                      setShowConfirmation(false);
                      setView('login');
                    }}
                    className="w-full p-3 bg-red-800 text-white rounded hover:bg-red-900 mt-4"
                  >
                    Done
                  </button>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (view === 'provider') {
    return (
      <Card className="w-full max-w-xl mx-auto">
        <CardHeader>
          <CardTitle className="text-center text-red-800">Today's Bookings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <button onClick={() => setView('login')} className="text-red-800">
              <ChevronLeft className="h-6 w-6" />
            </button>

            <div className="space-y-4">
                              {providerBookings.map((booking, i) => (
                <div key={i} className="p-4 border rounded space-y-3">
                  <div className="flex justify-between">
                    <div>
                      <p className="font-bold">{booking.time}</p>
                      <p>{booking.service} - ${booking.price}</p>
                      <p className="text-sm">{booking.customer}</p>
                      <p className="text-sm">Phone: {booking.phone}</p>
                      <p className="text-sm">Email: {booking.email}</p>
                      <p className="text-sm">Apt: {booking.apt}</p>
                    </div>
                    <button className="px-4 py-2 bg-green-600 text-white rounded">
                      Complete
                    </button>
                  </div>
                  <div className="border-t pt-2">
                    <p>{booking.car}</p>
                    <p className="text-sm">Color: {booking.color}</p>
                    <p className="text-sm">Plate: {booking.plate}</p>
                    <p className="text-sm">Spot: {booking.spot}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }
}