import React from 'react';

interface TourModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TourModal: React.FC<TourModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div 
        className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            <i className="fas fa-map-signs mr-3 text-blue-500"></i>
            Guia Rápido
          </h2>
          <button onClick={onClose} className="text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white text-3xl leading-none">&times;</button>
        </div>
        
        <div className="space-y-6 text-gray-700 dark:text-gray-300">
          {/* For Players */}
          <section>
            <h3 className="text-xl font-semibold mb-2 text-green-600 dark:text-green-400 border-b border-gray-200 dark:border-gray-700 pb-1">
              <i className="fas fa-user mr-2"></i>
              Para Jogadores
            </h3>
            <ol className="list-decimal list-inside space-y-2 pl-2">
              <li>
                <strong>Confirmar Presença:</strong> Clique no botão verde 
                <span className="font-mono bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded-md mx-1 text-sm">Confirmar Presença</span>.
              </li>
              <li>
                <strong>Selecione seu Nome:</strong> Na janela que abrir, escolha seu nome na lista.
              </li>
              <li>
                <strong>Escolha sua Resposta:</strong> Clique em <span className="text-green-500 font-bold">✅ Vou</span>, <span className="text-yellow-500 font-bold">❓ Talvez</span> ou <span className="text-red-500 font-bold">❌ Não vou</span>. Pronto! Sua resposta aparecerá na lista.
              </li>
            </ol>
          </section>

          {/* For Coach */}
          <section>
            <h3 className="text-xl font-semibold mb-2 text-blue-600 dark:text-blue-400 border-b border-gray-200 dark:border-gray-700 pb-1">
              <i className="fas fa-user-shield mr-2"></i>
              Para o Técnico
            </h3>
            <p className="mb-3 text-sm">Primeiro, ative o "Modo Técnico" clicando no botão no canto superior esquerdo.</p>
            <ul className="list-disc list-inside space-y-3 pl-2">
              <li>
                <strong>Montar o Time:</strong> Com o modo técnico ativo, clique e arraste os jogadores confirmados (✅) para posicioná-los no campo.
              </li>
              <li>
                <strong>Gerenciar Lista:</strong> Adicione, edite (<i className="fas fa-pencil-alt text-xs"></i>), ou remova (<i className="fas fa-trash-alt text-xs"></i>) jogadores da lista principal.
              </li>
              <li>
                <strong>Promover a Técnico:</strong> Defina um jogador como técnico (<i className="fas fa-crown text-xs"></i>). Apenas um técnico pode ser definido por vez.
              </li>
              <li>
                <strong>Compartilhar Convite:</strong> Use o botão <span className="font-mono bg-cyan-500 text-white px-2 py-1 rounded-md text-sm">Compartilhar Convite</span> para enviar o link da página no WhatsApp.
              </li>
              <li>
                <strong>Exportar Imagem:</strong> Clique em <span className="font-mono bg-indigo-500 text-white px-2 py-1 rounded-md text-sm">Exportar Time</span> para salvar uma imagem da escalação e compartilhar onde quiser.
              </li>
              <li>
                <strong>Nova Partida:</strong> O botão <span className="font-mono bg-red-500 text-white px-2 py-1 rounded-md text-sm">Nova Partida</span> limpa todas as confirmações para começar uma nova semana, mantendo a lista de jogadores.
              </li>
            </ul>
          </section>
        </div>

        <div className="mt-6 text-center">
            <button 
                onClick={onClose}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-lg transition-transform transform hover:scale-105"
            >
                Entendi!
            </button>
        </div>
      </div>
    </div>
  );
};

export default TourModal;
