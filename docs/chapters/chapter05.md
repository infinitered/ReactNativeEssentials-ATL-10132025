# Chapter 5: Accessibility

Run `./scripts/skipTo 5` to copy the solution to your main app, otherwise you may code along. Reference `./solutions/chapter5` if you get stuck.

## Overview

In this chapter, we'll learn about using the accessibility features of React Native. Having an accessible app is critical for ensuring the best possible experience for all of your users, and in some cases is legally required.

What do we mean when we say an app is accessible? The answer is many things, including but not limited to:

- Gracefully handling text magnification
- Color-blind friendly design colors
- Support for assistive technologies like screen readers

For the purpose of this lesson we will primarily be focusing on assistive technologies, namely VoiceOver on iOS and Talkback on Android, which assist non-sighted users in using your app by reading out descriptions of the content and interactive elements.

## Learning Objectives

### Tools

- [React Native accessibility docs](https://reactnative.dev/docs/accessibility)
- [iOS voiceover cheatsheet](https://support.apple.com/guide/iphone/use-voiceover-gestures-iph3e2e2281/ios)
- [Android talkback cheatsheet](https://dequeuniversity.com/assets/pdf/screenreaders/talkback-guide.pdf)

## Tasks

1. Make the List Screen (hint `Rating.ts` component) accessible.
2. Something is wrong with the `GameDetailScreen` information row. How can we fix it?

## DIY Tasks

1. Looking at the [Chapter 7 Figma file](https://www.figma.com/design/6Ip46lkbe5Ms1FvccKwOAd/Essentials-Workshop?node-id=728-1913&p=f&t=xf7d0l1crtqvUHIe-0), you'll notice that there is a filter switch. Implement it in the `GamesListScreen` and make sure it is accessible.

---

[Previous: Chapter 4](./chapter04.md) | [Next: Chapter 6](./chapter06.md)
