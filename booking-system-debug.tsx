'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Car, User, ChevronLeft, Check } from 'lucide-react';

export default function BookingSystem() {
  console.log('BookingSystem component rendering');

  useEffect(() => {
    console.log('BookingSystem mounted');
  }, []);

  const [view, setView] = useState('login');

  return (
    <Card className="w-full max-w-xl mx-auto">
      <CardHeader>
        <CardTitle className="text-center text-red-800">
          JD Apartments Car Wash Debug
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <h2 className="text-xl text-center">Debugging Render</h2>
          <p>Current View: {view}</p>
          <button 
            onClick={() => setView('customer')}
            className="w-full p-4 bg-red-800 text-white rounded"
          >
            Click to Change View
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
