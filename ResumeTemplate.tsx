import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, Image } from 'react-native';
import { MaterialIcons, FontAwesome, Ionicons, Entypo } from '@expo/vector-icons';

type Project = {
  title: string;
  line1: string;
  line2: string;
  deployedLink: string;
};

type Education = {
  degree: string;
  institution: string;
  year: string;
  grade: string;
};

type FormData = {
  profile: {
    name: string;
    about: string;
    email: string;
    phone: string;
    address: string;
    github: string;
    linkedin: string;
    profileImage: string;
  };
  projects: Project[];
  education: Education[];
  skills: string[];
  achievements: string[];
  coursework: string[];
};

type ResumeTemplateProps = {
  data: FormData;
};

const { width } = Dimensions.get('window');

const ResumeTemplate = ({ data }: ResumeTemplateProps) => {
  if (!data) return <Text>No data available</Text>;

  const { profile, projects, education, skills, achievements, coursework } = data;

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        {/* Left Sidebar (40% width) */}
        <View style={styles.sidebar}>
          {/* Profile Image */}
          {profile.profileImage ? (
            <Image source={{ uri: profile.profileImage }} style={styles.profileImage} />
          ) : null}

          {/* Name */}
          <Text style={styles.name}>{profile.name}</Text>

          {/* About section without heading */}
          <View style={styles.section}>
            <Text style={styles.sidebarText}>{profile.about}</Text>
          </View>

          {/* Contact Info without heading */}
          <View style={[styles.section, styles.contactSection]}>
            <View style={styles.contactItem}>
              <MaterialIcons name="email" size={12} color="#ecf0f1" />
              <Text style={styles.sidebarText}>{profile.email}</Text>
            </View>
            <View style={styles.contactItem}>
              <MaterialIcons name="phone" size={12} color="#ecf0f1" />
              <Text style={styles.sidebarText}>{profile.phone}</Text>
            </View>
            <View style={styles.contactItem}>
              <Entypo name="location-pin" size={12} color="#ecf0f1" />
              <Text style={styles.sidebarText}>{profile.address}</Text>
            </View>
            <View style={styles.contactItem}>
              <FontAwesome name="linkedin" size={12} color="#ecf0f1" />
              <Text style={styles.sidebarText}>{profile.linkedin}</Text>
            </View>
            <View style={styles.contactItem}>
              <FontAwesome name="github" size={12} color="#ecf0f1" />
              <Text style={styles.sidebarText}>{profile.github}</Text>
            </View>
          </View>

          {/* Skills */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, styles.sidebarSectionTitle]}>SKILLS</Text>
            {skills.map((skill: string, index: number) => (
              <Text key={index} style={styles.sidebarText}>{skill}</Text>
            ))}
          </View>

          {/* Achievements */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, styles.sidebarSectionTitle]}>ACHIEVEMENTS</Text>
            {achievements.map((achievement: string, index: number) => (
              <Text key={index} style={styles.sidebarText}>{achievement}</Text>
            ))}
          </View>
        </View>

        {/* Right Content (60% width) */}
        <View style={styles.mainContent}>
          {/* Projects */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, styles.mainSectionTitle]}>PROJECTS</Text>
            <View style={styles.scrollableContainer}>
              {projects.map((project: Project, index: number) => (
                <View key={index} style={styles.projectItem}>
                  <Text style={styles.projectTitle}>{project.title}</Text>
                  <Text style={styles.mainText}>{project.line1}</Text>
                  <Text style={styles.mainText}>{project.line2}</Text>
                  {project.deployedLink && <Text style={styles.mainText}>{project.deployedLink}</Text>}
                </View>
              ))}
            </View>
          </View>

          {/* Education */}
          <View style={[styles.section, styles.educationSection]}>
            <Text style={[styles.sectionTitle, styles.mainSectionTitle]}>EDUCATION</Text>
            <View style={styles.scrollableContainer}>
              {education.map((edu: Education, index: number) => (
                <View key={index} style={styles.educationItem}>
                  <Text style={styles.mainText}>{edu.degree}</Text>
                  <Text style={styles.mainText}>{edu.institution}</Text>
                  <Text style={styles.mainText}>Year: {edu.year}</Text>
                  <Text style={styles.mainText}>Grade: {edu.grade}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Coursework */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, styles.mainSectionTitle]}>COURSEWORK</Text>
            {coursework.map((course: string, index: number) => (
              <Text key={index} style={styles.mainText}>{course}</Text>
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: '#f5f5f5',
  },
  container: {
    flexDirection: 'row',
    minHeight: '100%',
    backgroundColor: 'white',
  },
  sidebar: {
    width: '40%',
    backgroundColor: '#2c3e50', // Dark blue-gray
    padding: 15,
    alignItems: 'center',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: 'white',
    marginBottom: 10,
  },
  mainContent: {
    width: '60%',
    padding: 15,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 15,
    textAlign: 'center',
  },
  section: {
    marginBottom: 15,
    alignSelf: 'stretch',
  },
  educationSection: {
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
    paddingBottom: 3,
  },
  sidebarSectionTitle: {
    color: 'white',
    textAlign: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ecf0f1',
  },
  mainSectionTitle: {
    color: 'black',
    borderBottomWidth: 1,
    borderBottomColor: 'black',
  },
  sidebarText: {
    fontSize: 10,
    color: '#ecf0f1',
    marginBottom: 3,
    textAlign: 'center',
  },
  mainText: {
    fontSize: 12,
    color: '#333',
    marginBottom: 3,
    lineHeight: 18,
  },
  educationItem: {
    marginBottom: 10,
  },
  projectItem: {
    marginBottom: 10,
  },
  projectTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: 'black',
    marginBottom: 3,
  },
  contactSection: {
    marginBottom: 20,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
    justifyContent: 'center',
  },
  scrollableContainer: {
    flex: 1,
  },
});

export default ResumeTemplate;