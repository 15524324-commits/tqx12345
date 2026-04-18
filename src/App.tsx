/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { KNOWLEDGE_DATA, UNIT_NAMES } from './data/knowledgeData';
import { ViewType } from './types';
import { usePersistence } from './hooks/usePersistence';
import Dashboard from './components/Dashboard';
import LearningModule from './components/LearningModule';

export default function App() {
  const [completedIds, setCompletedIds] = usePersistence<string[]>('completed_knowledge', []);
  const [currentView, setCurrentView] = useState<ViewType>('dashboard');
  const [selectedKpId, setSelectedKpId] = useState<string | null>(null);

  const toggleComplete = (id: string) => {
    setCompletedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const currentUnitIndex = useMemo(() => {
    if (!selectedKpId) return 0;
    const kp = KNOWLEDGE_DATA.find(k => k.id === selectedKpId);
    return (kp?.unit || 1) - 1;
  }, [selectedKpId]);

  const handleExport = () => {
    const uncompleted = KNOWLEDGE_DATA.filter(kp => !completedIds.includes(kp.id));
    const csvContent = [
      ['单元', '分类', '子分类', '知识点名称'],
      ...uncompleted.map(kp => [
        `第${kp.unit}单元`,
        kp.category,
        kp.subCategory,
        kp.name
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `待学知识点课程表_${new Date().toLocaleDateString()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-bg-light text-text-main font-sans selection:bg-green-100">
      <AnimatePresence mode="wait">
        {currentView === 'dashboard' ? (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.4 }}
          >
            <Dashboard 
              completedIds={completedIds} 
              onEnter={() => setCurrentView('learning')} 
            />
          </motion.div>
        ) : (
          <motion.div
            key="learning"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            <LearningModule
              completedIds={completedIds}
              toggleComplete={toggleComplete}
              onBack={() => setCurrentView('dashboard')}
              selectedKpId={selectedKpId}
              setSelectedKpId={setSelectedKpId}
              onExport={handleExport}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

