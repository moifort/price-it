import {
  init,
  initData,
  isTMA,
  miniApp,
  mockTelegramEnv,
  parseInitData,
  retrieveLaunchParams,
} from '@telegram-apps/sdk-vue'
import type { LaunchParams } from '@telegram-apps/sdk-vue'

export default defineNuxtPlugin(async (isDev) => {
  if (isDev && !(await isTMA())) {
    let lp: LaunchParams | undefined
    try {
      lp = retrieveLaunchParams()
    } catch {
      const initDataRaw =
        'user=%7B%22id%22%3A8153383236%2C%22first_name%22%3A%22Pierre%22%2C%22last_name%22%3A%22Loti%22%2C%22language_code%22%3A%22fr%22%2C%22allows_write_to_pm%22%3Atrue%2C%22photo_url%22%3A%22https%3A%5C%2F%5C%2Ft.me%5C%2Fi%5C%2Fuserpic%5C%2F320%5C%2FSHnWzLJveat4AM0T-17-wwaZ-wpQbu_HkNfQss9EMpGAiFFCoen8pqsu29nYGZee.svg%22%7D&chat_instance=-5489035838474910652&chat_type=private&auth_date=1741767805&signature=1SpWE-EO0_sVje1gzjyGzHhwxQtJSt1Vochbc5I4WsrEuVTB67eR4pCZAN5_7AuqGh3UoYNnhY_qO3BGWViADg&hash=0dae4daf23fa609486c485727fec898d66daa0e6cb1652dd80add09a3a50868f'

      lp = {
        themeParams: {
          accentTextColor: '#6ab2f2',
          bgColor: '#17212b',
          buttonColor: '#5288c1',
          buttonTextColor: '#ffffff',
          destructiveTextColor: '#ec3942',
          headerBgColor: '#17212b',
          hintColor: '#708499',
          linkColor: '#6ab3f3',
          secondaryBgColor: '#232e3c',
          sectionBgColor: '#17212b',
          sectionHeaderTextColor: '#6ab3f3',
          subtitleTextColor: '#708499',
          textColor: '#f5f5f5',
        },
        initData: parseInitData(initDataRaw),
        initDataRaw,
        version: '8',
        platform: 'tdesktop',
      }
    }

    mockTelegramEnv(lp)
    console.warn(
      '⚠️ As long as the current environment was not considered as the Telegram-based one, it was mocked. Take a note, that you should not do it in production and current behavior is only specific to the development process. Environment mocking is also applied only in development mode. So, after building the application, you will not see this behavior and related warning, leading to crashing the application outside Telegram.',
    )
  }
  init()
  miniApp.mount()
  initData.restore()
})
