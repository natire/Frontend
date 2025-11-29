// src/services/importService.js
// Por ahora simula el backend

export async function importTicketsMock(sourceType = 'file') {
  // sourceType: 'file' | 'jira' | 'api'
  // Simulamos tiempo de proceso
  await new Promise((resolve) => setTimeout(resolve, 1500));

  return {
    total: 2000,
    imported: 1998,
    errorsCount: 2,
    errors: [
      { row: 23, message: 'Falta el asunto' },
      { row: 145, message: 'Email inválido' },
    ],
    categories: {
      bugs: 420,
      mejoras: 120,
      soporte: 560,
      pregunta: 898,
    },
    growthPercent: 15,
  };
}
