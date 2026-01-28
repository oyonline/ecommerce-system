import React from 'react';

function HomePage() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h3 className="text-xl font-bold mb-4">欢迎使用跨境电商管理系统</h3>
        <p className="text-gray-600">
          这是一个企业级的跨境电商自研系统，整合了产品、供应链、预测、库存、采购、费用预算等核心能力。
        </p>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold">待办任务</h4>
            <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-sm">5</span>
          </div>
          <p className="text-gray-600 text-sm">您有5个待处理的审批任务</p>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold">风险预警</h4>
            <span className="bg-orange-100 text-orange-600 px-2 py-1 rounded text-sm">3</span>
          </div>
          <p className="text-gray-600 text-sm">3个风险项需要关注</p>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold">快捷入口</h4>
          </div>
          <p className="text-gray-600 text-sm">常用功能快速访问</p>
        </div>
      </div>
    </div>
  );
}

export default HomePage;