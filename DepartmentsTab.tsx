import React, { useState } from 'react';

interface NavbarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onOpenWriteModal: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onTabChange,
  onOpenWriteModal,
  searchQuery,
  onSearchChange,
}) => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-3xl border-b border-outline-variant/20 transition-all">
      <div className="flex justify-between items-center w-full px-4 md:px-16 py-3 max-w-7xl mx-auto h-16">
        {/* Logo */}
        <div 
          onClick={() => onTabChange('home')}
          className="text-2xl font-extrabold tracking-tight text-primary cursor-pointer flex items-center gap-1.5 hover:opacity-80 transition-opacity"
        >
          <span className="material-symbols-outlined font-variation-fill-1 text-[28px] text-primary">medical_services</span>
          <span>MediClick</span>
        </div>

        {/* Search Bar - Desktop & Tablet */}
        <div className="hidden md:flex flex-1 max-w-md mx-8">
          <div className={`w-full flex items-center bg-surface-container-low border ${isSearchFocused ? 'border-primary bg-white shadow-sm' : 'border-outline-variant/30'} rounded-full px-4 py-1.5 transition-all duration-200 group`}>
            <span className="material-symbols-outlined text-on-surface-variant/70 mr-2 text-[20px]">search</span>
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              className="bg-transparent border-none focus:outline-none focus:ring-0 text-sm w-full placeholder:text-on-surface-variant/50 text-on-surface"
              placeholder="증상이나 진료과, 병원 검색..."
            />
            {searchQuery && (
              <button 
                onClick={() => onSearchChange('')}
                className="text-on-surface-variant/50 hover:text-on-surface ml-1"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            )}
          </div>
        </div>

        {/* Actions Right */}
        <div className="flex items-center gap-2 md:gap-3">
          {/* Write Opinion Button (Prominent CTA for board) */}
          <button
            onClick={() => {
              onTabChange('community');
              onOpenWriteModal();
            }}
            className="hidden sm:flex items-center gap-1.5 bg-primary/10 hover:bg-primary/20 text-primary font-bold text-xs px-3.5 py-2 rounded-full transition-all active:scale-95"
            title="사용자 의견 및 게시글 작성"
          >
            <span className="material-symbols-outlined text-[18px]">edit_square</span>
            <span>의견 등록</span>
          </button>

          <button 
            onClick={() => {
              alert('새로운 알림이 없습니다.\nMediClick에서 실시간 맞춤 진료 정보를 확인하세요!');
            }}
            className="p-2 rounded-full hover:bg-black/5 text-on-surface-variant transition-colors active:scale-95 relative"
            title="알림"
          >
            <span className="material-symbols-outlined text-[24px]">notifications</span>
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full ring-2 ring-white"></span>
          </button>

          <button 
            onClick={() => onTabChange('my-info')}
            className={`p-2 rounded-full transition-colors active:scale-95 ${activeTab === 'my-info' ? 'bg-primary text-white' : 'hover:bg-black/5 text-on-surface-variant'}`}
            title="내 정보 / 접수내역"
          >
            <span className="material-symbols-outlined text-[24px]">account_circle</span>
          </button>
        </div>
      </div>

      {/* Mobile Search Bar */}
      <div className="md:hidden px-4 pb-3">
        <div className="w-full flex items-center bg-surface-container-low border border-outline-variant/30 rounded-full px-3.5 py-1.5">
          <span className="material-symbols-outlined text-on-surface-variant/70 mr-2 text-[18px]">search</span>
          <input 
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="bg-transparent border-none focus:outline-none text-xs w-full placeholder:text-on-surface-variant/50 text-on-surface"
            placeholder="증상, 진료과 또는 병원 검색..."
          />
          {searchQuery && (
            <button onClick={() => onSearchChange('')} className="text-on-surface-variant/50">
              <span className="material-symbols-outlined text-[16px]">close</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
