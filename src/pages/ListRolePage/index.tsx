import React, { useState, useCallback } from 'react';
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { View, Text, FlatList, StyleSheet, Button } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { userService } from '../../services/user.service';

interface Role {
  id: string;
  name: string;
}
export default function ListRolePage() {

  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigation = useNavigation<NavigationProp<any>>()

  const fetchRoles = async () => {
    try {
      const data = await userService.getRoles();
      setRoles(data);
    } catch (error) {
      console.error('Error fetching roles:', error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchRoles();
    }, [])
  ) 

  function goToCreateRole() {
    navigation.navigate('CreateRolePage')
}

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={roles}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.text}>{item.name}</Text>
          </View>
        )}
      />
      <Button title="Adicionar Perfil" onPress={goToCreateRole} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  item: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  text: {
    fontSize: 16,
  },
});
