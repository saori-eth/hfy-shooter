# Local Apps Development

This directory contains locally developed apps that can be loaded into the game engine without using the in-browser editor.

## Creating a New App

1. Create a new directory in `/apps` with your app name (e.g., `my-app`)
2. Add a `manifest.json` file with the following structure:

```json
{
  "name": "My App",
  "description": "Description of your app",
  "model": "model.glb",  // optional - path to 3D model file
  "script": "script.js"  // optional - path to script file
}
```

3. Add your app files:
   - `script.js` - Your app's JavaScript code
   - `model.glb` - Your app's 3D model (optional)
   - Any other assets your app needs

## App Script Structure

Your `script.js` file has access to global `app` and `world` objects:

```javascript
// Called when the app starts
app.onStart = async () => {
  console.log('App started!');
  
  // Set up physics
  app.mesh.physics = {
    type: 'dynamic',
    shape: 'box'
  };
};

// Called every frame
app.onUpdate = async (dt) => {
  // dt is delta time in seconds
  app.mesh.rotation.y += dt * 0.5;
};

// Called when the app is destroyed
app.onDestroy = async () => {
  console.log('App destroyed');
};
```

## Available App Methods

- `app.onStart` - Called when the app is initialized
- `app.onUpdate(dt)` - Called every frame with delta time
- `app.onDestroy` - Called when the app is removed
- `app.mesh` - Access to the app's 3D mesh
- `app.world` - Reference to the world object

## Loading Apps

Local apps are automatically loaded when the server starts. They appear in the "Add" menu alongside collection apps, marked with a 🛠️ icon.

## Editing Scripts

When a local app is selected in the world, the Script tab will show the file path where you can edit the script directly in your code editor. Changes require a server restart to take effect.

## Example

See the `crash-block` directory for a complete example of a local app.