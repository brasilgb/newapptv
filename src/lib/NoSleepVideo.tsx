'use client';

import React, { useEffect, useRef, useState } from 'react';

export default function NoSleepDiagnostic() {
  const videoRef = useRef(null);
  const [status, setStatus] = useState('idle');
  const [message, setMessage] = useState('Carregando...');
  const [showButton, setShowButton] = useState(true);

  const attemptPlay = async () => {
    if (!videoRef.current) return; // Ensure videoRef.current is not null

    setStatus('loading');
    setMessage('Iniciando vídeo local...');

    try {
      // Importante para TV: Resetar o tempo. Cast to HTMLVideoElement to access play()
      const videoElement = videoRef.current as HTMLVideoElement;
      videoElement.currentTime = 0;
      
      // Tenta tocar
      await videoElement.play();
      
      setStatus('success');
      setMessage('✅ MODO ATIVO (Arquivo Local)');
      setTimeout(() => setShowButton(false), 3000);

    } catch (err: any) {
      console.error("Erro ao reproduzir:", err);
      setStatus('error');
      setMessage(`❌ Erro: ${err.name} - ${err.message}`);
    }
  };

  useEffect(() => {
    // Tenta rodar assim que o componente monta
    attemptPlay();
  }, []);

  return (
    <div style={{ position: 'fixed', zIndex: 9999, bottom: 20, right: 20, fontFamily: 'sans-serif' }}>
      
      {/* VÍDEO APONTANDO PARA A PASTA PUBLIC */}
      <video
        ref={videoRef}
        loop
        muted
        playsInline
        preload="auto"
        crossOrigin="anonymous" // Importante para recursos externos
        // Usamos este vídeo clássico de teste do projeto Big Buck Bunny
        // É garantido que funciona em qualquer browser moderno
        src="/apptv/blank.mp4"
        style={{ 
          position: 'fixed', // Mudamos para fixed para garantir que fique no viewport
          top: 0,
          left: 0,
          width: '10px', // Aumentamos um pouco o tamanho (1px as vezes buga a TV)
          height: '10px',
          opacity: 0.01, 
          pointerEvents: 'none',
          zIndex: -1
        }}
      />

      {/* PAINEL DE FEEDBACK */}
      {showButton && (
        <div style={{
          backgroundColor: 'rgba(0,0,0,0.9)',
          color: 'white',
          padding: '15px',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '10px',
          maxWidth: '300px'
        }}>
          <div style={{ 
            width: '100%', 
            padding: '5px', 
            borderRadius: '4px',
            textAlign: 'center',
            backgroundColor: status === 'success' ? '#2ecc71' : status === 'error' ? '#e74c3c' : '#3498db',
            fontWeight: 'bold'
          }}>
            {status === 'success' ? 'ONLINE' : status === 'error' ? 'ERRO' : 'CARREGANDO'}
          </div>

          <div style={{ fontSize: '12px', textAlign: 'center' }}>
            {message}
          </div>

          <button
            onClick={attemptPlay}
            style={{
              marginTop: '10px',
              padding: '8px 16px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            TENTAR NOVAMENTE
          </button>
        </div>
      )}

      {/* Bolinha Indicadora */}
      {!showButton && (
        <div 
          onClick={() => setShowButton(true)}
          style={{
            width: '15px',
            height: '15px',
            borderRadius: '50%',
            backgroundColor: '#2ecc71',
            boxShadow: '0 0 10px #2ecc71',
            cursor: 'pointer'
          }}
        />
      )}
    </div>
  );
}