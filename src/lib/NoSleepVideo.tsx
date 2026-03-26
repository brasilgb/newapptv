'use client';

import React, { useEffect, useRef, useState } from 'react';

export default function NoSleepPro() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const wakeLockRef = useRef<any>(null); // Referência para o Wake Lock

  const [isPlaying, setIsPlaying] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [lastPlayTime, setLastPlayTime] = useState(Date.now());

  // 🔥 SOLICITAR WAKE LOCK (O padrão ouro para 2026)
  const requestWakeLock = async () => {
    try {
      if ('wakeLock' in navigator) {
        wakeLockRef.current = await (navigator as any).wakeLock.request('screen');
        console.log('☀️ Wake Lock Ativo');
      }
    } catch (err: any) {
      console.error(`Wake Lock falhou: ${err.message}`);
    }
  };

  // 🔥 PLAY COM RETRY E WAKE LOCK
  const attemptPlay = async () => {
    if (!videoRef.current) return;

    try {
      await videoRef.current.play();
      await requestWakeLock(); // Tenta travar a tela ligada aqui

      setIsPlaying(true);
      setErrorMessage('');
      setLastPlayTime(Date.now());
      console.log('✅ NoSleep & WakeLock ativos');
    } catch (err: any) {
      console.log('❌ Falha autoplay:', err.message);
      setIsPlaying(false);
      setErrorMessage(err.message);
      // Se falhou, precisamos mostrar o menu para o usuário clicar
      setShowMenu(true); 
      
      setTimeout(attemptPlay, 5000);
    }
  };

  // 🚀 INIT
  useEffect(() => {
    attemptPlay();

    // Reativa o Wake Lock se a aba voltar a ficar visível
    const handleVisibility = () => {
      if (document.visibilityState === 'visible') requestWakeLock();
    };
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, []);

  // 🎮 CAPTURA INTERAÇÃO
  useEffect(() => {
    const unlock = () => {
      if (!isPlaying) attemptPlay();
    };

    window.addEventListener('click', unlock);
    window.addEventListener('keydown', unlock);
    return () => {
      window.removeEventListener('click', unlock);
      window.removeEventListener('keydown', unlock);
    };
  }, [isPlaying]);

  return (
    // Aumentei o zIndex e adicionei pointer-events auto no container
    <div style={{ 
      position: 'fixed', 
      zIndex: 999999, 
      bottom: 20, 
      right: 20,
      pointerEvents: 'auto' 
    }}>

      {/* 🎬 VÍDEO MOTOR (Mantenha o src correto) */}
      <video
        ref={videoRef}
        loop
        muted
        playsInline
        src="/apptv/blank.mp4"
        style={{ position: 'absolute', width: '1px', height: '1px', opacity: 0 }}
      />

      {/* ⚙️ MENU (MODAL) */}
      {showMenu && (
        <div style={{
          backgroundColor: '#1a1a1a',
          color: 'white',
          padding: '20px',
          borderRadius: '12px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          width: '240px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
          border: '1px solid #333',
          marginBottom: '10px'
        }}>
          <b style={{ fontSize: '16px' }}>Status da TV</b>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
             <div style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: isPlaying ? '#2ecc71' : '#e74c3c' }} />
             <span>{isPlaying ? 'Tela Protegida' : 'Modo Dormir Ativo'}</span>
          </div>

          {!isPlaying && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                attemptPlay();
              }}
              style={{
                backgroundColor: '#e74c3c',
                padding: '12px',
                borderRadius: '8px',
                border: 'none',
                color: 'white',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              FORÇAR ATIVAÇÃO
            </button>
          )}

          <button
            onClick={() => setShowMenu(false)}
            style={{ background: 'none', border: 'none', color: '#666', cursor: 'pointer', fontSize: '12px' }}
          >
            Minimizar
          </button>
        </div>
      )}

      {/* 🔴 INDICADOR (BOTÃO DE CLIQUE) */}
      <div
        onClick={(e) => {
          e.stopPropagation();
          setShowMenu(!showMenu);
        }}
        style={{
          width: 25,
          height: 25,
          borderRadius: '50%',
          backgroundColor: isPlaying ? '#2ecc71' : '#e74c3c',
          opacity: showMenu ? 1 : 0.6,
          boxShadow: isPlaying ? '0 0 5px #2ecc71' : '0 0 15px #e74c3c',
          cursor: 'pointer',
          marginLeft: 'auto'
        }}
      />
    </div>
  );
}