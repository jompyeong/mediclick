import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { BottomNav } from './components/BottomNav';
import { SymptomModal } from './components/SymptomModal';
import { HomeTab } from './components/HomeTab';
import { DepartmentsTab } from './components/DepartmentsTab';
import { CommunityTab } from './components/CommunityTab';
import { HospitalDetail } from './components/HospitalDetail';
import { MyInfoTab } from './components/MyInfoTab';
import { Hospital, SymptomRegistration } from './types';
import { INITIAL_HOSPITALS, DEPARTMENTS } from './data/mockData';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedHospital, setSelectedHospital] = useState<Hospital | null>(null);
  const [isSymptomModalOpen, setIsSymptomModalOpen] = useState(false);
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [communityFilter, setCommunityFilter] = useState('전체');
  const [latestRegistration, setLatestRegistration] = useState<SymptomRegistration | null>(null);
  const [showToast, setShowToast] = useState(false);

  const handleSelectHospital = (hosp: Hospital) => {
    setSelectedHospital(hosp);
    setActiveTab('hospital-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenSymptomModal = (hosp?: Hospital) => {
    if (hosp) {
      setSelectedHospital(hosp);
    }
    setIsSymptomModalOpen(true);
  };

  const handleSelectDepartment = (deptName: string) => {
    if (deptName === '전체') {
      setActiveTab('departments');
    } else {
      // Filter community or jump to department
      setCommunityFilter(deptName);
      setActiveTab('departments');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSymptomSuccess = (reg: SymptomRegistration) => {
    setLatestRegistration(reg);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 5000);
  };

  return (
    <div className="min-h-screen bg-[#f8f9ff] text-[#0b1c30] flex flex-col font-sans relative selection:bg-[#2dd4bf]/20">
      {/* Top Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenWriteModal={() => {
          setIsWriteModalOpen(true);
        }}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Main Content Area with top & bottom clearance */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-32">
        {/* Search Results Overlay when typing */}
        {searchQuery.trim() !== '' ? (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex justify-between items-center bg-white p-4 rounded-2xl border border-primary/20 shadow-xs">
              <h3 className="font-bold text-base text-on-surface">
                '{searchQuery}' 검색 결과
              </h3>
              <button
                onClick={() => setSearchQuery('')}
                className="text-xs text-primary font-bold hover:underline"
              >
                검색 초기화
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {INITIAL_HOSPITALS.filter(h => 
                h.name.includes(searchQuery) || 
                h.description.includes(searchQuery) || 
                h.departments.some(d => d.includes(searchQuery)) ||
                h.address.includes(searchQuery)
              ).map(h => (
                <div 
                  key={h.id}
                  onClick={() => {
                    setSearchQuery('');
                    handleSelectHospital(h);
                  }}
                  className="soft-card p-5 rounded-2xl cursor-pointer hover:border-primary/50 flex justify-between items-center"
                >
                  <div>
                    <span className="text-xs font-bold text-primary bg-primary/10 px-2.5 py-0.5 rounded-full mr-2">{h.badge}</span>
                    <h4 className="font-bold text-lg text-on-surface mt-1">{h.name}</h4>
                    <p className="text-xs text-on-surface-variant line-clamp-1 mt-0.5">{h.description}</p>
                    <p className="text-[11px] text-primary font-semibold mt-2">{h.departments.join(', ')}</p>
                  </div>
                  <span className="material-symbols-outlined text-primary">chevron_right</span>
                </div>
              ))}

              {DEPARTMENTS.filter(d => 
                d.name.includes(searchQuery) || d.description.includes(searchQuery)
              ).map(d => (
                <div
                  key={d.id}
                  onClick={() => {
                    setSearchQuery('');
                    handleSelectDepartment(d.name);
                  }}
                  className="soft-card p-5 rounded-2xl cursor-pointer hover:border-primary/50 flex items-center gap-3"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined text-2xl font-variation-fill-1">{d.icon}</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-base text-on-surface">{d.name}</h4>
                    <p className="text-xs text-on-surface-variant line-clamp-1">{d.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <>
            {activeTab === 'home' && (
              <HomeTab
                onOpenSymptomModal={handleOpenSymptomModal}
                onSelectHospital={handleSelectHospital}
                onSelectDepartment={handleSelectDepartment}
                onGoToCommunity={() => {
                  setActiveTab('community');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
            )}

            {activeTab === 'departments' && (
              <DepartmentsTab
                onSelectDepartment={handleSelectDepartment}
                onOpenSymptomModal={() => handleOpenSymptomModal()}
              />
            )}

            {activeTab === 'community' && (
              <CommunityTab
                isWriteModalOpen={isWriteModalOpen}
                onCloseWriteModal={() => setIsWriteModalOpen(false)}
                onOpenWriteModal={() => setIsWriteModalOpen(true)}
                selectedFilter={communityFilter}
                onSelectFilter={setCommunityFilter}
              />
            )}

            {activeTab === 'hospital-detail' && (
              <HospitalDetail
                hospital={selectedHospital}
                onBack={() => setActiveTab('home')}
                onOpenSymptomModal={(h) => handleOpenSymptomModal(h)}
                onGoToCommunity={() => {
                  setActiveTab('community');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
            )}

            {activeTab === 'my-info' && (
              <MyInfoTab
                onOpenSymptomModal={() => handleOpenSymptomModal()}
                onGoToCommunity={() => {
                  setActiveTab('community');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
            )}
          </>
        )}
      </main>

      {/* Symptom Pre-registration & Reception Modal */}
      <SymptomModal
        isOpen={isSymptomModalOpen}
        onClose={() => setIsSymptomModalOpen(false)}
        hospitals={INITIAL_HOSPITALS}
        departments={DEPARTMENTS}
        selectedHospital={selectedHospital}
        onSuccess={handleSymptomSuccess}
      />

      {/* Success Toast Notification */}
      {showToast && latestRegistration && (
        <div className="fixed top-20 right-6 z-[80] bg-white border border-primary/30 rounded-2xl p-4 shadow-2xl max-w-sm animate-bounce flex items-start gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
            <span className="material-symbols-outlined text-[24px] font-variation-fill-1">check_circle</span>
          </div>
          <div className="flex-1">
            <h5 className="font-bold text-sm text-on-surface">사전 접수가 완료되었습니다!</h5>
            <p className="text-xs text-on-surface-variant mt-0.5">
              {latestRegistration.hospitalName} ({latestRegistration.department}) • 대기 {latestRegistration.queueNumber || 3}번
            </p>
            <button
              onClick={() => {
                setShowToast(false);
                setActiveTab('my-info');
              }}
              className="text-xs text-primary font-bold mt-1.5 hover:underline block"
            >
              내 접수내역에서 확인 →
            </button>
          </div>
          <button onClick={() => setShowToast(false)} className="text-on-surface-variant/50 hover:text-on-surface">
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>
      )}

      {/* Floating Action Button (AI Online Support / Quick Reception) - From HTML prototypes */}
      <div className="fixed bottom-24 right-6 z-40">
        <button
          onClick={() => {
            if (activeTab === 'community') {
              setIsWriteModalOpen(true);
            } else {
              handleOpenSymptomModal();
            }
          }}
          className="vibrant-mint-button w-14 h-14 rounded-full flex items-center justify-center text-white shadow-xl fab-pulse group hover:scale-110 transition-transform"
          title={activeTab === 'community' ? '새 글 작성하기' : '신속 증상 접수'}
        >
          <span className="material-symbols-outlined text-[28px] text-white">
            {activeTab === 'community' ? 'edit_square' : 'support_agent'}
          </span>
        </button>
      </div>

      {/* Bottom Navigation Bar */}
      <BottomNav
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    </div>
  );
}

