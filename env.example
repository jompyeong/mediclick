import React, { useState, useEffect } from 'react';
import { collection, addDoc, onSnapshot, query, orderBy, serverTimestamp, doc, updateDoc, increment } from 'firebase/firestore';
import { db } from '../firebase';
import { Post, CommentItem } from '../types';
import { DEFAULT_COMMUNITY_POSTS } from '../data/mockData';

interface CommunityTabProps {
  isWriteModalOpen: boolean;
  onCloseWriteModal: () => void;
  onOpenWriteModal: () => void;
  selectedFilter: string;
  onSelectFilter: (filter: string) => void;
}

export const CommunityTab: React.FC<CommunityTabProps> = ({
  isWriteModalOpen,
  onCloseWriteModal,
  onOpenWriteModal,
  selectedFilter,
  onSelectFilter,
}) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasSeeded, setHasSeeded] = useState(false);

  // Form State
  const [category, setCategory] = useState('사용자 의견');
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  // Comment Expansion State
  const [expandedPostId, setExpandedPostId] = useState<string | null>(null);
  const [commentsMap, setCommentsMap] = useState<{ [postId: string]: CommentItem[] }>({});
  const [newCommentAuthor, setNewCommentAuthor] = useState('');
  const [newCommentContent, setNewCommentContent] = useState('');
  const [commentLoading, setCommentLoading] = useState(false);

  // Real-time Firestore query ordered by createdAt desc (최신순)
  useEffect(() => {
    const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(
      q,
      async (snapshot) => {
        if (snapshot.empty && !hasSeeded) {
          setHasSeeded(true);
          // If Firestore is empty, seed default posts so the board looks rich and alive
          try {
            for (const item of DEFAULT_COMMUNITY_POSTS) {
              await addDoc(collection(db, 'posts'), {
                ...item,
                createdAt: serverTimestamp(),
              });
            }
          } catch (err) {
            console.error('Seeding default posts failed:', err);
          }
        } else {
          const loadedPosts: Post[] = [];
          snapshot.forEach((docSnap) => {
            const data = docSnap.data();
            loadedPosts.push({
              id: docSnap.id,
              category: data.category || '일반',
              title: data.title || '',
              content: data.content || '',
              author: data.author || '익명 사용자',
              department: data.department || data.category || '일반',
              createdAt: data.createdAt ? data.createdAt.toDate?.() || new Date(data.createdAt) : new Date(),
              likes: data.likes || 0,
              commentsCount: data.commentsCount || 0,
              imageUrl: data.imageUrl || '',
              isPopular: data.isPopular || false,
            });
          });
          setPosts(loadedPosts);
          setLoading(false);
        }
      },
      (error) => {
        console.error('Firestore real-time error:', error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [hasSeeded]);

  // Handle Post Creation (1. 입력창에 글을 쓰고 등록 버튼을 누르면 Firebase Firestore에 저장)
  const handleSubmitPost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      setSubmitError('제목과 내용을 모두 입력해주세요.');
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');

    try {
      await addDoc(collection(db, 'posts'), {
        category,
        title: title.trim(),
        content: content.trim(),
        author: author.trim() || '익명 사용자',
        department: category,
        likes: 0,
        commentsCount: 0,
        imageUrl: imageUrl.trim(),
        isPopular: false,
        createdAt: serverTimestamp(), // 4. 최신순 정렬을 위한 타임스탬프
      });

      // Reset form & close modal
      setTitle('');
      setContent('');
      setAuthor('');
      setImageUrl('');
      setCategory('사용자 의견');
      onCloseWriteModal();
    } catch (err: any) {
      console.error('Post submit error:', err);
      setSubmitError('글 등록 중 오류가 발생했습니다. 잠시 후 다시 싣해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLike = async (e: React.MouseEvent, postId: string) => {
    e.stopPropagation();
    try {
      const postRef = doc(db, 'posts', postId);
      await updateDoc(postRef, {
        likes: increment(1),
      });
    } catch (err) {
      console.error('Like increment error:', err);
    }
  };

  const toggleExpandPost = (postId: string) => {
    if (expandedPostId === postId) {
      setExpandedPostId(null);
    } else {
      setExpandedPostId(postId);
      // Load comments for this post if not loaded
      if (!commentsMap[postId]) {
        loadComments(postId);
      }
    }
  };

  const loadComments = (postId: string) => {
    const q = query(collection(db, 'posts', postId, 'comments'), orderBy('createdAt', 'desc'));
    onSnapshot(q, (snapshot) => {
      const loaded: CommentItem[] = [];
      snapshot.forEach((docSnap) => {
        const data = docSnap.data();
        loaded.push({
          id: docSnap.id,
          postId,
          author: data.author || '익명',
          content: data.content || '',
          createdAt: data.createdAt ? data.createdAt.toDate?.() || new Date() : new Date(),
        });
      });
      setCommentsMap((prev) => ({ ...prev, [postId]: loaded }));
    });
  };

  const handleAddComment = async (e: React.FormEvent, postId: string) => {
    e.preventDefault();
    if (!newCommentContent.trim()) return;

    setCommentLoading(true);
    try {
      await addDoc(collection(db, 'posts', postId, 'comments'), {
        postId,
        author: newCommentAuthor.trim() || '익명 답변자',
        content: newCommentContent.trim(),
        createdAt: serverTimestamp(),
      });
      const postRef = doc(db, 'posts', postId);
      await updateDoc(postRef, {
        commentsCount: increment(1),
      });
      setNewCommentContent('');
      setNewCommentAuthor('');
    } catch (err) {
      console.error('Comment add error:', err);
    } finally {
      setCommentLoading(false);
    }
  };

  const categories = ['전체', '내과', '이비인후과', '피부과', '안과', '정형외과', '응급의학과', '사용자 의견', '병원 후기', '영양/건강'];

  const filteredPosts = selectedFilter === '전체'
    ? posts
    : posts.filter((p) => p.category === selectedFilter || p.department === selectedFilter);

  const formatTimeAgo = (date: any) => {
    if (!date) return '방금 전';
    const now = new Date();
    const diffSeconds = Math.floor((now.getTime() - new Date(date).getTime()) / 1000);
    if (diffSeconds < 60) return '방금 전';
    const diffMinutes = Math.floor(diffSeconds / 60);
    if (diffMinutes < 60) return `${diffMinutes}분 전`;
    const diffHours = Math.floor(diffMinutes / 60);
    if (diffHours < 24) return `${diffHours}시간 전`;
    const diffDays = Math.floor(diffHours / 24);
    if (diffDays < 7) return `${diffDays}일 전`;
    return new Date(date).toLocaleDateString('ko-KR');
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Page Title & Write CTA */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 bg-gradient-to-r from-primary/10 via-white to-transparent p-6 rounded-2xl border border-primary/10">
        <div>
          <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary font-bold text-xs mb-2">
            실시간 소통 공간
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-on-surface mb-2">커뮤니티 게시판</h1>
          <p className="text-on-surface-variant text-sm md:text-base">
            맑고 깨끗한 정보를 통해 당신의 활력을 되찾고, 생생한 진료 경험과 의견을 자유롭게 나눠보세요.
          </p>
        </div>
        <button
          onClick={onOpenWriteModal}
          className="vibrant-mint-button px-6 py-3.5 rounded-2xl text-white font-bold text-sm flex items-center gap-2 shadow-lg shadow-primary/20 hover:scale-105 transition-all shrink-0"
        >
          <span className="material-symbols-outlined text-[20px]">edit_square</span>
          <span>새 글 / 의견 작성하기</span>
        </button>
      </div>

      {/* Bento Grid: Featured Posts & Widgets (From HTML Screen 2) */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-5">
        {/* Large Featured Card */}
        <div 
          onClick={() => posts[0] && toggleExpandPost(posts[0].id!)}
          className="md:col-span-8 group relative overflow-hidden rounded-2xl soft-card p-6 md:p-8 cursor-pointer border border-primary/20 hospital-card-gradient"
        >
          <div className="flex justify-between items-start mb-6">
            <span className="px-3.5 py-1 rounded-full bg-primary-container text-on-primary-container font-bold text-xs">
              🔥 인기 포스트
            </span>
            <span className="text-on-surface-variant font-semibold text-xs">
              {posts[0] ? formatTimeAgo(posts[0].createdAt) : '방금 전'}
            </span>
          </div>
          <h3 className="text-xl md:text-2xl font-extrabold text-on-surface mb-3 group-hover:text-primary transition-colors">
            {posts[0] ? posts[0].title : '습한 여름철, 관절 통증을 완화하는 5가지 생활 습관'}
          </h3>
          <p className="text-on-surface-variant text-sm md:text-base mb-6 line-clamp-2">
            {posts[0] ? posts[0].content : '장마철 높은 습도는 관절 내 압력을 변화시켜 통증을 유발할 수 있습니다. 집안 습도를 50% 내외로 유지하고 적절한 온찜질을 병행하는 것이 중요합니다...'}
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-surface-container-high ring-2 ring-primary/20 flex items-center justify-center overflow-hidden shrink-0">
                {posts[0]?.imageUrl ? (
                  <img src={posts[0].imageUrl} alt="Author" className="w-full h-full object-cover" />
                ) : (
                  <span className="material-symbols-outlined text-primary text-2xl font-variation-fill-1">local_hospital</span>
                )}
              </div>
              <div>
                <p className="font-bold text-on-surface text-sm">{posts[0] ? posts[0].author : '김지수 전문의'}</p>
                <p className="text-primary font-bold text-xs">{posts[0] ? posts[0].department : '정형외과'}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-xs text-on-surface-variant">
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-primary text-[18px] font-variation-fill-1">favorite</span>
                {posts[0]?.likes || 152}
              </span>
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-primary text-[18px]">forum</span>
                {posts[0]?.commentsCount || 34}
              </span>
            </div>
          </div>
        </div>

        {/* Small Featured Sidebar (Humidity & Live Doctor Consult Widgets) */}
        <div className="md:col-span-4 flex flex-col gap-5">
          <div className="flex-1 soft-card rounded-2xl p-6 flex flex-col justify-center bg-gradient-to-br from-primary/10 to-transparent border border-primary/20">
            <div className="text-primary font-extrabold text-3xl md:text-4xl mb-1">85%</div>
            <p className="text-on-surface-variant font-bold text-xs mb-3 uppercase tracking-wider">
              오늘의 서울 습도
            </p>
            <p className="text-on-surface text-sm leading-relaxed font-medium">
              제습이 필요한 날입니다. 실내 환경을 쾌적하게 유지하고 관절/호흡기 건강을 챙기세요.
            </p>
          </div>
          <div className="flex-1 bg-gradient-to-br from-[#006b5f] to-[#2dd4bf] text-white rounded-2xl p-6 shadow-lg shadow-primary/20 flex flex-col justify-center">
            <div className="flex items-center justify-between mb-2">
              <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-white font-bold text-[11px] uppercase tracking-wider">
                ● 실시간 상담
              </span>
              <span className="material-symbols-outlined text-white text-2xl">support_agent</span>
            </div>
            <p className="font-extrabold text-lg md:text-xl text-white leading-snug">
              지금 12명의 전문 의사가<br />온라인 상담 대기 중입니다.
            </p>
          </div>
        </div>
      </section>

      {/* Category Chips (2. 앱을 열면 Firestore에 저장된 글을 불러와 기존 게시판 목록 영역에 보여줘) */}
      <section className="flex items-center justify-between border-b border-outline-variant/20 pb-4">
        <div className="flex gap-2 overflow-x-auto hide-scrollbar py-1 w-full">
          {categories.map((cat) => {
            const isSelected = selectedFilter === cat;
            return (
              <button
                key={cat}
                onClick={() => onSelectFilter(cat)}
                className={`px-5 py-2 rounded-full font-bold text-xs whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-primary text-white shadow-md shadow-primary/20 scale-105'
                    : 'bg-white text-on-surface-variant border border-outline-variant/30 hover:border-primary/50 hover:bg-primary/5'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </section>

      {/* Main Feed: 2. 기존 게시판 목록 영역 / 4. 글은 최신순으로 보여줘 */}
      <section className="space-y-4">
        <div className="flex justify-between items-center px-1">
          <h2 className="text-lg font-bold text-on-surface flex items-center gap-2">
            <span>최신 게시글 목록</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">
              총 {filteredPosts.length}건
            </span>
          </h2>
          <span className="text-xs text-on-surface-variant flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px]">sort</span>
            <span>최신 등록순 (Firestore 정렬)</span>
          </span>
        </div>

        {loading ? (
          <div className="py-16 text-center space-y-3">
            <div className="w-8 h-8 border-3 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="text-sm font-medium text-on-surface-variant">Firestore 게시글을 불러오는 중입니다...</p>
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-outline-variant/20 space-y-4">
            <span className="material-symbols-outlined text-5xl text-outline-variant/60">comments_disabled</span>
            <h3 className="text-lg font-bold text-on-surface">등록된 게시글이 없습니다.</h3>
            <p className="text-sm text-on-surface-variant max-w-sm mx-auto">
              현재 선택하신 카테고리에 첫 번째 글을 남겨보세요. 당신의 소중한 의견이나 질문이 큰 도움이 됩니다.
            </p>
            <button
              onClick={onOpenWriteModal}
              className="vibrant-mint-button px-6 py-2.5 rounded-xl text-white font-bold text-xs inline-flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[16px]">add</span>
              <span>첫 게시글 작성하기</span>
            </button>
          </div>
        ) : (
          filteredPosts.map((post) => {
            const isExpanded = expandedPostId === post.id;
            const postComments = commentsMap[post.id!] || [];

            return (
              <article
                key={post.id}
                onClick={() => toggleExpandPost(post.id!)}
                className={`soft-card rounded-2xl p-6 cursor-pointer transition-all border ${
                  isExpanded ? 'border-primary ring-2 ring-primary/10 shadow-lg' : 'border-outline-variant/10 hover:border-primary/40'
                }`}
              >
                <div className="flex flex-col sm:flex-row gap-5">
                  <div className="flex-1 order-2 sm:order-1">
                    <div className="flex items-center gap-2 mb-2.5">
                      <span className="px-2.5 py-0.5 rounded-md bg-primary/10 text-primary font-bold text-xs">
                        {post.category || post.department}
                      </span>
                      <span className="text-outline-variant">•</span>
                      <span className="text-on-surface-variant font-semibold text-xs">
                        {formatTimeAgo(post.createdAt)}
                      </span>
                      <span className="text-outline-variant">•</span>
                      <span className="text-on-surface font-semibold text-xs flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px]">person</span>
                        {post.author}
                      </span>
                    </div>

                    <h4 className="text-lg md:text-xl font-bold text-on-surface mb-2 hover:text-primary transition-colors">
                      {post.title}
                    </h4>

                    <p className={`text-on-surface-variant text-sm md:text-base leading-relaxed mb-4 ${
                      isExpanded ? '' : 'line-clamp-2'
                    }`}>
                      {post.content}
                    </p>

                    <div className="flex items-center justify-between pt-2 border-t border-outline-variant/10">
                      <div className="flex items-center gap-5">
                        <button
                          onClick={(e) => handleLike(e, post.id!)}
                          className="flex items-center gap-1.5 text-on-surface-variant hover:text-primary font-bold text-xs transition-colors py-1 px-2 -ml-2 rounded-lg hover:bg-primary/5"
                          title="좋아요"
                        >
                          <span className="material-symbols-outlined text-primary text-[18px] font-variation-fill-1">favorite</span>
                          <span>{post.likes || 0}</span>
                        </button>
                        <div className="flex items-center gap-1.5 text-on-surface-variant font-bold text-xs">
                          <span className="material-symbols-outlined text-primary text-[18px]">forum</span>
                          <span>댓글 {post.commentsCount || 0}</span>
                        </div>
                      </div>
                      <span className="text-xs text-primary font-bold flex items-center gap-0.5">
                        {isExpanded ? '접기' : '자세히 보기 / 답변 달기'}
                        <span className="material-symbols-outlined text-[16px]">
                          {isExpanded ? 'expand_less' : 'expand_more'}
                        </span>
                      </span>
                    </div>
                  </div>

                  {/* Optional Image Thumbnail (HTML hotlink support) */}
                  {post.imageUrl && (
                    <div className="w-full sm:w-40 h-36 sm:h-32 rounded-xl overflow-hidden shrink-0 order-1 sm:order-2 bg-surface-container border border-outline-variant/10">
                      <img
                        src={post.imageUrl}
                        alt="Post attachment"
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = 'none';
                        }}
                      />
                    </div>
                  )}
                </div>

                {/* Expanded Comment Section */}
                {isExpanded && (
                  <div 
                    onClick={(e) => e.stopPropagation()} 
                    className="mt-6 pt-5 border-t border-outline-variant/20 space-y-4 animate-fadeIn"
                  >
                    <h5 className="font-bold text-sm text-on-surface flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[18px] text-primary">chat</span>
                      <span>답변 및 사용자 의견 ({postComments.length})</span>
                    </h5>

                    {/* Comment List */}
                    <div className="space-y-3 max-h-60 overflow-y-auto pr-1 custom-scrollbar">
                      {postComments.length === 0 ? (
                        <p className="text-xs text-on-surface-variant/70 py-3 bg-surface-container-low rounded-xl px-4">
                          아직 작성된 답변이 없습니다. 첫 번째 의견을 남겨보세요!
                        </p>
                      ) : (
                        postComments.map((comment) => (
                          <div key={comment.id} className="p-3.5 rounded-xl bg-surface-container-low border border-outline-variant/20 space-y-1">
                            <div className="flex justify-between items-center">
                              <span className="font-bold text-xs text-on-surface flex items-center gap-1">
                                <span className="w-2 h-2 rounded-full bg-primary"></span>
                                {comment.author}
                              </span>
                              <span className="text-[11px] text-on-surface-variant/70">
                                {formatTimeAgo(comment.createdAt)}
                              </span>
                            </div>
                            <p className="text-xs font-medium text-on-surface-variant pt-0.5 leading-relaxed">
                              {comment.content}
                            </p>
                          </div>
                        ))
                      )}
                    </div>

                    {/* Add Comment Form */}
                    <form onSubmit={(e) => handleAddComment(e, post.id!)} className="flex flex-col sm:flex-row gap-2 pt-2">
                      <input
                        type="text"
                        placeholder="작성자명 (예: 김의사, 홍길동)"
                        value={newCommentAuthor}
                        onChange={(e) => setNewCommentAuthor(e.target.value)}
                        className="w-full sm:w-40 rounded-xl border border-outline-variant/30 px-3 py-2 text-xs focus:ring-2 focus:ring-primary focus:border-primary text-on-surface bg-white"
                      />
                      <input
                        type="text"
                        required
                        placeholder="의견이나 답변을 작성해 주세요..."
                        value={newCommentContent}
                        onChange={(e) => setNewCommentContent(e.target.value)}
                        className="flex-1 rounded-xl border border-outline-variant/30 px-3 py-2 text-xs focus:ring-2 focus:ring-primary focus:border-primary text-on-surface bg-white"
                      />
                      <button
                        type="submit"
                        disabled={commentLoading}
                        className="px-4 py-2 rounded-xl bg-primary text-white font-bold text-xs hover:opacity-90 transition-all shrink-0 flex items-center justify-center gap-1"
                      >
                        <span className="material-symbols-outlined text-[16px]">send</span>
                        <span>답변 등록</span>
                      </button>
                    </form>
                  </div>
                )}
              </article>
            );
          })
        )}
      </section>

      {/* Post Write Modal (1. 입력창에 글을 쓰고 등록 버튼을 누르면 Firebase Firestore에 저장) */}
      {isWriteModalOpen && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 md:p-8 shadow-2xl border border-primary/20 max-h-[90vh] overflow-y-auto custom-scrollbar relative">
            <button
              onClick={onCloseWriteModal}
              className="absolute top-6 right-6 w-10 h-10 rounded-full bg-surface-container-low hover:bg-surface-container flex items-center justify-center text-on-surface-variant transition-colors"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>

            <div className="mb-6">
              <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary font-bold text-xs mb-2">
                ✍️ 새 글 / 사용자 의견 작성
              </span>
              <h3 className="text-2xl font-bold text-on-surface">커뮤니티 게시글 등록</h3>
              <p className="text-xs text-on-surface-variant mt-1">
                등록된 글은 Firebase Firestore에 실시간으로 저장되며 최신순으로 게시판 목록에 표시됩니다.
              </p>
            </div>

            {submitError && (
              <div className="mb-4 p-3 rounded-xl bg-error-container/40 border border-[#ba1a1a]/30 text-[#ba1a1a] text-xs flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">error</span>
                <span>{submitError}</span>
              </div>
            )}

            <form onSubmit={handleSubmitPost} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-on-surface-variant mb-1">카테고리</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full rounded-xl border border-outline-variant/40 bg-surface-container-low px-3 py-2 text-sm font-medium focus:ring-2 focus:ring-primary focus:border-primary text-on-surface"
                  >
                    <option value="사용자 의견">사용자 의견/질문</option>
                    <option value="병원 후기">병원 후기/칭찬</option>
                    <option value="내과">내과</option>
                    <option value="정형외과">정형외과</option>
                    <option value="피부과">피부과</option>
                    <option value="이비인후과">이비인후과</option>
                    <option value="안과">안과</option>
                    <option value="영양/건강">영양/건강</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-on-surface-variant mb-1">작성자명</label>
                  <input
                    type="text"
                    placeholder="예: 건강지킴이, 홍길동"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    className="w-full rounded-xl border border-outline-variant/40 px-3 py-2 text-sm focus:ring-2 focus:ring-primary focus:border-primary text-on-surface"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-on-surface-variant mb-1">
                  제목 <span className="text-error">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="예: 여름철 냉방병 증상 완화 팁 공유합니다!"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full rounded-xl border border-outline-variant/40 px-3 py-2 text-sm focus:ring-2 focus:ring-primary focus:border-primary text-on-surface font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-on-surface-variant mb-1">
                  내용 (사용자 의견, 질문, 팁 등) <span className="text-error">*</span>
                </label>
                <textarea
                  rows={5}
                  required
                  placeholder="자유롭게 병원 경험, 증상 관련 질문이나 의료 팁을 남겨주세요."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full rounded-xl border border-outline-variant/40 px-3 py-2 text-sm focus:ring-2 focus:ring-primary focus:border-primary text-on-surface resize-none placeholder:text-on-surface-variant/40 leading-relaxed"
                ></textarea>
              </div>

              <div>
                <label className="block text-xs font-bold text-on-surface-variant mb-1">
                  🖼️ 이미지 URL (선택 - HTML 핫링크 지원)
                </label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/photo-..."
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="w-full rounded-xl border border-outline-variant/40 px-3 py-2 text-xs focus:ring-2 focus:ring-primary focus:border-primary text-on-surface"
                />
                <p className="text-[11px] text-on-surface-variant/60 mt-1">
                  * Unsplash 등 웹상에 존재하는 이미지 URL을 넣으면 게시글 우측에 썸네일이 생성됩니다.
                </p>
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="vibrant-mint-button w-full py-3.5 rounded-xl text-white font-bold text-base flex items-center justify-center gap-2 shadow-lg shadow-primary/30 active:scale-95 transition-all"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                      <span>Firestore에 저장 중...</span>
                    </span>
                  ) : (
                    <>
                      <span>게시글 등록하기 (Firestore 저장)</span>
                      <span className="material-symbols-outlined text-[20px]">check</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
