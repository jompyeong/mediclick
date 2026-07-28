import React from 'react';

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  unreadCount?: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onTabChange,
}) => {
  const navItems = [
    { id: 'home', label: '홈', icon: 'home', activeIcon: 'home' },
    { id: 'departments', label: '진료과', icon: 'medical_services', activeIcon: 'medical_services' },
    { id: 'community', label: '커뮤니티', icon: 'forum', activeIcon: 'forum', badge: true },
    { id: 'my-info', label: '내 정보', icon: 'person', activeIcon: 'person' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 w-full z-50 bg-white/90 backdrop-blur-3xl border-t border-outline-variant/20 shadow-[0_-8px_32px_0_rgba(0,0,0,0.05)] rounded-t-3xl px-6 pt-2 pb-6 flex justify-around items-center h-20">
      {navItems.map((item) => {
        const isActive = activeTab === item.id || (item.id === 'home' && activeTab === 'hospital-detail');
        return (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={`flex flex-col items-center justify-center transition-all duration-200 active:scale-90 relative ${
              isActive 
                ? 'text-primary font-bold scale-105' 
                : 'text-on-surface-variant/70 hover:text-primary font-medium'
            }`}
          >
            {isActive && item.id === 'departments' ? (
              <div className="bg-primary text-white rounded-full px-5 py-1 shadow-lg shadow-primary/20 flex flex-col items-center">
                <span className="material-symbols-outlined font-variation-fill-1 text-[22px]">{item.activeIcon}</span>
                <span className="text-[11px] font-bold mt-0.5">{item.label}</span>
              </div>
            ) : isActive && item.id === 'community' ? (
              <div className="bg-primary-container text-on-primary-container rounded-xl px-4 py-1.5 shadow-md shadow-primary/10 flex flex-col items-center">
                <span className="material-symbols-outlined font-variation-fill-1 text-[22px]">{item.activeIcon}</span>
                <span className="text-[11px] font-bold mt-0.5">{item.label}</span>
              </div>
            ) : (
              <>
                <span className={`material-symbols-outlined text-[24px] ${isActive ? 'font-variation-fill-1 text-primary' : ''}`}>
                  {item.icon}
                </span>
                <span className={`text-[11px] mt-1 ${isActive ? 'font-bold text-primary' : ''}`}>
                  {item.label}
                </span>
                {item.badge && !isActive && (
                  <span className="absolute top-0 right-3 w-2 h-2 bg-[#ba1a1a] rounded-full ring-2 ring-white"></span>
                )}
                {isActive && item.id !== 'departments' && item.id !== 'community' && (
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-0.5 animate-pulse"></div>
                )}
              </>
            )}
          </button>
        );
      })}
    </nav>
  );
};
