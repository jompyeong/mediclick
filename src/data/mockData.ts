import { Hospital, Department, Post } from '../types';

export const INITIAL_HOSPITALS: Hospital[] = [
  {
    id: 'hospital-a',
    name: '서울스타메디컬센터',
    rating: 4.9,
    statusText: '운영중',
    badge: 'Best Match',
    description: '최첨단 의료 장비와 전문 의료진이 상주하는 종합 메디컬 센터입니다. 24시간 응급 진료가 가능합니다.',
    address: '서울특별시 강남구 테헤란로 123, 4층',
    closeTime: '오후 6:30',
    departments: ['내과', '이비인후과', '소아과', '가정의학과', '정형외과'],
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBYxREyd9_izKl7f270DBT40l1uNdOGlWK1ZtY_zcnHJXRX3Mt4Je0iBiqaRrBtf4tlcNwkhTPQIDdZJXC9x-f1fL9EN-TTbLaR9lycZkpJgyWBaUJPugasURlhPszWa7mfsCgRI0YJLQu6dMzqQG9Z-jadraIBWvkdv7ELok7VirCgPS5J29hGYWoZJdtOf0VHr4i2By_3qmautB26-rB9FZygHC_pHdr12gqXQNREousbNzrge8lGDA',
    features: ['24시간 응급', '최첨단 MRI', '협진 시스템']
  },
  {
    id: 'hospital-b',
    name: '강남밝은미래의원',
    rating: 4.8,
    statusText: '운영중',
    badge: '지역거점',
    description: '친절한 상담과 세심한 케어가 돋보이는 지역 거점 의원입니다.',
    address: '서울특별시 서초구 서초대로 45, 2층',
    closeTime: '오후 7:00',
    departments: ['내과', '가정의학과', '소아과'],
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDbPOlSXeevtHZLRhbouavgnUOwp_edF63EW8Kne-Kz8Y1OTc5WTlUeT-C146NjUQdMqUqOf08LIvA0jSlByE1o17aJQ8gg94MNmlpmhVpI-qDsGFD6g6b1vBuYS3duSrgUHloC32hlitjgvdrXVXg0yq48zcK7wUwnhZmSJJHzSJSLc-lU3KhUlp-k83YQ6bTIFnzU1D671IgjbvATJ0Cq0ZshyKK3e4JB_9TB4VcqXFHJD37lXfmTMQ',
    features: ['야간진료', '주차가능', '친절상담']
  },
  {
    id: 'hospital-c',
    name: '잠실원스톱연합의원',
    rating: 4.8,
    statusText: '야간진료',
    badge: '원스톱협진',
    description: '피부과 및 내과 전문의 협진 시스템으로 정확하고 빠른 치료를 제공합니다.',
    address: '서울특별시 송파구 올림픽로 300, 5층',
    closeTime: '오후 8:30',
    departments: ['피부과', '내과', '이비인후과'],
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAeidcHP-S3P0TllOIvLSFQ5UQ4C5JPLOaevWPjWHPGESo2RJRJwVDZH3KMyrxvn_Bt45UMNt9okY12nXOcJUThliQxgmf0TsWdHlR3_wQ2PXOZ7TcbLEpZDM8N4lyNeWhzfHHYaslRCqMBiyorFHb28s1lRa2KB_kFuZ38VpvAR7F9wTewJVR6PRoe55WzxErNf2dLkwSFJxksIA6rtiQQ4jxKmyMnYjSURcUekNiKVHPS7wzyvwPJ0w',
    features: ['야간진료', '주차가능', '원스톱협진']
  },
  {
    id: 'hospital-d',
    name: '마포푸른소아청소년과병원',
    rating: 4.9,
    statusText: '운영중',
    badge: '영유아특화',
    description: '영유아 및 청소년 전문 클리닉으로 아이와 부모 모두 편안한 환경을 제공합니다.',
    address: '서울특별시 마포구 양화로 160, 3층',
    closeTime: '오후 6:00',
    departments: ['소아과', '이비인후과', '피부과'],
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCKW800wnLl3krVeLrQ3DJJgEc_OzL4csU8ENcO7E1Spjkkqy75uyEQp34rdNpjSN94xK3YTf4OTE1kFUktjiHIm34Q0kW0kLLPmyOrPm0BUEt7r-_IU-Pm_TU-FPG1JRKZkdxiWzihB03z6u4-YaFoHcHlTYJwPTfnJJ1jfS4ErP1vegEPqsBbdT_FQBtwq3Ay4ACxtzVVwh_NkPWzlxctIpLOQTeQA7gMsxk_02bRiuPctdpqc2Jbkw',
    features: ['영유아전문', '놀이방완비', '예방접종']
  }
];

export const DEPARTMENTS: Department[] = [
  { id: 'internal', name: '내과', icon: 'stethoscope', description: '감기, 위장 질환부터 만성 질환 관리까지 종합적인 건강 진단', isPopular: true, doctorCount: 15 },
  { id: 'pediatrics', name: '소아과', icon: 'child_care', description: '우리 아이의 밝은 미소와 성장 관리', isPopular: true, doctorCount: 8 },
  { id: 'dermatology', name: '피부과', icon: 'face', description: '투명하고 건강한 피부 및 알레르기 케어', isPopular: true, doctorCount: 12 },
  { id: 'orthopedics', name: '정형외과', icon: 'format_h4', description: '관절 및 척추 전문 진료 및 물리치료', isPopular: false, doctorCount: 14 },
  { id: 'ent', name: '이비인후과', icon: 'hearing', description: '귀, 코, 목 관련 전문 비염/호흡기 클리닉', isPopular: true, doctorCount: 10 },
  { id: 'dental', name: '치과', icon: 'dentistry', description: '구강 건강 및 교정, 임플란트 전문 진료', isPopular: false, doctorCount: 9 },
  { id: 'ophthalmology', name: '안과', icon: 'visibility', description: '시력 검진 및 안질환 정밀 진료', isPopular: false, doctorCount: 6 },
  { id: 'psychiatry', name: '정신건강의학과', icon: 'psychology', description: '스트레스, 수면 장애 및 심리 상담 케어', isPopular: false, doctorCount: 7 },
  { id: 'obgyn', name: '산부인과', icon: 'pregnant_woman', description: '여성 건강 및 산전/산후 맞춤 케어', isPopular: false, doctorCount: 8 },
  { id: 'urology', name: '비뇨의학과', icon: 'nephrology', description: '비뇨기계 및 전립선 정밀 검진', isPopular: false, doctorCount: 5 },
  { id: 'neurology', name: '신경과', icon: 'neurology', description: '두통, 어지럼증 및 뇌신경 정밀 분석', isPopular: false, doctorCount: 6 },
  { id: 'emergency', name: '응급의학과', icon: 'emergency', description: '24시간 365일 신속한 응급 환자 진료', isPopular: false, doctorCount: 20 }
];

export const DEFAULT_COMMUNITY_POSTS: Omit<Post, 'id' | 'createdAt'>[] = [
  {
    category: '정형외과',
    title: '습한 여름철, 관절 통증을 완화하는 5가지 생활 습관',
    content: '장마철 높은 습도는 관절 내 압력을 변화시켜 통증을 유발할 수 있습니다. 집안 습도를 50% 내외로 유지하고 적절한 온찜질을 병행하는 것이 중요합니다. 특히 에어컨 바람이 관절에 직접 닿지 않도록 얇은 가디건이나 담요를 덮는 습관을 들여보세요.',
    author: '김지수 전문의 (서울스타메디컬센터 정형외과)',
    department: '정형외과',
    likes: 152,
    commentsCount: 34,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCvoC7wc4ghMjVrH7xJu8Hn9tk2PryBqf92cYwJql-ANhMP_Js-7ZqfSfllDiJXm5zUc1f5ARiBrKlmd7SuRKAFmw1kIE_Ax4T_LXUTwVS-cvP-btwxrzenpAGUdiMWY6trtVtwcF1YLvU_so1fBSff3T3G0ft7sMJj4IDWlu8Te57hCsi76sd__3T6RLuRyAr7g41Qke1drsuajp-k9R7IsYxhZIA3Q85maiKbDUG6OJr-O5fxbLTSDA',
    isPopular: true
  },
  {
    category: '피부과',
    title: '마스크 속 피부 트러블, 비 오는 날 더 심해지나요?',
    content: '습도가 높으면 피부 표면의 유수분 밸런스가 무너지기 쉽습니다. 특히 마스크 내부는 온도가 더 높아져 세균 번식이 활발해지는데, 귀가 후에는 약산성 클렌저로 부드럽게 세안하고 진정 알로에 젤이나 통기성이 좋은 모이스처라이저를 사용하는 것을 추천합니다.',
    author: '피부지킴이',
    department: '피부과',
    likes: 124,
    commentsCount: 42,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBukZqRK_1adNrH-atp2HojPfKRXcQ-f8LLtNct8-LRlsylSqGD9T3L3A6Y2Yzwax88oTYBy-Ur_dZ5R4fgj6bNpqIrdJN9YxdTgj8NFNgnicIvWvNWae0bnpzmYjh_hE1jPDIkAPbgjew0CerRjTGgEowKNYCDrlWE32qVWDuyq8hJdXONUbhqsX3egSn3haPZ-mrty6ZppJ_AfSauSo9ErU2OFSAUuXk0-ZE9GdQvP-ik9Q5goYRj_g',
    isPopular: false
  },
  {
    category: '영양/건강',
    title: '비 오는 날 생각나는 파전과 막걸리, 건강에는 어떨까?',
    content: '밀가루의 아미노산 성분이 일시적으로 우울감을 해소해줄 수 있지만, 튀긴 음식의 과도한 나트륨과 알코올은 숙면을 방해하고 위장에 부담을 줄 수 있습니다. 부추나 해물 등 천연 식재료의 비중을 높이고 기름을 적게 둘러 굽는 것이 건강에 좋습니다.',
    author: '웰빙영양사',
    department: '내과',
    likes: 89,
    commentsCount: 18,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB7cCc9eah7D4ZYjL1SIlfV6HzeBNLl8sDhUscBeL2e5rO6P7X9ndQx-ufXFAVMR6lKtLYt3CiiMi7L_Ig5XfMd7QgAjGoO196CLfaV-lRPaK07RwAcKzDzRdC_HHpNgzOSh6122QHVaDcsrVnRkBY9G52uIJRahhue7z2qV_RAEq9SAPHSUyRJaqpz2eGEOkgDFuCsFvxSNyBObgZHo-GVWI5Un8ew8WvaiMp2njsA7OZhZaMobXT4CQ',
    isPopular: false
  },
  {
    category: '내과',
    title: '냉방병과 감기, 어떻게 구분하나요?',
    content: '여름철 실내외 온도차가 5도 이상 벌어지면 자율신경계에 무리가 갑니다. 냉방병은 두통과 소화불량, 피로감을 동반하는 경우가 많으며 일반 감기보다 콧물과 소화계 증상이 뚜렷하게 나타납니다. 에어컨 설정 온도를 25~26도로 유지하고 주기적인 실내 환기가 필수적입니다.',
    author: '내과전문의 이박사',
    department: '내과',
    likes: 56,
    commentsCount: 23,
    isPopular: false
  },
  {
    category: '건강정보',
    title: '환절기 면역력 관리를 위한 5가지 습관',
    content: '습도가 높은 장마철이나 기온 차가 큰 환절기에는 특히 호흡기 건강에 유의해야 합니다. 전문의가 추천하는 일상 속 건강 관리 팁: 1. 미지근한 물 하루 2리터 마시기 2. 7시간 이상 숙면 3. 제철 채소와 유산균 섭취 4. 실내 적정 습도 40-60% 유지 5. 가벼운 유산소 운동 30분.',
    author: '의료정보센터',
    department: '내과',
    likes: 98,
    commentsCount: 15,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCDZc1ndnm-qFxQvnvMQaUkme7cx8AsNM_MudUnYZVy3z1FL1L0nkQ4WFi5GfesneV7p-aUfczHXFM1PyNSEx571jWJtEHCbf-dp50vUQjxX3jiua7cOrMKIZbvWqnQNVXToYEEGpAW21JKlGpcYUzdam7CEXYR2QUFq-7aHZmKNXxq5apLPttsyjts656UYScJ-5_FwwSPQsyrtoexKKyhJZRd1w1mMu9RZVGPTIIaPgUDHmyjLwvNLw',
    isPopular: false
  },
  {
    category: '병원소식',
    title: '서울스타메디컬센터, 최신 MRI 장비 도입 기념 할인 이벤트 안내',
    content: '더 정확하고 신속한 진단을 위해 최첨단 저소음 MRI 장비를 새롭게 도입하였습니다. 척추, 관절, 뇌신경 정밀 검진을 특별한 혜택 가격에 만나보실 수 있습니다. 자세한 예약 상담은 진료 접수 데스크나 온라인 접수를 이용해 주세요.',
    author: '진료팀장 김철수',
    department: '정형외과',
    likes: 142,
    commentsCount: 29,
    isPopular: false
  }
];

export const COMMON_SYMPTOMS = [
  '열이 나고 오한이 있어요',
  '기침, 가래, 목 통증이 심해요',
  '무릎/허리 관절이 쑤시고 아파요',
  '피부에 붉은 발진과 가려움이 있어요',
  '소화가 안 되고 더부룩하며 복통이 있어요',
  '머리가 지끈거리고 어지러워요',
  '콧물이 멈추지 않고 재채기가 나요',
  '귀가 먹먹하고 통증이 있어요',
  '눈이 뻑뻑하고 이물감이 느껴져요',
  '만성 피로감과 불면증이 심해요'
];
