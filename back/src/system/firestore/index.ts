import path from 'node:path'
import fg from 'fast-glob'
import { getFirestore } from 'firebase-admin/firestore'
import { onRequest } from 'firebase-functions/https'
import { type MigrationScript, migrate } from './migration'

export const api = onRequest(async (req, res) => {
  const files = await fg([path.join(process.cwd(), '**/*.migration.js')], { dot: true })
  const instances: MigrationScript[] = await Promise.all(
    files.map(async (file) => ({
      version: Number.parseInt(path.basename(file).match(/(?<=v)(.*?)(?=-)/)![0]),
      migrate: (await import(file)).migrate,
    })),
  )
  await migrate(getFirestore())(instances)
  res.send('OK')
})
