import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Notes = () => {
    const{userId} = useParams();
    const[notesListData, setNotesListData] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:5000/${userId}/trips`)
            .then(res => {
                console.log(res.data.data)
                setNotesListData(res.data.data)
            })
            .catch(err => console.log(err))
    }, [])

    return (
        <div>
            <div class="table-responsive-sm">
                <h2>Notes</h2>
                <table class="table tablesize tablehead dark">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Address</th>
                            <th>Notes</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                    notesListData.map((note) => {
                        return (
                            <tr key={note.id}>
                                <td>{note.name}</td>
                                <td>{note.address}</td>
                                <td>{note.notes}</td>
                            </tr>
                        )
                    })
                }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Notes