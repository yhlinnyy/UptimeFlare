import { MaintenanceConfig, PageConfig, WorkerConfig } from './types/config'

const pageConfig: PageConfig = {
  // 状态页的标题
  title: "lyc8503's Status Page",
  // 显示在状态页标题的链接，可以设置 `highlight` 为 `true`
  links: [
    { link: 'https://github.com/lyc8503', label: 'GitHub' },
    { link: 'https://blog.lyc8503.net/', label: 'Blog' },
    { link: 'mailto:me@lyc8503.net', label: 'Email Me', highlight: true },
  ],
  // [可选] 为你的监视器分组
  // 如果不指定，所有的监视器都会在一个列表里显示
  // 如果指定了，监视器会分组并排序，未列出的监视器将被隐藏（但仍然会被监视）
  group: {
    '🌐 Public (example group name)': ['foo_monitor', 'bar_monitor', 'more monitor ids...', 'api-aioec-tech'],
    '🔐 Private': ['test_tcp_monitor'],
  },
  // [可选] 设置你的 favicon 路径，如未指定默认为 '/favicon.ico'
  favicon: '/favicon.ico',
  // [可选] 维护相关的设置
  maintenances: {
    // [可选] 即将进行的维护警报的颜色，默认为 'gray'
    // 生效的警报将始终使用 MaintenanceConfig 中指定的颜色
    upcomingColor: 'gray',
  },
}

const workerConfig: WorkerConfig = {
  // 除非状态发生变化，否则最多每3分钟写入一次KV
  kvWriteCooldownMinutes: 3,
  // 通过取消下面的注释行为来为状态页和API启用HTTP Basic Auth，格式为 `<USERNAME>:<PASSWORD>`
  // passwordProtection: 'username:password',
  // 在这里定义你所有的监视器
  monitors: [
    // HTTP 监视器示例
    {
      // `id` 应该是唯一的，如果 `id` 保持不变，历史记录将被保留
      id: 'foo_monitor',
      // `name` 用于状态页和回调消息
      name: 'My API Monitor',
      // `method` 应该是一个有效的 HTTP 方法
      method: 'POST',
      // `target` 是一个有效的 URL
      target: 'https://example.com',
      // [可选] `tooltip` 仅用于在状态页上显示工具提示
      tooltip: 'This is a tooltip for this monitor',
      // [可选] `statusPageLink` 仅用于状态页上的可点击链接
      statusPageLink: 'https://example.com',
      // [可选] 如果设置为 true，`hideLatencyChart` 将隐藏状态页的延迟图表
      hideLatencyChart: false,
      // [可选] `expectedCodes` 是可接受的 HTTP 响应代码数组，如果未指定，则默认为 2xx
      expectedCodes: [200],
      // [可选] `timeout` 单位为毫秒，如果未指定，则默认为 10000
      timeout: 10000,
      // [可选] 要发送的请求头
      headers: {
        'User-Agent': 'Uptimeflare',
        Authorization: 'Bearer YOUR_TOKEN_HERE',
      },
      // [可选] 要发送的请求体
      body: 'Hello, world!',
      // [可选] 如果指定，响应必须包含关键字才被认为是正常的
      responseKeyword: 'success',
      // [可选] 如果指定，响应必须不包含关键字才被认为是正常的
      responseForbiddenKeyword: 'bad gateway',
      // [可选] 如果指定，将调用检查代理来检查监视器，主要用于地理特定的检查
      // 在设置此值之前，请参阅文档 https://github.com/lyc8503/UptimeFlare/wiki/Check-proxy-setup
      // 目前支持 `worker://` 和 `http(s)://` 代理
      checkProxy: 'https://xxx.example.com OR worker://weur',
      // [可选] 如果为 true，当指定的代理关闭时，检查将回退到本地
      checkProxyFallback: true,
    },
    // TCP 监视器示例
    {
      id: 'test_tcp_monitor',
      name: 'Example TCP Monitor',
      // 对于 tcp 监视器, `method` 应该是 `TCP_PING`
      method: 'TCP_PING',
      // 对于 tcp 监视器, `target` 应该是 `host:port`
      target: '1.2.3.4:22',
      tooltip: 'My production server SSH',
      statusPageLink: 'https://example.com',
      timeout: 5000,
    },
    {
      id: 'api-aioec-tech',
      name: 'API aioec.tech',
      method: 'GET',
      target: 'https://api.aioec.tech',
      tooltip: '监控 aioec.tech API',
      statusPageLink: 'https://api.aioec.tech',
    },
  ],
  notification: {
    // [可选] apprise API 服务器 URL
    // 如果未指定，将不会发送任何通知
    appriseApiServer: 'https://apprise.example.com/notify',
    // [可选] apprise 的接收者 URL，请参阅 https://github.com/caronc/apprise
    // 如果未指定，将不会发送任何通知
    recipientUrl: 'tgram://bottoken/ChatID',
    // [可选] 通知消息中使用的时区，默认为 "Etc/GMT"
    timeZone: 'Asia/Shanghai',
    // [可选] 发送通知前的宽限期（分钟）
    // 只有在初始故障后，监视器连续 N 次检查都失败时，才会发送通知
    // 如果未指定，通知将立即发送
    gracePeriod: 5,
    // [可选] 禁用指定 id 的监视器的通知
    skipNotificationIds: ['foo_monitor', 'bar_monitor'],
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
      // 当任何监视器的状态发生变化时，将调用此回调
      // 在这里编写任何 TypeScript 代码
      // 这不会遵循宽限期设置，并将在状态更改时立即调用
      // 如果要实现宽限期，则需要手动处理
    },
    onIncident: async (
      env: any,
      monitor: any,
      timeIncidentStart: number,
      timeNow: number,
      reason: string
    ) => {
      // 如果任何监视器发生持续性故障，此回调将每1分钟调用一次
      // 在这里编写任何 TypeScript 代码
    },
  },
}

// 你可以在这里定义多个维护计划
// 在维护期间，状态页上会显示一个警报
// 同样，相关的停机通知将被跳过（如有）
// 当然，如果你不需要此功能，可以将其留空
// const maintenances: MaintenanceConfig[] = []
const maintenances: MaintenanceConfig[] = [
  {
    // [可选] 受此维护影响的监视器 ID
    monitors: ['foo_monitor', 'bar_monitor'],
    // [可选] 如果未指定，则默认为“计划内维护”
    title: 'Test Maintenance',
    // 维护说明，将显示在状态页上
    body: 'This is a test maintenance, server software upgrade',
    // 维护开始时间，UNIX 时间戳或 ISO 8601 格式
    start: '2025-04-27T00:00:00+08:00',
    // [可选] 维护结束时间，UNIX 时间戳或 ISO 8601 格式
    // 如果未指定，则维护将被视为正在进行中
    end: '2025-04-30T00:00:00+08:00',
    // [可选] 状态页上维护警报的颜色，默认为 "yellow"
    color: 'blue',
  },
  // 下面的示例显示了每月15日凌晨2点到4点的计划维护（UTC+8）
  // 这可能存在危险，因为生成太多的维护条目可能会导致性能问题
  // 不确定的输出也可能导致错误或意外行为
  // 如果你不知道如何调试，请谨慎使用此方法
  ...(function (){
    const schedules = [];
    const today = new Date();

    for (let i = -1; i <= 1; i++) {
      // JavaScript 的 Date 对象会自动处理年份的滚动
      const date = new Date(today.getFullYear(), today.getMonth() + i, 15);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');

      schedules.push({
        title: `${year}/${parseInt(month)} - Test scheduled maintenance`,
        monitors: ['foo_monitor'],
        body: 'Monthly scheduled maintenance',
        start: `${year}-${month}-15T02:00:00.000+08:00`,
        end: `${year}-${month}-15T04:00:00.000+08:00`,
      });
    }
    return schedules;
  })()
]

// 不要忘记这一行，否则编译会失败。
export { pageConfig, workerConfig, maintenances }
