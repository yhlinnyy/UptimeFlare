import { MaintenanceConfig, PageConfig, WorkerConfig } from './types/config'

const pageConfig: PageConfig = {
  // 状态页的标题
  title: "lyc8503's Status Page",
  // 显示在状态页标题的链接，可以设置 `highlight` 为 `true`
  links: [
    { link: 'https://github.com/lyc8503', label: 'GitHub' },
  // [可选] 为你的监视器分组
  // 如果不指定，所有的监视器都会在一个列表里显示
  // 如果指定了，监视器会分组并排序，未列出的监视器将被隐藏（但仍然会被监视）
  group: {
    '🌐 监控': ['api-aioec-tech'],
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
    {
      id: 'api-aioec-tech',
      name: 'API aioec.tech',
      method: 'GET',
      target: 'https://api.aioec.tech',
      tooltip: '监控 aioec.tech API',
      statusPageLink: 'https://api.aioec.tech',
    },
  ],
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
const maintenances: MaintenanceConfig[] = []

// 不要忘记这一行，否则编译会失败。
export { pageConfig, workerConfig, maintenances }
