import React from 'react';
import AdminItems from './AdminItems';
import NavigationBar from './NavigationBar';



function Admin(props) {


    return (
        <div>
            <NavigationBar page="Admin"/>
            <AdminItems category=""/>
        </div>

    );
}

export default Admin;