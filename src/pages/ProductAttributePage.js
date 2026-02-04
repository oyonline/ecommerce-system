// src/pages/ProductAttributePage.js
// 属性管理页面 - 产品中心基础配置核心功能
import React, { useState } from 'react';
import {
    Search, Plus, Edit2, Trash2, X, Save, Download, Upload,
    Tag, List, Hash, Type, Calendar, ToggleLeft, CheckSquare,
    ChevronDown, ChevronRight, Copy, MoreHorizontal, Filter,
    AlertCircle, Check, Layers, Settings, Database
} from 'lucide-react';

// 轻量工具：className 拼接
const cn = (...args) => args.filter(Boolean).join(' ');

// --------------- 属性类型配置 ---------------
const ATTRIBUTE_TYPES = [
    { id: 'text', name: '文本', icon: Type, description: '单行文本输入' },
    { id: 'textarea', name: '多行文本', icon: List, description: '多行文本输入' },
    { id: 'number', name: '数字', icon: Hash, description: '数值输入，支持单位' },
    { id: 'single_select', name: '单选', icon: CheckSquare, description: '单选下拉列表' },
    { id: 'multi_select', name: '多选', icon: CheckSquare, description: '多选复选框' },
    { id: 'date', name: '日期', icon: Calendar, description: '日期选择器' },
    { id: 'boolean', name: '是/否', icon: ToggleLeft, description: '布尔值开关' },
    { id: 'image', name: '图片', icon: Tag, description: '图片上传' },
];

// --------------- 属性分组配置 ---------------
const ATTRIBUTE_GROUPS = [
    { id: 'basic', name: '基础属性', description: '产品基本信息属性', color: 'blue' },
    { id: 'spec', name: '规格属性', description: '产品规格参数', color: 'green' },
    { id: 'sales', name: '销售属性', description: '影响SKU生成的属性', color: 'purple' },
    { id: 'logistics', name: '物流属性', description: '物流相关属性', color: 'orange' },
    { id: 'quality', name: '质量属性', description: '质量检验相关属性', color: 'red' },
    { id: 'custom', name: '自定义属性', description: '用户自定义属性', color: 'gray' },
];

// --------------- 属性数据 ---------------
const initialAttributes = [
    // 基础属性
    { id: '1', code: 'BRAND', name: '品牌', shortCode: 'BR', groupId: 'basic', type: 'single_select', required: true, isActive: true, options: ['品牌A', '品牌B', '品牌C', '自有品牌'], unit: '', refCount: 1256, description: '产品所属品牌', createdAt: '2024-01-10', updatedAt: '2024-03-15' },
    { id: '2', code: 'PRODUCT_NAME', name: '产品名称', shortCode: 'PN', groupId: 'basic', type: 'text', required: true, isActive: true, options: [], unit: '', refCount: 1256, description: '产品的完整名称', createdAt: '2024-01-10', updatedAt: '2024-01-10' },
    { id: '3', code: 'PRODUCT_NAME_EN', name: '英文名称', shortCode: 'PNE', groupId: 'basic', type: 'text', required: false, isActive: true, options: [], unit: '', refCount: 1180, description: '产品英文名称', createdAt: '2024-01-10', updatedAt: '2024-01-10' },
    { id: '4', code: 'MODEL', name: '型号', shortCode: 'MD', groupId: 'basic', type: 'text', required: true, isActive: true, options: [], unit: '', refCount: 1256, description: '产品型号', createdAt: '2024-01-10', updatedAt: '2024-01-10' },
    { id: '5', code: 'MATERIAL', name: '材质', shortCode: 'MT', groupId: 'basic', type: 'multi_select', required: false, isActive: true, options: ['塑料', '金属', '木材', '玻璃', '布料', '皮革', '硅胶', '陶瓷'], unit: '', refCount: 890, description: '产品主要材质', createdAt: '2024-01-10', updatedAt: '2024-02-20' },
    { id: '6', code: 'ORIGIN', name: '产地', shortCode: 'OG', groupId: 'basic', type: 'single_select', required: false, isActive: true, options: ['中国', '越南', '印度', '泰国', '马来西亚'], unit: '', refCount: 756, description: '产品生产地', createdAt: '2024-01-10', updatedAt: '2024-01-10' },

    // 规格属性
    { id: '7', code: 'LENGTH', name: '长度', shortCode: 'LEN', groupId: 'spec', type: 'number', required: false, isActive: true, options: [], unit: 'cm', refCount: 1024, description: '产品长度', createdAt: '2024-01-10', updatedAt: '2024-01-10' },
    { id: '8', code: 'WIDTH', name: '宽度', shortCode: 'WID', groupId: 'spec', type: 'number', required: false, isActive: true, options: [], unit: 'cm', refCount: 1024, description: '产品宽度', createdAt: '2024-01-10', updatedAt: '2024-01-10' },
    { id: '9', code: 'HEIGHT', name: '高度', shortCode: 'HGT', groupId: 'spec', type: 'number', required: false, isActive: true, options: [], unit: 'cm', refCount: 1024, description: '产品高度', createdAt: '2024-01-10', updatedAt: '2024-01-10' },
    { id: '10', code: 'WEIGHT', name: '重量', shortCode: 'WT', groupId: 'spec', type: 'number', required: true, isActive: true, options: [], unit: 'g', refCount: 1256, description: '产品净重', createdAt: '2024-01-10', updatedAt: '2024-01-10' },
    { id: '11', code: 'VOLUME', name: '体积', shortCode: 'VOL', groupId: 'spec', type: 'number', required: false, isActive: true, options: [], unit: 'cm³', refCount: 678, description: '产品体积', createdAt: '2024-01-15', updatedAt: '2024-01-15' },
    { id: '12', code: 'POWER', name: '功率', shortCode: 'PWR', groupId: 'spec', type: 'number', required: false, isActive: true, options: [], unit: 'W', refCount: 234, description: '电器功率', createdAt: '2024-01-15', updatedAt: '2024-01-15' },
    { id: '13', code: 'VOLTAGE', name: '电压', shortCode: 'VLT', groupId: 'spec', type: 'single_select', required: false, isActive: true, options: ['110V', '220V', '110V-220V', '12V', '24V'], unit: '', refCount: 234, description: '工作电压', createdAt: '2024-01-15', updatedAt: '2024-01-15' },

    // 销售属性
    { id: '14', code: 'COLOR', name: '颜色', shortCode: 'CLR', groupId: 'sales', type: 'multi_select', required: true, isActive: true, options: ['黑色', '白色', '红色', '蓝色', '绿色', '黄色', '粉色', '灰色', '棕色', '紫色'], unit: '', refCount: 1256, description: '产品颜色，影响SKU生成', createdAt: '2024-01-10', updatedAt: '2024-03-01' },
    { id: '15', code: 'SIZE', name: '尺码', shortCode: 'SZ', groupId: 'sales', type: 'multi_select', required: false, isActive: true, options: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'], unit: '', refCount: 456, description: '服装尺码，影响SKU生成', createdAt: '2024-01-10', updatedAt: '2024-01-10' },
    { id: '16', code: 'STYLE', name: '款式', shortCode: 'STY', groupId: 'sales', type: 'single_select', required: false, isActive: true, options: ['基础款', '升级款', '豪华款', '限定款'], unit: '', refCount: 678, description: '产品款式', createdAt: '2024-01-15', updatedAt: '2024-01-15' },
    { id: '17', code: 'PACKAGE_QTY', name: '包装数量', shortCode: 'PKQ', groupId: 'sales', type: 'single_select', required: false, isActive: true, options: ['单个装', '2个装', '3个装', '5个装', '10个装'], unit: '', refCount: 890, description: '每包装数量', createdAt: '2024-01-15', updatedAt: '2024-01-15' },

    // 物流属性
    { id: '18', code: 'PACK_LENGTH', name: '包装长度', shortCode: 'PKL', groupId: 'logistics', type: 'number', required: true, isActive: true, options: [], unit: 'cm', refCount: 1256, description: '外包装长度', createdAt: '2024-01-10', updatedAt: '2024-01-10' },
    { id: '19', code: 'PACK_WIDTH', name: '包装宽度', shortCode: 'PKW', groupId: 'logistics', type: 'number', required: true, isActive: true, options: [], unit: 'cm', refCount: 1256, description: '外包装宽度', createdAt: '2024-01-10', updatedAt: '2024-01-10' },
    { id: '20', code: 'PACK_HEIGHT', name: '包装高度', shortCode: 'PKH', groupId: 'logistics', type: 'number', required: true, isActive: true, options: [], unit: 'cm', refCount: 1256, description: '外包装高度', createdAt: '2024-01-10', updatedAt: '2024-01-10' },
    { id: '21', code: 'GROSS_WEIGHT', name: '毛重', shortCode: 'GW', groupId: 'logistics', type: 'number', required: true, isActive: true, options: [], unit: 'g', refCount: 1256, description: '含包装重量', createdAt: '2024-01-10', updatedAt: '2024-01-10' },
    { id: '22', code: 'HS_CODE', name: '海关编码', shortCode: 'HS', groupId: 'logistics', type: 'text', required: false, isActive: true, options: [], unit: '', refCount: 890, description: 'HS海关编码', createdAt: '2024-01-15', updatedAt: '2024-01-15' },
    { id: '23', code: 'BATTERY', name: '含电池', shortCode: 'BAT', groupId: 'logistics', type: 'boolean', required: true, isActive: true, options: [], unit: '', refCount: 1256, description: '是否含电池', createdAt: '2024-01-10', updatedAt: '2024-01-10' },
    { id: '24', code: 'LIQUID', name: '含液体', shortCode: 'LQD', groupId: 'logistics', type: 'boolean', required: true, isActive: true, options: [], unit: '', refCount: 1256, description: '是否含液体', createdAt: '2024-01-10', updatedAt: '2024-01-10' },

    // 质量属性
    { id: '25', code: 'CERT_CE', name: 'CE认证', shortCode: 'CE', groupId: 'quality', type: 'boolean', required: false, isActive: true, options: [], unit: '', refCount: 567, description: '是否有CE认证', createdAt: '2024-01-20', updatedAt: '2024-01-20' },
    { id: '26', code: 'CERT_FCC', name: 'FCC认证', shortCode: 'FCC', groupId: 'quality', type: 'boolean', required: false, isActive: true, options: [], unit: '', refCount: 456, description: '是否有FCC认证', createdAt: '2024-01-20', updatedAt: '2024-01-20' },
    { id: '27', code: 'WARRANTY', name: '质保期', shortCode: 'WRY', groupId: 'quality', type: 'single_select', required: false, isActive: true, options: ['无质保', '3个月', '6个月', '1年', '2年', '3年'], unit: '', refCount: 890, description: '产品质保期限', createdAt: '2024-01-20', updatedAt: '2024-01-20' },

    // 自定义属性
    { id: '28', code: 'CUSTOM_1', name: '自定义属性1', shortCode: 'C1', groupId: 'custom', type: 'text', required: false, isActive: false, options: [], unit: '', refCount: 0, description: '预留自定义属性', createdAt: '2024-02-01', updatedAt: '2024-02-01' },
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

const Input = ({ value, onChange, placeholder, className, icon: Icon, disabled }) => (
    <div className="relative">
        {Icon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Icon className="w-4 h-4 text-gray-400" />
            </div>
        )}
        <input
            type="text"
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

const Select = ({ value, onChange, options, className, placeholder }) => (
    <select
        value={value}
        onChange={onChange}
        className={cn(
            'border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white',
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
        orange: 'bg-orange-100 text-orange-700',
    };
    return (
        <span className={cn(
            'inline-flex items-center px-2 py-0.5 rounded text-xs font-medium',
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
            checked ? 'bg-blue-600' : 'bg-gray-200',
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

// --------------- 属性类型徽章 ---------------
const TypeBadge = ({ type }) => {
    const typeConfig = ATTRIBUTE_TYPES.find(t => t.id === type);
    const Icon = typeConfig?.icon || Type;
    return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">
            <Icon className="w-3 h-3" />
            {typeConfig?.name || type}
        </span>
    );
};

// --------------- 属性编辑抽屉 ---------------
const AttributeEditDrawer = ({ isOpen, onClose, attribute, onSave }) => {
    const [formData, setFormData] = useState({
        code: '',
        name: '',
        shortCode: '',
        groupId: 'basic',
        type: 'text',
        required: false,
        isActive: true,
        unit: '',
        description: '',
        options: [],
    });
    const [newOption, setNewOption] = useState('');

    React.useEffect(() => {
        if (attribute) {
            setFormData({
                code: attribute.code,
                name: attribute.name,
                shortCode: attribute.shortCode,
                groupId: attribute.groupId,
                type: attribute.type,
                required: attribute.required,
                isActive: attribute.isActive,
                unit: attribute.unit || '',
                description: attribute.description || '',
                options: [...(attribute.options || [])],
            });
        } else {
            setFormData({
                code: '',
                name: '',
                shortCode: '',
                groupId: 'basic',
                type: 'text',
                required: false,
                isActive: true,
                unit: '',
                description: '',
                options: [],
            });
        }
    }, [attribute]);

    const handleAddOption = () => {
        if (newOption && !formData.options.includes(newOption)) {
            setFormData(prev => ({
                ...prev,
                options: [...prev.options, newOption]
            }));
            setNewOption('');
        }
    };

    const handleRemoveOption = (opt) => {
        setFormData(prev => ({
            ...prev,
            options: prev.options.filter(o => o !== opt)
        }));
    };

    const handleSave = () => {
        const savedAttr = {
            ...attribute,
            ...formData,
            id: attribute?.id || `${Date.now()}`,
            refCount: attribute?.refCount || 0,
            createdAt: attribute?.createdAt || new Date().toISOString().split('T')[0],
            updatedAt: new Date().toISOString().split('T')[0],
        };
        onSave(savedAttr);
        onClose();
    };

    const needsOptions = ['single_select', 'multi_select'].includes(formData.type);
    const needsUnit = formData.type === 'number';

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex justify-end">
            <div className="absolute inset-0 bg-black/30" onClick={onClose} />
            <div className="relative w-[560px] bg-white h-full shadow-xl flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b">
                    <h2 className="text-lg font-semibold">{attribute ? '编辑属性' : '新建属性'}</h2>
                    <IconButton icon={X} onClick={onClose} />
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6 space-y-5">
                    {/* 基本信息 */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">属性编码 *</label>
                            <Input
                                value={formData.code}
                                onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                                placeholder="如 COLOR"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">简写编码 *</label>
                            <Input
                                value={formData.shortCode}
                                onChange={(e) => setFormData({ ...formData, shortCode: e.target.value.toUpperCase() })}
                                placeholder="如 CLR"
                            />
                            <p className="text-xs text-gray-400 mt-1">用于生成产品编码</p>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">属性名称 *</label>
                        <Input
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="如 颜色"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">所属分组 *</label>
                            <Select
                                value={formData.groupId}
                                onChange={(e) => setFormData({ ...formData, groupId: e.target.value })}
                                options={ATTRIBUTE_GROUPS.map(g => ({ value: g.id, label: g.name }))}
                                className="w-full"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">属性类型 *</label>
                            <Select
                                value={formData.type}
                                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                options={ATTRIBUTE_TYPES.map(t => ({ value: t.id, label: t.name }))}
                                className="w-full"
                            />
                        </div>
                    </div>

                    {/* 数字类型的单位 */}
                    {needsUnit && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">单位</label>
                            <Input
                                value={formData.unit}
                                onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                                placeholder="如 cm, g, kg"
                            />
                        </div>
                    )}

                    {/* 选择类型的选项 */}
                    {needsOptions && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">可选值</label>
                            <div className="flex flex-wrap gap-2 mb-2">
                                {formData.options.map((opt, idx) => (
                                    <span key={idx} className="inline-flex items-center gap-1 px-2 py-1 bg-blue-50 text-blue-700 rounded text-sm">
                                        {opt}
                                        <X className="w-3 h-3 cursor-pointer hover:text-red-500" onClick={() => handleRemoveOption(opt)} />
                                    </span>
                                ))}
                            </div>
                            <div className="flex items-center gap-2">
                                <Input
                                    value={newOption}
                                    onChange={(e) => setNewOption(e.target.value)}
                                    placeholder="输入选项值"
                                    className="flex-1"
                                />
                                <SecondaryButton icon={Plus} size="sm" onClick={handleAddOption}>添加</SecondaryButton>
                            </div>
                        </div>
                    )}

                    {/* 描述 */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">描述</label>
                        <textarea
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            placeholder="属性用途说明"
                            rows={2}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    {/* 开关选项 */}
                    <div className="flex items-center gap-6 pt-2">
                        <label className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={formData.required}
                                onChange={(e) => setFormData({ ...formData, required: e.target.checked })}
                                className="rounded border-gray-300 text-blue-600"
                            />
                            <span className="text-sm text-gray-700">必填属性</span>
                        </label>
                        <label className="flex items-center gap-2">
                            <Toggle
                                checked={formData.isActive}
                                onChange={(v) => setFormData({ ...formData, isActive: v })}
                            />
                            <span className="text-sm text-gray-700">启用</span>
                        </label>
                    </div>

                    {/* 预览 */}
                    <div className="p-4 bg-gray-50 rounded-lg">
                        <p className="text-xs text-gray-500 mb-2">预览</p>
                        <div className="flex items-center gap-3">
                            <Badge variant={formData.isActive ? 'success' : 'default'}>
                                {formData.isActive ? '启用' : '停用'}
                            </Badge>
                            <span className="font-medium">{formData.name || '属性名称'}</span>
                            <code className="text-xs text-gray-500 bg-white px-2 py-0.5 rounded">{formData.shortCode || 'CODE'}</code>
                            <TypeBadge type={formData.type} />
                            {formData.required && <Badge variant="danger">必填</Badge>}
                            {formData.unit && <span className="text-xs text-gray-500">单位: {formData.unit}</span>}
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-end gap-3 px-6 py-4 border-t bg-gray-50">
                    <SecondaryButton onClick={onClose}>取消</SecondaryButton>
                    <PrimaryButton
                        icon={Save}
                        onClick={handleSave}
                        disabled={!formData.code || !formData.name || !formData.shortCode}
                    >
                        保存
                    </PrimaryButton>
                </div>
            </div>
        </div>
    );
};

// --------------- 主组件 ---------------
export default function ProductAttributePage() {
    const [attributes, setAttributes] = useState(initialAttributes);
    const [searchText, setSearchText] = useState('');
    const [filterGroup, setFilterGroup] = useState('');
    const [filterType, setFilterType] = useState('');
    const [filterStatus, setFilterStatus] = useState('');
    const [editingAttr, setEditingAttr] = useState(null);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [expandedGroups, setExpandedGroups] = useState(ATTRIBUTE_GROUPS.map(g => g.id));

    // 过滤属性
    const filteredAttributes = attributes.filter(attr => {
        const matchesSearch = !searchText ||
            attr.name.toLowerCase().includes(searchText.toLowerCase()) ||
            attr.code.toLowerCase().includes(searchText.toLowerCase()) ||
            attr.shortCode.toLowerCase().includes(searchText.toLowerCase());
        const matchesGroup = !filterGroup || attr.groupId === filterGroup;
        const matchesType = !filterType || attr.type === filterType;
        const matchesStatus = !filterStatus ||
            (filterStatus === 'active' && attr.isActive) ||
            (filterStatus === 'inactive' && !attr.isActive);
        return matchesSearch && matchesGroup && matchesType && matchesStatus;
    });

    // 按分组整理
    const groupedAttributes = ATTRIBUTE_GROUPS.map(group => ({
        ...group,
        attributes: filteredAttributes.filter(a => a.groupId === group.id)
    })).filter(g => g.attributes.length > 0);

    // 统计
    const stats = {
        total: attributes.length,
        active: attributes.filter(a => a.isActive).length,
        required: attributes.filter(a => a.required).length,
    };

    const handleAddAttr = () => {
        setEditingAttr(null);
        setIsDrawerOpen(true);
    };

    const handleEditAttr = (attr) => {
        setEditingAttr(attr);
        setIsDrawerOpen(true);
    };

    const handleToggleAttr = (attrId) => {
        setAttributes(prev => prev.map(a =>
            a.id === attrId ? { ...a, isActive: !a.isActive, updatedAt: new Date().toISOString().split('T')[0] } : a
        ));
    };

    const handleDeleteAttr = (attrId) => {
        if (window.confirm('确定要删除该属性吗？')) {
            setAttributes(prev => prev.filter(a => a.id !== attrId));
        }
    };

    const handleSaveAttr = (savedAttr) => {
        setAttributes(prev => {
            const exists = prev.find(a => a.id === savedAttr.id);
            if (exists) {
                return prev.map(a => a.id === savedAttr.id ? savedAttr : a);
            }
            return [...prev, savedAttr];
        });
    };

    const toggleGroup = (groupId) => {
        setExpandedGroups(prev =>
            prev.includes(groupId) ? prev.filter(id => id !== groupId) : [...prev, groupId]
        );
    };

    const getGroupColor = (colorName) => {
        const colors = {
            blue: 'bg-blue-500',
            green: 'bg-green-500',
            purple: 'bg-purple-500',
            orange: 'bg-orange-500',
            red: 'bg-red-500',
            gray: 'bg-gray-500',
        };
        return colors[colorName] || 'bg-gray-500';
    };

    return (
        <div className="space-y-6">
            {/* 页面头部 */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">属性管理</h1>
                    <p className="text-sm text-gray-500 mt-1">管理产品属性定义，包括属性编码、类型、可选值等配置</p>
                </div>
                <div className="flex items-center gap-3">
                    <SecondaryButton icon={Upload}>导入</SecondaryButton>
                    <SecondaryButton icon={Download}>导出</SecondaryButton>
                    <PrimaryButton icon={Plus} onClick={handleAddAttr}>新建属性</PrimaryButton>
                </div>
            </div>

            {/* 统计卡片 */}
            <div className="grid grid-cols-4 gap-4">
                <Card className="p-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                            <Database className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">属性总数</p>
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
                        <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
                            <AlertCircle className="w-5 h-5 text-red-600" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">必填属性</p>
                            <p className="text-2xl font-bold text-gray-900">{stats.required}</p>
                        </div>
                    </div>
                </Card>
                <Card className="p-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                            <Layers className="w-5 h-5 text-purple-600" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">属性分组</p>
                            <p className="text-2xl font-bold text-gray-900">{ATTRIBUTE_GROUPS.length}</p>
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
                        placeholder="搜索属性名称、编码..."
                        icon={Search}
                        className="w-64"
                    />
                    <Select
                        value={filterGroup}
                        onChange={(e) => setFilterGroup(e.target.value)}
                        options={ATTRIBUTE_GROUPS.map(g => ({ value: g.id, label: g.name }))}
                        placeholder="全部分组"
                        className="w-36"
                    />
                    <Select
                        value={filterType}
                        onChange={(e) => setFilterType(e.target.value)}
                        options={ATTRIBUTE_TYPES.map(t => ({ value: t.id, label: t.name }))}
                        placeholder="全部类型"
                        className="w-32"
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
                    {(filterGroup || filterType || filterStatus) && (
                        <button
                            onClick={() => { setFilterGroup(''); setFilterType(''); setFilterStatus(''); }}
                            className="text-sm text-blue-600 hover:underline"
                        >
                            清除筛选
                        </button>
                    )}
                </div>
            </Card>

            {/* 属性列表 - 按分组展示 */}
            <div className="space-y-4">
                {groupedAttributes.map(group => (
                    <Card key={group.id} className="overflow-hidden">
                        {/* 分组头部 */}
                        <div
                            className="flex items-center gap-3 px-4 py-3 bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors"
                            onClick={() => toggleGroup(group.id)}
                        >
                            <div className={cn('w-1 h-8 rounded', getGroupColor(group.color))} />
                            <div className="flex-1">
                                <div className="flex items-center gap-2">
                                    <h3 className="font-semibold text-gray-800">{group.name}</h3>
                                    <span className="text-xs text-gray-400">({group.attributes.length})</span>
                                </div>
                                <p className="text-xs text-gray-500">{group.description}</p>
                            </div>
                            {expandedGroups.includes(group.id) ? (
                                <ChevronDown className="w-5 h-5 text-gray-400" />
                            ) : (
                                <ChevronRight className="w-5 h-5 text-gray-400" />
                            )}
                        </div>

                        {/* 属性表格 */}
                        {expandedGroups.includes(group.id) && (
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="border-b border-gray-100">
                                            <th className="px-4 py-3 text-left font-medium text-gray-600">状态</th>
                                            <th className="px-4 py-3 text-left font-medium text-gray-600">属性名称</th>
                                            <th className="px-4 py-3 text-left font-medium text-gray-600">编码</th>
                                            <th className="px-4 py-3 text-left font-medium text-gray-600">简写</th>
                                            <th className="px-4 py-3 text-left font-medium text-gray-600">类型</th>
                                            <th className="px-4 py-3 text-left font-medium text-gray-600">必填</th>
                                            <th className="px-4 py-3 text-left font-medium text-gray-600">单位/选项</th>
                                            <th className="px-4 py-3 text-left font-medium text-gray-600">引用数</th>
                                            <th className="px-4 py-3 text-left font-medium text-gray-600">操作</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50">
                                        {group.attributes.map(attr => (
                                            <tr key={attr.id} className="hover:bg-gray-50">
                                                <td className="px-4 py-3">
                                                    <Toggle
                                                        checked={attr.isActive}
                                                        onChange={() => handleToggleAttr(attr.id)}
                                                    />
                                                </td>
                                                <td className="px-4 py-3">
                                                    <div>
                                                        <p className="font-medium text-gray-900">{attr.name}</p>
                                                        {attr.description && (
                                                            <p className="text-xs text-gray-400 truncate max-w-xs">{attr.description}</p>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="px-4 py-3">
                                                    <code className="text-xs bg-gray-100 px-2 py-0.5 rounded">{attr.code}</code>
                                                </td>
                                                <td className="px-4 py-3">
                                                    <code className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded font-bold">{attr.shortCode}</code>
                                                </td>
                                                <td className="px-4 py-3">
                                                    <TypeBadge type={attr.type} />
                                                </td>
                                                <td className="px-4 py-3">
                                                    {attr.required ? (
                                                        <Badge variant="danger">必填</Badge>
                                                    ) : (
                                                        <span className="text-gray-400">-</span>
                                                    )}
                                                </td>
                                                <td className="px-4 py-3">
                                                    {attr.unit ? (
                                                        <span className="text-gray-600">{attr.unit}</span>
                                                    ) : attr.options?.length > 0 ? (
                                                        <span className="text-xs text-gray-500">{attr.options.length} 个选项</span>
                                                    ) : (
                                                        <span className="text-gray-400">-</span>
                                                    )}
                                                </td>
                                                <td className="px-4 py-3 text-gray-500">{attr.refCount.toLocaleString()}</td>
                                                <td className="px-4 py-3">
                                                    <div className="flex items-center gap-1">
                                                        <IconButton icon={Edit2} onClick={() => handleEditAttr(attr)} title="编辑" />
                                                        <IconButton icon={Copy} onClick={() => {
                                                            const newAttr = {
                                                                ...attr,
                                                                id: `${Date.now()}`,
                                                                code: `${attr.code}_COPY`,
                                                                shortCode: `${attr.shortCode}2`,
                                                                name: `${attr.name} (副本)`,
                                                                refCount: 0,
                                                            };
                                                            setAttributes(prev => [...prev, newAttr]);
                                                        }} title="复制" />
                                                        <IconButton
                                                            icon={Trash2}
                                                            onClick={() => handleDeleteAttr(attr.id)}
                                                            title="删除"
                                                            disabled={attr.refCount > 0}
                                                        />
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </Card>
                ))}

                {groupedAttributes.length === 0 && (
                    <div className="text-center py-12 text-gray-500">
                        <Database className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                        <p>暂无属性数据</p>
                    </div>
                )}
            </div>

            {/* 编辑抽屉 */}
            <AttributeEditDrawer
                isOpen={isDrawerOpen}
                onClose={() => setIsDrawerOpen(false)}
                attribute={editingAttr}
                onSave={handleSaveAttr}
            />
        </div>
    );
}
