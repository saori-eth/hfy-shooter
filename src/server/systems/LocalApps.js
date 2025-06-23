import { System } from '../../core/systems/System.js'
import fs from 'fs/promises'
import path from 'path'

export class LocalApps extends System {
  constructor(world) {
    super(world)
    this.apps = new Map()
    this.ready = false
    this.init()
  }

  async init() {
    await this.loadApps()
    this.ready = true
  }

  async loadApps() {
    const rootDir = path.join(process.cwd(), 'apps')
    try {
      const appFolders = await fs.readdir(rootDir)
      
      for (const appFolder of appFolders) {
        const appDir = path.join(rootDir, appFolder)
        const manifestPath = path.join(appDir, 'manifest.json')
        
        try {
          const stat = await fs.stat(appDir)
          if (!stat.isDirectory()) continue
          
          const manifestContent = await fs.readFile(manifestPath, 'utf-8')
          const manifest = JSON.parse(manifestContent)
          
          // Create a blueprint-like structure that matches existing format
          const blueprint = {
            id: appFolder,
            name: manifest.name || appFolder,
            desc: manifest.description || '',
            model: manifest.model ? `/apps/${appFolder}/${manifest.model}` : null,
            script: manifest.script ? `/apps/${appFolder}/${manifest.script}` : null,
            isLocal: true
          }
          
          this.apps.set(appFolder, blueprint)
          console.log(`[LocalApps] Loaded app: ${blueprint.name} (${appFolder})`)
          
        } catch (err) {
          // Skip folders without valid manifest
          if (err.code !== 'ENOENT') {
            console.warn(`[LocalApps] Failed to load app ${appFolder}:`, err.message)
          }
        }
      }
      
      console.log(`[LocalApps] Loaded ${this.apps.size} local apps`)
      
    } catch (err) {
      console.error('[LocalApps] Could not read apps directory:', err)
    }
  }

  getAppsList() {
    return Array.from(this.apps.values())
  }

  getApp(id) {
    return this.apps.get(id)
  }

  async reloadApps() {
    this.apps.clear()
    await this.loadApps()
  }
}