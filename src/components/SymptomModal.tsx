import React, { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { Hospital, Department, SymptomRegistration } from '../types';
import { COMMON_SYMPTOMS } from '../data/mockData';

interface SymptomModalProps {
  isOpen: boolean;
  onClose: () => void;
  hospitals: Hospital[];
  departments: Department[];
  selectedHospital?: Hospital | null;
  onSuccess: (reg: SymptomRegistration) => void;
}

export const SymptomModal: React.FC<SymptomModalProps> = ({
  isOpen,
  onClose,
  hospitals,
  departments,
  selectedHospital,
  onSuccess,
}) => {
  const [patientName, setPatientName] = useState('');
  const [phone, setPhone] = useState('010-');
  const [selectedDept, setSelectedDept] = useState('내과');
  const [selectedHosp, setSelectedHosp] = useState(selectedHospital ? selectedHospital.name : '서울스타메디컬센터');
  const [symptomText, setSymptomText] = useState('');
  const [preferredDate, setPreferredDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  const [preferredTime, setPreferredTime] = useState('14:30');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [receipt, setReceipt] = useState<SymptomRegistration | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName.trim()) {
      setErrorMsg('환자 이름을 입력해주세요.');
      return;
    }
    if (!symptomText.trim()) {
      setErrorMsg('현재 겪고 계신 증상을 입력해주세요.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');

    const randomQueue = Math.floor(Math.random() * 5) + 1; // 1~5
    const regData: Omit<SymptomRegistration, 'id'> = {
      patientName: patientName.trim(),
      phone: phone.trim(),
      symptomText: symptomText.trim(),
      department: selectedDept,
      hospitalName: selectedHosp,
      preferredDate,
      preferredTime,
      status: '접수완료',
      createdAt: serverTimestamp(),
      queueNumber: randomQueue,
    };

    try {
      const docRef = await addDoc(collection(db, 'symptom_registrations'), regData);
      const savedReg: SymptomRegistration = {
        ...regData,
        id: docRef.id,
        createdAt: new Date(),
      };
      setReceipt(savedReg);
      onSuccess(savedReg);
    } catch (err: any) {
      console.error('Symptom registration error:', err);
      // Fallback local receipt if Firestore fails
      const savedReg: SymptomRegistration = {
        ...regData,
        id: 'local-' + Date.now(),
        createdAt: new Date(),
      };
      setReceipt(savedReg);
      onSuccess(savedReg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSymptomChipClick = (symptom: string) => {
    if (symptomText) {
      setSymptomText(symptomText + ' / ' + symptom);
    } else {
      setSymptomText(symptom);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 md:p-8 shadow-2xl border border-primary/20 max-h-[90vh] overflow-y-auto custom-scrollbar relative">
        {/* Close Button */}
        <button
          onClick={() => {
            setReceipt(null);
            onClose();
          }}
          className="absolute top-6 right-6 w-10 h-10 rounded-full bg-surface-container-low hover:bg-surface-container flex items-center justify-center text-on-surface-variant transition-colors"
        >
          <span className="material-symbols-outlined text-[20px]">close</span>
        </button>

        {!receipt ? (
          <>
            {/* Header */}
            <div className="mb-6">
              <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary font-bold text-xs mb-2">
                신속 사전 접수
              </span>
              <h3 className="text-2xl font-bold text-on-surface">증상 사전 등록 및 접수</h3>
              <p className="text-sm text-on-surface-variant mt-1">
                증상을 미리 등록하면 대기 시간을 줄이고 맞춤 진료과로 바로 연결됩니다.
              </p>
            </div>

            {errorMsg && (
              <div className="mb-4 p-3 rounded-xl bg-error-container/40 border border-[#ba1a1a]/30 text-[#ba1a1a] text-xs flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">error</span>
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Hospital & Department selection */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-on-surface-variant mb-1">희망 병원</label>
                  <select
                    value={selectedHosp}
                    onChange={(e) => setSelectedHosp(e.target.value)}
                    className="w-full rounded-xl border border-outline-variant/40 bg-surface-container-low px-3 py-2 text-sm font-medium focus:ring-2 focus:ring-primary focus:border-primary text-on-surface"
                  >
                    {hospitals.map((h) => (
                      <option key={h.id} value={h.name}>
                        {h.name} ({h.badge})
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-on-surface-variant mb-1">진료과 선택</label>
                  <select
                    value={selectedDept}
                    onChange={(e) => setSelectedDept(e.target.value)}
                    className="w-full rounded-xl border border-outline-variant/40 bg-surface-container-low px-3 py-2 text-sm font-medium focus:ring-2 focus:ring-primary focus:border-primary text-on-surface"
                  >
                    {departments.map((d) => (
                      <option key={d.id} value={d.name}>
                        {d.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Patient Info */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-on-surface-variant mb-1">환자 성함 <span className="text-error">*</span></label>
                  <input
                    type="text"
                    required
                    placeholder="홍길동"
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    className="w-full rounded-xl border border-outline-variant/40 px-3 py-2 text-sm focus:ring-2 focus:ring-primary focus:border-primary text-on-surface"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-on-surface-variant mb-1">연락처</label>
                  <input
                    type="tel"
                    placeholder="010-1234-5678"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full rounded-xl border border-outline-variant/40 px-3 py-2 text-sm focus:ring-2 focus:ring-primary focus:border-primary text-on-surface"
                  />
                </div>
              </div>

              {/* Date & Time */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-on-surface-variant mb-1">희망 진료 일자</label>
                  <input
                    type="date"
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    className="w-full rounded-xl border border-outline-variant/40 px-3 py-2 text-sm focus:ring-2 focus:ring-primary focus:border-primary text-on-surface"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-on-surface-variant mb-1">희망 방문 시간</label>
                  <input
                    type="time"
                    value={preferredTime}
                    onChange={(e) => setPreferredTime(e.target.value)}
                    className="w-full rounded-xl border border-outline-variant/40 px-3 py-2 text-sm focus:ring-2 focus:ring-primary focus:border-primary text-on-surface"
                  />
                </div>
              </div>

              {/* Symptoms Input */}
              <div>
                <label className="block text-xs font-bold text-on-surface-variant mb-1">
                  증상 상세 입력 <span className="text-error">*</span>
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="예: 어제 밤부터 열이 나고 목이 따끔거립니다. 체온은 38.2도입니다."
                  value={symptomText}
                  onChange={(e) => setSymptomText(e.target.value)}
                  className="w-full rounded-xl border border-outline-variant/40 px-3 py-2 text-sm focus:ring-2 focus:ring-primary focus:border-primary text-on-surface resize-none placeholder:text-on-surface-variant/40"
                ></textarea>
              </div>

              {/* Common Symptom Chips */}
              <div>
                <label className="block text-[11px] font-bold text-on-surface-variant/70 mb-1.5">
                  💡 자주 겪는 증상 선택 (클릭시 자동 추가)
                </label>
                <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto pr-1">
                  {COMMON_SYMPTOMS.map((sym, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSymptomChipClick(sym)}
                      className="text-[11px] px-2.5 py-1 rounded-lg bg-surface-container-low hover:bg-primary/10 hover:text-primary text-on-surface-variant border border-outline-variant/20 transition-all text-left truncate max-w-[200px]"
                    >
                      + {sym}
                    </button>
                  ))}
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="vibrant-mint-button w-full py-3.5 rounded-xl text-white font-bold text-base flex items-center justify-center gap-2 shadow-lg shadow-primary/30 active:scale-95 transition-all"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                      <span>접수 중...</span>
                    </span>
                  ) : (
                    <>
                      <span>증상 등록 및 접수하기 (실행)</span>
                      <span className="material-symbols-outlined text-[20px]">send</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </>
        ) : (
          /* Receipt Modal */
          <div className="text-center py-4 space-y-5">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto text-primary">
              <span className="material-symbols-outlined text-4xl font-variation-fill-1">check_circle</span>
            </div>
            <div>
              <span className="px-3 py-1 bg-primary text-white text-xs font-bold rounded-full uppercase tracking-wider">
                접수 완료
              </span>
              <h3 className="text-2xl font-extrabold text-on-surface mt-2">사전 접수가 완료되었습니다!</h3>
              <p className="text-sm text-on-surface-variant mt-1">
                등록해주신 증상 정보가 {receipt.hospitalName} ({receipt.department})에 안전하게 전달되었습니다.
              </p>
            </div>

            {/* Ticket Box */}
            <div className="bg-surface-container-low border border-primary/20 rounded-2xl p-5 text-left space-y-3 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-full pointer-events-none"></div>
              <div className="flex justify-between items-center border-b border-outline-variant/20 pb-2">
                <span className="text-xs text-on-surface-variant font-semibold">대기 순번</span>
                <span className="text-2xl font-extrabold text-primary">대기 {receipt.queueNumber || 3}번</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-on-surface-variant block">환자명</span>
                  <span className="font-bold text-on-surface">{receipt.patientName} 님</span>
                </div>
                <div>
                  <span className="text-on-surface-variant block">진료 기관</span>
                  <span className="font-bold text-on-surface">{receipt.hospitalName} ({receipt.department})</span>
                </div>
                <div>
                  <span className="text-on-surface-variant block">방문 일시</span>
                  <span className="font-bold text-on-surface">{receipt.preferredDate} {receipt.preferredTime}</span>
                </div>
                <div>
                  <span className="text-on-surface-variant block">접수 상태</span>
                  <span className="font-bold text-primary">{receipt.status}</span>
                </div>
              </div>
              <div className="pt-2 border-t border-outline-variant/20">
                <span className="text-[11px] text-on-surface-variant block">등록 증상:</span>
                <p className="text-xs font-medium text-on-surface mt-0.5 line-clamp-2">{receipt.symptomText}</p>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => {
                  setReceipt(null);
                  onClose();
                }}
                className="w-full py-3 rounded-xl bg-surface-container text-on-surface font-bold text-sm hover:bg-surface-container-high transition-colors"
              >
                닫기
              </button>
              <button
                onClick={() => {
                  setReceipt(null);
                  onClose();
                  // Trigger open my info tab
                }}
                className="w-full py-3 rounded-xl bg-primary text-white font-bold text-sm shadow-md shadow-primary/20 hover:opacity-90 transition-all"
              >
                내 접수내역 보기
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
