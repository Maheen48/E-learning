import React from 'react'
import InstructorRoute from '../../components/routes/InstructorRoute'
import TopNav from '../../components/TopNav'
import UserNav from '../../components/nav/UserNav'
import Courses from './course/Courses'


const index = () => {
    return (
        <InstructorRoute>
            <div className="container-fluid d-flex flex-row p-0">
                <div className="col-md-2">
                    <UserNav />
                </div>
                <div className='col-md-10'>
                    <TopNav />

                    <Courses />
                </div>
            </div>
        </InstructorRoute>
    )
}

export default index