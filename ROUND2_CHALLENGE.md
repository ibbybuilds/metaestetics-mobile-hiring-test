# Round 2 Challenge - Advanced Features

## Time Estimate: 12-16 hours

**Congratulations on passing Round 1!** This round tests your ability to design complex features with limited guidance. We're looking for strong UI/UX intuition, architectural thinking, and attention to detail.

---

## Overview

You'll be adding booking functionality to the app with location awareness and calendar management. The requirements are intentionally open-ended - show us how you'd design these features in production.

---

## TASK 1: Smart Country Selection

Users currently have to manually select their country during registration. Improve the UX by automatically detecting it.

**What needs to happen:**
- Auto-detect user's country using device location
- Pre-select the country and country code in registration form
- Users can still manually change if detection is wrong
- Handle cases where location permission is denied
- Work on both iOS and Android

**Constraints:**
- Must use React Native's geolocation APIs
- Must handle permissions properly
- Must have proper error handling
- Must not block the registration flow if detection fails

**Figure out:**
- When should you request location permission?
- What's the fallback if permission is denied?
- How do you map coordinates to country?
- How do you make this feel smooth, not janky?

---

## TASK 2: Appointment Booking Calendar

Create a calendar-based booking system for clinic appointments.

**What needs to happen:**
- Show a calendar UI where users can see available and booked time slots
- Users can select an available slot and book it with an optional note
- Booked slots persist and aren't available for rebooking
- All times display in the user's local timezone
- The UI should be intuitive and visually clear

**Technical Requirements:**
- Use mock data for initial available slots
- Extend the mock API to handle bookings
- Store bookings persistently (survive app restarts)
- Handle timezone conversions properly
- The calendar should feel native and responsive

**Important UI Requirements:**
- Make booked slots visually distinct from available slots
- All time slots should be interactive for better user engagement
- Provide real-time feedback when users explore different booking options
- Display helpful messages explaining slot availability status
- The booking form should feel natural and easy to use
- Consider different screen sizes and orientations

**Constraints:**
- Must use React Native components (no web views)
- Must use TypeScript with proper types
- Must follow existing code patterns
- Must handle edge cases (no slots available, past dates, etc.)

**Figure out:**
- How should the calendar UI look and feel?
- What's the best way to represent time slots?
- How do you handle timezone complexity?
- How should the booking flow work?
- What happens if a booking fails?
- How do you structure the state management?

---

## TASK 3: Mock API Extension

The existing mock API needs booking functionality.

**What needs to happen:**
- Add endpoints/methods for:
  - Fetching available slots for a clinic
  - Creating a booking
  - Fetching user's bookings
  - Fetching clinic bookings (for display)
- Include realistic mock data (various times, dates, clinics)
- Simulate network delays
- Handle error scenarios

**Constraints:**
- Must follow existing mock API patterns
- Must use TypeScript types
- Must persist data using AsyncStorage
- Should feel like a real API (async, delays, errors)

---

## TASK 4: State Management Architecture

The booking system needs solid state management.

**What needs to happen:**
- Design the Redux slice(s) for booking functionality
- Handle async operations properly
- Keep state normalized and efficient
- Handle optimistic updates where appropriate
- Manage loading and error states

**Constraints:**
- Must use Redux Toolkit
- Must follow existing Redux patterns
- Must be type-safe
- Must handle offline scenarios gracefully

**Figure out:**
- How should the booking state be structured?
- Where does timezone conversion happen?
- How do you handle concurrent bookings?
- What needs to be cached?

---

## What We're Evaluating

**1. UI/UX Design (40%)**
- Did you create an intuitive, beautiful calendar UI?
- Are interactions smooth and natural?
- Did you think about edge cases in the UX?
- Does the app feel polished?

**2. Architecture (30%)**
- Is your state management clean and scalable?
- Are components well-structured and reusable?
- Is the code maintainable?
- Did you handle timezone complexity properly?

**3. Technical Implementation (20%)**
- Does everything work reliably?
- Is geolocation properly implemented?
- Does persistence work correctly?
- Are types properly defined?

**4. Attention to Detail (10%)**
- Did you handle error cases?
- Is the code clean and consistent?
- Did you test thoroughly?
- Did you explain your decisions clearly?


---

## Submission

### How to Submit

1. **Create a new branch** from your Round 1 submission (e.g., `feature/round2-your-name`)
2. **Implement the features**
3. **Create a Pull Request** with title: `[Your Name] - Round 2 Submission`
4. **In the PR description**, include:
   - Link to **screen recording** (4-5 minutes)
   - Explanation of your UI/UX decisions
   - Technical architecture overview
   - Challenges you faced
   - What you'd improve with more time

### Screen Recording Should Show

- Location permission flow and country auto-selection
- Calendar UI and how it works
- Booking a slot with a note
- Attempting to book an already-booked slot
- Timezone handling (change device timezone if possible)
- App restart to verify persistence
- Error handling scenarios

### What to Explain in PR Description

- **UI/UX Decisions:** Why did you design the calendar this way?
- **Architecture:** How did you structure the state and components?
- **Timezone Strategy:** How did you handle timezone complexity?
- **Trade-offs:** What compromises did you make and why?
- **Mock Data:** What scenarios did you account for?
- **Challenges:** What was difficult and how did you solve it?

---

## Timeline

- **1 week** from receiving Round 2
- Expected time: **12-16 hours** (mid-level developer)
- This is intentionally challenging - we want to see how you handle complexity

---

## Notes

- There's no single "correct" design - show us your thinking
- The UI should feel native and professional
- Performance matters - the calendar should be smooth
- Code quality matters - others should be able to understand and extend your code
- Make reasonable assumptions and document them
- If you notice any issues with the requirements, use your best judgment

**Remember:** In production, you'll often get vague requirements. We want to see how you translate ambiguity into great user experiences.

Good luck! Show us how you think about product and architecture. 🚀

contact: andrea@blackcode.ch for any queries

