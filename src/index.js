import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import App from './App';
import Home from './pages/Home';
import StudyRecruit from './pages/StudyRecruit';
import Meetingrooms from './pages/Meetingrooms';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Schedule from './pages/Schedule';
import Login from './components/login';
import Signup from './components/signup';
import isLogin from './utils/isLogin';
import HomeAchievement from './pages/Home_achievement';
import HomeStatistics from './pages/Home_statistics';
import HomeTodays from './pages/Home_todays';
import VideoRoomComponent from './components/meetingroom/VideoRoomComponent';
import MeetingroomVideo from './components/meetingroom/MeetingroomVideo';
import StudyRecruitCreate from './pages/studyRecruitCreate';
import VideoRoomComponentCopy from './components/meetingroom/VideoRoomComponent copy'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route
            path="home"
            element={isLogin() ? <Home /> : <Login />}
          >
            <Route
              path="tab=todays"
              element={<HomeTodays />}
            />
            <Route
              path="tab=achievement"
              element={<HomeAchievement />}
            />
            <Route
              path="tab=statistics"
              element={<HomeStatistics />}
            />
          </Route>

          <Route
            path="studyrecruit"
            element={
              isLogin() ? <StudyRecruit /> : <Login />
            }
          />
          <Route
            path="studyrecruit/create"
            element={
              isLogin() ? <StudyRecruitCreate /> : <Login />
            }
          />
          <Route
            path="meetingrooms"
            element={
              isLogin() ? <Meetingrooms /> : <Login />
            }
          />
          
          <Route
            path="meetingrooms/:meetingSeq"
            element={isLogin() ? <MeetingroomVideo /> : <Login />}
          />
          <Route
            path="videoRoomComponent"
            element={
              isLogin() ? <VideoRoomComponent /> : <Login />
            }
          />
          <Route
            path="videoRoomComponentCopy"
            element={
              isLogin() ? <VideoRoomComponentCopy /> : <Login />
            }
          />
          <Route
            path="schedules"
            element={isLogin() ? <Schedule /> : <Login />}
          />
          <Route
            path="profile"
            element={isLogin() ? <Profile /> : <Login />}
          />
          <Route
            path="settings"
            element={isLogin() ? <Settings /> : <Login />}
          />
        </Route>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
