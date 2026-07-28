@import "tailwindcss";

@layer base {
  body {
    font-family: 'Manrope', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    background-color: #f8f9ff;
    color: #0b1c30;
  }
}

.material-symbols-outlined {
  font-family: 'Material Symbols Outlined';
  font-weight: normal;
  font-style: normal;
  font-size: 24px;
  line-height: 1;
  letter-spacing: normal;
  text-transform: none;
  display: inline-block;
  white-space: nowrap;
  word-wrap: normal;
  direction: ltr;
  font-feature-settings: 'liga';
  -webkit-font-smoothing: antialiased;
  font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
}

.font-variation-fill-1 {
  font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24 !important;
}

.light-glow {
  background: radial-gradient(circle at 50% -20%, #e5eeff 0%, #f8f9ff 100%);
}

.glass-card, .soft-card {
  background: #ffffff;
  border: 1px solid rgba(0, 107, 95, 0.08);
  box-shadow: 0 4px 20px -2px rgba(11, 28, 48, 0.04);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.glass-card:hover, .soft-card:hover {
  border-color: rgba(45, 212, 191, 0.4);
  box-shadow: 0 12px 30px -4px rgba(0, 107, 95, 0.12);
  transform: translateY(-4px);
}

.misty-glass {
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(107, 122, 118, 0.1);
}

.light-glass {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(0, 107, 95, 0.1);
}

.vibrant-mint-button {
  background: linear-gradient(135deg, #2dd4bf 0%, #006b5f 100%);
  box-shadow: 0 4px 14px 0 rgba(45, 212, 191, 0.4);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.vibrant-mint-button:hover {
  box-shadow: 0 6px 20px 0 rgba(45, 212, 191, 0.6);
  transform: translateY(-2px);
}

.vibrant-mint-button:active {
  transform: scale(0.97);
  filter: brightness(0.9);
}

.hospital-card-gradient {
  background: linear-gradient(135deg, rgba(255, 255, 255, 1) 0%, rgba(240, 247, 255, 0.8) 100%);
}

.search-input-focus:focus-within {
  border-color: #006b5f;
  background: #ffffff;
  box-shadow: 0 0 0 4px rgba(45, 212, 191, 0.1);
}

@keyframes subtle-float {
  0% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
  100% { transform: translateY(0); }
}

.float-animation {
  animation: subtle-float 6s ease-in-out infinite;
}

@keyframes subtle-pulse {
  0% { box-shadow: 0 0 0 0 rgba(45, 212, 191, 0.4); }
  70% { box-shadow: 0 0 0 12px rgba(45, 212, 191, 0); }
  100% { box-shadow: 0 0 0 0 rgba(45, 212, 191, 0); }
}

.fab-pulse {
  animation: subtle-pulse 3s infinite;
}

.hide-scrollbar::-webkit-scrollbar,
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

.hide-scrollbar,
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

