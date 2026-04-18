/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface KnowledgePoint {
  id: string;
  name: string;
  unit: number; // 1-5
  category: string;
  subCategory: string;
}

export type ViewType = 'dashboard' | 'learning';

export interface AppState {
  completedIds: string[];
  currentView: ViewType;
  selectedKpId: string | null;
  searchQuery: string;
}
