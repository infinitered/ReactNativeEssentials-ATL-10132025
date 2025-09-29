### Chapter 2

Run `./scripts/skipTo 2` to copy the solution to your main app, otherwise you may code along. Reference `./solutions/chapter2` if you get stuck.

# Chapter 2: Navigation Plus

In this chapter, we will implement comprehensive navigation in our React Native app using Expo Router, including stack navigation, tab navigation, and deep linking.

## Learning Objectives

- Master Expo Router for navigation
- Implement stack navigation between screens
- Add tab navigation for main app sections
- Handle deep linking and URL routing
- Manage navigation state and history

## Tasks for this section [code-a-long]

### 1. Set up Expo Router

Expo Router provides file-based routing similar to Next.js:

- Configure the app structure in `src/app/`
- Set up the root layout with navigation container
- Create screen components using the file-based routing

### 2. Implement Stack Navigation

Create navigation between main screens:

- **Games List Screen**: Main screen showing all games
- **Game Details Screen**: Detailed view of individual games
- **Settings Screen**: App configuration and preferences

### 3. Add Tab Navigation

Implement bottom tab navigation for main app sections:

- **Games Tab**: Browse and search games
- **Favorites Tab**: User's favorite games
- **Profile Tab**: User profile and settings

### 4. Handle Deep Linking

Configure deep linking for:

- Direct links to specific games
- Sharing game URLs
- Handling external app links

### 5. Navigation State Management

- Persist navigation state
- Handle back button behavior
- Implement proper screen transitions

## Key Concepts

- **File-based Routing**: Using file structure for navigation
- **Stack Navigation**: Hierarchical screen navigation
- **Tab Navigation**: Bottom tab bar navigation
- **Deep Linking**: URL-based navigation
- **Navigation State**: Managing navigation history and state

## Navigation Patterns

- **Modal Presentation**: Presenting screens as modals
- **Drawer Navigation**: Side drawer for additional options
- **Nested Navigation**: Combining different navigation types
- **Conditional Navigation**: Navigation based on app state

## Best Practices

- **Consistent Navigation**: Using consistent navigation patterns
- **User Experience**: Smooth transitions and intuitive navigation
- **Performance**: Optimizing navigation performance
- **Accessibility**: Making navigation accessible to all users

---

[Previous: Chapter 1](./chapter01.md) | [Next: Chapter 3](./chapter03.md)
