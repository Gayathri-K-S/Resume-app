// import React, { useState } from 'react';
// import { View, TextInput, Button, Text, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
// import * as ImagePicker from 'expo-image-picker';

// // Define the types
// type Project = {
//   title: string;
//   line1: string;
//   line2: string;
//   deployedLink: string;
// };

// type Education = {
//   degree: string;
//   institution: string;
//   year: string;
//   grade: string;
// };

// type FormData = {
//   profile: {
//     name: string;
//     about: string;
//     email: string;
//     phone: string;
//     address: string;
//     github: string;
//     linkedin: string;
//     profileImage: string;
//   };
//   projects: Project[];
//   education: Education[];
//   skills: string[];
//   achievements: string[];
//   coursework: string[];
// };

// type ResumeEditorProps = {
//   formData: FormData;
//   setFormData: (data: FormData) => void;
// };

// const ResumeEditor: React.FC<ResumeEditorProps> = ({ formData, setFormData }) => {
//   const [activeTab, setActiveTab] = useState<string>('Basic Info');
//   const [activeProject, setActiveProject] = useState<number>(0);
//   const [activeEducation, setActiveEducation] = useState<number>(0);

//   const [localProfile, setLocalProfile] = useState(formData.profile);
//   const [localProjects, setLocalProjects] = useState(formData.projects);
//   const [localEducation, setLocalEducation] = useState(formData.education);
//   const [localSkills, setLocalSkills] = useState(formData.skills);
//   const [localAchievements, setLocalAchievements] = useState(formData.achievements);
//   const [localCoursework, setLocalCoursework] = useState(formData.coursework);

//   const handleInputChange = (value: string, section: string, field: string) => {
//     if (section === 'profile') {
//       setLocalProfile({ ...localProfile, [field]: value });
//     }
//   };

//   const handleArrayChange = (value: string, section: string, index: number, field?: string) => {
//     if (section === 'projects') {
//       const updatedProjects = [...localProjects];
//       updatedProjects[index][field as keyof Project] = value; // Type assertion
//       setLocalProjects(updatedProjects);
//     } else if (section === 'education') {
//       const updatedEducation = [...localEducation];
//       updatedEducation[index][field as keyof Education] = value; // Type assertion
//       setLocalEducation(updatedEducation);
//     } else if (section === 'skills') {
//       const updatedSkills = [...localSkills];
//       updatedSkills[index] = value;
//       setLocalSkills(updatedSkills);
//     } else if (section === 'achievements') {
//       const updatedAchievements = [...localAchievements];
//       updatedAchievements[index] = value;
//       setLocalAchievements(updatedAchievements);
//     } else if (section === 'coursework') {
//       const updatedCoursework = [...localCoursework];
//       updatedCoursework[index] = value;
//       setLocalCoursework(updatedCoursework);
//     }
//   };

//   const addNewProject = () => {
//     setLocalProjects([...localProjects, { title: '', line1: '', line2: '', deployedLink: '' }]);
//     setActiveProject(localProjects.length);
//   };

//   const removeProject = (index: number) => {
//     if (localProjects.length > 1) {
//       const updatedProjects = localProjects.filter((_, i) => i !== index);
//       setLocalProjects(updatedProjects);
//       setActiveProject(0);
//     }
//   };

//   const addNewEducation = () => {
//     setLocalEducation([...localEducation, { degree: '', institution: '', year: '', grade: '' }]);
//     setActiveEducation(localEducation.length);
//   };

//   const removeEducation = (index: number) => {
//     if (localEducation.length > 1) {
//       const updatedEducation = localEducation.filter((_, i) => i !== index);
//       setLocalEducation(updatedEducation);
//       setActiveEducation(0);
//     }
//   };

//   const handleSave = (section: string) => {
//     if (section === 'profile') {
//       setFormData({ ...formData, profile: localProfile });
//     } else if (section === 'projects') {
//       setFormData({ ...formData, projects: localProjects });
//     } else if (section === 'education') {
//       setFormData({ ...formData, education: localEducation });
//     } else if (section === 'skills') {
//       setFormData({ ...formData, skills: localSkills });
//     } else if (section === 'achievements') {
//       setFormData({ ...formData, achievements: localAchievements });
//     } else if (section === 'coursework') {
//       setFormData({ ...formData, coursework: localCoursework });
//     }
//   };

//   const pickImage = async () => {
//     // Request permission to access the media library
//     const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
//     if (status !== 'granted') {
//       alert('Sorry, we need camera roll permissions to upload an image!');
//       return;
//     }

//     // Launch the image picker
//     const result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsEditing: true,
//       aspect: [1, 1], // Square aspect ratio
//       quality: 1,
//     });

//     if (!result.canceled) {
//       // Update the local profile state with the selected image URI
//       setLocalProfile({ ...localProfile, profileImage: result.assets[0].uri });
//     }
//   };

//   return (
//     <ScrollView contentContainerStyle={styles.scrollContainer}>
//       <Text style={styles.heading}>BUILD YOUR RESUME HERE</Text>
//       {/* Horizontal Scrollable Tabs */}
//       <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabsContainer}>
//         <View style={styles.tabs}>
//           {['Basic Info', 'Projects', 'Education', 'Skills', 'Achievements', 'Coursework'].map((tab) => (
//             <TouchableOpacity
//               key={tab}
//               style={[styles.tabButton, activeTab === tab && styles.activeTab]}
//               onPress={() => setActiveTab(tab)}
//             >
//               <Text style={styles.tabText}>{tab}</Text>
//             </TouchableOpacity>
//           ))}
//         </View>
//       </ScrollView>
//       <View style={styles.tabContent}>
//         {activeTab === 'Basic Info' && (
//           <View style={styles.section}>
//             <TextInput
//               style={styles.input}
//               placeholder="Name"
//               value={localProfile.name}
//               onChangeText={(text) => handleInputChange(text, 'profile', 'name')}
//             />
//             <TextInput
//               style={styles.input}
//               placeholder="About"
//               value={localProfile.about}
//               onChangeText={(text) => handleInputChange(text, 'profile', 'about')}
//             />
//             <TextInput
//               style={styles.input}
//               placeholder="Email"
//               value={localProfile.email}
//               onChangeText={(text) => handleInputChange(text, 'profile', 'email')}
//             />
//             <TextInput
//               style={styles.input}
//               placeholder="Phone"
//               value={localProfile.phone}
//               onChangeText={(text) => handleInputChange(text, 'profile', 'phone')}
//             />
//             <TextInput
//               style={styles.input}
//               placeholder="Address"
//               value={localProfile.address}
//               onChangeText={(text) => handleInputChange(text, 'profile', 'address')}
//             />
//             <TextInput
//               style={styles.input}
//               placeholder="GitHub Link"
//               value={localProfile.github}
//               onChangeText={(text) => handleInputChange(text, 'profile', 'github')}
//             />
//             <TextInput
//               style={styles.input}
//               placeholder="LinkedIn Link"
//               value={localProfile.linkedin}
//               onChangeText={(text) => handleInputChange(text, 'profile', 'linkedin')}
//             />
//             {/* Profile Image Upload */}
//             <View style={styles.profileImageContainer}>
//               {localProfile.profileImage ? (
//                 <Image source={{ uri: localProfile.profileImage }} style={styles.profileImage} />
//               ) : (
//                 <Text>No profile image selected</Text>
//               )}
//               <Button title="Upload Profile Image" onPress={pickImage} />
//             </View>
//             <Button title="Save" onPress={() => handleSave('profile')} />
//           </View>
//         )}
//         {activeTab === 'Projects' && (
//           <View style={styles.section}>
//             <Text style={styles.subHeading}>Projects</Text>
//             <View style={styles.tabs}>
//               {localProjects.map((project, index) => (
//                 <TouchableOpacity
//                   key={index}
//                   style={[styles.tabButton, activeProject === index && styles.activeTab]}
//                   onPress={() => setActiveProject(index)}
//                 >
//                   <Text style={styles.tabText}>{project.title || `Project ${index + 1}`}</Text>
//                 </TouchableOpacity>
//               ))}
//               <Button title="+ New" onPress={addNewProject} />
//             </View>
//             {localProjects.length > 0 && localProjects[activeProject] && (
//               <View style={styles.card}>
//                 <TextInput
//                   style={styles.input}
//                   placeholder="Title"
//                   value={localProjects[activeProject].title}
//                   onChangeText={(text) => handleArrayChange(text, 'projects', activeProject, 'title')}
//                 />
//                 <TextInput
//                   style={styles.input}
//                   placeholder="Line 1 Description"
//                   value={localProjects[activeProject].line1}
//                   onChangeText={(text) => handleArrayChange(text, 'projects', activeProject, 'line1')}
//                 />
//                 <TextInput
//                   style={styles.input}
//                   placeholder="Line 2 Description"
//                   value={localProjects[activeProject].line2}
//                   onChangeText={(text) => handleArrayChange(text, 'projects', activeProject, 'line2')}
//                 />
//                 <TextInput
//                   style={styles.input}
//                   placeholder="Deployment Link"
//                   value={localProjects[activeProject].deployedLink}
//                   onChangeText={(text) => handleArrayChange(text, 'projects', activeProject, 'deployedLink')}
//                 />
//                 <Button title="Delete" onPress={() => removeProject(activeProject)} />
//               </View>
//             )}
//             <Button title="Save" onPress={() => handleSave('projects')} />
//           </View>
//         )}
//         {activeTab === 'Education' && (
//           <View style={styles.section}>
//             <Text style={styles.subHeading}>Education</Text>
//             <View style={styles.tabs}>
//               {localEducation.map((edu, index) => (
//                 <TouchableOpacity
//                   key={index}
//                   style={[styles.tabButton, activeEducation === index && styles.activeTab]}
//                   onPress={() => setActiveEducation(index)}
//                 >
//                   <Text style={styles.tabText}>{edu.degree || `Education ${index + 1}`}</Text>
//                 </TouchableOpacity>
//               ))}
//               <Button title="+ New" onPress={addNewEducation} />
//             </View>
//             {localEducation.length > 0 && localEducation[activeEducation] && (
//               <View style={styles.card}>
//                 <TextInput
//                   style={styles.input}
//                   placeholder="Degree"
//                   value={localEducation[activeEducation].degree}
//                   onChangeText={(text) => handleArrayChange(text, 'education', activeEducation, 'degree')}
//                 />
//                 <TextInput
//                   style={styles.input}
//                   placeholder="Institution"
//                   value={localEducation[activeEducation].institution}
//                   onChangeText={(text) => handleArrayChange(text, 'education', activeEducation, 'institution')}
//                 />
//                 <TextInput
//                   style={styles.input}
//                   placeholder="Year"
//                   value={localEducation[activeEducation].year}
//                   onChangeText={(text) => handleArrayChange(text, 'education', activeEducation, 'year')}
//                 />
//                 <TextInput
//                   style={styles.input}
//                   placeholder="Grade"
//                   value={localEducation[activeEducation].grade}
//                   onChangeText={(text) => handleArrayChange(text, 'education', activeEducation, 'grade')}
//                 />
//                 <Button title="Delete" onPress={() => removeEducation(activeEducation)} />
//               </View>
//             )}
//             <Button title="Save" onPress={() => handleSave('education')} />
//           </View>
//         )}
//         {activeTab === 'Skills' && (
//           <View style={styles.section}>
//             <Text style={styles.subHeading}>Skills</Text>
//             {localSkills.map((skill, index) => (
//               <TextInput
//                 key={index}
//                 style={styles.input}
//                 placeholder={`Skill ${index + 1}`}
//                 value={skill}
//                 onChangeText={(text) => handleArrayChange(text, 'skills', index)}
//               />
//             ))}
//             <Button title="Save" onPress={() => handleSave('skills')} />
//           </View>
//         )}
//         {activeTab === 'Achievements' && (
//           <View style={styles.section}>
//             <Text style={styles.subHeading}>Achievements</Text>
//             {localAchievements.map((achievement, index) => (
//               <TextInput
//                 key={index}
//                 style={styles.input}
//                 placeholder={`Achievement ${index + 1}`}
//                 value={achievement}
//                 onChangeText={(text) => handleArrayChange(text, 'achievements', index)}
//               />
//             ))}
//             <Button title="Save" onPress={() => handleSave('achievements')} />
//           </View>
//         )}
//         {activeTab === 'Coursework' && (
//           <View style={styles.section}>
//             <Text style={styles.subHeading}>Coursework</Text>
//             {localCoursework.map((course, index) => (
//               <TextInput
//                 key={index}
//                 style={styles.input}
//                 placeholder={`Coursework ${index + 1}`}
//                 value={course}
//                 onChangeText={(text) => handleArrayChange(text, 'coursework', index)}
//               />
//             ))}
//             <Button title="Save" onPress={() => handleSave('coursework')} />
//           </View>
//         )}
//       </View>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   scrollContainer: {
//     flexGrow: 1,
//     padding: 20,
//   },
//   heading: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   tabsContainer: {
//     marginBottom: 20,
//   },
//   tabs: {
//     flexDirection: 'row',
//   },
//   tabButton: {
//     padding: 10,
//     borderRadius: 5,
//     marginRight: 10,
//   },
//   activeTab: {
//     backgroundColor: '#007bff',
//   },
//   tabText: {
//     color: '#000',
//   },
//   tabContent: {
//     flex: 1,
//   },
//   section: {
//     marginBottom: 20,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     padding: 10,
//     marginBottom: 10,
//     borderRadius: 5,
//   },
//   profileImageContainer: {
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   profileImage: {
//     width: 100,
//     height: 100,
//     borderRadius: 50,
//     marginBottom: 10,
//   },
//   subHeading: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   card: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     padding: 10,
//     marginBottom: 10,
//   },
// });
// export default ResumeEditor;
import React, { useState } from 'react';
import { View, TextInput, Button, Text, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { MaterialIcons } from '@expo/vector-icons';

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

type ResumeEditorProps = {
  formData: FormData;
  setFormData: (data: FormData) => void;
};

const ResumeEditor: React.FC<ResumeEditorProps> = ({ formData, setFormData }) => {
  const [activeTab, setActiveTab] = useState<string>('Basic Info');
  const [activeProject, setActiveProject] = useState<number>(0);
  const [activeEducation, setActiveEducation] = useState<number>(0);

  const [localProfile, setLocalProfile] = useState(formData.profile);
  const [localProjects, setLocalProjects] = useState(formData.projects);
  const [localEducation, setLocalEducation] = useState(formData.education);
  const [localSkills, setLocalSkills] = useState(formData.skills);
  const [localAchievements, setLocalAchievements] = useState(formData.achievements);
  const [localCoursework, setLocalCoursework] = useState(formData.coursework);

  const handleInputChange = (value: string, section: string, field: string) => {
    if (section === 'profile') {
      setLocalProfile({ ...localProfile, [field]: value });
    }
  };

  const handleArrayChange = (value: string, section: string, index: number, field?: string) => {
    if (section === 'projects') {
      const updatedProjects = [...localProjects];
      updatedProjects[index][field as keyof Project] = value;
      setLocalProjects(updatedProjects);
    } else if (section === 'education') {
      const updatedEducation = [...localEducation];
      updatedEducation[index][field as keyof Education] = value;
      setLocalEducation(updatedEducation);
    } else if (section === 'skills') {
      const updatedSkills = [...localSkills];
      updatedSkills[index] = value;
      setLocalSkills(updatedSkills);
    } else if (section === 'achievements') {
      const updatedAchievements = [...localAchievements];
      updatedAchievements[index] = value;
      setLocalAchievements(updatedAchievements);
    } else if (section === 'coursework') {
      const updatedCoursework = [...localCoursework];
      updatedCoursework[index] = value;
      setLocalCoursework(updatedCoursework);
    }
  };

  const addNewProject = () => {
    setLocalProjects([...localProjects, { title: '', line1: '', line2: '', deployedLink: '' }]);
    setActiveProject(localProjects.length);
  };

  const removeProject = (index: number) => {
    if (localProjects.length > 1) {
      const updatedProjects = localProjects.filter((_, i) => i !== index);
      setLocalProjects(updatedProjects);
      setActiveProject(Math.min(activeProject, updatedProjects.length - 1));
    }
  };

  const addNewEducation = () => {
    setLocalEducation([...localEducation, { degree: '', institution: '', year: '', grade: '' }]);
    setActiveEducation(localEducation.length);
  };

  const removeEducation = (index: number) => {
    if (localEducation.length > 1) {
      const updatedEducation = localEducation.filter((_, i) => i !== index);
      setLocalEducation(updatedEducation);
      setActiveEducation(Math.min(activeEducation, updatedEducation.length - 1));
    }
  };

  const handleSave = (section: string) => {
    if (section === 'profile') {
      setFormData({ ...formData, profile: localProfile });
    } else if (section === 'projects') {
      setFormData({ ...formData, projects: localProjects });
    } else if (section === 'education') {
      setFormData({ ...formData, education: localEducation });
    } else if (section === 'skills') {
      setFormData({ ...formData, skills: localSkills });
    } else if (section === 'achievements') {
      setFormData({ ...formData, achievements: localAchievements });
    } else if (section === 'coursework') {
      setFormData({ ...formData, coursework: localCoursework });
    }
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to upload an image!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setLocalProfile({ ...localProfile, profileImage: result.assets[0].uri });
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Text style={styles.heading}>BUILD YOUR RESUME HERE</Text>
      
      {/* Main Tabs */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabsContainer}>
        <View style={styles.tabs}>
          {['Basic Info', 'Projects', 'Education', 'Skills', 'Achievements', 'Coursework'].map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[styles.tabButton, activeTab === tab && styles.activeTab]}
              onPress={() => setActiveTab(tab)}
            >
              <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>{tab}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <View style={styles.tabContent}>
        {activeTab === 'Basic Info' && (
          <View style={styles.section}>
            <TextInput
              style={styles.input}
              placeholder="Name"
              value={localProfile.name}
              onChangeText={(text) => handleInputChange(text, 'profile', 'name')}
            />
            <TextInput
              style={styles.input}
              placeholder="About"
              value={localProfile.about}
              onChangeText={(text) => handleInputChange(text, 'profile', 'about')}
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={localProfile.email}
              onChangeText={(text) => handleInputChange(text, 'profile', 'email')}
            />
            <TextInput
              style={styles.input}
              placeholder="Phone"
              value={localProfile.phone}
              onChangeText={(text) => handleInputChange(text, 'profile', 'phone')}
            />
            <TextInput
              style={styles.input}
              placeholder="Address"
              value={localProfile.address}
              onChangeText={(text) => handleInputChange(text, 'profile', 'address')}
            />
            <TextInput
              style={styles.input}
              placeholder="GitHub Link"
              value={localProfile.github}
              onChangeText={(text) => handleInputChange(text, 'profile', 'github')}
            />
            <TextInput
              style={styles.input}
              placeholder="LinkedIn Link"
              value={localProfile.linkedin}
              onChangeText={(text) => handleInputChange(text, 'profile', 'linkedin')}
            />
            <View style={styles.profileImageContainer}>
              {localProfile.profileImage ? (
                <Image source={{ uri: localProfile.profileImage }} style={styles.profileImage} />
              ) : (
                <Text>No profile image selected</Text>
              )}
              <Button title="Upload Profile Image" onPress={pickImage} />
            </View>
            <Button title="Save" onPress={() => handleSave('profile')} />
          </View>
        )}

        {activeTab === 'Projects' && (
          <View style={styles.section}>
            <Text style={styles.subHeading}>Projects</Text>
            <View style={styles.scrollableTabContainer}>
              <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.scrollableTabContent}
              >
                {localProjects.map((project, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.nestedTabButton,
                      activeProject === index && styles.activeNestedTab
                    ]}
                    onPress={() => setActiveProject(index)}
                  >
                    <Text style={styles.nestedTabText}>
                      {project.title || `Project ${index + 1}`}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
              <TouchableOpacity
                style={styles.addButton}
                onPress={addNewProject}
              >
                <Text style={styles.addButtonText}>+ New</Text>
              </TouchableOpacity>
            </View>
            
            {localProjects.length > 0 && localProjects[activeProject] && (
              <View style={styles.card}>
                <TextInput
                  style={styles.input}
                  placeholder="Title"
                  value={localProjects[activeProject].title}
                  onChangeText={(text) => handleArrayChange(text, 'projects', activeProject, 'title')}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Line 1 Description"
                  value={localProjects[activeProject].line1}
                  onChangeText={(text) => handleArrayChange(text, 'projects', activeProject, 'line1')}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Line 2 Description"
                  value={localProjects[activeProject].line2}
                  onChangeText={(text) => handleArrayChange(text, 'projects', activeProject, 'line2')}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Deployment Link"
                  value={localProjects[activeProject].deployedLink}
                  onChangeText={(text) => handleArrayChange(text, 'projects', activeProject, 'deployedLink')}
                />
                <Button 
                  title="Delete" 
                  onPress={() => removeProject(activeProject)} 
                  color="#ff4444"
                />
              </View>
            )}
            <Button title="Save Projects" onPress={() => handleSave('projects')} />
          </View>
        )}

        {activeTab === 'Education' && (
          <View style={styles.section}>
            <Text style={styles.subHeading}>Education</Text>
            <View style={styles.scrollableTabContainer}>
              <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.scrollableTabContent}
              >
                {localEducation.map((edu, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.nestedTabButton,
                      activeEducation === index && styles.activeNestedTab
                    ]}
                    onPress={() => setActiveEducation(index)}
                  >
                    <Text style={styles.nestedTabText}>
                      {edu.degree || `Education ${index + 1}`}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
              <TouchableOpacity
                style={styles.addButton}
                onPress={addNewEducation}
              >
                <Text style={styles.addButtonText}>+ New</Text>
              </TouchableOpacity>
            </View>
            
            {localEducation.length > 0 && localEducation[activeEducation] && (
              <View style={styles.card}>
                <TextInput
                  style={styles.input}
                  placeholder="Degree"
                  value={localEducation[activeEducation].degree}
                  onChangeText={(text) => handleArrayChange(text, 'education', activeEducation, 'degree')}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Institution"
                  value={localEducation[activeEducation].institution}
                  onChangeText={(text) => handleArrayChange(text, 'education', activeEducation, 'institution')}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Year"
                  value={localEducation[activeEducation].year}
                  onChangeText={(text) => handleArrayChange(text, 'education', activeEducation, 'year')}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Grade"
                  value={localEducation[activeEducation].grade}
                  onChangeText={(text) => handleArrayChange(text, 'education', activeEducation, 'grade')}
                />
                <Button 
                  title="Delete" 
                  onPress={() => removeEducation(activeEducation)} 
                  color="#ff4444"
                />
              </View>
            )}
            <Button title="Save Education" onPress={() => handleSave('education')} />
          </View>
        )}

        {activeTab === 'Skills' && (
          <View style={styles.section}>
            <Text style={styles.subHeading}>Skills</Text>
            {localSkills.map((skill, index) => (
              <TextInput
                key={index}
                style={styles.input}
                placeholder={`Skill ${index + 1}`}
                value={skill}
                onChangeText={(text) => handleArrayChange(text, 'skills', index)}
              />
            ))}
            <Button title="Save Skills" onPress={() => handleSave('skills')} />
          </View>
        )}

        {activeTab === 'Achievements' && (
          <View style={styles.section}>
            <Text style={styles.subHeading}>Achievements</Text>
            {localAchievements.map((achievement, index) => (
              <TextInput
                key={index}
                style={styles.input}
                placeholder={`Achievement ${index + 1}`}
                value={achievement}
                onChangeText={(text) => handleArrayChange(text, 'achievements', index)}
              />
            ))}
            <Button title="Save Achievements" onPress={() => handleSave('achievements')} />
          </View>
        )}

        {activeTab === 'Coursework' && (
          <View style={styles.section}>
            <Text style={styles.subHeading}>Coursework</Text>
            {localCoursework.map((course, index) => (
              <TextInput
                key={index}
                style={styles.input}
                placeholder={`Coursework ${index + 1}`}
                value={course}
                onChangeText={(text) => handleArrayChange(text, 'coursework', index)}
              />
            ))}
            <Button title="Save Coursework" onPress={() => handleSave('coursework')} />
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  tabsContainer: {
    marginBottom: 20,
  },
  tabs: {
    flexDirection: 'row',
  },
  tabButton: {
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
    backgroundColor: '#e0e0e0',
  },
  activeTab: {
    backgroundColor: '#007bff',
  },
  tabText: {
    color: '#333',
  },
  activeTabText: {
    color: '#fff',
  },
  tabContent: {
    flex: 1,
  },
  section: {
    marginBottom: 20,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 5,
    elevation: 2,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  profileImageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  subHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  card: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 15,
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: '#f9f9f9',
  },
  scrollableTabContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  scrollableTabContent: {
    paddingRight: 10,
  },
  nestedTabButton: {
    padding: 8,
    borderRadius: 5,
    marginRight: 8,
    backgroundColor: '#e0e0e0',
  },
  activeNestedTab: {
    backgroundColor: '#007bff',
  },
  nestedTabText: {
    color: '#333',
    fontSize: 14,
  },
  addButton: {
    padding: 8,
    borderRadius: 5,
    backgroundColor: '#4caf50',
    marginLeft: 5,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 14,
  },
});

export default ResumeEditor;