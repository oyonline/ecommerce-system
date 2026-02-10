// src/pages/SkuIterationPage.js
import React, { useState, useMemo } from 'react';
import {
  Search, AlertTriangle, CheckCircle2, Clock, Package, Building2,
  DollarSign, X, Edit2, ChevronRight, ChevronDown, RefreshCw,
  AlertCircle, CircleDot, Sparkles, Filter
} from 'lucide-react';

const SkuIterationPage = () => {
  const [filters, setFilters] = useState({
    keyword: '',
    maintainStatus: '',
    productLine: '',
    supplier: ''
  });
  const [expandedSpus, setExpandedSpus] = useState([]);
  const [showMaintainModal, setShowMaintainModal] = useState(false);
  const [selectedSku, setSelectedSku] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  // 模拟从产品中心同步的SKU数据
  // 采购侧需要维护的字段：supplier, unitPrice, leadTime, moq, paymentTerms, procurementNote
  const skuData = [
    {
      skuId: 'SKU-001',
      sku: 'KK-RL-2024-7FT-M',
      spuId: 'SPU-001',
      productName: 'Royale Legend 7尺路亚竿 中调',
      productLine: '路亚竿系列',
      brand: 'KastKing',
      specs: '7尺/中调/黑色',
      status: '在售',
      createTime: '2024-01-15',
      isNew: false,
      // 采购信息（已维护）
      procurement: {
        supplier: '深圳市渔具制造有限公司',
        supplierId: 'SUP-001',
        unitPrice: 142.00,
        leadTime: 10,
        moq: 500,
        paymentTerms: '月结30天',
        procurementNote: '主力供应商，质量稳定',
        lastUpdated: '2025-01-20'
      }
    },
    {
      skuId: 'SKU-002',
      sku: 'KK-MG-2024-3000',
      spuId: 'SPU-002',
      productName: 'Megatron 3000纺车轮',
      productLine: '渔轮系列',
      brand: 'KastKing',
      specs: '3000型/金属机身',
      status: '在售',
      createTime: '2024-02-20',
      isNew: false,
      procurement: {
        supplier: '佛山市金属制品有限公司',
        supplierId: 'SUP-006',
        unitPrice: 105.00,
        leadTime: 18,
        moq: 300,
        paymentTerms: '预付30%',
        procurementNote: '',
        lastUpdated: '2025-01-15'
      }
    },
    {
      skuId: 'SKU-003',
      sku: 'KK-SD-2024-7FT-XF',
      spuId: 'SPU-003',
      productName: 'Speed Demon 7尺竞技竿 超快调',
      productLine: '路亚竿系列',
      brand: 'KastKing',
      specs: '7尺/超快调/红黑',
      status: '在售',
      createTime: '2024-03-10',
      isNew: false,
      procurement: {
        supplier: '宁波精密零件加工厂',
        supplierId: 'SUP-003',
        unitPrice: 168.00,
        leadTime: 12,
        moq: 200,
        paymentTerms: '月结45天',
        procurementNote: '高端产品线专供',
        lastUpdated: '2025-01-18'
      }
    },
    {
      skuId: 'SKU-004',
      sku: 'KK-SK3-2024-12FT-H',
      spuId: 'SPU-004',
      productName: 'Sharky III 12尺海竿 硬调',
      productLine: '海竿系列',
      brand: 'KastKing',
      specs: '12尺/硬调/海钓',
      status: '在售',
      createTime: '2024-04-05',
      isNew: false,
      // 采购信息部分缺失
      procurement: {
        supplier: '青岛海钓装备有限公司',
        supplierId: 'SUP-007',
        unitPrice: 185.00,
        leadTime: null, // 缺失
        moq: null, // 缺失
        paymentTerms: '',
        procurementNote: '',
        lastUpdated: '2025-01-10'
      }
    },
    {
      skuId: 'SKU-005',
      sku: 'PF-TAC-2024-L-BK',
      spuId: 'SPU-005',
      productName: '战术路亚包 L号 黑色',
      productLine: '钓鱼包系列',
      brand: 'Piscifun',
      specs: 'L号/黑色/1000D尼龙',
      status: '在售',
      createTime: '2024-05-12',
      isNew: false,
      procurement: {
        supplier: '广州户外装备厂',
        supplierId: 'SUP-008',
        unitPrice: 45.00,
        leadTime: 7,
        moq: 1000,
        paymentTerms: '月结30天',
        procurementNote: '',
        lastUpdated: '2025-01-22'
      }
    },
    {
      skuId: 'SKU-006',
      sku: 'PF-CARB-2024-20LB-150M',
      spuId: 'SPU-006',
      productName: '碳素编织线 20磅 150米',
      productLine: '钓线系列',
      brand: 'Piscifun',
      specs: '20LB/150M/8编',
      status: '在售',
      createTime: '2024-06-18',
      isNew: false,
      procurement: {
        supplier: '苏州渔线生产基地',
        supplierId: 'SUP-009',
        unitPrice: 12.50,
        leadTime: 5,
        moq: 5000,
        paymentTerms: '预付50%',
        procurementNote: '大批量采购价格可议',
        lastUpdated: '2025-01-25'
      }
    },
    {
      skuId: 'SKU-007',
      sku: 'KK-IC-2024-25L-WH',
      spuId: 'SPU-007',
      productName: 'iCool 智能钓箱 25L 白色',
      productLine: '配件系列',
      brand: 'KastKing',
      specs: '25L/白色/智能温控',
      status: '在售',
      createTime: '2025-01-28',
      isNew: true, // 新品
      // 采购信息完全缺失
      procurement: {
        supplier: null,
        supplierId: null,
        unitPrice: null,
        leadTime: null,
        moq: null,
        paymentTerms: '',
        procurementNote: '',
        lastUpdated: null
      }
    },
    {
      skuId: 'SKU-008',
      sku: 'KK-RL-2024-8FT-MH',
      spuId: 'SPU-001',
      productName: 'Royale Legend 8尺路亚竿 中硬调',
      productLine: '路亚竿系列',
      brand: 'KastKing',
      specs: '8尺/中硬调/黑色',
      status: '在售',
      createTime: '2025-02-01',
      isNew: true, // 新品
      // 采购信息完全缺失
      procurement: {
        supplier: null,
        supplierId: null,
        unitPrice: null,
        leadTime: null,
        moq: null,
        paymentTerms: '',
        procurementNote: '',
        lastUpdated: null
      }
    },
    {
      skuId: 'SKU-009',
      sku: 'KK-MG-2024-4000',
      spuId: 'SPU-002',
      productName: 'Megatron 4000纺车轮',
      productLine: '渔轮系列',
      brand: 'KastKing',
      specs: '4000型/金属机身',
      status: '在售',
      createTime: '2025-02-05',
      isNew: true, // 新品
      // 采购信息部分缺失
      procurement: {
        supplier: '佛山市金属制品有限公司',
        supplierId: 'SUP-006',
        unitPrice: 125.00,
        leadTime: null,
        moq: null,
        paymentTerms: '',
        procurementNote: '',
        lastUpdated: '2025-02-06'
      }
    },
    {
      skuId: 'SKU-010',
      sku: 'PF-TAC-2024-XL-BK',
      spuId: 'SPU-005',
      productName: '战术路亚包 XL号 黑色',
      productLine: '钓鱼包系列',
      brand: 'Piscifun',
      specs: 'XL号/黑色/1000D尼龙',
      status: '在售',
      createTime: '2025-02-08',
      isNew: true, // 新品
      // 完全未维护
      procurement: {
        supplier: null,
        supplierId: null,
        unitPrice: null,
        leadTime: null,
        moq: null,
        paymentTerms: '',
        procurementNote: '',
        lastUpdated: null
      }
    },
    {
      skuId: 'SKU-011',
      sku: 'KK-SK3R-2024-5000',
      spuId: 'SPU-008',
      productName: 'Sharky III 5000海钓轮',
      productLine: '渔轮系列',
      brand: 'KastKing',
      specs: '5000型/海钓专用',
      status: '在售',
      createTime: '2024-08-15',
      isNew: false,
      procurement: {
        supplier: '佛山市金属制品有限公司',
        supplierId: 'SUP-006',
        unitPrice: 156.00,
        leadTime: 20,
        moq: 200,
        paymentTerms: '预付30%',
        procurementNote: '海钓系列主力产品',
        lastUpdated: '2025-01-12'
      }
    },
    {
      skuId: 'SKU-012',
      sku: 'KK-RL-2023-6FT-ML',
      spuId: 'SPU-001',
      productName: 'Royale Legend 6尺路亚竿 中轻调 (旧款)',
      productLine: '路亚竿系列',
      brand: 'KastKing',
      specs: '6尺/中轻调/黑色',
      status: '停售',
      createTime: '2023-03-20',
      isNew: false,
      procurement: {
        supplier: '深圳市渔具制造有限公司',
        supplierId: 'SUP-001',
        unitPrice: 98.00,
        leadTime: 12,
        moq: 500,
        paymentTerms: '月结30天',
        procurementNote: '已停产，库存清理中',
        lastUpdated: '2024-06-15'
      }
    }
  ];

  // 产品系列选项
  const productLineOptions = [...new Set(skuData.map(s => s.productLine))];

  // 供应商选项
  const supplierOptions = [...new Set(skuData.filter(s => s.procurement.supplier).map(s => s.procurement.supplier))];

  // 判断采购信息维护状态
  const getMaintainStatus = (procurement) => {
    const requiredFields = ['supplier', 'unitPrice', 'leadTime'];
    const filledCount = requiredFields.filter(f => procurement[f] !== null && procurement[f] !== '').length;

    if (filledCount === 0) return { status: 'empty', label: '未维护', color: 'red' };
    if (filledCount < requiredFields.length) return { status: 'partial', label: '部分维护', color: 'yellow' };
    return { status: 'complete', label: '已完成', color: 'green' };
  };

  // 计算维护进度
  const getMaintainProgress = (procurement) => {
    const fields = ['supplier', 'unitPrice', 'leadTime', 'moq', 'paymentTerms'];
    const filledCount = fields.filter(f => procurement[f] !== null && procurement[f] !== '').length;
    return Math.round((filledCount / fields.length) * 100);
  };

  // 筛选数据
  const filteredData = useMemo(() => {
    return skuData.filter(item => {
      const matchKeyword = !filters.keyword ||
        item.sku.toLowerCase().includes(filters.keyword.toLowerCase()) ||
        item.productName.toLowerCase().includes(filters.keyword.toLowerCase());

      const status = getMaintainStatus(item.procurement);
      const matchMaintainStatus = !filters.maintainStatus ||
        (filters.maintainStatus === 'pending' && (status.status === 'empty' || status.status === 'partial')) ||
        (filters.maintainStatus === 'complete' && status.status === 'complete') ||
        (filters.maintainStatus === 'new' && item.isNew);

      const matchProductLine = !filters.productLine || item.productLine === filters.productLine;
      const matchSupplier = !filters.supplier || item.procurement.supplier === filters.supplier;

      return matchKeyword && matchMaintainStatus && matchProductLine && matchSupplier;
    });
  }, [skuData, filters]);

  // 统计数据
  const stats = useMemo(() => {
    const total = skuData.length;
    const newSkus = skuData.filter(s => s.isNew).length;
    const pendingMaintain = skuData.filter(s => {
      const status = getMaintainStatus(s.procurement);
      return status.status === 'empty' || status.status === 'partial';
    }).length;
    const complete = skuData.filter(s => getMaintainStatus(s.procurement).status === 'complete').length;
    const newPending = skuData.filter(s => s.isNew && getMaintainStatus(s.procurement).status !== 'complete').length;

    return { total, newSkus, pendingMaintain, complete, newPending };
  }, [skuData]);

  // 分页
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredData.slice(start, start + pageSize);
  }, [filteredData, currentPage, pageSize]);

  const totalPages = Math.ceil(filteredData.length / pageSize);

  // 打开维护模态框
  const handleMaintain = (sku) => {
    setSelectedSku(sku);
    setShowMaintainModal(true);
  };

  // 重置筛选
  const resetFilters = () => {
    setFilters({ keyword: '', maintainStatus: '', productLine: '', supplier: '' });
    setCurrentPage(1);
  };

  // 获取状态样式
  const getStatusStyle = (status) => {
    const styles = {
      '在售': 'bg-green-100 text-green-700',
      '停售': 'bg-gray-100 text-gray-500'
    };
    return styles[status] || 'bg-gray-100 text-gray-500';
  };

  // 获取维护状态样式
  const getMaintainStatusStyle = (color) => {
    const styles = {
      red: 'bg-red-100 text-red-700 border-red-200',
      yellow: 'bg-yellow-100 text-yellow-700 border-yellow-200',
      green: 'bg-green-100 text-green-700 border-green-200'
    };
    return styles[color] || 'bg-gray-100 text-gray-700';
  };

  // 格式化价格
  const formatPrice = (price) => price ? `¥${price.toFixed(2)}` : '-';

  return (
    <div className="flex flex-col h-full">
      {/* 统计卡片 */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-4">
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">SKU总数</p>
              <p className="text-2xl font-bold text-gray-800">{stats.total}</p>
            </div>
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Package className="w-5 h-5 text-blue-600" />
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-2">产品中心同步</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-l-orange-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">新增待维护</p>
              <p className="text-2xl font-bold text-orange-600">{stats.newPending}</p>
            </div>
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-orange-600" />
            </div>
          </div>
          <p className="text-xs text-orange-500 mt-2">需优先处理</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">待维护</p>
              <p className="text-2xl font-bold text-red-600">{stats.pendingMaintain}</p>
            </div>
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-red-600" />
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-2">采购信息不完整</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">已完成</p>
              <p className="text-2xl font-bold text-green-600">{stats.complete}</p>
            </div>
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-2">采购信息完整</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">维护率</p>
              <p className="text-2xl font-bold text-blue-600">{Math.round((stats.complete / stats.total) * 100)}%</p>
            </div>
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <CircleDot className="w-5 h-5 text-blue-600" />
            </div>
          </div>
          <div className="mt-2 h-1.5 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-600 rounded-full transition-all"
              style={{ width: `${(stats.complete / stats.total) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* 筛选区域 */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
        <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold whitespace-nowrap">SKU采购信息维护</h3>
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
              placeholder="SKU编码 / 产品名称"
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
            <option value="complete">✅ 已完成</option>
          </select>
          <select
            value={filters.productLine}
            onChange={(e) => {
              setFilters({ ...filters, productLine: e.target.value });
              setCurrentPage(1);
            }}
            className="px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">产品系列</option>
            {productLineOptions.map(line => (
              <option key={line} value={line}>{line}</option>
            ))}
          </select>
          <select
            value={filters.supplier}
            onChange={(e) => {
              setFilters({ ...filters, supplier: e.target.value });
              setCurrentPage(1);
            }}
            className="px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">供应商</option>
            {supplierOptions.map(supplier => (
              <option key={supplier} value={supplier}>{supplier}</option>
            ))}
          </select>
          <button
            onClick={resetFilters}
            className="px-4 py-2 border rounded-lg text-sm text-gray-600 hover:bg-gray-50"
          >
            重置
          </button>
        </div>
      </div>

      {/* 表格区域 */}
      <div className="flex-1 bg-white rounded-lg shadow-sm flex flex-col overflow-hidden">
        <div className="flex-1 overflow-auto">
          <table className="w-full text-sm min-w-[1300px]">
            <thead className="bg-gray-50 sticky top-0">
              <tr className="border-b">
                <th className="px-4 py-3 text-left font-medium text-gray-600 whitespace-nowrap">SKU编码</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600 whitespace-nowrap">产品信息</th>
                <th className="px-4 py-3 text-center font-medium text-gray-600 whitespace-nowrap">维护状态</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600 whitespace-nowrap">供应商</th>
                <th className="px-4 py-3 text-right font-medium text-gray-600 whitespace-nowrap">采购单价</th>
                <th className="px-4 py-3 text-right font-medium text-gray-600 whitespace-nowrap">生产周期</th>
                <th className="px-4 py-3 text-right font-medium text-gray-600 whitespace-nowrap">MOQ</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600 whitespace-nowrap">付款方式</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600 whitespace-nowrap">操作</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((item) => {
                const maintainStatus = getMaintainStatus(item.procurement);
                const progress = getMaintainProgress(item.procurement);

                return (
                  <tr key={item.skuId} className={`border-b hover:bg-gray-50 ${item.isNew ? 'bg-orange-50/50' : ''}`}>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        {item.isNew && (
                          <span className="px-1.5 py-0.5 bg-orange-500 text-white rounded text-xs font-medium">
                            NEW
                          </span>
                        )}
                        <span className="font-mono text-xs text-blue-600">{item.sku}</span>
                      </div>
                      <div className="text-xs text-gray-400 mt-0.5">创建: {item.createTime}</div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="max-w-[220px]">
                        <div className="font-medium text-gray-900 truncate">{item.productName}</div>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="px-1.5 py-0.5 bg-purple-50 text-purple-600 rounded text-xs">
                            {item.productLine}
                          </span>
                          <span className={`px-1.5 py-0.5 rounded text-xs ${getStatusStyle(item.status)}`}>
                            {item.status}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-col items-center gap-1">
                        <span className={`px-2 py-0.5 rounded text-xs border ${getMaintainStatusStyle(maintainStatus.color)}`}>
                          {maintainStatus.label}
                        </span>
                        <div className="w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all ${
                              maintainStatus.color === 'green' ? 'bg-green-500' :
                              maintainStatus.color === 'yellow' ? 'bg-yellow-500' : 'bg-red-300'
                            }`}
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                        <span className="text-xs text-gray-400">{progress}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      {item.procurement.supplier ? (
                        <div className="max-w-[150px]">
                          <div className="text-sm truncate" title={item.procurement.supplier}>
                            {item.procurement.supplier}
                          </div>
                        </div>
                      ) : (
                        <span className="text-red-500 text-xs flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          未维护
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-right">
                      {item.procurement.unitPrice ? (
                        <span className="font-medium">{formatPrice(item.procurement.unitPrice)}</span>
                      ) : (
                        <span className="text-red-500 text-xs">未维护</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-right">
                      {item.procurement.leadTime ? (
                        <span>{item.procurement.leadTime} 天</span>
                      ) : (
                        <span className="text-red-500 text-xs">未维护</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-right">
                      {item.procurement.moq ? (
                        <span>{item.procurement.moq.toLocaleString()}</span>
                      ) : (
                        <span className="text-gray-400 text-xs">-</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-xs">
                      {item.procurement.paymentTerms || <span className="text-gray-400">-</span>}
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => handleMaintain(item)}
                        className={`flex items-center gap-1 px-3 py-1.5 rounded text-xs transition-colors ${
                          maintainStatus.status !== 'complete'
                            ? 'bg-blue-600 text-white hover:bg-blue-700'
                            : 'border text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        <Edit2 className="w-3 h-3" />
                        {maintainStatus.status !== 'complete' ? '维护' : '编辑'}
                      </button>
                    </td>
                  </tr>
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
            共 <span className="font-semibold text-gray-800">{filteredData.length}</span> 个SKU
            {filters.maintainStatus === 'pending' && (
              <span className="text-orange-500 ml-2">（待维护采购信息）</span>
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
      {showMaintainModal && selectedSku && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black bg-opacity-30" onClick={() => setShowMaintainModal(false)} />
          <div className="relative bg-white rounded-lg shadow-xl w-[650px] max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-semibold">维护采购信息</h3>
                  {selectedSku.isNew && (
                    <span className="px-2 py-0.5 bg-orange-500 text-white rounded text-xs">新增SKU</span>
                  )}
                </div>
                <p className="text-sm text-gray-500 mt-1 font-mono">{selectedSku.sku}</p>
              </div>
              <button onClick={() => setShowMaintainModal(false)} className="p-1 hover:bg-gray-100 rounded">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
              {/* 产品信息（只读） */}
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                  <Package className="w-4 h-4" />
                  产品信息（来自产品中心）
                </h4>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="text-gray-500">产品名称：</span>
                    <span className="text-gray-800">{selectedSku.productName}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">产品系列：</span>
                    <span className="text-gray-800">{selectedSku.productLine}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">规格：</span>
                    <span className="text-gray-800">{selectedSku.specs}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">状态：</span>
                    <span className={`px-1.5 py-0.5 rounded text-xs ${getStatusStyle(selectedSku.status)}`}>
                      {selectedSku.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* 采购信息（可编辑） */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                  <Building2 className="w-4 h-4" />
                  采购信息
                  <span className="text-xs text-gray-400 font-normal">（标 * 为必填）</span>
                </h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">
                      供应商 <span className="text-red-500">*</span>
                    </label>
                    <select
                      className="w-full px-3 py-2 border rounded-lg text-sm"
                      defaultValue={selectedSku.procurement.supplierId || ''}
                    >
                      <option value="">请选择供应商</option>
                      <option value="SUP-001">深圳市渔具制造有限公司</option>
                      <option value="SUP-003">宁波精密零件加工厂</option>
                      <option value="SUP-006">佛山市金属制品有限公司</option>
                      <option value="SUP-007">青岛海钓装备有限公司</option>
                      <option value="SUP-008">广州户外装备厂</option>
                      <option value="SUP-009">苏州渔线生产基地</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">
                        采购单价 (¥) <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        className="w-full px-3 py-2 border rounded-lg text-sm"
                        placeholder="0.00"
                        defaultValue={selectedSku.procurement.unitPrice || ''}
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">
                        生产周期 (天) <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        className="w-full px-3 py-2 border rounded-lg text-sm"
                        placeholder="请输入天数"
                        defaultValue={selectedSku.procurement.leadTime || ''}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">MOQ (最小起订量)</label>
                      <input
                        type="number"
                        className="w-full px-3 py-2 border rounded-lg text-sm"
                        placeholder="请输入数量"
                        defaultValue={selectedSku.procurement.moq || ''}
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">付款方式</label>
                      <select
                        className="w-full px-3 py-2 border rounded-lg text-sm"
                        defaultValue={selectedSku.procurement.paymentTerms || ''}
                      >
                        <option value="">请选择</option>
                        <option value="月结30天">月结30天</option>
                        <option value="月结45天">月结45天</option>
                        <option value="月结60天">月结60天</option>
                        <option value="预付30%">预付30%</option>
                        <option value="预付50%">预付50%</option>
                        <option value="款到发货">款到发货</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-gray-600 mb-1">采购备注</label>
                    <textarea
                      className="w-full px-3 py-2 border rounded-lg text-sm"
                      rows={3}
                      placeholder="请输入采购相关备注信息..."
                      defaultValue={selectedSku.procurement.procurementNote || ''}
                    />
                  </div>
                </div>
              </div>

              {/* 提示信息 */}
              {getMaintainStatus(selectedSku.procurement).status !== 'complete' && (
                <div className="mt-4 p-3 bg-yellow-50 rounded-lg flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                  <div className="text-xs text-yellow-700">
                    <p className="font-medium mb-1">当前采购信息不完整</p>
                    <p>请至少填写供应商、采购单价和生产周期，以便进行采购计划和成本核算。</p>
                  </div>
                </div>
              )}
            </div>

            <div className="flex gap-3 p-6 border-t bg-gray-50">
              <button
                onClick={() => setShowMaintainModal(false)}
                className="px-4 py-2 border rounded-lg text-sm hover:bg-gray-100"
              >
                取消
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700">
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
