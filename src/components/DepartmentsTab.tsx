import React, { useState } from 'react';
import { Department } from '../types';
import { DEPARTMENTS } from '../data/mockData';

interface DepartmentsTabProps {
  onSelectDepartment: (deptName: string) => void;
  onOpenSymptomModal: (deptName?: string) => void;
}

export const DepartmentsTab: React.FC<DepartmentsTabProps> = ({
  onSelectDepartment,
  onOpenSymptomModal,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filtered = DEPARTMENTS.filter((d) => 
    d.name.includes(searchTerm) || d.description.includes(searchTerm)
  );

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Title */}
      <div className="bg-gradient-to-r from-primary/10 via-white to-transparent p-6 md:p-8 rounded-3xl border border-primary/10">
        <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary font-bold text-xs mb-2">
          종합 의료 센터
        </span>
        <h1 className="text-3xl md:text-4xl font-extrabold text-on-surface mb-2">전체 진료과 카테고리</h1>
        <p className="text-on-surface-variant text-sm md:text-base">
          12개 주요 전문 진료과의 세부 진료 내용과 의료진 현황을 확인하고 맞춤 사전 접수를 진행하세요.
        </p>

        {/* Search Input */}
        <div className="mt-6 max-w-md relative">
          <span className="material-symbols-outlined absolute left-3.5 top-3 text-on-surface-variant/70 text-[20px]">search</span>
          <input
            type="text"
            placeholder="진료과 이름이나 주요 질환(예: 감기, 비염, 관절) 검색..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-outline-variant/40 bg-white text-sm focus:ring-2 focus:ring-primary focus:border-primary text-on-surface shadow-xs"
          />
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {filtered.map((dept) => {
          const isSelected = selectedCategory === dept.id;
          return (
            <div
              key={dept.id}
              onClick={() => setSelectedCategory(isSelected ? null : dept.id)}
              className={`soft-card rounded-2xl p-6 cursor-pointer transition-all flex flex-col justify-between border ${
                isSelected ? 'border-primary ring-2 ring-primary/20 bg-primary/5' : 'border-outline-variant/20 hover:border-primary/50'
              }`}
            >
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-3xl font-variation-fill-1">{dept.icon}</span>
                  </div>
                  {dept.isPopular && (
                    <span className="px-2.5 py-0.5 rounded-full bg-primary-container text-on-primary-container text-[10px] font-bold">
                      인기
                    </span>
                  )}
                </div>
                <h3 className="text-xl font-bold text-on-surface mb-1.5">{dept.name}</h3>
                <p className="text-xs text-on-surface-variant leading-relaxed line-clamp-2">{dept.description}</p>
              </div>

              <div className="mt-6 pt-4 border-t border-outline-variant/10 flex justify-between items-center text-xs">
                <span className="font-semibold text-on-surface-variant/80">전문의 {dept.doctorCount}명 상주</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectDepartment(dept.name);
                    onOpenSymptomModal(dept.name);
                  }}
                  className="bg-primary/10 hover:bg-primary text-primary hover:text-white font-bold px-3 py-1.5 rounded-xl transition-all"
                >
                  사전 접수
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
