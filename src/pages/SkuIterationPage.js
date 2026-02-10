// src/pages/SkuIterationPage.js
import React, { useState, useMemo } from 'react';
import {
  Search, ChevronRight, ChevronDown, X, Edit2,
  History, Package, DollarSign, Clock, Building2,
  GitBranch, CheckCircle2, XCircle, AlertCircle,
  AlertTriangle, Sparkles, RefreshCw
} from 'lucide-react';

const SkuIterationPage = ({ data: externalData }) => {
  const [filters, setFilters] = useState({
    keyword: '',
    productLine: '',
    status: '',
    maintainStatus: '' // 新增：维护状态筛选
  });
  const [expandedSpus, setExpandedSpus] = useState([]);
  const [showMaintainModal, setShowMaintainModal] = useState(false);
  const [selectedVersion, setSelectedVersion] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  // Mock数据 - 模拟从产品中心同步的SPU/SKU数据
  // 采购侧需要维护的字段标记在每个版本中
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
          status: '停售',
          isNew: false,
          // 采购信息（已维护完整）
          procurement: {
            supplierId: 'SUP-001',
            supplierName: '深圳市渔具制造有限公司',
            unitPrice: 125.00,
            leadTime: 15,
            moq: 500,
            isMaintained: true
          }
        },
        {
          id: 'iter1',
          type: 'iteration',
          versionNo: 'V2',
          iterationNo: 1,
          sku: 'KK-ROD-001-V2',
          iterationTime: '2023-06-15',
          iterationReason: '材料升级，采用T800碳素，提升强度和耐用性',
          status: '停售',
          isNew: false,
          procurement: {
            supplierId: 'SUP-001',
            supplierName: '深圳市渔具制造有限公司',
            unitPrice: 138.00,
            leadTime: 12,
            moq: 500,
            isMaintained: true
          }
        },
        {
          id: 'iter2',
          type: 'iteration',
          versionNo: 'V3',
          iterationNo: 2,
          sku: 'KK-ROD-001-V3',
          iterationTime: '2024-01-20',
          iterationReason: '工艺优化，缩短生产周期；新增防滑握把设计',
          status: '在售',
          isNew: false,
          procurement: {
            supplierId: 'SUP-003',
            supplierName: '宁波精密零件加工厂',
            unitPrice: 142.00,
            leadTime: 10,
            moq: 300,
            isMaintained: true
          }
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
          status: '停售',
          isNew: false,
          procurement: {
            supplierId: 'SUP-006',
            supplierName: '佛山市金属制品有限公司',
            unitPrice: 89.00,
            leadTime: 20,
            moq: 300,
            isMaintained: true
          }
        },
        {
          id: 'iter1',
          type: 'iteration',
          versionNo: 'V2',
          iterationNo: 1,
          sku: 'KK-REEL-002-V2',
          iterationTime: '2023-11-05',
          iterationReason: '升级轴承系统，改用11+1BB配置；优化齿轮比',
          status: '在售',
          isNew: false,
          procurement: {
            supplierId: 'SUP-006',
            supplierName: '佛山市金属制品有限公司',
            unitPrice: 105.00,
            leadTime: 18,
            moq: 300,
            isMaintained: true
          }
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
          status: '停售',
          isNew: false,
          procurement: {
            supplierId: 'SUP-005',
            supplierName: '义乌小商品批发中心',
            unitPrice: 28.00,
            leadTime: 7,
            moq: 1000,
            isMaintained: true
          }
        },
        {
          id: 'iter1',
          type: 'iteration',
          versionNo: 'V2',
          iterationNo: 1,
          sku: 'KK-LINE-003-V2',
          iterationTime: '2022-02-15',
          iterationReason: '升级为8编结构，提升拉力值',
          status: '停售',
          isNew: false,
          procurement: {
            supplierId: 'SUP-005',
            supplierName: '义乌小商品批发中心',
            unitPrice: 35.00,
            leadTime: 7,
            moq: 1000,
            isMaintained: true
          }
        },
        {
          id: 'iter2',
          type: 'iteration',
          versionNo: 'V3',
          iterationNo: 2,
          sku: 'KK-LINE-003-V3',
          iterationTime: '2023-04-10',
          iterationReason: '更换供应商，成本优化；增加抗UV涂层',
          status: '停售',
          isNew: false,
          procurement: {
            supplierId: 'SUP-002',
            supplierName: '东莞市户外用品贸易有限公司',
            unitPrice: 32.00,
            leadTime: 5,
            moq: 2000,
            isMaintained: true
          }
        },
        {
          id: 'iter3',
          type: 'iteration',
          versionNo: 'V4',
          iterationNo: 3,
          sku: 'KK-LINE-003-V4',
          iterationTime: '2024-02-28',
          iterationReason: '新增多色可选；优化包装设计',
          status: '在售',
          isNew: false,
          procurement: {
            supplierId: 'SUP-002',
            supplierName: '东莞市户外用品贸易有限公司',
            unitPrice: 33.50,
            leadTime: 5,
            moq: 2000,
            isMaintained: true
          }
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
          status: '在售',
          isNew: false,
          procurement: {
            supplierId: 'SUP-005',
            supplierName: '义乌小商品批发中心',
            unitPrice: 45.00,
            leadTime: 10,
            moq: 500,
            isMaintained: true
          }
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
          status: '停售',
          isNew: false,
          procurement: {
            supplierId: 'SUP-001',
            supplierName: '深圳市渔具制造有限公司',
            unitPrice: 68.00,
            leadTime: 12,
            moq: 500,
            isMaintained: true
          }
        },
        {
          id: 'iter1',
          type: 'iteration',
          versionNo: 'V2',
          iterationNo: 1,
          sku: 'KK-ROD-005-V2',
          iterationTime: '2024-02-01',
          iterationReason: '优化节点锁定机构；增加硬度规格可选',
          status: '在售',
          isNew: false,
          procurement: {
            supplierId: 'SUP-003',
            supplierName: '宁波精密零件加工厂',
            unitPrice: 72.00,
            leadTime: 10,
            moq: 300,
            isMaintained: true
          }
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
          status: '在售',
          isNew: false,
          procurement: {
            supplierId: 'SUP-006',
            supplierName: '佛山市金属制品有限公司',
            unitPrice: 156.00,
            leadTime: 25,
            moq: 200,
            isMaintained: true
          }
        }
      ]
    },
    // 新增的SPU - 产品中心刚同步过来
    {
      spuId: 'SPU-007',
      productLine: '配件系列',
      productName: 'iCool智能钓箱',
      description: '智能温控钓箱，蓝牙连接手机APP，实时监控温度',
      currentVersion: 'V1',
      activeSkuCount: 1,
      totalVersions: 1,
      hasNewSku: true, // 标记有新增SKU
      versions: [
        {
          id: 'v1',
          type: 'initial',
          versionNo: 'V1',
          sku: 'KK-IC-2024-25L-WH',
          startTime: '2025-01-28',
          remark: '新品首发，25L智能钓箱',
          status: '在售',
          isNew: true, // 新增SKU标记
          procurement: {
            supplierId: null,
            supplierName: null,
            unitPrice: null,
            leadTime: null,
            moq: null,
            isMaintained: false // 未维护
          }
        }
      ]
    },
    {
      spuId: 'SPU-008',
      productLine: '路亚竿系列',
      productName: '皇家传奇8尺路亚竿',
      description: '8尺加长版路亚竿，适合更远距离抛投',
      currentVersion: 'V1',
      activeSkuCount: 1,
      totalVersions: 1,
      hasNewSku: true,
      versions: [
        {
          id: 'v1',
          type: 'initial',
          versionNo: 'V1',
          sku: 'KK-RL-2024-8FT-MH',
          startTime: '2025-02-01',
          remark: '新品首发，8尺中硬调',
          status: '在售',
          isNew: true,
          procurement: {
            supplierId: null,
            supplierName: null,
            unitPrice: null,
            leadTime: null,
            moq: null,
            isMaintained: false
          }
        }
      ]
    },
    {
      spuId: 'SPU-009',
      productLine: '渔轮系列',
      productName: '暴风纺车轮4000型',
      description: '4000型大容量纺车轮，适合海钓和大物钓',
      currentVersion: 'V1',
      activeSkuCount: 1,
      totalVersions: 1,
      hasNewSku: true,
      versions: [
        {
          id: 'v1',
          type: 'initial',
          versionNo: 'V1',
          sku: 'KK-MG-2024-4000',
          startTime: '2025-02-05',
          remark: '新品首发，4000型',
          status: '在售',
          isNew: true,
          procurement: {
            supplierId: 'SUP-006',
            supplierName: '佛山市金属制品有限公司',
            unitPrice: 125.00,
            leadTime: null, // 部分维护
            moq: null,
            isMaintained: false // 部分字段缺失也算未维护
          }
        }
      ]
    }
  ];

  // 产品系列选项
  const productLineOptions = [...new Set(skuIterationData.map(s => s.productLine))];
  const statusOptions = ['在售', '停售'];

  // 判断版本的采购维护状态
  const getMaintainStatus = (procurement) => {
    if (!procurement.supplierId || !procurement.unitPrice || !procurement.leadTime) {
      if (!procurement.supplierId && !procurement.unitPrice && !procurement.leadTime) {
        return { status: 'empty', label: '未维护', color: 'red' };
      }
      return { status: 'partial', label: '部分维护', color: 'yellow' };
    }
    return { status: 'complete', label: '已维护', color: 'green' };
  };

  // 筛选数据
  const filteredData = useMemo(() => {
    return skuIterationData.filter(item => {
      const matchKeyword = !filters.keyword ||
        item.spuId.toLowerCase().includes(filters.keyword.toLowerCase()) ||
        item.productName.toLowerCase().includes(filters.keyword.toLowerCase()) ||
        item.versions.some(v => v.sku.toLowerCase().includes(filters.keyword.toLowerCase()));
      const matchProductLine = !filters.productLine || item.productLine === filters.productLine;
      const matchStatus = !filters.status || item.versions.some(v => v.status === filters.status);

      // 维护状态筛选
      let matchMaintainStatus = true;
      if (filters.maintainStatus === 'new') {
        matchMaintainStatus = item.versions.some(v => v.isNew);
      } else if (filters.maintainStatus === 'pending') {
        matchMaintainStatus = item.versions.some(v => !v.procurement.isMaintained);
      } else if (filters.maintainStatus === 'complete') {
        matchMaintainStatus = item.versions.every(v => v.procurement.isMaintained);
      }

      return matchKeyword && matchProductLine && matchStatus && matchMaintainStatus;
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
    setFilters({ keyword: '', productLine: '', status: '', maintainStatus: '' });
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
  const formatPrice = (price) => price ? `¥${price.toFixed(2)}` : '-';

  // 计算价格变化
  const getPriceChange = (versions, index) => {
    if (index === 0 || !versions[index].procurement.unitPrice || !versions[index - 1].procurement.unitPrice) return null;
    const current = versions[index].procurement.unitPrice;
    const previous = versions[index - 1].procurement.unitPrice;
    const diff = current - previous;
    const percent = ((diff / previous) * 100).toFixed(1);
    if (diff > 0) return { type: 'up', diff: `+${diff.toFixed(2)}`, percent: `+${percent}%` };
    if (diff < 0) return { type: 'down', diff: diff.toFixed(2), percent: `${percent}%` };
    return { type: 'same', diff: '0', percent: '0%' };
  };

  // 打开维护模态框
  const handleMaintain = (version, spu) => {
    setSelectedVersion({ ...version, spuName: spu.productName, spuId: spu.spuId });
    setShowMaintainModal(true);
  };

  // 统计数据
  const stats = useMemo(() => {
    const totalSpus = skuIterationData.length;
    const totalVersions = skuIterationData.reduce((sum, s) => sum + s.versions.length, 0);
    const activeSkus = skuIterationData.reduce((sum, s) =>
      sum + s.versions.filter(v => v.status === '在售').length, 0);
    const newSkus = skuIterationData.reduce((sum, s) =>
      sum + s.versions.filter(v => v.isNew).length, 0);
    const pendingMaintain = skuIterationData.reduce((sum, s) =>
      sum + s.versions.filter(v => !v.procurement.isMaintained).length, 0);
    return { totalSpus, totalVersions, activeSkus, newSkus, pendingMaintain };
  }, [skuIterationData]);

  return (
    <div className="flex flex-col h-full">
      {/* 统计卡片 */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-4">
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
        <div className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-l-orange-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">新增SKU</p>
              <p className="text-2xl font-bold text-orange-600">{stats.newSkus}</p>
            </div>
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-orange-600" />
            </div>
          </div>
          <p className="text-xs text-orange-500 mt-2">产品中心新同步</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-l-red-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">待维护</p>
              <p className="text-2xl font-bold text-red-600">{stats.pendingMaintain}</p>
            </div>
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-red-600" />
            </div>
          </div>
          <p className="text-xs text-red-500 mt-2">采购信息不完整</p>
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
      </div>

      {/* 筛选区域 */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
        <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold whitespace-nowrap">SKU迭代管理</h3>
            <span className="text-xs text-gray-400">主数据来源：产品中心</span>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border rounded-lg text-sm hover:bg-gray-50 whitespace-nowrap">
            <RefreshCw className="w-4 h-4" />
            同步产品数据
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
            value={filters.maintainStatus}
            onChange={(e) => {
              setFilters({ ...filters, maintainStatus: e.target.value });
              setCurrentPage(1);
            }}
            className="px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">维护状态</option>
            <option value="new">🆕 新增SKU</option>
            <option value="pending">⚠️ 待维护</option>
            <option value="complete">✅ 已维护</option>
          </select>
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
          <table className="w-full text-sm min-w-[1000px]">
            <thead className="bg-gray-50 sticky top-0">
              <tr className="border-b">
                <th className="px-4 py-3 text-left font-medium text-gray-600 w-10"></th>
                <th className="px-4 py-3 text-left font-medium text-gray-600 whitespace-nowrap">SPU编码</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600 whitespace-nowrap">产品系列</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600 whitespace-nowrap">产品名称</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600 whitespace-nowrap">产品描述</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600 whitespace-nowrap">当前版本</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600 whitespace-nowrap">版本数</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600 whitespace-nowrap">维护状态</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((spu) => {
                const isExpanded = expandedSpus.includes(spu.spuId);
                const hasUnmaintained = spu.versions.some(v => !v.procurement.isMaintained);
                const hasNew = spu.versions.some(v => v.isNew);

                return (
                  <React.Fragment key={spu.spuId}>
                    {/* SPU主行 */}
                    <tr className={`border-b hover:bg-gray-50 transition-colors ${isExpanded ? 'bg-blue-50' : ''} ${hasNew ? 'bg-orange-50/50' : ''}`}>
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
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          {hasNew && (
                            <span className="px-1.5 py-0.5 bg-orange-500 text-white rounded text-xs font-medium">
                              NEW
                            </span>
                          )}
                          <span className="font-mono text-xs text-blue-600">{spu.spuId}</span>
                        </div>
                      </td>
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
                        {hasUnmaintained ? (
                          <span className="flex items-center gap-1 text-red-600 text-xs">
                            <AlertTriangle className="w-3.5 h-3.5" />
                            待维护
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 text-green-600 text-xs">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            已完成
                          </span>
                        )}
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

                              {/* 版本网格布局 */}
                              <div className="grid grid-cols-2 xl:grid-cols-3 gap-4">
                                {spu.versions.map((version, index) => {
                                  const priceChange = getPriceChange(spu.versions, index);
                                  const maintainStatus = getMaintainStatus(version.procurement);

                                  return (
                                    <div key={version.id} className={`bg-white rounded-lg border ${
                                      version.status === '在售' ? 'border-green-300 shadow-md ring-1 ring-green-100' : 'border-gray-200'
                                    } ${version.isNew ? 'ring-2 ring-orange-300' : ''}`}>
                                      {/* 卡片头部 */}
                                      <div className={`flex items-center justify-between p-3 border-b rounded-t-lg ${
                                        version.isNew ? 'bg-orange-50' : version.status === '在售' ? 'bg-green-50' : 'bg-gray-50'
                                      }`}>
                                        <div className="flex items-center gap-2">
                                          {/* 版本序号徽章 */}
                                          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                                            version.isNew
                                              ? 'bg-orange-500 text-white'
                                              : version.status === '在售'
                                              ? 'bg-green-500 text-white'
                                              : 'bg-gray-300 text-gray-600'
                                          }`}>
                                            {version.type === 'initial' ? '1' : version.iterationNo + 1}
                                          </div>
                                          <span className="font-mono text-sm font-medium text-gray-800">
                                            {version.versionNo}
                                          </span>
                                          {version.isNew && (
                                            <span className="px-1.5 py-0.5 bg-orange-500 text-white rounded text-xs font-medium">
                                              NEW
                                            </span>
                                          )}
                                          <span className={`px-1.5 py-0.5 rounded text-xs ${
                                            version.type === 'initial'
                                              ? 'bg-blue-100 text-blue-700'
                                              : 'bg-purple-100 text-purple-700'
                                          }`}>
                                            {version.type === 'initial' ? '初始' : `迭代${version.iterationNo}`}
                                          </span>
                                        </div>
                                        <span className={`flex items-center gap-1 px-2 py-0.5 rounded text-xs border ${getStatusStyle(version.status)}`}>
                                          {getStatusIcon(version.status)}
                                          {version.status}
                                        </span>
                                      </div>

                                      {/* 卡片内容 */}
                                      <div className="p-3 space-y-2">
                                        {/* SKU编码 */}
                                        <div className="flex items-center justify-between">
                                          <span className="text-xs text-gray-400">SKU</span>
                                          <span className="font-mono text-xs text-blue-600">{version.sku}</span>
                                        </div>

                                        {/* 时间 */}
                                        <div className="flex items-center justify-between">
                                          <span className="text-xs text-gray-400">{version.type === 'initial' ? '开始时间' : '迭代时间'}</span>
                                          <span className="text-xs text-gray-600">{version.type === 'initial' ? version.startTime : version.iterationTime}</span>
                                        </div>

                                        {/* 采购信息分隔线 */}
                                        <div className="pt-2 mt-2 border-t">
                                          <div className="flex items-center justify-between mb-2">
                                            <span className="text-xs font-medium text-gray-600 flex items-center gap-1">
                                              <Building2 className="w-3 h-3" />
                                              采购信息
                                            </span>
                                            {maintainStatus.status !== 'complete' && (
                                              <span className={`px-1.5 py-0.5 rounded text-xs ${
                                                maintainStatus.color === 'red' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                                              }`}>
                                                {maintainStatus.label}
                                              </span>
                                            )}
                                          </div>

                                          {/* 采购单价 */}
                                          <div className="flex items-center justify-between">
                                            <span className="text-xs text-gray-400">采购单价</span>
                                            <div className="flex items-center gap-1">
                                              {version.procurement.unitPrice ? (
                                                <>
                                                  <span className="font-medium text-gray-800">{formatPrice(version.procurement.unitPrice)}</span>
                                                  {priceChange && priceChange.type !== 'same' && (
                                                    <span className={`text-xs ${priceChange.type === 'up' ? 'text-red-500' : 'text-green-500'}`}>
                                                      {priceChange.percent}
                                                    </span>
                                                  )}
                                                </>
                                              ) : (
                                                <span className="text-red-500 text-xs flex items-center gap-1">
                                                  <AlertCircle className="w-3 h-3" />
                                                  未维护
                                                </span>
                                              )}
                                            </div>
                                          </div>

                                          {/* 生产周期 */}
                                          <div className="flex items-center justify-between">
                                            <span className="text-xs text-gray-400">生产周期</span>
                                            {version.procurement.leadTime ? (
                                              <span className="text-xs text-gray-800">{version.procurement.leadTime} 天</span>
                                            ) : (
                                              <span className="text-red-500 text-xs">未维护</span>
                                            )}
                                          </div>

                                          {/* 供应商 */}
                                          <div className="flex items-center justify-between">
                                            <span className="text-xs text-gray-400">供应商</span>
                                            {version.procurement.supplierName ? (
                                              <span className="text-xs text-gray-800 truncate max-w-[120px]" title={version.procurement.supplierName}>
                                                {version.procurement.supplierName.length > 10 ? version.procurement.supplierName.slice(0, 10) + '...' : version.procurement.supplierName}
                                              </span>
                                            ) : (
                                              <span className="text-red-500 text-xs">未维护</span>
                                            )}
                                          </div>
                                        </div>

                                        {/* 版本备注/迭代原因 */}
                                        <div className="pt-2 mt-2 border-t">
                                          <p className="text-xs text-gray-400 mb-1">
                                            {version.type === 'initial' ? '备注' : '迭代原因'}
                                          </p>
                                          <p className="text-xs text-gray-600 line-clamp-2" title={version.type === 'initial' ? version.remark : version.iterationReason}>
                                            {version.type === 'initial' ? version.remark : version.iterationReason}
                                          </p>
                                        </div>

                                        {/* 操作按钮 */}
                                        <div className="pt-2 flex justify-end">
                                          <button
                                            onClick={() => handleMaintain(version, spu)}
                                            className={`flex items-center gap-1 px-3 py-1.5 rounded text-xs transition-colors ${
                                              maintainStatus.status !== 'complete'
                                                ? 'bg-blue-600 text-white hover:bg-blue-700'
                                                : 'border text-gray-600 hover:bg-gray-50'
                                            }`}
                                          >
                                            <Edit2 className="w-3 h-3" />
                                            {maintainStatus.status !== 'complete' ? '维护采购信息' : '编辑'}
                                          </button>
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
        <div className="p-4 border-t bg-gray-50 flex items-center justify-between flex-wrap gap-3">
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

      {/* 维护采购信息模态框 */}
      {showMaintainModal && selectedVersion && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black bg-opacity-30" onClick={() => setShowMaintainModal(false)} />
          <div className="relative bg-white rounded-lg shadow-xl w-[600px] max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-semibold">维护采购信息</h3>
                  {selectedVersion.isNew && (
                    <span className="px-2 py-0.5 bg-orange-500 text-white rounded text-xs">新增SKU</span>
                  )}
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  {selectedVersion.spuName} - <span className="font-mono">{selectedVersion.sku}</span>
                </p>
              </div>
              <button onClick={() => setShowMaintainModal(false)} className="p-1 hover:bg-gray-100 rounded transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
              {/* 上一版本参考（如果有） */}
              {selectedVersion.type !== 'initial' && (
                <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-500 mb-2">参考上一版本采购信息</p>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-gray-400">单价: </span>
                      <span>{selectedVersion.procurement.unitPrice ? formatPrice(selectedVersion.procurement.unitPrice) : '-'}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">周期: </span>
                      <span>{selectedVersion.procurement.leadTime ? `${selectedVersion.procurement.leadTime} 天` : '-'}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">MOQ: </span>
                      <span>{selectedVersion.procurement.moq || '-'}</span>
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">供应商 <span className="text-red-500">*</span></label>
                  <select
                    className="w-full px-3 py-2 border rounded-lg text-sm"
                    defaultValue={selectedVersion.procurement.supplierId || ''}
                  >
                    <option value="">请选择供应商</option>
                    <option value="SUP-001">深圳市渔具制造有限公司</option>
                    <option value="SUP-002">东莞市户外用品贸易有限公司</option>
                    <option value="SUP-003">宁波精密零件加工厂</option>
                    <option value="SUP-005">义乌小商品批发中心</option>
                    <option value="SUP-006">佛山市金属制品有限公司</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">采购单价 (¥) <span className="text-red-500">*</span></label>
                    <input
                      type="number"
                      step="0.01"
                      className="w-full px-3 py-2 border rounded-lg text-sm"
                      placeholder="0.00"
                      defaultValue={selectedVersion.procurement.unitPrice || ''}
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">生产周期 (天) <span className="text-red-500">*</span></label>
                    <input
                      type="number"
                      className="w-full px-3 py-2 border rounded-lg text-sm"
                      placeholder="请输入天数"
                      defaultValue={selectedVersion.procurement.leadTime || ''}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">MOQ (最小起订量)</label>
                  <input
                    type="number"
                    className="w-full px-3 py-2 border rounded-lg text-sm"
                    placeholder="请输入数量"
                    defaultValue={selectedVersion.procurement.moq || ''}
                  />
                </div>
                {getMaintainStatus(selectedVersion.procurement).status !== 'complete' && (
                  <div className="p-3 bg-yellow-50 rounded-lg flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                    <div className="text-xs text-yellow-700">
                      <p className="font-medium mb-1">采购信息不完整</p>
                      <p>请填写供应商、采购单价和生产周期，以便进行采购计划和成本核算。</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="flex gap-3 p-6 border-t bg-gray-50">
              <button onClick={() => setShowMaintainModal(false)} className="px-4 py-2 border rounded-lg text-sm hover:bg-gray-100 transition-colors">
                取消
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors">
                保存
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SkuIterationPage;
