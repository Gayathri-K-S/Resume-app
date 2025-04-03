import { View, Text, Button } from 'react-native'; // Add Text import
import { Link } from 'expo-router';

export default function HomeScreen() {
  return (
    <View>
      <Text>Welcome to the Resume App</Text> {/* Wrap text in <Text> */}
      <Link href="/ResumeBuilder" asChild>
        <Button title="Go to Resume Builder" />
      </Link>
    </View>
  );
}