import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen
        name="index" // Home screen
        options={{
          title: 'Home', // Custom title for the screen
          headerShown: true, // Show or hide the header
        }}
      />
      <Stack.Screen
        name="ResumeBuilder" // Resume Builder screen
        options={{
          title: 'Resume Builder',
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="ResumeEditor" // Resume Editor screen
        options={{
          title: 'Resume Editor',
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="ResumeTemplate" // Resume Template screen
        options={{
          title: 'Resume Template',
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="explore" // Explore screen
        options={{
          title: 'Explore',
          headerShown: true,
        }}
      />
    </Stack>
  );
}