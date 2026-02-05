// src/App.js
import React, {useState} from 'react';
import {
    Home,
    BarChart3,
    Package,
    TrendingUp,
    ShoppingCart,
    Truck,
    TestTube,
    DollarSign,
    PieChart,
    Users,
    CheckSquare,
    Settings,
    ChevronDown,
    ChevronRight,
    Menu,
    X
} from 'lucide-react';
import HomePage from './pages/HomePage';
import ProductMasterPage from './pages/ProductMasterPage';
import BOMManagementPage from './pages/BOMManagementPage';
import BrandManagementPage from './pages/BrandManagementPage';
import ProductStructurePage from './pages/ProductStructurePage';
import CategoryTemplatePage from './pages/CategoryTemplatePage';
import StoreDeptMappingPage from './pages/StoreDeptMappingPage';
import CostCenterPage from './pages/CostCenterPage';
import AllocationRulePage from './pages/AllocationRulePage';
import ExpenseApprovalListPageSimple from './pages/ExpenseApprovalListPage.simple';
import ExpenseApprovalDetailPageSimple from './pages/ExpenseApprovalDetailPage.simple';
import ExpenseFactPage from './pages/ExpenseFactPage';
import ExpenseCategoryPage from './pages/ExpenseCategoryPage';
import OrganizationManagementPage from './pages/OrganizationManagementPage';
import PlaceholderPage from './pages/PlaceholderPage';
import SkuDetailPage from './pages/SkuDetailPage.simple';
import SalesTargetPage from './pages/SalesTargetPage';
import ProductTagPage from './pages/ProductTagPage';
import CodingRulePage from './pages/CodingRulePage';
import ProductAttributePage from './pages/ProductAttributePage';
import BudgetVersionPage from './pages/BudgetVersionPage';

// 导航配置
const navigationConfig = [
    {id: 'home', name: '首页', icon: Home, path: '/home'},
    {id: 'dashboard', name: '经营驾驶舱', icon: BarChart3, path: '/dashboard', badge: '管理层'},
    {
        id: 'product',
        name: '产品中心',
        icon: Package,
        children: [
            {id: 'product-master', name: '产品主数据', path: '/product/master'},
            {id: 'product-bom', name: 'BOM 管理', path: '/product/bom'},
            {id: 'product-brand', name: '品牌管理', path: '/product/brand'},
            {id: 'product-structure', name: '产品结构分类', path: '/product/structure'},
            {id: 'product-template', name: '类目属性模板管理', path: '/product/template'},
            {id: 'product-tag', name: '产品标签', path: '/product/tag'},
            {id: 'product-coding-rule', name: '编码规则', path: '/product/coding-rule'},
            {id: 'product-attribute', name: '属性管理', path: '/product/attribute'}
        ]
    },
    {
        id: 'sales',
        name: '销售与计划',
        icon: TrendingUp,
        children: [
            {id: 'sales-target', name: '销售目标', path: '/sales/target'},
            {id: 'sales-analysis', name: '销售达成分析', path: '/sales/analysis'},
            {id: 'sales-data-aggregation', name: '数据聚合分析', path: '/sales/data-aggregation'},
            {id: 'sales-slow-moving', name: '滞销分析', path: '/sales/slow-moving'},
            {id: 'sales-forecast', name: '销量预测', path: '/sales/forecast'},
            {id: 'sales-plan-dashboard', name: '计划测算看板', path: '/sales/plan-dashboard'}
        ]
    },
    {
        id: 'procurement',
        name: '供应链采购管理',
        icon: ShoppingCart,
        children: [
            {id: 'supplier', name: '供应商管理', path: '/procurement/supplier'},
            {id: 'sku-iteration', name: 'SKU迭代管理', path: '/procurement/sku-iteration'},
            {id: 'purchase-plan-tracking', name: '采购计划执行跟进', path: '/procurement/plan-tracking'},
            {id: 'supplier-performance', name: '供应商绩效', path: '/procurement/supplier-performance'}
        ]
    },
    {
        id: 'logistics',
        name: '物流与报关',
        icon: Truck,
        children: [
            {id: 'logistics-plan', name: '物流计划执行', path: '/logistics/plan'},
            {id: 'logistics-stock-calc', name: '备货试算', path: '/logistics/stock-calc'},
            {id: 'logistics-cross-border', name: '物流单-跨境', path: '/logistics/cross-border'},
            {id: 'logistics-domestic', name: '物流单-国内', path: '/logistics/domestic'},
            {id: 'logistics-customs-export', name: '报关管理', path: '/logistics/customs-export'},
            {id: 'logistics-customs-import', name: '清关管理', path: '/logistics/customs-import'},
            {id: 'logistics-shelf-claim', name: '上架索赔', path: '/logistics/shelf-claim'},
            {id: 'logistics-reconciliation', name: '物流对账', path: '/logistics/reconciliation'},
            {id: 'logistics-provider-info', name: '物流商基础信息', path: '/logistics/provider-info'}
        ]
    },
    {
        id: 'quality',
        name: '质量管理',
        icon: TestTube,
        children: [
            {id: 'quality-inbound', name: '入库质检', path: '/quality/inbound'},
            {id: 'quality-complaint', name: '客诉质量', path: '/quality/complaint'},
            {id: 'quality-analysis', name: '质量分析', path: '/quality/analysis'}
        ]
    },
    {
        id: 'finance-gov',
        name: '财务治理',
        icon: DollarSign,
        children: [
            {id: 'finance-mapping', name: '店铺与部门归属映射', path: '/finance-gov/mapping'},
            {id: 'cost-center', name: '成本中心', path: '/finance-gov/cost-center'},
            {id: 'allocation-rule', name: '分摊规则', path: '/finance-gov/allocation-rule'},
            {id: 'expense-category', name: '费用类别', path: '/finance-gov/expense-category'},
            {id: 'expense-fact', name: '费用事实', path: '/finance-gov/expense-fact'},
            {id: 'budget-version', name: '预算版本管理', path: '/finance-gov/budget-version'}
        ]
    },
    {
        id: 'finance-analysis',
        name: '财务与经营分析',
        icon: PieChart,
        badge: '只读',
        children: [
            {id: 'finance-revenue', name: '收入分析', path: '/finance-analysis/revenue'},
            {id: 'finance-cost', name: '成本分析', path: '/finance-analysis/cost'},
            {id: 'finance-profit', name: '利润分析', path: '/finance-analysis/profit'},
            {id: 'finance-achievement', name: '经营达成情况', path: '/finance-analysis/achievement'}
        ]
    },
    {
        id: 'organization',
        name: '组织与权限',
        icon: Users,
        children: [
            {id: 'org-structure', name: '组织架构管理', path: '/organization/structure'},
            {id: 'org-user', name: '用户管理', path: '/organization/user'},
            {id: 'org-role', name: '角色&权限', path: '/organization/role'}
        ]
    },
    {id: 'approval', name: '审批与任务', icon: CheckSquare, path: '/approval'},
    {
        id: 'settings',
        name: '系统设置',
        icon: Settings,
        badge: 'IT专用',
        children: [
            {id: 'settings-basic', name: '基础配置', path: '/settings/basic'},
            {id: 'settings-dict', name: '数据字典', path: '/settings/dict'},
            {id: 'settings-enum', name: '枚举与规则', path: '/settings/enum'},
            {id: 'settings-sync', name: '接口同步', path: '/settings/sync'},
            {id: 'settings-params', name: '参数设置', path: '/settings/params'},
            {id: 'settings-scheduler', name: '定时任务', path: '/settings/scheduler'},
            {id: 'settings-log', name: '系统日志', path: '/settings/log'}
        ]
    }
];

const NavItem = ({item, level = 0, isActive, onNavigate, expandedItems, toggleExpand}) => {
    const Icon = item.icon;
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems.includes(item.id);

    const handleClick = () => {
        if (hasChildren) {
            toggleExpand(item.id);
        } else {
            onNavigate(item.path, item.name);
        }
    };

    return (
        <div>
            <div
                className={`flex items-center justify-between px-4 py-2.5 cursor-pointer transition-colors ${
                    isActive === item.path ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600' : 'text-gray-700 hover:bg-gray-50'
                } ${level > 0 ? 'pl-12' : ''}`}
                onClick={handleClick}
            >
                <div className="flex items-center gap-3 flex-1">
                    {Icon && <Icon className="w-5 h-5" />}
                    <span className="text-sm font-medium">{item.name}</span>
                    {item.badge && (
                        <span className="text-xs px-2 py-0.5 bg-orange-100 text-orange-600 rounded">{item.badge}</span>
                    )}
                </div>
                {hasChildren && (isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />)}
            </div>

            {hasChildren && isExpanded && (
                <div className="bg-gray-50">
                    {item.children.map(child => (
                        <div
                            key={child.id}
                            className={`flex items-center px-4 py-2 pl-14 cursor-pointer transition-colors ${
                                isActive === child.path ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600' : 'text-gray-600 hover:bg-gray-100'
                            }`}
                            onClick={() => onNavigate(child.path, child.name)}
                        >
                            <span className="text-sm">{child.name}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

function App() {
    const [currentPath, setCurrentPath] = useState('/home');
    const [currentPageName, setCurrentPageName] = useState('首页');
    const [expandedItems, setExpandedItems] = useState(['product']);
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [currentRecord, setCurrentRecord] = useState(null); // 传给详情页

    const openSkuDetail = (row) => {
        setCurrentRecord(row || null);
        handleNavigate('/product/sku-detail', 'SKU 详情');
    };

    const handleNavigate = (path, name) => {
        setCurrentPath(path);
        setCurrentPageName(name);
    };

    const toggleExpand = (itemId) => {
        setExpandedItems(prev =>
            prev.includes(itemId) ? prev.filter(id => id !== itemId) : [...prev, itemId]
        );
    };

    const renderPage = () => {
        switch (currentPath) {
            case '/home':
                return <HomePage />;
            case '/product/master':
                return <ProductMasterPage onOpenSkuDetail={openSkuDetail} />;
            case '/product/sku-detail':
                return (
                    <div className="flex-1 min-h-0 overflow-auto">
                        <SkuDetailPage record={currentRecord} />
                    </div>
                );
            case '/product/bom':
                return <BOMManagementPage />;
            case '/product/brand':
                return <BrandManagementPage />;
            case '/product/structure':
                return <ProductStructurePage />;
            case '/product/template':
                return <CategoryTemplatePage />;
            case '/product/tag':
                return <ProductTagPage />;
            case '/product/coding-rule':
                return <CodingRulePage />;
            case '/product/attribute':
                return <ProductAttributePage />;
            case '/finance-gov/mapping':
                return <StoreDeptMappingPage />;
            case '/finance-gov/cost-center':
                return <CostCenterPage />;
            case '/finance-gov/allocation-rule':
                return <AllocationRulePage />;
            case '/finance-gov/expense-fact':
                return <ExpenseFactPage />;
            case '/finance/approval/list':
                return (
                    <ExpenseApprovalListPageSimple
                        onOpenDetail={(rec) => {
                            setCurrentRecord(rec);
                            handleNavigate('/finance/approval/detail', '审批单详情');
                        }}
                    />
                );
            case '/finance/approval/detail':
                return (
                    <ExpenseApprovalDetailPageSimple
                        record={currentRecord}
                        onBack={() => handleNavigate('/finance/approval/list', '费用审批列表')}
                    />
                );
            case '/finance-gov/expense-category':
                return <ExpenseCategoryPage />;
            case '/finance-gov/budget-version':
                return <BudgetVersionPage />;
            case '/organization/structure':
                return <OrganizationManagementPage />;
            case '/sales/target':
                return <SalesTargetPage />;
            default:
                return <PlaceholderPage pageName={currentPageName} path={currentPath} />;
        }
    };

    return (
        <div className="flex h-screen bg-gray-100">
            {/* 左侧导航 */}
            <aside className={`${sidebarOpen ? 'w-64' : 'w-0'} bg-white border-r border-gray-200 flex flex-col transition-all duration-300 overflow-hidden`}>
                <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-sm">跨</span>
                        </div>
                        <div>
                            <h1 className="text-sm font-bold text-gray-800">跨境电商系统</h1>
                            <p className="text-xs text-gray-500">Enterprise Platform</p>
                        </div>
                    </div>
                </div>

                <nav className="flex-1 overflow-y-auto py-4">
                    {navigationConfig.map(item => (
                        <NavItem
                            key={item.id}
                            item={item}
                            isActive={currentPath}
                            onNavigate={handleNavigate}
                            expandedItems={expandedItems}
                            toggleExpand={toggleExpand}
                        />
                    ))}
                </nav>

                <div className="p-4 border-t border-gray-200">
                    <div className="text-xs text-gray-500">
                        <p>当前用户: 张三</p>
                        <p>角色: 系统管理员</p>
                    </div>
                </div>
            </aside>

            {/* 主内容区 */}
            <div className="flex-1 flex flex-col min-h-0">
                <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
                    <div className="flex items-center gap-4">
                        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 hover:bg-gray-100 rounded-lg">
                            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </button>
                        <div>
                            <h2 className="text-lg font-semibold text-gray-800">{currentPageName}</h2>
                            <p className="text-xs text-gray-500">{currentPath}</p>
                        </div>
                    </div>
                    <div className="text-sm text-gray-600">
                        {new Date().toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </div>
                </header>

                <main className="flex-1 min-h-0 overflow-auto p-6">
                    {renderPage()}
                </main>
            </div>
        </div>
    );
}

export default App;
