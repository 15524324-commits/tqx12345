/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface KnowledgePoint {
  id: string;
  name: string;
  unit: number;
  category: string;
  subCategory: string;
}

export const KNOWLEDGE_DATA: KnowledgePoint[] = [
  // Unit 1: 有余数的除法
  { id: '1-1-1', name: '认识余数', unit: 1, category: '有余数的除法', subCategory: '认识有余数' },
  { id: '1-1-2', name: '除法竖式的写法', unit: 1, category: '有余数的除法', subCategory: '认识有余数' },
  { id: '1-2-1', name: '余数与除数的关系', unit: 1, category: '有余数的除法', subCategory: '计算与应用' },
  { id: '1-2-2', name: '解决问题：进一法', unit: 1, category: '有余数的除法', subCategory: '计算与应用' },
  { id: '1-2-3', name: '解决问题：去尾法', unit: 1, category: '有余数的除法', subCategory: '计算与应用' },

  // Unit 2: 数量间的乘除关系
  { id: '2-1-1', name: '倍的认识', unit: 2, category: '数量间的乘除关系', subCategory: '认识倍' },
  { id: '2-1-2', name: '求一个数是另一个数的几倍', unit: 2, category: '数量间的乘除关系', subCategory: '认识倍' },
  { id: '2-2-1', name: '求一个数的几倍是多少', unit: 2, category: '数量间的乘除关系', subCategory: '倍的应用' },
  { id: '2-2-2', name: '乘除关系解决问题', unit: 2, category: '数量间的乘除关系', subCategory: '倍的应用' },

  // Unit 3: 万以内数的认识
  { id: '3-1-1', name: '千以内的数及其读写', unit: 3, category: '万以内数的认识', subCategory: '数位与认识' },
  { id: '3-1-2', name: '认识计数单位“千”', unit: 3, category: '万以内数的认识', subCategory: '数位与认识' },
  { id: '3-2-1', name: '万以内的数及其读写', unit: 3, category: '万以内数的认识', subCategory: '进阶读写' },
  { id: '3-2-2', name: '数位的组成与顺序表', unit: 3, category: '万以内数的认识', subCategory: '进阶读写' },
  { id: '3-3-1', name: '万以内数的大小比较', unit: 3, category: '万以内数的认识', subCategory: '对比与估算' },
  { id: '3-3-2', name: '近似数与估算', unit: 3, category: '万以内数的认识', subCategory: '对比与估算' },

  // Unit 4: 万以内数的加法和减法
  { id: '4-1-1', name: '两位数加减两位数（口算）', unit: 4, category: '万以内加减法', subCategory: '基础加减' },
  { id: '4-1-2', name: '几百几十加减法（笔算）', unit: 4, category: '万以内加减法', subCategory: '基础加减' },
  { id: '4-2-1', name: '三位数加三位数（连续进位）', unit: 4, category: '万以内加减法', subCategory: '进阶计算' },
  { id: '4-2-2', name: '三位数减三位数（连续退位）', unit: 4, category: '万以内加减法', subCategory: '进阶计算' },
  { id: '4-3-1', name: '加减法估算及其应用', unit: 4, category: '万以内加减法', subCategory: '实际应用' },

  // Unit 5: 复习与关联
  { id: '5-1-1', name: '有余数除法回顾', unit: 5, category: '复习与关联', subCategory: '知识梳理' },
  { id: '5-1-2', name: '万以内数的回顾', unit: 5, category: '复习与关联', subCategory: '知识梳理' },
  { id: '5-2-1', name: '乘除数量关系归纳', unit: 5, category: '复习与关联', subCategory: '综合提升' },
  { id: '5-2-2', name: '综合解决问题', unit: 5, category: '复习与关联', subCategory: '综合提升' },
];

export const UNIT_NAMES = [
  '第一单元（有余数的除法）',
  '第二单元（数量间的乘除关系）',
  '第三单元（万以内数的认识）',
  '第四单元（万以内数的加法和减法）',
  '第五单元（复习与关联）'
];
