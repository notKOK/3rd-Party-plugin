<script>
    import { pluginManager } from './PluginManager.ts';

    let loadedPlugins = pluginManager.getLoadedPlugins();

    const appContext = {
        showNotification: (message) => alert(message),
    };

    let plugin = {name: "plug1", url: "https://cdn.jsdelivr.net/gh/notKOK/pluginjs/example-plugin.js"}

    async function loadPlugin(pluginUrl) {
        try {
            await pluginManager.loadPluginFromURL(pluginUrl, appContext);
            loadedPlugins = pluginManager.getLoadedPlugins();
        } catch (err) {
            console.error(err);
            alert(`Failed to load plugin: ${err.message}`);
        }
    }

    async function unloadPlugin(pluginId) {
        await pluginManager.unloadPlugin(pluginId);
        loadedPlugins = pluginManager.getLoadedPlugins();
    }


</script>


<h1>Available Plugins</h1>
<div>
    <li>
        {plugin.name}
        URL: {plugin.url}
        <button on:click={() => loadPlugin(plugin.url)}>Load</button>
    </li>
</div>

