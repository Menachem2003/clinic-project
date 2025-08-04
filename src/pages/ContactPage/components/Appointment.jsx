import React, { useState } from "react";
import { api } from "../../../utils/api";

function Appointment() {
    const [message, setMessage] = useState();
    const [isError, setIsError] = useState(false);
    const [AppointmentForm, setAppointment] = useState({
        name: "",
        phone: "",
        date: "",
    })
}