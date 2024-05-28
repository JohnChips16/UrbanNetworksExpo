import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, TextInput, Button, StyleSheet } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage"
const EditModal = ({ operation }) => {
  const [isOpen, setIsOpen] = useState(false);
 const [id, setId] = useState('');
  const [schoolOrUniversity, setSchoolOrUniversity] = useState('');
  const [degree, setDegree] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [startYear, setStartYear] = useState('');
  const [graduatedYear, setGraduatedYear] = useState('');
const [title, setTitle] = useState('');
const [associatedWith, setAssociatedWith] = useState('');
const [issuer, setIssuer] = useState('');
const [date, setDate] = useState('');
const [desc, setDesc] = useState('');
const [certName, setCertName] = useState('');
const [certAuthority, setCertAuthority] = useState('');
const [licenseNum, setLicenseNum] = useState('');
const [expire, setExpire] = useState('');
const [dateFrom, setDateFrom] = useState('');
const [dateThen, setDateThen] = useState('');
const [licenseUrl, setLicenseUrl] = useState('');
const [user, setUser] = useState('');
const [orgName, setOrgName] = useState('');
const [positionHeld, setPositionHeld] = useState('');
const [associatedCollegeEtc, setAssociatedCollegeEtc] = useState('');
const [current, setCurrent] = useState('');
const [ongoing, setOngoing] = useState('');
const [description, setDescription] = useState('');
const [language, setLanguage] = useState('');
const [proficiency, setProficiency] = useState('');
const [projectName, setProjectName] = useState('');
const [ongoingProject, setOngoingProject] = useState('');
const [dateNow, setDateNow] = useState('');
const [associateName, setAssociateName] = useState('');
const [associateWith, setAssociateWith] = useState('');
const [projectUrl, setProjectUrl] = useState('');
const [publisher, setPublisher] = useState('');
const [pubDate, setPubDate] = useState('');
const [authors, setAuthors] = useState('');
const [pubUrl, setPubUrl] = useState('');
const [testName, setTestName] = useState('');
const [score, setScore] = useState('');
const [testDate, setTestDate] = useState('');
const [attachment, setAttachment] = useState('');
const [skill, setSkill] = useState('');


  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };
  
const handleSubmit = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    
    const body = {};

if (operation === 'Ed') {
  // Only include non-empty fields in the body
  if (id) body.id = id;
  if (schoolOrUniversity) body.schoolOrUniversity = schoolOrUniversity;
  if (degree) body.degree = degree;
  if (specialization) body.specialization = specialization;
  if (startYear) body.startYear = startYear;
  if (graduatedYear) body.graduatedYear = graduatedYear;
} else if (operation === 'Awrd') {
  // Only include non-empty fields in the body
  if (id) body.id = id;
  if (title) body.title = title;
  if (associatedWith) body.associatedWith = associatedWith;
  if (issuer) body.issuer = issuer;
  if (date) body.date = date;
  if (desc) body.desc = desc;
} else if (operation === 'cert') {
   

  // Only include non-empty fields in the body
  if (id) body.id = id;
  if (certName) body.certName = certName;
  if (certAuthority) body.certAuthority = certAuthority;
  if (licenseNum) body.licenseNum = licenseNum;
  if (expire) body.expire = expire;
  if (dateFrom) body.dateFrom = dateFrom;
  if (dateThen) body.dateThen = dateThen;
  if (licenseUrl) body.licenseUrl = licenseUrl;
} else if (operation === 'lang') {
  

  // Only include non-empty fields in the body
  if (id) body.id = id;
  if (language) body.language = language;
  if (proficiency) body.proficiency = proficiency;
} else if (operation === 'org') {
  

  // Only include non-empty fields in the body
  if (id) body.id = id;
  if (orgName) body.orgName = orgName;
  if (positionHeld) body.positionHeld = positionHeld;
  if (associatedCollegeEtc) body.associatedCollegeEtc = associatedCollegeEtc;
  if (current !== null && current !== undefined) body.current = current;
  if (dateFrom) body.dateFrom = dateFrom;
  if (dateThen) body.dateThen = dateThen;
  if (ongoing !== null && ongoing !== undefined) body.ongoing = ongoing;
  if (description) body.description = description;
} else if (operation === 'proj') {
  

  // Only include non-empty fields in the body
  if (id) body.id = id;
  if (projectName) body.projectName = projectName;
  if (ongoingProject !== null && ongoingProject !== undefined) body.ongoingProject = ongoingProject;
  if (dateNow) body.dateNow = dateNow;
  if (dateThen) body.dateThen = dateThen;
  if (associateName.length > 0) body.associateName = associateName;
  if (associateWith) body.associateWith = associateWith;
  if (projectUrl) body.projectUrl = projectUrl;
  if (desc) body.desc = desc;
} else if (operation === 'pub') {
  

  // Only include non-empty fields in the body
  if (id) body.id = id;
  if (title) body.title = title;
  if (publisher) body.publisher = publisher;
  if (pubDate) body.pubDate = pubDate;
  if (authors.length > 0) body.authors = authors;
  if (pubUrl) body.pubUrl = pubUrl;
  if (desc) body.desc = desc;
} else if (operation === 'score') {
  

  // Only include non-empty fields in the body
  if (id) body.id = id;
  if (testName) body.testName = testName;
  if (associatedWith) body.associatedWith = associatedWith;
  if (!isNaN(score)) body.score = score;
  if (testDate) body.testDate = testDate;
  if (desc) body.desc = desc;
} else if (operation === 'external') {
  

  // Only include non-empty fields in the body
  if (id) body.id = id;
  if (description) body.description = description;
  if (attachment) body.attachment = attachment;
} else if (operation === 'skill') {
  

  // Only include non-empty fields in the body
  if (id) body.id = id;
  if (skill) body.skill = skill;
  if (description) body.description = description;
}

    const response = await fetch(`http://localhost:9000/v1/users/edit/attachment?operation=${operation}&id=${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json', // Set content type as application/json
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(body), // Convert body to JSON string
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    console.log(body); // Log the body
    closeModal();
  } catch (error) {
    console.error('Error:', error);
  }
};

  return (
    <View>
      <TouchableOpacity onPress={openModal}>
        <Text>Edit</Text>
      </TouchableOpacity>
    <Modal visible={isOpen} animationType="slide">
  <View >
    <TouchableOpacity onPress={closeModal}>
      <Text style={{marginLeft:15, paddingBottom:15, marginTop:25, borderBottomWidth:0.5, borderColor:'#ccc'}}>Close</Text>
    </TouchableOpacity>
    <TextInput
      value={id}
      onChangeText={setId}
      placeholder="ID"
      style={{borderWidth:0.5, marginLeft:15, marginRight:25, marginTop:15,padding:5, borderColor:'#bbb', backgroundColor:'#eee'}}
      
    />
    {operation === 'Ed' && (
      <>
        <TextInput
          value={schoolOrUniversity}
          onChangeText={setSchoolOrUniversity}
          placeholder="School/University"
          style={{borderWidth:0.5, marginLeft:15, marginRight:25, marginTop:15,padding:5, borderColor:'#bbb', backgroundColor:'#eee'}}
        />
        <TextInput
          value={degree}
          onChangeText={setDegree}
          placeholder="Degree"
          style={{borderWidth:0.5, marginLeft:15, marginRight:25, marginTop:15,padding:5, borderColor:'#bbb', backgroundColor:'#eee'}}
        />
        <TextInput
          value={specialization}
          onChangeText={setSpecialization}
          placeholder="Specialization"
          style={{borderWidth:0.5, marginLeft:15, marginRight:25, marginTop:15,padding:5, borderColor:'#bbb', backgroundColor:'#eee'}}
        />
        <TextInput
          value={startYear}
          onChangeText={setStartYear}
          placeholder="Start Year"
          style={{borderWidth:0.5, marginLeft:15, marginRight:25, marginTop:15,padding:5, borderColor:'#bbb', backgroundColor:'#eee'}}
        />
        <TextInput
          value={graduatedYear}
          onChangeText={setGraduatedYear}
          placeholder="Graduated Year"
          style={{borderWidth:0.5, marginLeft:15, marginRight:25, marginTop:15,padding:5, borderColor:'#bbb', backgroundColor:'#eee'}}
        />
      </>
    )}
   {operation === 'Awrd' && (
  <>
    <TextInput
      value={title}
      onChangeText={setTitle}
      placeholder="Award Title"
      style={{borderWidth:0.5, marginLeft:15, marginRight:25, marginTop:15,padding:5, borderColor:'#bbb', backgroundColor:'#eee'}}
    />
    <TextInput
      value={associatedWith}
      onChangeText={setAssociatedWith}
      placeholder="Associated With"
      style={{borderWidth:0.5, marginLeft:15, marginRight:25, marginTop:15,padding:5, borderColor:'#bbb', backgroundColor:'#eee'}}
    />
    <TextInput
      value={issuer}
      onChangeText={setIssuer}
      placeholder="Issuer"
      style={{borderWidth:0.5, marginLeft:15, marginRight:25, marginTop:15,padding:5, borderColor:'#bbb', backgroundColor:'#eee'}}
    />
    {/* Assuming date is a string */}
    <TextInput
      value={date}
      onChangeText={setDate}
      placeholder="Date"
      style={{borderWidth:0.5, marginLeft:15, marginRight:25, marginTop:15,padding:5, borderColor:'#bbb', backgroundColor:'#eee'}}
    />
    <TextInput
      value={desc}
      onChangeText={setDesc}
      placeholder="Description"
      style={{borderWidth:0.5, marginLeft:15, marginRight:25, marginTop:15,padding:5, borderColor:'#bbb', backgroundColor:'#eee'}}
    />
  </>
)}
{operation === 'cert' && (
  <>
    <TextInput
      value={certName}
      onChangeText={setCertName}
      placeholder="Certificate Name"
      style={{borderWidth:0.5, marginLeft:15, marginRight:25, marginTop:15,padding:5, borderColor:'#bbb', backgroundColor:'#eee'}}
    />
    <TextInput
      value={certAuthority}
      onChangeText={setCertAuthority}
      placeholder="Certificate Authority"
      style={{borderWidth:0.5, marginLeft:15, marginRight:25, marginTop:15,padding:5, borderColor:'#bbb', backgroundColor:'#eee'}}
    />
    <TextInput
      value={licenseNum}
      onChangeText={setLicenseNum}
      placeholder="License Number"
      style={{borderWidth:0.5, marginLeft:15, marginRight:25, marginTop:15,padding:5, borderColor:'#bbb', backgroundColor:'#eee'}}
    />
    {/* Assuming expire is a boolean */}
    <TextInput
      value={expire.toString()} // Convert boolean to string for TextInput
      onChangeText={(text) => setExpire(text === 'true')} // Convert string to boolean for state
      placeholder="Expire (true/false)"
      style={{borderWidth:0.5, marginLeft:15, marginRight:25, marginTop:15,padding:5, borderColor:'#bbb', backgroundColor:'#eee'}}
    />
    {/* Assuming dateFrom and dateThen are Date objects */}
    <TextInput
      value={dateFrom ? dateFrom.toDateString() : ''} // Convert Date to string for TextInput
      onChangeText={(text) => setDateFrom(new Date(text))} // Convert string to Date for state
      placeholder="Date From (YYYY-MM-DD)"
      style={{borderWidth:0.5, marginLeft:15, marginRight:25, marginTop:15,padding:5, borderColor:'#bbb', backgroundColor:'#eee'}}
    />
    <TextInput
      value={dateThen ? dateThen.toDateString() : ''}
      onChangeText={(text) => setDateThen(new Date(text))}
      placeholder="Date Then (YYYY-MM-DD)"
      style={{borderWidth:0.5, marginLeft:15, marginRight:25, marginTop:15,padding:5, borderColor:'#bbb', backgroundColor:'#eee'}}
    />
    <TextInput
      value={licenseUrl}
      onChangeText={setLicenseUrl}
      placeholder="License URL"
      style={{borderWidth:0.5, marginLeft:15, marginRight:25, marginTop:15,padding:5, borderColor:'#bbb', backgroundColor:'#eee'}}
    />
  </>
)}
{operation === 'lang' && (
  <>
    <TextInput
      value={language}
      onChangeText={setLanguage}
      placeholder="Language"
      style={{borderWidth:0.5, marginLeft:15, marginRight:25, marginTop:15,padding:5, borderColor:'#bbb', backgroundColor:'#eee'}}
    />
    <TextInput
      value={proficiency}
      onChangeText={setProficiency}
      placeholder="Proficiency"
      style={{borderWidth:0.5, marginLeft:15, marginRight:25, marginTop:15,padding:5, borderColor:'#bbb', backgroundColor:'#eee'}}
    />
    {/* Assuming proficiency is selected from a predefined list */}
    {/* You can use a Picker component or a dropdown for selecting proficiency */}
  </>
)}
{operation === 'org' && (
  <>
    <TextInput
      value={orgName}
      onChangeText={setOrgName}
      placeholder="Organization Name"
      style={{borderWidth:0.5, marginLeft:15, marginRight:25, marginTop:15,padding:5, borderColor:'#bbb', backgroundColor:'#eee'}}
    />
    <TextInput
      value={positionHeld}
      onChangeText={setPositionHeld}
      placeholder="Position Held"
      style={{borderWidth:0.5, marginLeft:15, marginRight:25, marginTop:15,padding:5, borderColor:'#bbb', backgroundColor:'#eee'}}
    />
    <TextInput
      value={associatedCollegeEtc}
      onChangeText={setAssociatedCollegeEtc}
      placeholder="Associated College, etc."
      style={{borderWidth:0.5, marginLeft:15, marginRight:25, marginTop:15,padding:5, borderColor:'#bbb', backgroundColor:'#eee'}}
    />
    {/* Assuming current is a boolean */}
    <TextInput
      value={current.toString()} // Convert boolean to string for TextInput
      onChangeText={(text) => setCurrent(text === 'true')} // Convert string to boolean for state
      placeholder="Current (true/false)"
      style={{borderWidth:0.5, marginLeft:15, marginRight:25, marginTop:15,padding:5, borderColor:'#bbb', backgroundColor:'#eee'}}
    />
    {/* Assuming dateFrom and dateThen are strings */}
    <TextInput
      value={dateFrom}
      onChangeText={setDateFrom}
      placeholder="Date From"
      style={{borderWidth:0.5, marginLeft:15, marginRight:25, marginTop:15,padding:5, borderColor:'#bbb', backgroundColor:'#eee'}}
    />
    <TextInput
      value={dateThen}
      onChangeText={setDateThen}
      placeholder="Date Then"
      style={{borderWidth:0.5, marginLeft:15, marginRight:25, marginTop:15,padding:5, borderColor:'#bbb', backgroundColor:'#eee'}}
    />
    {/* Assuming ongoing is a boolean */}
    <TextInput
      value={ongoing.toString()} // Convert boolean to string for TextInput
      onChangeText={(text) => setOngoing(text === 'true')} // Convert string to boolean for state
      placeholder="Ongoing (true/false)"
      style={{borderWidth:0.5, marginLeft:15, marginRight:25, marginTop:15,padding:5, borderColor:'#bbb', backgroundColor:'#eee'}}
    />
    <TextInput
      value={description}
      onChangeText={setDescription}
      placeholder="Description"
      style={{borderWidth:0.5, marginLeft:15, marginRight:25, marginTop:15,padding:5, borderColor:'#bbb', backgroundColor:'#eee'}}
    />
  </>
)}
{operation === 'proj' && (
  <>
    <TextInput
      value={projectName}
      onChangeText={setProjectName}
      placeholder="Project Name"
      style={{borderWidth:0.5, marginLeft:15, marginRight:25, marginTop:15,padding:5, borderColor:'#bbb', backgroundColor:'#eee'}}
    />
    {/* Assuming ongoingProject is a boolean */}
    <TextInput
      value={ongoingProject.toString()} // Convert boolean to string for TextInput
      onChangeText={(text) => setOngoingProject(text === 'true')} // Convert string to boolean for state
      placeholder="Ongoing Project (true/false)"
      style={{borderWidth:0.5, marginLeft:15, marginRight:25, marginTop:15,padding:5, borderColor:'#bbb', backgroundColor:'#eee'}}
    />
    {/* Assuming dateNow and dateThen are Date objects */}
    <TextInput
      value={dateNow ? dateNow.toDateString() : ''} // Convert Date to string for TextInput
      onChangeText={(text) => setDateNow(new Date(text))} // Convert string to Date for state
      placeholder="Date Now (YYYY-MM-DD)"
      style={{borderWidth:0.5, marginLeft:15, marginRight:25, marginTop:15,padding:5, borderColor:'#bbb', backgroundColor:'#eee'}}
    />
    <TextInput
      value={dateThen ? dateThen.toDateString() : ''}
      onChangeText={(text) => setDateThen(new Date(text))}
      placeholder="Date Then (YYYY-MM-DD)"
      style={{borderWidth:0.5, marginLeft:15, marginRight:25, marginTop:15,padding:5, borderColor:'#bbb', backgroundColor:'#eee'}}
    />
    <TextInput
  value={Array.isArray(associateName) ? associateName.join(',') : ''} // Check if associateName is an array before calling join
  onChangeText={(text) => setAssociateName(text.split(','))} // Convert string to array for state
  placeholder="Associate Names (comma separated)"
  style={{borderWidth:0.5, marginLeft:15, marginRight:25, marginTop:15,padding:5, borderColor:'#bbb', backgroundColor:'#eee'}}
/>
    <TextInput
      value={associateWith}
      onChangeText={setAssociateWith}
      placeholder="Associate With"
      style={{borderWidth:0.5, marginLeft:15, marginRight:25, marginTop:15,padding:5, borderColor:'#bbb', backgroundColor:'#eee'}}
    />
    <TextInput
      value={projectUrl}
      onChangeText={setProjectUrl}
      placeholder="Project URL"
      style={{borderWidth:0.5, marginLeft:15, marginRight:25, marginTop:15,padding:5, borderColor:'#bbb', backgroundColor:'#eee'}}
    />
    <TextInput
      value={desc}
      onChangeText={setDesc}
      placeholder="Description"
      style={{borderWidth:0.5, marginLeft:15, marginRight:25, marginTop:15,padding:5, borderColor:'#bbb', backgroundColor:'#eee'}}
    />
  </>
)}
{operation === 'pub' && (
  <>
    <TextInput
      value={title}
      onChangeText={setTitle}
      placeholder="Title"
      style={{borderWidth:0.5, marginLeft:15, marginRight:25, marginTop:15,padding:5, borderColor:'#bbb', backgroundColor:'#eee'}}
    />
    <TextInput
      value={publisher}
      onChangeText={setPublisher}
      placeholder="Publisher"
      style={{borderWidth:0.5, marginLeft:15, marginRight:25, marginTop:15,padding:5, borderColor:'#bbb', backgroundColor:'#eee'}}
    />
    {/* Assuming pubDate is a Date object */}
    <TextInput
      value={pubDate ? pubDate.toDateString() : ''} // Convert Date to string for TextInput
      onChangeText={(text) => setPubDate(new Date(text))} // Convert string to Date for state
      placeholder="Publication Date (YYYY-MM-DD)"
      style={{borderWidth:0.5, marginLeft:15, marginRight:25, marginTop:15,padding:5, borderColor:'#bbb', backgroundColor:'#eee'}}
    />
    <TextInput
  value={Array.isArray(authors) ? authors.join(',') : ''} // Check if authors is an array before calling join
  onChangeText={(text) => setAuthors(text.split(','))} // Convert string to array for state
  placeholder="Authors (comma separated)"
  style={{borderWidth:0.5, marginLeft:15, marginRight:25, marginTop:15,padding:5, borderColor:'#bbb', backgroundColor:'#eee'}}
/>
    <TextInput
      value={pubUrl}
      onChangeText={setPubUrl}
      placeholder="Publication URL"
      style={{borderWidth:0.5, marginLeft:15, marginRight:25, marginTop:15,padding:5, borderColor:'#bbb', backgroundColor:'#eee'}}
    />
    <TextInput
      value={desc}
      onChangeText={setDesc}
      placeholder="Description"
      style={{borderWidth:0.5, marginLeft:15, marginRight:25, marginTop:15,padding:5, borderColor:'#bbb', backgroundColor:'#eee'}}
    />
  </>
)}
{operation === 'score' && (
  <>
    <TextInput
      value={testName}
      onChangeText={setTestName}
      placeholder="Test Name"
      style={{borderWidth:0.5, marginLeft:15, marginRight:25, marginTop:15,padding:5, borderColor:'#bbb', backgroundColor:'#eee'}}
    />
    <TextInput
      value={associatedWith}
      onChangeText={setAssociatedWith}
      placeholder="Associated With"
      style={{borderWidth:0.5, marginLeft:15, marginRight:25, marginTop:15,padding:5, borderColor:'#bbb', backgroundColor:'#eee'}}
    />
    <TextInput
      value={score ? score.toString() : ''} // Convert Number to string for TextInput
      onChangeText={(text) => setScore(parseFloat(text))} // Convert string to Number for state
      placeholder="Score"
      style={{borderWidth:0.5, marginLeft:15, marginRight:25, marginTop:15,padding:5, borderColor:'#bbb', backgroundColor:'#eee'}}
    />
    {/* Assuming testDate is a Date object */}
    <TextInput
      value={testDate ? testDate.toDateString() : ''} // Convert Date to string for TextInput
      onChangeText={(text) => setTestDate(new Date(text))} // Convert string to Date for state
      placeholder="Test Date (YYYY-MM-DD)"
      style={{borderWidth:0.5, marginLeft:15, marginRight:25, marginTop:15,padding:5, borderColor:'#bbb', backgroundColor:'#eee'}}
    />
    <TextInput
      value={desc}
      onChangeText={setDesc}
      placeholder="Description"
      style={{borderWidth:0.5, marginLeft:15, marginRight:25, marginTop:15,padding:5, borderColor:'#bbb', backgroundColor:'#eee'}}
    />
  </>
)}
{operation === 'external' && (
  <>
    <TextInput
      value={description}
      onChangeText={setDescription}
      placeholder="Description"
      style={{borderWidth:0.5, marginLeft:15, marginRight:25, marginTop:15,padding:5, borderColor:'#bbb', backgroundColor:'#eee'}}
    />
    <TextInput
      value={attachment}
      onChangeText={setAttachment}
      placeholder="Attachment"
      style={{borderWidth:0.5, marginLeft:15, marginRight:25, marginTop:15,padding:5, borderColor:'#bbb', backgroundColor:'#eee'}}
    />
  </>
)}
{operation === 'skill' && (
  <>
    <TextInput
      value={skill}
      onChangeText={setSkill}
      placeholder="Skill"
      style={{borderWidth:0.5, marginLeft:15, marginRight:25, marginTop:15,padding:5, borderColor:'#bbb', backgroundColor:'#eee'}}
    />
    <TextInput
      value={description}
      onChangeText={setDescription}
      placeholder="Description"
      style={{borderWidth:0.5, marginLeft:15, marginRight:25, marginTop:15,padding:5, borderColor:'#bbb', backgroundColor:'#eee'}}
    />
  </>
)}
<View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 20 }}>
  <Button
    title="save"
    onPress={handleSubmit}
    color="blue"
    titleStyle={{ textTransform: 'none' }} // Set textTransform to 'none' to prevent capitalization
  />
</View>
  </View>
</Modal>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:25,
    backgroundColor:'#fff',
    paddingTop:25
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginRight: 20,
    marginLeft:20,
    backgroundColor:'#fff'
  },
  
  textContainer: {
    marginLeft: 20,
  },
  nameText: {
    fontSize: 22,
    fontWeight: 'bold',
    color:'#252525'
  },
  usernameText: {
    fontSize: 18,
    marginTop: 5,
  },
  aboutText: {
    fontSize: 16,
    marginTop: 15,
    marginLeft:15,
    paddingBottom:15
  },
  aboutText1: {
    fontSize: 16,
    marginTop: 15,
    marginLeft:15,
    paddingBottom:15,
    color:'#aaa'
  },
  boldText: {
    fontWeight: 'bold',
  },
  blueText: {
    color: 'blue',
  },
    inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginRight: 20,
    marginLeft:20,
    backgroundColor:'#fff'
  },
});


export default EditModal;