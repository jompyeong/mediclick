import React, { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { SymptomRegistration } from '../types';

interface MyInfoTabProps {
  onOpenSymptomModal: () => void;
  onGoToCommunity: () => void;
}

export const MyInfoTab: React.FC<MyInfoTabProps> = ({
  onOpenSymptomModal,
  onGoToCommunity,
}) => {
  const [registrations, setRegistrations] = useState<SymptomRegistration[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'symptom_registrations'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const loaded: SymptomRegistration[] = [];
        snapshot.forEach((docSnap) => {
          const data = docSnap.data();
          loaded.push({
            id: docSnap.id,
            patientName: data.patientName || '익명 환자',
            phone: data.phone || '',
            symptomText: data.symptomText || '',
            department: data.department || '내과',
            hospitalName: data.hospitalName || '서울스타메디컬센터',
            preferredDate: data.preferredDate || '',
            preferredTime: data.preferredTime || '',
            status: data.status || '접수완료',
            queueNumber: data.queueNumber || 3,
            createdAt: data.createdAt ? data.createdAt.toDate?.() || new Date() : new Date(),
          });
        });
        setRegistrations(loaded);
        setLoading(false);
      },
      (err) => {
        console.error('Registration fetch error:', err);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  return (
    <div className="space-y-8 animate-fadeIn max-w-4xl mx-auto">
      {/* Profile Header Card */}
      <div className="bg-gradient-to-r from-primary/10 via-white to-transparent p-6 md:p-8 rounded-3xl border border-primary/10 flex flex-col sm:flex-row items-center gap-6">
        <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center text-primary text-4xl font-extrabold ring-4 ring-white shadow-md">
          <span className="material-symbols-outlined text-[52px] font-variation-fill-1">person</span>
        </div>
        <div className="text-center sm:text-left flex-1">
          <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
            <span className="px-3 py-0.5 rounded-full bg-primary text-white text-xs font-bold">안심 회원</span>
            <span className="text-xs text-on-surface-variant font-semibold">MediClick VIP</span>
          </div>
          <h2 className="text-2xl font-extrabold text-on-surface">홍길동 님</h2>
          <p className="text-sm text-on-surface-variant mt-0.5">010-1234-5678 • 실시간 의료 커뮤니티 활동 중</p>
        </div>
        <button
          onClick={onOpenSymptomModal}
          className="vibrant-mint-button px-5 py-3 rounded-2xl text-white font-bold text-xs flex items-center gap-1.5 shadow-md shrink-0"
        >
          <span className="material-symbols-outlined text-[18px]">add_circle</span>
          <span>새 증상 접수하기</span>
        </button>
      </div>

      {/* Symptom Pre-registration History */}
      <section className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-bold text-on-surface flex items-center gap-2">
            <span className="material-symbols-outlined text-primary font-variation-fill-1">event_note</span>
            <span>나의 증상 사전 접수 내역 (Firestore 실시간)</span>
          </h3>
          <span className="text-xs font-bold text-primary px-2.5 py-1 rounded-full bg-primary/10">
            총 {registrations.length}건
          </span>
        </div>

        {loading ? (
          <div className="py-12 text-center">
            <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="text-xs text-on-surface-variant mt-2">접수 내역을 불러오는 중...</p>
          </div>
        ) : registrations.length === 0 ? (
          <div className="bg-white rounded-2xl p-10 text-center border border-outline-variant/20 space-y-3">
            <span className="material-symbols-outlined text-4xl text-outline-variant/60">event_busy</span>
            <h4 className="text-base font-bold text-on-surface">아직 사전 등록된 접수 내역이 없습니다.</h4>
            <p className="text-xs text-on-surface-variant max-w-sm mx-auto">
              현재 겪고 계신 증상을 미리 등록하시면 희망 병원에 즉시 접수되고 대기 시간을 줄일 수 있습니다.
            </p>
            <button
              onClick={onOpenSymptomModal}
              className="px-5 py-2 rounded-xl bg-primary/10 hover:bg-primary text-primary hover:text-white font-bold text-xs transition-all inline-flex items-center gap-1 mt-2"
            >
              <span>+ 증상 접수하러 가기</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {registrations.map((reg) => (
              <div key={reg.id} className="soft-card rounded-2xl p-5 border border-primary/20 space-y-3 relative overflow-hidden bg-white">
                <div className="absolute top-0 right-0 w-20 h-20 bg-primary/5 rounded-bl-full pointer-events-none"></div>
                
                <div className="flex justify-between items-start">
                  <div>
                    <span className="px-2.5 py-0.5 rounded-md bg-primary-container text-on-primary-container text-xs font-extrabold">
                      대기 {reg.queueNumber || 3}번
                    </span>
                    <h4 className="text-lg font-bold text-on-surface mt-1.5">{reg.hospitalName}</h4>
                    <p className="text-xs text-primary font-bold">{reg.department} 전문 진료</p>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-primary text-white text-xs font-bold">
                    {reg.status}
                  </span>
                </div>

                <div className="bg-surface-container-low rounded-xl p-3 text-xs space-y-1">
                  <div className="flex justify-between">
                    <span className="text-on-surface-variant">환자명:</span>
                    <span className="font-bold text-on-surface">{reg.patientName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-on-surface-variant">예약 일시:</span>
                    <span className="font-bold text-on-surface">{reg.preferredDate} {reg.preferredTime}</span>
                  </div>
                  <div className="pt-1 border-t border-outline-variant/20">
                    <span className="text-on-surface-variant block text-[11px]">등록 증상:</span>
                    <p className="font-medium text-on-surface mt-0.5 line-clamp-2">{reg.symptomText}</p>
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-1">
                  <button 
                    onClick={() => alert('예약 접수증이 문자로 발송되었습니다.')}
                    className="px-3 py-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface text-xs font-bold transition-colors"
                  >
                    접수증 확인
                  </button>
                  <button 
                    onClick={() => alert(`${reg.hospitalName} 진료 대기열에 등록되어 있습니다. 병원 안내 데스크에 도착 후 성함을 말씀해 주세요.`)}
                    className="px-3 py-1.5 rounded-lg bg-primary/10 hover:bg-primary text-primary hover:text-white text-xs font-bold transition-all"
                  >
                    대기 현황 새로고침
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Quick Community Shortcut */}
      <section className="bg-gradient-to-br from-[#006b5f] to-[#2dd4bf] text-white rounded-3xl p-6 md:p-8 flex flex-col sm:flex-row justify-between items-center gap-6 shadow-lg">
        <div>
          <span className="px-3 py-1 rounded-full bg-white/20 text-white font-bold text-xs mb-2 inline-block uppercase">
            커뮤니티 소통
          </span>
          <h3 className="text-2xl font-extrabold text-white">내가 작성한 의견과 답변 확인하기</h3>
          <p className="text-white/80 text-sm mt-1">
            다른 사용자나 전문 의료진이 남긴 실시간 답변과 건강 팁을 커뮤니티 게시판에서 확인하세요.
          </p>
        </div>
        <button
          onClick={onGoToCommunity}
          className="bg-white text-primary hover:bg-white/90 px-6 py-3.5 rounded-2xl font-extrabold text-sm transition-all shadow-md shrink-0 flex items-center gap-2"
        >
          <span>게시판 바로가기</span>
          <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
        </button>
      </section>
    </div>
  );
};
