import { useEffect, useState } from "react";
import { api } from "../../../utils/api";
import { Link } from 'react-router-dom';

export default function ServicesSection() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const { data } = await api.get("services");
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

      {loading && <p>טוען שירותים...</p>}
      {error && <p className="error-message">{error}</p>}

      <div className="cards-container">
        {services.map((service) => (
          <Link to="/contact" key={service._id}  className="service-card-link"> 
            <div className="services-card">
              <h3 className="service-title">{service.name}</h3>
              <p className="services-description">{service.description}</p>
              <img
                src={service.img}
                alt={service.name}
                className="services-img"
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}