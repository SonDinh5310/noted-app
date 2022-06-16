import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Notes from '../Notes/Notes';

function RecycleBin() {
    const [deletedNotes, setDeletedNotes] = useState('');
    return <NotesList notes={deletedNotes}></NotesList>;
}

export default RecycleBin;
