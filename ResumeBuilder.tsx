import React, { useState, useRef } from 'react';
import { View, Button, ScrollView, StyleSheet, Alert, ActivityIndicator, Platform } from 'react-native';
import ResumeEditor from './ResumeEditor';
import ResumeTemplate from './ResumeTemplate';
import { captureRef } from 'react-native-view-shot';
import * as Sharing from 'expo-sharing';
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';

const ResumeBuilder = () => {
  const [formData, setFormData] = useState({
    profile: { name: '', about: '', email: '', phone: '', address: '', github: '', linkedin: '', profileImage: '' },
    projects: [{ title: '', line1: '', line2: '', deployedLink: '' }],
    education: [{ degree: '', institution: '', year: '', grade: '' }],
    skills: ['', '', ''],
    achievements: ['', '', ''],
    coursework: ['', '', ''],
  });

  const [isSaving, setIsSaving] = useState(false);
  const resumeRef = useRef(null);

  const handleSaveResume = async () => {
    if (!resumeRef.current) return;

    setIsSaving(true);
    try {
      // 1. First check permissions
      if (Platform.OS !== 'web') {
        const { status } = await MediaLibrary.requestPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Permission required', 'We need permission to save files to your device');
          return;
        }
      }

      // 2. Capture the resume as an image
      const uri = await captureRef(resumeRef, {
        format: 'png',
        quality: 1,
      });

      // 3. For Android, we'll use a different approach
      if (Platform.OS === 'android') {
        await MediaLibrary.saveToLibraryAsync(uri);
      } 
      // 4. For iOS, we'll use downloadAsync
      else {
        const fileName = `Resume_${formData.profile.name || 'MyResume'}_${Date.now()}.png`;
        const fileUri = `${FileSystem.documentDirectory}${fileName}`;
        
        // Download the image first
        const download = await FileSystem.downloadAsync(uri, fileUri);
        
        // Then save to media library
        await MediaLibrary.saveToLibraryAsync(download.uri);
      }

      Alert.alert('Success', 'Resume saved to your gallery!');
    } catch (error) {
      console.error('Error saving resume:', error);
      Alert.alert(
        'Error', 
        'Failed to save resume. Please try again.\n' 
      );
    } finally {
      setIsSaving(false);
    }
  };

  const handleShareResume = async () => {
    if (!resumeRef.current) return;

    try {
      const uri = await captureRef(resumeRef, {
        format: 'png',
        quality: 1,
      });

      if (!(await Sharing.isAvailableAsync())) {
        Alert.alert('Sharing not available', 'Sharing is not available on your platform');
        return;
      }

      await Sharing.shareAsync(uri);
    } catch (error) {
      console.error('Error sharing resume:', error);
      Alert.alert('Error', 'Failed to share resume. Please try again.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ResumeEditor formData={formData} setFormData={setFormData} />
      
      <View style={styles.previewContainer}>
        <View ref={resumeRef} collapsable={false}>
          <ResumeTemplate data={formData} />
        </View>
      </View>
      
      <View style={styles.buttonContainer}>
        {isSaving ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <>
            <View style={styles.buttonSpacer}>
              <Button title="Save to Gallery" onPress={handleSaveResume} />
            </View>
            <View style={styles.buttonSpacer}>
              <Button title="Share Resume" onPress={handleShareResume} />
            </View>
          </>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 40,
  },
  previewContainer: {
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    overflow: 'hidden',
  },
  buttonContainer: {
    marginTop: 20,
    marginBottom: 40,
  },
  buttonSpacer: {
    marginVertical: 5,
  },
});

export default ResumeBuilder;