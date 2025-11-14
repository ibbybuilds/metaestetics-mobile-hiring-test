## Your Task

- Find these bugs
- Understand the root cause
- Fix them properly
- Document what you found and how you fixed it

## Reflection

Problem-solving: I’d step through each broken screen, align requirements with current code (Formik steps, Redux state, AsyncStorage) and iteratively wire up form submission, persistence, and navigation.
Performance awareness: I’d profile the Clinics screen—flat lists, memoized rows, debounced search—and replace any heavyweight renders with optimized components (e.g., FlatList, caching hooks).
Code quality: I’d follow TypeScript/React Native conventions already present, keep components small, reuse shared utilities (styles, input wrappers), and document assumptions in comments when the intent isn’t obvious.
Understanding: I’d make sure each screen’s logic is transparent—Formik schemas for validation, Redux slices for state, AsyncStorage for persistence—so the flow feels cohesive end-to-end.
Architecture: I’d build a generic useData hook (loading/error states, caching, refetch control) so the Clinics screen and future lists can share the same fetching logic without duplication.
Edge cases: I’d handle validation errors, API failures, loading indicators, navigation between steps without losing state, and allow users to cancel profile edits without unexpected persistence.

Bugs & Fix Plan
Phone validation: Inputs expect 10 digit strings but PhoneInputComponent strips formatting without ensuring a 10-digit capture, so Yup always fails; I’d adjust the component to normalize digits only once and/or relax schema to allow variable lengths or include international checks via the phone input’s metadata.
Registration draft persistence: Form state currently stays in component state, so navigating between steps resets data. The fix is to lift state into Redux/AsyncStorage, writing a registration slice with load/save/clear thunks backed by a draft key in storageService, then wire Register to read the draft before rendering and update as each step saves.
Profile screen memory leak: Likely caused by unmounted async operations (e.g., useEffect calling thunks without cleanup) or lingering listeners. I’d add cleanup logic or cancelation guards around any async fetch/save in the profile/edit screens to prevent state updates after unmount.
Keyboard covering UI: Register uses ScrollView without adequate keyboardVerticalOffset, so on small screens the keyboard hides inputs. The fix is to wrap content in KeyboardAvoidingView/ScrollView with keyboardShouldPersistTaps="handled" and provide keyboardVerticalOffset plus padding/margins for safe-area.
Image updates: After editing a profile picture, the new URI isn’t saved to Redux/AsyncStorage before the UI re-renders. Solution is to persist the edited image via mockApiService.updateProfile, update Redux auth.user, and refresh Profile/EditProfile state once the promise resolves (ensuring AsyncStorage and registered users stay in sync).
Extra Work Needed

Convert placeholders in Register step components into working Formik/Yup screens that call onDataChange, display validation errors, handle phone/date inputs, and respect navigation.
Implement the EditProfile screen and related thunk so Formik data preloads from Redux, allows edits/cancellations, and updates AsyncStorage/Redux/mocked backend immediately.
Optimize ClinicsScreen by introducing a reusable useData hook, caching clinic lists, using FlatList with memoized render items, and debouncing search input so filtering isn’t expensive on each keystroke.
