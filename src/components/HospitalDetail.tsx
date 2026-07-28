import React from 'react';
import { Hospital } from '../types';
import { INITIAL_HOSPITALS } from '../data/mockData';

interface HospitalDetailProps {
  hospital?: Hospital | null;
  onBack: () => void;
  onOpenSymptomModal: (hospital: Hospital) => void;
  onGoToCommunity: () => void;
}

export const HospitalDetail: React.FC<HospitalDetailProps> = ({
  hospital,
  onBack,
  onOpenSymptomModal,
  onGoToCommunity,
}) => {
  const currentHospital = hospital || INITIAL_HOSPITALS[0];

  return (
    <div className="relative -mt-8 animate-fadeIn">
      {/* Hero Header - Brighter Version (From HTML Screen 3) */}
      <header className="relative w-full h-[340px] md:h-[420px] rounded-3xl overflow-hidden shadow-md">
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-background via-transparent to-transparent"></div>
        <img
          alt={currentHospital.name}
          className="w-full h-full object-cover"
          src={currentHospital.imageUrl}
        />
        <div className="absolute top-6 left-6 z-20">
          <button
            onClick={onBack}
            className="light-glass w-11 h-11 rounded-full flex items-center justify-center text-on-surface hover:bg-white transition-colors shadow-sm"
            title="뒤로 가기"
          >
            <span className="material-symbols-outlined text-[20px]">arrow_back_ios_new</span>
          </button>
        </div>
      </header>

      {/* Content Canvas */}
      <main className="relative z-20 -mt-20 max-w-5xl mx-auto space-y-6">
        {/* Hospital Basic Info Bento */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-5">
          <div className="md:col-span-8 light-glass rounded-2xl p-6 md:p-8 shadow-sm border border-primary/20 bg-white/90">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold">
                    {currentHospital.statusText}
                  </span>
                  <div className="flex items-center text-primary bg-primary/5 px-2.5 py-0.5 rounded-full">
                    <span className="material-symbols-outlined text-[18px] font-variation-fill-1">star</span>
                    <span className="text-base font-bold ml-1">{currentHospital.rating}</span>
                  </div>
                </div>
                <h2 className="text-3xl font-extrabold text-on-surface mb-2">{currentHospital.name}</h2>
                <div className="flex items-center text-on-surface-variant gap-2 text-sm">
                  <span className="material-symbols-outlined text-[20px] text-primary">location_on</span>
                  <span>{currentHospital.address}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Interaction Box */}
          <div className="md:col-span-4 light-glass rounded-2xl p-6 flex flex-col justify-center items-center text-center gap-3 shadow-sm border border-primary/20 bg-white/90">
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="material-symbols-outlined text-primary text-[28px]">schedule</span>
            </div>
            <div>
              <p className="text-on-surface-variant text-xs font-bold uppercase tracking-wider mb-1">오늘 진료 종료</p>
              <p className="text-on-surface font-extrabold text-2xl">{currentHospital.closeTime}</p>
            </div>
          </div>
        </section>

        {/* Treatments & Specialties */}
        <section className="light-glass rounded-2xl p-6 md:p-8 shadow-sm border border-outline-variant/20 bg-white/90">
          <h3 className="text-xl font-bold text-on-surface mb-4">진료 과목</h3>
          <div className="flex flex-wrap gap-2">
            {currentHospital.departments.map((dept, idx) => (
              <span
                key={idx}
                className={`px-5 py-2 rounded-full text-xs font-bold shadow-xs ${
                  idx === 0 ? 'bg-primary text-white' : 'bg-surface-container text-on-surface-variant border border-outline-variant/30'
                }`}
              >
                {dept}
              </span>
            ))}
          </div>
          <div className="mt-6 pt-6 border-t border-primary/10">
            <p className="text-on-surface-variant text-base leading-relaxed">{currentHospital.description}</p>
          </div>
        </section>

        {/* Map Placeholder - Clean Version */}
        <section className="h-64 rounded-2xl overflow-hidden relative border border-primary/20 shadow-sm bg-surface-container-low">
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <div className="text-center p-6 rounded-2xl bg-white/90 backdrop-blur shadow-xl border border-primary/10 max-w-sm">
              <span className="material-symbols-outlined text-primary text-[40px] mb-2 font-variation-fill-1">location_on</span>
              <h4 className="text-on-surface font-bold text-base mb-1">{currentHospital.name} 오시는 길</h4>
              <p className="text-xs text-on-surface-variant mb-3">{currentHospital.address}</p>
              <button 
                onClick={() => alert('네이버 지도 / 카카오맵 안내 서비스로 연결됩니다.')}
                className="bg-primary/10 hover:bg-primary text-primary hover:text-white text-xs font-bold px-4 py-2 rounded-xl transition-all"
              >
                길찾기 안내
              </button>
            </div>
          </div>
          <div className="absolute inset-0 opacity-40 pointer-events-none">
            <img
              alt="Map of Seoul"
              className="w-full h-full object-cover brightness-105"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDgtIph5Qdu5HlYX6w3UBRfqe3m7NFFvjtY92u22Xcpsuxsf7RF3SWPQJVU9EA2gooMSWha08AYVH2fqWgb9PrZsW3Aj2aBVNc1keP_aztLFB1etPILFIA5VHgXIGUA_pwtG9ZjpafGkUz_iN1uCvnkwkUcXux6QYG8H4GlIr5CNOPGS2NiKx5b5KZtpUor4pM466NfpPsmFQj7auhknNnfdk5Xa1Kh5z8cnSlq8ySl9b8NPbUqX8iYKA"
            />
          </div>
        </section>

        {/* Reviews / Posts */}
        <section className="space-y-4 pb-20">
          <div className="flex justify-between items-end px-2">
            <h3 className="text-xl font-bold text-on-surface">최근 게시글 & 방문 리뷰</h3>
            <button 
              onClick={onGoToCommunity}
              className="text-primary text-xs font-bold hover:underline mb-1"
            >
              커뮤니티 후기 전체보기 →
            </button>
          </div>
          <div className="space-y-3">
            <div className="bg-white rounded-2xl p-5 hover:shadow-md transition-all cursor-pointer border border-primary/10 border-l-4 border-l-primary">
              <h4 className="text-on-surface font-bold text-sm mb-1">매우 친절하시고 설명도 자세해요!</h4>
              <p className="text-on-surface-variant text-xs line-clamp-1">갑작스러운 복통으로 방문했는데 선생님이 너무 친절하게 봐주셔서 금방 나았습니다.</p>
              <div className="mt-3 flex items-center gap-3 text-[11px] text-on-surface-variant/70">
                <span className="font-semibold">사용자 2039</span>
                <span className="w-1 h-1 rounded-full bg-primary/30"></span>
                <span>2시간 전</span>
                <span className="w-1 h-1 rounded-full bg-primary/30"></span>
                <span className="text-primary font-bold">⭐ 5.0</span>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-5 hover:shadow-md transition-all cursor-pointer border border-outline-variant/20">
              <h4 className="text-on-surface font-bold text-sm mb-1">시설이 정말 깨끗합니다.</h4>
              <p className="text-on-surface-variant text-xs line-clamp-1">병원 내부 인테리어가 정말 편안한 분위기라 대기하는 동안 불안하지 않았어요.</p>
              <div className="mt-3 flex items-center gap-3 text-[11px] text-on-surface-variant/70">
                <span className="font-semibold">사용자 9912</span>
                <span className="w-1 h-1 rounded-full bg-primary/30"></span>
                <span>어제</span>
                <span className="w-1 h-1 rounded-full bg-primary/30"></span>
                <span className="text-primary font-bold">⭐ 4.8</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Sticky Floating Action - Vibrant Mint (From HTML Screen 3) */}
      <div className="fixed bottom-20 left-0 right-0 p-4 z-40 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none">
        <div className="max-w-xl mx-auto pointer-events-auto">
          <button
            onClick={() => onOpenSymptomModal(currentHospital)}
            className="vibrant-mint-button w-full py-4 rounded-2xl flex items-center justify-center gap-3 group text-white font-extrabold text-lg shadow-xl"
          >
            <span>{currentHospital.name} 사전 접수하기 (실행)</span>
            <span className="material-symbols-outlined text-white group-hover:translate-x-1 transition-transform">send</span>
          </button>
        </div>
      </div>
    </div>
  );
};
