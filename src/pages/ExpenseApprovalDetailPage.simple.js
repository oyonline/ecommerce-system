import React from 'react';
// 如果不想装 lucide-react，可以删掉下一行 import，并把下面 JSX 里的图标标签一并删掉
import {
    ArrowLeft,
    FileText,
    User,
    Building2,
    DollarSign,
    Paperclip,
    TrendingUp,
    Download,
    CheckCircle2,
    Clock,
    XCircle,
    AlertCircle,
    Calendar as CalendarIcon,
    ArrowRight,
    ArrowDown,
    Calculator,
    Target,
} from 'lucide-react';

/** ================= 工具函数与常量（内联，无外部依赖） ================= */

// 维度类型的简化枚举（按你之前的口径）
const DIM_TYPES = {
    DEPT_CUSTGROUP_CUST_EXPENSE: 'dept-custgroup-cust-expense',
    DEPT_PROJECT: 'dept-project',
    CUSTGROUP_EXPENSE: 'custgroup-expense',
    DEPT: 'dept',
};

// 若没有传 accountingDimension，可按科目前缀兜底推断（可按需微调）
function getDimensionTypeBySubjectCode(subjectCode = '') {
    if (!subjectCode) return null;
    // 举例映射：2241 -> 部门；6602.* -> 部门+客户分组+客户+费用编码；5301.* -> 部门+项目
    if (subjectCode.startsWith('2241')) return DIM_TYPES.DEPT;
    if (subjectCode.startsWith('6602')) return DIM_TYPES.DEPT_CUSTGROUP_CUST_EXPENSE;
    if (subjectCode.startsWith('5301')) return DIM_TYPES.DEPT_PROJECT;
    if (subjectCode.startsWith('6601')) return DIM_TYPES.CUSTGROUP_EXPENSE;
    return DIM_TYPES.DEPT; // 默认给个“部门”
}

// 维度徽章
function getDimensionBadges(dimensionType) {
    switch (dimensionType) {
        case DIM_TYPES.DEPT_CUSTGROUP_CUST_EXPENSE:
            return [
                { label: '部门', classes: 'bg-blue-50 text-blue-700 border border-blue-200' },
                { label: '客户分组', classes: 'bg-purple-50 text-purple-700 border border-purple-200' },
                { label: '客户', classes: 'bg-green-50 text-green-700 border border-green-200' },
                { label: '费用编码', classes: 'bg-orange-50 text-orange-700 border border-orange-200' },
            ];
        case DIM_TYPES.DEPT_PROJECT:
            return [
                { label: '部门', classes: 'bg-blue-50 text-blue-700 border border-blue-200' },
                { label: '项目', classes: 'bg-purple-50 text-purple-700 border border-purple-200' },
            ];
        case DIM_TYPES.CUSTGROUP_EXPENSE:
            return [
                { label: '客户分组', classes: 'bg-purple-50 text-purple-700 border border-purple-200' },
                { label: '费用编码', classes: 'bg-orange-50 text-orange-700 border border-orange-200' },
            ];
        case DIM_TYPES.DEPT:
        default:
            return [{ label: '部门', classes: 'bg-blue-50 text-blue-700 border border-blue-200' }];
    }
}

function formatCurrency(amount = 0, currency = 'CNY') {
    const symbol = currency === 'CNY' ? '¥' : currency === 'USD' ? '$' : currency === 'EUR' ? '€' : '';
    const num = Number.isFinite(amount) ? amount : 0;
    return `${symbol}${num.toLocaleString()}`;
}

function StatusBadge({ status }) {
    const base = 'inline-flex items-center px-2 py-0.5 text-xs rounded border';
    if (status === 'pending_accounting') {
        return <span className={`${base} bg-yellow-50 text-yellow-700 border-yellow-200`}>🟡 待会计审核</span>;
    }
    if (status === 'pending_director') {
        return <span className={`${base} bg-orange-50 text-orange-700 border-orange-200`}>🟠 待总监审核</span>;
    }
    if (status === 'pending_kingdee') {
        return <span className={`${base} bg-blue-50 text-blue-700 border-blue-200`}>🔵 待推送金蝶</span>;
    }
    if (status === 'completed') {
        return <span className={`${base} bg-green-50 text-green-700 border-green-200`}>✅ 已完成</span>;
    }
    return <span className={`${base} bg-red-50 text-red-700 border-red-200`}>🔴 驳回</span>;
}

function StepIcon({ result }) {
    if (result === 'approved') return <CheckCircle2 className="w-5 h-5 text-green-600" />;
    if (result === 'pending') return <Clock className="w-5 h-5 text-gray-400" />;
    if (result === 'rejected') return <XCircle className="w-5 h-5 text-red-600" />;
    return <AlertCircle className="w-5 h-5 text-blue-600" />;
}

/** ================= 主页面（纯 JSX + tailwind） ================= */

export default function ExpenseApprovalDetailPageSimple({ record, onBack }) {
    // 容错：避免 record 为空时报错
    const r = record || {
        approvalNo: '-',
        submitter: '-',
        submitDept: '-',
        expenseDept: '-',
        costCenter: '-',
        customerGroup: '-',
        paymentReason: '-',
        accountingDimension: null,
        budgetSubjectCode: '',
        amount: 0,
        currency: 'CNY',
        paymentMethod: '-',
        paymentEntity: '-',
        expectedPaymentDate: '-',
        receiverName: '-',
        receiverAccount: '-',
        receiverBank: '-',
        status: 'pending_accounting',
        hasAttachment: false,
        submitDate: '-',
        budgetVersion: '-',
        budgetUsageRate: 0,
        budgetTotal: 0,
        budgetUsed: 0,
        kingdeePayableNo: '',
        approvalFlow: [],
    };

    // 维度类型：优先用传入的 accountingDimension，否则按科目推断
    const dimensionType = r.accountingDimension || getDimensionTypeBySubjectCode(r.budgetSubjectCode);
    const badges = getDimensionBadges(dimensionType);

    const progress = Math.max(0, Math.min(100, Number(r.budgetUsageRate) || 0));
    const balance = (Number(r.budgetTotal) || 0) - (Number(r.budgetUsed) || 0);
    const expectedRemain = balance - (Number(r.amount) || 0);

    return (
        <div className="flex-1 flex flex-col min-h-0">            {/* 标题栏 */}
            <div className="bg-white border-b border-gray-200 px-8 py-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={onBack}
                            className="h-9 px-3 rounded border border-gray-300 text-gray-700 hover:bg-gray-50 inline-flex items-center"
                        >
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            返回列表
                        </button>
                        <div>
                            <h1 className="text-gray-900 text-lg font-semibold">审批单详情</h1>
                            <p className="text-gray-600 mt-1 text-sm">审批单号：{r.approvalNo}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <StatusBadge status={r.status} />
                        <button className="h-9 px-3 rounded border border-gray-300 text-gray-700 hover:bg-gray-50 inline-flex items-center">
                            <Download className="w-4 h-4 mr-2" />
                            导出PDF
                        </button>
                    </div>
                </div>
            </div>

            {/* 内容区 */}
            <div className="flex-1 overflow-auto bg-gray-50">
                <div className="p-8">
                    <div className="max-w-6xl mx-auto grid grid-cols-3 gap-6">
                        {/* 左侧 2/3 */}
                        <div className="col-span-2 space-y-6">
                            {/* 基础信息 */}
                            <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
                                <div className="p-6">
                                    <h3 className="text-lg mb-4 flex items-center gap-2">
                                        <FileText className="w-5 h-5 text-blue-500" />
                                        基础信息
                                    </h3>

                                    <div className="space-y-4">
                                        <div className="grid grid-cols-2 gap-4">
                                            <InfoItem label="审批单号" value={<span className="text-blue-600">{r.approvalNo}</span>} />
                                            <InfoItem
                                                label="提交人"
                                                value={
                                                    <div className="flex items-center gap-2">
                                                        <User className="w-4 h-4 text-gray-400" />
                                                        <span className="text-gray-900">{r.submitter}</span>
                                                    </div>
                                                }
                                            />
                                            <InfoItem
                                                label="提交部门"
                                                value={
                                                    <div className="flex items-center gap-2">
                                                        <Building2 className="w-4 h-4 text-gray-400" />
                                                        <span className="text-gray-900">{r.submitDept}</span>
                                                    </div>
                                                }
                                            />
                                            <InfoItem
                                                label="费用承担部门"
                                                value={
                                                    <div className="flex items-center gap-2">
                                                        <Building2 className="w-4 h-4 text-blue-400" />
                                                        <span className="text-gray-900">{r.expenseDept}</span>
                                                    </div>
                                                }
                                            />
                                            <InfoItem label="客户分组" value={r.customerGroup} />
                                            <InfoItem
                                                label="提交时间"
                                                value={
                                                    <div className="flex items-center gap-2">
                                                        <CalendarIcon className="w-4 h-4 text-gray-400" />
                                                        <span className="text-gray-900">{r.submitDate}</span>
                                                    </div>
                                                }
                                            />
                                        </div>

                                        <Divider />

                                        <InfoItem
                                            label="付款事由"
                                            value={<div className="text-gray-900 bg-gray-50 p-3 rounded">{r.paymentReason}</div>}
                                            full
                                        />

                                        <div className="grid grid-cols-2 gap-4">
                                            <InfoItem
                                                label="成本中心"
                                                value={
                                                    <div className="flex items-center gap-2">
                                                        <Target className="w-4 h-4 text-orange-400" />
                                                        <span className="text-gray-900">{r.costCenter || '-'}</span>
                                                    </div>
                                                }
                                            />
                                            <InfoItem
                                                label="核算维度"
                                                value={
                                                    <div className="flex flex-wrap gap-1.5 mt-1">
                                                        {badges.map((b, idx) => (
                                                            <span key={idx} className={`text-xs px-2 py-0.5 rounded ${b.classes}`}>
                                {b.label}
                              </span>
                                                        ))}
                                                    </div>
                                                }
                                            />
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <InfoItem
                                                label="会计科目"
                                                value={<code className="text-sm bg-gray-100 px-3 py-1.5 rounded border border-gray-200">{r.budgetSubjectCode}</code>}
                                            />
                                            <InfoItem label="预算版本" value={r.budgetVersion} />
                                        </div>

                                        {/* 预算情况 */}
                                        <div>
                                            <div className="text-xs text-gray-500 mb-3">预算执行情况</div>

                                            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 mb-3 border border-blue-200">
                                                <div className="grid grid-cols-2 gap-3 mb-3">
                                                    <MiniKV label="预算总额度" value={formatCurrency(r.budgetTotal, r.currency)} />
                                                    <MiniKV label="已使用金额" value={formatCurrency(r.budgetUsed, r.currency)} />
                                                    <MiniKV label="当前余额" value={formatCurrency(balance, r.currency)} />
                                                    <MiniKV label="预计剩余" value={formatCurrency(expectedRemain, r.currency)} />
                                                </div>

                                                <Divider className="my-3 border-blue-200" />

                                                <div>
                                                    <div className="text-xs text-blue-700 mb-1">本次申请金额</div>
                                                    <div className="text-xl text-blue-600">{formatCurrency(r.amount, r.currency)}</div>
                                                </div>
                                            </div>

                                            <div>
                                                <div className="text-xs text-gray-500 mb-2">预算执行率</div>
                                                <div className="flex items-center gap-3">
                                                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                                                        <div
                                                            className="h-full bg-blue-600 rounded-full transition-all"
                                                            style={{ width: `${progress}%` }}
                                                        />
                                                    </div>
                                                    <span className="text-sm text-gray-900 min-w-[60px]">{progress}%</span>
                                                </div>
                                                <div className="text-xs text-gray-500 mt-1">
                                                    {progress > 90 ? '⚠️ 预算使用率较高' : '✅ 预算充足'}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* 收款信息 */}
                            <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
                                <div className="p-6">
                                    <h3 className="text-lg mb-4 flex items-center gap-2">
                                        <DollarSign className="w-5 h-5 text-green-500" />
                                        收款方信息
                                    </h3>

                                    <div className="space-y-4">
                                        <div className="grid grid-cols-2 gap-4">
                                            <InfoItem
                                                label="预计付款日期"
                                                full
                                                value={
                                                    <div className="flex items-center gap-2">
                                                        <CalendarIcon className="w-4 h-4 text-gray-400" />
                                                        <span className="text-gray-900">{r.expectedPaymentDate}</span>
                                                    </div>
                                                }
                                            />
                                        </div>

                                        <Divider />

                                        <InfoItem label="收款账户名" value={r.receiverName} />
                                        <InfoItem label="收款银行" value={r.receiverBank} />
                                        <InfoItem
                                            label="收款账号"
                                            value={<div className="font-mono bg-gray-50 px-3 py-2 rounded border border-gray-200">{r.receiverAccount}</div>}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* 附件 */}
                            <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
                                <div className="p-6">
                                    <h3 className="text-lg mb-4 flex items-center gap-2">
                                        <Paperclip className="w-5 h-5 text-gray-500" />
                                        附件
                                    </h3>

                                    {r.hasAttachment ? (
                                        <div className="space-y-2">
                                            {/* 这里放三个示例条目；实际可替换为 r.attachments.map(...) */}
                                            {[
                                                { name: '合同文件.pdf', size: '2.3 MB', color: 'red' },
                                                { name: '发票影像.jpg', size: '1.8 MB', color: 'green' },
                                                { name: '对账凭证.pdf', size: '956 KB', color: 'orange' },
                                            ].map((f, i) => (
                                                <div
                                                    key={i}
                                                    className="flex items-center justify-between p-3 bg-gray-50 rounded border border-gray-200 hover:bg-gray-100 transition-colors cursor-pointer"
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <div
                                                            className={`w-10 h-10 rounded flex items-center justify-center ${
                                                                f.color === 'red'
                                                                    ? 'bg-red-100'
                                                                    : f.color === 'green'
                                                                        ? 'bg-green-100'
                                                                        : 'bg-orange-100'
                                                            }`}
                                                        >
                                                            <FileText
                                                                className={`w-5 h-5 ${
                                                                    f.color === 'red'
                                                                        ? 'text-red-600'
                                                                        : f.color === 'green'
                                                                            ? 'text-green-600'
                                                                            : 'text-orange-600'
                                                                }`}
                                                            />
                                                        </div>
                                                        <div>
                                                            <div className="text-sm text-gray-900">{f.name}</div>
                                                            <div className="text-xs text-gray-500">{f.size}</div>
                                                        </div>
                                                    </div>
                                                    <button className="h-8 px-2 rounded border border-gray-300 text-gray-700 hover:bg-gray-50 inline-flex items-center">
                                                        <Download className="w-4 h-4 mr-1" />
                                                        下载
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="bg-gray-50 rounded-lg p-8 text-center">
                                            <Paperclip className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                                            <p className="text-sm text-gray-500">暂无附件</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* 右侧 1/3 审批流 */}
                        <div className="col-span-1">
                            <div className="bg-white rounded-lg border border-gray-200 shadow-sm sticky top-6">
                                <div className="p-6">
                                    <h3 className="text-lg mb-4 flex items-center gap-2">
                                        <TrendingUp className="w-5 h-5 text-blue-500" />
                                        审批流程
                                    </h3>

                                    <div className="space-y-4">
                                        {(r.approvalFlow || []).map((step, index) => (
                                            <div key={step.id || index} className="relative">
                                                <div className="flex gap-3">
                                                    <div className="flex flex-col items-center">
                                                        <StepIcon result={step.result} />
                                                        {index < (r.approvalFlow || []).length - 1 && (
                                                            <div className="w-0.5 h-16 bg-gray-200 my-2" />
                                                        )}
                                                    </div>
                                                    <div className="flex-1 pb-4">
                                                        <div className="flex items-center justify-between mb-1">
                                                            <span className="text-sm text-gray-900">{step.nodeName}</span>
                                                            {step.result === 'approved' && <CheckCircle2 className="w-4 h-4 text-green-600" />}
                                                            {step.result === 'rejected' && <XCircle className="w-4 h-4 text-red-600" />}
                                                            {step.result === 'pending' && <Clock className="w-4 h-4 text-gray-400" />}
                                                        </div>
                                                        <div className="text-xs text-gray-600 mb-1">操作人：{step.approver}</div>
                                                        {step.timestamp && <div className="text-xs text-gray-500">{step.timestamp}</div>}
                                                        {step.remark && (
                                                            <div className="text-xs text-blue-600 bg-blue-50 rounded px-2 py-1.5 mt-2">💬 {step.remark}</div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}

                                        {(!r.approvalFlow || r.approvalFlow.length === 0) && (
                                            <div className="text-sm text-gray-500">暂无审批记录</div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* /右侧 */}
                    </div>
                </div>
            </div>
        </div>
    );
}

/** ================= 小块纯展示组件 ================= */

function InfoItem({ label, value, full = false }) {
    return (
        <div className={full ? 'col-span-2' : ''}>
            <div className="text-xs text-gray-500 mb-1">{label}</div>
            <div className="text-sm">{typeof value === 'undefined' || value === null ? '-' : value}</div>
        </div>
    );
}

function MiniKV({ label, value }) {
    return (
        <div>
            <div className="text-xs text-gray-400 mb-1">{label}</div>
            <div className="text-sm text-gray-700">{value}</div>
        </div>
    );
}

function Divider({ className = '' }) {
    return <div className={`h-px w-full bg-gray-200 ${className}`} />;
}
