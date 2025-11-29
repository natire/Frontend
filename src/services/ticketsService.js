// src/services/ticketsService.js
import apiClient from "./apiClient";

class TicketsService {
  // Obtener todos los tickets (lista para la bandeja)
  async getTickets(filters = {}) {
    try {
      const queryParams = new URLSearchParams(filters).toString();
      const url = queryParams ? `/tickets?${queryParams}` : "/tickets";

      const response = await apiClient.get(url);
      const data = response.data; // array de tickets del backend

      const tickets = data.map((t) => ({
        id: t.ID_Ticket,
        title: t.Titulo,
        sender: t.Cliente?.nombre || "Sin cliente",
        time: new Date(t.Fecha_Creacion).toLocaleString(),
        status: t.Estado_Actual,
        priority: t.Recomendacion?.level || "medium",
        icon: "inbox",
        color: "blue",
        closed: t.Estado_Actual === "Cerrado" || t.Estado_Actual === "Finalizado",
        customer: t.Cliente?.nombre,
        assignedTo: t.Account_Manager?.nombre || "Sin asignar",
        createdAt: t.Fecha_Creacion,
      }));

      console.log("RAW response:", response.data);
      console.log("Mapped tickets:", tickets);

      return tickets;
    } catch (error) {
      console.error("Error fetching tickets:", error);
      throw error;
    }
  }

  // Obtener un ticket específico por ID (detalle)
  async getTicket(id) {
    try {
      const response = await apiClient.get(`/tickets/${id}`);
      const t = response.data;

      const ticket = {
        id: t.ID_Ticket,
        title: t.Titulo,
        status: t.Estado_Actual,
        priority: t.Recomendacion?.level || "medium",
        customer: t.Cliente?.nombre,
        assignedTo: t.Account_Manager?.nombre || "Sin asignar",
        createdAt: t.Fecha_Creacion,
        message: t.Descripcion_Caso,
        riesgoChurnReal: t.Riesgo_Churn_Real,
        recomendacionMensaje: t.Recomendacion?.message,
        activities: (t.Estados_Historial || []).map((h, idx) => ({
          id: idx + 1,
          type: "status_change",
          user: "Sistema",
          timestamp: h.fecha,
          description: `Estado: ${h.estado}`,
        })),
      };

      return ticket;
    } catch (error) {
      console.error("Error fetching ticket:", error);
      throw error;
    }
  }

  // Actualizar el estado de un ticket en el backend (usa tu @router.put)
  async updateTicketStatus(id, estado, comentario = "") {
    try {
      const body = {
        ticket_id: id,   // igual que en Postman
        estado,
        comentario,
      };

      const response = await apiClient.put(`/tickets/${id}`, body);
      return response.data; // { message, ID_Ticket, Nuevo_Estado, Comentario }
    } catch (error) {
      console.error("Error updating ticket status:", error.response?.data || error);
      throw error;
    }
  }
}

export default new TicketsService();
