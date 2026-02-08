// src/pages/SalesTargetPage.js
// 销售目标管理页面 - 按业务单元和店铺细分月度销售目标
import React from 'react';
import {
  Search,
  Download,
  Upload,
  Edit,
  Save,
  X,
  ChevronDown,
  ChevronRight,
  Target,
  TrendingUp,
  Building2,
  Store,
  Calendar,
  BarChart3,
} from 'lucide-react';

// 轻量工具：className 拼接
const cn = (...args) => args.filter(Boolean).join(' ');

// --------------- 月份常量 ---------------
const MONTHS = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];
const MONTH_KEYS = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];

// --------------- 业务单元数据 ---------------
const businessUnits = [
  {
    id: 'BM000007',
    name: '欧美事业部',
    manager: 'Tate',
    departments: [
      { id: 'BM000101', name: '平台电商部', manager: 'Jason' },
      { id: 'BM000094', name: '直营电商部', manager: '-' },
    ],
  },
  {
    id: 'BM000008',
    name: '亚太事业部',
    manager: 'Effie',
    departments: [
      { id: 'BM000008-PLATFORM', name: '平台电商部', manager: '-' },
    ],
  },
];

// --------------- 店铺数据（关联到部门）---------------
const stores = [
  // 欧美事业部 - 平台电商部
  { id: 'AMZ_US_01', name: 'Amazon美国站', customerGroup: 'Amazon', country: '美国', deptId: 'BM000101', buId: 'BM000007', currency: 'USD' },
  { id: 'AMZ_UK_01', name: 'Amazon英国站', customerGroup: 'Amazon', country: '英国', deptId: 'BM000101', buId: 'BM000007', currency: 'GBP' },
  { id: 'AMZ_DE_01', name: 'Amazon德国站', customerGroup: 'Amazon', country: '德国', deptId: 'BM000101', buId: 'BM000007', currency: 'EUR' },
  { id: 'EBAY_US_01', name: 'eBay美国站', customerGroup: 'eBay', country: '美国', deptId: 'BM000101', buId: 'BM000007', currency: 'USD' },
  { id: 'WALMART_US', name: 'Walmart美国站', customerGroup: 'Walmart', country: '美国', deptId: 'BM000101', buId: 'BM000007', currency: 'USD' },
  // 欧美事业部 - 直营电商部
  { id: 'TIKTOK_US', name: 'TikTok Shop US', customerGroup: 'TikTok', country: '美国', deptId: 'BM000094', buId: 'BM000007', currency: 'USD' },
  { id: 'DTC_OFFICIAL', name: '官网独立站', customerGroup: 'DTC', country: '全球', deptId: 'BM000094', buId: 'BM000007', currency: 'USD' },
  // 亚太事业部 - 平台电商部
  { id: 'TMALL_CN_01', name: '天猫旗舰店', customerGroup: '天猫', country: '中国', deptId: 'BM000008-PLATFORM', buId: 'BM000008', currency: 'CNY' },
  { id: 'JD_CN_01', name: '京东旗舰店', customerGroup: '京东', country: '中国', deptId: 'BM000008-PLATFORM', buId: 'BM000008', currency: 'CNY' },
  { id: 'SHOPEE_SG', name: 'Shopee新加坡站', customerGroup: 'Shopee', country: '新加坡', deptId: 'BM000008-PLATFORM', buId: 'BM000008', currency: 'SGD' },
  { id: 'LAZADA_TH', name: 'Lazada泰国站', customerGroup: 'Lazada', country: '泰国', deptId: 'BM000008-PLATFORM', buId: 'BM000008', currency: 'THB' },
];

// --------------- 模拟销售目标数据 ---------------
const generateTargetData = (year) => {
  const data = {};
  stores.forEach(store => {
    // 根据店铺规模生成不同的基准目标
    let baseTarget = 100000;
    if (store.customerGroup === 'Amazon') baseTarget = 500000;
    else if (store.customerGroup === '天猫' || store.customerGroup === '京东') baseTarget = 300000;
    else if (store.customerGroup === 'TikTok' || store.customerGroup === 'DTC') baseTarget = 150000;

    const targets = {};
    const actuals = {};

    MONTH_KEYS.forEach((month, idx) => {
      // 添加季节性波动
      const seasonalFactor = idx >= 9 && idx <= 11 ? 1.5 : (idx >= 5 && idx <= 7 ? 0.8 : 1);
      const randomFactor = 0.9 + Math.random() * 0.2;
      targets[month] = Math.round(baseTarget * seasonalFactor * randomFactor);

      // 如果是过去的月份，生成实际数据
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();
      const currentMonth = currentDate.getMonth();

      if (year < currentYear || (year === currentYear && idx < currentMonth)) {
        const achievementRate = 0.85 + Math.random() * 0.3; // 85%-115% 完成率
        actuals[month] = Math.round(targets[month] * achievementRate);
      } else if (year === currentYear && idx === currentMonth) {
        // 当前月份，部分完成
        const partialRate = (currentDate.getDate() / 30) * (0.9 + Math.random() * 0.2);
        actuals[month] = Math.round(targets[month] * partialRate);
      } else {
        actuals[month] = 0;
      }
    });

    data[store.id] = { targets, actuals };
  });
  return data;
};

// --------------- 轻量组件 ---------------
const IconButton = ({ children, onClick, className, disabled }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={cn(
      'inline-flex items-center justify-center h-9 px-3 rounded-md border border-gray-200 text-sm text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed',
      className
    )}
    type="button"
  >
    {children}
  </button>
);

const PrimaryButton = ({ children, onClick, className, disabled }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={cn(
      'inline-flex items-center justify-center h-9 px-4 rounded-md text-sm text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50',
      className
    )}
    type="button"
  >
    {children}
  </button>
);

const Badge = ({ children, className }) => (
  <span className={cn('inline-flex items-center rounded border px-2 py-0.5 text-xs font-medium', className)}>
    {children}
  </span>
);

const Card = ({ children, className }) => (
  <div className={cn('bg-white rounded-lg border border-gray-200 shadow-sm', className)}>
    {children}
  </div>
);

// 进度条组件
const ProgressBar = ({ value, max, className }) => {
  const percentage = max > 0 ? Math.min((value / max) * 100, 150) : 0;
  const displayPercentage = Math.min(percentage, 100);
  const isOverAchieved = percentage > 100;

  return (
    <div className={cn('relative', className)}>
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className={cn(
            'h-full rounded-full transition-all',
            isOverAchieved ? 'bg-green-500' : percentage >= 80 ? 'bg-blue-500' : percentage >= 50 ? 'bg-yellow-500' : 'bg-red-500'
          )}
          style={{ width: `${displayPercentage}%` }}
        />
      </div>
      {isOverAchieved && (
        <div className="absolute -right-1 -top-1">
          <span className="text-xs text-green-600">🎯</span>
        </div>
      )}
    </div>
  );
};

// 格式化金额
const formatCurrency = (amount, currency = 'CNY') => {
  const symbols = { CNY: '¥', USD: '$', EUR: '€', GBP: '£', SGD: 'S$', THB: '฿' };
  const symbol = symbols[currency] || currency;
  if (amount >= 1000000) {
    return `${symbol}${(amount / 1000000).toFixed(2)}M`;
  } else if (amount >= 1000) {
    return `${symbol}${(amount / 1000).toFixed(1)}K`;
  }
  return `${symbol}${amount.toLocaleString()}`;
};

// --------------- 编辑目标抽屉 ---------------
function EditTargetDrawer({ isOpen, onClose, store, year, targetData, onSave }) {
  const [editedTargets, setEditedTargets] = React.useState({});

  React.useEffect(() => {
    if (store && targetData) {
      setEditedTargets({ ...targetData.targets });
    }
  }, [store, targetData]);

  if (!isOpen || !store) return null;

  const handleChange = (month, value) => {
    setEditedTargets(prev => ({
      ...prev,
      [month]: parseInt(value) || 0
    }));
  };

  const handleSave = () => {
    onSave(store.id, editedTargets);
    onClose();
  };

  const totalTarget = Object.values(editedTargets).reduce((sum, v) => sum + v, 0);
  const totalActual = targetData ? Object.values(targetData.actuals).reduce((sum, v) => sum + v, 0) : 0;

  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="absolute right-0 top-0 bottom-0 w-[500px] bg-white shadow-xl flex flex-col">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">编辑销售目标</h3>
            <p className="text-sm text-gray-500">{store.name} - {year}年</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-md hover:bg-gray-100 text-gray-400">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {/* 汇总信息 */}
          <Card className="p-4 mb-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-gray-500">年度目标总计</div>
                <div className="text-2xl font-bold text-gray-900">{formatCurrency(totalTarget, store.currency)}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">已完成金额</div>
                <div className="text-2xl font-bold text-blue-600">{formatCurrency(totalActual, store.currency)}</div>
              </div>
            </div>
            <div className="mt-3">
              <ProgressBar value={totalActual} max={totalTarget} />
              <div className="text-xs text-gray-500 mt-1 text-right">
                完成率: {totalTarget > 0 ? ((totalActual / totalTarget) * 100).toFixed(1) : 0}%
              </div>
            </div>
          </Card>

          {/* 月度目标编辑 */}
          <div className="space-y-3">
            {MONTHS.map((month, idx) => {
              const monthKey = MONTH_KEYS[idx];
              const actual = targetData?.actuals[monthKey] || 0;
              const target = editedTargets[monthKey] || 0;

              return (
                <div key={monthKey} className="flex items-center gap-4 p-3 rounded-lg bg-gray-50">
                  <div className="w-12 text-sm font-medium text-gray-700">{month}</div>
                  <div className="flex-1">
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
                        {store.currency === 'CNY' ? '¥' : '$'}
                      </span>
                      <input
                        type="number"
                        value={editedTargets[monthKey] || ''}
                        onChange={(e) => handleChange(monthKey, e.target.value)}
                        className="w-full h-9 pl-8 pr-3 rounded border border-gray-200 text-sm"
                        placeholder="输入目标金额"
                      />
                    </div>
                  </div>
                  <div className="w-28 text-right">
                    <div className="text-xs text-gray-500">已完成</div>
                    <div className={cn(
                      'text-sm font-medium',
                      actual >= target ? 'text-green-600' : 'text-gray-700'
                    )}>
                      {formatCurrency(actual, store.currency)}
                    </div>
                  </div>
                  <div className="w-16 text-right">
                    {target > 0 && (
                      <Badge className={cn(
                        actual >= target ? 'bg-green-50 text-green-700 border-green-200' :
                        actual >= target * 0.8 ? 'bg-blue-50 text-blue-700 border-blue-200' :
                        'bg-gray-50 text-gray-600 border-gray-200'
                      )}>
                        {((actual / target) * 100).toFixed(0)}%
                      </Badge>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="px-6 py-4 border-t bg-gray-50 flex gap-3">
          <IconButton onClick={onClose} className="flex-1">取消</IconButton>
          <PrimaryButton onClick={handleSave} className="flex-1">
            <Save className="w-4 h-4 mr-2" />
            保存目标
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
}

// --------------- 页面主体 ---------------
export default function SalesTargetPage() {
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = React.useState(currentYear);
  const [viewMode, setViewMode] = React.useState('monthly'); // 'monthly' | 'quarterly' | 'yearly'
  const [expandedBUs, setExpandedBUs] = React.useState(['BM000007', 'BM000008']);
  const [expandedDepts, setExpandedDepts] = React.useState([]);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [targetData, setTargetData] = React.useState(() => generateTargetData(currentYear));
  const [editDrawerOpen, setEditDrawerOpen] = React.useState(false);
  const [selectedStore, setSelectedStore] = React.useState(null);

  // 年份变化时重新生成数据
  React.useEffect(() => {
    setTargetData(generateTargetData(selectedYear));
  }, [selectedYear]);

  const years = [currentYear - 1, currentYear, currentYear + 1];

  const toggleBU = (buId) => {
    setExpandedBUs(prev => prev.includes(buId) ? prev.filter(id => id !== buId) : [...prev, buId]);
  };

  const toggleDept = (deptId) => {
    setExpandedDepts(prev => prev.includes(deptId) ? prev.filter(id => id !== deptId) : [...prev, deptId]);
  };

  const handleEditStore = (store) => {
    setSelectedStore(store);
    setEditDrawerOpen(true);
  };

  const handleSaveTarget = (storeId, newTargets) => {
    setTargetData(prev => ({
      ...prev,
      [storeId]: {
        ...prev[storeId],
        targets: newTargets
      }
    }));
  };

  // 计算事业部汇总
  const calculateBUSummary = (buId) => {
    const buStores = stores.filter(s => s.buId === buId);
    let totalTarget = 0;
    let totalActual = 0;

    buStores.forEach(store => {
      const data = targetData[store.id];
      if (data) {
        totalTarget += Object.values(data.targets).reduce((sum, v) => sum + v, 0);
        totalActual += Object.values(data.actuals).reduce((sum, v) => sum + v, 0);
      }
    });

    return { totalTarget, totalActual, storeCount: buStores.length };
  };

  // 计算部门汇总
  const calculateDeptSummary = (deptId) => {
    const deptStores = stores.filter(s => s.deptId === deptId);
    let totalTarget = 0;
    let totalActual = 0;

    deptStores.forEach(store => {
      const data = targetData[store.id];
      if (data) {
        totalTarget += Object.values(data.targets).reduce((sum, v) => sum + v, 0);
        totalActual += Object.values(data.actuals).reduce((sum, v) => sum + v, 0);
      }
    });

    return { totalTarget, totalActual, storeCount: deptStores.length };
  };

  // 获取店铺月度数据
  const getStoreMonthlyData = (storeId) => {
    const data = targetData[storeId];
    if (!data) return MONTH_KEYS.map(() => ({ target: 0, actual: 0 }));
    return MONTH_KEYS.map(month => ({
      target: data.targets[month] || 0,
      actual: data.actuals[month] || 0
    }));
  };

  // 过滤店铺
  const filterStores = (storeList) => {
    if (!searchQuery) return storeList;
    const q = searchQuery.toLowerCase();
    return storeList.filter(s =>
      s.name.toLowerCase().includes(q) ||
      s.customerGroup.toLowerCase().includes(q) ||
      s.country.toLowerCase().includes(q)
    );
  };

  // 全局汇总
  const globalSummary = React.useMemo(() => {
    let totalTarget = 0;
    let totalActual = 0;

    stores.forEach(store => {
      const data = targetData[store.id];
      if (data) {
        totalTarget += Object.values(data.targets).reduce((sum, v) => sum + v, 0);
        totalActual += Object.values(data.actuals).reduce((sum, v) => sum + v, 0);
      }
    });

    return { totalTarget, totalActual };
  }, [targetData]);

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* 页面标题 */}
      <div className="bg-white border-b border-gray-200 px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">销售目标管理</h1>
            <p className="text-gray-500 mt-1">按业务单元和店铺设定月度销售目标，跟踪完成进度</p>
          </div>
          <div className="flex items-center gap-3">
            <IconButton>
              <Upload className="w-4 h-4 mr-2" />
              批量导入
            </IconButton>
            <IconButton>
              <Download className="w-4 h-4 mr-2" />
              导出数据
            </IconButton>
          </div>
        </div>
      </div>

      {/* 筛选栏 */}
      <div className="bg-white border-b border-gray-200 px-8 py-4">
        <div className="flex items-center gap-4">
          {/* 年份选择 */}
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-gray-400" />
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(parseInt(e.target.value))}
              className="h-9 px-3 rounded-md border border-gray-200 bg-white text-sm"
            >
              {years.map(y => <option key={y} value={y}>{y}年</option>)}
            </select>
          </div>

          {/* 视图切换 */}
          <div className="flex border border-gray-200 rounded-md overflow-hidden">
            <button
              onClick={() => setViewMode('monthly')}
              className={cn(
                'px-3 py-2 text-sm',
                viewMode === 'monthly' ? 'bg-blue-50 text-blue-600' : 'bg-white text-gray-600 hover:bg-gray-50'
              )}
            >
              月度视图
            </button>
            <button
              onClick={() => setViewMode('quarterly')}
              className={cn(
                'px-3 py-2 text-sm border-l border-gray-200',
                viewMode === 'quarterly' ? 'bg-blue-50 text-blue-600' : 'bg-white text-gray-600 hover:bg-gray-50'
              )}
            >
              季度视图
            </button>
            <button
              onClick={() => setViewMode('yearly')}
              className={cn(
                'px-3 py-2 text-sm border-l border-gray-200',
                viewMode === 'yearly' ? 'bg-blue-50 text-blue-600' : 'bg-white text-gray-600 hover:bg-gray-50'
              )}
            >
              年度汇总
            </button>
          </div>

          {/* 搜索 */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="搜索店铺名称、平台、国家..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-9 pl-10 pr-3 rounded-md border border-gray-200 text-sm"
            />
          </div>

          {/* 展开/收起全部 */}
          <IconButton onClick={() => setExpandedBUs(expandedBUs.length > 0 ? [] : businessUnits.map(b => b.id))}>
            {expandedBUs.length > 0 ? '收起全部' : '展开全部'}
          </IconButton>
        </div>
      </div>

      {/* 汇总卡片 */}
      <div className="px-8 py-4 bg-gray-50 border-b">
        <div className="grid grid-cols-4 gap-4">
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                <Target className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <div className="text-sm text-gray-500">年度目标总额</div>
                <div className="text-xl font-bold text-gray-900">
                  ¥{(globalSummary.totalTarget / 1000000).toFixed(2)}M
                </div>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <div className="text-sm text-gray-500">已完成金额</div>
                <div className="text-xl font-bold text-green-600">
                  ¥{(globalSummary.totalActual / 1000000).toFixed(2)}M
                </div>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <div className="text-sm text-gray-500">整体完成率</div>
                <div className="text-xl font-bold text-orange-600">
                  {globalSummary.totalTarget > 0 ? ((globalSummary.totalActual / globalSummary.totalTarget) * 100).toFixed(1) : 0}%
                </div>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center">
                <Store className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <div className="text-sm text-gray-500">店铺总数</div>
                <div className="text-xl font-bold text-purple-600">{stores.length}</div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* 主内容区 */}
      <div className="flex-1 overflow-auto p-8">
        <div className="space-y-4">
          {businessUnits.map(bu => {
            const isExpanded = expandedBUs.includes(bu.id);
            const buSummary = calculateBUSummary(bu.id);
            const buStores = stores.filter(s => s.buId === bu.id);
            const filteredBUStores = filterStores(buStores);

            if (searchQuery && filteredBUStores.length === 0) return null;

            return (
              <Card key={bu.id} className="overflow-hidden">
                {/* 事业部标题行 */}
                <div
                  className="flex items-center justify-between px-6 py-4 bg-gray-50 cursor-pointer hover:bg-gray-100"
                  onClick={() => toggleBU(bu.id)}
                >
                  <div className="flex items-center gap-3">
                    {isExpanded ? <ChevronDown className="w-5 h-5 text-gray-400" /> : <ChevronRight className="w-5 h-5 text-gray-400" />}
                    <Building2 className="w-5 h-5 text-blue-600" />
                    <div>
                      <span className="font-semibold text-gray-900">{bu.name}</span>
                      <span className="ml-2 text-sm text-gray-500">负责人: {bu.manager}</span>
                    </div>
                    <Badge className="bg-blue-50 text-blue-700 border-blue-200 ml-2">
                      {buSummary.storeCount} 个店铺
                    </Badge>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <div className="text-xs text-gray-500">年度目标</div>
                      <div className="font-semibold text-gray-900">¥{(buSummary.totalTarget / 1000000).toFixed(2)}M</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-gray-500">已完成</div>
                      <div className="font-semibold text-green-600">¥{(buSummary.totalActual / 1000000).toFixed(2)}M</div>
                    </div>
                    <div className="w-32">
                      <ProgressBar value={buSummary.totalActual} max={buSummary.totalTarget} />
                      <div className="text-xs text-gray-500 text-right mt-1">
                        {buSummary.totalTarget > 0 ? ((buSummary.totalActual / buSummary.totalTarget) * 100).toFixed(1) : 0}%
                      </div>
                    </div>
                  </div>
                </div>

                {/* 展开内容 */}
                {isExpanded && (
                  <div className="border-t">
                    {bu.departments.map(dept => {
                      const deptStores = stores.filter(s => s.deptId === dept.id);
                      const filteredDeptStores = filterStores(deptStores);
                      const isDeptExpanded = expandedDepts.includes(dept.id);
                      const deptSummary = calculateDeptSummary(dept.id);

                      if (searchQuery && filteredDeptStores.length === 0) return null;

                      return (
                        <div key={dept.id}>
                          {/* 部门标题 */}
                          <div
                            className="flex items-center justify-between px-6 py-3 pl-12 bg-white border-b cursor-pointer hover:bg-gray-50"
                            onClick={() => toggleDept(dept.id)}
                          >
                            <div className="flex items-center gap-2">
                              {isDeptExpanded ? <ChevronDown className="w-4 h-4 text-gray-400" /> : <ChevronRight className="w-4 h-4 text-gray-400" />}
                              <span className="font-medium text-gray-700">{dept.name}</span>
                              <span className="text-sm text-gray-400">({deptSummary.storeCount})</span>
                            </div>
                            <div className="flex items-center gap-4 text-sm">
                              <span className="text-gray-500">目标: <span className="text-gray-900 font-medium">¥{(deptSummary.totalTarget / 1000000).toFixed(2)}M</span></span>
                              <span className="text-gray-500">完成: <span className="text-green-600 font-medium">¥{(deptSummary.totalActual / 1000000).toFixed(2)}M</span></span>
                              <Badge className={cn(
                                deptSummary.totalActual >= deptSummary.totalTarget ? 'bg-green-50 text-green-700 border-green-200' :
                                deptSummary.totalActual >= deptSummary.totalTarget * 0.8 ? 'bg-blue-50 text-blue-700 border-blue-200' :
                                'bg-gray-50 text-gray-600 border-gray-200'
                              )}>
                                {deptSummary.totalTarget > 0 ? ((deptSummary.totalActual / deptSummary.totalTarget) * 100).toFixed(1) : 0}%
                              </Badge>
                            </div>
                          </div>

                          {/* 店铺列表 */}
                          {isDeptExpanded && (
                            <div className="overflow-x-auto">
                              <table className="w-full text-sm min-w-[1400px]">
                                <thead className="bg-gray-50 text-left">
                                  <tr>
                                    <th className="px-4 py-2 pl-16 font-medium text-gray-600 w-48 whitespace-nowrap">店铺</th>
                                    <th className="px-4 py-2 font-medium text-gray-600 w-24 whitespace-nowrap">平台</th>
                                    <th className="px-4 py-2 font-medium text-gray-600 w-20 whitespace-nowrap">地区</th>
                                    {viewMode === 'monthly' && MONTHS.map(m => (
                                      <th key={m} className="px-2 py-2 font-medium text-gray-600 text-center w-20 whitespace-nowrap">{m}</th>
                                    ))}
                                    {viewMode === 'quarterly' && ['Q1', 'Q2', 'Q3', 'Q4'].map(q => (
                                      <th key={q} className="px-4 py-2 font-medium text-gray-600 text-center w-28 whitespace-nowrap">{q}</th>
                                    ))}
                                    {viewMode === 'yearly' && (
                                      <>
                                        <th className="px-4 py-2 font-medium text-gray-600 text-right whitespace-nowrap">年度目标</th>
                                        <th className="px-4 py-2 font-medium text-gray-600 text-right whitespace-nowrap">已完成</th>
                                        <th className="px-4 py-2 font-medium text-gray-600 w-32 whitespace-nowrap">进度</th>
                                      </>
                                    )}
                                    <th className="px-4 py-2 font-medium text-gray-600 w-20 whitespace-nowrap">操作</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {filteredDeptStores.map((store, idx) => {
                                    const monthlyData = getStoreMonthlyData(store.id);
                                    const yearlyTarget = monthlyData.reduce((sum, d) => sum + d.target, 0);
                                    const yearlyActual = monthlyData.reduce((sum, d) => sum + d.actual, 0);

                                    return (
                                      <tr key={store.id} className={cn('border-t', idx % 2 === 0 ? 'bg-white' : 'bg-gray-50/50')}>
                                        <td className="px-4 py-3 pl-16">
                                          <div className="flex items-center gap-2">
                                            <Store className="w-4 h-4 text-gray-400" />
                                            <span className="text-gray-900">{store.name}</span>
                                          </div>
                                        </td>
                                        <td className="px-4 py-3">
                                          <Badge className="bg-purple-50 text-purple-700 border-purple-200">
                                            {store.customerGroup}
                                          </Badge>
                                        </td>
                                        <td className="px-4 py-3 text-gray-600">{store.country}</td>

                                        {viewMode === 'monthly' && monthlyData.map((data, mIdx) => (
                                          <td key={mIdx} className="px-2 py-3 text-center">
                                            <div className="text-xs text-gray-900">{formatCurrency(data.target, store.currency)}</div>
                                            <div className={cn(
                                              'text-xs',
                                              data.actual >= data.target ? 'text-green-600' : 'text-gray-500'
                                            )}>
                                              {formatCurrency(data.actual, store.currency)}
                                            </div>
                                            {data.target > 0 && (
                                              <div className="mt-1">
                                                <ProgressBar value={data.actual} max={data.target} className="h-1" />
                                              </div>
                                            )}
                                          </td>
                                        ))}

                                        {viewMode === 'quarterly' && [0, 1, 2, 3].map(q => {
                                          const qData = monthlyData.slice(q * 3, (q + 1) * 3);
                                          const qTarget = qData.reduce((sum, d) => sum + d.target, 0);
                                          const qActual = qData.reduce((sum, d) => sum + d.actual, 0);
                                          return (
                                            <td key={q} className="px-4 py-3 text-center">
                                              <div className="text-sm text-gray-900">{formatCurrency(qTarget, store.currency)}</div>
                                              <div className={cn(
                                                'text-sm',
                                                qActual >= qTarget ? 'text-green-600' : 'text-gray-500'
                                              )}>
                                                {formatCurrency(qActual, store.currency)}
                                              </div>
                                              <ProgressBar value={qActual} max={qTarget} className="mt-1" />
                                            </td>
                                          );
                                        })}

                                        {viewMode === 'yearly' && (
                                          <>
                                            <td className="px-4 py-3 text-right font-medium text-gray-900">
                                              {formatCurrency(yearlyTarget, store.currency)}
                                            </td>
                                            <td className="px-4 py-3 text-right font-medium text-green-600">
                                              {formatCurrency(yearlyActual, store.currency)}
                                            </td>
                                            <td className="px-4 py-3">
                                              <div className="flex items-center gap-2">
                                                <ProgressBar value={yearlyActual} max={yearlyTarget} className="flex-1" />
                                                <span className="text-xs text-gray-500 w-12 text-right">
                                                  {yearlyTarget > 0 ? ((yearlyActual / yearlyTarget) * 100).toFixed(0) : 0}%
                                                </span>
                                              </div>
                                            </td>
                                          </>
                                        )}

                                        <td className="px-4 py-3">
                                          <button
                                            onClick={() => handleEditStore(store)}
                                            className="text-blue-600 hover:text-blue-700 text-sm flex items-center gap-1"
                                          >
                                            <Edit className="w-3 h-3" />
                                            编辑
                                          </button>
                                        </td>
                                      </tr>
                                    );
                                  })}
                                </tbody>
                              </table>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </Card>
            );
          })}
        </div>
      </div>

      {/* 编辑抽屉 */}
      <EditTargetDrawer
        isOpen={editDrawerOpen}
        onClose={() => {
          setEditDrawerOpen(false);
          setSelectedStore(null);
        }}
        store={selectedStore}
        year={selectedYear}
        targetData={selectedStore ? targetData[selectedStore.id] : null}
        onSave={handleSaveTarget}
      />
    </div>
  );
}
