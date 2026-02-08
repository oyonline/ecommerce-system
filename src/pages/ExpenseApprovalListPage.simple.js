// src/pages/ExpenseApprovalListPage.simple.js
import React from 'react';
// 图标可选；不想装 lucide-react 就把下面这一行和 JSX 中的图标删掉
import { Search, FileText, User, Building2, CheckCircle2, Clock, XCircle } from 'lucide-react';

/** 内置 mock 数据：父组件不传 records 时使用 */
const approvalMock = [
    {
        id: 'AP-202601-001',
        approvalNo: 'AP-202601-001',
        submitter: '张三',
        submitDept: '直营电商部',
        expenseDept: '直营电商部',
        costCenter: 'CC_EMEA_DTC',
        customerGroup: 'TikTok US',
        paymentReason: '达人投放合作费用（1月）',
        accountingDimension: null,
        budgetSubjectCode: '6602.01.001',
        amount: 12000,
        currency: 'CNY',
        paymentMethod: '银行转账',
        paymentEntity: '深圳波塞冬科技有限公司',
        expectedPaymentDate: '2026-01-20',
        receiverName: '上海XX文化传媒有限公司',
        receiverAccount: '6222 8888 1234 5678',
        receiverBank: '招商银行上海分行',
        status: 'pending_accounting',
        hasAttachment: true,
        submitDate: '2026-01-12 10:23',
        budgetVersion: 'FY2026.V1',
        budgetUsageRate: 62,
        budgetTotal: 1000000,
        budgetUsed: 620000,
        kingdeePayableNo: '',
        approvalFlow: [
            { id: 'f1', timestamp: '2026-01-12 10:24', nodeName: '提交', approver: '张三', result: 'approved', remark: '已提交' },
            { id: 'f2', timestamp: '', nodeName: '会计审核', approver: 'Lyn', result: 'pending' },
            { id: 'f3', timestamp: '', nodeName: '总监审核', approver: '杨萌', result: 'pending' },
        ],
    },
    {
        id: 'AP-202601-002',
        approvalNo: 'AP-202601-002',
        submitter: '李四',
        submitDept: '平台电商部',
        expenseDept: '平台电商部',
        costCenter: 'CC_APAC_PLATFORM',
        customerGroup: 'Amazon',
        paymentReason: '亚马逊广告投放费用（Q1）',
        accountingDimension: null,
        budgetSubjectCode: '6602.02.001',
        amount: 35000,
        currency: 'USD',
        paymentMethod: '银行转账',
        paymentEntity: '深圳波塞冬科技有限公司',
        expectedPaymentDate: '2026-01-25',
        receiverName: 'Amazon Advertising LLC',
        receiverAccount: '1234 5678 9012 3456',
        receiverBank: 'Bank of America',
        status: 'approved',
        hasAttachment: true,
        submitDate: '2026-01-10 14:15',
        budgetVersion: 'FY2026.V1',
        budgetUsageRate: 45,
        budgetTotal: 500000,
        budgetUsed: 225000,
        kingdeePayableNo: 'KD202601001',
        approvalFlow: [
            { id: 'f1', timestamp: '2026-01-10 14:16', nodeName: '提交', approver: '李四', result: 'approved', remark: '已提交' },
            { id: 'f2', timestamp: '2026-01-11 09:30', nodeName: '会计审核', approver: 'Lyn', result: 'approved', remark: '审核通过' },
            { id: 'f3', timestamp: '2026-01-11 15:20', nodeName: '总监审核', approver: '杨萌', result: 'approved', remark: '同意' },
        ],
    },
    {
        id: 'AP-202601-003',
        approvalNo: 'AP-202601-003',
        submitter: '王五',
        submitDept: '供应链管理部',
        expenseDept: '供应链管理部',
        costCenter: 'CC_SUPPLY_CHAIN',
        customerGroup: '内部',
        paymentReason: '供应商货款结算（12月）',
        accountingDimension: null,
        budgetSubjectCode: '2201.01.001',
        amount: 85000,
        currency: 'CNY',
        paymentMethod: '银行转账',
        paymentEntity: '深圳波塞冬科技有限公司',
        expectedPaymentDate: '2026-01-18',
        receiverName: '东莞XX制造有限公司',
        receiverAccount: '8888 6666 1234 5678',
        receiverBank: '中国工商银行东莞分行',
        status: 'pending_accounting',
        hasAttachment: false,
        submitDate: '2026-01-13 11:45',
        budgetVersion: 'FY2026.V1',
        budgetUsageRate: 78,
        budgetTotal: 2000000,
        budgetUsed: 1560000,
        kingdeePayableNo: '',
        approvalFlow: [
            { id: 'f1', timestamp: '2026-01-13 11:46', nodeName: '提交', approver: '王五', result: 'approved', remark: '已提交' },
            { id: 'f2', timestamp: '', nodeName: '会计审核', approver: 'Lyn', result: 'pending' },
            { id: 'f3', timestamp: '', nodeName: '财务总监审核', approver: '陈总', result: 'pending' },
        ],
    },
    {
        id: 'AP-202601-004',
        approvalNo: 'AP-202601-004',
        submitter: '赵六',
        submitDept: '市场部',
        expenseDept: '市场部',
        costCenter: 'CC_MARKETING',
        customerGroup: '内部',
        paymentReason: '品牌推广活动费用',
        accountingDimension: null,
        budgetSubjectCode: '6601.03.002',
        amount: 25000,
        currency: 'CNY',
        paymentMethod: '银行转账',
        paymentEntity: '深圳波塞冬科技有限公司',
        expectedPaymentDate: '2026-01-22',
        receiverName: '北京XX广告有限公司',
        receiverAccount: '9999 7777 1234 5678',
        receiverBank: '中国建设银行北京分行',
        status: 'rejected',
        hasAttachment: true,
        submitDate: '2026-01-08 09:20',
        budgetVersion: 'FY2026.V1',
        budgetUsageRate: 35,
        budgetTotal: 300000,
        budgetUsed: 105000,
        kingdeePayableNo: '',
        approvalFlow: [
            { id: 'f1', timestamp: '2026-01-08 09:21', nodeName: '提交', approver: '赵六', result: 'approved', remark: '已提交' },
            { id: 'f2', timestamp: '2026-01-09 10:15', nodeName: '会计审核', approver: 'Lyn', result: 'rejected', remark: '预算不足，请重新申请' },
        ],
    },
    {
        id: 'AP-202601-005',
        approvalNo: 'AP-202601-005',
        submitter: '孙七',
        submitDept: '物流部',
        expenseDept: '物流部',
        costCenter: 'CC_LOGISTICS',
        customerGroup: '内部',
        paymentReason: '物流服务费用（1月）',
        accountingDimension: null,
        budgetSubjectCode: '6602.05.001',
        amount: 18000,
        currency: 'CNY',
        paymentMethod: '银行转账',
        paymentEntity: '深圳波塞冬科技有限公司',
        expectedPaymentDate: '2026-01-19',
        receiverName: '深圳XX物流有限公司',
        receiverAccount: '7777 5555 1234 5678',
        receiverBank: '中国银行深圳分行',
        status: 'pending_accounting',
        hasAttachment: true,
        submitDate: '2026-01-14 16:30',
        budgetVersion: 'FY2026.V1',
        budgetUsageRate: 55,
        budgetTotal: 800000,
        budgetUsed: 440000,
        kingdeePayableNo: '',
        approvalFlow: [
            { id: 'f1', timestamp: '2026-01-14 16:31', nodeName: '提交', approver: '孙七', result: 'approved', remark: '已提交' },
            { id: 'f2', timestamp: '2026-01-15 08:45', nodeName: '会计审核', approver: 'Lyn', result: 'approved', remark: '审核通过' },
            { id: 'f3', timestamp: '', nodeName: '部门总监审核', approver: '刘总', result: 'pending' },
        ],
    },
    {
        id: 'AP-202601-006',
        approvalNo: 'AP-202601-006',
        submitter: '周八',
        submitDept: '研发部',
        expenseDept: '研发部',
        costCenter: 'CC_RD',
        customerGroup: '内部',
        paymentReason: '软件授权费用（年度）',
        accountingDimension: null,
        budgetSubjectCode: '6602.06.001',
        amount: 50000,
        currency: 'CNY',
        paymentMethod: '银行转账',
        paymentEntity: '深圳波塞冬科技有限公司',
        expectedPaymentDate: '2026-01-28',
        receiverName: '上海XX软件技术有限公司',
        receiverAccount: '6666 4444 1234 5678',
        receiverBank: '交通银行上海分行',
        status: 'approved',
        hasAttachment: true,
        submitDate: '2026-01-11 13:20',
        budgetVersion: 'FY2026.V1',
        budgetUsageRate: 40,
        budgetTotal: 600000,
        budgetUsed: 240000,
        kingdeePayableNo: 'KD202601002',
        approvalFlow: [
            { id: 'f1', timestamp: '2026-01-11 13:21', nodeName: '提交', approver: '周八', result: 'approved', remark: '已提交' },
            { id: 'f2', timestamp: '2026-01-12 10:00', nodeName: '会计审核', approver: 'Lyn', result: 'approved', remark: '审核通过' },
            { id: 'f3', timestamp: '2026-01-12 16:30', nodeName: '技术总监审核', approver: '张总', result: 'approved', remark: '同意支付' },
        ],
    },
];

function StatusPill({ status }) {
    const base = 'inline-flex items-center px-2 py-0.5 text-xs rounded border ';
    if (status === 'pending_accounting') return <span className={base + 'bg-yellow-50 text-yellow-700 border-yellow-200'}>待会计</span>;
    if (status === 'pending_director') return <span className={base + 'bg-orange-50 text-orange-700 border-orange-200'}>待总监</span>;
    if (status === 'pending_kingdee') return <span className={base + 'bg-blue-50 text-blue-700 border-blue-200'}>待推送</span>;
    if (status === 'completed') return <span className={base + 'bg-green-50 text-green-700 border-green-200'}>已完成</span>;
    return <span className={base + 'bg-red-50 text-red-700 border-red-200'}>已驳回</span>;
}

function StatusIcon({ status }) {
    if (status === 'completed') return <CheckCircle2 className="w-4 h-4 text-green-600" />;
    if (status?.startsWith('pending')) return <Clock className="w-4 h-4 text-gray-400" />;
    return <XCircle className="w-4 h-4 text-red-600" />;
}

export default function ExpenseApprovalListPageSimple({ records = [], onOpenDetail, onSearch }) {
    const [q, setQ] = React.useState('');

    // 如未传入 records，则使用内置 mock
    const source = (records && records.length > 0) ? records : approvalMock;

    const filtered = React.useMemo(() => {
        const k = q.trim().toLowerCase();
        if (!k) return source;
        return source.filter(r =>
            (r.approvalNo || '').toLowerCase().includes(k) ||
            (r.submitter || '').toLowerCase().includes(k) ||
            (r.submitDept || '').toLowerCase().includes(k)
        );
    }, [q, source]);

    return (
        <div className="flex-1 flex flex-col overflow-hidden">
            {/* 顶部 */}
            <div className="bg-white border-b border-gray-200 px-8 py-6">
                <h1 className="text-gray-900">费用审批列表</h1>
                <p className="text-gray-600 mt-1 text-sm">点击任意一行进入详情</p>
            </div>

            {/* 工具栏 */}
            <div className="bg-white border-b border-gray-200 px-8 py-4">
                <div className="flex items-center gap-3 flex-wrap">
                    <div className="relative w-full max-w-md min-w-[200px]">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            className="w-full h-9 pl-9 pr-3 rounded border border-gray-300 text-sm outline-none focus:ring-2 focus:ring-blue-200"
                            placeholder="搜索：审批单号 / 提交人 / 提交部门"
                            value={q}
                            onChange={(e) => setQ(e.target.value)}
                        />
                    </div>
                    {/* 可在此新增导出、筛选等按钮 */}
                </div>
            </div>

            {/* 列表 */}
            <div className="flex-1 overflow-auto p-6">
                <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-auto">
                    <table className="w-full text-sm min-w-[900px]">
                        <thead className="bg-gray-50 text-gray-600">
                        <tr>
                            <th className="text-left font-medium px-4 py-2 whitespace-nowrap">审批单号</th>
                            <th className="text-left font-medium px-4 py-2 whitespace-nowrap">提交人</th>
                            <th className="text-left font-medium px-4 py-2 whitespace-nowrap">提交部门</th>
                            <th className="text-left font-medium px-4 py-2 whitespace-nowrap">申请金额</th>
                            <th className="text-left font-medium px-4 py-2 whitespace-nowrap">币种</th>
                            <th className="text-left font-medium px-4 py-2 whitespace-nowrap">状态</th>
                            <th className="text-left font-medium px-4 py-2 whitespace-nowrap">提交时间</th>
                        </tr>
                        </thead>
                        <tbody>
                        {filtered.map((r, idx) => (
                            <tr
                                key={r.id || r.approvalNo || idx}
                                className={(idx % 2 === 0 ? 'bg-white' : 'bg-gray-50') + ' hover:bg-blue-50 cursor-pointer'}
                                onClick={() => onOpenDetail && onOpenDetail(r)}
                            >
                                <td className="px-4 py-2">
                                    <div className="flex items-center gap-2 text-blue-600">
                                        <FileText className="w-4 h-4" />
                                        {r.approvalNo}
                                    </div>
                                </td>
                                <td className="px-4 py-2">
                                    <div className="flex items-center gap-2">
                                        <User className="w-4 h-4 text-gray-400" />
                                        {r.submitter}
                                    </div>
                                </td>
                                <td className="px-4 py-2">
                                    <div className="flex items-center gap-2">
                                        <Building2 className="w-4 h-4 text-gray-400" />
                                        {r.submitDept}
                                    </div>
                                </td>
                                <td className="px-4 py-2">{Number(r.amount || 0).toLocaleString()}</td>
                                <td className="px-4 py-2">{r.currency || 'CNY'}</td>
                                <td className="px-4 py-2">
                                    <div className="flex items-center gap-2">
                                        <StatusIcon status={r.status} />
                                        <StatusPill status={r.status} />
                                    </div>
                                </td>
                                <td className="px-4 py-2">{r.submitDate}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>

                    {filtered.length === 0 && (
                        <div className="text-center py-12 text-gray-500">没有匹配的记录</div>
                    )}
                </div>
            </div>
        </div>
    );
}
