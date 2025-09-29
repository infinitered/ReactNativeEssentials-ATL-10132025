### Chapter 0

Run `./scripts/skipTo 0` to copy the solution to your main app, otherwise you may code along. Reference `./solutions/chapter0` if you get stuck.

# Chapter 0: Debugging

In this chapter, we will explore the essential debugging tools and techniques for React Native development. Understanding how to debug effectively is crucial for building robust mobile applications.

## Learning Objectives

- Set up and use Reactotron for debugging
- Understand React Native debugging tools
- Learn how to debug on both iOS and Android
- Explore network debugging with MSW
- Master console logging and error handling

## Tasks for this section [code-a-long]

### 1. Set up Reactotron for debugging

Reactotron is a powerful debugging tool that provides:
- State inspection
- API request/response monitoring
- Performance monitoring
- Custom commands

Steps:
- Verify Reactotron is already configured in `src/devtools/ReactotronConfig.ts`
- Start the Reactotron desktop app
- Connect your React Native app to Reactotron

### 2. Explore debugging tools

- **Console logging**: Use `console.log`, `console.warn`, and `console.error`
- **React DevTools**: Install and use React DevTools for component inspection
- **Flipper**: Explore Flipper for advanced debugging (optional)

### 3. Network debugging with MSW

- Understand how MSW intercepts API calls
- Use MSW debug mode to see intercepted requests
- Modify mock responses for testing different scenarios

### 4. Platform-specific debugging

#### iOS Debugging
- Use Xcode's debugging tools
- Explore the iOS Simulator's debugging features
- Learn about iOS-specific error messages

#### Android Debugging
- Use Android Studio's debugging tools
- Explore the Android Emulator's debugging features
- Learn about Android-specific error messages

## Key Concepts

- **Development vs Production**: Understanding the difference between dev and prod builds
- **Error Boundaries**: Implementing error boundaries for better error handling
- **Performance Monitoring**: Using tools to identify performance bottlenecks
- **Network Debugging**: Understanding API calls and responses

## Troubleshooting Common Issues

- Metro bundler issues
- Simulator/emulator connection problems
- Dependency conflicts
- Platform-specific build errors

---

[Next: Chapter 1](./chapter01.md)
