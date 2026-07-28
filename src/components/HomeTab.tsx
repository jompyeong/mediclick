import React from 'react';
import { Hospital, Department } from '../types';
import { INITIAL_HOSPITALS, DEPARTMENTS } from '../data/mockData';

interface HomeTabProps {
  onOpenSymptomModal: (hospital?: Hospital) => void;
  onSelectHospital: (hospital: Hospital) => void;
  onSelectDepartment: (deptName: string) => void;
  onGoToCommunity: () => void;
}

export const HomeTab: React.FC<HomeTabProps> = ({
  onOpenSymptomModal,
  onSelectHospital,
  onSelectDepartment,
  onGoToCommunity,
}) => {
  const hospitalA = INITIAL_HOSPITALS[0];
  const hospitalB = INITIAL_HOSPITALS[1];
  const hospitalC = INITIAL_HOSPITALS[2];
  const hospitalD = INITIAL_HOSPITALS[3];

  return (
    <div className="space-y-12 animate-fadeIn">
      {/* Hero Section */}
      <section className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 bg-gradient-to-r from-primary/10 via-white to-transparent p-6 md:p-8 rounded-3xl border border-primary/10 shadow-sm">
        <div className="max-w-2xl">
          <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary font-bold text-xs mb-3">
            🏥 신속 진료과 & 맞춤 병원 추천
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-on-surface mb-3 leading-tight">
            어떤 증상으로 병원에 가시나요?
          </h2>
          <p className="text-on-surface-variant text-base md:text-lg leading-relaxed">
            현재 겪고 계신 증상을 선택하시거나 미리 등록하시면 최적의 진료과와 전문 병원을 즉시 연결하고 신속하게 접수해 드립니다.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
          <button
            onClick={() => onOpenSymptomModal()}
            className="vibrant-mint-button px-6 py-4 rounded-2xl text-white font-bold text-base flex items-center justify-center gap-2 shadow-lg shadow-primary/30 hover:scale-105 transition-all w-full sm:w-auto"
          >
            <span className="material-symbols-outlined text-[24px]">support_agent</span>
            <span>내 증상 등록 및 접수 (실행)</span>
          </button>
        </div>
      </section>

      {/* Hospital Bento Grid (From HTML Screen 1 & Screen 4) */}
      <section>
        <div className="flex justify-between items-end mb-6">
          <div>
            <h3 className="text-2xl font-bold text-on-surface flex items-center gap-2">
              <span>추천 전문 병원</span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-primary/10 text-primary font-bold">Best Match</span>
            </h3>
            <p className="text-sm text-on-surface-variant mt-0.5">실시간 평점 및 진료 특화 시스템 기반 맞춤 안내</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Hospital A (Large Best Match Card) */}
          <div 
            onClick={() => onSelectHospital(hospitalA)}
            className="md:col-span-8 group relative overflow-hidden rounded-3xl misty-glass hospital-card-gradient p-6 md:p-8 cursor-pointer transition-all duration-300 shadow-sm hover:shadow-xl border border-primary/20 flex flex-col justify-between min-h-[320px]"
          >
            <div className="relative z-20">
              <div className="flex items-center gap-2 mb-4">
                <span className="bg-primary-container text-on-primary-container px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider">
                  {hospitalA.badge}
                </span>
                <span className="flex items-center text-primary font-bold text-sm bg-white/80 px-2.5 py-0.5 rounded-full shadow-xs">
                  <span className="material-symbols-outlined text-sm mr-1 font-variation-fill-1">star</span> 
                  {hospitalA.rating}
                </span>
                <span className="text-xs text-on-surface-variant font-medium bg-surface-container px-2.5 py-0.5 rounded-full">
                  {hospitalA.statusText}
                </span>
              </div>
              <h3 className="text-2xl md:text-3xl font-extrabold mb-2 text-on-surface group-hover:text-primary transition-colors">
                {hospitalA.name}
              </h3>
              <p className="text-on-surface-variant font-medium text-sm md:text-base max-w-md leading-relaxed mb-4">
                {hospitalA.description}
              </p>
              <div className="flex flex-wrap gap-1.5 mb-6">
                {hospitalA.departments.map((d, i) => (
                  <span key={i} className="text-xs px-2.5 py-1 rounded-lg bg-surface-container-high font-semibold text-on-surface-variant">
                    #{d}
                  </span>
                ))}
              </div>
            </div>

            <div className="relative z-20 flex items-center gap-3 mt-4 pt-4 border-t border-outline-variant/10">
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenSymptomModal(hospitalA);
                }}
                className="bg-primary hover:bg-primary/90 text-white font-bold px-8 py-3.5 rounded-2xl transition-all active:scale-95 shadow-lg shadow-primary/25 flex items-center gap-2 text-sm"
              >
                <span>실행 (사전 접수하기)</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectHospital(hospitalA);
                }}
                className="bg-white/90 hover:bg-white text-on-surface font-bold px-5 py-3.5 rounded-2xl border border-outline-variant/30 text-sm transition-all"
              >
                상세 정보
              </button>
            </div>

            <div className="absolute top-0 right-0 w-full sm:w-1/2 h-full opacity-30 sm:opacity-70 group-hover:opacity-90 transition-opacity pointer-events-none">
              <img src={hospitalA.imageUrl} alt={hospitalA.name} className="w-full h-full object-cover rounded-l-3xl" />
              <div className="absolute inset-0 bg-gradient-to-r from-white via-white/40 to-transparent sm:block hidden"></div>
            </div>
          </div>

          {/* Hospital B */}
          <div 
            onClick={() => onSelectHospital(hospitalB)}
            className="md:col-span-4 group relative overflow-hidden rounded-3xl misty-glass hospital-card-gradient p-6 cursor-pointer transition-all duration-300 shadow-sm hover:shadow-xl border border-outline-variant/20 flex flex-col justify-between"
          >
            <div className="relative z-20">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-bold text-primary bg-primary/10 px-2.5 py-0.5 rounded-full">{hospitalB.badge}</span>
                <span className="flex items-center text-primary font-bold text-xs"><span className="material-symbols-outlined text-xs mr-0.5 font-variation-fill-1">star</span> {hospitalB.rating}</span>
              </div>
              <h3 className="text-2xl font-bold mb-2 text-on-surface group-hover:text-primary transition-colors">{hospitalB.name}</h3>
              <p className="text-on-surface-variant text-sm mb-6 leading-relaxed">{hospitalB.description}</p>
              <div className="flex flex-wrap gap-1 mb-4">
                {hospitalB.features.map((f, idx) => (
                  <span key={idx} className="text-[11px] bg-secondary-container/60 text-on-secondary-container px-2 py-0.5 rounded-md font-semibold">
                    {f}
                  </span>
                ))}
              </div>
            </div>
            <button className="w-full bg-white border border-outline-variant/30 text-on-surface font-bold py-3 rounded-xl hover:bg-surface-container-low transition-all text-sm flex items-center justify-center gap-1">
              <span>상세 정보</span>
              <span className="material-symbols-outlined text-[16px]">chevron_right</span>
            </button>
          </div>

          {/* Hospital C */}
          <div 
            onClick={() => onSelectHospital(hospitalC)}
            className="md:col-span-5 group relative overflow-hidden rounded-3xl misty-glass hospital-card-gradient p-6 cursor-pointer transition-all duration-300 shadow-sm hover:shadow-xl border border-outline-variant/20 flex flex-col justify-between"
          >
            <div className="relative z-20">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-bold text-primary bg-primary/10 px-2.5 py-0.5 rounded-full">{hospitalC.badge}</span>
                <span className="flex items-center text-primary font-bold text-xs"><span className="material-symbols-outlined text-xs mr-0.5 font-variation-fill-1">star</span> {hospitalC.rating}</span>
              </div>
              <h3 className="text-2xl font-bold mb-2 text-on-surface group-hover:text-primary transition-colors">{hospitalC.name}</h3>
              <p className="text-on-surface-variant text-sm mb-4">{hospitalC.description}</p>
              <div className="flex gap-2">
                {hospitalC.features.map((f, idx) => (
                  <span key={idx} className="text-xs bg-secondary-container text-on-secondary-container px-2.5 py-1 rounded-lg font-bold">
                    {f}
                  </span>
                ))}
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-outline-variant/10 flex justify-between items-center text-xs text-primary font-bold">
              <span>협진 전문 의료진 12명</span>
              <span>바로가기 →</span>
            </div>
          </div>

          {/* Hospital D */}
          <div 
            onClick={() => onSelectHospital(hospitalD)}
            className="md:col-span-7 group relative overflow-hidden rounded-3xl misty-glass hospital-card-gradient p-6 cursor-pointer transition-all duration-300 shadow-sm hover:shadow-xl border border-outline-variant/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          >
            <div className="relative z-20 flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-bold text-primary bg-primary/10 px-2.5 py-0.5 rounded-full">{hospitalD.badge}</span>
                <span className="flex items-center text-primary font-bold text-xs"><span className="material-symbols-outlined text-xs mr-0.5 font-variation-fill-1">star</span> {hospitalD.rating}</span>
              </div>
              <h3 className="text-2xl font-bold mb-2 text-on-surface group-hover:text-primary transition-colors">{hospitalD.name}</h3>
              <p className="text-on-surface-variant text-sm mb-3">{hospitalD.description}</p>
              <div className="flex flex-wrap gap-1.5">
                {hospitalD.features.map((f, idx) => (
                  <span key={idx} className="text-[11px] bg-primary/5 text-primary border border-primary/20 px-2 py-0.5 rounded font-bold">
                    {f}
                  </span>
                ))}
              </div>
            </div>
            <div className="h-28 w-full sm:w-40 rounded-2xl overflow-hidden relative shrink-0 border border-outline-variant/10 shadow-sm">
              <img src={hospitalD.imageUrl} alt={hospitalD.name} className="w-full h-full object-cover group-hover:scale-105 transition-all" />
            </div>
          </div>
        </div>
      </section>

      {/* Department Selection Bento & Horizontal List (From HTML Screen 1 & Screen 4) */}
      <section>
        <div className="flex justify-between items-end mb-5">
          <div>
            <h3 className="text-2xl font-bold text-on-surface">진료과 선택</h3>
            <p className="text-sm text-on-surface-variant mt-0.5">신속하고 정확한 진단을 위한 12개 주요 진료과 안내</p>
          </div>
          <button 
            onClick={() => onSelectDepartment('전체')}
            className="text-sm text-primary font-bold flex items-center hover:underline"
          >
            전체 카테고리 보기 <span className="material-symbols-outlined text-sm ml-1">chevron_right</span>
          </button>
        </div>

        {/* Bento Top Row (내과, 소아과, 피부과, 정형외과, 이비인후과) */}
        <div className="grid grid-cols-2 md:grid-cols-12 gap-4 mb-6">
          {/* Internal Medicine */}
          <div 
            onClick={() => onSelectDepartment('내과')}
            className="col-span-2 md:col-span-5 group cursor-pointer glass-card rounded-3xl p-6 md:p-8 flex flex-col justify-end relative overflow-hidden min-h-[220px]"
          >
            <div className="absolute top-0 right-0 p-6 text-primary/10 group-hover:text-primary/20 transition-colors pointer-events-none">
              <span className="material-symbols-outlined text-8xl font-variation-fill-1">stethoscope</span>
            </div>
            <div className="relative z-10">
              <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary font-bold text-xs mb-3">
                인기 진료과
              </span>
              <h4 className="text-2xl font-bold text-on-surface group-hover:text-primary transition-colors">내과</h4>
              <p className="text-on-surface-variant text-sm mt-1 max-w-sm">감기, 위장 질환부터 만성 질환 관리까지 종합적인 건강 진단</p>
            </div>
          </div>

          {/* Pediatrics */}
          <div 
            onClick={() => onSelectDepartment('소아과')}
            className="col-span-1 md:col-span-3 group cursor-pointer glass-card rounded-3xl p-6 flex flex-col items-center justify-center text-center relative overflow-hidden min-h-[220px]"
          >
            <div className="bg-secondary-container/50 w-14 h-14 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-primary text-3xl">child_care</span>
            </div>
            <h4 className="text-lg font-bold text-on-surface group-hover:text-primary transition-colors">소아과</h4>
            <p className="text-on-surface-variant text-xs mt-1">우리 아이의 밝은 미소</p>
          </div>

          {/* Dermatology */}
          <div 
            onClick={() => onSelectDepartment('피부과')}
            className="col-span-1 md:col-span-4 group cursor-pointer glass-card rounded-3xl p-6 flex flex-col items-center justify-center text-center relative overflow-hidden min-h-[220px]"
          >
            <div className="bg-primary/10 w-14 h-14 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-primary text-3xl">face</span>
            </div>
            <h4 className="text-lg font-bold text-on-surface group-hover:text-primary transition-colors">피부과</h4>
            <p className="text-on-surface-variant text-xs mt-1">투명하고 건강한 피부</p>
          </div>
        </div>

        {/* Horizontal Chips for all departments */}
        <div className="flex flex-wrap gap-2 pt-2">
          {DEPARTMENTS.map((dept) => (
            <button
              key={dept.id}
              onClick={() => onSelectDepartment(dept.name)}
              className="px-5 py-2.5 rounded-full bg-white text-on-surface border border-outline-variant/30 hover:border-primary hover:bg-primary/5 transition-all text-xs font-bold flex items-center gap-1.5 shadow-xs"
            >
              <span className="material-symbols-outlined text-[16px] text-primary">{dept.icon}</span>
              <span>{dept.name}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Featured Health Articles / Board Preview (From HTML Screen 1 & Screen 4) */}
      <section>
        <div className="flex items-end justify-between mb-6">
          <div>
            <h3 className="text-2xl font-bold text-on-surface">건강 게시글 & 소식</h3>
            <p className="text-sm text-on-surface-variant mt-0.5">전문가들이 전하는 최신 의료 정보 및 커뮤니티 인기글</p>
          </div>
          <button
            onClick={onGoToCommunity}
            className="text-sm text-primary font-bold flex items-center hover:underline"
          >
            커뮤니티 게시판 전체보기 <span className="material-symbols-outlined text-sm ml-1">chevron_right</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div 
            onClick={onGoToCommunity}
            className="glass-card rounded-2xl p-6 flex items-center group cursor-pointer border border-outline-variant/20"
          >
            <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 mr-5 bg-surface-container">
              <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCvoC7wc4ghMjVrH7xJu8Hn9tk2PryBqf92cYwJql-ANhMP_Js-7ZqfSfllDiJXm5zUc1f5ARiBrKlmd7SuRKAFmw1kIE_Ax4T_LXUTwVS-cvP-btwxrzenpAGUdiMWY6trtVtwcF1YLvU_so1fBSff3T3G0ft7sMJj4IDWlu8Te57hCsi76sd__3T6RLuRyAr7g41Qke1drsuajp-k9R7IsYxhZIA3Q85maiKbDUG6OJr-O5fxbLTSDA" alt="Thumb" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
            </div>
            <div className="flex-1">
              <span className="text-[11px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded mb-1.5 inline-block">정형외과 • 추천글</span>
              <h4 className="text-base font-bold text-on-surface group-hover:text-primary transition-colors line-clamp-1">여름철 습기 속 피부 및 관절 건강 관리법</h4>
              <p className="text-on-surface-variant text-xs mt-1 line-clamp-2">장마철 높은 습도로 인한 트러블과 통증을 예방하는 5가지 핵심 습관</p>
            </div>
          </div>

          <div 
            onClick={onGoToCommunity}
            className="glass-card rounded-2xl p-6 flex items-center group cursor-pointer border border-outline-variant/20"
          >
            <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 mr-5 bg-surface-container">
              <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCDZc1ndnm-qFxQvnvMQaUkme7cx8AsNM_MudUnYZVy3z1FL1L0nkQ4WFi5GfesneV7p-aUfczHXFM1PyNSEx571jWJtEHCbf-dp50vUQjxX3jiua7cOrMKIZbvWqnQNVXToYEEGpAW21JKlGpcYUzdam7CEXYR2QUFq-7aHZmKNXxq5apLPttsyjts656UYScJ-5_FwwSPQsyrtoexKKyhJZRd1w1mMu9RZVGPTIIaPgUDHmyjLwvNLw" alt="Thumb" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
            </div>
            <div className="flex-1">
              <span className="text-[11px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded mb-1.5 inline-block">건강정보 • 2시간 전</span>
              <h4 className="text-base font-bold text-on-surface group-hover:text-primary transition-colors line-clamp-1">환절기 비염 및 면역력 예방 가이드</h4>
              <p className="text-on-surface-variant text-xs mt-1 line-clamp-2">갑작스러운 기온 변화와 습도로 인한 호흡기 증상을 완화하는 생활 팁</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
