import { useEffect, useState } from "react";
import axios from "axios";

export default function ServicesSection() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const { data } = await axios.get("http://localhost:3000/services");
        setServices(data.data);
        console.log("data from server:", data);
        console.log("type of data:", typeof data);
        console.log("isArray:", Array.isArray(data));

        setError("");
      } catch (err) {
        console.error("Failed to fetch services", err);
        if (err.response && err.response.status === 404) {
          setError("Services not found");
        } else if (err.message === "Network Error") {
          setError("chack server");
        } else {
          setError(
            "An error occurred while loading services. Please try again later"
          );
        }
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  console.log(services);

  return (
    <div className="services-section">
      <h2 className="section-title">השירותים שלנו</h2>

      <div className="cards-container">
        {services.map((service) => (
          <div key={service._id} className="services-card">
            <h3 className="service-title">{service.name}</h3>
            <p className="services-description">{service.description}</p>
            <img
              src={service.img}
              alt={service.name}
              className="services-img"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
