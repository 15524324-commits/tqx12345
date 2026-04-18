/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, 
  Search, 
  ChevronRight, 
  ChevronDown, 
  CheckCircle2, 
  Circle,
  Download,
  Menu,
  X,
  ExternalLink,
  BookOpen
} from 'lucide-react';
import { KNOWLEDGE_DATA, UNIT_NAMES } from '../data/knowledgeData';

interface LearningModuleProps {
  completedIds: string[];
  toggleComplete: (id: string) => void;
  onBack: () => void;
  selectedKpId: string | null;
  setSelectedKpId: (id: string | null) => void;
  onExport: () => void;
}

export default function LearningModule({
  completedIds,
  toggleComplete,
  onBack,
  selectedKpId,
  setSelectedKpId,
  onExport
}: LearningModuleProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedUnits, setExpandedUnits] = useState<number[]>([1]);
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const selectedKp = useMemo(() => 
    KNOWLEDGE_DATA.find(kp => kp.id === selectedKpId) || null
  , [selectedKpId]);

  const filteredData = useMemo(() => {
    if (!searchQuery) return KNOWLEDGE_DATA;
    return KNOWLEDGE_DATA.filter(kp => 
      kp.name.includes(searchQuery) || 
      kp.category.includes(searchQuery) ||
      kp.subCategory.includes(searchQuery)
    );
  }, [searchQuery]);

  const toggleUnit = (unit: number) => {
    setExpandedUnits(prev => 
      prev.includes(unit) ? prev.filter(u => u !== unit) : [...prev, unit]
    );
  };

  const toggleCategory = (cat: string) => {
    setExpandedCategories(prev => 
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  const groupedData = useMemo(() => {
    const units = [1, 2, 3, 4, 5];
    return units.map(u => {
      const unitPoints = filteredData.filter(kp => kp.unit === u);
      const categories = Array.from(new Set(unitPoints.map(p => p.subCategory)));
      return {
        unit: u,
        name: UNIT_NAMES[u - 1],
        categories: categories.map(c => ({
          name: c,
          points: unitPoints.filter(p => p.subCategory === c)
        }))
      };
    });
  }, [filteredData]);

  return (
    <div className="flex h-screen overflow-hidden bg-bg-light">
      {/* Sidebar Overlay for Mobile */}
      <AnimatePresence>
        {!isSidebarOpen && (
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            onClick={() => setIsSidebarOpen(true)}
            className="fixed top-4 left-4 z-50 p-2 bg-white rounded-full shadow-lg border border-gray-100 lg:hidden"
          >
            <Menu className="w-6 h-6 text-primary-green" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ 
          width: isSidebarOpen ? 280 : 0,
          x: isSidebarOpen ? 0 : -280,
          opacity: isSidebarOpen ? 1 : 0
        }}
        className="relative bg-white border-r-2 border-bg-green-soft flex flex-col h-full z-40 overflow-hidden"
      >
        <div className="p-6 border-b border-gray-50 flex items-center justify-between">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-text-muted hover:text-primary-green transition-colors font-medium text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            返回首页
          </button>
          <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-text-muted">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="搜索知识点..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-bg-light border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-green/10"
            />
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto px-4 pb-10 space-y-4">
          {groupedData.map(group => (
            <div key={group.unit} className="mb-2">
              <button
                onClick={() => toggleUnit(group.unit)}
                className="w-full flex items-center gap-2 text-primary-green font-bold text-sm mb-2"
              >
                {group.unit === 1 && <span>📘</span>}
                {group.unit === 2 && <span>🔢</span>}
                {group.unit === 3 && <span>📐</span>}
                {group.unit === 4 && <span>➕</span>}
                {group.unit === 5 && <span>💡</span>}
                <span className="truncate">{group.name.split('（')[1].replace('）', '')}</span>
                {expandedUnits.includes(group.unit) ? <ChevronDown className="w-3 h-3 ml-auto" /> : <ChevronRight className="w-3 h-3 ml-auto" />}
              </button>

              <AnimatePresence>
                {expandedUnits.includes(group.unit) && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden space-y-1"
                  >
                    {group.categories.map(cat => (
                      <div key={cat.name} className="ml-2">
                        <button
                          onClick={() => toggleCategory(cat.name)}
                          className="w-full flex items-center justify-between py-1.5 text-[13px] text-text-muted font-bold hover:text-primary-green transition-colors"
                        >
                          <span>{cat.name}</span>
                        </button>

                        <AnimatePresence>
                          {expandedCategories.includes(cat.name) && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden space-y-0.5 mt-1"
                            >
                              {cat.points.map(kp => (
                                <div
                                  key={kp.id}
                                  className={`flex items-center justify-between py-2 px-3 rounded-lg cursor-pointer transition-colors text-[13px] ${selectedKpId === kp.id ? 'bg-bg-green-soft text-primary-green font-bold' : 'text-gray-600 hover:bg-gray-50'}`}
                                  onClick={() => setSelectedKpId(kp.id)}
                                >
                                  <span className="line-clamp-1">{kp.name}</span>
                                  <div 
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      toggleComplete(kp.id);
                                    }}
                                    className={`w-4 h-4 rounded border-2 transition-colors ${completedIds.includes(kp.id) ? 'bg-primary-green border-primary-green' : 'border-gray-200'}`}
                                  >
                                    {completedIds.includes(kp.id) && <CheckCircle2 className="w-full h-full text-white p-0.5" />}
                                  </div>
                                </div>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </nav>
      </motion.aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-row h-full relative bg-[radial-gradient(circle_at_top_right,var(--color-bg-green-soft)_0%,transparent_40%)]">
        <div className="flex-1 flex flex-col h-full p-8 min-w-0">
          {selectedKp ? (
            <div className="flex flex-col h-full">
              <header className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <div className="relative w-12 h-12">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle cx="24" cy="24" r="20" className="stroke-gray-100 fill-none" strokeWidth="4" />
                      <motion.circle
                        cx="24"
                        cy="24"
                        r="20"
                        className="stroke-primary-green fill-none"
                        strokeWidth="4"
                        strokeLinecap="round"
                        initial={{ strokeDashoffset: 125 }}
                        animate={{ strokeDashoffset: 125 - 0.2 * 125 }}
                        style={{ strokeDasharray: 125 }}
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-[10px] font-bold text-primary-green">U{selectedKp.unit}</span>
                    </div>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">{selectedKp.name}</h2>
                    <p className="text-[12px] text-text-muted">{selectedKp.category} · {selectedKp.subCategory}</p>
                  </div>
                </div>

                <button
                  onClick={() => toggleComplete(selectedKp.id)}
                  className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${completedIds.includes(selectedKp.id) ? 'bg-green-50 text-primary-green border border-primary-green/20' : 'bg-primary-green text-white shadow-lg shadow-green-100'}`}
                >
                  {completedIds.includes(selectedKp.id) ? <CheckCircle2 className="w-4 h-4" /> : <Circle className="w-4 h-4" />}
                  {completedIds.includes(selectedKp.id) ? '已掌握' : '标记掌握'}
                </button>
              </header>

              <div className="flex-1 bg-white rounded-[32px] border-2 border-bg-green-soft overflow-hidden shadow-card relative">
                 <iframe
                  src={`/knowledge/${selectedKp.id}.html`}
                  className="w-full h-full border-none relative z-10"
                  title={selectedKp.name}
                />
                <div className="absolute inset-0 flex items-center justify-center bg-bg-light z-0">
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-8 h-8 border-4 border-primary-green/20 border-t-primary-green rounded-full animate-spin" />
                    <p className="text-xs text-text-muted font-medium">正在加载课件...</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center">
              <div className="w-24 h-24 bg-white rounded-[32px] shadow-card flex items-center justify-center mb-8">
                <BookOpen className="w-12 h-12 text-primary-green" />
              </div>
              <h2 className="text-2xl font-bold mb-3">开启你的预习之旅</h2>
              <p className="text-text-muted text-sm max-w-sm">
                从左侧目录选择知识点。建议按顺序学习效果更好哦！
              </p>
            </div>
          )}
        </div>

        {/* Right Study Tips Sidebar (New) */}
        {selectedKp && (
          <motion.aside 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-64 bg-white/40 backdrop-blur-md border-l border-gray-100 p-6 hidden xl:flex flex-col gap-6"
          >
            <div className="p-5 bg-white rounded-2xl shadow-sm border border-gray-50">
              <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                <div className="w-1 h-3 bg-yellow-400 rounded-full" />
                预习建议
              </h4>
              <ul className="space-y-4">
                <li className="flex gap-2">
                  <div className="w-4 h-4 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center text-[9px] font-bold flex-shrink-0 mt-0.5">1</div>
                  <p className="text-xs leading-relaxed text-gray-500">仔细阅读插图中的<b>数学信息</b>。</p>
                </li>
                <li className="flex gap-2">
                  <div className="w-4 h-4 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center text-[9px] font-bold flex-shrink-0 mt-0.5">2</div>
                  <p className="text-xs leading-relaxed text-gray-500">尝试背诵高亮显示的<b>计算口诀</b>。</p>
                </li>
              </ul>
            </div>

            <div className="p-5 bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl border border-white shadow-sm mt-auto">
              <h4 className="text-xs font-bold text-gray-700 mb-2 font-mono">My Global Progress</h4>
              <div className="flex items-end gap-1 mb-2">
                <span className="text-2xl font-bold text-primary-green leading-none">{Math.round((completedIds.length / KNOWLEDGE_DATA.length) * 100)}%</span>
              </div>
              <div className="w-full h-1.5 bg-white/60 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary-green transition-all duration-500"
                  style={{ width: `${(completedIds.length / KNOWLEDGE_DATA.length) * 100}%` }}
                />
              </div>
            </div>
          </motion.aside>
        )}

        {/* Floating Export */}
        <button
          onClick={onExport}
          className="absolute bottom-8 right-8 bg-white border border-gray-200 px-5 py-2.5 rounded-xl text-[13px] font-bold flex items-center gap-2 shadow-sm hover:bg-gray-50 transition-colors z-30"
        >
          <Download className="w-4 h-4 text-primary-green" />
          导出预览清单
        </button>
      </main>
    </div>
  );
}
