### Chapter 4

Run `./scripts/skipTo 4` to copy the solution to your main app, otherwise you may code along. Reference `./solutions/chapter4` if you get stuck.

# Chapter 4: Blending In

In this chapter, we will implement adaptive theming that responds to system preferences, creating a seamless experience that blends with the user's device environment.

## Learning Objectives

- Implement system-aware theming
- Create light and dark mode support
- Handle theme transitions smoothly
- Adapt to system color schemes
- Implement custom theme switching

## Tasks for this section [code-a-long]

### 1. Set up System Theme Detection

Detect and respond to system theme changes:

- **useColorScheme Hook**: Detect current system theme
- **Theme Context**: Create theme context for app-wide theme state
- **Automatic Switching**: Respond to system theme changes
- **Persistence**: Remember user's theme preference

### 2. Create Adaptive Color System

Build a comprehensive color system:

- **Semantic Colors**: Colors that adapt to theme
- **Background Colors**: Primary, secondary, and surface colors
- **Text Colors**: High contrast text for readability
- **Accent Colors**: Brand colors that work in both themes

### 3. Implement Theme Switching

Add manual theme switching capability:

- **Theme Toggle**: Allow users to override system theme
- **Settings Screen**: Theme selection in app settings
- **Smooth Transitions**: Animated theme changes
- **State Persistence**: Save user's theme choice

### 4. Adapt Components to Themes

Update all components for theme support:

- **Button Components**: Different styles for light/dark
- **Card Components**: Adaptive backgrounds and borders
- **Text Components**: Proper contrast in both themes
- **Icon Components**: Theme-aware icon colors

### 5. Handle Platform Differences

Adapt theming for different platforms:

- **iOS**: Follow iOS design guidelines
- **Android**: Follow Material Design principles
- **Web**: Ensure web compatibility
- **Platform-specific Colors**: Use platform-appropriate colors

## Key Concepts

- **Adaptive Theming**: Themes that respond to system preferences
- **Color Semantics**: Meaningful color usage
- **Theme Context**: Managing theme state across the app
- **System Integration**: Following platform conventions
- **Accessibility**: Ensuring good contrast in all themes

## Theme Patterns

- **System Following**: Automatically following system theme
- **Manual Override**: Allowing users to choose their preference
- **Smooth Transitions**: Animated theme changes
- **Consistent Experience**: Maintaining design consistency across themes

## Best Practices

- **Contrast**: Ensuring sufficient contrast in all themes
- **Consistency**: Using consistent color patterns
- **Performance**: Efficient theme switching
- **User Experience**: Intuitive theme selection and switching

---

[Previous: Chapter 3](./chapter03.md) | [Next: Chapter 5](./chapter05.md)
