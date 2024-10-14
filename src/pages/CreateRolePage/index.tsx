import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { userService } from '../../services/user.service';


export default function CreateRolePage() {

  const [roleName, setRoleName] = useState<string>('');
  const navigation = useNavigation();

  const handleCreateRole = async () => {
    try {
      await userService.createRole({ name: roleName });
      alert('Role created successfully!');
      navigation.goBack();
    } catch (error) {
      console.error('Error creating role:', error);
      alert('Failed to create role.');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter role name"
        value={roleName}
        onChangeText={setRoleName}
      />
      <Button title="Create Role" onPress={handleCreateRole} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
});

