// src/pages/SkuIterationPage.js
import React, { useState, useMemo } from 'react';
import {
  Search, Plus, ChevronRight, ChevronDown, X, Edit2,
  History, Package, Calendar, DollarSign, Clock, Building2,
  GitBranch, ArrowRight, CheckCircle2, XCircle, AlertCircle
} from 'lucide-react';

const SkuIterationPage = ({ data: externalData }) => {
  const [filters, setFilters] = useState({
    keyword: '',
    productLine: '',
    status: ''
  });
  const [expandedSpus, setExpandedSpus] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showIterationModal, setShowIterationModal] = useState(false);
  const [selectedSpu, setSelectedSpu] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  // Mock数据
  const skuIterationData = externalData ?? [
    {
      spuId: 'SPU-001',
      productLine: '路亚竿系列',
      productName: '皇家传奇碳素路亚竿',
      description: '高端碳素材质路亚竿，适合专业钓手使用，轻量化设计，手感极佳',
      currentVersion: 'V3',
      activeSkuCount: 1,
      totalVersions: 3,
      versions: [
        {
          id: 'v1',
          type: 'initial',
          versionNo: 'V1',
          sku: 'KK-ROD-001-V1',
          startTime: '2022-03-01',
          remark: '首版发布，采用标准碳素材料',
          unitPrice: 125.00,
          leadTime: 15,
          supplierId: 'SUP-001',
          supplierName: '深圳市渔具制造有限公司',
          status: '停售'
        },
        {
          id: 'iter1',
          type: 'iteration',
          versionNo: 'V2',
          iterationNo: 1,
          sku: 'KK-ROD-001-V2',
          iterationTime: '2023-06-15',
          iterationReason: '材料升级，采用T800碳素，提升强度和耐用性',
          unitPrice: 138.00,
          leadTime: 12,
          supplierId: 'SUP-001',
          supplierName: '深圳市渔具制造有限公司',
          status: '停售'
        },
        {
          id: 'iter2',
          type: 'iteration',
          versionNo: 'V3',
          iterationNo: 2,
          sku: 'KK-ROD-001-V3',
          iterationTime: '2024-01-20',
          iterationReason: '工艺优化，缩短生产周期；新增防滑握把设计',
          unitPrice: 142.00,
          leadTime: 10,
          supplierId: 'SUP-003',
          supplierName: '宁波精密零件加工厂',
          status: '在售'
        }
      ]
    },
    {
      spuId: 'SPU-002',
      productLine: '渔轮系列',
      productName: '暴风纺车轮3000型',
      description: '高速比纺车轮，适合路亚和海钓，金属机身，耐腐蚀',
      currentVersion: 'V2',
      activeSkuCount: 1,
      totalVersions: 2,
      versions: [
        {
          id: 'v1',
          type: 'initial',
          versionNo: 'V1',
          sku: 'KK-REEL-002-V1',
          startTime: '2022-08-10',
          remark: '首版发布，基础款纺车轮',
          unitPrice: 89.00,
          leadTime: 20,
          supplierId: 'SUP-006',
          supplierName: '佛山市金属制品有限公司',
          status: '停售'
        },
        {
          id: 'iter1',
          type: 'iteration',
          versionNo: 'V2',
          iterationNo: 1,
          sku: 'KK-REEL-002-V2',
          iterationTime: '2023-11-05',
          iterationReason: '升级轴承系统，改用11+1BB配置；优化齿轮比',
          unitPrice: 105.00,
          leadTime: 18,
          supplierId: 'SUP-006',
          supplierName: '佛山市金属制品有限公司',
          status: '在售'
        }
      ]
    },
    {
      spuId: 'SPU-003',
      productLine: '钓线系列',
      productName: 'PE编织线500米',
      description: '8编PE线，高强度低延展，适合远投和大物钓',
      currentVersion: 'V4',
      activeSkuCount: 1,
      totalVersions: 4,
      versions: [
        {
          id: 'v1',
          type: 'initial',
          versionNo: 'V1',
          sku: 'KK-LINE-003-V1',
          startTime: '2021-05-20',
          remark: '首版发布，4编PE线',
          unitPrice: 28.00,
          leadTime: 7,
          supplierId: 'SUP-005',
          supplierName: '义乌小商品批发中心',
          status: '停售'
        },
        {
          id: 'iter1',
          type: 'iteration',
          versionNo: 'V2',
          iterationNo: 1,
          sku: 'KK-LINE-003-V2',
          iterationTime: '2022-02-15',
          iterationReason: '升级为8编结构，提升拉力值',
          unitPrice: 35.00,
          leadTime: 7,
          supplierId: 'SUP-005',
          supplierName: '义乌小商品批发中心',
          status: '停售'
        },
        {
          id: 'iter2',
          type: 'iteration',
          versionNo: 'V3',
          iterationNo: 2,
          sku: 'KK-LINE-003-V3',
          iterationTime: '2023-04-10',
          iterationReason: '更换供应商，成本优化；增加抗UV涂层',
          unitPrice: 32.00,
          leadTime: 5,
          supplierId: 'SUP-002',
          supplierName: '东莞市户外用品贸易有限公司',
          status: '停售'
        },
        {
          id: 'iter3',
          type: 'iteration',
          versionNo: 'V4',
          iterationNo: 3,
          sku: 'KK-LINE-003-V4',
          iterationTime: '2024-02-28',
          iterationReason: '新增多色可选；优化包装设计',
          unitPrice: 33.50,
          leadTime: 5,
          supplierId: 'SUP-002',
          supplierName: '东莞市户外用品贸易有限公司',
          status: '在售'
        }
      ]
    },
    {
      spuId: 'SPU-004',
      productLine: '配件系列',
      productName: '钓鱼工具套装',
      description: '专业钓鱼工具包，含取钩器、剪线钳、量鱼尺等',
      currentVersion: 'V1',
      activeSkuCount: 1,
      totalVersions: 1,
      versions: [
        {
          id: 'v1',
          type: 'initial',
          versionNo: 'V1',
          sku: 'KK-TOOL-004-V1',
          startTime: '2024-01-05',
          remark: '新品首发，10件套工具组合',
          unitPrice: 45.00,
          leadTime: 10,
          supplierId: 'SUP-005',
          supplierName: '义乌小商品批发中心',
          status: '在售'
        }
      ]
    },
    {
      spuId: 'SPU-005',
      productLine: '路亚竿系列',
      productName: '速攻短节路亚竿',
      description: '便携式短节设计，方便携带，适合休闲钓和旅行',
      currentVersion: 'V2',
      activeSkuCount: 1,
      totalVersions: 2,
      versions: [
        {
          id: 'v1',
          type: 'initial',
          versionNo: 'V1',
          sku: 'KK-ROD-005-V1',
          startTime: '2023-03-15',
          remark: '首版发布，5节收缩设计',
          unitPrice: 68.00,
          leadTime: 12,
          supplierId: 'SUP-001',
          supplierName: '深圳市渔具制造有限公司',
          status: '停售'
        },
        {
          id: 'iter1',
          type: 'iteration',
          versionNo: 'V2',
          iterationNo: 1,
          sku: 'KK-ROD-005-V2',
          iterationTime: '2024-02-01',
          iterationReason: '优化节点锁定机构；增加硬度规格可选',
          unitPrice: 72.00,
          leadTime: 10,
          supplierId: 'SUP-003',
          supplierName: '宁波精密零件加工厂',
          status: '在售'
        }
      ]
    },
    {
      spuId: 'SPU-006',
      productLine: '渔轮系列',
      productName: '鼓轮水滴轮',
      description: '专业鼓轮，磁力刹车系统，适合精准抛投',
      currentVersion: 'V1',
      activeSkuCount: 1,
      totalVersions: 1,
      versions: [
        {
          id: 'v1',
          type: 'initial',
          versionNo: 'V1',
          sku: 'KK-REEL-006-V1',
          startTime: '2024-03-01',
          remark: '新品首发，入门级鼓轮',
          unitPrice: 156.00,
          leadTime: 25,
          supplierId: 'SUP-006',
          supplierName: '佛山市金属制品有限公司',
          status: '在售'
        }
      ]
    }
  ];

  // 产品系列选项
  const productLineOptions = [...new Set(skuIterationData.map(s => s.productLine))];
  const statusOptions = ['在售', '停售'];

  // 筛选数据
  const filteredData = useMemo(() => {
    return skuIterationData.filter(item => {
      const matchKeyword = !filters.keyword ||
        item.spuId.toLowerCase().includes(filters.keyword.toLowerCase()) ||
        item.productName.toLowerCase().includes(filters.keyword.toLowerCase()) ||
        item.versions.some(v => v.sku.toLowerCase().includes(filters.keyword.toLowerCase()));
      const matchProductLine = !filters.productLine || item.productLine === filters.productLine;
      const matchStatus = !filters.status || item.versions.some(v => v.status === filters.status);
      return matchKeyword && matchProductLine && matchStatus;
    });
  }, [skuIterationData, filters]);

  // 分页
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredData.slice(start, start + pageSize);
  }, [filteredData, currentPage, pageSize]);

  const totalPages = Math.ceil(filteredData.length / pageSize);

  // 切换展开
  const toggleExpand = (spuId) => {
    setExpandedSpus(prev =>
      prev.includes(spuId)
        ? prev.filter(id => id !== spuId)
        : [...prev, spuId]
    );
  };

  // 重置筛选
  const resetFilters = () => {
    setFilters({ keyword: '', productLine: '', status: '' });
    setCurrentPage(1);
  };

  // 获取状态样式
  const getStatusStyle = (status) => {
    const styles = {
      '在售': 'bg-green-100 text-green-700 border-green-200',
      '停售': 'bg-gray-100 text-gray-500 border-gray-200'
    };
    return styles[status] || 'bg-gray-100 text-gray-500';
  };

  // 获取状态图标
  const getStatusIcon = (status) => {
    if (status === '在售') return <CheckCircle2 className="w-3.5 h-3.5" />;
    return <XCircle className="w-3.5 h-3.5" />;
  };

  // 格式化价格
  const formatPrice = (price) => `¥${price.toFixed(2)}`;

  // 计算价格变化
  const getPriceChange = (versions, index) => {
    if (index === 0) return null;
    const current = versions[index].unitPrice;
    const previous = versions[index - 1].unitPrice;
    const diff = current - previous;
    const percent = ((diff / previous) * 100).toFixed(1);
    if (diff > 0) return { type: 'up', diff: `+${diff.toFixed(2)}`, percent: `+${percent}%` };
    if (diff < 0) return { type: 'down', diff: diff.toFixed(2), percent: `${percent}%` };
    return { type: 'same', diff: '0', percent: '0%' };
  };

  // 打开新增迭代模态框
  const handleAddIteration = (spu) => {
    setSelectedSpu(spu);
    setShowIterationModal(true);
  };

  // 关闭模态框
  const handleCloseModal = () => {
    setShowCreateModal(false);
    setShowIterationModal(false);
    setSelectedSpu(null);
  };

  // 统计数据
  const stats = useMemo(() => {
    const totalSpus = skuIterationData.length;
    const totalVersions = skuIterationData.reduce((sum, s) => sum + s.versions.length, 0);
    const activeSkus = skuIterationData.reduce((sum, s) =>
      sum + s.versions.filter(v => v.status === '在售').length, 0);
    const avgIterations = (totalVersions / totalSpus).toFixed(1);
    return { totalSpus, totalVersions, activeSkus, avgIterations };
  }, [skuIterationData]);

  return (
    <div className="flex flex-col h-full">
      {/* 统计卡片 */}
      <div className="grid grid-cols-4 gap-4 mb-4">
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">SPU总数</p>
              <p className="text-2xl font-bold text-gray-800">{stats.totalSpus}</p>
            </div>
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Package className="w-5 h-5 text-blue-600" />
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-2">产品主数据</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">SKU版本总数</p>
              <p className="text-2xl font-bold text-purple-600">{stats.totalVersions}</p>
            </div>
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <GitBranch className="w-5 h-5 text-purple-600" />
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-2">含所有迭代版本</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">在售SKU</p>
              <p className="text-2xl font-bold text-green-600">{stats.activeSkus}</p>
            </div>
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-2">当前活跃版本</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">平均迭代次数</p>
              <p className="text-2xl font-bold text-orange-600">{stats.avgIterations}</p>
            </div>
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <History className="w-5 h-5 text-orange-600" />
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-2">每SPU平均版本数</p>
        </div>
      </div>

      {/* 筛选区域 */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">SKU迭代管理</h3>
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            新增产品
          </button>
        </div>
        <div className="flex flex-wrap gap-3">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="SPU编码/产品名称/SKU编码"
              value={filters.keyword}
              onChange={(e) => {
                setFilters({ ...filters, keyword: e.target.value });
                setCurrentPage(1);
              }}
              className="w-full pl-10 pr-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select
            value={filters.productLine}
            onChange={(e) => {
              setFilters({ ...filters, productLine: e.target.value });
              setCurrentPage(1);
            }}
            className="px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">全部产品系列</option>
            {productLineOptions.map(line => (
              <option key={line} value={line}>{line}</option>
            ))}
          </select>
          <select
            value={filters.status}
            onChange={(e) => {
              setFilters({ ...filters, status: e.target.value });
              setCurrentPage(1);
            }}
            className="px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">全部状态</option>
            {statusOptions.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
          <button
            onClick={resetFilters}
            className="px-4 py-2 border rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition-colors"
          >
            重置
          </button>
        </div>
      </div>

      {/* 表格区域 */}
      <div className="flex-1 bg-white rounded-lg shadow-sm flex flex-col overflow-hidden">
        <div className="flex-1 overflow-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 sticky top-0">
              <tr className="border-b">
                <th className="px-4 py-3 text-left font-medium text-gray-600 w-10"></th>
                <th className="px-4 py-3 text-left font-medium text-gray-600 whitespace-nowrap">SPU编码</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600 whitespace-nowrap">产品系列</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600 whitespace-nowrap">产品名称</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600 whitespace-nowrap">产品描述</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600 whitespace-nowrap">当前版本</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600 whitespace-nowrap">版本数</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600 whitespace-nowrap">操作</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((spu) => {
                const isExpanded = expandedSpus.includes(spu.spuId);
                const activeVersion = spu.versions.find(v => v.status === '在售');

                return (
                  <React.Fragment key={spu.spuId}>
                    {/* SPU主行 */}
                    <tr className={`border-b hover:bg-gray-50 transition-colors ${isExpanded ? 'bg-blue-50' : ''}`}>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => toggleExpand(spu.spuId)}
                          className="p-1 hover:bg-gray-200 rounded transition-colors"
                        >
                          {isExpanded ? (
                            <ChevronDown className="w-4 h-4 text-gray-600" />
                          ) : (
                            <ChevronRight className="w-4 h-4 text-gray-600" />
                          )}
                        </button>
                      </td>
                      <td className="px-4 py-3 font-mono text-xs text-blue-600">{spu.spuId}</td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-1 bg-purple-50 text-purple-600 rounded text-xs">
                          {spu.productLine}
                        </span>
                      </td>
                      <td className="px-4 py-3 font-medium">{spu.productName}</td>
                      <td className="px-4 py-3 text-gray-500 max-w-[200px] truncate" title={spu.description}>
                        {spu.description}
                      </td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">
                          {spu.currentVersion}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1">
                          <span className="text-green-600 font-medium">{spu.activeSkuCount}</span>
                          <span className="text-gray-400">/</span>
                          <span className="text-gray-600">{spu.totalVersions}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => handleAddIteration(spu)}
                          className="flex items-center gap-1 text-blue-600 hover:text-blue-700 text-xs"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          新增迭代
                        </button>
                      </td>
                    </tr>

                    {/* 展开的版本列表 */}
                    {isExpanded && (
                      <tr>
                        <td colSpan={8} className="p-0">
                          <div className="bg-gray-50 border-b">
                            <div className="p-4">
                              <div className="flex items-center gap-2 mb-4">
                                <History className="w-4 h-4 text-gray-500" />
                                <span className="text-sm font-medium text-gray-700">版本迭代历史</span>
                                <span className="text-xs text-gray-400">（共 {spu.versions.length} 个版本）</span>
                              </div>

                              {/* 版本时间线 */}
                              <div className="relative">
                                {spu.versions.map((version, index) => {
                                  const priceChange = getPriceChange(spu.versions, index);
                                  const isLast = index === spu.versions.length - 1;

                                  return (
                                    <div key={version.id} className="relative pl-8 pb-6">
                                      {/* 时间线连接线 */}
                                      {!isLast && (
                                        <div className="absolute left-[11px] top-6 bottom-0 w-0.5 bg-gray-300" />
                                      )}

                                      {/* 时间线节点 */}
                                      <div className={`absolute left-0 top-1 w-6 h-6 rounded-full flex items-center justify-center ${
                                        version.status === '在售'
                                          ? 'bg-green-500 text-white'
                                          : 'bg-gray-300 text-gray-600'
                                      }`}>
                                        {version.type === 'initial' ? '1' : version.iterationNo + 1}
                                      </div>

                                      {/* 版本卡片 */}
                                      <div className={`bg-white rounded-lg border ${
                                        version.status === '在售' ? 'border-green-200 shadow-sm' : 'border-gray-200'
                                      }`}>
                                        {/* 卡片头部 */}
                                        <div className="flex items-center justify-between p-3 border-b bg-gray-50 rounded-t-lg">
                                          <div className="flex items-center gap-3">
                                            <span className={`px-2 py-1 rounded text-xs font-medium ${
                                              version.type === 'initial'
                                                ? 'bg-blue-100 text-blue-700'
                                                : 'bg-orange-100 text-orange-700'
                                            }`}>
                                              {version.type === 'initial' ? '初始版本' : `迭代 ${version.iterationNo}`}
                                            </span>
                                            <span className="font-mono text-sm font-medium text-gray-800">
                                              {version.versionNo}
                                            </span>
                                            <span className={`flex items-center gap-1 px-2 py-1 rounded text-xs border ${getStatusStyle(version.status)}`}>
                                              {getStatusIcon(version.status)}
                                              {version.status}
                                            </span>
                                          </div>
                                          <div className="flex items-center gap-2 text-xs text-gray-500">
                                            <Calendar className="w-3.5 h-3.5" />
                                            {version.type === 'initial' ? version.startTime : version.iterationTime}
                                          </div>
                                        </div>

                                        {/* 卡片内容 */}
                                        <div className="p-3">
                                          <div className="grid grid-cols-5 gap-4">
                                            {/* SKU编码 */}
                                            <div>
                                              <p className="text-xs text-gray-400 mb-1">SKU编码</p>
                                              <p className="font-mono text-xs text-blue-600">{version.sku}</p>
                                            </div>

                                            {/* 采购单价 */}
                                            <div>
                                              <p className="text-xs text-gray-400 mb-1">采购单价</p>
                                              <div className="flex items-center gap-2">
                                                <p className="font-medium text-gray-800">{formatPrice(version.unitPrice)}</p>
                                                {priceChange && priceChange.type !== 'same' && (
                                                  <span className={`text-xs ${
                                                    priceChange.type === 'up' ? 'text-red-500' : 'text-green-500'
                                                  }`}>
                                                    {priceChange.percent}
                                                  </span>
                                                )}
                                              </div>
                                            </div>

                                            {/* 生产周期 */}
                                            <div>
                                              <p className="text-xs text-gray-400 mb-1">生产周期</p>
                                              <div className="flex items-center gap-1">
                                                <Clock className="w-3.5 h-3.5 text-gray-400" />
                                                <p className="text-gray-800">{version.leadTime} 天</p>
                                              </div>
                                            </div>

                                            {/* 供应商 */}
                                            <div>
                                              <p className="text-xs text-gray-400 mb-1">供应商</p>
                                              <div className="flex items-center gap-1">
                                                <Building2 className="w-3.5 h-3.5 text-gray-400" />
                                                <p className="text-gray-800 text-xs truncate max-w-[150px]" title={version.supplierName}>
                                                  {version.supplierName}
                                                </p>
                                              </div>
                                            </div>

                                            {/* 操作 */}
                                            <div className="flex items-end justify-end">
                                              <button className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700">
                                                <Edit2 className="w-3 h-3" />
                                                编辑
                                              </button>
                                            </div>
                                          </div>

                                          {/* 版本备注/迭代原因 */}
                                          <div className="mt-3 pt-3 border-t">
                                            <p className="text-xs text-gray-400 mb-1">
                                              {version.type === 'initial' ? '版本备注' : '迭代原因'}
                                            </p>
                                            <p className="text-sm text-gray-600">
                                              {version.type === 'initial' ? version.remark : version.iterationReason}
                                            </p>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>

          {paginatedData.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 text-gray-400">
              <Package className="w-12 h-12 mb-4" />
              <p>暂无符合条件的数据</p>
            </div>
          )}
        </div>

        {/* 底部分页 */}
        <div className="p-4 border-t bg-gray-50 flex items-center justify-between">
          <div className="text-sm text-gray-600">
            共 <span className="font-semibold text-gray-800">{filteredData.length}</span> 个SPU
            {filteredData.length !== skuIterationData.length && (
              <span className="text-gray-400 ml-2">(已筛选，总计 {skuIterationData.length} 个)</span>
            )}
          </div>
          {totalPages > 1 && (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 border rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
              >
                上一页
              </button>
              <span className="text-sm text-gray-600">
                {currentPage} / {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 border rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
              >
                下一页
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 新增产品模态框 */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black bg-opacity-30" onClick={handleCloseModal} />
          <div className="relative bg-white rounded-lg shadow-xl w-[700px] max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b">
              <h3 className="text-lg font-semibold">新增产品（首版SKU）</h3>
              <button onClick={handleCloseModal} className="p-1 hover:bg-gray-100 rounded transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
              <div className="space-y-6">
                {/* 产品信息 */}
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                    <Package className="w-4 h-4" />
                    产品信息
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">SPU编码 <span className="text-red-500">*</span></label>
                      <input type="text" className="w-full px-3 py-2 border rounded-lg text-sm" placeholder="系统自动生成" disabled />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">产品系列 <span className="text-red-500">*</span></label>
                      <select className="w-full px-3 py-2 border rounded-lg text-sm">
                        <option value="">请选择产品系列</option>
                        {productLineOptions.map(line => (
                          <option key={line} value={line}>{line}</option>
                        ))}
                        <option value="new">+ 新增系列</option>
                      </select>
                    </div>
                    <div className="col-span-2">
                      <label className="block text-sm text-gray-600 mb-1">产品名称 <span className="text-red-500">*</span></label>
                      <input type="text" className="w-full px-3 py-2 border rounded-lg text-sm" placeholder="请输入产品名称" />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-sm text-gray-600 mb-1">产品描述</label>
                      <textarea className="w-full px-3 py-2 border rounded-lg text-sm" rows={2} placeholder="请输入产品描述" />
                    </div>
                  </div>
                </div>

                {/* 首版SKU信息 */}
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                    <GitBranch className="w-4 h-4" />
                    首版SKU信息（V1）
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">SKU编码 <span className="text-red-500">*</span></label>
                      <input type="text" className="w-full px-3 py-2 border rounded-lg text-sm" placeholder="请输入SKU编码" />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">开始时间 <span className="text-red-500">*</span></label>
                      <input type="date" className="w-full px-3 py-2 border rounded-lg text-sm" />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">采购单价 (¥) <span className="text-red-500">*</span></label>
                      <input type="number" step="0.01" className="w-full px-3 py-2 border rounded-lg text-sm" placeholder="0.00" />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">生产周期 (天) <span className="text-red-500">*</span></label>
                      <input type="number" className="w-full px-3 py-2 border rounded-lg text-sm" placeholder="请输入天数" />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-sm text-gray-600 mb-1">供应商 <span className="text-red-500">*</span></label>
                      <select className="w-full px-3 py-2 border rounded-lg text-sm">
                        <option value="">请选择供应商</option>
                        <option value="SUP-001">深圳市渔具制造有限公司</option>
                        <option value="SUP-002">东莞市户外用品贸易有限公司</option>
                        <option value="SUP-003">宁波精密零件加工厂</option>
                        <option value="SUP-005">义乌小商品批发中心</option>
                        <option value="SUP-006">佛山市金属制品有限公司</option>
                      </select>
                    </div>
                    <div className="col-span-2">
                      <label className="block text-sm text-gray-600 mb-1">版本备注</label>
                      <textarea className="w-full px-3 py-2 border rounded-lg text-sm" rows={2} placeholder="请输入版本备注" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-3 p-6 border-t bg-gray-50">
              <button onClick={handleCloseModal} className="px-4 py-2 border rounded-lg text-sm hover:bg-gray-100 transition-colors">
                取消
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors">
                确认创建
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 新增迭代模态框 */}
      {showIterationModal && selectedSpu && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black bg-opacity-30" onClick={handleCloseModal} />
          <div className="relative bg-white rounded-lg shadow-xl w-[600px] max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b">
              <div>
                <h3 className="text-lg font-semibold">新增迭代版本</h3>
                <p className="text-sm text-gray-500 mt-1">{selectedSpu.productName} - 当前版本: {selectedSpu.currentVersion}</p>
              </div>
              <button onClick={handleCloseModal} className="p-1 hover:bg-gray-100 rounded transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
              {/* 上一版本参考 */}
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-500 mb-2">上一版本参考 ({selectedSpu.currentVersion})</p>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-gray-400">SKU: </span>
                    <span className="font-mono text-blue-600">{selectedSpu.versions[selectedSpu.versions.length - 1].sku}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">单价: </span>
                    <span>{formatPrice(selectedSpu.versions[selectedSpu.versions.length - 1].unitPrice)}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">周期: </span>
                    <span>{selectedSpu.versions[selectedSpu.versions.length - 1].leadTime} 天</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">新版本号</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border rounded-lg text-sm bg-gray-100"
                      value={`V${selectedSpu.versions.length + 1}`}
                      disabled
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">迭代时间 <span className="text-red-500">*</span></label>
                    <input type="date" className="w-full px-3 py-2 border rounded-lg text-sm" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">新SKU编码 <span className="text-red-500">*</span></label>
                  <input type="text" className="w-full px-3 py-2 border rounded-lg text-sm" placeholder="请输入新的SKU编码" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">采购单价 (¥) <span className="text-red-500">*</span></label>
                    <input
                      type="number"
                      step="0.01"
                      className="w-full px-3 py-2 border rounded-lg text-sm"
                      placeholder="0.00"
                      defaultValue={selectedSpu.versions[selectedSpu.versions.length - 1].unitPrice}
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">生产周期 (天) <span className="text-red-500">*</span></label>
                    <input
                      type="number"
                      className="w-full px-3 py-2 border rounded-lg text-sm"
                      placeholder="请输入天数"
                      defaultValue={selectedSpu.versions[selectedSpu.versions.length - 1].leadTime}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">供应商 <span className="text-red-500">*</span></label>
                  <select
                    className="w-full px-3 py-2 border rounded-lg text-sm"
                    defaultValue={selectedSpu.versions[selectedSpu.versions.length - 1].supplierId}
                  >
                    <option value="">请选择供应商</option>
                    <option value="SUP-001">深圳市渔具制造有限公司</option>
                    <option value="SUP-002">东莞市户外用品贸易有限公司</option>
                    <option value="SUP-003">宁波精密零件加工厂</option>
                    <option value="SUP-005">义乌小商品批发中心</option>
                    <option value="SUP-006">佛山市金属制品有限公司</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">迭代原因 <span className="text-red-500">*</span></label>
                  <textarea
                    className="w-full px-3 py-2 border rounded-lg text-sm"
                    rows={3}
                    placeholder="请详细描述本次迭代的原因，如：材料升级、工艺优化、供应商更换、成本优化等"
                  />
                </div>
                <div className="flex items-center gap-2 p-3 bg-yellow-50 rounded-lg">
                  <AlertCircle className="w-4 h-4 text-yellow-600" />
                  <p className="text-xs text-yellow-700">新版本创建后，上一版本将自动标记为"停售"状态</p>
                </div>
              </div>
            </div>
            <div className="flex gap-3 p-6 border-t bg-gray-50">
              <button onClick={handleCloseModal} className="px-4 py-2 border rounded-lg text-sm hover:bg-gray-100 transition-colors">
                取消
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors">
                确认迭代
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SkuIterationPage;
