// src/pages/SkuIterationPage.js
// SKU 迭代管理 - 树形展示，搜索 SKU 时自动展开对应层级
import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronDown, Search, Package } from 'lucide-react';

// 树形数据：品牌 > 一级类目 > 二级类目 > 系列 > SKU
const initialTree = [
  {
    id: 'brand-1',
    name: 'KastKing',
    type: 'brand',
    code: 'KK',
    children: [
      {
        id: 'cat1-1',
        name: '钓鱼竿',
        type: 'category1',
        code: 'KK-ROD',
        children: [
          {
            id: 'cat2-1',
            name: '路亚竿',
            type: 'category2',
            code: 'KK-ROD-CAST',
            children: [
              {
                id: 'series-1',
                name: 'Royale Legend系列',
                type: 'series',
                code: 'KK-RL',
                children: [
                  { id: 'sku-1', name: 'KK-RL-2024-7FT-M', type: 'sku', code: 'KK-RL-2024-7FT-M', specs: '7尺/中调/黑色' },
                  { id: 'sku-2', name: 'KK-RL-2024-7FT-MH', type: 'sku', code: 'KK-RL-2024-7FT-MH', specs: '7尺/中硬调/黑色' },
                  { id: 'sku-3', name: 'KK-RL-2024-8FT-M', type: 'sku', code: 'KK-RL-2024-8FT-M', specs: '8尺/中调/蓝色' },
                ],
              },
              {
                id: 'series-2',
                name: 'Speed Demon系列',
                type: 'series',
                code: 'KK-SD',
                children: [
                  { id: 'sku-4', name: 'KK-SD-2024-6.6FT-XF', type: 'sku', code: 'KK-SD-2024-6.6FT-XF', specs: '6.6尺/超快调/红色' },
                  { id: 'sku-5', name: 'KK-SD-2024-7FT-XF', type: 'sku', code: 'KK-SD-2024-7FT-XF', specs: '7尺/超快调/红色' },
                ],
              },
            ],
          },
        ],
      },
      {
        id: 'cat1-2',
        name: '渔线轮',
        type: 'category1',
        code: 'KK-REEL',
        children: [
          {
            id: 'cat2-2',
            name: '纺车轮',
            type: 'category2',
            code: 'KK-REEL-SPIN',
            children: [
              {
                id: 'series-3',
                name: 'Megatron系列',
                type: 'series',
                code: 'KK-MG',
                children: [
                  { id: 'sku-6', name: 'KK-MG-2024-3000', type: 'sku', code: 'KK-MG-2024-3000', specs: '3000型/左手/银色' },
                  { id: 'sku-7', name: 'KK-MG-2024-4000', type: 'sku', code: 'KK-MG-2024-4000', specs: '4000型/左手/银色' },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];

// 递归收集从根到所有匹配节点的路径上的节点 id（用于展开）
function collectExpandIdsForSearch(tree, searchText, pathIds = []) {
  if (!searchText || !searchText.trim()) return [];
  const q = searchText.trim().toLowerCase();
  const ids = new Set();

  function walk(nodes, path) {
    if (!nodes || !nodes.length) return;
    for (const node of nodes) {
      const currentPath = [...path, node.id];
      const name = (node.name || '').toLowerCase();
      const code = (node.code || '').toLowerCase();
      const match = name.includes(q) || code.includes(q);

      if (match) {
        currentPath.forEach((id) => ids.add(id));
      }
      if (node.children && node.children.length) {
        walk(node.children, currentPath);
      }
    }
  }

  walk(tree, []);
  return [...ids];
}

export default function SkuIterationPage() {
  const [tree] = useState(initialTree);
  const [searchSku, setSearchSku] = useState('');
  const [expandedIds, setExpandedIds] = useState(new Set(['brand-1', 'cat1-1', 'cat2-1', 'series-1']));

  // 搜索时自动展开包含匹配节点的所有层级
  useEffect(() => {
    if (!searchSku || !searchSku.trim()) return;
    const toExpand = collectExpandIdsForSearch(tree, searchSku);
    if (toExpand.length) {
      setExpandedIds((prev) => new Set([...prev, ...toExpand]));
    }
  }, [searchSku, tree]);

  const TreeNode = ({ node, level = 0 }) => {
    const hasChildren = node.children && node.children.length > 0;
    const isExpanded = expandedIds.has(node.id);
    const name = node.name || '';
    const code = node.code || '';
    const searchLower = searchSku.trim().toLowerCase();
    const isMatch =
      searchLower && (name.toLowerCase().includes(searchLower) || code.toLowerCase().includes(searchLower));

    const toggle = () => {
      if (!hasChildren) return;
      setExpandedIds((prev) => {
        const next = new Set(prev);
        if (next.has(node.id)) next.delete(node.id);
        else next.add(node.id);
        return next;
      });
    };

    return (
      <div key={node.id}>
        <div
          className={`flex items-center gap-2 px-3 py-1.5 cursor-pointer hover:bg-gray-100 rounded ${isMatch ? 'bg-amber-50 ring-1 ring-amber-200' : ''}`}
          style={{ paddingLeft: `${level * 16 + 12}px` }}
          onClick={toggle}
        >
          {hasChildren ? (
            <span className="flex-shrink-0">
              {isExpanded ? <ChevronDown className="w-4 h-4 text-gray-500" /> : <ChevronRight className="w-4 h-4 text-gray-500" />}
            </span>
          ) : (
            <span className="w-4 flex-shrink-0" />
          )}
          <Package className="w-4 h-4 text-gray-400 flex-shrink-0" />
          <span className="text-sm flex-1 truncate">{node.name}</span>
          {node.code && <span className="text-xs text-gray-400 truncate max-w-[120px]">{node.code}</span>}
        </div>
        {hasChildren && isExpanded && (
          <div>
            {node.children.map((child) => (
              <TreeNode key={child.id} node={child} level={level + 1} />
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">SKU 迭代管理</h1>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm flex flex-col overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="搜索 SKU 或编码、名称..."
              value={searchSku}
              onChange={(e) => setSearchSku(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <p className="text-xs text-gray-500 mt-2">输入后将自动展开包含匹配项的层级</p>
        </div>
        <div className="flex-1 overflow-y-auto min-h-[400px] p-2">
          {tree.map((root) => (
            <TreeNode key={root.id} node={root} />
          ))}
        </div>
      </div>
    </div>
  );
}
