'use client';

import React, { useEffect, useRef, useState } from 'react';

export default function NoSleepSilent() {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const attemptPlay = async () => {
    if (!videoRef.current) return;

    try {
      // Importante para TV: Resetar o tempo. Cast to HTMLVideoElement to access play()
      const videoElement = videoRef.current as HTMLVideoElement;
      videoElement.currentTime = 0;
      
      // Tenta tocar
      await videoElement.play();
      
      // SUCESSO:
      setIsPlaying(true);
      setShowMenu(false); // Esconde o menu se funcionar
      setErrorMessage('');
      console.log('NoSleep: Ativo e rodando.');

    } catch (err:any) {
      // ERRO:
      console.error("NoSleep: Bloqueado", err);
      setIsPlaying(false);
      setErrorMessage(err.message);
      setShowMenu(true); // MOSTRA O MENU pois precisa de clique
    }
  };

  useEffect(() => {
    attemptPlay();
  }, []);

  return (
    <div style={{ position: 'fixed', zIndex: 9999, bottom: 10, right: 10, fontFamily: 'sans-serif' }}>
      
      {/* VÍDEO (Motor invisível) - Certifique-se que o arquivo está em /public/blank.mp4 */}
      <video
        ref={videoRef}
        loop
        muted
        playsInline
        preload="auto"
        src="/apptv/blank.mp4" 
        style={{ position: 'absolute', width: 1, height: 1, opacity: 0.01, pointerEvents: 'none' }}
      />

      {/* --- BOTÃO/MENU DE CONTROLE (Só aparece se der erro ou se clicar na bolinha) --- */}
      {showMenu && (
        <div style={{
          backgroundColor: 'rgba(0,0,0,0.85)',
          color: 'white',
          padding: '12px',
          borderRadius: '8px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
          marginBottom: '10px',
          boxShadow: '0 4px 10px rgba(0,0,0,0.5)',
          fontSize: '12px',
          maxWidth: '200px'
        }}>
          {isPlaying ? (
            <span style={{ color: '#2ecc71', fontWeight: 'bold' }}>✅ SISTEMA ATIVO</span>
          ) : (
            <span style={{ color: '#e74c3c', fontWeight: 'bold' }}>⚠️ AÇÃO NECESSÁRIA</span>
          )}

          {!isPlaying && (
            <button
              onClick={attemptPlay}
              style={{
                backgroundColor: '#e74c3c',
                color: 'white',
                border: 'none',
                padding: '8px 12px',
                borderRadius: '4px',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
            >
              ATIVAR TELA
            </button>
          )}

          <div style={{ fontSize: '10px', color: '#ccc', textAlign: 'center' }}>
             {isPlaying ? "A TV não entrará em standby." : errorMessage || "Clique para permitir vídeo."}
          </div>
          
          <button 
            onClick={() => setShowMenu(false)}
            style={{ background: 'transparent', border: '1px solid #555', color: '#aaa', padding: '2px 8px', borderRadius: '4px', cursor: 'pointer', fontSize: '10px'}}
          >
            Fechar
          </button>
        </div>
      )}

      {/* --- INDICADOR DISCRETO (Sempre presente, mas quase invisível) --- */}
      <div 
        onClick={() => setShowMenu(!showMenu)} // Clicar aqui abre/fecha o menu
        title={isPlaying ? "NoSleep: Ativo" : "NoSleep: Parado"}
        style={{
          width: '12px',
          height: '12px',
          borderRadius: '50%',
          // Se estiver rodando: Verde bem clarinho e quase transparente
          // Se estiver parado: Vermelho forte e pulsante para chamar atenção
          backgroundColor: isPlaying ? '#2ecc71' : '#e74c3c',
          opacity: isPlaying ? 0.2 : 1, // Quase some se estiver tudo bem
          cursor: 'pointer',
          transition: 'opacity 0.3s',
          boxShadow: isPlaying ? 'none' : '0 0 8px red'
        }}
      />
    </div>
  );
}