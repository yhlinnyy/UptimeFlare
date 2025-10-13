import { MaintenanceConfig, PageConfig, WorkerConfig } from './types/config'

const pageConfig: PageConfig = {
  // 状态页面的标题
  title: "lyc8503's Status Page",
  // 显示在状态页面顶部的链接，可以设置 `highlight` 为 `true` 使其高亮
  links: [
    { link: 'https://github.com/lyc8503', label: 'GitHub' },
    { link: 'https://blog.lyc8503.net/', label: 'Blog' },
    { link: 'mailto:me@lyc8503.net', label: 'Email Me', highlight: true },
  ],
  // [可选] 将监控项分组显示
  group: {
    // 已将您的API添加到这个分组
    '🌐 公共服务': ['api-aioec-tech'],
    '🔐 私有服务 (示例)': ['test_tcp_monitor'],
  },
  // [可选] 设置网站图标(favicon)的路径，如果未指定，默认为 '/favicon.ico'
  favicon: '/favicon.ico',
  // [可选] 维护相关的设置
  maintenances: {
    upcomingColor: 'gray',
  },
}

const workerConfig: WorkerConfig = {
  // 除非状态发生变化，否则最多每3分钟向KV写入一次数据
  kvWriteCooldownMinutes: 3,
  // 通过取消下面的注释来为状态页和API启用HTTP基本认证，格式为 `<用户名>:<密码>`
  // passwordProtection: 'username:password',
  
  // 在这里定义你所有的监控器
  monitors: [
    // ------------------- 这是为您添加的监控项 -------------------
    {
      // `id` 必须是唯一的
      id: 'api-aioec-tech',
      // `name` 显示在状态页上的名称
      name: 'AIOEC API 状态',
      // `method` 通常用 GET 进行健康检查
      method: 'GET',
      // `target` 是您需要监控的网址
      target: 'https://api.aioec.tech/',
      // [推荐] 检查SSL证书是否有效
      checkCert: true,
      // [可选] `tooltip` 鼠标悬停时显示的提示
      tooltip: 'AIOEC 服务的主 API。',
      // [可选] `statusPageLink` 在状态页上可以点击的链接
      statusPageLink: 'https://api.aioec.tech/',
      // [可选] `timeout` 超时时间 (毫秒)，10秒
      timeout: 10000,
    },
    // -------------------------------------------------------------

    // TCP监控器示例 (您可以保留或删除)
    {
      id: 'test_tcp_monitor',
      name: '示例 TCP 监控',
      method: 'TCP_PING',
      target: '1.2.3.4:22',
      tooltip: '我的生产服务器 SSH 端口',
      statusPageLink: 'https://example.com',
      timeout: 5000,
    },
  ],
  
  notification: {
    // [重要] 如果需要通知, 请修改为您的 Apprise 服务 URL
    appriseApiServer: 'https://apprise.example.com/notify',
    // [重要] 修改为您的通知接收地址 (如 Telegram, Slack, Email等)
    recipientUrl: 'tgram://bottoken/ChatID',
    // [可选] 通知消息中使用的时区，默认为 "Etc/GMT"
    timeZone: 'Asia/Shanghai',
    // [可选] 发送通知前的宽限期（分钟），防止因网络抖动误报
    gracePeriod: 5,
    // [可选] 对指定的监控ID禁用通知
    // skipNotificationIds: ['api-aioec-tech'],
  },

  callbacks: {
    onStatusChange: async (
      env: any,
      monitor: any,
      isUp: boolean,
      timeIncidentStart: number,
      timeNow: number,
      reason: string
    ) => {
      // 当任何监控器的状态发生变化时，将调用此回调函数
      // 在此编写任何 TypeScript 代码
    },
    onIncident: async (
      env: any,
      monitor: any,
      timeIncidentStart: number,
      timeNow: number,
      reason: string
    ) => {
      // 如果任何监控器存在持续性故障，此回调函数将每分钟调用一次
      // 在此编写任何 TypeScript 代码
    },
  },
}

// 你可以在这里定义多个维护计划
const maintenances: MaintenanceConfig[] = [
  {
    // [已修改] 让维护计划指向您的API监控
    monitors: ['api-aioec-tech'],
    // [可选] 如果未指定，默认为 "Scheduled Maintenance"
    title: '计划内维护测试',
    // 维护的描述，将显示在状态页面上
    body: '这是一次测试性的维护，用于服务器软件升级。',
    // 维护开始时间，使用 UNIX 时间戳或 ISO 8601 格式
    start: '2025-04-27T00:00:00+08:00',
    // [可选] 维护结束时间，使用 UNIX 时间戳或 ISO 8601 格式
    end: '2025-04-30T00:00:00+08:00',
    // [可选] 状态页面上维护警报的颜色，默认为 "yellow"
    color: 'blue',
  },
]

// 不要忘记导出，否则编译会失败。
export { pageConfig, workerConfig, maintenances }
