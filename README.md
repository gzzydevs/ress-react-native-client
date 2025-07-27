# Ress React Native Client

Una aplicación React Native con navegación basada en deep links que incluye pantallas de Login, Home, y WebView.

## 🚀 Características

- **Navegación con Deep Links**: Soporta URLs personalizadas para navegación
- **Pantallas**: Login, Home, WebView
- **WebView Integrado**: Conecta con servidor ress.js
- **Configuración Nativa**: Deep links configurados tanto para iOS como Android
- **Componente Header**: Header reutilizable con botón de navegación back
- **DevBottomBarLauncher**: Barra de desarrollo para testing y navegación rápida

## 🎨 **Componente Header**

El componente `Header` es reutilizable y incluye:

- **Branding consistente**: Logo "🥒 PEPINO 🥒" en todas las pantallas
- **Botón de Back**: Navegación hacia atrás automática (cuando es posible)
- **Colores personalizables**: Cada pantalla puede tener su propio color
- **Información contextual**: Muestra URL en WebView, subtítulos personalizados
- **SafeArea compatible**: Respeta las áreas seguras del dispositivo

### Configuración por Pantalla:
- **LoginScreen**: Color naranja claro (`#fff3e0`), sin botón de back
- **HomeScreen**: Color verde claro (`#e8f5e8`), con botón de back
- **WebViewScreen**: Color azul claro (`#f0f8ff`), con botón de back y URL visible

## 🛠️ **DevBottomBarLauncher (Solo Desarrollo)**

El componente `DevBottomBarLauncher` aparece **únicamente en modo desarrollo** (`__DEV__ === true`) y proporciona herramientas rápidas para testing:

### Funcionalidades:
- **🏠 Go to Home**: Navega directamente al Home (usando `navigate()`)
- **📱 Push Screens**: Abre un modal con opciones para hacer push de pantallas

### Modal de Push Options:
- **🔐 Login Screen**: Push nueva instancia de Login
- **🏠 Home Screen**: Push nueva instancia de Home  
- **🔥 WebView - Pokedex**: Push WebView con `/pokedex`
- **📄 WebView - Page1**: Push WebView con `/page1`
- **🌐 WebView - Custom**: Push WebView con path personalizado (input prompt)

### Características:
- **Solo desarrollo**: Automáticamente se oculta en builds de producción
- **Overlay persistente**: Barra fija en la parte inferior de todas las pantallas
- **Stack navigation**: Permite apilar múltiples pantallas para testing
- **Modal intuitivo**: Interface clara para seleccionar qué pushear
- **Safe area compatible**: Respeta el home indicator de iOS

## 📱 Deep Links Disponibles

Por defecto, la aplicación responde a los siguientes deep links:

- `ress://login` - Pantalla de login
- `ress://home` - Pantalla principal/dashboard
- `ress://webview/pokedex` - WebView con contenido del Pokedex
- `ress://webview/page1` - WebView con contenido de Page1
- `ress://webview/[cualquier-path]` - WebView con path personalizado

### Ejemplos de Uso

```bash
# Navegar al login
ress://login

# Navegar al home
ress://home

# Abrir WebView con Pokedex
ress://webview/pokedex

# Abrir WebView con Page1
ress://webview/page1

# Abrir WebView con path personalizado
ress://webview/mi-pagina-custom
```

**Nota:** La WebView construye la URL final como `${WEBVIEW_BASE_PATH}/${path}`, donde:
- `WEBVIEW_BASE_PATH` por defecto es `http://localhost:3000`
- `path` es lo que se pasa en el deep link

## ⚙️ Configuración de Variables de Entorno

Puedes personalizar el esquema de deep links y el base path editando el archivo `.env`:

```env
# Cambiar el esquema base del deep link
DEEP_LINK_SCHEME=miapp

# Cambiar el base path para las URLs del WebView
WEBVIEW_BASE_PATH=https://mi-servidor.com
```

Con esto, los deep links cambiarían a:
- `miapp://login`
- `miapp://home` 
- `miapp://webview/pokedex` (cargará `https://mi-servidor.com/pokedex`)

## 🛠️ Instalación

1. **Instalar dependencias**:
```bash
npm install
```

2. **Instalar pods de iOS**:
```bash
cd ios && pod install && cd ..
# o usando npx
npx pod-install
```

3. **Ejecutar la aplicación**:

### iOS
```bash
npm run ios
```

### Android
```bash
npm run android
```

## 🧪 Probar Deep Links

### En iOS Simulator
```bash
xcrun simctl openurl booted "ress://login"
xcrun simctl openurl booted "ress://home"
xcrun simctl openurl booted "ress://webview/pokedex"
xcrun simctl openurl booted "ress://webview/page1"
```

### En Android Emulator
```bash
adb shell am start -W -a android.intent.action.VIEW -d "ress://login" com.ressreactnativeclient
adb shell am start -W -a android.intent.action.VIEW -d "ress://home" com.ressreactnativeclient
adb shell am start -W -a android.intent.action.VIEW -d "ress://webview/pokedex" com.ressreactnativeclient
adb shell am start -W -a android.intent.action.VIEW -d "ress://webview/page1" com.ressreactnativeclient
```

### Usando uri-scheme (Recomendado)
```bash
# Instalar herramienta global
npm install -g uri-scheme

# Probar deep links
npx uri-scheme open "ress://login" --ios
npx uri-scheme open "ress://home" --android
npx uri-scheme open "ress://webview/pokedex" --ios
npx uri-scheme open "ress://webview/page1" --android

# Probar navegación con botón de back:
# 1. Abrir Home desde Login
npx uri-scheme open "ress://home" --ios
# 2. Usar botón back en Header → regresa a Login

# 1. Abrir WebView desde cualquier pantalla
npx uri-scheme open "ress://webview/pokedex" --ios  
# 2. Usar botón back en Header → regresa a pantalla anterior
```

## 📂 Estructura del Proyecto

```
src/
├── components/
│   ├── Header.tsx                 # Componente Header reutilizable con botón de back
│   └── DevBottomBarLauncher.tsx   # Barra de desarrollo (solo en __DEV__)
├── screens/
│   ├── LoginScreen.tsx    # Pantalla de autenticación (sin botón back)
│   ├── HomeScreen.tsx     # Dashboard principal simple con botones (con botón back)
│   └── WebViewScreen.tsx  # WebView integrado con basePath configurable (con botón back)
├── config/
│   └── linking.ts         # Configuración de deep links y basePath
└── types/
    └── navigation.ts      # Tipos de navegación TypeScript
```

## 🎯 Pantallas

### LoginScreen (`ress://login`)
- Formulario de autenticación simple
- Navegación al Home tras login exitoso
- Opción directa para ir al WebView
- **Sin botón de back** (pantalla inicial)

### HomeScreen (`ress://home`)
- Dashboard simple con botones de navegación
- Acceso directo a las pantallas WebView disponibles
- Lista de paths predefinidos: `/pokedex` y `/page1`
- **Con botón de back** para regresar al Login

### WebViewScreen (`ress://webview/[path]`)
- Carga contenido web usando `${WEBVIEW_BASE_PATH}/${path}`
- Soporte para paths dinámicos via deep links
- Header personalizable con información de URL actual
- Paths disponibles: `pokedex`, `page1`, o cualquier path personalizado
- **Con botón de back** para regresar a la pantalla anterior

## 🔧 Scripts Disponibles

```json
{
  "android": "react-native run-android",
  "ios": "react-native run-ios",
  "start": "react-native start",
  "test": "jest",
  "lint": "eslint .",
  "clean": "npm run ios:clean && npm run android:clean && npm run start:reset",
  "dev:setup": "npm install && npm run pods:install"
}
```

## 📝 Notas de Desarrollo

- **React Navigation 7**: Usando navegación estática con soporte para deep links
- **TypeScript**: Tipos completos para navegación y rutas
- **React Native Config**: Variables de entorno para configuración flexible
- **Linking Automático**: Configuración automática de paths para deep links
- **DevBottomBarLauncher**: Herramienta de desarrollo que se compila fuera en producción (`__DEV__` flag)

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.
