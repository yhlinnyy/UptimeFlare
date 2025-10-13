import { MaintenanceConfig, PageConfig, WorkerConfig } from './types/config'
const pageConfig: PageConfig = {
  title: "zhongruan's Status Page",
  links: [
    { link: 'https://github.com/zhongruan052', label: 'GitHub' },
    { link: 'mailto:zhongruan@zxiaoruan.cn', label: 'Email Me', highlight: true },
  ],
  group: {
    '服务器': ['www_website','vps_three','vps_four'],
    '应用': ['GYAPI','API'],
  },
}
const workerConfig: WorkerConfig = {
  kvWriteCooldownMinutes: 60,
  monitors: [
         {
      id: 'vps_four',
      name: '1+0.5-服务器美国-9.9元',
      method: 'GET',
      target: 'https://vwt.zxiaoruan.cn/',
      expectedCodes: [200],
      timeout: 10000,
      tooltip: '1+0.5-服务器美国-9.9元',
      statusPageLink: 'https://zxiaoruan.cn/',
    },
     {
      id: 'vps_three',
      name: '2+2-服务器美国-2元',
      method: 'GET',
      target: 'https://vps2.zxiaoruan.cn/',
      expectedCodes: [200],
      timeout: 10000,
      tooltip: '2+4-服务器香港-7元',
      statusPageLink: 'https://vps2.zxiaoruan.cn/',
    },    {
      id: 'GYAPI',
      name: '公益',
      method: 'GET',
      target: 'https://api.aioec.tech/',
      expectedCodes: [200],
      timeout: 10000,
      tooltip: '公益API监控',
      statusPageLink: 'https://api.aioec.tech/',
    },
    {
      id: 'API',
      name: 'ZAPI',
      method: 'GET',
      target: 'https://api.zxiaoruan.cn/',
      expectedCodes: [200],
      timeout: 10000,
      tooltip: 'ZAPI监控',
      statusPageLink: 'https://api.zxiaoruan.cn/',
    },
    {
      id: 'www_website',
      name: '4+4-服务器美国-30元',
      method: 'GET',
      target: 'https://www.zxiaoruan.cn/',
      expectedCodes: [200],
      timeout: 10000,
      tooltip: '4+4-服务器美国-30元',
      statusPageLink: 'https://www.zxiaoruan.cn/',
    },
  ],
  notification: {
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
    },
    onIncident: async (
      env: any,
      monitor: any,
      timeIncidentStart: number,
      timeNow: number,
      reason: string
    ) => {
    },
  },
}
const maintenances: MaintenanceConfig[] = [  {
    monitors: ['GYAPI'],
    title: '系统维护',
    body: '预计6小时',
    start: '2025-10-10T09:59:00+08:00',
    end: '2025-10-10T16:59:59+08:00',
    color: 'red',
  }
]
export { pageConfig, workerConfig, maintenances }
