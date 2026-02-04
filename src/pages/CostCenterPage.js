// src/pages/CostCenterPage.js
// 成本中心管理页面
import React, { useState } from 'react';
import {
    Search, Plus, Edit2, Trash2, X, Save, Download, Upload,
    Building2, ChevronRight, Check, AlertCircle, Calendar,
    User, FileText, ToggleLeft, Filter, MoreHorizontal
} from 'lucide-react';

// 轻量工具：className 拼接
const cn = (...args) => args.filter(Boolean).join(' ');

// --------------- 部门数据（用于选择归属部门） ---------------
const departmentTree = [
    {
        id: 'BM000007',
        name: '欧美事业部',
        children: [
            { id: 'BM000101', name: '平台电商部', fullPath: '欧美事业部 > 平台电商部' },
            { id: 'BM000094', name: '直营电商部', fullPath: '欧美事业部 > 直营电商部' },
            { id: 'BM000102', name: '运营支持部', fullPath: '欧美事业部 > 运营支持部' },
        ],
        fullPath: '欧美事业部'
    },
    {
        id: 'BM000008',
        name: '亚太事业部',
        children: [
            { id: 'BM000008-P1', name: '平台电商部', fullPath: '亚太事业部 > 平台电商部' },
            { id: 'BM000008-P2', name: '区域运营部', fullPath: '亚太事业部 > 区域运营部' },
        ],
        fullPath: '亚太事业部'
    },
    {
        id: 'BM000109',
        name: '全球共享服务中心',
        children: [
            { id: 'BM000109-F1', name: '财务部', fullPath: '全球共享服务中心 > 财务部' },
            { id: 'BM000109-H1', name: '人力资源部', fullPath: '全球共享服务中心 > 人力资源部' },
            { id: 'BM000109-I1', name: 'IT部', fullPath: '全球共享服务中心 > IT部' },
            { id: 'BM000109-L1', name: '法务部', fullPath: '全球共享服务中心 > 法务部' },
        ],
        fullPath: '全球共享服务中心'
    },
];

// 扁平化部门列表
const flatDepartments = departmentTree.flatMap(dept => [
    { id: dept.id, name: dept.name, fullPath: dept.fullPath },
    ...(dept.children || []).map(child => ({ id: child.id, name: child.name, fullPath: child.fullPath }))
]);

// --------------- 客户分组数据 ---------------
const customerGroups = [
    { id: 'amazon', name: 'Amazon' },
    { id: 'ebay', name: 'eBay' },
    { id: 'walmart', name: 'Walmart' },
    { id: 'tiktok', name: 'TikTok Shop' },
    { id: 'tmall', name: '天猫' },
    { id: 'jd', name: '京东' },
    { id: 'shopee', name: 'Shopee' },
    { id: 'lazada', name: 'Lazada' },
    { id: 'internal', name: '内部' },
];

// --------------- 成本中心数据 ---------------
const initialCostCenters = [
    {
        id: '1',
        code: 'Amazon001',
        name: 'Amazon成本中心',
        status: 'active',
        enableDate: '2024-01-01',
        departmentId: 'BM000101',
        departmentPath: '欧美事业部 > 平台电商部',
        customerGroup: 'Amazon',
        createdBy: 'Lyn',
        createdAt: '2023-12-23',
        remark: '亚马逊成本中心V2',
    },
    {
        id: '2',
        code: 'Finance001',
        name: '财务部成本中心',
        status: 'active',
        enableDate: '2024-01-01',
        departmentId: 'BM000109-F1',
        departmentPath: '全球共享服务中心 > 财务部',
        customerGroup: '-',
        createdBy: 'Lyn',
        createdAt: '2023-12-23',
        remark: '财务成本中心V1',
    },
    {
        id: '3',
        code: 'eBay001',
        name: 'eBay成本中心',
        status: 'active',
        enableDate: '2024-01-15',
        departmentId: 'BM000101',
        departmentPath: '欧美事业部 > 平台电商部',
        customerGroup: 'eBay',
        createdBy: 'Jason',
        createdAt: '2024-01-10',
        remark: 'eBay平台成本归集',
    },
    {
        id: '4',
        code: 'TikTok001',
        name: 'TikTok成本中心',
        status: 'active',
        enableDate: '2024-02-01',
        departmentId: 'BM000008-P1',
        departmentPath: '亚太事业部 > 平台电商部',
        customerGroup: 'TikTok Shop',
        createdBy: 'Effie',
        createdAt: '2024-01-25',
        remark: 'TikTok Shop东南亚市场',
    },
    {
        id: '5',
        code: 'Tmall001',
        name: '天猫成本中心',
        status: 'active',
        enableDate: '2024-01-01',
        departmentId: 'BM000008-P1',
        departmentPath: '亚太事业部 > 平台电商部',
        customerGroup: '天猫',
        createdBy: 'Effie',
        createdAt: '2023-12-28',
        remark: '天猫旗舰店成本中心',
    },
    {
        id: '6',
        code: 'HR001',
        name: '人力资源成本中心',
        status: 'active',
        enableDate: '2024-01-01',
        departmentId: 'BM000109-H1',
        departmentPath: '全球共享服务中心 > 人力资源部',
        customerGroup: '-',
        createdBy: 'Lyn',
        createdAt: '2023-12-23',
        remark: '人力资源部费用归集',
    },
    {
        id: '7',
        code: 'IT001',
        name: 'IT部成本中心',
        status: 'active',
        enableDate: '2024-01-01',
        departmentId: 'BM000109-I1',
        departmentPath: '全球共享服务中心 > IT部',
        customerGroup: '-',
        createdBy: 'Harry',
        createdAt: '2023-12-23',
        remark: 'IT基础设施及运维成本',
    },
    {
        id: '8',
        code: 'Walmart001',
        name: 'Walmart成本中心',
        status: 'inactive',
        enableDate: '2024-03-01',
        departmentId: 'BM000101',
        departmentPath: '欧美事业部 > 平台电商部',
        customerGroup: 'Walmart',
        createdBy: 'Tate',
        createdAt: '2024-02-15',
        remark: 'Walmart试运营（待启用）',
    },
    {
        id: '9',
        code: 'Shopee001',
        name: 'Shopee成本中心',
        status: 'active',
        enableDate: '2024-02-01',
        departmentId: 'BM000008-P1',
        departmentPath: '亚太事业部 > 平台电商部',
        customerGroup: 'Shopee',
        createdBy: 'Effie',
        createdAt: '2024-01-20',
        remark: 'Shopee东南亚多站点',
    },
    {
        id: '10',
        code: 'Direct001',
        name: '直营电商成本中心',
        status: 'active',
        enableDate: '2024-01-01',
        departmentId: 'BM000094',
        departmentPath: '欧美事业部 > 直营电商部',
        customerGroup: '-',
        createdBy: 'Tate',
        createdAt: '2023-12-25',
        remark: '独立站DTC成本归集',
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

const Toggle = ({ checked, onChange, disabled }) => (
    <button
        onClick={() => !disabled && onChange(!checked)}
        disabled={disabled}
        className={cn(
            'relative inline-flex h-5 w-9 items-center rounded-full transition-colors',
            checked ? 'bg-green-500' : 'bg-gray-200',
            disabled && 'opacity-50 cursor-not-allowed'
        )}
    >
        <span
            className={cn(
                'inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform',
                checked ? 'translate-x-5' : 'translate-x-1'
            )}
        />
    </button>
);

// --------------- 成本中心编辑抽屉 ---------------
const CostCenterEditDrawer = ({ isOpen, onClose, costCenter, onSave }) => {
    const [formData, setFormData] = useState({
        code: '',
        name: '',
        status: 'active',
        enableDate: '',
        departmentId: '',
        customerGroup: '-',
        remark: '',
    });

    React.useEffect(() => {
        if (costCenter) {
            setFormData({
                code: costCenter.code,
                name: costCenter.name,
                status: costCenter.status,
                enableDate: costCenter.enableDate,
                departmentId: costCenter.departmentId,
                customerGroup: costCenter.customerGroup,
                remark: costCenter.remark || '',
            });
        } else {
            setFormData({
                code: '',
                name: '',
                status: 'active',
                enableDate: new Date().toISOString().split('T')[0],
                departmentId: '',
                customerGroup: '-',
                remark: '',
            });
        }
    }, [costCenter]);

    const handleSave = () => {
        const dept = flatDepartments.find(d => d.id === formData.departmentId);
        const savedData = {
            ...costCenter,
            ...formData,
            id: costCenter?.id || `${Date.now()}`,
            departmentPath: dept?.fullPath || '',
            createdBy: costCenter?.createdBy || 'Admin',
            createdAt: costCenter?.createdAt || new Date().toISOString().split('T')[0],
        };
        onSave(savedData);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex justify-end">
            <div className="absolute inset-0 bg-black/30" onClick={onClose} />
            <div className="relative w-[520px] bg-white h-full shadow-xl flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b">
                    <h2 className="text-lg font-semibold">{costCenter ? '编辑成本中心' : '新建成本中心'}</h2>
                    <IconButton icon={X} onClick={onClose} />
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6 space-y-5">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">成本中心编码 *</label>
                            <Input
                                value={formData.code}
                                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                                placeholder="如 Amazon001"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">启用时间 *</label>
                            <Input
                                type="date"
                                value={formData.enableDate}
                                onChange={(e) => setFormData({ ...formData, enableDate: e.target.value })}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">成本中心名称 *</label>
                        <Input
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="如 Amazon成本中心"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">归属部门 *</label>
                        <Select
                            value={formData.departmentId}
                            onChange={(e) => setFormData({ ...formData, departmentId: e.target.value })}
                            options={flatDepartments.map(d => ({ value: d.id, label: d.fullPath }))}
                            placeholder="选择归属部门"
                            className="w-full"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">关联客户分组</label>
                        <Select
                            value={formData.customerGroup}
                            onChange={(e) => setFormData({ ...formData, customerGroup: e.target.value })}
                            options={[
                                { value: '-', label: '无' },
                                ...customerGroups.map(g => ({ value: g.name, label: g.name }))
                            ]}
                            className="w-full"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">状态</label>
                        <div className="flex items-center gap-3 mt-2">
                            <Toggle
                                checked={formData.status === 'active'}
                                onChange={(v) => setFormData({ ...formData, status: v ? 'active' : 'inactive' })}
                            />
                            <span className="text-sm text-gray-600">
                                {formData.status === 'active' ? '启用' : '停用'}
                            </span>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">备注</label>
                        <textarea
                            value={formData.remark}
                            onChange={(e) => setFormData({ ...formData, remark: e.target.value })}
                            placeholder="输入备注信息"
                            rows={3}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    {/* 预览 */}
                    <div className="p-4 bg-gray-50 rounded-lg">
                        <p className="text-xs text-gray-500 mb-2">预览</p>
                        <div className="space-y-2 text-sm">
                            <div className="flex items-center gap-2">
                                <Badge variant={formData.status === 'active' ? 'success' : 'default'}>
                                    {formData.status === 'active' ? '启用' : '停用'}
                                </Badge>
                                <span className="font-medium">{formData.name || '成本中心名称'}</span>
                                <code className="text-xs bg-white px-2 py-0.5 rounded border">{formData.code || 'CODE'}</code>
                            </div>
                            <p className="text-xs text-gray-500">
                                {flatDepartments.find(d => d.id === formData.departmentId)?.fullPath || '归属部门'}
                                {formData.customerGroup !== '-' && ` • ${formData.customerGroup}`}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-end gap-3 px-6 py-4 border-t bg-gray-50">
                    <SecondaryButton onClick={onClose}>取消</SecondaryButton>
                    <PrimaryButton
                        icon={Save}
                        onClick={handleSave}
                        disabled={!formData.code || !formData.name || !formData.departmentId || !formData.enableDate}
                    >
                        保存
                    </PrimaryButton>
                </div>
            </div>
        </div>
    );
};

// --------------- 主组件 ---------------
export default function CostCenterPage() {
    const [costCenters, setCostCenters] = useState(initialCostCenters);
    const [searchText, setSearchText] = useState('');
    const [filterStatus, setFilterStatus] = useState('');
    const [filterDept, setFilterDept] = useState('');
    const [filterCustomer, setFilterCustomer] = useState('');
    const [editingItem, setEditingItem] = useState(null);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    // 过滤数据
    const filteredData = costCenters.filter(item => {
        const matchesSearch = !searchText ||
            item.name.toLowerCase().includes(searchText.toLowerCase()) ||
            item.code.toLowerCase().includes(searchText.toLowerCase()) ||
            item.departmentPath.toLowerCase().includes(searchText.toLowerCase());
        const matchesStatus = !filterStatus || item.status === filterStatus;
        const matchesDept = !filterDept || item.departmentPath.includes(filterDept);
        const matchesCustomer = !filterCustomer ||
            (filterCustomer === 'none' && item.customerGroup === '-') ||
            item.customerGroup === filterCustomer;
        return matchesSearch && matchesStatus && matchesDept && matchesCustomer;
    });

    // 统计
    const stats = {
        total: costCenters.length,
        active: costCenters.filter(c => c.status === 'active').length,
        inactive: costCenters.filter(c => c.status === 'inactive').length,
        withCustomer: costCenters.filter(c => c.customerGroup !== '-').length,
    };

    const handleAdd = () => {
        setEditingItem(null);
        setIsDrawerOpen(true);
    };

    const handleEdit = (item) => {
        setEditingItem(item);
        setIsDrawerOpen(true);
    };

    const handleToggleStatus = (itemId) => {
        setCostCenters(prev => prev.map(item =>
            item.id === itemId
                ? { ...item, status: item.status === 'active' ? 'inactive' : 'active' }
                : item
        ));
    };

    const handleDelete = (itemId) => {
        if (window.confirm('确定要删除该成本中心吗？')) {
            setCostCenters(prev => prev.filter(item => item.id !== itemId));
        }
    };

    const handleSave = (savedItem) => {
        setCostCenters(prev => {
            const exists = prev.find(item => item.id === savedItem.id);
            if (exists) {
                return prev.map(item => item.id === savedItem.id ? savedItem : item);
            }
            return [...prev, savedItem];
        });
    };

    // 获取唯一的部门列表（用于筛选）
    const uniqueDepts = [...new Set(costCenters.map(c => c.departmentPath.split(' > ')[0]))];

    return (
        <div className="space-y-6">
            {/* 页面头部 */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">成本中心管理</h1>
                    <p className="text-sm text-gray-500 mt-1">管理企业成本中心，关联部门和客户分组</p>
                </div>
                <div className="flex items-center gap-3">
                    <SecondaryButton icon={Upload}>导入</SecondaryButton>
                    <SecondaryButton icon={Download}>导出</SecondaryButton>
                    <PrimaryButton icon={Plus} onClick={handleAdd}>新建成本中心</PrimaryButton>
                </div>
            </div>

            {/* 统计卡片 */}
            <div className="grid grid-cols-4 gap-4">
                <Card className="p-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                            <Building2 className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">成本中心总数</p>
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
                            <p className="text-sm text-gray-500">已启用</p>
                            <p className="text-2xl font-bold text-gray-900">{stats.active}</p>
                        </div>
                    </div>
                </Card>
                <Card className="p-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                            <AlertCircle className="w-5 h-5 text-gray-500" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">已停用</p>
                            <p className="text-2xl font-bold text-gray-900">{stats.inactive}</p>
                        </div>
                    </div>
                </Card>
                <Card className="p-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                            <User className="w-5 h-5 text-purple-600" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">关联客户分组</p>
                            <p className="text-2xl font-bold text-gray-900">{stats.withCustomer}</p>
                        </div>
                    </div>
                </Card>
            </div>

            {/* 搜索和筛选 */}
            <Card className="p-4">
                <div className="flex items-center gap-4 flex-wrap">
                    <Input
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        placeholder="搜索名称、编码、部门..."
                        icon={Search}
                        className="w-64"
                    />
                    <Select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        options={[
                            { value: 'active', label: '已启用' },
                            { value: 'inactive', label: '已停用' },
                        ]}
                        placeholder="全部状态"
                        className="w-32"
                    />
                    <Select
                        value={filterDept}
                        onChange={(e) => setFilterDept(e.target.value)}
                        options={uniqueDepts.map(d => ({ value: d, label: d }))}
                        placeholder="全部事业部"
                        className="w-44"
                    />
                    <Select
                        value={filterCustomer}
                        onChange={(e) => setFilterCustomer(e.target.value)}
                        options={[
                            { value: 'none', label: '无客户分组' },
                            ...customerGroups.map(g => ({ value: g.name, label: g.name }))
                        ]}
                        placeholder="全部客户分组"
                        className="w-40"
                    />
                    {(filterStatus || filterDept || filterCustomer) && (
                        <button
                            onClick={() => { setFilterStatus(''); setFilterDept(''); setFilterCustomer(''); }}
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
                                <th className="px-4 py-3 text-left font-medium text-gray-600">状态</th>
                                <th className="px-4 py-3 text-left font-medium text-gray-600">成本中心名称</th>
                                <th className="px-4 py-3 text-left font-medium text-gray-600">编码</th>
                                <th className="px-4 py-3 text-left font-medium text-gray-600">启用时间</th>
                                <th className="px-4 py-3 text-left font-medium text-gray-600">归属部门</th>
                                <th className="px-4 py-3 text-left font-medium text-gray-600">关联客户分组</th>
                                <th className="px-4 py-3 text-left font-medium text-gray-600">创建人</th>
                                <th className="px-4 py-3 text-left font-medium text-gray-600">创建日期</th>
                                <th className="px-4 py-3 text-left font-medium text-gray-600">备注</th>
                                <th className="px-4 py-3 text-left font-medium text-gray-600">操作</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredData.map(item => (
                                <tr key={item.id} className="hover:bg-gray-50">
                                    <td className="px-4 py-3">
                                        <Toggle
                                            checked={item.status === 'active'}
                                            onChange={() => handleToggleStatus(item.id)}
                                        />
                                    </td>
                                    <td className="px-4 py-3">
                                        <span className="font-medium text-gray-900">{item.name}</span>
                                    </td>
                                    <td className="px-4 py-3">
                                        <code className="text-xs bg-gray-100 px-2 py-0.5 rounded">{item.code}</code>
                                    </td>
                                    <td className="px-4 py-3 text-gray-600">{item.enableDate}</td>
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-1 text-gray-600">
                                            {item.departmentPath.split(' > ').map((part, idx, arr) => (
                                                <React.Fragment key={idx}>
                                                    <span className={idx === arr.length - 1 ? 'text-gray-900' : ''}>{part}</span>
                                                    {idx < arr.length - 1 && <ChevronRight className="w-3 h-3 text-gray-400" />}
                                                </React.Fragment>
                                            ))}
                                        </div>
                                    </td>
                                    <td className="px-4 py-3">
                                        {item.customerGroup !== '-' ? (
                                            <Badge variant="info">{item.customerGroup}</Badge>
                                        ) : (
                                            <span className="text-gray-400">-</span>
                                        )}
                                    </td>
                                    <td className="px-4 py-3 text-gray-600">{item.createdBy}</td>
                                    <td className="px-4 py-3 text-gray-500 text-xs">{item.createdAt}</td>
                                    <td className="px-4 py-3">
                                        <span className="text-gray-500 text-xs truncate max-w-[150px] block" title={item.remark}>
                                            {item.remark || '-'}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-1">
                                            <IconButton icon={Edit2} onClick={() => handleEdit(item)} title="编辑" />
                                            <IconButton icon={Trash2} onClick={() => handleDelete(item.id)} title="删除" />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {filteredData.length === 0 && (
                        <div className="text-center py-12 text-gray-500">
                            <Building2 className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                            <p>暂无成本中心数据</p>
                        </div>
                    )}
                </div>

                {/* 分页信息 */}
                {filteredData.length > 0 && (
                    <div className="px-4 py-3 border-t bg-gray-50 flex items-center justify-between">
                        <p className="text-sm text-gray-500">
                            共 {filteredData.length} 条记录
                        </p>
                        <div className="text-sm text-gray-500">
                            显示 1 - {filteredData.length} 条
                        </div>
                    </div>
                )}
            </Card>

            {/* 编辑抽屉 */}
            <CostCenterEditDrawer
                isOpen={isDrawerOpen}
                onClose={() => setIsDrawerOpen(false)}
                costCenter={editingItem}
                onSave={handleSave}
            />
        </div>
    );
}
