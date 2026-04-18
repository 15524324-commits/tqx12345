/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { BookOpen, GraduationCap, ArrowRight } from 'lucide-react';
import { KNOWLEDGE_DATA, UNIT_NAMES } from '../data/knowledgeData';

interface DashboardProps {
  completedIds: string[];
  onEnter: () => void;
}

export default function Dashboard({ completedIds, onEnter }: DashboardProps) {
  const totalPoints = KNOWLEDGE_DATA.length;
  const totalCompleted = completedIds.length;
  const globalPercentage = Math.round((totalCompleted / totalPoints) * 100) || 0;

  const getUnitStats = (unit: number) => {
    const unitPoints = KNOWLEDGE_DATA.filter(kp => kp.unit === unit);
    const unitCompleted = unitPoints.filter(kp => completedIds.includes(kp.id)).length;
    return {
      total: unitPoints.length,
      completed: unitCompleted,
      percentage: Math.round((unitCompleted / unitPoints.length) * 100) || 0
    };
  };

  const getUnitTagStyle = (unit: number) => {
    switch (unit) {
      case 2: return "bg-[#fff3e0] text-[#ff9800]";
      case 3: return "bg-[#f3e5f5] text-[#9c27b0]";
      case 5: return "bg-[#ffebee] text-[#f44336]";
      default: return "bg-bg-blue-soft text-primary-blue";
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-8 py-12 min-h-screen flex flex-col bg-[radial-gradient(circle_at_top_right,var(--color-bg-green-soft)_0%,transparent_40%)]">
      {/* Header */}
      <header className="flex justify-between items-center mb-16">
        <div className="flex items-center gap-4">
          <div className="relative w-[60px] h-[60px]">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="30"
                cy="30"
                r="26"
                className="stroke-gray-100 fill-none"
                strokeWidth="6"
              />
              <motion.circle
                cx="30"
                cy="30"
                r="26"
                className="stroke-primary-green fill-none"
                strokeWidth="6"
                strokeLinecap="round"
                initial={{ strokeDashoffset: 163 }}
                animate={{ strokeDashoffset: 163 - (globalPercentage / 100) * 163 }}
                style={{ strokeDasharray: 163 }}
                transition={{ duration: 1 }}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xs font-bold text-primary-green">{globalPercentage}%</span>
            </div>
          </div>
          <div>
            <h2 className="text-xl font-bold">全书总进度 {globalPercentage}%</h2>
            <p className="text-[12px] text-text-muted">已提前预习 {totalCompleted} / {totalPoints} 个知识点</p>
          </div>
        </div>
        <div className="text-sm font-semibold text-gray-700">你好, 乐乐同学 👋</div>
      </header>

      {/* Hero */}
      <div className="flex-1 flex flex-col items-center justify-center text-center">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onEnter}
          className="bg-primary-green text-white px-12 py-5 rounded-[40px] text-2xl font-bold shadow-[0_10_20_rgba(76,175,80,0.3)] mb-6"
        >
          进入提前学目录 ➔
        </motion.button>
        <p className="text-text-muted text-sm max-w-[400px] leading-relaxed mb-12">
          提前预习下学期知识，数学学习变简单！<br />
          点击下方模块，查看详细学习计划。
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 w-full">
        {UNIT_NAMES.map((name, index) => {
          const unit = index + 1;
          const stats = getUnitStats(unit);
          return (
            <motion.div
              key={unit}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={onEnter}
              className="bg-white p-5 rounded-[24px] shadow-card flex flex-col gap-3 cursor-pointer hover:shadow-lg transition-shadow"
            >
              <span className={`text-[11px] font-bold px-2 py-1 rounded-md self-start ${getUnitTagStyle(unit)}`}>
                第{['一', '二', '三', '四', '五'][index]}单元
              </span>
              <div className="text-[15px] font-bold h-[44px] leading-tight text-gray-800">
                {name.replace(/第.*单元（(.*)）/, '$1')}
              </div>
              
              <div className="space-y-1.5 mt-auto">
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${stats.percentage}%` }}
                    className="h-full bg-primary-green rounded-full"
                  />
                </div>
                <div className="flex justify-between text-[11px] text-text-muted font-medium">
                  <span>进度</span>
                  <span>{stats.completed}/{stats.total}</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
