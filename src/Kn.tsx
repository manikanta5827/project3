import React, { useState, useEffect } from "react";
import "./App.css";

type Customer = {
  id: number;
  name: string;
  title: string;
  address: string;
};

const mockCustomers: Customer[] = Array.from({ length: 1000 }, (_, index) => ({
  id: index + 1,
  name: `Customer ${index + 1}`,
  title: `Title ${index + 1}`,
  address: `Address ${index + 1}`,
}));

function Kn() {
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null
  );
  const [photos, setPhotos] = useState<string[]>([]);
  const [currentGridIndex, setCurrentGridIndex] = useState(0);

  useEffect(() => {
    const fetchAndCompressPhotos = async () => {
      const response = await fetch("https://picsum.photos/v2/list?limit=72");
      const data = await response.json();

      const compressedPhotos = await Promise.all(
        data.map((photo: any) => photo.download_url)
      );

      setPhotos(compressedPhotos);
    };

    fetchAndCompressPhotos();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentGridIndex((prevIndex) => (prevIndex + 9) % photos.length);
    }, 10000);

    return () => clearInterval(interval);
  }, [photos]);

  const displayedPhotos = photos.slice(currentGridIndex, currentGridIndex + 9);

  return (
    <div className="App">
      <div>
        <p style={{ fontSize: "28px", textAlign: "center" }}>Assignment</p>
      </div>
      <div className="content">
        <div className="customerList">
          {mockCustomers.map((customer) => (
            <div
              key={customer.id}
              className={`customerCard ${
                selectedCustomer?.id === customer.id ? "selected" : ""
              }`}
              onClick={() => setSelectedCustomer(customer)}
            >
              <p>{customer.name}</p>
              <p>{customer.title}</p>
            </div>
          ))}
        </div>

        <div className="customerDetails">
          {selectedCustomer && (
            <div>
              <h2>{selectedCustomer.name}</h2>
              <p>{selectedCustomer.title}</p>
              <p>{selectedCustomer.address}</p>
              <div className="photoGrid">
                {displayedPhotos.map((url, index) => (
                  <img
                    key={index}
                    src={url}
                    alt={`Phot0 ${index + 1}`}
                    className="gridPhoto"
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Kn;
