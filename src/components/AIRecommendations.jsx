function AIRecommendations({ ticket }) {
  // Lógica simple de recomendaciones basada en el ticket
  const getRecommendations = () => {
    if (ticket.priority === 'high' || ticket.status === 'urgent') {
      return {
        analysis: `El cliente reporta un problema crítico con ${ticket.title.toLowerCase()}. Requiere atención inmediata para evitar impacto en el servicio.`,
        action: `Escalar al equipo técnico senior y proporcionar una respuesta en menos de 30 minutos. Mantener al cliente informado del progreso.`,
        template: "Respuesta Urgente"
      };
    } else if (ticket.title.toLowerCase().includes('factura') || ticket.title.toLowerCase().includes('cobro')) {
      return {
        analysis: `El cliente reporta un sobrecargo de $20. Probablemente se deba a un cambio de plan no reflejado correctamente en el sistema de facturación.`,
        action: `Verificar el historial de cambios de plan del cliente y emitir un reembolso de $20. Se puede usar la plantilla de respuesta "Ajuste de Facturación".`,
        template: "Ajuste de Facturación"
      };
    } else if (ticket.title.toLowerCase().includes('login') || ticket.title.toLowerCase().includes('sesión')) {
      return {
        analysis: `Problema de autenticación reportado. Posible causa: cookies expiradas o caché del navegador.`,
        action: `Solicitar al cliente que limpie caché y cookies. Si persiste, verificar el estado del servicio de autenticación.`,
        template: "Solución de Login"
      };
    } else {
      return {
        analysis: `Ticket estándar de soporte. El cliente requiere asistencia con ${ticket.title.toLowerCase()}.`,
        action: `Revisar los detalles proporcionados y responder con una solución personalizada. Tiempo estimado de respuesta: 2-4 horas.`,
        template: "Respuesta Estándar"
      };
    }
  };

  const recommendations = getRecommendations();

  return (
    <div className="bg-slate-50 dark:bg-slate-950 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 rounded-xl p-4 md:p-5">
          {/* Header */}
          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center justify-center size-10 rounded-full bg-blue-500/20">
              <span className="material-symbols-outlined text-blue-500 text-xl">auto_awesome</span>
            </div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
              Recomendaciones de la IA
            </h3>
          </div>

          {/* Analysis */}
          <div className="mb-4">
            <div className="flex items-start gap-2 mb-2">
              <span className="material-symbols-outlined text-blue-600 dark:text-blue-400 text-xl mt-0.5">
                info
              </span>
              <div className="flex-1">
                <h4 className="font-medium text-slate-900 dark:text-white mb-1">
                  Análisis del problema
                </h4>
                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  {recommendations.analysis}
                </p>
              </div>
            </div>
          </div>

          {/* Suggested Action */}
          <div className="mb-4">
            <div className="flex items-start gap-2 mb-2">
              <span className="material-symbols-outlined text-green-600 dark:text-green-400 text-xl mt-0.5">
                check_circle
              </span>
              <div className="flex-1">
                <h4 className="font-medium text-slate-900 dark:text-white mb-1">
                  Acción Sugerida
                </h4>
                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  {recommendations.action}
                </p>
              </div>
            </div>
          </div>

          {/* Template Button */}
          <button className="w-full flex items-center justify-center gap-2 h-11 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-medium transition-colors">
            <span className="material-symbols-outlined text-xl">send</span>
            <span>Usar plantilla "{recommendations.template}"</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default AIRecommendations;