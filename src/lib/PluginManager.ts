// src/lib/PluginManager.ts
export interface Plugin {
    id: string;
    name: string;
    init: (app: AppContext) => void | Promise<void>;
    unload?: () => void | Promise<void>;
}

export interface AppContext {
    showNotification: (message: string) => void;
}

class PluginManager {
    private plugins: Map<string, Plugin> = new Map();

    async loadPluginFromURL(url: string, appContext: AppContext) {
        const module = await import(/* @vite-ignore */ url);
        const plugin = module.default as Plugin;

        if (this.plugins.has(plugin.id)) {
            throw new Error(`Plugin ${plugin.id} is already loaded`);
        }

        await plugin.init(appContext);
        this.plugins.set(plugin.id, plugin);
    }

    async unloadPlugin(id: string) {
        const plugin = this.plugins.get(id);
        if (plugin?.unload) {
            await plugin.unload();
        }
        this.plugins.delete(id);
    }

    getLoadedPlugins() {
        return Array.from(this.plugins.values());
    }
}

export const pluginManager = new PluginManager();
