# Chapter 3: Meet the List

Run `./scripts/skipTo 3` to copy the solution to your main app, otherwise you may code along. Reference `./solutions/chapter3` if you get stuck.

Our design team has provided us with this [figma design](https://www.figma.com/design/6Ip46lkbe5Ms1FvccKwOAd/Essentials-Workshop?node-id=0-1&p=f&t=pLCTfl2m8Jx1SkMF-0) that we will use along the way while developing this app.

## Overview

Chapter 3 brings the games catalog to life. You will build an efficient list screen, connect it to our API, and surface the right UI states for loading, success, and empty data.

## Learning Objectives

- Render large collections with performant list primitives
- Share catalog data across screens with context state
- Drive detail screens from Expo Router navigation and API calls

## DIY Tasks

1. Replace the placeholder list UI with a `FlatList`-powered `GamesListScreen` that reads from `shared/services/api.ts`
   a. Keep the [FlatList docs](https://reactnative.dev/docs/flatlist) handy for props such as `keyExtractor`, `contentContainerStyle`, and `ListEmptyComponent`
   b. Use `ListEmptyComponent` to show the `Empty` component when no games are available

2. Create a lightweight global store for games in `services/state.tsx`
   a. Shape a `GlobalStateContext` with `games` and `setGames`
   b. Expose `useGlobalState` hook for easy access
   c. The official [React Context guide](https://react.dev/reference/react/useContext) is a good refresher if needed

3. Wire the Expo Router stack so list cards push the detail route
   a. Use `router.push()` with `pathname: "/game-details"` and pass `gameId` and `name` as params
   b. Screens receive params via `useLocalSearchParams`—check the [Expo Router navigation guide](https://docs.expo.dev/router/reference/router/) for the right hooks to call

4. Style empty and loading states with the `Empty` component
   a. Use our [Figma file](https://www.figma.com/design/6Ip46lkbe5Ms1FvccKwOAd/Essentials-Workshop?node-id=728-983&p=f&t=pLCTfl2m8Jx1SkMF-0) to guide spacing, typography, and tint usage
   b. Show loading state while fetching individual game details

5. Fetch individual game details on the detail screen
   a. Reuse helpers from `shared/services/api.ts` (specifically `api.getGame`)
   b. Display the rating UI via `components/Rating.tsx`
   c. Handle loading and error states appropriately

## Key Resources

- React Native [FlatList](https://reactnative.dev/docs/flatlist)
- Expo Router [Stack](https://docs.expo.dev/router/advanced/stack/) & [Router hooks](https://docs.expo.dev/router/reference/router/)
- React [Context API](https://react.dev/reference/react/Context)
- Project Figma: [Games Catalog](https://www.figma.com/design/6Ip46lkbe5Ms1FvccKwOAd/Essentials-Workshop?node-id=728-983&p=f&t=pLCTfl2m8Jx1SkMF-0)
- API helpers: `shared/services/api.ts`

## Stretch Goal

Add a loading placeholder to `GameDetailsScreen` that swaps to the real content once `api.getGame` resolves. The provided solution shows one approach with the shared `Empty` component.

---

[Previous: Chapter 2](./chapter02.md) | [Next: Chapter 4](./chapter04.md)
