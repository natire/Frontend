import { useState } from 'react';

function FooterActions({ ticketId, onStatusChange, onReply }) {
  const [showStatusMenu, setShowStatusMenu] = useState(false);
  const [showReplyBox, setShowReplyBox] = useState(false);
  const [replyText, setReplyText] = useState('');

  const statuses = [
    { id: 'new', label: 'Nuevo', color: 'blue' },
    { id: 'pending', label: 'En Proceso', color: 'yellow' },
    { id: 'urgent', label: 'Urgente', color: 'red' },
    { id: 'closed', label: 'Cerrado', color: 'green' }
  ];

  const handleStatusChange = (status) => {
    onStatusChange(status);
    setShowStatusMenu(false);
  };

  const handleReply = () => {
    if (replyText.trim()) {
      onReply(replyText);
      setReplyText('');
      setShowReplyBox(false);
    }
  };

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 p-4 z-20">
        <div className="max-w-7xl mx-auto flex gap-3">
          <div className="relative flex-1">
            <button
              onClick={() => setShowStatusMenu(!showStatusMenu)}
              className="w-full flex items-center justify-center gap-2 h-12 rounded-xl border-2 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            >
              <span className="material-symbols-outlined">sync_alt</span>
              <span>Cambiar Estado</span>
            </button>

            {showStatusMenu && (
              <div className="absolute bottom-full mb-2 left-0 right-0 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-lg overflow-hidden">
                {statuses.map(status => (
                  <button
                    key={status.id}
                    onClick={() => handleStatusChange(status.id)}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-left"
                  >
                    <div className={`w-3 h-3 rounded-full bg-${status.color}-500`}></div>
                    <span className="text-slate-900 dark:text-white font-medium">
                      {status.label}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={() => setShowReplyBox(true)}
            className="flex-1 flex items-center justify-center gap-2 h-12 rounded-xl bg-blue-500 text-white font-medium hover:bg-blue-600 transition-colors"
          >
            <span className="material-symbols-outlined">reply</span>
            <span>Responder</span>
          </button>
        </div>
      </div>

      {showReplyBox && (
        <div className="fixed inset-0 bg-black/50 z-30 flex items-end md:items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-t-2xl md:rounded-2xl w-full max-w-2xl max-h-[80vh] flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-800">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                Responder Ticket
              </h3>
              <button
                onClick={() => setShowReplyBox(false)}
                className="text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="flex-1 p-4 overflow-y-auto">
              <textarea
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Escribe tu respuesta aquí..."
                className="w-full h-40 p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="p-4 border-t border-slate-200 dark:border-slate-800 flex gap-3">
              <button
                onClick={() => setShowReplyBox(false)}
                className="flex-1 h-12 rounded-xl border-2 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleReply}
                className="flex-1 h-12 rounded-xl bg-blue-500 text-white font-medium hover:bg-blue-600 transition-colors"
              >
                Enviar Respuesta
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default FooterActions;