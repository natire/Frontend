// src/pages/TicketDetailPage.jsx
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ticketsService from "../services/ticketsService";

function TicketDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const [showResponseModal, setShowResponseModal] = useState(false);
  const [response, setResponse] = useState("");
  const [showHistorial, setShowHistorial] = useState(false);
  const [sendingResponse, setSendingResponse] = useState(false);
  const [notification, setNotification] = useState(null); // { type, message }

  const statusOptions = ["Nuevo", "Abierto", "Espera", "Finalizado"];

  const templates = [
    {
      id: 1,
      name: "Ajuste de Facturación",
      text: "Hemos revisado su cuenta y realizaremos el ajuste de facturación correspondiente. Gracias por reportar este problema.",
    },
    {
      id: 2,
      name: "Consulta de Plan",
      text: "Gracias por su consulta sobre nuestros planes. Le proporcionar toda la información necesaria.",
    },
    {
      id: 3,
      name: "Agradecimiento",
      text: "Agradecemos su confianza y su paciencia. Estamos aquí para ayudarle.",
    },
  ];

  const statusColors = {
    Nuevo:
      "bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-900",
    Abierto:
      "bg-blue-500/20 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-900",
    Espera:
      "bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-900",
    Finalizado:
      "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900",
  };

  const statusBadgeColors = {
    Nuevo: "bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300",
    Abierto: "bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300",
    Espera: "bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300",
    Finalizado:
      "bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300",
  };

  const statusButtonColors = {
    Nuevo: "bg-indigo-50 dark:bg-indigo-950 hover:bg-indigo-100 dark:hover:bg-indigo-900",
    Abierto: "bg-blue-50 dark:bg-blue-950 hover:bg-blue-100 dark:hover:bg-blue-900",
    Espera: "bg-amber-50 dark:bg-amber-950 hover:bg-amber-100 dark:hover:bg-amber-900",
    Finalizado:
      "bg-emerald-50 dark:bg-emerald-950 hover:bg-emerald-100 dark:hover:bg-emerald-900",
  };

  useEffect(() => {
    loadTicket();
  }, [id]);

  const loadTicket = async () => {
    setLoading(true);
    try {
      const data = await ticketsService.getTicket(id);
      setTicket(data);
      setSelectedStatus(data.status);
    } catch (error) {
      console.error("Error loading ticket:", error);
      setNotification({
        type: "error",
        message: "No se pudo cargar el ticket. Intenta de nuevo.",
      });
    } finally {
      setLoading(false);
    }
  };

  // Solo cambiar el estado seleccionado en UI
  const handleStatusChange = (newStatus) => {
    setSelectedStatus(newStatus);
  };

  const handleTemplateClick = (template) => {
    setResponse(template.text);
  };

  // Enviar estado + comentario al backend (PUT /tickets/{id})
  const handleSendResponse = async () => {
    if (!response.trim()) {
      setNotification({
        type: "error",
        message: "Por favor escribe una respuesta antes de enviar.",
      });
      return;
    }

    setSendingResponse(true);
    setUpdatingStatus(true);
    try {
      const apiResponse = await ticketsService.updateTicketStatus(
        id,
        selectedStatus,
        response
      );
      console.log("✅ Estado actualizado:", apiResponse);

      const newActivity = {
        id: Date.now(),
        type: "comment",
        user: "Usuario Actual",
        timestamp: new Date().toISOString(),
        description: response,
      };

      setTicket((prev) => ({
        ...prev,
        status: selectedStatus,
        activities: [...(prev.activities || []), newActivity],
      }));

      setNotification({
        type: "success",
        message: "Estado actualizado y respuesta enviada correctamente.",
      });

      setResponse("");
      setShowResponseModal(false);
      setShowHistorial(true);
    } catch (error) {
      console.error("Error actualizando estado / enviando respuesta:", error);
      setNotification({
        type: "error",
        message: "Error al actualizar el estado. Intenta de nuevo.",
      });
    } finally {
      setSendingResponse(false);
      setUpdatingStatus(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-200 dark:border-blue-900 border-t-blue-600 dark:border-t-blue-400 mx-auto"></div>
          <p className="mt-4 text-slate-600 dark:text-slate-400 font-medium">
            Cargando ticket...
          </p>
        </div>
      </div>
    );
  }

  if (!ticket) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
        <div className="text-center">
          <p className="text-red-600 dark:text-red-400 mb-4 font-semibold">
            Ticket no encontrado
          </p>
          <button
            onClick={() => navigate("/tickets")}
            className="px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-500 dark:to-blue-600 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-md hover:shadow-lg"
          >
            Volver a Bandeja
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-10 flex items-center bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-4 pb-3 justify-between border-b border-slate-200 dark:border-slate-700 shadow-sm">
        <button
          onClick={() => navigate("/tickets")}
          className="flex size-10 shrink-0 items-center justify-center text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-all duration-200 hover:shadow-md"
        >
          <span className="material-symbols-outlined text-2xl">arrow_back</span>
        </button>
        <h1 className="text-slate-900 dark:text-white text-lg font-bold leading-tight flex-1 text-center">
          Detalles del Ticket
        </h1>
        <div className="w-10"></div>
      </header>

      {/* Notification banner */}
      {notification && (
        <div className="mx-4 mt-3">
          <div
            className={`flex items-center justify-between px-4 py-3 rounded-xl shadow-md border text-sm ${
              notification.type === "success"
                ? "bg-emerald-50 border-emerald-200 text-emerald-800 dark:bg-emerald-900/30 dark:border-emerald-700 dark:text-emerald-200"
                : "bg-red-50 border-red-200 text-red-800 dark:bg-red-900/30 dark:border-red-700 dark:text-red-200"
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-base">
                {notification.type === "success" ? "check_circle" : "error"}
              </span>
              <p className="font-medium">{notification.message}</p>
            </div>
            <button
              onClick={() => setNotification(null)}
              className="ml-3 rounded-full p-1 hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
            >
              <span className="material-symbols-outlined text-sm">close</span>
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-grow pb-24">
        <div className="p-4">
          <div className="flex flex-col items-stretch justify-start gap-4">
            {/* Status and Title */}
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <span
                  className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold ${
                    statusBadgeColors[selectedStatus] || statusBadgeColors["Nuevo"]
                  }`}
                >
                  {selectedStatus}
                </span>
              </div>
              <h2 className="text-slate-900 dark:text-white text-2xl font-bold leading-tight">
                {ticket.title}
              </h2>
            </div>

            {/* Customer Info */}
            <div className="flex items-center gap-3 p-4 bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 hover:shadow-md transition-all duration-200">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-400 to-blue-600 text-white font-bold text-sm shadow-md">
                {ticket.customer?.substring(0, 2).toUpperCase()}
              </div>
              <div className="flex flex-col">
                <p className="text-base font-semibold text-slate-900 dark:text-white">
                  {ticket.customer}
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {ticket.assignedTo}
                </p>
              </div>
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-2 gap-3 bg-white dark:bg-slate-900 rounded-xl shadow-sm p-4 border border-slate-100 dark:border-slate-800">
              <div className="p-3 bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-950/40 dark:to-indigo-900/40 rounded-lg border border-indigo-200 dark:border-indigo-800">
                <p className="text-slate-600 dark:text-slate-400 text-xs font-medium">
                  Fecha de creación
                </p>
                <p className="font-bold text-slate-900 dark:text-white mt-1">
                  {new Date(ticket.createdAt).toLocaleDateString("es-ES", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </div>
              <div className="p-3 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/40 dark:to-purple-900/40 rounded-lg border border-purple-200 dark:border-purple-800">
                <p className="text-slate-600 dark:text-slate-400 text-xs font-medium">
                  Prioridad
                </p>
                <p className="font-bold text-slate-900 dark:text-white mt-1 capitalize">
                  {ticket.priority}
                </p>
              </div>
              <div className="p-3 bg-gradient-to-br from-pink-50 to-pink-100 dark:from-pink-950/40 dark:to-pink-900/40 rounded-lg border border-pink-200 dark:border-pink-800 col-span-2">
                <p className="text-slate-600 dark:text-slate-400 text-xs font-medium">
                  Asignado a
                </p>
                <p className="font-bold text-slate-900 dark:text-white mt-1">
                  {ticket.assignedTo}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Message */}
        <div className="px-4 pt-2">
          <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm p-4 border border-slate-100 dark:border-slate-800">
            <p className="text-slate-600 dark:text-slate-400 text-xs font-bold mb-2">
              Descripción del caso
            </p>
            <p className="text-slate-900 text-bold dark:text-white text-base font-normal leading-relaxed">
              {ticket.message}
            </p>
          </div>
        </div>

        {/* AI Recommendations */}
        <div className="px-4 pt-6">
          <div className="rounded-xl border-2 border-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-gradient-to-br from-blue-50 dark:from-blue-950/30 to-cyan-50 dark:to-cyan-950/30 p-4 shadow-md hover:shadow-lg transition-all duration-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-md">
                <span
                  className="material-symbols-outlined text-lg"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  auto_awesome
                </span>
              </div>
              <h3 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400 bg-clip-text text-transparent">
                Recomendaciones de la IA
              </h3>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-3 p-3 bg-white/50 dark:bg-slate-900/50 rounded-lg">
                <span className="material-symbols-outlined text-cyan-600 dark:text-cyan-400 mt-0.5 flex-shrink-0 font-bold">
                  info
                </span>
                <div>
                  <p className="font-semibold text-slate-900 dark:text-white">
                    Acción Sugerida
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                    {ticket.recomendacionMensaje}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Collapsible History */}
        {ticket.activities && ticket.activities.length > 0 && (
          <div className="px-4 pt-6">
            <button
              onClick={() => setShowHistorial(!showHistorial)}
              className="w-full flex items-center justify-between py-3 px-4 rounded-xl hover:bg-white/50 dark:hover:bg-slate-900/50 transition-all duration-200 group"
            >
              <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                Historial
              </h3>
              <span
                className={`material-symbols-outlined transition-all duration-300 text-slate-600 dark:text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 ${
                  showHistorial ? "rotate-180" : ""
                }`}
              >
                expand_more
              </span>
            </button>

            {showHistorial && (
              <div className="space-y-4 mt-4 bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-100 dark:border-slate-800 shadow-sm">
                {ticket.activities.map((activity, index) => (
                  <div
                    key={activity.id}
                    className="flex gap-4 hover:bg-cyan-100 dark:hover:bg-slate-800/50 p-3 rounded-lg transition-colors duration-200"
                  >
                    <div className="flex flex-col items-center">
                      <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 mt-1.5 shadow-md"></div>
                      {index < ticket.activities.length - 1 && (
                        <div className="w-0.5 h-12 bg-gradient-to-b from-blue-300 to-blue-100 dark:from-blue-700 dark:to-blue-900"></div>
                      )}
                    </div>
                    <div className="pb-4 flex-1">
                      <p className="font-semibold text-slate-900 dark:text-white">
                        {activity.user}
                      </p>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                        {activity.description}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-500 mt-2">
                        {new Date(activity.timestamp).toLocaleString("es-ES")}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      {/* Fixed Footer Button */}
      <footer className="fixed bottom-0 left-0 right-0 z-10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-4 border-t border-slate-200 dark:border-slate-700 shadow-lg">
        <button
          onClick={() => setShowResponseModal(true)}
          className="flex h-14 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-500 dark:to-cyan-500 px-4 text-base font-bold text-white hover:from-blue-700 hover:to-cyan-700 dark:hover:from-blue-600 dark:hover:to-cyan-600 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
        >
          <span className="material-symbols-outlined text-xl">send</span>
          Cambiar Estado y Comentar
        </button>
      </footer>

      {/* Response Modal */}
      {showResponseModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl p-6 max-w-2xl w-full max-h-96 overflow-y-auto border border-slate-200 dark:border-slate-800">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400 bg-clip-text text-transparent mb-6">
              Cambiar Estado y Responder
            </h2>

            {/* Status Selection */}
            <div className="mb-6">
              <p className="text-sm font-semibold text-slate-900 dark:text-white mb-3 uppercase tracking-wide">
                Cambiar Estado a:
              </p>
              <div className="grid grid-cols-2 gap-3">
                {statusOptions.map((status) => (
                  <button
                    key={status}
                    onClick={() => handleStatusChange(status)}
                    disabled={updatingStatus}
                    className={`p-3 rounded-lg text-left font-semibold transition-all duration-200 border-2 transform hover:scale-105 active:scale-95 ${
                      selectedStatus === status
                        ? `${statusColors[status]} border-2 shadow-md`
                        : `bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:${statusButtonColors[status]}`
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    <span className="material-symbols-outlined text-sm mb-1">
                      check_circle
                    </span>
                    {status}
                  </button>
                ))}
              </div>
            </div>

            {/* Response Textarea */}
            <div className="mb-4">
              <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-2 uppercase tracking-wide">
                Respuesta
              </label>
              <textarea
                value={response}
                onChange={(e) => setResponse(e.target.value)}
                placeholder="Escribe tu respuesta aquí..."
                rows="4"
                className="w-full rounded-lg border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-3 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-700 focus:outline-none transition-all duration-200"
              ></textarea>
            </div>

            {/* Templates */}
            <div className="mb-6">
              <p className="text-sm font-semibold text-slate-900 dark:text-white mb-3 uppercase tracking-wide">
                O usar una plantilla
              </p>
              <div className="flex flex-wrap gap-2">
                {templates.map((template) => (
                  <button
                    key={template.id}
                    onClick={() => handleTemplateClick(template)}
                    className={`flex items-center justify-center gap-2 rounded-full border-2 px-4 py-2 text-sm font-semibold transition-all duration-200 transform hover:scale-105 ${
                      response === template.text
                        ? "border-blue-500 bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-blue-950 dark:to-cyan-950 text-blue-700 dark:text-blue-300 shadow-md"
                        : "border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-400"
                    }`}
                  >
                    <span className="material-symbols-outlined text-sm">bookmark</span>
                    {template.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => setShowResponseModal(false)}
                className="flex-1 p-3 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-semibold hover:bg-slate-200 dark:hover:bg-slate-700 transition-all duration-200 transform hover:scale-105 active:scale-95"
              >
                Cancelar
              </button>
              <button
                onClick={handleSendResponse}
                disabled={sendingResponse || !response.trim()}
                className="flex-1 p-3 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-500 dark:to-cyan-500 text-white font-semibold hover:from-blue-700 hover:to-cyan-700 dark:hover:from-blue-600 dark:hover:to-cyan-600 transition-all duration-200 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-md hover:shadow-lg"
              >
                {sendingResponse ? "Enviando..." : "Enviar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TicketDetailPage;
