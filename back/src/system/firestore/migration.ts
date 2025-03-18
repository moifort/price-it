import type { Firestore } from 'firebase-admin/firestore'
import { logger } from 'firebase-functions'

export type Migrate = (database: Firestore) => Promise<void> | void
export type MigrationScript = { migrate: Migrate; version: number }

export const migrate = (database: Firestore) => async (migrationScripts: MigrationScript[]) => {
  const stats = {
    scannedFiles: 0,
    executedFiles: 0,
    created: 0,
    set: 0,
    updated: 0,
    deleted: 0,
    added: 0,
  }
  stats.scannedFiles = migrationScripts.length
  logger.log(`Found ${stats.scannedFiles} migration files`)

  const collection = database.collection('fireway')
  const lastMigration = (await collection.orderBy('version', 'desc').get()).docs[0]?.data() ?? null

  const currentVersion: number = lastMigration ? lastMigration.version : 0
  const filesToMigrate = migrationScripts.filter(({ version }) => version > currentVersion)
  for (const file of filesToMigrate) {
    stats.executedFiles += 1
    logger.log('Running', file.version)

    const start = new Date()
    try {
      await file.migrate(database)
    } catch (e: unknown) {
      logger.error('error during script.migrate()', e)
      throw new Error('error during script.migrate()')
    }
    const finish = new Date()

    logger.log(`Uploading the results for ${file.version}`)

    await collection.doc(`${file.version}`).set({
      version: file.version,
      installedOn: start,
      executionTime: finish.getTime() - start.getTime(),
    })
  }
  const { scannedFiles, executedFiles, added, created, updated, set, deleted } = stats
  logger.log('Finished all firestore migrationScripts')
  logger.log(`Files scanned:${scannedFiles} executed:${executedFiles}`)
  logger.log(`Docs added:${added} created:${created} updated:${updated} set:${set} deleted:${deleted}`)
}
