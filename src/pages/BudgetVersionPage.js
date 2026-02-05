// src/pages/BudgetVersionPage.js
// 预算版本管理页面
import React, { useState } from 'react';
import {
    Search, Plus, Edit2, Trash2, X, Save, Download, Upload,
    FileText, Calendar, DollarSign, Check, AlertCircle,
    Building2, Copy, Eye, Lock, Unlock
} from 'lucide-react';

// 轻量工具：className 拼接
const cn = (...args) => args.filter(Boolean).join(' ');

// --------------- 成本中心数据（用于关联） ---------------
const costCenters = [
    { code: 'Amazon001', name: 'Amazon成本中心' },
    { code: 'Finance001', name: '财务部成本中心' },
    { code: 'eBay001', name: 'eBay成本中心' },
    { code: 'TikTok001', name: 'TikTok成本中心' },
    { code: 'Tmall001', name: '天猫成本中心' },
    { code: 'HR001', name: '人力资源成本中心' },
    { code: 'IT001', name: 'IT部成本中心' },
    { code: 'Shopee001', name: 'Shopee成本中心' },
    { code: 'Direct001', name: '直营电商成本中心' },
];

// --------------- 预算版本数据 ---------------
const initialBudgetVersions = [
    {
        id: '1',
        code: 'BV-2024-001',
        name: '2024年度预算V1',
        budgetYear: '2024',
        effectiveDate: '2024-01-01',
        totalBudget: 15000000,
        status: 'active',
        costCenterCodes: ['Amazon001', 'eBay001', 'TikTok001'],
        createdBy: 'Lyn',
        createdAt: '2023-11-15',
        description: '2024年度主预算版本，覆盖欧美平台',
    },
    {
        id: '2',
        code: 'BV-2024-002',
        name: '2024年度预算V2（修订）',
        budgetYear: '2024',
        effectiveDate: '2024-04-01',
        totalBudget: 16500000,
        status: 'active',
        costCenterCodes: ['Amazon001', 'eBay001', 'TikTok001', 'Shopee001'],
        createdBy: 'Lyn',
        createdAt: '2024-03-20',
        description: 'Q2修订版本，新增Shopee预算',
    },
    {
        id: '3',
        code: 'BV-2024-FIN',
        name: '2024财务部预算',
        budgetYear: '2024',
        effectiveDate: '2024-01-01',
        totalBudget: 2000000,
        status: 'active',
        costCenterCodes: ['Finance001'],
        createdBy: 'Harry',
        createdAt: '2023-11-20',
        description: '财务部门年度预算',
    },
    {
        id: '4',
        code: 'BV-2024-IT',
        name: '2024IT部预算',
        budgetYear: '2024',
        effectiveDate: '2024-01-01',
        totalBudget: 3500000,
        status: 'active',
        costCenterCodes: ['IT001'],
        createdBy: 'Harry',
        createdAt: '2023-11-20',
        description: 'IT基础设施及运维预算',
    },
    {
        id: '5',
        code: 'BV-2024-HR',
        name: '2024人力资源预算',
        budgetYear: '2024',
        effectiveDate: '2024-01-01',
        totalBudget: 1800000,
        status: 'active',
        costCenterCodes: ['HR001'],
        createdBy: 'Lyn',
        createdAt: '2023-11-18',
        description: '人力资源部年度预算',
    },
    {
        id: '6',
        code: 'BV-2024-APAC',
        name: '2024亚太区预算',
        budgetYear: '2024',
        effectiveDate: '2024-01-01',
        totalBudget: 8000000,
        status: 'active',
        costCenterCodes: ['Tmall001', 'Shopee001', 'TikTok001'],
        createdBy: 'Effie',
        createdAt: '2023-11-25',
        description: '亚太区电商平台预算',
    },
    {
        id: '7',
        code: 'BV-2023-001',
        name: '2023年度预算',
        budgetYear: '2023',
        effectiveDate: '2023-01-01',
        totalBudget: 12000000,
        status: 'archived',
        costCenterCodes: ['Amazon001', 'eBay001'],
        createdBy: 'Lyn',
        createdAt: '2022-11-10',
        description: '2023年度预算（已归档）',
    },
    {
        id: '8',
        code: 'BV-2025-DRAFT',
        name: '2025年度预算草案',
        budgetYear: '2025',
        effectiveDate: '2025-01-01',
        totalBudget: 20000000,
        status: 'draft',
        costCenterCodes: ['Amazon001', 'eBay001', 'TikTok001', 'Shopee001', 'Tmall001'],
        createdBy: 'Lyn',
        createdAt: '2024-10-01',
        description: '2025年度预算规划中',
    },
];

// --------------- 轻量级 UI 组件 ---------------
const IconButton = ({ icon: Icon, onClick, className, title, disabled }) => (
    <button
        onClick={onClick}
        disabled={disabled}
        title={title}
        className={cn(
            'p-2 rounded-lg transition-colors',
            disabled ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100',
            className
        )}
    >
        <Icon className="w-4 h-4" />
    </button>
);

const PrimaryButton = ({ children, onClick, icon: Icon, className, disabled, size = 'md' }) => (
    <button
        onClick={onClick}
        disabled={disabled}
        className={cn(
            'inline-flex items-center gap-2 bg-blue-600 text-white font-medium rounded-lg transition-colors',
            disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700',
            size === 'sm' ? 'px-3 py-1.5 text-xs' : 'px-4 py-2 text-sm',
            className
        )}
    >
        {Icon && <Icon className={size === 'sm' ? 'w-3 h-3' : 'w-4 h-4'} />}
        {children}
    </button>
);

const SecondaryButton = ({ children, onClick, icon: Icon, className, size = 'md' }) => (
    <button
        onClick={onClick}
        className={cn(
            'inline-flex items-center gap-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors',
            size === 'sm' ? 'px-3 py-1.5 text-xs' : 'px-4 py-2 text-sm',
            className
        )}
    >
        {Icon && <Icon className={size === 'sm' ? 'w-3 h-3' : 'w-4 h-4'} />}
        {children}
    </button>
);

const Input = ({ value, onChange, placeholder, className, icon: Icon, disabled, type = 'text' }) => (
    <div className="relative">
        {Icon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Icon className="w-4 h-4 text-gray-400" />
            </div>
        )}
        <input
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            disabled={disabled}
            className={cn(
                'w-full border border-gray-300 rounded-lg py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500',
                Icon ? 'pl-10 pr-4' : 'px-4',
                disabled && 'bg-gray-50 text-gray-500',
                className
            )}
        />
    </div>
);

const Select = ({ value, onChange, options, className, placeholder, disabled }) => (
    <select
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={cn(
            'border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white',
            disabled && 'bg-gray-50 text-gray-500',
            className
        )}
    >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
    </select>
);

const Badge = ({ children, variant = 'default', className }) => {
    const variants = {
        default: 'bg-gray-100 text-gray-700',
        success: 'bg-green-100 text-green-700',
        warning: 'bg-yellow-100 text-yellow-700',
        danger: 'bg-red-100 text-red-700',
        info: 'bg-blue-100 text-blue-700',
        purple: 'bg-purple-100 text-purple-700',
    };
    return (
        <span className={cn(
            'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
            variants[variant],
            className
        )}>
            {children}
        </span>
    );
};

const Card = ({ children, className }) => (
    <div className={cn('bg-white rounded-xl border border-gray-200 shadow-sm', className)}>
        {children}
    </div>
);

// --------------- 状态配置 ---------------
const STATUS_CONFIG = {
    draft: { label: '草稿', variant: 'default', icon: FileText },
    active: { label: '生效中', variant: 'success', icon: Check },
    archived: { label: '已归档', variant: 'warning', icon: Lock },
};

// --------------- 预算版本编辑抽屉 ---------------
const BudgetVersionEditDrawer = ({ isOpen, onClose, version, onSave }) => {
    const [formData, setFormData] = useState({
        code: '',
        name: '',
        budgetYear: new Date().getFullYear().toString(),
        effectiveDate: '',
        totalBudget: '',
        status: 'draft',
        costCenterCodes: [],
        description: '',
    });

    React.useEffect(() => {
        if (version) {
            setFormData({
                code: version.code,
                name: version.name,
                budgetYear: version.budgetYear,
                effectiveDate: version.effectiveDate,
                totalBudget: version.totalBudget.toString(),
                status: version.status,
                costCenterCodes: [...version.costCenterCodes],
                description: version.description || '',
            });
        } else {
            setFormData({
                code: '',
                name: '',
                budgetYear: new Date().getFullYear().toString(),
                effectiveDate: new Date().toISOString().split('T')[0],
                totalBudget: '',
                status: 'draft',
                costCenterCodes: [],
                description: '',
            });
        }
    }, [version]);

    const handleToggleCostCenter = (code) => {
        setFormData(prev => ({
            ...prev,
            costCenterCodes: prev.costCenterCodes.includes(code)
                ? prev.costCenterCodes.filter(c => c !== code)
                : [...prev.costCenterCodes, code]
        }));
    };

    const handleSave = () => {
        const savedData = {
            ...version,
            ...formData,
            id: version?.id || `${Date.now()}`,
            totalBudget: parseFloat(formData.totalBudget) || 0,
            createdBy: version?.createdBy || 'Admin',
            createdAt: version?.createdAt || new Date().toISOString().split('T')[0],
        };
        onSave(savedData);
        onClose();
    };

    if (!isOpen) return null;

    const years = ['2023', '2024', '2025', '2026'];

    return (
        <div className="fixed inset-0 z-50 flex justify-end">
            <div className="absolute inset-0 bg-black/30" onClick={onClose} />
            <div className="relative w-[560px] bg-white h-full shadow-xl flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b">
                    <h2 className="text-lg font-semibold">{version ? '编辑预算版本' : '新建预算版本'}</h2>
                    <IconButton icon={X} onClick={onClose} />
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6 space-y-5">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">版本编码 *</label>
                            <Input
                                value={formData.code}
                                onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                                placeholder="如 BV-2024-001"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">预算年度 *</label>
                            <Select
                                value={formData.budgetYear}
                                onChange={(e) => setFormData({ ...formData, budgetYear: e.target.value })}
                                options={years.map(y => ({ value: y, label: `${y}年` }))}
                                className="w-full"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">版本名称 *</label>
                        <Input
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="如 2024年度预算V1"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">生效日期 *</label>
                            <Input
                                type="date"
                                value={formData.effectiveDate}
                                onChange={(e) => setFormData({ ...formData, effectiveDate: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">总预算额 (元) *</label>
                            <Input
                                type="number"
                                value={formData.totalBudget}
                                onChange={(e) => setFormData({ ...formData, totalBudget: e.target.value })}
                                placeholder="15000000"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">状态</label>
                        <Select
                            value={formData.status}
                            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                            options={[
                                { value: 'draft', label: '草稿' },
                                { value: 'active', label: '生效中' },
                                { value: 'archived', label: '已归档' },
                            ]}
                            className="w-full"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">关联成本中心</label>
                        <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto border rounded-lg p-3">
                            {costCenters.map(cc => (
                                <label key={cc.code} className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={formData.costCenterCodes.includes(cc.code)}
                                        onChange={() => handleToggleCostCenter(cc.code)}
                                        className="rounded border-gray-300 text-blue-600"
                                    />
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-gray-900 truncate">{cc.name}</p>
                                        <p className="text-xs text-gray-500">{cc.code}</p>
                                    </div>
                                </label>
                            ))}
                        </div>
                        <p className="text-xs text-gray-400 mt-1">已选择 {formData.costCenterCodes.length} 个成本中心</p>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">描述</label>
                        <textarea
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            placeholder="预算版本说明"
                            rows={3}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-end gap-3 px-6 py-4 border-t bg-gray-50">
                    <SecondaryButton onClick={onClose}>取消</SecondaryButton>
                    <PrimaryButton
                        icon={Save}
                        onClick={handleSave}
                        disabled={!formData.code || !formData.name || !formData.effectiveDate || !formData.totalBudget}
                    >
                        保存
                    </PrimaryButton>
                </div>
            </div>
        </div>
    );
};

// --------------- 预算详情抽屉 ---------------
const BudgetDetailDrawer = ({ isOpen, onClose, version }) => {
    if (!isOpen || !version) return null;

    const statusConfig = STATUS_CONFIG[version.status] || STATUS_CONFIG.draft;

    return (
        <div className="fixed inset-0 z-50 flex justify-end">
            <div className="absolute inset-0 bg-black/30" onClick={onClose} />
            <div className="relative w-[480px] bg-white h-full shadow-xl flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b">
                    <div className="flex items-center gap-3">
                        <h2 className="text-lg font-semibold">{version.name}</h2>
                        <Badge variant={statusConfig.variant}>{statusConfig.label}</Badge>
                    </div>
                    <IconButton icon={X} onClick={onClose} />
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    {/* 基本信息 */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-xs text-gray-500 mb-1">版本编码</p>
                            <code className="text-sm bg-gray-100 px-2 py-1 rounded">{version.code}</code>
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 mb-1">预算年度</p>
                            <span className="text-sm font-medium">{version.budgetYear}年</span>
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 mb-1">生效日期</p>
                            <span className="text-sm">{version.effectiveDate}</span>
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 mb-1">创建人</p>
                            <span className="text-sm">{version.createdBy}</span>
                        </div>
                    </div>

                    {/* 总预算额 */}
                    <div className="p-4 bg-blue-50 rounded-lg">
                        <p className="text-xs text-blue-600 mb-1">总预算额</p>
                        <p className="text-2xl font-bold text-blue-700">
                            ¥ {version.totalBudget.toLocaleString()}
                        </p>
                    </div>

                    {/* 关联成本中心 */}
                    <div>
                        <p className="text-xs text-gray-500 mb-2">关联成本中心 ({version.costCenterCodes.length})</p>
                        <div className="space-y-2">
                            {version.costCenterCodes.map(code => {
                                const cc = costCenters.find(c => c.code === code);
                                return (
                                    <div key={code} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                                        <Building2 className="w-4 h-4 text-gray-400" />
                                        <span className="text-sm">{cc?.name || code}</span>
                                        <code className="text-xs text-gray-400 ml-auto">{code}</code>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* 描述 */}
                    {version.description && (
                        <div>
                            <p className="text-xs text-gray-500 mb-1">描述</p>
                            <p className="text-sm text-gray-700">{version.description}</p>
                        </div>
                    )}

                    {/* 创建信息 */}
                    <div className="text-xs text-gray-400 pt-4 border-t">
                        <p>创建时间：{version.createdAt}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --------------- 主组件 ---------------
export default function BudgetVersionPage({ onOpenDetail }) {
    const [versions, setVersions] = useState(initialBudgetVersions);
    const [searchText, setSearchText] = useState('');
    const [filterYear, setFilterYear] = useState('');
    const [filterStatus, setFilterStatus] = useState('');
    const [editingItem, setEditingItem] = useState(null);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    // 过滤数据
    const filteredData = versions.filter(item => {
        const matchesSearch = !searchText ||
            item.name.toLowerCase().includes(searchText.toLowerCase()) ||
            item.code.toLowerCase().includes(searchText.toLowerCase());
        const matchesYear = !filterYear || item.budgetYear === filterYear;
        const matchesStatus = !filterStatus || item.status === filterStatus;
        return matchesSearch && matchesYear && matchesStatus;
    });

    // 统计
    const stats = {
        total: versions.length,
        active: versions.filter(v => v.status === 'active').length,
        draft: versions.filter(v => v.status === 'draft').length,
        totalBudget: versions.filter(v => v.status === 'active').reduce((sum, v) => sum + v.totalBudget, 0),
    };

    const handleAdd = () => {
        setEditingItem(null);
        setIsDrawerOpen(true);
    };

    const handleEdit = (item) => {
        setEditingItem(item);
        setIsDrawerOpen(true);
    };

    const handleView = (item) => {
        if (onOpenDetail) {
            onOpenDetail({
                id: `budget-version-${item.id}`,
                name: `预算详情: ${item.name}`,
                path: '/finance-gov/budget-version/detail',
                data: item,
            });
        }
    };

    const handleDelete = (itemId) => {
        if (window.confirm('确定要删除该预算版本吗？')) {
            setVersions(prev => prev.filter(item => item.id !== itemId));
        }
    };

    const handleSave = (savedItem) => {
        setVersions(prev => {
            const exists = prev.find(item => item.id === savedItem.id);
            if (exists) {
                return prev.map(item => item.id === savedItem.id ? savedItem : item);
            }
            return [...prev, savedItem];
        });
    };

    const handleCopy = (item) => {
        const newItem = {
            ...item,
            id: `${Date.now()}`,
            code: `${item.code}-COPY`,
            name: `${item.name} (副本)`,
            status: 'draft',
            createdAt: new Date().toISOString().split('T')[0],
            createdBy: 'Admin',
        };
        setVersions(prev => [...prev, newItem]);
    };

    const years = [...new Set(versions.map(v => v.budgetYear))].sort().reverse();

    return (
        <div className="space-y-6">
            {/* 页面头部 */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">预算版本管理</h1>
                    <p className="text-sm text-gray-500 mt-1">管理年度预算版本，关联成本中心</p>
                </div>
                <div className="flex items-center gap-3">
                    <SecondaryButton icon={Upload}>导入</SecondaryButton>
                    <SecondaryButton icon={Download}>导出</SecondaryButton>
                    <PrimaryButton icon={Plus} onClick={handleAdd}>新建预算版本</PrimaryButton>
                </div>
            </div>

            {/* 统计卡片 */}
            <div className="grid grid-cols-4 gap-4">
                <Card className="p-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                            <FileText className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">版本总数</p>
                            <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                        </div>
                    </div>
                </Card>
                <Card className="p-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                            <Check className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">生效中</p>
                            <p className="text-2xl font-bold text-gray-900">{stats.active}</p>
                        </div>
                    </div>
                </Card>
                <Card className="p-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                            <FileText className="w-5 h-5 text-gray-500" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">草稿</p>
                            <p className="text-2xl font-bold text-gray-900">{stats.draft}</p>
                        </div>
                    </div>
                </Card>
                <Card className="p-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                            <DollarSign className="w-5 h-5 text-purple-600" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">生效预算总额</p>
                            <p className="text-lg font-bold text-gray-900">¥{(stats.totalBudget / 10000).toFixed(0)}万</p>
                        </div>
                    </div>
                </Card>
            </div>

            {/* 搜索和筛选 */}
            <Card className="p-4">
                <div className="flex items-center gap-4">
                    <Input
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        placeholder="搜索版本名称、编码..."
                        icon={Search}
                        className="w-64"
                    />
                    <Select
                        value={filterYear}
                        onChange={(e) => setFilterYear(e.target.value)}
                        options={years.map(y => ({ value: y, label: `${y}年` }))}
                        placeholder="全部年度"
                        className="w-32"
                    />
                    <Select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        options={[
                            { value: 'draft', label: '草稿' },
                            { value: 'active', label: '生效中' },
                            { value: 'archived', label: '已归档' },
                        ]}
                        placeholder="全部状态"
                        className="w-32"
                    />
                    {(filterYear || filterStatus) && (
                        <button
                            onClick={() => { setFilterYear(''); setFilterStatus(''); }}
                            className="text-sm text-blue-600 hover:underline"
                        >
                            清除筛选
                        </button>
                    )}
                </div>
            </Card>

            {/* 数据表格 */}
            <Card className="overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="bg-gray-50 border-b">
                                <th className="px-4 py-3 text-left font-medium text-gray-600">版本编码</th>
                                <th className="px-4 py-3 text-left font-medium text-gray-600">版本名称</th>
                                <th className="px-4 py-3 text-left font-medium text-gray-600">预算年度</th>
                                <th className="px-4 py-3 text-left font-medium text-gray-600">生效日期</th>
                                <th className="px-4 py-3 text-right font-medium text-gray-600">总预算额</th>
                                <th className="px-4 py-3 text-left font-medium text-gray-600">状态</th>
                                <th className="px-4 py-3 text-left font-medium text-gray-600">关联成本中心</th>
                                <th className="px-4 py-3 text-left font-medium text-gray-600">创建人</th>
                                <th className="px-4 py-3 text-left font-medium text-gray-600">操作</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredData.map(item => {
                                const statusConfig = STATUS_CONFIG[item.status] || STATUS_CONFIG.draft;
                                return (
                                    <tr key={item.id} className="hover:bg-gray-50">
                                        <td className="px-4 py-3">
                                            <code className="text-xs bg-gray-100 px-2 py-0.5 rounded">{item.code}</code>
                                        </td>
                                        <td className="px-4 py-3">
                                            <button
                                                onClick={() => handleView(item)}
                                                className="font-medium text-gray-900 hover:text-blue-600"
                                            >
                                                {item.name}
                                            </button>
                                        </td>
                                        <td className="px-4 py-3 text-gray-600">{item.budgetYear}年</td>
                                        <td className="px-4 py-3 text-gray-600">{item.effectiveDate}</td>
                                        <td className="px-4 py-3 text-right font-medium text-gray-900">
                                            ¥{item.totalBudget.toLocaleString()}
                                        </td>
                                        <td className="px-4 py-3">
                                            <Badge variant={statusConfig.variant}>{statusConfig.label}</Badge>
                                        </td>
                                        <td className="px-4 py-3">
                                            <span className="text-xs text-purple-600 font-medium">
                                                {item.costCenterCodes.length} 个
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-gray-600">{item.createdBy}</td>
                                        <td className="px-4 py-3">
                                            <div className="flex items-center gap-1">
                                                <IconButton icon={Eye} onClick={() => handleView(item)} title="查看" />
                                                <IconButton icon={Edit2} onClick={() => handleEdit(item)} title="编辑" />
                                                <IconButton icon={Copy} onClick={() => handleCopy(item)} title="复制" />
                                                <IconButton
                                                    icon={Trash2}
                                                    onClick={() => handleDelete(item.id)}
                                                    title="删除"
                                                    disabled={item.status === 'active'}
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>

                    {filteredData.length === 0 && (
                        <div className="text-center py-12 text-gray-500">
                            <FileText className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                            <p>暂无预算版本数据</p>
                        </div>
                    )}
                </div>

                {/* 分页信息 */}
                {filteredData.length > 0 && (
                    <div className="px-4 py-3 border-t bg-gray-50 flex items-center justify-between">
                        <p className="text-sm text-gray-500">共 {filteredData.length} 条记录</p>
                    </div>
                )}
            </Card>

            {/* 编辑抽屉 */}
            <BudgetVersionEditDrawer
                isOpen={isDrawerOpen}
                onClose={() => setIsDrawerOpen(false)}
                version={editingItem}
                onSave={handleSave}
            />
        </div>
    );
}
