# Coding Challenge

## Time Estimate: 10-12 hours

**Note:** This estimate is for mid-level developers. Junior developers may need 15-18 hours. Senior developers may complete it in 8-10 hours.

## Overview

You'll be working on a React Native app. Some features work, some don't, some are slow. Your job is to make it production-ready.

---

## TASK 1: Registration Flow

The registration screen exists but doesn't work. Make it work.

**What needs to happen:**
- Users can register with email/password
- Collect personal information (name, phone, date of birth, gender)
- Optional profile photo upload
- Review and submit their information
- Successfully create an account and log in

**What's broken:**
- Step components are empty
- Form state doesn't persist between steps
- No error handling
- No loading states

**Constraints:**
- Must use Formik for form handling (already in dependencies)
- Must use the provided Yup validation schemas
- Must use Redux Toolkit for state management
- Must use AsyncStorage for persistence
- Must follow existing code patterns
- Should work on both iOS and Android

**Figure out:**
- How to structure the multi-step flow
- How to manage state between steps
- How to integrate with the existing Redux setup
- How to handle errors and edge cases

---

## TASK 2: Profile Editing

Users can view their profile, but editing is broken. Fix it.

**What needs to happen:**
- Users can modify their profile information
- Changes persist after saving
- Users can cancel without saving
- The UI updates immediately after saving
- Image updates work correctly

**What's broken:**
- EditProfile screen is empty
- No form pre-population
- No state synchronization
- Image updates don't reflect immediately

**Constraints:**
- Must use Formik + Yup (same validation as registration)
- Must use Redux Toolkit for state updates
- Must sync with AsyncStorage
- Must use the existing mock API service

---

## TASK 3: Performance Issues

There's a "Clinics" screen that's slow. Make it fast.

**Current problems:**
- Loading is slow
- Search is laggy
- Scrolling is janky
- Things re-render unnecessarily

**Your job:**
- Figure out what's causing the slowness
- Fix it
- Make it feel smooth and responsive

**Constraints:**
- Must use React Native components (FlatList, etc.)
- Must use TypeScript
- Must maintain existing functionality
- Should handle 100+ items efficiently

**Access it:** Profile screen → "View Clinics" button

---

## TASK 4: Reusable Data Hook

The Clinics screen fetches data directly. This isn't reusable.

**Your job:**
- Create a hook that can be reused for fetching different types of data
- Use it in the Clinics screen
- Make it handle common scenarios

**Constraints:**
- Must be a React hook (use* naming convention)
- Must use TypeScript with proper types
- Must be generic/reusable (not just for clinics)
- Must integrate with the existing mock API service

**Figure out:**
- What makes a hook reusable?
- How should caching work?
- When should data refetch?
- How to handle errors?

---

## TASK 5: Bug Fixes

There are bugs in the codebase. Find and fix them.

**What you need to do:**
- Identify what's broken
- Understand why it's broken
- Fix it properly
- Don't introduce new bugs

**Constraints:**
- Must maintain TypeScript types
- Must follow existing code patterns
- Must not break existing functionality

**Hint:** Check `BUG_LIST.md` for some issues, but there might be others.

---

## Submission

### How to Submit

1. **Fork this repository** to your GitHub account
2. **Create a new branch** for your work (e.g., `feature/your-name-solution`)
3. **Make your changes** and commit them
4. **Create a Pull Request** back to this repository
5. **In the PR description**, include:
   - Link to your **screen recording** (YouTube, Loom, or similar)
   - Brief summary of what you implemented
   - Any notes about your approach

### What to Include

**1. Pull Request with your code:**
- All your implementation changes
- Clean, well-structured commits
- Code that follows existing patterns

**2. Screen Recording (3-4 minutes) showing:**
- Registration flow working smoothly
- Profile editing working
- Fast Clinics screen (demonstrate performance)
- Your hook in action
- Bug fixes working

**3. PR Description should explain:**
- Your approach and key decisions
- What was challenging and why
- How you solved performance issues
- How your hook works and why you designed it that way
- What you'd do differently with more time
- Any assumptions you made

### PR Guidelines

- **Title:** `[Your Name] - Hiring Test Submission`
- **Description:** Include video link and explanation
- **Commits:** Make meaningful commits (not just one giant commit)
- **Code Quality:** Follow existing code style and patterns

### What We're Looking For

We care about **how you think**:

- **Problem-solving:** Can you figure things out independently?
- **Performance awareness:** Do you understand what makes things slow?
- **Code quality:** Is your code maintainable?
- **Understanding:** Do you understand what you built?
- **Architecture:** Can you design reusable solutions?
- **Edge cases:** Did you think about errors, loading, validation?

### Timeline

- **1 week** from receiving this test
- Expected time: **10-12 hours** (mid-level developer)
- Quality over speed - we prefer well-done work over rushed completion

---

## Notes

- The codebase has examples you can learn from
- All necessary dependencies are already installed
- TypeScript is required - no `any` types
- The app should feel polished and performant
- If something is ambiguous, make a reasonable decision and document it
- Performance matters - don't just make it work, make it work well

**Important:** This test uses mock APIs instead of Firebase/Firestore. In production, we use Firebase Authentication and Firestore. The mock service simulates async operations, delays, and errors - treat it like a real backend. The patterns you use (error handling, loading states, async/await) should match what you'd use with real Firebase/Firestore.

Good luck. Show us what you can build.
